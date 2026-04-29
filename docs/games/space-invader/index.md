---
layout: utilities-tool
title: Space Invader
permalink: /games/space-invader/
description: A browser-rendered arcade game experiment coded with the help of AI agents.
utility_stylesheet: /games/space-invader/space-invader.css
utility_script: /games/space-invader/space-invader.js
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
    <div>
      <p class="game-label">AI-coded browser game</p>
      <h2 id="space-invader-game-title">Space Invader</h2>
    </div>
    <p class="game-status" id="space-invader-status" aria-live="polite">Create your pilot profile.</p>
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

    <fieldset class="pilot-field emoji-picker ship-picker">
      <legend>Spaceship</legend>
      <label>
        <input type="radio" name="ship" value="🚀" checked>
        <span>🚀</span>
      </label>
      <label>
        <input type="radio" name="ship" value="🛸">
        <span>🛸</span>
      </label>
      <label>
        <input type="radio" name="ship" value="✨">
        <span>✨</span>
      </label>
      <label>
        <input type="radio" name="ship" value="🔺">
        <span>🔺</span>
      </label>
      <label>
        <input type="radio" name="ship" value="🛰️">
        <span>🛰️</span>
      </label>
      <label>
        <input type="radio" name="ship" value="🛩️">
        <span>🛩️</span>
      </label>
      <label>
        <input type="radio" name="ship" value="⚡">
        <span>⚡</span>
      </label>
      <label>
        <input type="radio" name="ship" value="🌟">
        <span>🌟</span>
      </label>
      <label>
        <input type="radio" name="ship" value="💫">
        <span>💫</span>
      </label>
      <label>
        <input type="radio" name="ship" value="🔥">
        <span>🔥</span>
      </label>
      <label>
        <input type="radio" name="ship" value="💎">
        <span>💎</span>
      </label>
      <label>
        <input type="radio" name="ship" value="🧭">
        <span>🧭</span>
      </label>
      <label>
        <input type="radio" name="ship" value="🛡️">
        <span>🛡️</span>
      </label>
      <label>
        <input type="radio" name="ship" value="🎯">
        <span>🎯</span>
      </label>
      <label>
        <input type="radio" name="ship" value="🔷">
        <span>🔷</span>
      </label>
      <label>
        <input type="radio" name="ship" value="🔶">
        <span>🔶</span>
      </label>
      <label>
        <input type="radio" name="ship" value="🟣">
        <span>🟣</span>
      </label>
      <label>
        <input type="radio" name="ship" value="🟢">
        <span>🟢</span>
      </label>
      <label>
        <input type="radio" name="ship" value="🔴">
        <span>🔴</span>
      </label>
      <label>
        <input type="radio" name="ship" value="🟡">
        <span>🟡</span>
      </label>
    </fieldset>

    <fieldset class="pilot-field emoji-picker enemy-picker">
      <legend>Enemy</legend>
      <label>
        <input type="radio" name="enemy" value="👾" checked>
        <span>👾</span>
      </label>
      <label>
        <input type="radio" name="enemy" value="🛸">
        <span>🛸</span>
      </label>
      <label>
        <input type="radio" name="enemy" value="🎈">
        <span>🎈</span>
      </label>
      <label>
        <input type="radio" name="enemy" value="🎁">
        <span>🎁</span>
      </label>
      <label>
        <input type="radio" name="enemy" value="🍩">
        <span>🍩</span>
      </label>
      <label>
        <input type="radio" name="enemy" value="🍕">
        <span>🍕</span>
      </label>
      <label>
        <input type="radio" name="enemy" value="🍄">
        <span>🍄</span>
      </label>
      <label>
        <input type="radio" name="enemy" value="🌵">
        <span>🌵</span>
      </label>
      <label>
        <input type="radio" name="enemy" value="🌙">
        <span>🌙</span>
      </label>
      <label>
        <input type="radio" name="enemy" value="⭐">
        <span>⭐</span>
      </label>
      <label>
        <input type="radio" name="enemy" value="☁️">
        <span>☁️</span>
      </label>
      <label>
        <input type="radio" name="enemy" value="🌈">
        <span>🌈</span>
      </label>
      <label>
        <input type="radio" name="enemy" value="🎲">
        <span>🎲</span>
      </label>
      <label>
        <input type="radio" name="enemy" value="🎮">
        <span>🎮</span>
      </label>
      <label>
        <input type="radio" name="enemy" value="🧩">
        <span>🧩</span>
      </label>
      <label>
        <input type="radio" name="enemy" value="💎">
        <span>💎</span>
      </label>
      <label>
        <input type="radio" name="enemy" value="🟣">
        <span>🟣</span>
      </label>
      <label>
        <input type="radio" name="enemy" value="🟢">
        <span>🟢</span>
      </label>
      <label>
        <input type="radio" name="enemy" value="🟡">
        <span>🟡</span>
      </label>
      <label>
        <input type="radio" name="enemy" value="🔷">
        <span>🔷</span>
      </label>
    </fieldset>

    <button class="primary-game-button" type="submit">Start game</button>
  </form>

  <div class="score-strip" aria-label="Game score">
    <p><span>Pilot</span><strong id="space-invader-pilot">Not launched</strong></p>
    <p><span>Score</span><strong id="space-invader-score">0</strong></p>
    <p><span>Lives</span><strong id="space-invader-lives">3</strong></p>
    <p><span>Best</span><strong id="space-invader-best">0</strong></p>
  </div>

  <canvas
    class="game-canvas"
    id="space-invader-canvas"
    width="640"
    height="480"
    aria-label="Space Invader game canvas"
  ></canvas>

  <div class="game-actions">
    <button type="button" id="space-invader-pause">Pause</button>
    <button type="button" id="space-invader-restart">Restart</button>
  </div>

  <div class="game-notes" aria-label="Controls">
    <p>Controls: move with left and right arrow keys, fire with space, pause with P.</p>
  </div>
</section>
