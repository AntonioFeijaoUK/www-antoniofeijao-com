(function () {
  function create() {
    var worldWidth = 2600;
    var worldHeight = 1700;
    var earthStandardGravity = 9.80665;
    var karmanLineKm = 100;
    var minimumAscentSeconds = 30;
    var insertionCeilingKm = 220;
    var minimumHorizontalSpeed = 25;
    var maximumVerticalSpeed = 260;
    var kmPerPixel = 0.03;
    var referenceRocket = {
      name: "Teaching booster",
      wetMassTonnes: 2800,
      dryMassTonnes: 155,
      maxThrustMN: 34,
      propellant: "LOX/RP-1 style",
      reference: "Saturn V class: Apollo 11 lifted off with about 7.7 million lbf of thrust"
    };
    var gravityZones = {
      earth: 640,
      moon: 0
    };

    var earth = {
      x: 180,
      y: 830,
      labelOffsetY: -42,
      radius: 260
    };

    var moon = {
      x: -900,
      y: -900,
      radius: 0
    };

    var hazards = [];
    var launchSurfaceY = earth.y - earth.radius;

    function clamp(value, minimum, maximum) {
      return Math.max(minimum, Math.min(maximum, value));
    }

    function getSpeed(game) {
      var rocket = game ? game.rocket : { vx: 0, vy: 0 };
      return Math.sqrt(rocket.vx * rocket.vx + rocket.vy * rocket.vy);
    }

    function getAltitudeKm(game) {
      var altitudePixels = launchSurfaceY - (game.rocket.y + game.rocket.radius);

      return Math.max(0, altitudePixels * kmPerPixel);
    }

    function getAtmosphericDensity(altitudeKm) {
      if (altitudeKm >= karmanLineKm) {
        return 0;
      }

      return Math.exp(-altitudeKm / 8.5);
    }

    function formatGravity(label, gravityMs2) {
      return label + ": " + gravityMs2.toFixed(2) + " m/s^2 (" + (gravityMs2 / earthStandardGravity).toFixed(3) + " g)";
    }

    function createGame() {
      return {
        rocket: {
          x: earth.x,
          y: launchSurfaceY - 13,
          vx: 0,
          vy: 0,
          radius: 13,
          angle: 0
        },
        fuel: 100,
        rocketIntegrity: 100,
        samples: 100,
        accelerationG: 0,
        activeObjective: "Objective: reach 100-220 km after 30 s with X >= 25 m/s.",
        countdown: 10,
        dynamicPressure: 0,
        engineLit: false,
        elapsed: 0,
        kmPerPixel: kmPerPixel,
        maxQ: 0,
        insertionCeilingKm: insertionCeilingKm,
        milestones: [1, 10, 20, 50, 80, 100],
        minimumHorizontalSpeed: minimumHorizontalSpeed,
        maximumVerticalSpeed: maximumVerticalSpeed,
        pitchError: 0,
        pitchTarget: 0,
        reachedMilestones: {},
        shockWarning: 0,
        phaseTime: 0,
        referenceRocket: referenceRocket,
        throttle: 0,
        trail: [],
        thrustToWeight: 0,
        state: "ready",
        corridorLabel: "Atmosphere: drag and dynamic pressure fade with altitude; space begins at the Karman line, 100 km",
        gravityLabel: "Earth surface reference",
        gravityMs2: earthStandardGravity,
        overlayTitle: "Launch achieved",
        debrief: null
      };
    }

    function shouldUpdate(game) {
      return game.state === "countdown" || game.state === "ignition";
    }

    function startGame(game, setStatus) {
      if (game.state === "ready") {
        game.state = "countdown";
        game.countdown = 10;
        game.phaseTime = 0;
        game.engineLit = false;
        game.throttle = 0;
        setStatus("T-10 seconds. Guidance is internal; tanks are pressurised for launch.");
        return;
      }

      game.state = "running";
      setStatus("Liftoff. Build speed slowly through dense air and watch Max-Q.");
    }

    function applyControls(game, keys, dt) {
      var rocket = game.rocket;
      var rotationSpeed = 0.42;
      var thrustPower = 112;
      var retroPower = 115;
      var burnRate = 1.95;

      if (keys.ArrowLeft) {
        rocket.angle -= rotationSpeed * dt;
      }

      if (keys.ArrowRight) {
        rocket.angle += rotationSpeed * dt;
      }

      rocket.angle = clamp(rocket.angle, -0.46, 0.52);
      if (game.state === "running") {
        game.throttle = 0;
      }

      if (game.fuel <= 0) {
        game.fuel = 0;
        return;
      }

      if (keys.ArrowUp) {
        game.throttle = Math.min(1, Math.max(game.throttle, 0.38 + game.phaseTime / 7.5));
        rocket.vx += Math.sin(rocket.angle) * thrustPower * game.throttle * dt;
        rocket.vy -= Math.cos(rocket.angle) * thrustPower * game.throttle * dt;
        game.fuel = Math.max(0, game.fuel - burnRate * dt);
      }

      if (keys.ArrowDown && game.fuel > 0) {
        rocket.vx -= Math.sin(rocket.angle) * retroPower * dt;
        rocket.vy += Math.cos(rocket.angle) * retroPower * dt;
        game.fuel = Math.max(0, game.fuel - burnRate * 0.36 * dt);
        game.throttle = Math.max(game.throttle, 0.32);
      }
    }

    function applyEarthGravity(game, dt) {
      var altitudeKm = getAltitudeKm(game);
      var gravity = earthStandardGravity * Math.pow(6371 / (6371 + altitudeKm), 2);
      var gameGravity = gravity * 7.5;

      game.gravityLabel = altitudeKm < 5 ? "Earth lower atmosphere" : "Earth launch climb";
      game.gravityMs2 = gravity;
      game.rocket.vy += gameGravity * dt;
    }

    function applyAtmosphere(game, dt) {
      var rocket = game.rocket;
      var speed = getSpeed(game);
      var altitudeKm = getAltitudeKm(game);
      var density = getAtmosphericDensity(altitudeKm);
      var drag = density * speed * 0.028;
      var dynamicPressure = density * speed * speed * 0.006;
      var maxQOverThrottle = dynamicPressure > 72 && game.throttle > 0.82;

      game.dynamicPressure = dynamicPressure;
      game.shockWarning = maxQOverThrottle ? Math.min(1, (dynamicPressure - 72) / 70) : 0;

      if (speed > 0) {
        rocket.vx -= rocket.vx / speed * drag * dt;
        rocket.vy -= rocket.vy / speed * drag * dt;
      }

      game.maxQ = Math.max(game.maxQ, dynamicPressure);

      if (dynamicPressure > 82 && game.state === "running") {
        var damage = clamp((dynamicPressure - 82) * (maxQOverThrottle ? 0.032 : 0.01) * dt, 0, maxQOverThrottle ? 0.36 : 0.12);

        game.rocketIntegrity = Math.max(0, game.rocketIntegrity - damage);
      }
    }

    function getPitchTarget(altitudeKm) {
      if (altitudeKm < 2) {
        return 0;
      }

      if (altitudeKm < 55) {
        return (altitudeKm - 2) / 53 * 0.38;
      }

      return Math.min(0.48, 0.38 + (altitudeKm - 55) / 45 * 0.1);
    }

    function applyPitchCorridor(game, dt) {
      var altitudeKm = getAltitudeKm(game);
      var target = getPitchTarget(altitudeKm);
      var tolerance = altitudeKm < 12 ? 0.2 : 0.16;

      game.pitchTarget = target;
      game.pitchError = Math.abs(game.rocket.angle - target);

      if (altitudeKm > 6 && game.pitchError > tolerance && game.state === "running") {
        game.rocketIntegrity = Math.max(0, game.rocketIntegrity - clamp((game.pitchError - tolerance) * 1.8 * dt, 0, 0.06));
      }
    }

    function checkMissionState(game, setStatus) {
      var rocket = game.rocket;
      var altitudeKm = getAltitudeKm(game);
      var speed = getSpeed(game);
      var horizontalSpeed = Math.abs(rocket.vx);
      var verticalSpeed = Math.abs(rocket.vy);

      if (altitudeKm > insertionCeilingKm && game.state === "running") {
        game.state = "lost";
        setStatus("Mission failed: the rocket overshot the target corridor. Throttle down or use retro before racing far past 100 km.");
        return;
      }

      if (altitudeKm >= karmanLineKm && game.elapsed < minimumAscentSeconds && game.state === "running") {
        game.activeObjective =
          "Hold corridor: " +
          Math.ceil(minimumAscentSeconds - game.elapsed) +
          " s remaining, keep 100-220 km and X >= " +
          minimumHorizontalSpeed +
          ".";
        setStatus(
          "Karman line crossed. Keep the ascent stable for " +
            Math.ceil(minimumAscentSeconds - game.elapsed) +
            " more seconds inside the target corridor."
        );
        return;
      }

      if (altitudeKm >= karmanLineKm && horizontalSpeed < minimumHorizontalSpeed && game.state === "running") {
        game.activeObjective = "Need gravity turn: build X velocity to " + minimumHorizontalSpeed + " m/s.";
        setStatus("Karman line crossed, but the rocket needs more downrange velocity. Follow the pitch corridor before the target window.");
        return;
      }

      if (
        altitudeKm >= karmanLineKm &&
        altitudeKm <= insertionCeilingKm &&
        game.elapsed >= minimumAscentSeconds &&
        horizontalSpeed >= minimumHorizontalSpeed &&
        verticalSpeed <= maximumVerticalSpeed &&
        game.rocketIntegrity >= 55
      ) {
        game.state = "won";
        game.activeObjective = "Target corridor complete.";
        game.debrief = [
          "You reached the target corridor above 100 km.",
          "The rocket fought Earth gravity, air drag,",
          "and Max-Q: peak aerodynamic stress.",
          "The gravity turn added sideways velocity,",
          "which real rockets need for orbit."
        ];
        setStatus("Mission complete: the rocket reached the target corridor after a stable ascent and gravity turn.");
        return;
      }

      if (
        altitudeKm >= karmanLineKm &&
        altitudeKm <= insertionCeilingKm &&
        game.elapsed >= minimumAscentSeconds &&
        horizontalSpeed >= minimumHorizontalSpeed &&
        verticalSpeed > maximumVerticalSpeed &&
        game.state === "running"
      ) {
        game.activeObjective = "Slow vertical speed: use retro until V <= " + maximumVerticalSpeed + " m/s.";
        setStatus("Target corridor reached, but vertical speed is too high. Use retro to settle into the window.");
        return;
      }

      if (game.rocketIntegrity <= 0) {
        game.state = "lost";
        setStatus("Mission failed: Max-Q aerodynamic stress broke the rocket apart.");
        return;
      }

      if (rocket.y + rocket.radius >= launchSurfaceY + 2 && game.elapsed > 1.2) {
        game.state = "lost";
        setStatus(speed > 55 ? "Mission failed: the rocket struck Earth too fast." : "Mission failed: gravity pulled the rocket back to the launch pad.");
        return;
      }

      if (rocket.y < -4500) {
        game.state = "lost";
        setStatus("Mission failed: the rocket climbed beyond the simulated launch corridor. Use retro before passing the upper target.");
        return;
      }

      if (rocket.y > worldHeight + 80) {
        game.state = "lost";
        setStatus("Mission failed: the rocket fell below the launch safety corridor.");
        return;
      }

      if (game.fuel <= 0 && altitudeKm < karmanLineKm && rocket.vy > -12) {
        game.state = "lost";
        setStatus("Mission failed: fuel ran out before the rocket had enough upward velocity.");
      } else if (game.fuel <= 0 && altitudeKm >= karmanLineKm && horizontalSpeed < minimumHorizontalSpeed) {
        game.state = "lost";
        setStatus("Mission failed: you reached 100 km, but without enough sideways velocity for the target window. Add a small gravity turn before fuel runs out.");
      } else if (game.fuel <= 0 && altitudeKm >= karmanLineKm) {
        game.state = "lost";
        setStatus("Mission failed: fuel ran out before completing the target corridor.");
      }
    }

    function updateTrail(game) {
      if (game.throttle > 0 || game.engineLit) {
        game.trail.push({
          x: game.rocket.x - Math.sin(game.rocket.angle) * 18,
          y: game.rocket.y + Math.cos(game.rocket.angle) * 22,
          age: 0,
          throttle: game.throttle
        });
      }

      game.trail.forEach(function (point) {
        point.age += 1;
        point.y += 0.7;
      });
      game.trail = game.trail.filter(function (point) {
        return point.age < 130;
      });
    }

    function checkMilestones(game, altitudeKm, setStatus) {
      game.milestones.forEach(function (milestone) {
        if (altitudeKm >= milestone && !game.reachedMilestones[milestone] && game.state === "running") {
          game.reachedMilestones[milestone] = true;

          if (milestone === 1) {
            setStatus("1 km: tower clear. The rocket is still in dense lower atmosphere.");
          } else if (milestone === 10) {
            setStatus("10 km: clouds and most weather are below or around this region.");
          } else if (milestone === 20) {
            setStatus("20 km: the sky darkens as atmospheric scattering drops.");
          } else if (milestone === 50) {
            setStatus("50 km: the stratosphere is thin; drag is much lower.");
          } else if (milestone === 80) {
            setStatus("80 km: near-space. The Karman line target is close.");
          }
        }
      });
    }

    function update(game, keys, dt, setStatus) {
      var altitudeKm = getAltitudeKm(game);
      var density = getAtmosphericDensity(altitudeKm);
      var dynamicPressure;
      var previousVx = game.rocket.vx;
      var previousVy = game.rocket.vy;

      if (game.state === "countdown") {
        game.countdown = Math.max(0, game.countdown - dt);
        game.rocket.y = launchSurfaceY - game.rocket.radius;
        game.rocket.vx = 0;
        game.rocket.vy = 0;
        game.throttle = 0;
        if (game.countdown <= 3 && !game.engineLit) {
          game.engineLit = true;
          setStatus("Ignition sequence start. Engines build chamber pressure before release.");
        } else if (Math.ceil(game.countdown) !== Math.ceil(game.countdown + dt)) {
          setStatus("T-" + Math.ceil(game.countdown) + " seconds. Hold for engine checks and guidance.");
        }
        if (game.countdown <= 0) {
          game.state = "ignition";
          game.phaseTime = 0;
          game.throttle = 0.28;
          setStatus("Ignition. Hold-down clamps still keep the heavy rocket on the pad.");
        }
        return;
      }

      if (game.state === "ignition") {
        game.phaseTime += dt;
        game.engineLit = true;
        game.throttle = clamp(0.28 + game.phaseTime * 0.22, 0.28, 0.72);
        game.rocket.y = launchSurfaceY - game.rocket.radius;
        game.rocket.vx = 0;
        game.rocket.vy = 0;
        if (game.phaseTime >= 2.4) {
          game.state = "running";
          game.phaseTime = 0;
          setStatus("Liftoff. Thrust is now greater than weight, so the rocket clears the tower.");
        }
        return;
      }

      game.phaseTime += dt;
      applyControls(game, keys, dt);
      applyEarthGravity(game, dt);
      applyAtmosphere(game, dt);
      applyPitchCorridor(game, dt);
      updateTrail(game);

      game.rocket.x += game.rocket.vx * dt;
      game.rocket.y += game.rocket.vy * dt;
      game.elapsed += dt;
      game.accelerationG = Math.sqrt(
        Math.pow((game.rocket.vx - previousVx) / dt, 2) + Math.pow((game.rocket.vy - previousVy) / dt, 2)
      ) / 73.5;
      game.thrustToWeight = game.throttle * referenceRocket.maxThrustMN / (referenceRocket.wetMassTonnes * 0.00980665);

      if (game.rocket.y + game.rocket.radius > launchSurfaceY && game.rocket.vy > 0) {
        game.rocket.y = launchSurfaceY - game.rocket.radius;
        game.rocket.vy = 0;
      }

      altitudeKm = getAltitudeKm(game);
      checkMilestones(game, altitudeKm, setStatus);
      dynamicPressure = density * getSpeed(game) * getSpeed(game) * 0.006;
      checkMissionState(game, setStatus);

      if (game.state !== "running") {
        return;
      }

      if (game.shockWarning > 0) {
        setStatus("Max-Q: too fast through dense air. Throttle down; aerodynamic pressure and heating are stressing the rocket structure.");
      } else if (dynamicPressure > 72) {
        setStatus("Max-Q warning: dynamic pressure is high. Pulse thrust and keep the pitch corridor.");
      } else if (game.pitchError > 0.2 && altitudeKm > 8) {
        setStatus("Pitch corridor warning: tilt gradually. Too much angle in thick air adds side load and drag.");
      } else if (altitudeKm >= karmanLineKm) {
        game.activeObjective =
          "Hold corridor: " +
          Math.max(0, Math.ceil(minimumAscentSeconds - game.elapsed)) +
          " s remaining, keep 100-220 km and X >= " +
          minimumHorizontalSpeed +
          ".";
        setStatus(game.activeObjective);
      } else if (altitudeKm > 55) {
        game.activeObjective = "Climb to 100 km, then hold the target corridor until 30 s.";
        setStatus("Upper atmosphere: drag is falling. Continue the gravity turn and build upward velocity.");
      } else if (altitudeKm > 12) {
        game.activeObjective = "Follow the pitch corridor and manage Max-Q.";
        setStatus("Gravity turn: tilt slowly. Real rockets pitch over to gain horizontal speed without wasting lift.");
      } else if (game.fuel < 24) {
        setStatus("Fuel is low. Earth launch needs sustained thrust because gravity is 9.80665 m/s^2 at sea level.");
      }
    }

    function updateTelemetry(game, displays) {
      var altitudeKm = getAltitudeKm(game);

      displays.fuel.textContent = Math.round(game.fuel) + "%";
      displays.rocketIntegrity.textContent = Math.round(game.rocketIntegrity) + "%";
      displays.samples.textContent =
        "T/W " +
        game.thrustToWeight.toFixed(2) +
        " | Downrange " +
        Math.round(Math.abs(game.rocket.vx)) +
        "/" +
        minimumHorizontalSpeed +
        " | Vertical " +
        Math.round(Math.abs(game.rocket.vy)) +
        "/" +
        maximumVerticalSpeed;
      displays.speed.textContent = Math.round(getSpeed(game)) + " m/s";
      displays.gravity.textContent = formatGravity(game.gravityLabel, game.gravityMs2);
      displays.distance.textContent = altitudeKm.toFixed(1) + " km | " + Math.round(game.elapsed) + " s | target 100-220";
    }

    return {
      createGame: createGame,
      earth: earth,
      gravityZones: gravityZones,
      hazards: hazards,
      initialStatus: "Launch from Earth. Hold thrust, pitch gently, and manage Max-Q through the atmosphere.",
      moon: moon,
      shouldUpdate: shouldUpdate,
      startGame: startGame,
      update: update,
      updateTelemetry: updateTelemetry,
      worldHeight: worldHeight,
      worldWidth: worldWidth
    };
  }

  window.SpaceRocketPhysicsMissionEarth = {
    create: create
  };
})();
