def define_env(env):
    @env.macro
    def list_cybernews(posts):
        filtered = []
        for post in posts:
            # Check if the post metadata has 'categories' and if 'cybernews' is present (case-insensitive)
            if "categories" in post.meta and any(cat.lower() == "cybernews" for cat in post.meta.categories):
                filtered.append(f"- [{post.title}]({post.url})")
        return "\n".join(filtered)
