---
title: Search
permalink: /search/
search_exclude: true
---

Search across blog posts, cyber notes, crypto notes, and pages.

<div class="search-panel" data-search-index-url="{{ '/search/search.json' | relative_url }}">
  <label for="search-input">Search this website</label>
  <input id="search-input" type="search" placeholder="Type keywords (e.g. raspberry pi vpn)" autocomplete="off">
  <p id="search-meta" class="small-note">Start typing to see ranked results.</p>
  <div id="search-results" class="search-results" aria-live="polite"></div>
</div>

<script src="{{ '/assets/script-files/site-search.js' | relative_url }}" defer></script>
