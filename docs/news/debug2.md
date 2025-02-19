{% for key, value in globals().items() %}
- {{ key }}: {{ value }}
{% endfor %}

