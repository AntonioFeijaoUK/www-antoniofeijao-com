// event-rendering.js

function renderFilteredEvents(events) {
    // Group events by year
    const eventsByYear = events.reduce((acc, event) => {
        const year = event.date.includes('BC') ? `-${event.date.split(' ')[0]}` : new Date(event.date).getFullYear();
        if (!acc[year]) {
            acc[year] = [];
        }
        acc[year].push(event);
        return acc;
    }, {});

    // Sort the years in descending order
    const years = Object.keys(eventsByYear).sort((a, b) => parseInt(b) - parseInt(a));

    years.forEach((year) => {
        // Sort events within each year by date (most recent first)
        eventsByYear[year].sort((a, b) => new Date(b.date) - new Date(a.date));
        createCollapsibleSection(year, eventsByYear[year]);
    });

    const toggleButton = document.createElement('button');
    toggleButton.innerText = 'Collapse All';

    toggleButton.addEventListener('click', () => {
        const contents = document.querySelectorAll('.year-content');
        const isCollapseAll = toggleButton.innerText === 'Collapse All';
        contents.forEach(content => {
            content.classList.toggle('collapsed', isCollapseAll);
            content.classList.toggle('expanded', !isCollapseAll);
        });
        toggleButton.innerText = isCollapseAll ? 'Expand All' : 'Collapse All';
    });

    document.getElementById('events').insertBefore(toggleButton, document.getElementById('events').firstChild);
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
    content.className = 'year-content expanded';

    events.forEach(event => {
        const eventElement = document.createElement('div');
        eventElement.className = 'event';

        const title = document.createElement('div');
        title.className = 'event-title';
        title.innerText = event.title;

        const description = document.createElement('div');
        description.className = 'event-description';
        description.innerText = event.description;

        const detailedDescription = document.createElement('div');
        detailedDescription.className = 'event-detailed-description';
        detailedDescription.innerText = event.detailed_description || "No detailed description available.";

        const date = document.createElement('div');
        date.className = 'event-date';
        date.innerText = `Date: ${formatDate(event.date)}`;

        const duration = document.createElement('div');
        duration.className = 'event-duration';
        duration.innerText = `Duration: ${event.duration || "N/A"}`;

        const categories = document.createElement('div');
        categories.className = 'event-categories';
        categories.innerText = `Categories: ${(event.categories || []).join(', ') || "Uncategorized"}`;

        const location = document.createElement('div');
        location.className = 'event-location';
        location.innerText = `Location: ${event.location || "Location not specified"}`;

        const eventType = document.createElement('div');
        eventType.className = 'event-type';
        eventType.innerText = `Event Type: ${event.event_type || "Type not specified"}`;

        const speakers = document.createElement('div');
        speakers.className = 'event-speakers';
        speakers.innerText = `Speakers: ${(event.speakers || []).join(', ') || "No speakers listed"}`;

        const agenda = document.createElement('div');
        agenda.className = 'event-agenda';
        const agendaTitle = document.createElement('span');
        agendaTitle.innerText = 'Agenda: ';
        agenda.appendChild(agendaTitle);
        const agendaList = document.createElement('ul');
        (event.agenda || []).forEach(item => {
            const listItem = document.createElement('li');
            listItem.innerText = `${item.time} - ${item.activity}`;
            agendaList.appendChild(listItem);
        });
        agenda.appendChild(agendaList);

        const links = document.createElement('div');
        links.className = 'event-links';

        const readMoreTitle = document.createElement('div');
        readMoreTitle.innerText = 'Read more at:';
        links.appendChild(readMoreTitle);

        const linksList = document.createElement('ul');

        (event.read_more_urls || []).forEach(url => {
            const listItem = document.createElement('li');
            const link = document.createElement('a');
            link.href = url;
            link.target = '_blank';
            link.className = 'event-link';
            link.innerText = url;
            listItem.appendChild(link);
            linksList.appendChild(listItem);
        });

        links.appendChild(linksList);

        const imageContainer = document.createElement('div');
        imageContainer.className = 'event-image-container';

        const imageFilename = event.image ? event.image.split('/').pop() : "placeholder.webp";

        const thumbnail = document.createElement('img');
        thumbnail.className = 'event-thumbnail';
        thumbnail.src = `images-thumbnails/${imageFilename}`;
        thumbnail.alt = event.title || "Event Image";

        thumbnail.addEventListener('click', () => {
            showModal(imageFilename, event.title);
        });

        imageContainer.appendChild(thumbnail);

        eventElement.appendChild(title);
        eventElement.appendChild(description);
        eventElement.appendChild(detailedDescription);
        eventElement.appendChild(date);
        eventElement.appendChild(duration);
        eventElement.appendChild(categories);
        eventElement.appendChild(location);
        eventElement.appendChild(eventType);
        eventElement.appendChild(speakers);
        eventElement.appendChild(agenda);
        eventElement.appendChild(links);
        eventElement.appendChild(imageContainer);

        content.appendChild(eventElement);
    });

    section.appendChild(header);
    section.appendChild(content);
    document.getElementById('events').appendChild(section);
}

function formatDate(dateStr) {
    if (dateStr.includes('BC')) {
        let year = dateStr.replace(' BC', '');
        return `${Number(year).toLocaleString()} BC`;
    } else {
        return new Date(dateStr).toLocaleDateString();
    }
}

function showModal(imageFilename, imageAlt) {
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    modalImage.src = `images/${imageFilename}`;
    modalImage.alt = imageAlt || "Event Image";
    modal.style.display = 'block';
}

function closeModal() {
    const modal = document.getElementById('imageModal');
    modal.style.display = 'none';
    const modalImage = document.getElementById('modalImage');
    modalImage.src = '';
}
