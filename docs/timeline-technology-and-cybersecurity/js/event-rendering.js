// Function to parse dates, handling BC dates correctly
function parseDate(dateStr) {
    if (dateStr.includes('BC')) {
        let year = parseInt(dateStr.replace(' BC', ''), 10);
        return new Date(Date.UTC(-year, 0, 1));
    } else {
        return new Date(dateStr);
    }
}

// Function to format dates for display
function formatDate(dateStr) {
    if (dateStr.includes('BC')) {
        let year = dateStr.replace(' BC', '');
        return `${Number(year).toLocaleString()} BC`;
    } else {
        return new Date(dateStr).toLocaleDateString();
    }
}

function createCollapsibleSection(year, events) {
    const section = document.createElement('div');
    section.className = 'year-section';

    const header = document.createElement('div');
    header.className = 'year-header';
    header.innerText = year;
    header.addEventListener('click', () => {
        content.classList.toggle('collapsed');
        content.classList.toggle('expanded');
    });

    const content = document.createElement('div');
    content.className = 'year-content expanded'; // All sections are expanded by default

    events.forEach(event => {
        const eventElement = document.createElement('div');
        eventElement.className = 'event';

        const title = document.createElement('div');
        title.className = 'event-title';
        title.innerText = event.title;

        const description = document.createElement('div');
        description.className = 'event-description';
        description.innerText = event.description;

        const date = document.createElement('div');
        date.className = 'event-date';
        date.innerText = `Date: ${formatDate(event.date)}`;

        const duration = document.createElement('div');
        duration.className = 'event-duration';
        duration.innerText = `Duration: ${event.duration}`;

        const imageContainer = document.createElement('div');
        imageContainer.className = 'event-image-container';

        // Extract the filename from the event.image
        const imageFilename = event.image.split('/').pop();

        const thumbnail = document.createElement('img');
        thumbnail.className = 'event-thumbnail';
        thumbnail.src = `/images-thumbnails/${imageFilename}`;
        thumbnail.alt = event.title;

        // Add click event listener for expanding the image
        thumbnail.addEventListener('click', () => {
            showModal(imageFilename, event.title);
        });

        imageContainer.appendChild(thumbnail);
        eventElement.appendChild(title);
        eventElement.appendChild(description);
        eventElement.appendChild(date);
        eventElement.appendChild(duration);
        eventElement.appendChild(imageContainer);

        content.appendChild(eventElement);
    });

    section.appendChild(header);
    section.appendChild(content);
    document.getElementById('events').appendChild(section);
}

// Function to show the modal with the full-resolution image
function showModal(imageFilename, imageAlt) {
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    modalImage.src = `/images/${imageFilename}`;
    modalImage.alt = imageAlt;
    modal.style.display = 'block';
}

// Function to hide the modal
function closeModal() {
    const modal = document.getElementById('imageModal');
    modal.style.display = 'none';
    const modalImage = document.getElementById('modalImage');
    modalImage.src = ''; // Clear the src to unload the image
}

