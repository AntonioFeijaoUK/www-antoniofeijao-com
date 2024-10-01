// Function to toggle fullscreen mode when the Enter key is pressed
function toggleFullScreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();  // Enter fullscreen mode
    } else if (document.exitFullscreen) {
        document.exitFullscreen();  // Exit fullscreen mode
    }
}

// Event listener to toggle fullscreen on Enter key press
document.addEventListener(
    "keydown",
    (e) => {
        if (e.key === "Enter") {
            toggleFullScreen();
        }
    },
    false
);

// Track mouse movement and log its position
document.addEventListener("mousemove", (event) => {
    let x = event.clientX;  // Get X position of the mouse
    let y = event.clientY;  // Get Y position of the mouse

    // Display mouse position in console
    let cursorPosition = `Your Mouse Position Is: ${x} and ${y}`;
    console.log(cursorPosition);
});

// Alert the user when they click the mouse
document.addEventListener("mouseup", () => {
    alert('Why are you clicking your mouse?');
});

// Get the image element for mouseover and mouseout events
const image = document.getElementById("image");

// Event listener for mouseover on the image
image.addEventListener("mouseover", () => {
    const catAlert = document.getElementById("cat_alert");
    // Show the alert with the message about the cat
    catAlert.style.display = "block";
    catAlert.style.color = "orange";
    
    setTimeout(() => {
        catAlert.style.display = "none";  // Hide alert after 2 seconds
        console.log('Hiding cat alert after 2 seconds');
    }, 2000);
}, false);

// Event listener for mouseout from the image
image.addEventListener("mouseout", () => {
    const catAlert = document.getElementById("cat_alert");
    // Hide the alert when mouse moves out of the image
    catAlert.style.display = "none";
    catAlert.style.color = "transparent";
}, false);

// Event listener for the copy event to modify clipboard data
document.addEventListener('copy', (event) => {
    // Modify the copied data to include a warning message
    event.clipboardData.setData('text/plain', '#this is a comment - but it could be *** COPY ALL YOUR SECRET FILES TO MY SECRET VAULTS! ***');
    event.preventDefault();  // Prevent the default copy behaviour
});
