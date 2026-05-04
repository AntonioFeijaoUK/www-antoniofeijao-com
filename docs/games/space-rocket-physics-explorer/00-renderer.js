(function () {
  function create(options) {
    var context = options.context;
    var getEarth = options.getEarth;
    var getGame = options.getGame;
    var getGameHeight = options.getGameHeight;
    var getGameWidth = options.getGameWidth;
    var getHazards = options.getHazards;
    var getKeys = options.getKeys;
    var getGravityZones = options.getGravityZones;
    var getMoon = options.getMoon;
    var getWorldWidth = options.getWorldWidth;

    function clamp(value, minimum, maximum) {
      return Math.max(minimum, Math.min(maximum, value));
    }

    function getCameraX() {
      var game = getGame();
      var gameWidth = getGameWidth();
      var worldWidth = getWorldWidth();
      var moon = getMoon();

      if (!game) {
        return 0;
      }

      if (moon.radius <= 0) {
        return game.rocket.x - gameWidth * 0.48;
      }

      return clamp(game.rocket.x - gameWidth * 0.38, 0, worldWidth - gameWidth);
    }

    function getAltitudeKm(game) {
      var earth = getEarth();
      var moon = getMoon();
      var surfaceY;

      if (!game || moon.radius > 0 || !game.kmPerPixel) {
        return 0;
      }

      surfaceY = earth.y - earth.radius;

      return Math.max(0, (surfaceY - (game.rocket.y + game.rocket.radius)) * game.kmPerPixel);
    }

    function getCameraY() {
      var game = getGame();
      var moon = getMoon();
      var earth = getEarth();
      var gameHeight = getGameHeight();
      var surfaceY;
      var targetY;

      if (!game || moon.radius > 0) {
        return 0;
      }

      surfaceY = earth.y - earth.radius;
      targetY = game.rocket.y - gameHeight * 0.42;

      return Math.min(targetY, 540);
    }

    function drawBackground(cameraX, cameraY) {
      var game = getGame();
      var gameWidth = getGameWidth();
      var gameHeight = getGameHeight();
      var gradient = context.createLinearGradient(0, 0, gameWidth, gameHeight);
      var altitudeKm = getAltitudeKm(game);

      if (game && getMoon().radius <= 0) {
        if (altitudeKm < 8) {
          gradient.addColorStop(0, "#6da9d7");
          gradient.addColorStop(0.54, "#9fc9e6");
          gradient.addColorStop(1, "#d7ecfb");
        } else if (altitudeKm < 24) {
          gradient.addColorStop(0, "#132d55");
          gradient.addColorStop(0.55, "#3f7eb4");
          gradient.addColorStop(1, "#8ec2e7");
        } else if (altitudeKm < 55) {
          gradient.addColorStop(0, "#030815");
          gradient.addColorStop(0.48, "#0b1d3b");
          gradient.addColorStop(1, "#235082");
        } else {
          gradient.addColorStop(0, "#01040a");
          gradient.addColorStop(0.56, "#030815");
          gradient.addColorStop(1, "#08111d");
        }
      } else {
        gradient.addColorStop(0, "#02060c");
        gradient.addColorStop(0.52, "#08111d");
        gradient.addColorStop(1, "#111827");
      }
      context.fillStyle = gradient;
      context.fillRect(0, 0, gameWidth, gameHeight);

      context.fillStyle = "#dbeafe";
      for (var i = 0; i < 90; i += 1) {
        var x = (i * 137 - cameraX * 0.35) % gameWidth;
        var y = (i * 79 - cameraY * 0.12) % gameHeight;
        var starAlpha = i % 4 === 0 ? 0.9 : 0.45;

        if (game && getMoon().radius <= 0) {
          starAlpha *= clamp((altitudeKm - 18) / 34, 0, 1);
        }

        if (x < 0) {
          x += gameWidth;
        }
        if (y < 0) {
          y += gameHeight;
        }
        context.globalAlpha = starAlpha;
        context.fillRect(x, y, 2, 2);
      }
      context.globalAlpha = 1;
    }

    function drawBody(body, cameraX, cameraY, radius, fill, stroke, label) {
      if (radius <= 0) {
        return;
      }

      var x = body.x - cameraX;
      var y = body.y - cameraY;

      context.beginPath();
      context.arc(x, y, radius, 0, Math.PI * 2);
      context.fillStyle = fill;
      context.fill();
      context.strokeStyle = stroke;
      context.lineWidth = 2;
      context.stroke();
      context.fillStyle = "#ffffff";
      context.font = "15px sans-serif";
      context.textAlign = "center";
      context.fillText(label, x, y - radius - 14 + (body.labelOffsetY || 0));
    }

    function drawGravityZone(body, cameraX, cameraY, radius, stroke, fill, label, labelOffsetY) {
      if (radius <= 0) {
        return;
      }

      var x = body.x - cameraX;
      var y = body.y - cameraY;

      context.save();
      context.beginPath();
      context.arc(x, y, radius, 0, Math.PI * 2);
      context.fillStyle = fill;
      context.fill();
      context.strokeStyle = stroke;
      context.lineWidth = 2;
      context.setLineDash([10, 8]);
      context.stroke();
      context.setLineDash([]);
      context.fillStyle = stroke;
      context.font = "13px sans-serif";
      context.textAlign = "center";
      context.fillText(label, x, y - radius + labelOffsetY);
      context.restore();
    }

    function drawFreeFallCorridor(cameraX) {
      var game = getGame();
      var moon = getMoon();
      var gameWidth = getGameWidth();
      var gameHeight = getGameHeight();
      var label = game && game.corridorLabel
        ? game.corridorLabel
        : "Cislunar free-fall coast: low apparent gravity, not zero gravity";

      if (game && moon.radius <= 0) {
        context.save();
        context.fillStyle = "rgba(5, 7, 10, 0.42)";
        context.fillRect(gameWidth / 2 - 310, 12, 620, 26);
        context.fillStyle = "rgba(255, 255, 255, 0.88)";
        context.font = "13px sans-serif";
        context.textAlign = "center";
        context.fillText(label, gameWidth / 2, 30);
        context.restore();
        return;
      }

      context.save();
      context.fillStyle = "rgba(148, 163, 184, 0.08)";
      context.fillRect(0, gameHeight * 0.18, gameWidth, gameHeight * 0.64);
      context.strokeStyle = "rgba(148, 163, 184, 0.28)";
      context.setLineDash([12, 10]);
      context.beginPath();
      context.moveTo(0, gameHeight * 0.18);
      context.lineTo(gameWidth, gameHeight * 0.18);
      context.moveTo(0, gameHeight * 0.82);
      context.lineTo(gameWidth, gameHeight * 0.82);
      context.stroke();
      context.setLineDash([]);
      context.fillStyle = "rgba(203, 213, 225, 0.86)";
      context.font = "13px sans-serif";
      context.textAlign = "center";
      context.fillText(label, gameWidth / 2, 24);
      context.restore();
    }

    function drawHazards(cameraX, cameraY) {
      getHazards().forEach(function (hazard) {
        var x = hazard.x - cameraX;
        var y = hazard.y - cameraY;

        context.beginPath();
        context.arc(x, y, hazard.radius, 0, Math.PI * 2);
        context.fillStyle = "#8b7355";
        context.fill();
        context.strokeStyle = "#d6b06d";
        context.stroke();
        context.fillStyle = "#caa472";
        context.fillRect(x - hazard.radius * 0.25, y - hazard.radius * 0.45, 4, 4);
        context.fillRect(x + hazard.radius * 0.2, y + hazard.radius * 0.18, 5, 5);
      });
    }

    function isEarthLaunch(game, moon) {
      return game && moon.radius <= 0;
    }

    function drawLaunchPad(cameraX, cameraY) {
      var earth = getEarth();
      var moon = getMoon();
      var game = getGame();
      var surfaceY = earth.y - earth.radius - cameraY;
      var x = earth.x - cameraX;

      if (!isEarthLaunch(game, moon)) {
        return;
      }

      context.save();
      context.strokeStyle = "#94a3b8";
      context.lineWidth = 3;
      context.beginPath();
      context.moveTo(x - 72, surfaceY);
      context.lineTo(x + 72, surfaceY);
      context.stroke();

      context.strokeStyle = "#64748b";
      context.lineWidth = 2;
      context.beginPath();
      context.moveTo(x - 48, surfaceY);
      context.lineTo(x - 48, surfaceY - 128);
      context.lineTo(x - 20, surfaceY - 112);
      context.moveTo(x - 48, surfaceY - 96);
      context.lineTo(x - 20, surfaceY - 82);
      context.moveTo(x - 48, surfaceY - 64);
      context.lineTo(x - 20, surfaceY - 54);
      context.stroke();

      if (game.engineLit && (game.state === "countdown" || game.state === "ignition")) {
        context.globalAlpha = 0.88;
        context.fillStyle = "#f97316";
        context.beginPath();
        context.moveTo(x - 18, surfaceY - 5);
        context.lineTo(x, surfaceY + 52 + Math.random() * 18);
        context.lineTo(x + 18, surfaceY - 5);
        context.closePath();
        context.fill();
        context.fillStyle = "rgba(226, 232, 240, 0.58)";
        context.fillRect(x - 70, surfaceY + 28, 140, 18);
        context.globalAlpha = 1;
      }

      context.restore();
    }

    function drawAltitudeAtmosphere(cameraX, cameraY) {
      var game = getGame();
      var moon = getMoon();
      var earth = getEarth();
      var gameWidth = getGameWidth();
      var surfaceY;
      var cloudY;

      if (!isEarthLaunch(game, moon) || !game.kmPerPixel) {
        return;
      }

      surfaceY = earth.y - earth.radius;
      cloudY = surfaceY - 10 / game.kmPerPixel - cameraY;

      context.save();

      if (getAltitudeKm(game) < 18) {
        context.strokeStyle = "rgba(15, 23, 42, 0.72)";
        context.lineWidth = 2;
        for (var bird = 0; bird < 5; bird += 1) {
          var bx = 170 + bird * 90 - cameraX * 0.12;
          var by = surfaceY - 115 - bird * 18 - cameraY;
          context.beginPath();
          context.moveTo(bx - 8, by);
          context.lineTo(bx, by - 5);
          context.lineTo(bx + 8, by);
          context.stroke();
        }
      }

      context.fillStyle = "rgba(255, 255, 255, 0.72)";
      for (var cloud = 0; cloud < 7; cloud += 1) {
        var x = (cloud * 180 + 90 - cameraX * 0.2) % (gameWidth + 180) - 90;
        var y = cloudY - (cloud % 3) * 32;

        context.beginPath();
        context.ellipse(x, y, 46, 16, 0, 0, Math.PI * 2);
        context.ellipse(x + 34, y + 2, 36, 13, 0, 0, Math.PI * 2);
        context.ellipse(x - 34, y + 4, 32, 12, 0, 0, Math.PI * 2);
        context.fill();
      }

      context.restore();
    }

    function drawAltitudeMilestones(cameraY) {
      var game = getGame();
      var moon = getMoon();
      var earth = getEarth();
      var gameWidth = getGameWidth();
      var surfaceY;
      var ceilingY;

      if (!isEarthLaunch(game, moon) || !game.kmPerPixel || !game.milestones) {
        return;
      }

      surfaceY = earth.y - earth.radius;
      context.save();
      context.font = "700 16px sans-serif";

      if (game.insertionCeilingKm) {
        ceilingY = surfaceY - game.insertionCeilingKm / game.kmPerPixel - cameraY;

        if (ceilingY > -40 && ceilingY < getGameHeight() + 40) {
          context.strokeStyle = "rgba(248, 113, 113, 0.9)";
          context.lineWidth = 3;
          context.setLineDash([14, 7]);
          context.beginPath();
          context.moveTo(0, ceilingY);
          context.lineTo(gameWidth, ceilingY);
          context.stroke();
          context.setLineDash([]);
          context.fillStyle = "rgba(5, 7, 10, 0.78)";
          context.fillRect(16, ceilingY + 6, 204, 26);
          context.fillRect(gameWidth - 224, ceilingY + 6, 208, 26);
          context.fillStyle = "#fecaca";
          context.textAlign = "left";
          context.fillText("220 km - overshoot", 26, ceilingY + 25);
          context.textAlign = "right";
          context.fillText("220 km - overshoot", gameWidth - 26, ceilingY + 25);
        }
      }

      game.milestones.forEach(function (milestone) {
        var y = surfaceY - milestone / game.kmPerPixel - cameraY;
        var isKarmanLine = milestone === 100;
        var label = isKarmanLine ? "100 km - Karman line" : milestone + " km";

        if (y < -40 || y > getGameHeight() + 40) {
          return;
        }

        context.strokeStyle = isKarmanLine ? "rgba(158, 228, 147, 0.98)" : "rgba(226, 232, 240, 0.72)";
        context.lineWidth = isKarmanLine ? 4 : 2;
        context.setLineDash(isKarmanLine ? [16, 8] : [8, 8]);
        context.beginPath();
        context.moveTo(0, y);
        context.lineTo(gameWidth, y);
        context.stroke();
        context.setLineDash([]);

        context.fillStyle = "rgba(5, 7, 10, 0.74)";
        context.fillRect(16, y - 28, isKarmanLine ? 186 : 72, 26);
        context.fillRect(gameWidth - (isKarmanLine ? 206 : 92), y - 28, isKarmanLine ? 190 : 76, 26);

        context.fillStyle = isKarmanLine ? "#9ee493" : "#ffffff";
        context.textAlign = "left";
        context.fillText(label, 26, y - 9);
        context.textAlign = "right";
        context.fillText(label, gameWidth - 26, y - 9);
      });

      context.restore();
    }

    function drawRocketTrail(cameraX, cameraY) {
      var game = getGame();
      var moon = getMoon();

      if (!isEarthLaunch(game, moon) || !game.trail) {
        return;
      }

      context.save();
      game.trail.forEach(function (point) {
        var alpha = Math.max(0, 1 - point.age / 130);
        var radius = 4 + point.age * 0.08 + point.throttle * 5;

        context.globalAlpha = alpha * 0.46;
        context.fillStyle = point.age < 20 ? "#f97316" : "#cbd5e1";
        context.beginPath();
        context.arc(point.x - cameraX, point.y - cameraY, radius, 0, Math.PI * 2);
        context.fill();
      });
      context.globalAlpha = 1;
      context.restore();
    }

    function drawPitchCorridor(cameraX, cameraY) {
      var game = getGame();
      var moon = getMoon();
      var rocket;
      var x;
      var y;
      var target;
      var tolerance;
      var length = 78;

      if (!isEarthLaunch(game, moon) || game.state !== "running") {
        return;
      }

      rocket = game.rocket;
      x = rocket.x - cameraX;
      y = rocket.y - cameraY;
      target = game.pitchTarget || 0;
      tolerance = getAltitudeKm(game) < 12 ? 0.2 : 0.16;

      context.save();
      context.lineWidth = 4;
      context.lineCap = "round";

      [target - tolerance, target + tolerance].forEach(function (angle) {
        context.strokeStyle = "rgba(158, 228, 147, 0.82)";
        context.beginPath();
        context.moveTo(x, y);
        context.lineTo(x + Math.sin(angle) * length, y - Math.cos(angle) * length);
        context.stroke();
      });

      context.strokeStyle = game.pitchError > tolerance ? "rgba(248, 113, 113, 0.92)" : "rgba(255, 255, 255, 0.76)";
      context.lineWidth = 2;
      context.beginPath();
      context.moveTo(x, y);
      context.lineTo(x + Math.sin(target) * (length + 12), y - Math.cos(target) * (length + 12));
      context.stroke();

      context.fillStyle = game.pitchError > tolerance ? "#fecaca" : "#d9f99d";
      context.font = "700 12px sans-serif";
      context.textAlign = "center";
      context.fillText("pitch corridor", x, y - 92);
      context.restore();
    }

    function drawMaxQShock(cameraX, cameraY) {
      var game = getGame();
      var moon = getMoon();
      var rocket;
      var intensity;
      var x;
      var y;

      if (!isEarthLaunch(game, moon) || !game.shockWarning) {
        return;
      }

      rocket = game.rocket;
      intensity = Math.min(1, game.shockWarning);
      x = rocket.x - cameraX + Math.sin(rocket.angle) * -18;
      y = rocket.y - cameraY + Math.cos(rocket.angle) * -18;

      context.save();
      context.translate(x, y);
      context.rotate(rocket.angle);
      context.globalAlpha = 0.38 + intensity * 0.42;
      context.fillStyle = "#f97316";
      context.beginPath();
      context.ellipse(0, -12, 20 + intensity * 12, 34 + Math.random() * 8, 0, 0, Math.PI * 2);
      context.fill();
      context.globalAlpha = 0.34 + intensity * 0.36;
      context.strokeStyle = "#fecaca";
      context.lineWidth = 3;
      context.beginPath();
      context.arc(0, -12, 32 + intensity * 16, Math.PI * 1.08, Math.PI * 1.92);
      context.stroke();
      context.restore();

      context.save();
      context.fillStyle = "rgba(127, 29, 29, 0.86)";
      context.fillRect(x - 106, y - 78, 212, 34);
      context.strokeStyle = "#fca5a5";
      context.strokeRect(x - 106, y - 78, 212, 34);
      context.fillStyle = "#ffffff";
      context.font = "700 13px sans-serif";
      context.textAlign = "center";
      context.fillText("MAX-Q: throttle down", x, y - 56);
      context.restore();
    }

    function drawRocket(cameraX, cameraY) {
      var game = getGame();
      var keys = getKeys();
      var rocket = game.rocket;
      var x = rocket.x - cameraX;
      var y = rocket.y - cameraY;

      context.save();
      context.translate(x, y);
      context.rotate(rocket.angle);

      context.fillStyle = "#f8fafc";
      context.beginPath();
      context.moveTo(0, -18);
      context.lineTo(11, 14);
      context.lineTo(-11, 14);
      context.closePath();
      context.fill();

      context.fillStyle = "#6aa9ff";
      context.fillRect(-7, 4, 14, 9);
      context.fillStyle = "#f4d35e";

      if (game.fuel > 0 && (game.throttle > 0 || game.state === "running" && keys.ArrowUp)) {
        var flameLength = 22 + Math.min(24, (game.throttle || 1) * 28);

        context.beginPath();
        context.moveTo(-6, 15);
        context.lineTo(0, flameLength + Math.random() * 8);
        context.lineTo(6, 15);
        context.closePath();
        context.fill();
      }

      if (game.state === "running" && game.fuel > 0 && keys.ArrowDown) {
        context.fillStyle = "#60a5fa";
        context.beginPath();
        context.moveTo(-5, -17);
        context.lineTo(0, -29 - Math.random() * 6);
        context.lineTo(5, -17);
        context.closePath();
        context.fill();
      }

      context.restore();
    }

    function drawLaunchMetrics() {
      var game = getGame();
      var moon = getMoon();
      var gameWidth = getGameWidth();
      var rocket;
      var panelX;
      var panelY = 52;

      if (!isEarthLaunch(game, moon) || !game.referenceRocket) {
        return;
      }

      rocket = game.referenceRocket;
      panelX = gameWidth - 268;

      context.save();
      context.fillStyle = "rgba(5, 7, 10, 0.78)";
      context.fillRect(panelX, panelY, 244, 174);
      context.strokeStyle = "#3b536d";
      context.strokeRect(panelX, panelY, 244, 174);

      context.fillStyle = "#ffffff";
      context.font = "15px sans-serif";
      context.textAlign = "left";
      context.fillText("Launch physics", panelX + 14, panelY + 26);

      context.fillStyle = "#b7c7d9";
      context.font = "12px sans-serif";
      context.fillText("Vehicle: " + rocket.name, panelX + 14, panelY + 52);
      context.fillText("Wet mass: " + rocket.wetMassTonnes.toLocaleString("en-GB") + " t", panelX + 14, panelY + 72);
      context.fillText("Max thrust: " + rocket.maxThrustMN.toFixed(1) + " MN", panelX + 14, panelY + 92);
      context.fillText("Propellant: " + rocket.propellant, panelX + 14, panelY + 112);
      context.fillText("Throttle: " + Math.round((game.throttle || 0) * 100) + "%", panelX + 14, panelY + 132);
      context.fillText("Max-Q load: " + Math.round(game.dynamicPressure || 0), panelX + 14, panelY + 152);

      context.fillStyle = "#9ee493";
      context.fillRect(panelX + 126, panelY + 123, Math.round((game.throttle || 0) * 90), 8);
      context.fillStyle = "#f59e0b";
      context.fillRect(panelX + 126, panelY + 143, Math.min(90, Math.round((game.dynamicPressure || 0))), 8);
      context.restore();
    }

    function drawMissionObjective() {
      var game = getGame();
      var moon = getMoon();
      var gameWidth = getGameWidth();
      var message;

      if (!isEarthLaunch(game, moon) || !game.activeObjective || game.state === "won" || game.state === "lost") {
        return;
      }

      message = game.activeObjective;
      context.save();
      context.fillStyle = "rgba(5, 7, 10, 0.82)";
      context.fillRect(gameWidth / 2 - 265, 46, 530, 34);
      context.strokeStyle = "#9ee493";
      context.strokeRect(gameWidth / 2 - 265, 46, 530, 34);
      context.fillStyle = "#ffffff";
      context.font = "700 14px sans-serif";
      context.textAlign = "center";
      context.fillText(message, gameWidth / 2, 68);
      context.restore();
    }

    function drawOverlay() {
      var game = getGame();
      var gameWidth = getGameWidth();
      var gameHeight = getGameHeight();
      var title = "Space Rocket Physics Explorer";
      var detail = "Press Start mission.";
      var detailLines = [];
      var panelWidth = 520;
      var panelHeight = 124;
      var panelX;
      var panelY;
      var titleY;
      var detailY;

      if (!game || game.state === "running") {
        return;
      }

      if (game.state === "paused") {
        title = "Paused";
        detail = "Press Pause or P to continue.";
      } else if (game.state === "countdown") {
        title = "T-" + Math.ceil(game.countdown);
        detail = game.countdown <= 3 ? "Ignition sequence start." : "Guidance, tanks, and engines are being checked.";
        panelWidth = 360;
        panelHeight = 78;
      } else if (game.state === "ignition") {
        title = "Ignition";
        detail = "Engines build thrust before hold-down release.";
        panelWidth = 420;
        panelHeight = 82;
      } else if (game.state === "won") {
        title = game.overlayTitle || "Samples recovered";
        detailLines = game.debrief || ["You managed fuel, gravity, and speed."];
        panelHeight = 236;
      } else if (game.state === "lost") {
        title = "Mission failed";
        detail = game.statusMessage || "Restart and try smaller correction burns.";
      } else if (game.state === "planned") {
        title = "Earth Launch";
        detailLines = game.debrief || ["Mission module planned."];
        panelHeight = 210;
      }

      panelX = gameWidth / 2 - panelWidth / 2;
      panelY = gameHeight / 2 - panelHeight / 2;

      if (game.state === "countdown" || game.state === "ignition") {
        panelY = Math.min(gameHeight - panelHeight - 18, Math.max(88, gameHeight * 0.68));
      }

      titleY = panelY + (game.state === "countdown" || game.state === "ignition" ? 30 : 42);
      detailY = panelY + (game.state === "countdown" || game.state === "ignition" ? 58 : panelHeight / 2 + 24);

      context.fillStyle = "rgba(5, 7, 10, 0.84)";
      context.fillRect(panelX, panelY, panelWidth, panelHeight);
      context.strokeStyle = "#3b536d";
      context.strokeRect(panelX, panelY, panelWidth, panelHeight);
      context.fillStyle = "#ffffff";
      context.font = "26px sans-serif";
      context.textAlign = "center";
      context.fillText(title, gameWidth / 2, titleY);
      context.fillStyle = "#b7c7d9";
      context.font = "16px sans-serif";
      if (detailLines.length > 0) {
        detailLines.forEach(function (line, index) {
          context.fillText(line, gameWidth / 2, panelY + 78 + index * 24);
        });
      } else {
        context.fillText(detail, gameWidth / 2, detailY);
      }
    }

    function drawPathHint(cameraX) {
      var moon = getMoon();
      var earth = getEarth();

      if (moon.radius <= 0) {
        return;
      }

      context.strokeStyle = "rgba(158, 228, 147, 0.35)";
      context.setLineDash([8, 8]);
      context.beginPath();
      context.moveTo(moon.x - cameraX + 80, moon.y - 110);
      context.bezierCurveTo(620 - cameraX, 130, 1450 - cameraX, 160, earth.x - cameraX - 115, earth.y - 70);
      context.stroke();
      context.setLineDash([]);
    }

    function draw() {
      var cameraX = getCameraX();
      var cameraY = getCameraY();
      var game = getGame();
      var moon = getMoon();
      var earth = getEarth();
      var gravityZones = getGravityZones ? getGravityZones() : { earth: 520, moon: 360 };

      drawBackground(cameraX, cameraY);
      drawFreeFallCorridor(cameraX);
      drawAltitudeAtmosphere(cameraX, cameraY);
      drawGravityZone(moon, cameraX, cameraY, gravityZones.moon, "rgba(191, 219, 254, 0.74)", "rgba(96, 165, 250, 0.08)", "Moon-dominant gravity", 22);
      drawGravityZone(earth, cameraX, cameraY, gravityZones.earth, "rgba(134, 239, 172, 0.74)", "rgba(34, 197, 94, 0.08)", "Earth-dominant gravity", 26);
      drawAltitudeMilestones(cameraY);
      drawPathHint(cameraX);
      drawBody(moon, cameraX, cameraY, moon.radius, "#9ca3af", "#d1d5db", "Moon");
      drawBody(earth, cameraX, cameraY, earth.radius, "#1f8f6a", "#8ee0ff", "Earth");
      drawLaunchPad(cameraX, cameraY);
      drawHazards(cameraX, cameraY);
      drawRocketTrail(cameraX, cameraY);
      drawPitchCorridor(cameraX, cameraY);

      if (game) {
        drawRocket(cameraX, cameraY);
      }

      drawMaxQShock(cameraX, cameraY);
      drawLaunchMetrics();
      drawMissionObjective();
      drawOverlay();
    }

    return {
      draw: draw
    };
  }

  window.SpaceRocketPhysicsRenderer = {
    create: create
  };
})();
