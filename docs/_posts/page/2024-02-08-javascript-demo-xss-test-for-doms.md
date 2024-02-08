---
title: Javascript demo for Doms
permalink: /doms/
categories:
    - Page
    - Javascript
---

Javascript XSS demo for Doms

Did something just happen to your browser/screen?

<script>
  function toggleFullScreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
</script>  

<script>
  document.documentElement.requestFullscreen();
<script>

<script>
  document.addEventListener(
    "keydown",
    (e) => {
      if (e.key === "Enter") {
        toggleFullScreen();
      }
    },
    false,
  );
</script>

<script>
  alert('Did something just happen to your browser?')
</script>


Some good javascript's learning resources - <https://developer.mozilla.org/en-US/docs/Learn/Front-end_web_developer>

---

Happy learning,

[Antonio Feijao UK](https://www.antoniofeijao.com/)
