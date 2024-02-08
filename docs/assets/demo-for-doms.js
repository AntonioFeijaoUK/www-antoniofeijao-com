function toggleFullScreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else if (document.exitFullscreen) {
    document.exitFullscreen();
  }
}

window.document.documentElement.requestFullscreen();

document.addEventListener(
  "keydown",
  (e) => {
    if (e.key === "Enter") {
      toggleFullScreen();
    }
  },
  false,
);

alert('Did something just happen to your browser? \n\nTry the ENTER key to jump in and out of full-screen :)\n')
