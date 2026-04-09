---
layout: default
title: "Antonio Feijao | Cybersecurity, AWS & Linux"
permalink: /
date: 2020-01-01
last_modified_at: 2025-03-08
description: "Security architecture, technical notes, cybersecurity learning, cryptography and Bitcoin study, and practical content built through hands-on work."
---

## Hi there

I believe in openly sharing educational knowledge, and here I share insights, notes, and practical learning built through hands-on work.

**Please use any information on this website at your own risk.**

If you find my content helpful, please consider supporting my work. It helps me continue building, testing, documenting, and sharing useful material.

<a href="https://ko-fi.com/B0B019526" target="_blank" rel="noopener noreferrer" style="display:inline-flex; align-items:center; background-color:#f7f7f7; color:#333; padding:8px 12px; border-radius:4px; text-decoration:none; box-shadow: 0 2px 4px rgba(0,0,0,0.2);">
  <img src="https://storage.ko-fi.com/cdn/kofi3.png?v=3" alt="Buy Me a Coffee" style="height:36px; margin-right:8px; border:0;">
  <span>Buy Me a Coffee</span>
</a>

<div class="home-section-links">
  <a href="{{ '/blog/' | relative_url }}">Blog</a>
  <a href="{{ '/cyber/' | relative_url }}">Cyber</a>
  <a href="{{ '/crypto/' | relative_url }}">Crypto</a>
  <a href="{{ '/timeline/' | relative_url }}">Timeline</a>
  <a href="{{ '/pages/' | relative_url }}">Pages</a>
  <a href="{{ '/about/' | relative_url }}">About</a>
</div>

---

## Latest from Blog

{% assign latest_posts = site.posts | sort: "date" | reverse | slice: 0, 3 %}

{% if latest_posts.size > 0 %}
  <div class="content-list">
    {% for item in latest_posts %}
      {% include content-card.html item=item link_label="Read more" section_label="Blog" %}
    {% endfor %}
  </div>

  [View all blog posts]({{ '/blog/' | relative_url }})
{% else %}
  <p>No blog posts have been published yet.</p>
{% endif %}

---

## Latest from Cyber

{% assign latest_cyber = site.cyber | sort: "date" | reverse | slice: 0, 3 %}

{% if latest_cyber.size > 0 %}
  <div class="content-list">
    {% for item in latest_cyber %}
      {% include content-card.html item=item link_label="Read more" section_label="Cyber" %}
    {% endfor %}
  </div>

  [View all cyber content]({{ '/cyber/' | relative_url }})
{% else %}
  <p>No cyber content has been published yet.</p>
{% endif %}

---

## Latest from Crypto

{% assign latest_crypto = site.crypto | sort: "date" | reverse | slice: 0, 3 %}

{% if latest_crypto.size > 0 %}
  <div class="content-list">
    {% for item in latest_crypto %}
      {% include content-card.html item=item link_label="Read more" section_label="Crypto" %}
    {% endfor %}
  </div>

  [View all crypto content]({{ '/crypto/' | relative_url }})
{% else %}
  <p>No crypto content has been published yet.</p>
{% endif %}

---

## Explore

- [Browse the full blog]({{ '/blog/' | relative_url }})
- [Read cybersecurity notes and summaries]({{ '/cyber/' | relative_url }})
- [Explore Bitcoin and crypto learning notes]({{ '/crypto/' | relative_url }})
- [Open the technology and cybersecurity timeline]({{ '/timeline/' | relative_url }})
- [See reference pages and supporting content]({{ '/pages/' | relative_url }})
- [Read more about the author]({{ '/about/' | relative_url }})
