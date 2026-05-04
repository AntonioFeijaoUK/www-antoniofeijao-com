---
layout: utilities-tool
title: Space Rocket Physics Explorer
permalink: /games/space-rocket-physics-explorer/
description: A small browser-rendered physics and space science game about rocket flight, gravity, inertia, and mission recovery.
utility_stylesheet: /games/space-rocket-physics-explorer/00-game.css
main_class: space-rocket-physics-explorer-page
toc: false
toc_sticky: false
---

<section class="lunar-intro">
  <p>
    Explore rocket physics through small browser-based missions. Mission 1 starts on the Moon: protect the sample
    capsule, avoid meteoroids, and reach Earth with enough control for a safe return. Short thrusts save fuel, gravity
    changes by region, and momentum matters.
  </p>
</section>

<section class="lunar-game-shell" aria-labelledby="lunar-game-title">
  <div class="lunar-game-header">
    <h2 id="lunar-game-title">Mission 1: Moon to Earth</h2>
    <p class="lunar-status" id="lunar-status" aria-live="polite">Ready for launch.</p>
  </div>

  <section class="mission-selector" aria-labelledby="mission-selector-title">
    <h3 id="mission-selector-title">Mission selector</h3>
    <div class="mission-options">
      <button class="mission-option is-active" type="button" data-mission-id="lunar-return" data-mission-title="Mission 1: Moon to Earth" aria-pressed="true">
        <span>Mission 1</span>
        <strong>Moon to Earth</strong>
        <small>Return lunar samples through cislunar space.</small>
      </button>
      <button class="mission-option" type="button" data-mission-id="earth-launch" data-mission-title="Mission 2: Earth Launch" aria-pressed="false">
        <span>Mission 2</span>
        <strong>Earth Launch</strong>
        <small>Countdown, ignition, liftoff, atmosphere, drag, and Max-Q.</small>
      </button>
    </div>
  </section>

  <div class="lunar-actions">
    <button class="primary-lunar-button" type="button" id="lunar-start">Start mission</button>
    <button type="button" id="lunar-pause">Pause</button>
    <button type="button" id="lunar-restart">Restart</button>
  </div>

  <div class="lunar-score-strip" aria-label="Mission telemetry">
    <p><span>Fuel reserve</span><strong id="lunar-fuel">100%</strong></p>
    <p><span>Rocket integrity</span><strong id="lunar-rocket-integrity">100%</strong></p>
    <p><span>Payload status</span><strong id="lunar-samples">100%</strong></p>
    <p><span>Speed (simulation)</span><strong id="lunar-speed">0 m/s</strong></p>
    <p><span>Gravity</span><strong id="lunar-gravity">Moon</strong></p>
    <p><span>Mission target</span><strong id="lunar-distance">384,400 km to platform</strong></p>
  </div>

  <canvas
    class="lunar-canvas"
    id="lunar-canvas"
    width="900"
    height="480"
    aria-label="Space Rocket Physics Explorer game canvas"
  ></canvas>

  <div class="lunar-touch-controls" aria-label="Touch controls">
    <button type="button" id="lunar-touch-left" aria-label="Rotate left">Rotate left</button>
    <button type="button" id="lunar-touch-up" aria-label="Main thrust">Thrust</button>
    <button type="button" id="lunar-touch-down" aria-label="Retro thrusters">Retro</button>
    <button type="button" id="lunar-touch-right" aria-label="Rotate right">Rotate right</button>
  </div>

  <div class="lunar-notes" aria-label="Controls and science notes">
    <p>Controls: left and right rotate, up or Thrust fires the main engine, down or Retro fires thrusters opposite the rocket nose.</p>
    <p class="mission-control-tip" data-control-tip="lunar-return">Mission 1 tip: use short correction burns. In space, momentum carries the capsule forward even after thrust stops.</p>
    <p class="mission-control-tip" data-control-tip="earth-launch" hidden>Mission 2 tip: hold thrust for liftoff, use a tiny right tap for a gravity turn, then manage thrust and retro to stay inside the 100-220 km target corridor with at least 25 m/s sideways velocity.</p>
  </div>
</section>

