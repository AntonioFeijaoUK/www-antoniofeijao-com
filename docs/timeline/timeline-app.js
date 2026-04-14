(function () {
  var root = document.querySelector(".timeline-index-page");
  if (!root) {
    return;
  }

  var indexUrl = root.getAttribute("data-timeline-index-url");
  var resultsRoot = document.getElementById("timeline-results");
  var statsRoot = document.getElementById("timeline-stats");
  var searchInput = document.getElementById("timeline-search");
  var topicSelect = document.getElementById("timeline-topic");
  var typeSelect = document.getElementById("timeline-type");
  var regionSelect = document.getElementById("timeline-region");
  var statusSelect = document.getElementById("timeline-status");
  var confidenceSelect = document.getElementById("timeline-confidence");

  if (
    !indexUrl ||
    !resultsRoot ||
    !statsRoot ||
    !searchInput ||
    !topicSelect ||
    !typeSelect ||
    !regionSelect ||
    !statusSelect ||
    !confidenceSelect
  ) {
    return;
  }

  var items = [];

  function escapeHtml(value) {
    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function normalize(value) {
    return String(value || "").trim().toLowerCase();
  }

  function parseSortValue(value) {
    var raw = String(value || "").trim();
    if (!raw) {
      return Number.NEGATIVE_INFINITY;
    }

    if (/^-?\d+$/.test(raw)) {
      return Number(raw);
    }

    var parsed = Date.parse(raw);
    if (!Number.isNaN(parsed)) {
      return parsed;
    }

    return Number.NEGATIVE_INFINITY;
  }

  function uniqueSorted(values) {
    return Array.from(new Set(values.filter(Boolean))).sort(function (a, b) {
      return a.localeCompare(b);
    });
  }

  function fillSelect(select, values, label) {
    var options = ['<option value="">' + label + "</option>"];
    for (var i = 0; i < values.length; i += 1) {
      options.push(
        '<option value="' + escapeHtml(values[i]) + '">' + escapeHtml(values[i]) + "</option>"
      );
    }
    select.innerHTML = options.join("");
  }

  function cardMeta(item) {
    var parts = [];

    if (item.date_display) {
      parts.push(escapeHtml(item.date_display));
    }
    if (item.type) {
      parts.push(escapeHtml(item.type));
    }
    if (item.region) {
      parts.push(escapeHtml(item.region));
    }

    return parts.join(" | ");
  }

  function chipList(values) {
    if (!Array.isArray(values) || !values.length) {
      return "";
    }

    var chips = values.map(function (value) {
      return '<span class="timeline-chip">' + escapeHtml(value) + "</span>";
    });

    return '<div class="timeline-card-chips">' + chips.join("") + "</div>";
  }

  function render(itemsToRender) {
    if (!itemsToRender.length) {
      resultsRoot.innerHTML =
        '<article class="timeline-card"><h2>No matching events</h2><p>Try a broader search or remove one of the filters.</p></article>';
      statsRoot.textContent = "0 events shown.";
      return;
    }

    var html = "";
    for (var i = 0; i < itemsToRender.length; i += 1) {
      var item = itemsToRender[i];
      var imageHtml = item.image
        ? '<a class="timeline-card-image" href="' +
          escapeHtml(item.url) +
          '"><img src="' +
          escapeHtml(item.image) +
          '" alt="' +
          escapeHtml(item.title) +
          '"></a>'
        : "";
      var summaryHtml = item.summary
        ? "<p>" + escapeHtml(item.summary) + "</p>"
        : "";
      var sourceCount = Array.isArray(item.source_urls) ? item.source_urls.length : 0;

      html +=
        '<article class="timeline-card">' +
        imageHtml +
        '<div class="timeline-card-body">' +
        '<p class="timeline-card-meta">' + cardMeta(item) + "</p>" +
        '<h2><a href="' + escapeHtml(item.url) + '">' + escapeHtml(item.title) + "</a></h2>" +
        summaryHtml +
        chipList(item.topics) +
        '<p class="timeline-card-foot">' +
        'Status: <strong>' + escapeHtml(item.status || "draft") + "</strong>" +
        ' | Confidence: <strong>' + escapeHtml(item.confidence || "unknown") + "</strong>" +
        ' | Sources: <strong>' + escapeHtml(sourceCount) + "</strong>" +
        "</p>" +
        "</div>" +
        "</article>";
    }

    resultsRoot.innerHTML = html;
    statsRoot.textContent = itemsToRender.length + " verified event" + (itemsToRender.length === 1 ? "" : "s") + " shown.";
  }

  function applyFilters() {
    var query = normalize(searchInput.value);
    var topic = normalize(topicSelect.value);
    var type = normalize(typeSelect.value);
    var region = normalize(regionSelect.value);
    var status = normalize(statusSelect.value);
    var confidence = normalize(confidenceSelect.value);

    var filtered = items.filter(function (item) {
      var haystack = [
        item.title,
        item.summary,
        Array.isArray(item.topics) ? item.topics.join(" ") : "",
        Array.isArray(item.people) ? item.people.join(" ") : "",
        item.region,
        item.type
      ]
        .join(" ")
        .toLowerCase();

      var topics = Array.isArray(item.topics) ? item.topics.map(normalize) : [];

      if (query && haystack.indexOf(query) === -1) {
        return false;
      }
      if (topic && topics.indexOf(topic) === -1) {
        return false;
      }
      if (type && normalize(item.type) !== type) {
        return false;
      }
      if (region && normalize(item.region) !== region) {
        return false;
      }
      if (status && normalize(item.status) !== status) {
        return false;
      }
      if (confidence && normalize(item.confidence) !== confidence) {
        return false;
      }

      return true;
    });

    filtered.sort(function (a, b) {
      return parseSortValue(b.date_sort) - parseSortValue(a.date_sort);
    });

    render(filtered);
  }

  fetch(indexUrl, { credentials: "same-origin" })
    .then(function (response) {
      if (!response.ok) {
        throw new Error("Failed to load timeline index.");
      }
      return response.json();
    })
    .then(function (data) {
      items = Array.isArray(data.items) ? data.items : [];

      fillSelect(
        topicSelect,
        uniqueSorted(
          items.reduce(function (acc, item) {
            return acc.concat(Array.isArray(item.topics) ? item.topics : []);
          }, [])
        ),
        "All topics"
      );
      fillSelect(
        typeSelect,
        uniqueSorted(
          items.map(function (item) {
            return item.type;
          })
        ),
        "All types"
      );
      fillSelect(
        regionSelect,
        uniqueSorted(
          items.map(function (item) {
            return item.region;
          })
        ),
        "All regions"
      );
      fillSelect(
        statusSelect,
        uniqueSorted(
          items.map(function (item) {
            return item.status;
          })
        ),
        "All statuses"
      );
      fillSelect(
        confidenceSelect,
        uniqueSorted(
          items.map(function (item) {
            return item.confidence;
          })
        ),
        "All confidence levels"
      );

      applyFilters();
    })
    .catch(function () {
      statsRoot.textContent = "Timeline index unavailable.";
      resultsRoot.innerHTML =
        '<article class="timeline-card"><h2>Timeline unavailable</h2><p>The timeline index could not be loaded from this page.</p></article>';
    });

  searchInput.addEventListener("input", applyFilters);
  topicSelect.addEventListener("change", applyFilters);
  typeSelect.addEventListener("change", applyFilters);
  regionSelect.addEventListener("change", applyFilters);
  statusSelect.addEventListener("change", applyFilters);
  confidenceSelect.addEventListener("change", applyFilters);
})();
