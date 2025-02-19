
You can call {{ debug_context(context) }} in the markdown.

Be cautious that globals() might differ across environments.

Another option is printing known variables directly, such as {{ config }}, {{ page }}, or {{ env }}.

