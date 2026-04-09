(function () {
  var input = document.getElementById("search-input");
  var resultsRoot = document.getElementById("search-results");
  var meta = document.getElementById("search-meta");
  var panel = document.querySelector(".search-panel");

  if (!input || !resultsRoot || !meta) {
    return;
  }

  var index = [];
  var loaded = false;
  var urlQuery = "";

  try {
    var params = new URLSearchParams(window.location.search);
    urlQuery = (params.get("q") || "").trim();
  } catch (error) {
    urlQuery = "";
  }

  if (urlQuery && !input.value) {
    input.value = urlQuery;
  }

  function normalize(value) {
    return (value || "").toLowerCase().trim();
  }

  function escapeHtml(value) {
    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function escapeRegex(value) {
    return String(value || "").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  function highlightAndEscape(value, terms) {
    var source = String(value || "");
    if (!terms || !terms.length) {
      return escapeHtml(source);
    }

    var safeTerms = [];
    for (var i = 0; i < terms.length; i += 1) {
      var term = terms[i];
      if (!term) continue;
      safeTerms.push(term);
    }

    if (!safeTerms.length) {
      return escapeHtml(source);
    }

    safeTerms.sort(function (a, b) {
      return b.length - a.length;
    });

    var pattern = safeTerms.map(escapeRegex).join("|");
    var regex = new RegExp("(" + pattern + ")", "ig");
    var parts = source.split(regex);
    var output = "";

    for (var j = 0; j < parts.length; j += 1) {
      if (j % 2 === 1) {
        output += '<mark class="search-hit">' + escapeHtml(parts[j]) + "</mark>";
      } else {
        output += escapeHtml(parts[j]);
      }
    }

    return output;
  }

  function contentSnippet(content, query, terms) {
    var raw = String(content || "").trim();
    if (!raw) {
      return "";
    }

    var lower = raw.toLowerCase();
    var hit = lower.indexOf(query);

    if (hit === -1 && terms && terms.length) {
      for (var i = 0; i < terms.length; i += 1) {
        var t = terms[i];
        if (!t) continue;
        hit = lower.indexOf(t);
        if (hit !== -1) break;
      }
    }

    var start = 0;
    var end = Math.min(raw.length, 220);

    if (hit !== -1) {
      start = Math.max(0, hit - 70);
      end = Math.min(raw.length, hit + 150);
    }

    var prefix = start > 0 ? "..." : "";
    var suffix = end < raw.length ? "..." : "";
    return prefix + raw.slice(start, end) + suffix;
  }

  function collectionLabel(name) {
    if (name === "posts") return "Blog";
    if (name === "cyber") return "Cyber";
    if (name === "crypto") return "Crypto";
    return "Pages";
  }

  function scoreItem(item, query, terms) {
    var title = normalize(item.title);
    var desc = normalize(item.description);
    var content = normalize(item.content);
    var url = normalize(item.url);
    var score = 0;

    if (title.indexOf(query) !== -1) score += 150;
    if (desc.indexOf(query) !== -1) score += 70;
    if (url.indexOf(query) !== -1) score += 40;
    if (content.indexOf(query) !== -1) score += 25;

    for (var i = 0; i < terms.length; i += 1) {
      var term = terms[i];
      if (!term) continue;
      if (title.indexOf(term) !== -1) score += 35;
      if (desc.indexOf(term) !== -1) score += 20;
      if (url.indexOf(term) !== -1) score += 10;
      if (content.indexOf(term) !== -1) score += 8;
    }

    return score;
  }

  function renderResults(query) {
    var normalizedQuery = normalize(query);
    if (!normalizedQuery) {
      resultsRoot.innerHTML = "";
      meta.textContent = "Start typing to see ranked results.";
      return;
    }

    var terms = normalizedQuery.split(/\s+/).filter(Boolean);
    var ranked = [];

    for (var i = 0; i < index.length; i += 1) {
      var item = index[i];
      var score = scoreItem(item, normalizedQuery, terms);
      if (score > 0) {
        ranked.push({ item: item, score: score });
      }
    }

    ranked.sort(function (a, b) {
      if (b.score !== a.score) return b.score - a.score;
      if ((b.item.date || "") !== (a.item.date || "")) {
        return (b.item.date || "").localeCompare(a.item.date || "");
      }
      return (a.item.title || "").localeCompare(b.item.title || "");
    });

    var maxResults = 50;
    var shown = ranked.slice(0, maxResults);

    if (!shown.length) {
      resultsRoot.innerHTML = "<p>No matches found. Try fewer or different keywords.</p>";
      meta.textContent = "0 results for \"" + normalizedQuery + "\".";
      return;
    }

    var html = "";
    for (var j = 0; j < shown.length; j += 1) {
      var row = shown[j].item;
      var titleHtml = highlightAndEscape(row.title, terms);
      var desc = row.description
        ? highlightAndEscape(row.description, terms)
        : "No description available.";
      var snippet = contentSnippet(row.content, normalizedQuery, terms);
      var snippetHtml = snippet
        ? '<p class="search-snippet">' + highlightAndEscape(snippet, terms) + "</p>"
        : "";
      html +=
        '<article class="search-result">' +
        '<h2><a href="' + escapeHtml(row.url) + '">' + titleHtml + "</a></h2>" +
        '<p class="small-note">' + escapeHtml(collectionLabel(row.collection)) + "</p>" +
        "<p>" + desc + "</p>" +
        snippetHtml +
        "</article>";
    }

    resultsRoot.innerHTML = html;
    meta.textContent =
      shown.length +
      " result" +
      (shown.length === 1 ? "" : "s") +
      " shown for \"" +
      normalizedQuery +
      "\".";
  }

  var indexUrl =
    (panel && panel.getAttribute("data-search-index-url")) || "/search/search.json";

  fetch(indexUrl, { credentials: "same-origin" })
    .then(function (res) {
      if (!res.ok) {
        throw new Error("Search index request failed");
      }
      return res.json();
    })
    .then(function (data) {
      if (!Array.isArray(data)) {
        throw new Error("Unexpected search index format");
      }
      index = data;
      loaded = true;
      meta.textContent = "Search index ready. Type keywords to find pages.";
      renderResults(input.value || "");
    })
    .catch(function () {
      meta.textContent = "Search is temporarily unavailable.";
    });

  input.addEventListener("input", function (event) {
    if (!loaded) {
      meta.textContent = "Loading search index...";
      return;
    }
    renderResults(event.target.value || "");
  });
})();
