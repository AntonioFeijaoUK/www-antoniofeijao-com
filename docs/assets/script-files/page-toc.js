(function () {
  var toc = document.querySelector(".page-toc");

  if (!toc) {
    return;
  }

  var headings = Array.prototype.slice
    .call(document.querySelectorAll("#main_content h2[id], #main_content h3[id]"))
    .filter(function (heading) {
      return !heading.closest(".page-toc, .content-card");
    });

  if (!headings.length) {
    return;
  }

  var list = toc.querySelector("ol, ul");

  if (!list) {
    return;
  }

  list.innerHTML = "";

  headings.forEach(function (heading) {
    var item = document.createElement("li");
    var link = document.createElement("a");

    item.className = "page-toc-item page-toc-item-" + heading.tagName.toLowerCase();
    link.href = "#" + encodeURIComponent(heading.id);
    link.textContent = heading.textContent.trim();

    item.appendChild(link);
    list.appendChild(item);
  });

  var links = Array.prototype.slice.call(toc.querySelectorAll('a[href^="#"]'));
  var activeId = "";
  var ticking = false;

  function updateTocPosition() {
    if (window.getComputedStyle(toc).position !== "fixed") {
      toc.style.removeProperty("--page-toc-top");
      return;
    }

    var header = document.getElementById("header_wrap");
    var headerBottom = header ? header.getBoundingClientRect().bottom : 0;
    var topOffset = Math.max(16, Math.ceil(headerBottom + 16));

    toc.style.setProperty("--page-toc-top", topOffset + "px");
  }

  function centreActiveLink(link) {
    if (!link || window.getComputedStyle(toc).position !== "fixed") {
      return;
    }

    var targetScroll =
      link.offsetTop - toc.clientHeight / 2 + link.offsetHeight / 2;

    toc.scrollTo({
      top: Math.max(0, targetScroll),
      behavior: "smooth"
    });
  }

  function setActive(id) {
    if (id === activeId) {
      return;
    }

    activeId = id;
    var activeLink = null;

    links.forEach(function (link) {
      var href = link.getAttribute("href") || "";
      var targetId = href.slice(1);

      try {
        targetId = decodeURIComponent(targetId);
      } catch (error) {
        // Keep the raw id if decoding fails.
      }

      if (targetId === id) {
        link.classList.add("is-active");
        link.setAttribute("aria-current", "location");
        activeLink = link;
      } else {
        link.classList.remove("is-active");
        link.removeAttribute("aria-current");
      }
    });

    centreActiveLink(activeLink);
  }

  function updateActiveHeading() {
    var marker = Math.max(96, window.innerHeight * 0.25);
    var current = headings[0];

    headings.forEach(function (heading) {
      if (heading.getBoundingClientRect().top <= marker) {
        current = heading;
      }
    });

    setActive(current.id);
    ticking = false;
  }

  function requestUpdate() {
    if (ticking) {
      return;
    }

    ticking = true;
    window.requestAnimationFrame(function () {
      updateTocPosition();
      updateActiveHeading();
    });
  }

  updateTocPosition();
  requestUpdate();
  window.addEventListener("scroll", requestUpdate, { passive: true });
  window.addEventListener("resize", requestUpdate);
  window.addEventListener("hashchange", requestUpdate);
})();
