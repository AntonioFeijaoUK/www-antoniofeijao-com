---
layout: utilities-tool
title: Space Invader
permalink: /games/space-invader/
description: A browser-rendered arcade game experiment coded with the help of AI agents.
utility_stylesheet: /games/space-invader/space-invader.css
main_class: space-invader-page
---

<section class="game-intro">
  <p>
    This page is prepared for a small Space Invaders-style browser game coded with the help of AI agents. The goal is
    to keep the game lightweight, client-side, and easy to inspect.
  </p>
</section>

<section class="game-shell" aria-labelledby="space-invader-game-title">
  <div class="game-header">
    <h2 id="space-invader-game-title">Space Invader</h2>
  </div>

  <form class="pilot-form" id="space-invader-pilot-form">
    <div class="pilot-field">
      <label for="space-invader-nickname">Nickname</label>
      <div class="nickname-row">
        <input
          id="space-invader-nickname"
          name="nickname"
          type="text"
          maxlength="18"
          autocomplete="nickname"
          placeholder="Anonymous pilot"
        >
        <button type="button" id="space-invader-random-name">Random</button>
      </div>
    </div>

    <fieldset class="pilot-field emoji-picker">
      <legend>Spaceship</legend>
      <div class="emoji-options" data-emoji-options="ship"></div>
    </fieldset>

    <fieldset class="pilot-field emoji-picker enemy-picker">
      <legend>Enemy</legend>
      <div class="emoji-options" data-emoji-options="enemy"></div>
    </fieldset>
  </form>

  <div class="game-actions">
    <button class="primary-game-button" type="submit" form="space-invader-pilot-form">Play</button>
    <button type="button" id="space-invader-pause">Pause</button>
    <button type="button" id="space-invader-restart">Restart</button>
    <button type="button" id="space-invader-fullscreen">Fullscreen</button>
    <button type="button" id="space-invader-random-emojis">Random emoji</button>
    <button type="button" id="space-invader-stats-toggle" aria-expanded="false" aria-controls="space-invader-browser-stats">Your Game Browser Stats</button>
    <p class="game-status" id="space-invader-status" aria-live="polite">Ready.</p>
  </div>

  <section class="browser-stats-panel" id="space-invader-browser-stats" hidden>
    <h3>Your Game Browser Stats</h3>
    <p>These values are reported by your browser while running this game. They are shown for awareness of browser capabilities, and nothing is sent anywhere by this static page; everything runs locally in your browser.</p>
    <dl class="browser-stats-list" id="space-invader-browser-stats-list"></dl>

    <section class="permission-demo" aria-labelledby="space-invader-permission-demo-title">
      <h4 id="space-invader-permission-demo-title">Optional permission demo</h4>
      <p>These demos only run after you click a button and approve the browser prompt. Results are shown locally here and are not sent anywhere.</p>

      <dl class="permission-legend">
        <dt>granted</dt>
        <dd>already allowed</dd>
        <dt>denied</dt>
        <dd>blocked</dd>
        <dt>prompt</dt>
        <dd>not decided yet; browser would ask</dd>
        <dt>Not supported</dt>
        <dd>browser does not expose that permission through this API</dd>
      </dl>

      <div class="permission-demo-actions">
        <button type="button" id="space-invader-demo-camera">Try camera preview</button>
        <button type="button" id="space-invader-demo-microphone">Try microphone access</button>
        <button type="button" id="space-invader-demo-location">Try geolocation</button>
        <button type="button" id="space-invader-demo-notifications">Try notifications</button>
        <button type="button" id="space-invader-demo-stop-media">Stop media</button>
      </div>

      <video class="permission-camera-preview" id="space-invader-demo-camera-preview" autoplay muted playsinline hidden></video>
      <p class="permission-demo-status" id="space-invader-demo-status" aria-live="polite"></p>
    </section>
  </section>

  <div class="score-strip" aria-label="Game score">
    <p><span>Pilot</span><strong id="space-invader-pilot">Not launched</strong></p>
    <p><span>Score</span><strong id="space-invader-score">0</strong></p>
    <p><span>Level</span><strong id="space-invader-level">1</strong></p>
    <p><span>Lives</span><strong id="space-invader-lives">5</strong></p>
    <p><span>Shots</span><strong id="space-invader-shots">0</strong></p>
    <p><span>Efficiency</span><strong id="space-invader-efficiency">0%</strong></p>
    <p><span>Level time</span><strong id="space-invader-level-time">00:00</strong></p>
    <p><span>Total time</span><strong id="space-invader-total-time">00:00</strong></p>
    <p><span>Best</span><strong id="space-invader-best">0</strong></p>
  </div>

  <canvas
    class="game-canvas"
    id="space-invader-canvas"
    width="640"
    height="360"
    aria-label="Space Invader game canvas"
  ></canvas>

  <div class="touch-controls" aria-label="Touch controls">
    <button type="button" id="space-invader-touch-left" aria-label="Move left">←</button>
    <button type="button" id="space-invader-touch-right" aria-label="Move right">→</button>
    <button type="button" id="space-invader-touch-fire" aria-label="Action">★</button>
  </div>

  <div class="game-notes" aria-label="Controls">
    <p>Controls: move with left and right arrow keys or touch buttons, use space or ★ for the action, pause with P.</p>
  </div>
</section>

<section class="game-version-notes" aria-label="Version and build notes">
  <h2>Version and Build Notes</h2>
  <p><strong>Game version:</strong> 2.0.0<br>
  <strong>Published:</strong> 2026-04-30</p>
  <p>
    <strong>AI-assisted build:</strong> Version 2.0.0 of this browser game was designed, coded, refactored, and reviewed
    with assistance from OpenAI Codex using GPT-5.5-class large language models. Human guidance, review, testing,
    publishing decisions, and final responsibility remain with the site owner.
  </p>
  <p>
    This game runs client-side in the browser. Gameplay state, browser stats, and local best scores are shown locally
    and are not sent anywhere by this static page.
  </p>
</section>

<script src="{{ '/games/space-invader/space-invader-config.js' | relative_url }}" defer></script>
<script src="{{ '/games/space-invader/space-invader-profile.js' | relative_url }}" defer></script>
<script src="{{ '/games/space-invader/space-invader-levels.js' | relative_url }}" defer></script>
<script src="{{ '/games/space-invader/space-invader-renderer.js' | relative_url }}" defer></script>
<script src="{{ '/games/space-invader/space-invader-input.js' | relative_url }}" defer></script>
<script src="{{ '/games/space-invader/space-invader-storage.js' | relative_url }}" defer></script>
<script src="{{ '/games/space-invader/space-invader-browser-stats.js' | relative_url }}" defer></script>
<script src="{{ '/games/space-invader/space-invader.js' | relative_url }}" defer></script>
