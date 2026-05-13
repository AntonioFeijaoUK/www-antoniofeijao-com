(function () {
  var zoomableImages = Array.prototype.slice.call(
    document.querySelectorAll('.article-image-card[data-zoomable="true"] img')
  );

  if (!zoomableImages.length || typeof HTMLDialogElement === "undefined") {
    return;
  }

  var dialog = document.createElement("dialog");
  var content = document.createElement("div");
  var closeButton = document.createElement("button");
  var zoomedImage = document.createElement("img");
  var caption = document.createElement("p");

  dialog.className = "image-zoom-dialog";
  content.className = "image-zoom-content";
  closeButton.className = "image-zoom-close";
  closeButton.type = "button";
  closeButton.setAttribute("aria-label", "Close image zoom");
  closeButton.textContent = "×";
  caption.className = "image-zoom-caption";

  content.appendChild(closeButton);
  content.appendChild(zoomedImage);
  content.appendChild(caption);
  dialog.appendChild(content);
  document.body.appendChild(dialog);

  function openZoom(image) {
    var figure = image.closest("figure");
    var figureCaption = figure ? figure.querySelector("figcaption") : null;

    zoomedImage.src = image.currentSrc || image.src;
    zoomedImage.alt = image.alt || "";
    caption.textContent = figureCaption ? figureCaption.textContent.trim() : "";
    caption.hidden = !caption.textContent;

    dialog.showModal();
    closeButton.focus();
  }

  function closeZoom() {
    if (dialog.open) {
      dialog.close();
    }
  }

  zoomableImages.forEach(function (image) {
    image.tabIndex = 0;
    image.setAttribute("role", "button");
    image.setAttribute("aria-label", "Open image zoom");

    image.addEventListener("click", function () {
      openZoom(image);
    });

    image.addEventListener("keydown", function (event) {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openZoom(image);
      }
    });
  });

  closeButton.addEventListener("click", closeZoom);

  dialog.addEventListener("click", function (event) {
    if (event.target === dialog) {
      closeZoom();
    }
  });
})();
