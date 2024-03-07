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
    //toggleFullScreen();
    
    // inspired by https://jsfiddle.net/7P8Rr/
    x = event.clientX;
    y = event.clientY;
    
    cursor="Your Mouse Position Is : " + x + " and " + y ;
    
    console.log(cursor);
};


addEventListener("mouseup", (event) => { });
onmouseup = (event) => {
    alert('Why are you clicking your mouse?');
};


// defines the "image" variable
const image = document.getElementById("image");

// mouse moves into the image
image.addEventListener("mouseover", (event) => {
        // highlight the mouseover target
        //event.target.style.color = "orange";
        //alert('Move you mouse away!\nWe do not want to wake up the cat!');

        var x = document.getElementById("cat_alert");
        x.style.display = "inline";
        x.style.color = "orange";
        
        if (x.style.display == "none") {
            x.style.display = "block";
            x.style.color = "orange";
        } else {
            setTimeout(() => {
                console.log('x.style.display = "none"; \\ line 81"')
            }, 2000);
        }
    },
    false,
);

// mouse moves away from images
image.addEventListener( "mouseout", (event) => {
        // highlight the mouseover target
        //event.target.style.color = "orange";
        //alert('Move you mouse away!\nWe do not want to wake up the cat!');

        var x = document.getElementById("cat_alert");
        x.style.display = "hidden";
        x.style.color = "transparent";
        
        if (x.style.display == "block") {
            x.style.display = "none";
            x.style.color = "green";
        } else {
            setTimeout(() => {
                console.log('x.style.display = "none"; \\ line 102"')
            }, 2000);
        }
    },
    false,
);

