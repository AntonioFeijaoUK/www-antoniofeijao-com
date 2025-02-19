## news

---

```python
### section 1

{% for year in ['2025', '2024'] %}
  <h3>{{ year }}</h3>
  {% for page in pages|sort(attribute='url', reverse=True) %}
    {{ page.title }}
    <br />
  {% endfor %}
{% endfor %}

---

### section 2

* {{ config.site_name }} returns the main title of the website
* {{ environment.system }} returns the name of the OS.
* {{ navigation.pages }} returns a flattened list of all pages
* {{ plugin.module }} name of the Python module

---

### section 3

{{ cybernews_articles(blog.pages) }}


---

### section 4

{% for key, value in globals().items() %}
- {{ key }}: {{ value }}
{% endfor %}

---

### section 5

{% for key, value in globals().items() %}
- {{ key }}: {{ value|safe }}
{% endfor %}

---

### section 6

{% for key, value in globals().items() %}
- {{ key }}: {{ value|safe }}
{% endfor %}


@env.macro
def debug_globals():
   import pprint
   return "<pre>" + pprint.pformat(globals()) + "</pre>"

```

@env.macro
def debug_context(context):
   return "<pre>" + "\n".join(sorted(context.keys())) + "</pre>"
