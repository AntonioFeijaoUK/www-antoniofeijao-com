from mkdocs.structure.pages import Page

def define_env(env):
    @env.macro
    def cybernews_articles(pages):
        news_pages = []
        for page in pages:
            if isinstance(page, Page) and "cybernews" in page.meta.get("categories", []):
                news_pages.append(f"- [{page.title}]({page.url})")
        return "\n".join(news_pages)
