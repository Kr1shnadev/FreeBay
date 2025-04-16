// ================= Donation Card Filtering =================
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.donation-card');
    const categoryButtons = document.querySelectorAll('.category-btn');
    const locationSelect = document.getElementById('locationSelect'); // if exists
    const conditionCheckboxes = document.querySelectorAll('input[type="checkbox"][name="condition"]');
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');

    // Helper: get selected filters
    function getSelectedFilters() {
        // Category (from active class on button)
        let selectedCategory = null;
        const activeBtn = document.querySelector('.category-btn.active');
        if (activeBtn) {
            selectedCategory = activeBtn.dataset.category;
        }
        // Location (from dropdown, if exists)
        let selectedLocation = null;
        if (locationSelect) {
            selectedLocation = locationSelect.value.trim().toLowerCase();
        }
        // Condition (array)
        const selectedConditions = Array.from(conditionCheckboxes)
            .filter(cb => cb.checked)
            .map(cb => cb.value.trim().toLowerCase());
        // Search query
        const searchQuery = searchInput.value.trim().toLowerCase();
        return { selectedCategory, selectedLocation, selectedConditions, searchQuery };
    }

    // Main filter function
    function filterCards() {
        const { selectedCategory, selectedLocation, selectedConditions, searchQuery } = getSelectedFilters();
        cards.forEach(card => {
            const cardCategory = card.dataset.category?.toLowerCase();
            const cardLocation = card.dataset.location?.toLowerCase();
            const cardCondition = card.dataset.condition?.toLowerCase();
            const cardTitle = card.querySelector('h3')?.textContent.toLowerCase() || '';
            const cardDescription = card.querySelector('.description')?.textContent.toLowerCase() || '';

            let show = true;
            // Category filter
            if (selectedCategory && selectedCategory !== 'all' && cardCategory !== selectedCategory) {
                show = false;
            }
            // Location filter
            if (selectedLocation && selectedLocation !== 'all' && cardLocation !== selectedLocation) {
                show = false;
            }
            // Condition filter
            if (selectedConditions.length > 0 && !selectedConditions.includes(cardCondition)) {
                show = false;
            }
            // Search filter
            if (searchQuery && !cardTitle.includes(searchQuery) && !cardDescription.includes(searchQuery)) {
                show = false;
            }
            card.style.display = show ? '' : 'none';
        });
    }

    // Event listeners
    categoryButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            categoryButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            filterCards();
        });
    });
    if (locationSelect) {
        locationSelect.addEventListener('change', filterCards);
    }
    conditionCheckboxes.forEach(cb => {
        cb.addEventListener('change', filterCards);
    });
    // Search event listeners
    searchInput.addEventListener('input', filterCards); // Real-time search
    searchBtn.addEventListener('click', filterCards);
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            filterCards();
        }
    });

    // Initial filter
    filterCards();
});
