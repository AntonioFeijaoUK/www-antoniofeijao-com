---
title: Cybernews
blog: true
---

# Cybernews Articles

```
{{ cybernews_articles(blog.posts) }}
```

---

## debug if needed

{% for post in blog.posts %}
- {{ post.title }}: {{ post.meta.categories }}
{% endfor %}
