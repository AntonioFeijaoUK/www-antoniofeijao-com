document.addEventListener("DOMContentLoaded", function () {
    fetch('events.json')
        .then(response => response.json())
        .then(data => {
            const timeline = document.getElementById('timeline');
            data.events.forEach((event, index) => {
                const eventElement = document.createElement('div');
                eventElement.className = `event ${index % 2 === 0 ? 'left' : 'right'}`;
                eventElement.innerHTML = `
                    <h3>${event.title}</h3>
                    <p>${event.date}</p>
                    <p>${event.description}</p>
                    ${event.link ? `<a href="${event.link}" target="_blank">Read more</a>` : ''}
                `;
                timeline.appendChild(eventElement);
            });
        });
});
