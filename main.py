def define_env(env):
    @env.macro
    def cybernews_articles(posts):
        news_pages = []
        for post in posts:
            # Ensure 'categories' is a list in post.meta
            categories = post.meta.get("categories", [])
            # Use a case-insensitive check
            if any(cat.lower() == "cybernews" for cat in categories):
                news_pages.append(f"- [{post.title}]({post.url})")
        return "\n".join(news_pages)
