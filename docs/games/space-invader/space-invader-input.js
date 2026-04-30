(function () {
  function bindHoldButton(button, keyName, keys) {
    if (!button) {
      return;
    }

    function hold(event) {
      event.preventDefault();
      if (button.setPointerCapture && event.pointerId !== undefined) {
        button.setPointerCapture(event.pointerId);
      }
      keys[keyName] = true;
    }

    function release(event) {
      event.preventDefault();
      if (button.releasePointerCapture && event.pointerId !== undefined) {
        try {
          button.releasePointerCapture(event.pointerId);
        } catch (error) {
          // Pointer may already have been released by the browser.
        }
      }
      keys[keyName] = false;
      button.blur();
    }

    button.addEventListener("pointerdown", hold);
    button.addEventListener("pointerup", release);
    button.addEventListener("pointercancel", release);
    button.addEventListener("pointerleave", release);
    button.addEventListener("contextmenu", function (event) {
      event.preventDefault();
    });
  }

  function bindFireButton(button, callbacks) {
    if (!button) {
      return;
    }

    button.addEventListener("pointerdown", function (event) {
      event.preventDefault();
      if (callbacks.resumeAfterHit()) {
        button.blur();
        return;
      }

      callbacks.firePlayerBullet();
      button.blur();
    });
    button.addEventListener("contextmenu", function (event) {
      event.preventDefault();
    });
  }

  function toggleFullscreen(shell, setStatus) {
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

  function bindKeyboard(keys, callbacks) {
    window.addEventListener("keydown", function (event) {
      if (event.key === " " || event.key === "ArrowLeft" || event.key === "ArrowRight" || event.key === "Enter") {
        event.preventDefault();
      }

      if (event.key === "Enter" && (callbacks.resumeAfterHit() || callbacks.continueAfterLevelClear())) {
        return;
      }

      if (event.key === " ") {
        callbacks.firePlayerBullet();
      } else if (event.key.toLowerCase() === "p") {
        callbacks.togglePause();
      } else {
        keys[event.key] = true;
        keys[event.key.toLowerCase()] = true;
      }
    });

    window.addEventListener("keyup", function (event) {
      keys[event.key] = false;
      keys[event.key.toLowerCase()] = false;
    });
  }

  function bind(options) {
    var buttons = options.buttons;
    var callbacks = options.callbacks;

    if (buttons.pause) {
      buttons.pause.addEventListener("click", callbacks.togglePause);
    }
    if (buttons.restart) {
      buttons.restart.addEventListener("click", callbacks.restartGame);
    }
    if (buttons.fullscreen) {
      buttons.fullscreen.addEventListener("click", function () {
        toggleFullscreen(options.fullscreenShell, callbacks.setStatus);
      });
    }
    if (buttons.randomEmojis) {
      buttons.randomEmojis.addEventListener("click", callbacks.selectRandomEmojis);
    }

    bindHoldButton(buttons.touchLeft, "touchLeft", options.keys);
    bindHoldButton(buttons.touchRight, "touchRight", options.keys);
    bindFireButton(buttons.touchFire, callbacks);
    bindKeyboard(options.keys, callbacks);
  }

  window.SpaceInvaderInput = {
    bind: bind
  };
})();
