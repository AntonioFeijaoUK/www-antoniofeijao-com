(function () {
  function create(options) {
    var context = options.context;
    var getGame = options.getGame;
    var getHeight = options.getHeight;
    var getWidth = options.getWidth;

    function drawBackground() {
      var gameWidth = getWidth();
      var gameHeight = getHeight();

      context.fillStyle = "#05070a";
      context.fillRect(0, 0, gameWidth, gameHeight);

      context.fillStyle = "#203040";
      for (var i = 0; i < 40; i += 1) {
        var x = (i * 83) % gameWidth;
        var y = (i * 47) % gameHeight;
        context.fillRect(x, y, 2, 2);
      }
    }

    function drawPlayer(game) {
      context.font = "28px sans-serif";
      context.textAlign = "center";
      context.textBaseline = "middle";
      context.fillText(game.profile.ship, game.player.x + game.player.width / 2, game.player.y + game.player.height / 2);
    }

    function drawEnemies(game) {
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

    function drawBullets(game) {
      context.fillStyle = "#f4d35e";
      game.bullets.forEach(function (bullet) {
        context.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
      });

      context.fillStyle = "#ff6b6b";
      game.enemyBullets.forEach(function (bullet) {
        context.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
      });
    }

    function drawHitEffect(game) {
      if (!game.hitEffect) {
        return;
      }

      context.font = "42px sans-serif";
      context.textAlign = "center";
      context.textBaseline = "middle";
      context.fillText("💥", game.hitEffect.x, game.hitEffect.y);
    }

    function drawCentredTextLines(lines, startY, lineHeight) {
      var gameWidth = getWidth();

      lines.forEach(function (line, index) {
        context.fillText(line, gameWidth / 2, startY + index * lineHeight);
      });
    }

    function drawMessagePanel(height) {
      var gameWidth = getWidth();
      var gameHeight = getHeight();
      var width = Math.min(gameWidth - 40, 420);
      var x = (gameWidth - width) / 2;
      var y = (gameHeight - height) / 2;

      context.fillStyle = "rgba(5, 7, 10, 0.84)";
      context.fillRect(x, y, width, height);
      context.strokeStyle = "#3b536d";
      context.strokeRect(x, y, width, height);
    }

    function drawOverlay(game) {
      var gameWidth = getWidth();
      var gameHeight = getHeight();

      if (game.state === "running") {
        return;
      }

      context.fillStyle = "#ffffff";
      context.font = "26px sans-serif";
      context.textAlign = "center";
      context.textBaseline = "middle";

      if (game.state === "paused") {
        drawMessagePanel(92);
        context.fillStyle = "#ffffff";
        context.fillText("Paused", gameWidth / 2, gameHeight / 2);
      } else if (game.state === "hit") {
        drawMessagePanel(112);
        context.fillStyle = "#ffffff";
        context.fillText("Direct hit", gameWidth / 2, gameHeight / 2 - 12);
        context.font = "16px sans-serif";
        context.fillText("Press Enter or Play to continue.", gameWidth / 2, gameHeight / 2 + 22);
      } else if (game.state === "level-clear" && game.levelClear) {
        drawMessagePanel(152);
        context.fillStyle = "#ffffff";
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
        drawMessagePanel(112);
        context.fillStyle = "#ffffff";
        context.fillText("Sector clear", gameWidth / 2, gameHeight / 2 - 12);
        context.font = "16px sans-serif";
        context.fillText("Press Restart to play again.", gameWidth / 2, gameHeight / 2 + 22);
      } else if (game.state === "lost") {
        drawMessagePanel(112);
        context.fillStyle = "#ffffff";
        context.fillText("Game over", gameWidth / 2, gameHeight / 2 - 12);
        context.font = "16px sans-serif";
        context.fillText("Press Restart to try again.", gameWidth / 2, gameHeight / 2 + 22);
      }
    }

    function drawStartScreen() {
      var gameWidth = getWidth();
      var gameHeight = getHeight();

      drawBackground();
      context.fillStyle = "#9ee493";
      context.font = "24px sans-serif";
      context.textAlign = "center";
      context.textBaseline = "middle";
      context.fillText("Choose a pilot and launch", gameWidth / 2, gameHeight / 2 - 12);
      context.fillStyle = "#b7c7d9";
      context.font = "16px sans-serif";
      drawCentredTextLines(
        gameWidth < 520
          ? ["Nickname and ship emoji", "can later feed a leaderboard."]
          : ["Nickname and ship emoji can later feed a leaderboard."],
        gameHeight / 2 + 20,
        22
      );
    }

    function draw() {
      var game = getGame();

      if (!game) {
        drawStartScreen();
        return;
      }

      drawBackground();
      drawEnemies(game);
      drawBullets(game);
      drawPlayer(game);
      drawHitEffect(game);
      drawOverlay(game);
    }

    return {
      draw: draw
    };
  }

  window.SpaceInvaderRenderer = {
    create: create
  };
})();
