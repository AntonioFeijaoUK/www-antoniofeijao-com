---
layout: default
title: Pages
permalink: /pages/
---

Reference pages, notes, and supporting content.

{% assign page_items = site.pages | sort: "title" %}

{% if page_items.size > 0 %}
  <div class="content-list">
    {% for item in page_items %}
      {% unless item.url == "/pages/" or item.title == nil %}
        {% include content-card.html item=item link_label="Open page" section_label="Page" %}
      {% endunless %}
    {% endfor %}
  </div>
{% else %}
  <p>No pages have been published yet.</p>
{% endif %}
