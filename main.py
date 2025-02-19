def define_env(env):
    @env.macro
    def list_cybernews(posts):
        filtered = []
        for post in posts:
            cats = post.meta.get('categories', [])
            if any(cat.lower() == 'cybernews' for cat in cats):
                filtered.append(f"- [{post.title}]({post.url})")
        return "\n".join(filtered)
