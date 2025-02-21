---
title: News
blog: true
---

{% for post in blog.posts %}
- {{ post.title }}: {{ post.config.categories }}
{% endfor %}

