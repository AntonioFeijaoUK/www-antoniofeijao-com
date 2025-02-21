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

