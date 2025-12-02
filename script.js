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

// Update progress counter
function updateProgress() {
    const itemsList = document.getElementById('itemsList');
    const checkboxes = itemsList.querySelectorAll('input[type="checkbox"]');
    const checkedCount = itemsList.querySelectorAll('input[type="checkbox"]:checked').length;
    const totalCount = checkboxes.length;
    const progressText = document.getElementById('progressText');
    
    progressText.textContent = `${checkedCount} / ${totalCount} items packed`;
    
    // Update progress text color when complete
    if (checkedCount === totalCount && totalCount > 0) {
        progressText.classList.add('complete');
    } else {
        progressText.classList.remove('complete');
    }
}

// Display suggestions with checkboxes
function displaySuggestions(items) {
    const suggestionsDiv = document.getElementById('suggestions');
    const itemsList = document.getElementById('itemsList');
    
    // Clear previous items
    itemsList.innerHTML = '';
    
    // Add new items with checkboxes
    items.forEach(item => {
        const li = document.createElement('li');
        li.className = 'item-row';
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = `item-${item.replace(/\s+/g, '-')}`;
        checkbox.className = 'item-checkbox';
        
        const label = document.createElement('label');
        label.htmlFor = checkbox.id;
        label.textContent = item;
        label.className = 'item-label';
        
        // Add click handler to update progress
        checkbox.addEventListener('change', updateProgress);
        
        li.appendChild(checkbox);
        li.appendChild(label);
        itemsList.appendChild(li);
    });
    
    // Initialize progress
    updateProgress();
    
    // Show suggestions
    suggestionsDiv.classList.remove('hidden');
}

// Clear form and suggestions
function clearForm() {
    const activityInput = document.getElementById('activityInput');
    const suggestionsDiv = document.getElementById('suggestions');
    const itemsList = document.getElementById('itemsList');
    
    activityInput.value = '';
    if (itemsList) {
        itemsList.innerHTML = '';
    }
    suggestionsDiv.classList.add('hidden');
    activityInput.focus();
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

// Handle clear button click
document.getElementById('clearButton').addEventListener('click', clearForm);

