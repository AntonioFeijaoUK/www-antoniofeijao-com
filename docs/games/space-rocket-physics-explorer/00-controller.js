(function () {
  var canvas = document.getElementById("lunar-canvas");
  var status = document.getElementById("lunar-status");
  var startButton = document.getElementById("lunar-start");
  var pauseButton = document.getElementById("lunar-pause");
  var restartButton = document.getElementById("lunar-restart");
  var missionTitle = document.getElementById("lunar-game-title");
  var missionButtons = Array.prototype.slice.call(document.querySelectorAll("[data-mission-id]"));
  var controlTips = Array.prototype.slice.call(document.querySelectorAll("[data-control-tip]"));
  var sciencePanels = Array.prototype.slice.call(document.querySelectorAll("[data-science-mission]"));
  var telemetryDisplays = {
    distance: document.getElementById("lunar-distance"),
    fuel: document.getElementById("lunar-fuel"),
    gravity: document.getElementById("lunar-gravity"),
    rocketIntegrity: document.getElementById("lunar-rocket-integrity"),
    samples: document.getElementById("lunar-samples"),
    speed: document.getElementById("lunar-speed")
  };

  if (!canvas || !canvas.getContext) {
    if (status) {
      status.textContent = "Canvas is not available in this browser.";
    }
    return;
  }

  var context = canvas.getContext("2d");
  var missionFactories = {
    "earth-launch": window.SpaceRocketPhysicsMissionEarth,
    "lunar-return": window.SpaceRocketPhysicsMissionLunar
  };
  var activeMissionId = "lunar-return";
  var mission = createMission(activeMissionId);
  var gameWidth = 900;
  var gameHeight = 480;
  var input = window.SpaceRocketPhysicsInput
    ? window.SpaceRocketPhysicsInput.create({
        onPause: togglePause,
        onStart: startMission
      })
    : null;
  var keys = input ? input.keys : {};
  var animationId = null;
  var lastTime = 0;
  var game = null;
  var renderer = window.SpaceRocketPhysicsRenderer
    ? window.SpaceRocketPhysicsRenderer.create({
        context: context,
        getEarth: function () {
          return mission.earth;
        },
        getGame: function () {
          return game;
        },
        getGameHeight: function () {
          return gameHeight;
        },
        getGameWidth: function () {
          return gameWidth;
        },
        getHazards: function () {
          return mission.hazards;
        },
        getKeys: function () {
          return keys;
        },
        getGravityZones: function () {
          return mission.gravityZones;
        },
        getMoon: function () {
          return mission.moon;
        },
        getWorldWidth: function () {
          return mission.worldWidth;
        }
      })
    : null;

  if (!mission) {
    setStatus("Mission module is not available.");
    return;
  }

  function setStatus(message) {
    if (status) {
      status.textContent = message;
    }

    if (game) {
      game.statusMessage = message;
    }
  }

  function createMission(missionId) {
    var missionModule = missionFactories[missionId];

    return missionModule ? missionModule.create() : null;
  }

  function updateMissionSelector() {
    missionButtons.forEach(function (button) {
      var isActive = button.getAttribute("data-mission-id") === activeMissionId;

      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-pressed", isActive ? "true" : "false");

      if (isActive && missionTitle) {
        missionTitle.textContent = button.getAttribute("data-mission-title") || button.textContent.trim();
      }
    });

    sciencePanels.forEach(function (panel) {
      panel.hidden = panel.getAttribute("data-science-mission") !== activeMissionId;
    });

    controlTips.forEach(function (tip) {
      tip.hidden = tip.getAttribute("data-control-tip") !== activeMissionId;
    });
  }

  function createGame() {
    game = mission.createGame();
    updateTelemetry();
    draw();
  }

  function selectMission(missionId) {
    var selectedMission = createMission(missionId);

    if (!selectedMission) {
      setStatus("Selected mission is not available.");
      return;
    }

    activeMissionId = missionId;
    mission = selectedMission;
    if (input && input.reset) {
      input.reset();
    }
    updateMissionSelector();
    createGame();
    setStatus(missionId === "earth-launch" ? mission.initialStatus : "Mission 1 selected. Ready for launch.");
  }

  function resizeCanvas() {
    var pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    var displayWidth = canvas.clientWidth || gameWidth;
    var displayHeight = canvas.clientHeight || Math.round(displayWidth * 0.533);

    gameWidth = Math.max(360, Math.round(displayWidth));
    gameHeight = Math.max(320, Math.round(displayHeight));
    canvas.width = Math.floor(displayWidth * pixelRatio);
    canvas.height = Math.floor(displayHeight * pixelRatio);
    context.setTransform(canvas.width / gameWidth, 0, 0, canvas.height / gameHeight, 0, 0);
    context.imageSmoothingEnabled = false;
    draw();
  }

  function updateTelemetry() {
    mission.updateTelemetry(game, telemetryDisplays);
  }

  function draw() {
    if (renderer) {
      renderer.draw();
    }
  }

  function loop(timestamp) {
    var dt = Math.min(0.033, (timestamp - lastTime) / 1000 || 0);
    lastTime = timestamp;

    if (game && (game.state === "running" || mission.shouldUpdate && mission.shouldUpdate(game))) {
      mission.update(game, keys, dt, setStatus);
      updateTelemetry();
    }

    draw();
    animationId = window.requestAnimationFrame(loop);
  }

  function startMission() {
    if (game && game.state === "planned") {
      setStatus(mission.initialStatus);
      return;
    }

    if (!game || game.state === "lost" || game.state === "won") {
      createGame();
    }

    if (mission.startGame) {
      mission.startGame(game, setStatus);
    } else {
      game.state = "running";
      setStatus(mission.initialStatus);
    }
  }

  function togglePause() {
    if (!game || game.state === "ready") {
      return;
    }

    if (game.state === "running" || mission.shouldUpdate && mission.shouldUpdate(game)) {
      game.previousState = game.state;
      game.state = "paused";
      setStatus("Paused.");
    } else if (game.state === "paused") {
      game.state = game.previousState || "running";
      game.previousState = null;
      setStatus("Mission resumed.");
    }
  }

  function restartMission() {
    createGame();
    setStatus("Mission reset. Ready for launch.");
  }

  startButton.addEventListener("click", startMission);
  pauseButton.addEventListener("click", togglePause);
  restartButton.addEventListener("click", restartMission);
  missionButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      selectMission(button.getAttribute("data-mission-id"));
    });
  });
  window.addEventListener("resize", resizeCanvas);

  updateMissionSelector();
  createGame();
  resizeCanvas();
  animationId = window.requestAnimationFrame(function (timestamp) {
    lastTime = timestamp;
    loop(timestamp);
  });
})();
