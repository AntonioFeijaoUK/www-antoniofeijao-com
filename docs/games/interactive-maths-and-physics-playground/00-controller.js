(function () {
  var canvas = document.getElementById("playground-canvas");
  var status = document.getElementById("playground-status");
  var inputs = {
    angleA: document.getElementById("angle-a"),
    angleB: document.getElementById("angle-b"),
    rightMode: document.getElementById("right-triangle-mode")
  };
  var displays = {
    angleA: document.getElementById("angle-a-value"),
    angleB: document.getElementById("angle-b-value"),
    angleC: document.getElementById("angle-c-value"),
    formula: document.getElementById("angle-formula"),
    pythagorean: document.getElementById("pythagorean-formula"),
    sideLengths: document.getElementById("side-lengths")
  };

  if (!canvas || !canvas.getContext || !window.InteractiveMathsPhysicsAngles) {
    if (status) {
      status.textContent = "This browser cannot start the playground module.";
    }
    return;
  }

  window.InteractiveMathsPhysicsAngles.create({
    canvas: canvas,
    context: canvas.getContext("2d"),
    displays: displays,
    inputs: inputs,
    status: status
  }).start();
})();
