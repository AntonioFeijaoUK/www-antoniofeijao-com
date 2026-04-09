---
layout: default
title: Crypto
permalink: /crypto/
---

Cryptocurrency, Bitcoin, and cryptography learning notes.

{% assign crypto_items = site.crypto | sort: "date" | reverse %}

{% if crypto_items.size > 0 %}
  <div class="content-list">
    {% for item in crypto_items %}
      {% include content-card.html item=item link_label="Read more" section_label="Crypto" %}
    {% endfor %}
  </div>
{% else %}
  <p>No crypto content has been published yet.</p>
{% endif %}
