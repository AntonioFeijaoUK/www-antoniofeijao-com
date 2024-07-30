document.addEventListener("DOMContentLoaded", function () {
    const eventsContainer = document.getElementById('events');
    const eventFiles = [
        'event-1969.json',
        'event-1971.json',
        'event-1977.json',
        'event-1984.json',
        'event-1986.json',
        'event-1987.json',
        'event-1988.json',
        'event-1989.json',
        'event-1991.json',
        'event-1992.json',
        'event-1994.json',
        'event-1995.json',
        'event-1998.json',
        'event-2000.json',
        'event-2001.json',
        'event-2003.json',
        'event-2004.json',
        'event-2005.json',
        'event-2006.json',
        'event-2007.json',
        'event-2008.json',
        'event-2009.json',
        'event-2010.json',
        'event-2012.json',
        'event-2013.json',
        'event-2014.json',
        'event-2015.json',
        'event-2016.json',
        'event-2017.json',
        'event-2018.json',
        'event-2020.json',
        'event-2021.json',
        'event-2022.json',
        'event-2023.json',
        'event-2024.json',
        'event-ancient.json',
        'nasa-space-events.json'
    ];

    // Function to fetch JSON data with cache disabled
    const fetchJsonData = (url) => {
        return fetch(url, {
            method: 'GET',
            headers: {
                'Cache-Control': 'no-cache'
            }
        })
        .then(response => {
            if (!response.ok) {
                console.error(`Error fetching ${url}: ${response.statusText}`);
                return { events: [] };
            }
            return response.json();
        })
        .catch(error => {
            console.error(`Error fetching ${url}:`, error);
            return { events: [] }; // Return an empty structure on error
        });
    };

    // Function to merge events from multiple sources
    const fetchAndMergeEvents = async () => {
        let allEvents = [];

        for (let file of eventFiles) {
            let data = await fetchJsonData(file);
            allEvents = allEvents.concat(data.events);
        }

        return allEvents;
    };

    // Function to parse dates, handling BC dates correctly
    const parseDate = (dateStr) => {
        if (dateStr.includes('BC')) {
            let year = parseInt(dateStr.replace(' BC', ''), 10);
            return new Date(Date.UTC(-year, 0, 1));
        } else {
            return new Date(dateStr);
        }
    };

    // Fetch and render events
    fetchAndMergeEvents().then(events => {
        // Sort events by date in descending order
        events.sort((a, b) => {
            const dateA = parseDate(a.date);
            const dateB = parseDate(b.date);
            return dateB - dateA;
        });

        // Group events by year
        const eventsByYear = events.reduce((acc, event) => {
            const year = event.date.includes('BC') ? `-${event.date.split(' ')[0]}` : new Date(event.date).getFullYear();
            if (!acc[year]) {
                acc[year] = [];
            }
            acc[year].push(event);
            return acc;
        }, {});

        // Render events grouped by year
        const years = Object.keys(eventsByYear).sort((a, b) => parseInt(b) - parseInt(a));
        years.forEach((year) => {
            createCollapsibleSection(year, eventsByYear[year]);
        });

        // Add toggle button for collapsing and expanding all sections
        const toggleButton = document.createElement('button');
        toggleButton.innerText = 'Collapse All';

        toggleButton.addEventListener('click', () => {
            const contents = document.querySelectorAll('.year-content');
            const isCollapseAll = toggleButton.innerText === 'Collapse All';
            contents.forEach(content => content.classList.toggle('collapsed', isCollapseAll));
            toggleButton.innerText = isCollapseAll ? 'Expand All' : 'Collapse All';
        });

        eventsContainer.insertBefore(toggleButton, eventsContainer.firstChild);
    }).catch(error => {
        console.error('Error in fetchAndMergeEvents:', error);
    });
});

function createCollapsibleSection(year, events) {
    const section = document.createElement('div');
    section.className = 'year-section';

    const header = document.createElement('div');
    header.className = 'year-header';
    header.innerText = year;
    header.addEventListener('click', () => {
        content.classList.toggle('collapsed');
    });

    const content = document.createElement('div');
    content.className = 'year-content'; // All sections are expanded by default

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
        date.innerText = `Date: ${event.date}`;

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

