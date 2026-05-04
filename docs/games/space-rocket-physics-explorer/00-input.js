(function () {
  function create(options) {
    var keys = {};
    var onPause = options.onPause;
    var onStart = options.onStart;
    var touchLeftButton = document.getElementById("lunar-touch-left");
    var touchUpButton = document.getElementById("lunar-touch-up");
    var touchDownButton = document.getElementById("lunar-touch-down");
    var touchRightButton = document.getElementById("lunar-touch-right");
    var controlKeys = ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Left", "Right", "Up", "Down", " ", "Spacebar"];

    function normaliseKey(event) {
      if (event.key === " " || event.key === "Spacebar") {
        return "ArrowUp";
      }

      if (event.key === "Left") {
        return "ArrowLeft";
      }

      if (event.key === "Right") {
        return "ArrowRight";
      }

      if (event.key === "Up") {
        return "ArrowUp";
      }

      if (event.key === "Down") {
        return "ArrowDown";
      }

      return event.key;
    }

    function bindTouch(button, keyName) {
      if (!button) {
        return;
      }

      function start(event) {
        event.preventDefault();
        keys[keyName] = true;
      }

      function stop(event) {
        event.preventDefault();
        keys[keyName] = false;
      }

      button.addEventListener("pointerdown", start);
      button.addEventListener("pointerup", stop);
      button.addEventListener("pointercancel", stop);
      button.addEventListener("pointerleave", stop);
    }

    window.addEventListener("keydown", function (event) {
      var key = normaliseKey(event);

      if (controlKeys.indexOf(event.key) !== -1 || controlKeys.indexOf(key) !== -1) {
        event.preventDefault();
      }

      if (key === "p" || key === "P") {
        onPause();
      } else if (key === "Enter") {
        onStart();
      } else {
        keys[key] = true;
      }
    }, true);

    window.addEventListener("keyup", function (event) {
      var key = normaliseKey(event);

      if (controlKeys.indexOf(event.key) !== -1 || controlKeys.indexOf(key) !== -1) {
        event.preventDefault();
      }

      keys[key] = false;
    }, true);

    bindTouch(touchLeftButton, "ArrowLeft");
    bindTouch(touchUpButton, "ArrowUp");
    bindTouch(touchDownButton, "ArrowDown");
    bindTouch(touchRightButton, "ArrowRight");

    function reset() {
      Object.keys(keys).forEach(function (key) {
        keys[key] = false;
      });
    }

    return {
      keys: keys,
      reset: reset
    };
  }

  window.SpaceRocketPhysicsInput = {
    create: create
  };
})();
