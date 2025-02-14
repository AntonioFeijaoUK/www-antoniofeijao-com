# Cyber Security News Daily Summaries

## section 1

{% for post in blog.posts if 'news' in post.categories %}
- [{{ post.title }}]({{ post.url }})
{% endfor %}


----

## section 2
{% for post in blog.posts %}
- [{{ post.title }}]({{ post.url }})
{% endfor %}
