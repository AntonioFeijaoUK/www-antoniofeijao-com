(function () {
  function getSupportLabel(value) {
    return value ? "Yes" : "No";
  }

  function getConnectionSummary() {
    var connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;

    if (!connection) {
      return "Not reported";
    }

    return [
      connection.effectiveType ? "browser estimate: " + connection.effectiveType + " class" : null,
      connection.downlink ? "estimated downlink " + connection.downlink + " Mbps" : null,
      connection.saveData ? "save data on" : null
    ].filter(Boolean).join(", ") || "Available";
  }

  function getCanvasSummary(canvas, getWorldSize) {
    var worldSize = getWorldSize ? getWorldSize() : { width: 0, height: 0 };

    return [
      "CSS " + Math.round(canvas.clientWidth || 0) + " x " + Math.round(canvas.clientHeight || 0),
      "backing " + canvas.width + " x " + canvas.height,
      "world " + worldSize.width + " x " + worldSize.height
    ].join(", ");
  }

  function getDoNotTrackSummary() {
    var value = navigator.doNotTrack || window.doNotTrack || navigator.msDoNotTrack;

    if (value === "1" || value === "yes") {
      return "Enabled";
    }

    if (value === "0" || value === "no") {
      return "Disabled";
    }

    return "Not reported";
  }

  function getReferrerSummary() {
    return document.referrer || "None reported";
  }

  function getCapabilityRows() {
    return [
      ["Secure context", getSupportLabel(window.isSecureContext)],
      ["Page origin", window.location.origin],
      ["Protocol", window.location.protocol],
      ["Referrer", getReferrerSummary()],
      ["Cookies enabled", getSupportLabel(navigator.cookieEnabled)],
      ["Do Not Track", getDoNotTrackSummary()],
      ["Clipboard API available", getSupportLabel(Boolean(navigator.clipboard))],
      ["Geolocation API available", getSupportLabel(Boolean(navigator.geolocation))],
      ["Camera/microphone API available", getSupportLabel(Boolean(navigator.mediaDevices && navigator.mediaDevices.getUserMedia))],
      ["Service worker support", getSupportLabel("serviceWorker" in navigator)],
      ["WebGL support", getSupportLabel(Boolean(getWebGLContext()))],
      ["WebRTC support", getSupportLabel(Boolean(window.RTCPeerConnection))]
    ];
  }

  function getWebGLContext() {
    var canvas = document.createElement("canvas");

    try {
      return canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    } catch (error) {
      return null;
    }
  }

  function formatBytes(bytes) {
    if (!Number.isFinite(bytes)) {
      return "Not reported";
    }

    if (bytes >= 1073741824) {
      return Math.round(bytes / 1073741824 * 10) / 10 + " GB";
    }

    if (bytes >= 1048576) {
      return Math.round(bytes / 1048576 * 10) / 10 + " MB";
    }

    return Math.round(bytes / 1024 * 10) / 10 + " KB";
  }

  function queryPermission(name) {
    if (!navigator.permissions || !navigator.permissions.query) {
      return Promise.resolve([name + " permission", "Not supported"]);
    }

    return navigator.permissions.query({ name: name }).then(function (status) {
      return [name + " permission", status.state];
    }).catch(function () {
      return [name + " permission", "Not supported"];
    });
  }

  function getAsyncRows() {
    var tasks = [];

    if (navigator.storage && navigator.storage.estimate) {
      tasks.push(navigator.storage.estimate().then(function (estimate) {
        return [
          ["Storage usage", formatBytes(estimate.usage)],
          ["Storage quota", formatBytes(estimate.quota)]
        ];
      }).catch(function () {
        return [
          ["Storage usage", "Not reported"],
          ["Storage quota", "Not reported"]
        ];
      }));
    } else {
      tasks.push(Promise.resolve([
        ["Storage usage", "Not supported"],
        ["Storage quota", "Not supported"]
      ]));
    }

    if (navigator.storage && navigator.storage.persisted) {
      tasks.push(navigator.storage.persisted().then(function (isPersisted) {
        return [["Persistent storage", getSupportLabel(isPersisted)]];
      }).catch(function () {
        return [["Persistent storage", "Not reported"]];
      }));
    } else {
      tasks.push(Promise.resolve([["Persistent storage", "Not supported"]]));
    }

    ["notifications", "geolocation", "camera", "microphone", "clipboard-read"].forEach(function (permissionName) {
      tasks.push(queryPermission(permissionName).then(function (row) {
        return [row];
      }));
    });

    return Promise.all(tasks).then(function (rowGroups) {
      return rowGroups.reduce(function (allRows, rowGroup) {
        return allRows.concat(rowGroup);
      }, []);
    });
  }

  function getStatsRows(options) {
    var timeZone = "Not reported";
    var deviceMemory = navigator.deviceMemory ? navigator.deviceMemory + " GB" : "Not reported";

    try {
      timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone || timeZone;
    } catch (error) {
      timeZone = "Not reported";
    }

    return [
      ["User agent", navigator.userAgent || "Not reported"],
      ["Viewport", window.innerWidth + " x " + window.innerHeight],
      ["Screen", screen.width + " x " + screen.height],
      ["Available screen", screen.availWidth + " x " + screen.availHeight],
      ["Device pixel ratio", String(window.devicePixelRatio || 1)],
      ["Canvas", getCanvasSummary(options.canvas, options.getWorldSize)],
      ["Fullscreen", getSupportLabel(Boolean(document.fullscreenElement))],
      ["Touch support", getSupportLabel(("ontouchstart" in window) || navigator.maxTouchPoints > 0)],
      ["Language", navigator.language || "Not reported"],
      ["Time zone", timeZone],
      ["Platform", navigator.platform || "Not reported"],
      ["CPU hint", navigator.hardwareConcurrency ? navigator.hardwareConcurrency + " logical cores" : "Not reported"],
      ["Memory hint", deviceMemory],
      ["Network", navigator.onLine ? "Online" : "Offline"],
      ["Connection", getConnectionSummary()],
      ["Reduced motion", getSupportLabel(window.matchMedia("(prefers-reduced-motion: reduce)").matches)],
      ["Colour scheme", window.matchMedia("(prefers-color-scheme: dark)").matches ? "Dark" : "Light or no preference"],
      ["Local storage", getSupportLabel(Boolean(window.localStorage))],
      ["Session storage", getSupportLabel(Boolean(window.sessionStorage))]
    ].concat(getCapabilityRows()).concat([
      ["Current game", options.getCurrentGameSummary ? options.getCurrentGameSummary() : "Not reported"]
    ]);
  }

  function create(options) {
    var cameraButton = document.getElementById("space-invader-demo-camera");
    var microphoneButton = document.getElementById("space-invader-demo-microphone");
    var locationButton = document.getElementById("space-invader-demo-location");
    var notificationsButton = document.getElementById("space-invader-demo-notifications");
    var stopMediaButton = document.getElementById("space-invader-demo-stop-media");
    var cameraPreview = document.getElementById("space-invader-demo-camera-preview");
    var demoStatus = document.getElementById("space-invader-demo-status");
    var activeMediaStream = null;

    function setDemoStatus(message) {
      if (demoStatus) {
        demoStatus.textContent = message;
      }
    }

    function stopMedia() {
      if (activeMediaStream) {
        activeMediaStream.getTracks().forEach(function (track) {
          track.stop();
        });
        activeMediaStream = null;
      }

      if (cameraPreview) {
        cameraPreview.srcObject = null;
        cameraPreview.hidden = true;
      }

      setDemoStatus("Media access stopped.");
      updateIfVisible();
    }

    function requestCameraPreview() {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setDemoStatus("Camera preview is not supported by this browser.");
        return;
      }

      stopMedia();
      navigator.mediaDevices.getUserMedia({ video: true, audio: false }).then(function (stream) {
        activeMediaStream = stream;
        if (cameraPreview) {
          cameraPreview.srcObject = stream;
          cameraPreview.hidden = false;
        }
        setDemoStatus("Camera preview is running locally in this browser.");
        updateIfVisible();
      }).catch(function (error) {
        setDemoStatus("Camera access was not started: " + error.name + ".");
        updateIfVisible();
      });
    }

    function requestMicrophoneAccess() {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setDemoStatus("Microphone access is not supported by this browser.");
        return;
      }

      navigator.mediaDevices.getUserMedia({ audio: true, video: false }).then(function (stream) {
        stream.getTracks().forEach(function (track) {
          track.stop();
        });
        setDemoStatus("Microphone access was approved and then immediately stopped. No audio is recorded.");
        updateIfVisible();
      }).catch(function (error) {
        setDemoStatus("Microphone access was not started: " + error.name + ".");
        updateIfVisible();
      });
    }

    function requestLocation() {
      if (!navigator.geolocation) {
        setDemoStatus("Geolocation is not supported by this browser.");
        return;
      }

      navigator.geolocation.getCurrentPosition(function (position) {
        var latitude = Math.round(position.coords.latitude * 1000) / 1000;
        var longitude = Math.round(position.coords.longitude * 1000) / 1000;

        setDemoStatus("Geolocation approved locally. Rounded position shown here: " + latitude + ", " + longitude + ".");
        updateIfVisible();
      }, function (error) {
        setDemoStatus("Geolocation was not provided: " + error.message);
        updateIfVisible();
      }, {
        enableHighAccuracy: false,
        maximumAge: 60000,
        timeout: 10000
      });
    }

    function requestNotifications() {
      if (!("Notification" in window) || !Notification.requestPermission) {
        setDemoStatus("Notifications are not supported by this browser.");
        return;
      }

      Notification.requestPermission().then(function (permission) {
        setDemoStatus("Notification permission is now: " + permission + ".");
        updateIfVisible();
      }).catch(function (error) {
        setDemoStatus("Notification permission was not requested: " + error.name + ".");
        updateIfVisible();
      });
    }

    function appendRows(rows) {
      if (!options.list) {
        return;
      }

      rows.forEach(function (row) {
        var term = document.createElement("dt");
        var description = document.createElement("dd");

        term.textContent = row[0];
        description.textContent = row[1];
        options.list.appendChild(term);
        options.list.appendChild(description);
      });
    }

    function render() {
      if (!options.list) {
        return;
      }

      options.list.textContent = "";
      appendRows(getStatsRows(options));
      getAsyncRows().then(function (rows) {
        if (options.panel && !options.panel.hidden) {
          appendRows(rows);
        }
      });
    }

    function updateIfVisible() {
      if (options.panel && !options.panel.hidden) {
        render();
      }
    }

    function toggle() {
      if (!options.panel || !options.toggleButton) {
        return;
      }

      options.panel.hidden = !options.panel.hidden;
      options.toggleButton.setAttribute("aria-expanded", String(!options.panel.hidden));

      if (!options.panel.hidden) {
        render();
      }
    }

    if (options.toggleButton) {
      options.toggleButton.addEventListener("click", toggle);
    }

    if (cameraButton) {
      cameraButton.addEventListener("click", requestCameraPreview);
    }

    if (microphoneButton) {
      microphoneButton.addEventListener("click", requestMicrophoneAccess);
    }

    if (locationButton) {
      locationButton.addEventListener("click", requestLocation);
    }

    if (notificationsButton) {
      notificationsButton.addEventListener("click", requestNotifications);
    }

    if (stopMediaButton) {
      stopMediaButton.addEventListener("click", stopMedia);
    }

    window.addEventListener("online", updateIfVisible);
    window.addEventListener("offline", updateIfVisible);

    return {
      render: render,
      updateIfVisible: updateIfVisible
    };
  }

  window.SpaceInvaderBrowserStats = {
    create: create
  };
})();
