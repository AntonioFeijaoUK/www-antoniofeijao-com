---
layout: utilities-tool
title: Interactive Maths and Physics Playground
permalink: /games/interactive-maths-and-physics-playground/
description: A browser-based playground for learning maths and physics with sliders, diagrams, formulas, and live visual feedback.
utility_stylesheet: /games/interactive-maths-and-physics-playground/00-game.css
main_class: interactive-maths-physics-playground-page
toc: false
toc_sticky: false
---

<section class="playground-intro">
  <p>
    Explore maths and physics with small interactive labs. Each module focuses on one idea, using clear diagrams,
    sliders, and live calculations instead of heavy graphics.
  </p>
</section>

<section class="playground-shell" aria-labelledby="playground-module-title">
  <div class="playground-header">
    <div>
      <p class="playground-kicker">Module 1</p>
      <h2 id="playground-module-title">Triangle Angle Solver</h2>
    </div>
    <p class="playground-status" id="playground-status" aria-live="polite">Move the sliders to solve the missing angle.</p>
  </div>

  <div class="playground-layout">
    <section class="playground-controls" aria-label="Triangle angle controls">
      <label for="angle-a">
        <span>Angle A</span>
        <strong id="angle-a-value">55 degrees</strong>
      </label>
      <input id="angle-a" type="range" min="15" max="145" value="55" step="1">

      <label for="angle-b">
        <span>Angle B</span>
        <strong id="angle-b-value">65 degrees</strong>
      </label>
      <input id="angle-b" type="range" min="15" max="145" value="65" step="1">

      <label for="angle-c">
        <span>Angle C</span>
        <strong id="angle-c-slider-value">60 degrees</strong>
      </label>
      <input id="angle-c" type="range" min="15" max="145" value="60" step="1">

      <div class="playground-result" aria-label="Solved angle">
        <span>Angle C</span>
        <strong id="angle-c-value">60 degrees</strong>
      </div>

      <div class="playground-formula" aria-label="Triangle angle formula">
        <span>Rule</span>
        <strong id="angle-formula">55 + 65 + 60 = 180 degrees</strong>
      </div>

      <div class="playground-sides" aria-label="Triangle side lengths">
        <span>Side lengths</span>
        <strong id="side-lengths">AB 10.00 | AC 10.47 | BC 9.46</strong>
      </div>

      <div class="playground-pythagorean" aria-label="Pythagorean theorem">
        <label class="playground-toggle" for="right-triangle-mode">
          <input id="right-triangle-mode" type="checkbox">
          <span>Right triangle mode: A = 90 degrees</span>
        </label>
        <span>Pythagorean theorem</span>
        <strong id="pythagorean-formula">Turn on right triangle mode.</strong>
      </div>
    </section>

    <div class="playground-canvas-wrap">
      <canvas
        id="playground-canvas"
        class="playground-canvas"
        width="900"
        height="560"
        aria-label="Triangle angle solver canvas"
      ></canvas>
    </div>
  </div>

  <section class="playground-notes" aria-label="What this module teaches">
    <h2>What This Module Teaches</h2>
    <ul>
      <li>The three inside angles of any triangle always add up to 180 degrees.</li>
      <li>If two angles are known, the missing angle is found with C = 180 degrees - A - B.</li>
      <li>Changing one angle changes the shape of the triangle, but the total angle sum stays the same.</li>
      <li>A triangle with one 90 degree angle is a right triangle; all angles below 90 degrees make an acute triangle.</li>
      <li>In a right triangle, the hypotenuse is the longest side. It sits opposite the 90 degree angle.</li>
      <li>The Pythagorean theorem works only for right triangles: a squared plus b squared equals c squared.</li>
    </ul>
  </section>
</section>

<section class="playground-version-notes" aria-label="Version and build notes">
  <h2>Version and Build Notes</h2>
  <p><strong>Game version:</strong> 0.1.0<br>
  <strong>Published:</strong> 2026-05-04</p>
  <p>
    <strong>AI-assisted build:</strong> Version 0.1.0 of this browser playground was designed and coded with assistance
    from OpenAI Codex using GPT-5.5-class large language models. Human guidance, review, testing, publishing decisions,
    and final responsibility remain with the site owner.
  </p>
  <p>
    This module uses simplified visual geometry for teaching. The calculations are performed locally in the browser and
    are not sent anywhere by this static page.
  </p>
</section>

<script src="{{ '/games/interactive-maths-and-physics-playground/01-angles.js' | relative_url }}" defer></script>
<script src="{{ '/games/interactive-maths-and-physics-playground/00-controller.js' | relative_url }}" defer></script>
