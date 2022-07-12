---
permalink: /pages/
title: "Pages"
layout: splash
---

## try 1

<ul>
  {% for thing in site.pages %}
    {% if thing.identifier == 'value' %}
  <li>
    {{ thing.title }}
  </li>
  {% endif %}
  {% endfor %}
</ul>

---

## try 2

<ul>
  {% for post in site.posts %}
    <li>
      <a href="{{ post.url }}">{{ post.title }}</a>
    </li>
  {% endfor %}
</ul>

---

## try 3

<ul>
  {% for post in site.page %} 
    {% if post.categories contains "Page" %}
      <li>{{ post.title }}</li>
    {% endif %}
  {% endfor %}
</ul>

---
  
## try 4
  
{% for post in site.categories.page %}
  <h1>{{ post.title }}</h1>
  <a href="{{ post.url }}">{{ post.title }}</a>
{% endfor %}

---

## try 5

{% for category in site.categories %}
  {% if category[0] contains "Page" %}
    <h1>{{ post.title }}</h1>
    <a href="{{ post.url }}">{{ post.title }}</a>
  {% endif %}
{% endfor %}
