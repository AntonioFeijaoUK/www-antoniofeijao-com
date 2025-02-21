def define_env(env):
    @env.macro
    def list_cybernews(posts):
        filtered = []
        for post in posts:
            # Ensure the categories are extracted correctly from post metadata.
            cats = post.meta.get('categories', [])
            # Filter posts with a case-insensitive check for 'cybernews'
            if any(cat.lower() == 'cybernews' for cat in cats):
                filtered.append(f"- [{post.title}]({post.url})")
        return "\n".join(filtered)
