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
  var gameShell = document.querySelector(".game-shell");

  if (!canvas || !canvas.getContext) {
    if (status) {
      status.textContent = "Canvas is not available in this browser.";
    }
    return;
  }

  var context = canvas.getContext("2d");
  var config = window.SpaceInvaderConfig || {};
  var gameWidth = 640;
  var gameHeight = 360;
  var storageKey = config.storageKey || "space-invader-best-record";
  var storage = window.SpaceInvaderStorage
    ? window.SpaceInvaderStorage.create(storageKey)
    : null;
  var levels = window.SpaceInvaderLevels || null;
  var keys = {};
  var animationId = null;
  var lastTime = 0;
  var game = null;
  var browserStats = null;
  var profileManager = window.SpaceInvaderProfile
    ? window.SpaceInvaderProfile.create({
        enemyEmojiOptions: config.enemyEmojiOptions || ["👾", "🎈", "🍕", "🌵"],
        form: form,
        nicknameInput: nicknameInput,
        pilotNames: config.pilotNames || ["Nova Pilot", "Orbit Ace", "Pixel Ranger", "Star Cadet"],
        randomNameButton: randomNameButton,
        shipEmojiOptions: config.shipEmojiOptions || ["🚀", "🛸", "✨", "🦄"]
      })
    : null;
  var renderer = window.SpaceInvaderRenderer
    ? window.SpaceInvaderRenderer.create({
        context: context,
        getGame: function () {
          return game;
        },
        getHeight: function () {
          return gameHeight;
        },
        getWidth: function () {
          return gameWidth;
        }
      })
    : null;

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

  function selectRandomEmojis() {
    if (!profileManager) {
      return;
    }

    profileManager.selectRandomEmojis();
    updateActiveProfile(profileManager.getProfile());
  }

  function updateActiveProfile(profile) {
    if (!game) {
      return;
    }

    game.profile.ship = profile.ship;
    game.profile.enemy = profile.enemy;
    updateScoreboard();
    draw();
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
    return levels ? levels.getEnemyCountForLevel(level, gameWidth, gameHeight) : 0;
  }

  function getEnemyAccuracyRange() {
    var minimum = Math.min(0.38 + (game.level - 1) * 0.05, 0.78);
    var maximum = Math.min(0.55 + (game.level - 1) * 0.05, 0.9);

    return {
      minimum: minimum,
      maximum: maximum
    };
  }

  function getEnemyShotDelay() {
    return Math.max(0.7, 2.2 - (game.level - 1) * 0.18);
  }

  function createEnemyBullet(shooter) {
    var speed = Math.max(150, gameHeight * (0.28 + Math.min(game.level - 1, 8) * 0.025));
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
    game.enemies = levels ? levels.createEnemies(level, gameWidth, gameHeight) : [];
    game.enemyDirection = 1;
    game.enemySpeed = levels ? levels.getLevelSpeed(level) : 32;
    game.enemyDrop = levels ? levels.getEnemyDrop(level) : 16;
    game.bullets = [];
    game.enemyBullets = [];
    game.enemyShotTimer = getEnemyShotDelay();
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
    var bestRecord = storage
      ? storage.getBestRecord()
      : { enemy: "", nickname: "", ship: "", score: 0 };

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

    if (gameShell) {
      gameShell.classList.add("is-game-active");
    }

    resizeCanvas();
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
    var leftEdge = Infinity;
    var rightEdge = -Infinity;
    var correction = 0;

    aliveEnemies.forEach(function (enemy) {
      enemy.x += game.enemyDirection * game.enemySpeed * delta;
      leftEdge = Math.min(leftEdge, enemy.x);
      rightEdge = Math.max(rightEdge, enemy.x + enemy.width);

      shouldDrop = shouldDrop || enemy.x < 18 || enemy.x + enemy.width > gameWidth - 18;
    });

    if (shouldDrop) {
      if (leftEdge < 18) {
        correction = 18 - leftEdge;
      } else if (rightEdge > gameWidth - 18) {
        correction = gameWidth - 18 - rightEdge;
      }

      game.enemyDirection *= -1;
      aliveEnemies.forEach(function (enemy) {
        enemy.x += correction;
        enemy.y += game.enemyDrop;
      });
    }

    game.enemyShotTimer -= delta;
    if (game.enemyShotTimer <= 0 && aliveEnemies.length > 0) {
      var shooter = aliveEnemies[Math.floor(Math.random() * aliveEnemies.length)];
      game.enemyBullets.push(createEnemyBullet(shooter));
      game.enemyShotTimer = getEnemyShotDelay();
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
      if (storage) {
        storage.setBestRecord(game);
      }
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

  function draw() {
    if (renderer) {
      renderer.draw();
    }
  }

  function loop(currentTime) {
    var delta = Math.min((currentTime - lastTime) / 1000, 0.05);
    lastTime = currentTime;

    update(delta);
    draw();
    animationId = requestAnimationFrame(loop);
  }

  if (profileManager) {
    profileManager.renderEmojiPickers();
    profileManager.bind(updateActiveProfile);
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    if (resumeAfterHit()) {
      return;
    }

    if (continueAfterLevelClear()) {
      return;
    }

    if (profileManager) {
      startGame(profileManager.getProfile());
    }
  });

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
  if (window.SpaceInvaderInput) {
    window.SpaceInvaderInput.bind({
      buttons: {
        fullscreen: fullscreenButton,
        pause: pauseButton,
        randomEmojis: randomEmojisButton,
        restart: restartButton,
        touchFire: touchFireButton,
        touchLeft: touchLeftButton,
        touchRight: touchRightButton
      },
      callbacks: {
        continueAfterLevelClear: continueAfterLevelClear,
        firePlayerBullet: firePlayerBullet,
        restartGame: restartGame,
        resumeAfterHit: resumeAfterHit,
        selectRandomEmojis: selectRandomEmojis,
        setStatus: setStatus,
        togglePause: togglePause
      },
      fullscreenShell: gameShell,
      keys: keys
    });
  }

  window.addEventListener("resize", resizeCanvas);
  document.addEventListener("fullscreenchange", resizeCanvas);

  updateScoreboard();
  resizeCanvas();
})();
