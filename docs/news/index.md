## news

{% for year in ['2025', '2024'] %}
  <h3>{{ year }}</h3>
  {% for page in pages|sort(attribute='url', reverse=True) %}
    {{ page.title }}
    <br />
  {% endfor %}
{% endfor %}

* {{ config.site_name }} returns the main title of the website
* {{ environment.system }} returns the name of the OS.
* {{ navigation.pages }} returns a flattened list of all pages
* {{ plugin.module }} name of the Python module

{{ cybernews_articles(blog.pages) }}


