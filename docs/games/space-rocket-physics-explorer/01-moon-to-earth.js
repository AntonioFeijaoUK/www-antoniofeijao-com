(function () {
  function create() {
    var worldWidth = 2200;
    var worldHeight = 900;
    var lunarDistanceKm = 384400;
    var earthRadiusKm = 6371;
    var earthStandardGravity = 9.80665;
    var moonSurfaceGravity = 1.624;
    var gravityZones = {
      earth: 520,
      moon: 360
    };

    var moon = {
      x: 150,
      y: 700,
      radius: 88
    };

    var earth = {
      x: 2060,
      y: 450,
      radius: 120
    };

    var hazards = [
      { x: 610, y: 250, radius: 26, vx: 0, vy: 28 },
      { x: 940, y: 580, radius: 34, vx: 0, vy: -24 },
      { x: 1240, y: 330, radius: 22, vx: 0, vy: 34 },
      { x: 1540, y: 650, radius: 28, vx: 0, vy: -30 },
      { x: 1760, y: 260, radius: 24, vx: 0, vy: 22 }
    ];

    function clamp(value, minimum, maximum) {
      return Math.max(minimum, Math.min(maximum, value));
    }

    function getDistance(a, b) {
      var dx = b.x - a.x;
      var dy = b.y - a.y;
      return Math.sqrt(dx * dx + dy * dy);
    }

    function getSpeed(game) {
      var rocket = game ? game.rocket : { vx: 0, vy: 0 };
      return Math.sqrt(rocket.vx * rocket.vx + rocket.vy * rocket.vy);
    }

    function getLandingRangeKm(game) {
      var startDistance = getDistance({ x: moon.x + 95, y: moon.y - 72 }, earth) - earth.radius - 13;
      var currentDistance = Math.max(0, getDistance(game.rocket, earth) - earth.radius - game.rocket.radius);

      return Math.round(currentDistance / startDistance * lunarDistanceKm);
    }

    function formatGravity(label, gravityMs2) {
      return label + ": " + gravityMs2.toFixed(2) + " m/s^2 (" + (gravityMs2 / earthStandardGravity).toFixed(3) + " g)";
    }

    function createGame() {
      hazards.forEach(function (hazard, index) {
        hazard.phase = index * 1.7;
      });

      return {
        rocket: {
          x: moon.x + 95,
          y: moon.y - 72,
          vx: 54,
          vy: -20,
          radius: 13,
          angle: 1.28
        },
        fuel: 100,
        rocketIntegrity: 100,
        samples: 100,
        elapsed: 0,
        state: "ready",
        gravityLabel: "Moon reference",
        gravityMs2: moonSurfaceGravity,
        debrief: null
      };
    }

    function addGravity(game, body, strength, minimumDistance, acceleration) {
      var rocket = game.rocket;
      var dx = body.x - rocket.x;
      var dy = body.y - rocket.y;
      var distance = Math.max(minimumDistance, Math.sqrt(dx * dx + dy * dy));
      var pull = strength / (distance * distance);

      acceleration.x += (dx / distance) * pull;
      acceleration.y += (dy / distance) * pull;
    }

    function getGravityAcceleration(game) {
      var acceleration = { x: 0, y: 0 };
      var moonDistance = getDistance(game.rocket, moon);
      var earthDistance = getDistance(game.rocket, earth);

      addGravity(game, moon, 42000, 90, acceleration);
      addGravity(game, earth, 525000, 130, acceleration);

      if (earthDistance < gravityZones.earth) {
        var landingRangeKm = getLandingRangeKm(game);
        var earthGravityAtRange = earthStandardGravity * Math.pow(earthRadiusKm / (earthRadiusKm + landingRangeKm), 2);

        game.gravityLabel = "Earth approach";
        game.gravityMs2 = earthGravityAtRange;
      } else if (moonDistance < gravityZones.moon) {
        game.gravityLabel = "Moon reference";
        game.gravityMs2 = moonSurfaceGravity;
      } else {
        game.gravityLabel = "Apparent free fall";
        game.gravityMs2 = 0;
      }

      return acceleration;
    }

    function applyThrust(game, keys, dt) {
      var rocket = game.rocket;
      var thrustPower = 310;
      var retroPower = 260;
      var burnRate = 18;
      var rotationSpeed = 2.4;

      if (keys.ArrowLeft) {
        rocket.angle -= rotationSpeed * dt;
      }

      if (keys.ArrowRight) {
        rocket.angle += rotationSpeed * dt;
      }

      if (!keys.ArrowUp && !keys.ArrowDown) {
        return;
      }

      if (game.fuel <= 0) {
        game.fuel = 0;
        return;
      }

      if (keys.ArrowUp) {
        rocket.vx += Math.sin(rocket.angle) * thrustPower * dt;
        rocket.vy -= Math.cos(rocket.angle) * thrustPower * dt;
        game.fuel = Math.max(0, game.fuel - burnRate * dt);
      }

      if (keys.ArrowDown && game.fuel > 0) {
        rocket.vx -= Math.sin(rocket.angle) * retroPower * dt;
        rocket.vy += Math.cos(rocket.angle) * retroPower * dt;
        game.fuel = Math.max(0, game.fuel - burnRate * 0.85 * dt);
      }
    }

    function updateHazards(dt) {
      hazards.forEach(function (hazard) {
        hazard.phase += dt;
        hazard.y += hazard.vy * dt;

        if (hazard.y < 190 || hazard.y > 720) {
          hazard.vy *= -1;
        }
      });
    }

    function applyImpactDamage(game, hullDamage, sampleDamage, message, setStatus) {
      if (game.state !== "running") {
        return;
      }

      game.rocketIntegrity = Math.max(0, game.rocketIntegrity - hullDamage);
      game.samples = Math.max(0, game.samples - sampleDamage);
      setStatus(message);

      if (game.rocketIntegrity <= 0) {
        game.state = "lost";
        setStatus("Mission failed: meteoroid impacts destroyed the return capsule.");
        return;
      }

      if (game.samples <= 0) {
        game.state = "lost";
        setStatus("Mission failed: the lunar samples were destroyed.");
      }
    }

    function checkCollisions(game, setStatus) {
      var rocket = game.rocket;

      hazards.forEach(function (hazard) {
        if (getDistance(rocket, hazard) < rocket.radius + hazard.radius) {
          var impactSpeed = getSpeed(game);
          var hullDamage = clamp(Math.round(12 + impactSpeed * 0.08), 14, 32);
          var sampleDamage = clamp(Math.round(6 + impactSpeed * 0.04), 8, 18);
          var dx = rocket.x - hazard.x;
          var dy = rocket.y - hazard.y;
          var distance = Math.max(1, Math.sqrt(dx * dx + dy * dy));

          rocket.x = hazard.x + (dx / distance) * (rocket.radius + hazard.radius + 2);
          rocket.y = hazard.y + (dy / distance) * (rocket.radius + hazard.radius + 2);
          rocket.vx += (dx / distance) * 90;
          rocket.vy += (dy / distance) * 90;
          applyImpactDamage(
            game,
            hullDamage,
            sampleDamage,
            "Meteoroid impact: capsule integrity -" + hullDamage + "%, sample integrity -" + sampleDamage + "%.",
            setStatus
          );
        }
      });

      if (getDistance(rocket, moon) < rocket.radius + moon.radius - 2) {
        var speed = getSpeed(game);
        game.state = "lost";
        setStatus(speed > 95 ? "Mission failed: launch collision with the Moon." : "Mission failed: the rocket settled back on the Moon.");
      }

      if (getDistance(rocket, earth) < rocket.radius + earth.radius - 5) {
        var arrivalSpeed = getSpeed(game);
        if (arrivalSpeed <= 145 && game.samples >= 50 && game.rocketIntegrity >= 35) {
          var returnedSamples = Math.round(game.samples);

          game.state = "won";
          game.debrief = [
            returnedSamples + "% of the lunar samples reached the recovery lab.",
            "The capsule carries rocks, minerals, and regolith.",
            "It also carries impact glass and lunar dust.",
            "Scientists can study impacts, solar wind,",
            "Moon history, and future exploration."
          ];
          setStatus(
            "Mission complete: " + returnedSamples + "% of the lunar samples reached Earth for scientists to study lunar rocks, minerals, regolith, impact glass, and dust."
          );
        } else if (arrivalSpeed > 145) {
          game.state = "lost";
          setStatus("Mission failed: Earth arrival was too fast for safe recovery.");
        } else if (game.rocketIntegrity < 35) {
          game.state = "lost";
          setStatus("Mission failed: capsule integrity was too low for safe recovery.");
        } else {
          game.state = "lost";
          setStatus("Mission failed: too much sample damage before arrival.");
        }
      }

      if (rocket.y < 20 || rocket.y > worldHeight - 20 || rocket.x < 0 || rocket.x > worldWidth + 120) {
        game.state = "lost";
        setStatus("Mission failed: the rocket drifted beyond the recovery corridor.");
      }
    }

    function update(game, keys, dt, setStatus) {
      var rocket = game.rocket;
      var acceleration = getGravityAcceleration(game);

      applyThrust(game, keys, dt);
      rocket.vx += acceleration.x * dt;
      rocket.vy += acceleration.y * dt;
      rocket.x += rocket.vx * dt;
      rocket.y += rocket.vy * dt;
      game.elapsed += dt;

      updateHazards(dt);
      checkCollisions(game, setStatus);

      if (game.fuel <= 0 && getSpeed(game) < 20 && getDistance(game.rocket, earth) > 620 && game.state === "running") {
        game.state = "lost";
        setStatus("Mission failed: no fuel remains for correction burns.");
      } else if (game.fuel <= 18 && game.state === "running") {
        setStatus("Fuel is low. Use tiny correction burns.");
      } else if (game.gravityLabel === "Earth approach" && game.state === "running") {
        setStatus("Earth approach: gravity rises towards 9.80665 m/s^2 at the surface. Manage speed for recovery.");
      } else if (game.gravityLabel === "Apparent free fall" && game.state === "running") {
        setStatus("Cislunar coast: the capsule is in free fall, so apparent gravity is near 0 g and momentum carries it forward.");
      }
    }

    function updateTelemetry(game, displays) {
      var landingRangeKm = getLandingRangeKm(game);

      displays.fuel.textContent = Math.round(game.fuel) + "%";
      displays.rocketIntegrity.textContent = Math.round(game.rocketIntegrity) + "%";
      displays.samples.textContent = Math.round(game.samples) + "%";
      displays.speed.textContent = Math.round(getSpeed(game)) + " m/s";
      displays.gravity.textContent = formatGravity(game.gravityLabel, game.gravityMs2);
      displays.distance.textContent = landingRangeKm.toLocaleString("en-GB") + " km to platform";
    }

    return {
      createGame: createGame,
      earth: earth,
      gravityZones: gravityZones,
      hazards: hazards,
      initialStatus: "Launch from the Moon. Short thrusts save fuel.",
      moon: moon,
      update: update,
      updateTelemetry: updateTelemetry,
      worldHeight: worldHeight,
      worldWidth: worldWidth
    };
  }

  window.SpaceRocketPhysicsMissionLunar = {
    create: create
  };
})();
