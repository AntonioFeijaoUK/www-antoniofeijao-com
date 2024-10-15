// search.js

document.addEventListener("DOMContentLoaded", function () {
    const searchBox = document.getElementById('search-box');
    const originalEvents = [];

    // Add loading spinner and search message elements
    const searchFeedback = document.createElement('div');
    searchFeedback.id = 'search-feedback';
    searchFeedback.innerText = 'Enter at least 3 characters to search.';
    searchFeedback.style.display = 'none';
    document.getElementById('filter-section').appendChild(searchFeedback);

    const loadingIndicator = document.createElement('div');
    loadingIndicator.id = 'loading-indicator';
    loadingIndicator.style.display = 'none';
    loadingIndicator.innerHTML = '<div class="spinner"></div>';
    document.body.appendChild(loadingIndicator);

    function showLoadingIndicator(show) {
        loadingIndicator.style.display = show ? 'block' : 'none';
    }

    let searchTimeout;
    searchBox.addEventListener('input', () => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            const searchTerm = searchBox.value.trim();
            if (searchTerm.length >= 3) {
                searchFeedback.style.display = 'none';
                showLoadingIndicator(true);
                filterAndRenderEvents(originalEvents, searchTerm);
                showLoadingIndicator(false);
            } else {
                searchFeedback.style.display = searchTerm.length === 0 ? 'none' : 'block';
                filterAndRenderEvents(originalEvents, ''); // Render all events when search term is cleared
            }
        }, 300);
    });

    // Fetch events and initialize
    fetchAndMergeEvents([
        'events/event-1900-1999.json',
        'events/event-2000-2009.json',
        'events/event-2010-2019.json',
        'events/event-2020.json',
        'events/event-2021.json',
        'events/event-2022.json',
        'events/event-2023.json',
        'events/event-2024.json',
        'events/event-ancient.json',
        'events/event-nasa-space.json',
        'events/event-ww1-ww2-cold-war.json'
    ]).then(events => {
        originalEvents.push(...events);

        // Populate filter options
        populateFilterOptions(events);

        // Render all events initially
        filterAndRenderEvents(events, '');

        // Attach filter event listeners
        document.getElementById('year-filter').addEventListener('change', () => filterAndRenderEvents(originalEvents));
        document.getElementById('category-filter').addEventListener('change', () => filterAndRenderEvents(originalEvents));
        document.getElementById('audience-filter').addEventListener('change', () => filterAndRenderEvents(originalEvents));

    }).catch(error => {
        console.error('Error in fetchAndMergeEvents:', error);
    });
});

function filterAndRenderEvents(events, searchTerm = '') {
    const yearFilter = document.getElementById('year-filter').value;
    const categoryFilter = document.getElementById('category-filter').value.toLowerCase();
    const audienceFilter = document.getElementById('audience-filter').value.toLowerCase();
    searchTerm = searchTerm.toLowerCase();

    const filteredEvents = events.filter(event => {
        const eventYear = event.date.includes('BC') ? `-${event.date.split(' ')[0]}` : new Date(event.date).getFullYear().toString();
        const eventCategories = (event.categories || []).map(c => c.toLowerCase());
        const eventAudience = (event.target_audience || []).map(a => a.toLowerCase());

        const yearMatch = yearFilter === 'all' || eventYear === yearFilter;
        const categoryMatch = categoryFilter === 'all' || eventCategories.includes(categoryFilter);
        const audienceMatch = audienceFilter === 'all' || eventAudience.includes(audienceFilter);
        const searchMatch = searchTerm.length < 3 || (
            event.title.toLowerCase().includes(searchTerm) ||
            event.description.toLowerCase().includes(searchTerm) ||
            (event.detailed_description || '').toLowerCase().includes(searchTerm)
        );

        return yearMatch && categoryMatch && audienceMatch && searchMatch;
    });

    document.getElementById('events').innerHTML = '';
    renderFilteredEvents(filteredEvents);
}
