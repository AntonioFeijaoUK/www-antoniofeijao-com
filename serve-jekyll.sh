#!/usr/bin/env bash

set -euo pipefail

docker run --rm -it \
  -p 4000:4000 \
  -v "$PWD:/srv/jekyll" \
  -v "$HOME/.bundle-cache-jekyll:/usr/local/bundle" \
  -w /srv/jekyll \
  ruby:3.3-bookworm \
  bash -lc '
    set -euo pipefail
    apt-get update
    apt-get install -y --no-install-recommends build-essential git
    gem install bundler --no-document
    bundle install
    exec bundle exec jekyll serve --source docs --destination docs/_site --host 0.0.0.0 --livereload
  '
