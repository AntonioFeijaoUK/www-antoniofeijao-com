function toggleFullScreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else if (document.exitFullscreen) {
        document.exitFullscreen();
    }
}

document.addEventListener(
    "keydown",
    (e) => {
        if (e.key === "Enter") {
            toggleFullScreen();
        }
    },
    false,
);


// // code source https://github.com/evg-zhabotinsky/RandomStuff/blob/gh-pages/webexperiments/fullscreen/w3s.html
// // note, page needs a div with id='main_frame'
// function goFullscreen() {
//   // Must be called as a result of user interaction to work
//   mf = document.getElementById("main_frame");
//   mf.webkitRequestFullscreen();
//   mf.style.display = "";
// }

// function fullscreenChanged() {
//   if (document.webkitFullscreenElement == null) {
//     mf = document.getElementById("main_frame");
//     mf.style.display = "none";
//   }
// }

// document.onwebkitfullscreenchange = fullscreenChanged;
// document.documentElement.onclick = goFullscreen;
// document.onkeydown = goFullscreen;
// document.onmousemove = goFullscreen;


// source code https://developer.mozilla.org/en-US/docs/Web/API/Element/mousemove_event
addEventListener("mousemove", (event) => { });
onmousemove = (event) => {
    toggleFullScreen();
};


addEventListener("mouseup", (event) => { });
onmouseup = (event) => {
    alert('You clicked on your mouse!);
};


const image = document.getElementById("image");

image.addEventListener(
    "mouseover",
    (event) => {
        // highlight the mouseover target
        //event.target.style.color = "orange";
        alert('Move you mouse away!\nWe do not want to wake up the cat!');

        // reset the color after a short delay
        //setTimeout(() => {
        //  event.target.style.color = "";
        //}, 500);
    },
    false,
);
