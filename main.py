def generate_cybernews_category(self, config: MkDocsConfig, files: Files):
    for post in self.blog.posts:
        # Check if 'cybernews' is one of the categories (case-insensitive)
        if any(cat.lower() == "cybernews" for cat in post.config.categories):
            name = "cybernews"
            path = self._format_path_for_category(name)
            
            # Optional: Enforce allowed categories
            allowed = self.config.categories_allowed or [name]
            if name not in allowed:
                docs = os.path.relpath(config.docs_dir)
                rel_path = os.path.relpath(post.file.abs_src_path, docs)
                raise PluginError(
                    f"Error reading categories of post '{rel_path}' in '{docs}': "
                    f"category '{name}' not in allow list"
                )
            
            # Create file for the category view if it does not exist
            file = files.get_file_from_path(path)
            if not file:
                file = self._path_to_file(path, config)
                files.append(file)
                self._save_to_file(file.abs_src_path, f"# {name}")
            
            # Temporarily remove the view from navigation
            file.inclusion = InclusionLevel.EXCLUDED
            
            # Create and yield the category view if not already created
            if not isinstance(file.page, Category):
                yield Category(name, file, config)
            
            assert isinstance(file.page, Category)
            file.page.posts.append(post)
            post.categories.append(file.page)
