// main.js

document.addEventListener("DOMContentLoaded", function () {
    setupInitialFilters();
});

// Function to set up filters with default values (no filter)
function setupInitialFilters() {
    const yearFilter = document.getElementById('year-filter');
    const categoryFilter = document.getElementById('category-filter');
    const audienceFilter = document.getElementById('audience-filter');

    // Ensure all filters start with "All" as default
    yearFilter.value = 'all';
    categoryFilter.value = 'all';
    audienceFilter.value = 'all';
}

// Function to populate filter options based on event data
function populateFilterOptions(events) {
    const years = new Set();
    const categories = new Set();
    const audiences = new Set();

    events.forEach(event => {
        const year = event.date.includes('BC') ? `-${event.date.split(' ')[0]}` : new Date(event.date).getFullYear().toString();
        years.add(year);
        (event.categories || []).forEach(category => categories.add(category));
        (event.target_audience || []).forEach(audience => audiences.add(audience));
    });

    // Populate options ensuring "All" is the default
    populateSelectOptions('year-filter', Array.from(years).sort((a, b) => parseInt(b) - parseInt(a)));
    populateSelectOptions('category-filter', Array.from(categories).sort());
    populateSelectOptions('audience-filter', Array.from(audiences).sort());
}

// Helper function to populate options for a select element
function populateSelectOptions(selectId, options) {
    const selectElement = document.getElementById(selectId);
    selectElement.innerHTML = ''; // Clear previous options

    // Add "All" as the default option
    const defaultOption = document.createElement('option');
    defaultOption.value = 'all';
    defaultOption.innerText = 'All';
    selectElement.appendChild(defaultOption);

    options.forEach(option => {
        const opt = document.createElement('option');
        opt.value = option;
        opt.innerText = option;
        selectElement.appendChild(opt);
    });
}
