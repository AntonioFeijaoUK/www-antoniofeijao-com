(function () {
  function create(options) {
    var canvas = options.canvas;
    var context = options.context;
    var displays = options.displays;
    var inputs = options.inputs;
    var status = options.status;
    var state = {
      angleA: 55,
      angleB: 65,
      angleC: 60,
      rightMode: false
    };

    function toRadians(degrees) {
      return degrees * Math.PI / 180;
    }

    function clamp(value, minimum, maximum) {
      return Math.max(minimum, Math.min(maximum, value));
    }

    function getClassification() {
      if (state.angleA === 90 || state.angleB === 90 || state.angleC === 90) {
        return "right triangle";
      }

      if (state.angleA > 90 || state.angleB > 90 || state.angleC > 90) {
        return "obtuse triangle";
      }

      return "acute triangle";
    }

    function getSideLengths() {
      var baseAB = 10;
      var sineC = Math.sin(toRadians(state.angleC));
      var ratio = baseAB / sineC;

      return {
        ab: baseAB,
        ac: Math.sin(toRadians(state.angleB)) * ratio,
        bc: Math.sin(toRadians(state.angleA)) * ratio
      };
    }

    function formatLength(value) {
      return value.toFixed(2);
    }

    function updateFromInputs(changedInput) {
      var angleA = parseInt(inputs.angleA.value, 10);
      var angleB = parseInt(inputs.angleB.value, 10);
      var angleC = parseInt(inputs.angleC.value, 10);
      var remainingAngles;
      var previousABTotal;

      state.rightMode = Boolean(inputs.rightMode && inputs.rightMode.checked);

      if (state.rightMode) {
        angleA = 90;
        if (changedInput === inputs.angleC) {
          angleC = clamp(angleC, 15, 75);
          angleB = 90 - angleC;
        } else {
          angleB = clamp(angleB, 15, 75);
          angleC = 90 - angleB;
        }
        inputs.angleA.max = "90";
        inputs.angleB.max = "75";
        inputs.angleC.max = "75";
        inputs.angleA.disabled = true;
        inputs.angleB.disabled = false;
        inputs.angleC.disabled = false;
        inputs.angleA.value = angleA;
        inputs.angleB.value = angleB;
        inputs.angleC.value = angleC;
      } else {
        inputs.angleA.max = "145";
        inputs.angleB.max = "145";
        inputs.angleC.max = "145";
        inputs.angleA.disabled = false;
        inputs.angleB.disabled = false;
        inputs.angleC.disabled = false;
      }

      if (!state.rightMode && changedInput === inputs.angleC) {
        angleC = clamp(angleC, 15, 145);
        remainingAngles = 180 - angleC;
        previousABTotal = Math.max(1, state.angleA + state.angleB);
        angleA = Math.round(remainingAngles * state.angleA / previousABTotal);
        angleA = clamp(angleA, 15, remainingAngles - 15);
        angleB = remainingAngles - angleA;
        inputs.angleA.value = angleA;
        inputs.angleB.value = angleB;
        inputs.angleC.value = angleC;
      } else if (!state.rightMode && angleA + angleB > 165) {
        if (changedInput === inputs.angleA) {
          angleB = 165 - angleA;
          inputs.angleB.value = angleB;
        } else {
          angleA = 165 - angleB;
          inputs.angleA.value = angleA;
        }
      }

      state.angleA = clamp(angleA, 15, 145);
      state.angleB = clamp(angleB, 15, 145);
      state.angleC = state.rightMode ? angleC : 180 - state.angleA - state.angleB;
      inputs.angleA.value = state.angleA;
      inputs.angleB.value = state.angleB;
      inputs.angleC.value = state.angleC;
      updateDisplays();
      draw();
    }

    function updateDisplays() {
      var classification = getClassification();
      var article = classification === "right triangle" ? "a" : "an";
      var sides = getSideLengths();
      var legABSquared = sides.ab * sides.ab;
      var legACSquared = sides.ac * sides.ac;
      var hypotenuseSquared = sides.bc * sides.bc;

      displays.angleA.textContent = state.angleA + " degrees";
      displays.angleB.textContent = state.angleB + " degrees";
      displays.angleC.textContent = state.angleC + " degrees";
      displays.angleCSlider.textContent = state.angleC + " degrees";
      displays.formula.textContent = state.angleA + " + " + state.angleB + " + " + state.angleC + " = 180 degrees";
      displays.sideLengths.textContent =
        "AB " +
        formatLength(sides.ab) +
        " | AC " +
        formatLength(sides.ac) +
        " | BC " +
        formatLength(sides.bc);
      displays.pythagorean.textContent = state.rightMode
        ? formatLength(sides.ab) +
          " squared + " +
          formatLength(sides.ac) +
          " squared = " +
          formatLength(sides.bc) +
          " squared (" +
          formatLength(legABSquared) +
          " + " +
          formatLength(legACSquared) +
          " = " +
          formatLength(hypotenuseSquared) +
          ")"
        : "Turn on right triangle mode.";

      if (status) {
        status.textContent = "Solved angle C: " + state.angleC + " degrees. This is " + article + " " + classification + ".";
      }
    }

    function getTrianglePoints(width, height) {
      var margin = 88;
      var topAnnotationSpace = state.rightMode ? 128 : 92;
      var bottomLabelSpace = 76;
      var availableHeight = height - topAnnotationSpace - bottomLabelSpace;
      var baseLength = 1;
      var pointA = {
        x: 0,
        y: 0
      };
      var pointB = {
        x: baseLength,
        y: 0
      };
      var rayA = {
        x: Math.cos(toRadians(state.angleA)),
        y: -Math.sin(toRadians(state.angleA))
      };
      var rayB = {
        x: -Math.cos(toRadians(state.angleB)),
        y: -Math.sin(toRadians(state.angleB))
      };
      var denominator = rayA.x * rayB.y - rayA.y * rayB.x;
      var dx = pointB.x - pointA.x;
      var dy = pointB.y - pointA.y;
      var scaleA = (dx * rayB.y - dy * rayB.x) / denominator;
      var rawPoints;
      var minX;
      var maxX;
      var minY;
      var maxY;
      var rawWidth;
      var rawHeight;
      var scale;
      var offsetX;
      var offsetY;

      rawPoints = {
        a: pointA,
        b: pointB,
        c: {
          x: pointA.x + rayA.x * scaleA,
          y: pointA.y + rayA.y * scaleA
        }
      };
      minX = Math.min(rawPoints.a.x, rawPoints.b.x, rawPoints.c.x);
      maxX = Math.max(rawPoints.a.x, rawPoints.b.x, rawPoints.c.x);
      minY = Math.min(rawPoints.a.y, rawPoints.b.y, rawPoints.c.y);
      maxY = Math.max(rawPoints.a.y, rawPoints.b.y, rawPoints.c.y);
      rawWidth = Math.max(0.01, maxX - minX);
      rawHeight = Math.max(0.01, maxY - minY);
      scale = Math.min((width - margin * 2) / rawWidth, availableHeight / rawHeight);
      offsetX = (width - rawWidth * scale) / 2 - minX * scale;
      offsetY = topAnnotationSpace + (availableHeight - rawHeight * scale) / 2 - minY * scale;

      return {
        a: {
          x: rawPoints.a.x * scale + offsetX,
          y: rawPoints.a.y * scale + offsetY
        },
        b: {
          x: rawPoints.b.x * scale + offsetX,
          y: rawPoints.b.y * scale + offsetY
        },
        c: {
          x: rawPoints.c.x * scale + offsetX,
          y: rawPoints.c.y * scale + offsetY
        }
      };
    }

    function drawAngleArc(point, startAngle, endAngle, radius, colour, label, labelX, labelY, anticlockwise) {
      context.beginPath();
      context.arc(point.x, point.y, radius, startAngle, endAngle, Boolean(anticlockwise));
      context.strokeStyle = colour;
      context.lineWidth = 5;
      context.stroke();
      context.fillStyle = colour;
      context.font = "700 16px sans-serif";
      context.textAlign = "center";
      context.fillText(label, labelX, labelY);
    }

    function drawLabel(text, point, offsetX, offsetY) {
      context.fillStyle = "#0f172a";
      context.font = "700 18px sans-serif";
      context.textAlign = "center";
      context.fillText(text, point.x + offsetX, point.y + offsetY);
    }

    function drawSideLabel(text, pointOne, pointTwo, offsetX, offsetY, colour) {
      context.fillStyle = colour || "#334155";
      context.font = "700 15px sans-serif";
      context.textAlign = "center";
      context.fillText(text, (pointOne.x + pointTwo.x) / 2 + offsetX, (pointOne.y + pointTwo.y) / 2 + offsetY);
    }

    function draw() {
      var width = canvas.width;
      var height = canvas.height;
      var points = getTrianglePoints(width, height);
      var angleCStart = Math.atan2(points.a.y - points.c.y, points.a.x - points.c.x);
      var angleCEnd = Math.atan2(points.b.y - points.c.y, points.b.x - points.c.x);

      context.clearRect(0, 0, width, height);
      context.fillStyle = "#f8fafc";
      context.fillRect(0, 0, width, height);

      context.strokeStyle = "#dbeafe";
      context.lineWidth = 1;
      for (var x = 0; x < width; x += 40) {
        context.beginPath();
        context.moveTo(x, 0);
        context.lineTo(x, height);
        context.stroke();
      }
      for (var y = 0; y < height; y += 40) {
        context.beginPath();
        context.moveTo(0, y);
        context.lineTo(width, y);
        context.stroke();
      }

      context.beginPath();
      context.moveTo(points.a.x, points.a.y);
      context.lineTo(points.c.x, points.c.y);
      context.lineTo(points.b.x, points.b.y);
      context.closePath();
      context.fillStyle = "rgba(142, 224, 255, 0.24)";
      context.fill();
      context.strokeStyle = "#0f172a";
      context.lineWidth = 4;
      context.stroke();

      if (state.rightMode) {
        context.beginPath();
        context.moveTo(points.b.x, points.b.y);
        context.lineTo(points.c.x, points.c.y);
        context.strokeStyle = "#dc2626";
        context.lineWidth = 7;
        context.stroke();
        context.strokeStyle = "#0f172a";
        context.lineWidth = 3;
        context.stroke();
      }

      context.fillStyle = "#0f172a";
      [points.a, points.b, points.c].forEach(function (point) {
        context.beginPath();
        context.arc(point.x, point.y, 6, 0, Math.PI * 2);
        context.fill();
      });

      drawAngleArc(points.a, -toRadians(state.angleA), 0, 48, "#2563eb", "A = " + state.angleA + " degrees", points.a.x - 4, points.a.y + 54);
      drawAngleArc(points.b, Math.PI, Math.PI + toRadians(state.angleB), 48, "#16a34a", "B = " + state.angleB + " degrees", points.b.x + 4, points.b.y + 54);
      drawAngleArc(points.c, angleCStart, angleCEnd, 44, "#d97706", "C = " + state.angleC + " degrees", points.c.x, points.c.y - 30, true);

      drawLabel("A", points.a, -20, 28);
      drawLabel("B", points.b, 20, 28);
      drawLabel("C", points.c, 0, -18);
      drawSideLabel("AB", points.a, points.b, 0, 34, "#334155");
      drawSideLabel("AC", points.a, points.c, -28, -12, "#334155");
      drawSideLabel(state.rightMode ? "BC hypotenuse" : "BC", points.b, points.c, 28, -12, state.rightMode ? "#dc2626" : "#334155");

      context.fillStyle = "#334155";
      context.font = "16px sans-serif";
      context.textAlign = "center";
      context.fillText("Interior angle sum: A + B + C = 180 degrees", width / 2, 34);
      context.fillText("Triangle type: " + getClassification(), width / 2, 60);
      if (state.rightMode) {
        context.fillStyle = "#dc2626";
        context.font = "700 15px sans-serif";
        context.fillText("Hypotenuse: longest side, opposite the 90 degree angle", width / 2, 86);
      }
    }

    function resize() {
      var displayWidth = canvas.clientWidth || 900;
      var displayHeight = canvas.clientHeight || 560;

      canvas.width = Math.floor(displayWidth);
      canvas.height = Math.floor(displayHeight);
      draw();
    }

    function bind() {
      [inputs.angleA, inputs.angleB, inputs.angleC].forEach(function (input) {
        input.addEventListener("input", function () {
          updateFromInputs(input);
        });
      });
      if (inputs.rightMode) {
        inputs.rightMode.addEventListener("change", function () {
          updateFromInputs(inputs.rightMode);
        });
      }
      window.addEventListener("resize", resize);
    }

    function start() {
      bind();
      updateFromInputs(null);
      resize();
    }

    return {
      start: start
    };
  }

  window.InteractiveMathsPhysicsAngles = {
    create: create
  };
})();