<section class="lunar-science-notes" aria-label="Physics notes">
  <div class="mission-science-panel" data-science-mission="lunar-return">
    <h2>What Mission 1 Teaches</h2>
    <ul>
      <li>Moon gravity is weaker than Earth gravity, so leaving the Moon costs less fuel than launching from Earth.</li>
      <li>In space, inertia dominates: after thrusting, the rocket continues moving until another force changes its path.</li>
      <li>Earth gravity becomes stronger as the capsule approaches, so speed control matters near the destination.</li>
      <li>The gravity influence layers are visual teaching aids. Gravity does not switch off at a boundary; it fades with distance, and the cislunar coast is closer to free fall than true zero gravity.</li>
      <li>Retro thrusters create delta-v opposite the rocket nose. If the craft is pointing against its motion, that slows it down; if held longer, it can reverse direction.</li>
      <li>Meteoroid impacts damage both rocket integrity and sample integrity. A mission can fail even if the capsule is still moving.</li>
      <li>Telemetry uses standard reference values: Earth surface gravity is 9.80665 m/s^2, or 1 g; lunar surface gravity is about 1.62 m/s^2, or about 0.165 g.</li>
      <li>Gravity is shown as acceleration. A newton is a force unit, so the force in newtons depends on the mass of the spacecraft or sample.</li>
    </ul>
  </div>

  <div class="mission-science-panel" data-science-mission="earth-launch" hidden>
    <h2>What Mission 2 Teaches</h2>
    <ul>
      <li>Mission 2 introduces atmospheric drag and dynamic pressure. Max-Q is the moment of greatest aerodynamic stress during launch.</li>
      <li>The Karman line at 100 km is a common convention for the edge of space. It is useful for teaching, but it is not a hard physical boundary.</li>
      <li>A rocket lifts off only when thrust is greater than weight. The game shows thrust-to-weight ratio as T/W: values above 1 mean the vehicle can rise.</li>
      <li>Mission 2 requires a sustained 30 second ascent, some sideways velocity, and arrival inside the 100-220 km target corridor. Going straight up too fast overshoots the target.</li>
      <li>The pitch corridor shows a simplified gravity-turn target. Outside the corridor, the rocket meets the air at a poor angle, increasing drag and side loads.</li>
      <li>The Max-Q warning means aerodynamic pressure is high. The red shock effect is a teaching cue for pressure and heating; real launch vehicles throttle down mostly to reduce structural loads.</li>
      <li>Rocket propellants vary. Saturn V used kerosene and liquid oxygen in its first stage, SLS core engines use liquid hydrogen and liquid oxygen, and Starship/Super Heavy uses liquid methane and liquid oxygen.</li>
      <li>Helium is usually used for pressurisation or purging, not as the main rocket fuel.</li>
    </ul>
  </div>
</section>

<section class="lunar-version-notes" aria-label="Version and build notes">
  <h2>Version and Build Notes</h2>
  <p><strong>Game version:</strong> 1.0.0<br>
  <strong>Published:</strong> 2026-05-04</p>
  <p>
    <strong>AI-assisted build:</strong> Version 1.0.0 of this browser game was designed, coded, refactored, and reviewed
    with assistance from OpenAI Codex using GPT-5.5-class large language models. Human guidance, review, testing,
    publishing decisions, and final responsibility remain with the site owner.
  </p>
  <p>
    This game runs client-side in the browser. Gameplay state, mission telemetry, educational prompts, and sample
    recovery results are shown locally and are not sent anywhere by this static page.
  </p>
  <p>
    This first playable prototype uses simplified game physics for teaching rather than a real astrodynamics model.
    Gravity telemetry uses standard reference values where appropriate, but the flight path, speed, hazards, and
    recovery corridor are tuned for approachable gameplay.
  </p>
</section>

<script src="{{ '/games/space-rocket-physics-explorer/00-renderer.js' | relative_url }}" defer></script>
<script src="{{ '/games/space-rocket-physics-explorer/00-input.js' | relative_url }}" defer></script>
<script src="{{ '/games/space-rocket-physics-explorer/01-moon-to-earth.js' | relative_url }}" defer></script>
<script src="{{ '/games/space-rocket-physics-explorer/02-earth-launch.js' | relative_url }}" defer></script>
<script src="{{ '/games/space-rocket-physics-explorer/00-controller.js' | relative_url }}" defer></script>
