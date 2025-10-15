const balloon = document.getElementById('balloon');
const codeBox1 = document.getElementById('codeBox1');
const codeBox2 = document.getElementById('codeBox2');
const pasteName = document.getElementById('pasteName');

let lastClipboardContent = ""; // To track changes in clipboard content

// Store and retrieve user name in cookies
function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = `expires=${date.toUTCString()}`;
    document.cookie = `${name}=${value};${expires};path=/`;
}

function getCookie(name) {
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookies = decodedCookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i].trim();
        if (cookie.indexOf(name + "=") == 0) {
            return cookie.substring((name.length + 1), cookie.length);
        }
    }
    return "";
}

async function updateUserInfo() {
    const browserInfo = `Browser: ${navigator.userAgent}`;
    const screenInfo = `Screen Resolution: ${screen.width}x${screen.height}`;
    
    // Fetch public IP using ipinfo.io with request headers
    const ipInfo = await fetch('https://ipinfo.io/json', {
        headers: {
            'Accept': 'application/json',
            'User-Agent': 'Mozilla/5.0'
        }
    })
        .then(response => response.json())
        .then(data => `Public IP: ${data.ip}\nLocation: ${data.city}, ${data.region}, ${data.country}`)
        .catch(() => 'Failed to fetch IP.');

    // Get page uptime
    const uptime = `Page Uptime: ${Math.round(performance.now() / 1000)} seconds`;

    // Get stored name from cookies
    const storedName = getCookie('userName') ? `Stored Name: ${getCookie('userName')}` : 'No name stored';

    // Display all details in the second code box
    codeBox2.textContent = `${browserInfo}\n${screenInfo}\n${ipInfo}\n${uptime}\n${storedName}`;
}

async function updateClipboardContent() {
    try {
        const text = await navigator.clipboard.readText();
        if (text !== lastClipboardContent) {
            lastClipboardContent = text;
            codeBox1.textContent = text; // Display clipboard content
        }
    } catch (err) {
        console.error('Failed to read clipboard: ', err);
    }
}

// Update clipboard content and user info every 2 seconds
setInterval(() => {
    updateClipboardContent();
    updateUserInfo();
}, 2000);

balloon.addEventListener('click', () => {
    balloon.style.display = 'none'; // Hide the balloon
    codeBox1.style.display = 'block'; // Show the clipboard code box
    updateClipboardContent(); // Initial clipboard content fetch
});
