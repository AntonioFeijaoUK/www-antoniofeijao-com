(function () {
  var canvas = document.getElementById("space-invader-canvas");
  var status = document.getElementById("space-invader-status");
  var form = document.getElementById("space-invader-pilot-form");
  var nicknameInput = document.getElementById("space-invader-nickname");
  var randomNameButton = document.getElementById("space-invader-random-name");
  var pilotDisplay = document.getElementById("space-invader-pilot");
  var scoreDisplay = document.getElementById("space-invader-score");
  var livesDisplay = document.getElementById("space-invader-lives");
  var bestDisplay = document.getElementById("space-invader-best");
  var pauseButton = document.getElementById("space-invader-pause");
  var restartButton = document.getElementById("space-invader-restart");

  if (!canvas || !canvas.getContext) {
    if (status) {
      status.textContent = "Canvas is not available in this browser.";
    }
    return;
  }

  var context = canvas.getContext("2d");
  var storageKey = "space-invader-best-record";
  var keys = {};
  var animationId = null;
  var lastTime = 0;
  var game = null;

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

  function normaliseNickname(value) {
    var nickname = value.trim().replace(/\s+/g, " ");
    return nickname || getRandomName();
  }

  function createEnemies() {
    var enemies = [];
    var rows = 4;
    var columns = 9;
    var startX = 70;
    var startY = 60;
    var gapX = 52;
    var gapY = 38;

    for (var row = 0; row < rows; row += 1) {
      for (var column = 0; column < columns; column += 1) {
        enemies.push({
          x: startX + column * gapX,
          y: startY + row * gapY,
          width: 28,
          height: 20,
          alive: true
        });
      }
    }

    return enemies;
  }

  function createGame(profile) {
    return {
      profile: profile,
      player: {
        x: canvas.width / 2 - 20,
        y: canvas.height - 58,
        width: 40,
        height: 28,
        speed: 280,
        cooldown: 0
      },
      enemies: createEnemies(),
      enemyDirection: 1,
      enemySpeed: 32,
      enemyDrop: 16,
      bullets: [],
      enemyBullets: [],
      enemyShotTimer: 1.2,
      score: 0,
      lives: 3,
      state: "running"
    };
  }

  function updateScoreboard() {
    var bestRecord = getBestRecord();

    if (!game) {
      bestDisplay.textContent = bestRecord.score ? bestRecord.ship + " " + bestRecord.score : "0";
      return;
    }

    pilotDisplay.textContent = game.profile.ship + " " + game.profile.nickname;
    scoreDisplay.textContent = String(game.score);
    livesDisplay.textContent = String(game.lives);
    if (game.score > bestRecord.score) {
      bestDisplay.textContent = game.profile.ship + " " + game.score;
    } else {
      bestDisplay.textContent = bestRecord.score ? bestRecord.ship + " " + bestRecord.score : "0";
    }
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
    setStatus("Defend the sector.");
    animationId = requestAnimationFrame(loop);
  }

  function restartGame() {
    if (!game) {
      return;
    }

    startGame(game.profile);
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
      speed: 420
    });
    game.player.cooldown = 0.28;
  }

  function togglePause() {
    if (!game || game.state === "won" || game.state === "lost") {
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
    if (keys.ArrowLeft || keys.a) {
      game.player.x -= game.player.speed * delta;
    }

    if (keys.ArrowRight || keys.d) {
      game.player.x += game.player.speed * delta;
    }

    game.player.x = Math.max(12, Math.min(canvas.width - game.player.width - 12, game.player.x));
    game.player.cooldown = Math.max(0, game.player.cooldown - delta);
  }

  function updateBullets(delta) {
    game.bullets.forEach(function (bullet) {
      bullet.y -= bullet.speed * delta;
    });

    game.enemyBullets.forEach(function (bullet) {
      bullet.y += bullet.speed * delta;
    });

    game.bullets = game.bullets.filter(function (bullet) {
      return bullet.y + bullet.height > 0;
    });

    game.enemyBullets = game.enemyBullets.filter(function (bullet) {
      return bullet.y < canvas.height;
    });
  }

  function updateEnemies(delta) {
    var aliveEnemies = getAliveEnemies();
    var shouldDrop = false;

    aliveEnemies.forEach(function (enemy) {
      enemy.x += game.enemyDirection * game.enemySpeed * delta;

      if (enemy.x < 18 || enemy.x + enemy.width > canvas.width - 18) {
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
      game.enemyBullets.push({
        x: shooter.x + shooter.width / 2 - 2,
        y: shooter.y + shooter.height,
        width: 4,
        height: 10,
        speed: 190
      });
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
        }
      });
    });

    game.bullets = game.bullets.filter(function (bullet) {
      return !bullet.hit;
    });

    game.enemyBullets.forEach(function (bullet) {
      if (rectanglesOverlap(bullet, game.player)) {
        bullet.hit = true;
        game.lives -= 1;
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
    } else if (getAliveEnemies().length === 0) {
      game.state = "won";
      game.score += 150;
      setBestRecord();
      setStatus("Sector clear. Restart for another run.");
    }
  }

  function update(delta) {
    if (!game || game.state !== "running") {
      return;
    }

    updatePlayer(delta);
    updateBullets(delta);
    updateEnemies(delta);
    handleCollisions();
    updateScoreboard();
  }

  function drawBackground() {
    context.fillStyle = "#05070a";
    context.fillRect(0, 0, canvas.width, canvas.height);

    context.fillStyle = "#203040";
    for (var i = 0; i < 40; i += 1) {
      var x = (i * 83) % canvas.width;
      var y = (i * 47) % canvas.height;
      context.fillRect(x, y, 2, 2);
    }
  }

  function drawPlayer() {
    context.font = "34px sans-serif";
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillText(game.profile.ship, game.player.x + game.player.width / 2, game.player.y + game.player.height / 2);
  }

  function drawEnemies() {
    game.enemies.forEach(function (enemy) {
      if (!enemy.alive) {
        return;
      }

      context.font = "28px sans-serif";
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

  function drawOverlay() {
    if (!game || game.state === "running") {
      return;
    }

    context.fillStyle = "rgba(5, 7, 10, 0.72)";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = "#ffffff";
    context.font = "26px sans-serif";
    context.textAlign = "center";
    context.textBaseline = "middle";

    if (game.state === "paused") {
      context.fillText("Paused", canvas.width / 2, canvas.height / 2);
    } else if (game.state === "won") {
      context.fillText("Sector clear", canvas.width / 2, canvas.height / 2 - 12);
      context.font = "16px sans-serif";
      context.fillText("Press Restart to play again.", canvas.width / 2, canvas.height / 2 + 22);
    } else if (game.state === "lost") {
      context.fillText("Game over", canvas.width / 2, canvas.height / 2 - 12);
      context.font = "16px sans-serif";
      context.fillText("Press Restart to try again.", canvas.width / 2, canvas.height / 2 + 22);
    }
  }

  function drawStartScreen() {
    drawBackground();
    context.fillStyle = "#9ee493";
    context.font = "24px sans-serif";
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillText("Choose a pilot and launch", canvas.width / 2, canvas.height / 2 - 12);
    context.fillStyle = "#b7c7d9";
    context.font = "16px sans-serif";
    context.fillText("Nickname and ship emoji can later feed a leaderboard.", canvas.width / 2, canvas.height / 2 + 20);
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

  window.addEventListener("keydown", function (event) {
    if (event.key === " " || event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault();
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

  updateScoreboard();
  drawStartScreen();
})();
