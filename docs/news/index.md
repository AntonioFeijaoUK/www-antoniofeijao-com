{% for year in ['2025', '2024'] %}
  <h3>{{ year }}</h3>
  {% for page in pages|sort(attribute='url', reverse=True) %}
    {{ page.title }}
    <br />
  {% endfor %}
{% endfor %}
