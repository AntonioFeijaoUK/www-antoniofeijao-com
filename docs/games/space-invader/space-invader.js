(function () {
  var canvas = document.getElementById("space-invader-canvas");
  var status = document.getElementById("space-invader-status");
  var form = document.getElementById("space-invader-pilot-form");
  var nicknameInput = document.getElementById("space-invader-nickname");
  var randomNameButton = document.getElementById("space-invader-random-name");
  var pilotDisplay = document.getElementById("space-invader-pilot");
  var scoreDisplay = document.getElementById("space-invader-score");
  var livesDisplay = document.getElementById("space-invader-lives");
  var levelDisplay = document.getElementById("space-invader-level");
  var shotsDisplay = document.getElementById("space-invader-shots");
  var efficiencyDisplay = document.getElementById("space-invader-efficiency");
  var levelTimeDisplay = document.getElementById("space-invader-level-time");
  var totalTimeDisplay = document.getElementById("space-invader-total-time");
  var bestDisplay = document.getElementById("space-invader-best");
  var pauseButton = document.getElementById("space-invader-pause");
  var restartButton = document.getElementById("space-invader-restart");
  var fullscreenButton = document.getElementById("space-invader-fullscreen");
  var randomEmojisButton = document.getElementById("space-invader-random-emojis");
  var statsToggleButton = document.getElementById("space-invader-stats-toggle");
  var statsPanel = document.getElementById("space-invader-browser-stats");
  var statsList = document.getElementById("space-invader-browser-stats-list");
  var touchLeftButton = document.getElementById("space-invader-touch-left");
  var touchFireButton = document.getElementById("space-invader-touch-fire");
  var touchRightButton = document.getElementById("space-invader-touch-right");

  if (!canvas || !canvas.getContext) {
    if (status) {
      status.textContent = "Canvas is not available in this browser.";
    }
    return;
  }

  var context = canvas.getContext("2d");
  var gameWidth = 640;
  var gameHeight = 360;
  var storageKey = "space-invader-best-record";
  var keys = {};
  var animationId = null;
  var lastTime = 0;
  var game = null;
  var browserStats = null;

  var pilotNames = [
    "Nova Pilot",
    "Orbit Ace",
    "Pixel Ranger",
    "Star Cadet",
    "Cosmic Byte",
    "Lunar Scout",
    "Solar Spark",
    "Astro Coder"
  ];

  function resizeCanvas() {
    var pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    var displayWidth = canvas.clientWidth || gameWidth;
    var displayHeight = canvas.clientHeight || Math.round(displayWidth * 0.5625);

    gameWidth = Math.max(360, Math.round(displayWidth));
    gameHeight = Math.max(240, Math.round(displayHeight));

    canvas.width = Math.floor(displayWidth * pixelRatio);
    canvas.height = Math.floor(displayHeight * pixelRatio);
    context.setTransform(canvas.width / gameWidth, 0, 0, canvas.height / gameHeight, 0, 0);
    context.imageSmoothingEnabled = false;

    if (game) {
      game.player.y = gameHeight - 58;
      game.player.speed = Math.max(280, gameWidth * 0.5);
      game.player.x = Math.max(12, Math.min(gameWidth - game.player.width - 12, game.player.x));
    }

    draw();
    updateStatsIfVisible();
  }

  function getBestRecord() {
    var fallback = {
      enemy: "",
      nickname: "",
      ship: "",
      score: 0
    };

    try {
      var saved = JSON.parse(localStorage.getItem(storageKey));
      if (saved && Number.isFinite(Number(saved.score))) {
        saved.score = Number(saved.score);
        return saved;
      }
    } catch (error) {
      return fallback;
    }

    return fallback;
  }

  function setBestRecord() {
    if (game.score > getBestRecord().score) {
      try {
        localStorage.setItem(storageKey, JSON.stringify({
          enemy: game.profile.enemy,
          nickname: game.profile.nickname,
          ship: game.profile.ship,
          score: game.score
        }));
      } catch (error) {
        return;
      }
    }
  }

  function getRandomName() {
    return pilotNames[Math.floor(Math.random() * pilotNames.length)] + " " + Math.floor(10 + Math.random() * 90);
  }

  function getSelectedShip() {
    var selected = form.querySelector("input[name='ship']:checked");
    return selected ? selected.value : "🚀";
  }

  function getSelectedEnemy() {
    var selected = form.querySelector("input[name='enemy']:checked");
    return selected ? selected.value : "👾";
  }

  function selectRandomOption(name) {
    var options = form.querySelectorAll("input[name='" + name + "']");
    if (options.length === 0) {
      return;
    }

    options[Math.floor(Math.random() * options.length)].checked = true;
  }

  function selectRandomEmojis() {
    selectRandomOption("ship");
    selectRandomOption("enemy");
  }

  function bindHoldButton(button, keyName) {
    if (!button) {
      return;
    }

    function hold(event) {
      event.preventDefault();
      keys[keyName] = true;
    }

    function release(event) {
      event.preventDefault();
      keys[keyName] = false;
    }

    button.addEventListener("pointerdown", hold);
    button.addEventListener("pointerup", release);
    button.addEventListener("pointercancel", release);
    button.addEventListener("pointerleave", release);
  }

  function bindFireButton(button) {
    if (!button) {
      return;
    }

    button.addEventListener("pointerdown", function (event) {
      event.preventDefault();
      if (resumeAfterHit()) {
        return;
      }

      firePlayerBullet();
    });
  }

  function getCurrentGameSummary() {
    if (!game) {
      return "Not launched";
    }

    return [
      "level " + game.level,
      "score " + game.score,
      "lives " + game.lives,
      "shots " + game.shotsFired,
      "efficiency " + Math.round(getEfficiency() * 100) + "%",
      "level time " + formatTime(game.levelElapsed),
      "total time " + formatTime(game.totalElapsed),
      "targets left " + getAliveEnemies().length
    ].join(", ");
  }

  function updateStatsIfVisible() {
    if (browserStats) {
      browserStats.updateIfVisible();
    }
  }

  function normaliseNickname(value) {
    var nickname = value.trim().replace(/\s+/g, " ");
    return nickname || getRandomName();
  }

  function formatTime(seconds) {
    var safeSeconds = Math.max(0, Math.floor(seconds));
    var minutes = Math.floor(safeSeconds / 60);
    var remainingSeconds = safeSeconds % 60;

    return String(minutes).padStart(2, "0") + ":" + String(remainingSeconds).padStart(2, "0");
  }

  function getEfficiency() {
    if (!game || game.shotsFired === 0) {
      return 0;
    }

    return game.enemiesHit / game.shotsFired;
  }

  function getEfficiencyBonus() {
    return Math.round(getEfficiency() * 100 * game.level);
  }

  function getEnemyCountForLevel(level) {
    return Math.min(getLevelEnemyTarget(level), getLevelCapacity());
  }

  function getLevelEnemyTarget(level) {
    return 10 * Math.pow(2, level - 1);
  }

  function getLevelCapacity() {
    var horizontalSlots = Math.max(1, Math.floor((gameWidth - 80) / 52));
    var verticalSlots = Math.max(1, Math.floor((gameHeight * 0.42) / 38));

    return horizontalSlots * verticalSlots;
  }

  function createEnemies(level) {
    var enemies = [];
    var count = getEnemyCountForLevel(level);
    var maxColumns = Math.max(1, Math.floor((gameWidth - 80) / 52));
    var columns = Math.min(maxColumns, count);
    var rows = Math.ceil(count / columns);
    var usedColumns = Math.min(columns, count);
    var startX = Math.max(40, Math.round((gameWidth - ((usedColumns - 1) * 52 + 28)) / 2));
    var startY = 60;
    var gapX = 52;
    var gapY = 38;
    var created = 0;

    for (var row = 0; row < rows; row += 1) {
      for (var column = 0; column < columns; column += 1) {
        if (created >= count) {
          break;
        }

        enemies.push({
          x: startX + column * gapX,
          y: startY + row * gapY,
          width: 28,
          height: 20,
          alive: true
        });
        created += 1;
      }
    }

    return enemies;
  }

  function getLevelSpeed(level) {
    return 32 * Math.pow(1.22, level - 1);
  }

  function getEnemyAccuracyRange() {
    var minimum = Math.min(0.5 + (game.level - 1) * 0.05, 0.78);
    var maximum = Math.min(0.65 + (game.level - 1) * 0.05, 0.9);

    return {
      minimum: minimum,
      maximum: maximum
    };
  }

  function createEnemyBullet(shooter) {
    var speed = Math.max(190, gameHeight * 0.42);
    var originX = shooter.x + shooter.width / 2;
    var originY = shooter.y + shooter.height;
    var targetX = game.player.x + game.player.width / 2;
    var targetY = game.player.y + game.player.height / 2;
    var accuracyRange = getEnemyAccuracyRange();
    var accuracy = accuracyRange.minimum + Math.random() * (accuracyRange.maximum - accuracyRange.minimum);
    var maximumMiss = Math.max(40, gameWidth * 0.18);
    var missOffset = (Math.random() - 0.5) * 2 * maximumMiss * (1 - accuracy);
    var aimX = targetX + missOffset;
    var aimY = targetY;
    var deltaX = aimX - originX;
    var deltaY = Math.max(40, aimY - originY);
    var distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY) || 1;

    return {
      x: originX - 2,
      y: originY,
      width: 4,
      height: 10,
      velocityX: (deltaX / distance) * speed,
      velocityY: (deltaY / distance) * speed
    };
  }

  function loadLevel(level, previousBonus) {
    game.level = level;
    game.enemies = createEnemies(level);
    game.enemyDirection = 1;
    game.enemySpeed = getLevelSpeed(level);
    game.enemyDrop = Math.min(26, 16 + level);
    game.bullets = [];
    game.enemyBullets = [];
    game.enemyShotTimer = Math.max(0.45, 1.2 - level * 0.04);
    game.levelElapsed = 0;
    if (previousBonus) {
      setStatus("Efficiency bonus: " + previousBonus + ". Level " + level + ": " + game.enemies.length + " targets.");
    } else {
      setStatus("Level " + level + ": " + game.enemies.length + " targets.");
    }
  }

  function createGame(profile) {
    var newGame = {
      profile: profile,
      player: {
        x: gameWidth / 2 - 20,
        y: gameHeight - 58,
        width: 40,
        height: 28,
        speed: Math.max(280, gameWidth * 0.5),
        cooldown: 0
      },
      level: 1,
      enemies: [],
      enemyDirection: 1,
      enemySpeed: 32,
      enemyDrop: 16,
      bullets: [],
      enemyBullets: [],
      enemyShotTimer: 1.2,
      score: 0,
      lives: 5,
      shotsFired: 0,
      enemiesHit: 0,
      levelElapsed: 0,
      totalElapsed: 0,
      hitEffect: null,
      levelClear: null,
      state: "running"
    };

    game = newGame;
    loadLevel(1);
    return newGame;
  }

  function updateScoreboard() {
    var bestRecord = getBestRecord();

    if (!game) {
      bestDisplay.textContent = bestRecord.score ? bestRecord.ship + " " + bestRecord.score : "0";
      return;
    }

    pilotDisplay.textContent = game.profile.ship + " " + game.profile.nickname;
    scoreDisplay.textContent = String(game.score);
    levelDisplay.textContent = String(game.level);
    livesDisplay.textContent = String(game.lives);
    shotsDisplay.textContent = String(game.shotsFired);
    efficiencyDisplay.textContent = Math.round(getEfficiency() * 100) + "%";
    levelTimeDisplay.textContent = formatTime(game.levelElapsed);
    totalTimeDisplay.textContent = formatTime(game.totalElapsed);
    if (game.score > bestRecord.score) {
      bestDisplay.textContent = game.profile.ship + " " + game.score;
    } else {
      bestDisplay.textContent = bestRecord.score ? bestRecord.ship + " " + bestRecord.score : "0";
    }

    updateStatsIfVisible();
  }

  function setStatus(message) {
    if (status) {
      status.textContent = message;
    }
  }

  function startGame(profile) {
    if (animationId) {
      cancelAnimationFrame(animationId);
    }

    game = createGame(profile);
    lastTime = performance.now();
    updateScoreboard();
    animationId = requestAnimationFrame(loop);
  }

  function restartGame() {
    if (!game) {
      return;
    }

    startGame(game.profile);
  }

  function resumeAfterHit() {
    if (!game || game.state !== "hit") {
      return false;
    }

    game.hitEffect = null;
    game.state = "running";
    setStatus("Defend the sector.");
    lastTime = performance.now();
    return true;
  }

  function continueAfterLevelClear() {
    if (!game || game.state !== "level-clear" || !game.levelClear) {
      return false;
    }

    var nextLevel = game.levelClear.nextLevel;
    game.levelClear = null;
    loadLevel(nextLevel);
    game.state = "running";
    lastTime = performance.now();
    updateScoreboard();
    return true;
  }

  function firePlayerBullet() {
    if (!game || game.player.cooldown > 0 || game.state !== "running") {
      return;
    }

    game.bullets.push({
      x: game.player.x + game.player.width / 2 - 2,
      y: game.player.y - 8,
      width: 4,
      height: 12,
      speed: Math.max(420, gameHeight * 0.9)
    });
    game.shotsFired += 1;
    game.player.cooldown = 0.28;
  }

  function togglePause() {
    if (!game || game.state === "hit" || game.state === "level-clear" || game.state === "won" || game.state === "lost") {
      return;
    }

    game.state = game.state === "paused" ? "running" : "paused";
    setStatus(game.state === "paused" ? "Paused." : "Defend the sector.");
    lastTime = performance.now();
  }

  function toggleFullscreen() {
    var shell = document.querySelector(".game-shell");

    if (!shell || !shell.requestFullscreen) {
      setStatus("Fullscreen is not available in this browser.");
      return;
    }

    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      shell.requestFullscreen();
    }
  }

  function getAliveEnemies() {
    return game.enemies.filter(function (enemy) {
      return enemy.alive;
    });
  }

  function rectanglesOverlap(first, second) {
    return (
      first.x < second.x + second.width &&
      first.x + first.width > second.x &&
      first.y < second.y + second.height &&
      first.y + first.height > second.y
    );
  }

  function updatePlayer(delta) {
    if (keys.ArrowLeft || keys.a || keys.touchLeft) {
      game.player.x -= game.player.speed * delta;
    }

    if (keys.ArrowRight || keys.d || keys.touchRight) {
      game.player.x += game.player.speed * delta;
    }

    game.player.x = Math.max(12, Math.min(gameWidth - game.player.width - 12, game.player.x));
    game.player.cooldown = Math.max(0, game.player.cooldown - delta);
  }

  function updateBullets(delta) {
    game.bullets.forEach(function (bullet) {
      bullet.y -= bullet.speed * delta;
    });

    game.enemyBullets.forEach(function (bullet) {
      bullet.x += bullet.velocityX * delta;
      bullet.y += bullet.velocityY * delta;
    });

    game.bullets = game.bullets.filter(function (bullet) {
      return bullet.y + bullet.height > 0;
    });

    game.enemyBullets = game.enemyBullets.filter(function (bullet) {
      return bullet.y < gameHeight && bullet.x + bullet.width > 0 && bullet.x < gameWidth;
    });
  }

  function updateEnemies(delta) {
    var aliveEnemies = getAliveEnemies();
    var shouldDrop = false;

    aliveEnemies.forEach(function (enemy) {
      enemy.x += game.enemyDirection * game.enemySpeed * delta;

      if (enemy.x < 18 || enemy.x + enemy.width > gameWidth - 18) {
        shouldDrop = true;
      }
    });

    if (shouldDrop) {
      game.enemyDirection *= -1;
      aliveEnemies.forEach(function (enemy) {
        enemy.y += game.enemyDrop;
      });
    }

    game.enemyShotTimer -= delta;
    if (game.enemyShotTimer <= 0 && aliveEnemies.length > 0) {
      var shooter = aliveEnemies[Math.floor(Math.random() * aliveEnemies.length)];
      game.enemyBullets.push(createEnemyBullet(shooter));
      game.enemyShotTimer = Math.max(0.45, 1.4 - game.score / 1200);
    }
  }

  function handleCollisions() {
    game.bullets.forEach(function (bullet) {
      game.enemies.forEach(function (enemy) {
        if (enemy.alive && rectanglesOverlap(bullet, enemy)) {
          enemy.alive = false;
          bullet.hit = true;
          game.score += 20;
          game.enemiesHit += 1;
        }
      });
    });

    game.bullets = game.bullets.filter(function (bullet) {
      return !bullet.hit;
    });

    game.enemyBullets.forEach(function (bullet) {
      if (!game.hitEffect && rectanglesOverlap(bullet, game.player)) {
        bullet.hit = true;
        game.lives -= 1;
        game.hitEffect = {
          x: game.player.x + game.player.width / 2,
          y: game.player.y + game.player.height / 2
        };
      }
    });

    game.enemyBullets = game.enemyBullets.filter(function (bullet) {
      return !bullet.hit;
    });

    if (getAliveEnemies().some(function (enemy) {
      return enemy.y + enemy.height >= game.player.y;
    })) {
      game.lives = 0;
    }

    if (game.lives <= 0) {
      game.state = "lost";
      setBestRecord();
      setStatus("Game over. Restart when ready.");
    } else if (game.hitEffect) {
      game.state = "hit";
      setStatus("Hit. Press Enter or Play to continue.");
    } else if (getAliveEnemies().length === 0) {
      var efficiencyBonus = getEfficiencyBonus();
      var nextLevel = game.level + 1;
      game.score += 150 * game.level + efficiencyBonus;
      game.levelClear = {
        bonus: efficiencyBonus,
        nextLevel: nextLevel,
        nextEnemyCount: getEnemyCountForLevel(nextLevel)
      };
      game.state = "level-clear";
      setStatus("Level clear. Press Enter or Play to continue.");
      updateScoreboard();
    }
  }

  function update(delta) {
    if (!game || game.state !== "running") {
      return;
    }

    game.levelElapsed += delta;
    game.totalElapsed += delta;
    updatePlayer(delta);
    updateBullets(delta);
    updateEnemies(delta);
    handleCollisions();
    updateScoreboard();
  }

  function drawBackground() {
    context.fillStyle = "#05070a";
    context.fillRect(0, 0, gameWidth, gameHeight);

    context.fillStyle = "#203040";
    for (var i = 0; i < 40; i += 1) {
      var x = (i * 83) % gameWidth;
      var y = (i * 47) % gameHeight;
      context.fillRect(x, y, 2, 2);
    }
  }

  function drawPlayer() {
    context.font = "28px sans-serif";
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillText(game.profile.ship, game.player.x + game.player.width / 2, game.player.y + game.player.height / 2);
  }

  function drawEnemies() {
    game.enemies.forEach(function (enemy) {
      if (!enemy.alive) {
        return;
      }

      context.font = "22px sans-serif";
      context.textAlign = "center";
      context.textBaseline = "middle";
      context.fillText(game.profile.enemy, enemy.x + enemy.width / 2, enemy.y + enemy.height / 2);
    });
  }

  function drawBullets() {
    context.fillStyle = "#f4d35e";
    game.bullets.forEach(function (bullet) {
      context.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
    });

    context.fillStyle = "#ff6b6b";
    game.enemyBullets.forEach(function (bullet) {
      context.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
    });
  }

  function drawHitEffect() {
    if (!game || !game.hitEffect) {
      return;
    }

    context.font = "42px sans-serif";
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillText("💥", game.hitEffect.x, game.hitEffect.y);
  }

  function drawOverlay() {
    if (!game || game.state === "running") {
      return;
    }

    context.fillStyle = "rgba(5, 7, 10, 0.72)";
    context.fillRect(0, 0, gameWidth, gameHeight);
    context.fillStyle = "#ffffff";
    context.font = "26px sans-serif";
    context.textAlign = "center";
    context.textBaseline = "middle";

    if (game.state === "paused") {
      context.fillText("Paused", gameWidth / 2, gameHeight / 2);
    } else if (game.state === "hit") {
      context.fillText("Direct hit", gameWidth / 2, gameHeight / 2 - 12);
      context.font = "16px sans-serif";
      context.fillText("Press Enter or Play to continue.", gameWidth / 2, gameHeight / 2 + 22);
    } else if (game.state === "level-clear" && game.levelClear) {
      context.fillText("Level clear", gameWidth / 2, gameHeight / 2 - 44);
      context.font = "16px sans-serif";
      context.fillText("Efficiency bonus: " + game.levelClear.bonus, gameWidth / 2, gameHeight / 2 - 10);
      context.fillText(
        "Next level: " + game.levelClear.nextLevel + " with " + game.levelClear.nextEnemyCount + " targets.",
        gameWidth / 2,
        gameHeight / 2 + 18
      );
      context.fillText("Press Enter or Play to continue.", gameWidth / 2, gameHeight / 2 + 50);
    } else if (game.state === "won") {
      context.fillText("Sector clear", gameWidth / 2, gameHeight / 2 - 12);
      context.font = "16px sans-serif";
      context.fillText("Press Restart to play again.", gameWidth / 2, gameHeight / 2 + 22);
    } else if (game.state === "lost") {
      context.fillText("Game over", gameWidth / 2, gameHeight / 2 - 12);
      context.font = "16px sans-serif";
      context.fillText("Press Restart to try again.", gameWidth / 2, gameHeight / 2 + 22);
    }
  }

  function drawStartScreen() {
    drawBackground();
    context.fillStyle = "#9ee493";
    context.font = "24px sans-serif";
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillText("Choose a pilot and launch", gameWidth / 2, gameHeight / 2 - 12);
    context.fillStyle = "#b7c7d9";
    context.font = "16px sans-serif";
    context.fillText("Nickname and ship emoji can later feed a leaderboard.", gameWidth / 2, gameHeight / 2 + 20);
  }

  function draw() {
    if (!game) {
      drawStartScreen();
      return;
    }

    drawBackground();
    drawEnemies();
    drawBullets();
    drawPlayer();
    drawHitEffect();
    drawOverlay();
  }

  function loop(currentTime) {
    var delta = Math.min((currentTime - lastTime) / 1000, 0.05);
    lastTime = currentTime;

    update(delta);
    draw();
    animationId = requestAnimationFrame(loop);
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    if (resumeAfterHit()) {
      return;
    }

    if (continueAfterLevelClear()) {
      return;
    }

    startGame({
      enemy: getSelectedEnemy(),
      nickname: normaliseNickname(nicknameInput.value),
      ship: getSelectedShip()
    });
  });

  randomNameButton.addEventListener("click", function () {
    nicknameInput.value = getRandomName();
    nicknameInput.focus();
  });

  pauseButton.addEventListener("click", togglePause);
  restartButton.addEventListener("click", restartGame);
  fullscreenButton.addEventListener("click", toggleFullscreen);
  randomEmojisButton.addEventListener("click", selectRandomEmojis);
  if (window.SpaceInvaderBrowserStats) {
    browserStats = window.SpaceInvaderBrowserStats.create({
      canvas: canvas,
      getCurrentGameSummary: getCurrentGameSummary,
      getWorldSize: function () {
        return {
          width: gameWidth,
          height: gameHeight
        };
      },
      list: statsList,
      panel: statsPanel,
      toggleButton: statsToggleButton
    });
  }
  bindHoldButton(touchLeftButton, "touchLeft");
  bindHoldButton(touchRightButton, "touchRight");
  bindFireButton(touchFireButton);

  window.addEventListener("keydown", function (event) {
    if (event.key === " " || event.key === "ArrowLeft" || event.key === "ArrowRight" || event.key === "Enter") {
      event.preventDefault();
    }

    if (event.key === "Enter" && (resumeAfterHit() || continueAfterLevelClear())) {
      return;
    }

    if (event.key === " ") {
      firePlayerBullet();
    } else if (event.key.toLowerCase() === "p") {
      togglePause();
    } else {
      keys[event.key] = true;
      keys[event.key.toLowerCase()] = true;
    }
  });

  window.addEventListener("keyup", function (event) {
    keys[event.key] = false;
    keys[event.key.toLowerCase()] = false;
  });

  window.addEventListener("resize", resizeCanvas);
  document.addEventListener("fullscreenchange", resizeCanvas);

  updateScoreboard();
  resizeCanvas();
})();
