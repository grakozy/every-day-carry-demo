// Activity to items mapping
const activityItems = {
    gym: ['gym clothes', 'water bottle', 'headphones', 'towel', 'locker lock'],
    office: ['laptop', 'notebook', 'pen', 'water bottle', 'lunch', 'phone charger'],
    hiking: ['hiking boots', 'backpack', 'water bottle', 'snacks', 'first aid kit', 'map', 'sunscreen'],
    travel: ['passport', 'wallet', 'phone charger', 'headphones', 'travel adapter', 'snacks', 'book'],
    beach: ['swimsuit', 'towel', 'sunscreen', 'sunglasses', 'water bottle', 'snacks', 'beach bag'],
    camping: ['tent', 'sleeping bag', 'flashlight', 'matches', 'first aid kit', 'water bottle', 'food'],
    running: ['running shoes', 'water bottle', 'headphones', 'fitness tracker', 'sports watch'],
    shopping: ['wallet', 'shopping bags', 'shopping list', 'phone'],
    coffee: ['wallet', 'phone', 'laptop', 'notebook'],
    meeting: ['notebook', 'pen', 'laptop', 'phone', 'business cards']
};

// Normalize activity input (lowercase, trim)
function normalizeActivity(activity) {
    return activity.toLowerCase().trim();
}

// Get suggestions for an activity
function getSuggestions(activity) {
    const normalized = normalizeActivity(activity);
    
    // Direct match
    if (activityItems[normalized]) {
        return activityItems[normalized];
    }
    
    // Partial match (check if activity contains any key)
    for (const key in activityItems) {
        if (normalized.includes(key) || key.includes(normalized)) {
            return activityItems[key];
        }
    }
    
    // Default suggestions if no match
    return ['wallet', 'phone', 'keys', 'water bottle'];
}

// Display suggestions
function displaySuggestions(items) {
    const suggestionsDiv = document.getElementById('suggestions');
    const itemsList = document.getElementById('itemsList');
    
    // Clear previous items
    itemsList.innerHTML = '';
    
    // Add new items
    items.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        itemsList.appendChild(li);
    });
    
    // Show suggestions
    suggestionsDiv.classList.remove('hidden');
}

// Handle form submission
document.getElementById('activityForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const activityInput = document.getElementById('activityInput');
    const activity = activityInput.value;
    
    if (activity.trim() === '') {
        alert('Please enter an activity');
        return;
    }
    
    const suggestions = getSuggestions(activity);
    displaySuggestions(suggestions);
});

