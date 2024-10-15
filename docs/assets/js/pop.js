// Get HTML elements
const balloon = document.getElementById('balloon');
const codeBox1 = document.getElementById('codeBox1');
const codeBox2 = document.getElementById('codeBox2');
const pasteName = document.getElementById('pasteName');

// Function to fetch the clipboard content
async function updateClipboardContent() {
    try {
        const text = await navigator.clipboard.readText();
        pasteName.value = text;
        codeBox1.textContent = `Clipboard content: ${text}`;
    } catch (err) {
        codeBox1.textContent = 'Failed to read clipboard content.';
        console.error('Error:', err);
    }
}

// Function to fetch user information
async function updateUserInfo() {
    const browserInfo = `Browser: ${navigator.userAgent}`;
    const screenInfo = `Screen Resolution: ${screen.width}x${screen.height}`;
    
    // Fetch public IP using ipinfo.io
    //const ipInfo = await fetch('https://ipinfo.io/json?token=YOUR_TOKEN_HERE') // Replace with your token
    const ipInfo = await fetch('https://ipinfo.io/json')
        .then(response => response.json())
        .then(data => `Public IP: ${data.ip}\nLocation: ${data.city}, ${data.region}, ${data.country}`)
        .catch(() => 'Failed to fetch IP.');

    codeBox2.textContent = `${browserInfo}\n${screenInfo}\n${ipInfo}`;
}

// Balloon click event
balloon.addEventListener('click', async () => {
    balloon.style.display = 'none'; // Hide the balloon after clicking
    codeBox1.style.display = 'block'; // Show the clipboard code box

    // Start updating clipboard content and user info
    setInterval(updateClipboardContent, 3000); // Update clipboard content every 3 seconds
    updateUserInfo(); // Fetch user info once after balloon pop
});
