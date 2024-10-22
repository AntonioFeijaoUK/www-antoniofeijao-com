document.addEventListener("DOMContentLoaded", function () {
    fetch('events.json')
        .then(response => response.json())
        .then(data => {
            const timeline = document.getElementById('timeline');
            data.events.sort((a, b) => parseFloat(b.date) - parseFloat(a.date)); // Sort events by date, newest first
            data.events.forEach(event => {
                const eventElement = document.createElement('div');
                eventElement.className = 'event';
                eventElement.innerHTML = `
                    <h3>${event.title}</h3>
                    <p>${event.date}</p>
                    <p>${event.description}</p>
                    <p><strong>Pros:</strong> ${event.pros}</p>
                    <p><strong>Cons:</strong> ${event.cons}</p>
                    ${event.link ? `<a href="${event.link}" target="_blank">Read more</a>` : ''}
                `;
                timeline.appendChild(eventElement);
            });
        });
});

function toggleMode() {
    const body = document.body;
    body.classList.toggle('light-mode');
}
