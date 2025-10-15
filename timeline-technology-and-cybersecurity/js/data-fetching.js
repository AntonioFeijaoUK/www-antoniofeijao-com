async function fetchJsonData(url) {
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Cache-Control': 'no-cache'
            }
        });
        if (!response.ok) {
            console.error(`Error fetching ${url}: ${response.statusText}`);
            return { events: [] };
        }
        return await response.json();
    } catch (error) {
        console.error(`Error fetching ${url}:`, error);
        return { events: [] }; // Return an empty structure on error
    }
}

async function fetchAndMergeEvents(eventFiles) {
    let allEvents = [];
    for (let file of eventFiles) {
        let data = await fetchJsonData(file);
        allEvents = allEvents.concat(data.events);
    }
    return allEvents;
}

