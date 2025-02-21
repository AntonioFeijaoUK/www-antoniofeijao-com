---
title: News
blog: true
---

{{ list_cybernews(blog.posts) }}

---

## for post in blog-posts

{% for post in blog.posts %}
- {{ post.title }}: {{ post.config.categories }}
{% endfor %}


## if blog

{% if blog %}
  Blog is defined.
  Number of posts: {{ blog.posts | length }}
  {% for post in blog.posts %}
    - {{ post.title }}: categories = {{ post.config.categories }}
  {% endfor %}
{% else %}
  Blog is not defined.
{% endif %}

---

## for page in pages

{% for page in pages %}
  - {{ page.title }}: {{ page.meta }}
{% endfor %}
