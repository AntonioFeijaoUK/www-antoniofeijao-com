---
permalink: /pages/
title: "Pages"
layout: splash
---

<ul>
  {% for thing in site.pages %}
    {% if thing.identifier == 'value' %}
  <li>
    {{ thing.title }}
  </li>
  {% endif %}
  {% endfor %}
</ul>


<ul>
  {% for post in site.posts %}
    <li>
      <a href="{{ post.url }}">{{ post.title }}</a>
    </li>
  {% endfor %}
</ul>
