---
layout: default
title: Blog
permalink: /blog/
---

Technical notes, articles, and learning-by-doing posts.

{% assign blog_items = site.posts | sort: "date" | reverse %}

{% if blog_items.size > 0 %}
  <div class="content-list">
    {% for item in blog_items %}
      {% include content-card.html item=item link_label="Read more" section_label="Blog" %}
    {% endfor %}
  </div>
{% else %}
  <p>No blog posts have been published yet.</p>
{% endif %}
