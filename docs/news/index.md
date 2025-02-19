---
title: Cybernews
blog: true
---

# Cybernews Articles

```js

{{ cybernews_articles(blog.posts) }}

```

---

## debug if needed

{% for post in blog.posts %}
- {{ post.title }}: {{ post.meta.categories }}
{% endfor %}

{% for page in page.posts %}
- {{ post.title }}: {{ post.meta.categories }}
{% endfor %}

---

---
title: Cybernews Articles
blog: true
---

See all Cybernews posts [here](/categories/cybernews/).
