<ul>
  {% for thing in site.pages %}
    {% if thing.identifier == 'value' %}
  <li>
    {{ thing.title }}
  </li>
  {% endif %}
  {% endfor %}
</ul>
