document.addEventListener("DOMContentLoaded", function () {
    const eventsContainer = document.getElementById('events');

    const eventFiles = [
        'events/event-1969.json',
        'events/event-1971.json',
        'events/event-1977.json',
        'events/event-1984.json',
        'events/event-1986.json',
        'events/event-1987.json',
        'events/event-1988.json',
        'events/event-1989.json',
        'events/event-1991.json',
        'events/event-1992.json',
        'events/event-1994.json',
        'events/event-1995.json',
        'events/event-1998.json',
        'events/event-2000.json',
        'events/event-2001.json',
        'events/event-2003.json',
        'events/event-2004.json',
        'events/event-2005.json',
        'events/event-2006.json',
        'events/event-2007.json',
        'events/event-2008.json',
        'events/event-2009.json',
        'events/event-2010.json',
        'events/event-2012.json',
        'events/event-2013.json',
        'events/event-2014.json',
        'events/event-2015.json',
        'events/event-2016.json',
        'events/event-2017.json',
        'events/event-2018.json',
        'events/event-2020.json',
        'events/event-2021.json',
        'events/event-2022.json',
        'events/event-2023.json',
        'events/event-2024.json',
        'events/event-ancient.json',
        'events/event-nasa-space.json'
    ];

    // Fetch and render events
    fetchAndMergeEvents(eventFiles).then(events => {
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
            contents.forEach(content => {
                content.classList.toggle('collapsed', isCollapseAll);
                content.classList.toggle('expanded', !isCollapseAll);
            });
            toggleButton.innerText = isCollapseAll ? 'Expand All' : 'Collapse All';
        });

        eventsContainer.insertBefore(toggleButton, eventsContainer.firstChild);
    }).catch(error => {
        console.error('Error in fetchAndMergeEvents:', error);
    });
});

