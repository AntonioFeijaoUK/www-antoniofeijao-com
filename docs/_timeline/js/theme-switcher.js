document.addEventListener("DOMContentLoaded", function () {
    const themeSwitcher = document.createElement('button');
    themeSwitcher.className = 'theme-switch-button';
    themeSwitcher.innerText = 'Light Mode';

    themeSwitcher.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const isDarkMode = document.body.classList.contains('dark-mode');
        themeSwitcher.innerText = isDarkMode ? 'Light Mode' : 'Dark Mode';
        updateEventStyles(isDarkMode);
    });

    document.getElementById('nav-buttons').appendChild(themeSwitcher);

    // Initial check
    const isDarkMode = document.body.classList.contains('dark-mode');
    updateEventStyles(isDarkMode);
});

function updateEventStyles(isDarkMode) {
    const events = document.querySelectorAll('.event');
    const dates = document.querySelectorAll('.event-date');
    const durations = document.querySelectorAll('.event-duration');

    events.forEach(event => {
        event.style.backgroundColor = isDarkMode ? '#333' : '#fff';
        event.style.color = isDarkMode ? '#fff' : '#000';
    });

    dates.forEach(date => {
        date.style.color = isDarkMode ? '#bbb' : '#666';
    });

    durations.forEach(duration => {
        duration.style.color = isDarkMode ? '#bbb' : '#666';
    });
}

