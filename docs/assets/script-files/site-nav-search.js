(function () {
  var form = document.querySelector(".site-nav-search");
  var navInput = document.getElementById("nav-search-input");

  if (!form || !navInput) {
    return;
  }

  var debounceTimer = null;
  var REDIRECT_DELAY_MS = 120;
  var AUTO_FOCUS_KEY = "site-nav-search-autofocus";

  function mainSearchInput() {
    return document.getElementById("search-input");
  }

  function isSearchPage() {
    return !!mainSearchInput();
  }

  function setQueryInUrl(query) {
    try {
      var url = new URL(window.location.href);
      if (query) {
        url.searchParams.set("q", query);
      } else {
        url.searchParams.delete("q");
      }
      window.history.replaceState({}, "", url.toString());
    } catch (error) {
      // Ignore URL rewriting issues and keep search functional.
    }
  }

  function markAutoFocus() {
    try {
      window.sessionStorage.setItem(AUTO_FOCUS_KEY, "1");
    } catch (error) {
      // Ignore storage issues and continue.
    }
  }

  function consumeAutoFocus() {
    try {
      if (window.sessionStorage.getItem(AUTO_FOCUS_KEY) === "1") {
        window.sessionStorage.removeItem(AUTO_FOCUS_KEY);
        return true;
      }
    } catch (error) {
      // Ignore storage issues and continue.
    }
    return false;
  }

  function syncToMainSearch(query) {
    var input = mainSearchInput();
    if (!input) {
      return false;
    }

    if (input.value !== query) {
      input.value = query;
    }

    input.dispatchEvent(new Event("input", { bubbles: true }));
    setQueryInUrl(query);
    return true;
  }

  function buildSearchUrl(query) {
    var target = new URL(form.action, window.location.origin);
    if (query) {
      target.searchParams.set("q", query);
    } else {
      target.searchParams.delete("q");
    }
    return target;
  }

  function queueNavigation(query) {
    if (debounceTimer) {
      window.clearTimeout(debounceTimer);
    }

    debounceTimer = window.setTimeout(function () {
      try {
        var target = buildSearchUrl(query);
        markAutoFocus();
        window.location.assign(target.toString());
      } catch (error) {
        if (query) {
          form.submit();
        }
      }
    }, REDIRECT_DELAY_MS);
  }

  function handleTypeSearch() {
    var query = navInput.value.trim();

    if (isSearchPage()) {
      syncToMainSearch(query);
      return;
    }

    queueNavigation(query);
  }

  navInput.addEventListener("input", handleTypeSearch);
  navInput.addEventListener("keyup", handleTypeSearch);
  navInput.addEventListener("change", handleTypeSearch);
  navInput.addEventListener("search", handleTypeSearch);

  form.addEventListener("submit", function (event) {
    var query = navInput.value.trim();

    event.preventDefault();

    if (isSearchPage()) {
      syncToMainSearch(query);
      return;
    }

    queueNavigation(query);
  });

  try {
    var pageQuery = new URLSearchParams(window.location.search).get("q") || "";
    if (pageQuery && !navInput.value) {
      navInput.value = pageQuery;
    }
  } catch (error) {
    // Ignore query parsing issues.
  }

  var input = mainSearchInput();
  if (input) {
    input.addEventListener("input", function () {
      if (navInput.value !== input.value) {
        navInput.value = input.value;
      }
    });
  }

  if (isSearchPage() && consumeAutoFocus()) {
    window.requestAnimationFrame(function () {
      navInput.focus();
      if (typeof navInput.setSelectionRange === "function") {
        var end = navInput.value.length;
        navInput.setSelectionRange(end, end);
      }
    });
  }
})();
