Instead of printing the whole configuration, output only serialisable parts, for example:

Site Name: {{ config.site_name }}
Site URL: {{ config.site_url }}

Iterate over keys (if supported):

{% for key, value in config.items() %}
- **{{ key }}:** {{ value }}
{% endfor %}

