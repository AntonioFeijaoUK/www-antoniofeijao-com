docker run --rm -it \
  -p 4000:4000 \
  -v "$PWD:/srv/jekyll" \
  -v "$HOME/.bundle-cache-jekyll:/usr/local/bundle" \
  -w /srv/jekyll \
  ruby:3.3-bookworm \
  bash -lc '
    apt-get update &&
    apt-get install -y build-essential git &&
    gem install bundler &&
    bundle install &&
    bundle exec jekyll serve --source docs --destination docs/_site --host 0.0.0.0 --livereload
  '
