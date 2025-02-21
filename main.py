def define_env(env):
    @env.macro
    def list_cybernews(posts):
        filtered = []
        for post in posts:
            # Use post.config.categories as used by the blog plugin
            cats = post.config.categories if hasattr(post, "config") and hasattr(post.config, "categories") else []
            if any(cat.lower() == "cybernews" for cat in cats):
                filtered.append(f"- [{post.title}]({post.url})")
        return "\n".join(filtered)
