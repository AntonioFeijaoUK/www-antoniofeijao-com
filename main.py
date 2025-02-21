def define_env(env):
    @env.macro
    def list_cybernews(posts):
        filtered = []
        for post in posts:
            if hasattr(post, "categories"):
                for category in post.categories:
                    if category.title.lower() == "cybernews":
                        filtered.append(f"- [{post.title}]({post.url})")
                        break  # Found a match; move to the next post
        return "\n".join(filtered)
