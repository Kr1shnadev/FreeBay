// Handle donation card clicks
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.donation-card');
    
    cards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Don't trigger if clicking the favorite button or contact button
            if (e.target.closest('.favorite-btn') || e.target.closest('.contact-btn')) {
                return;
            }

            // Get card details
            const title = card.querySelector('h3').textContent;
            const category = card.dataset.category;
            const condition = card.dataset.condition;
            const location = card.dataset.location;
            const description = card.querySelector('.description').textContent;
            const image = card.querySelector('img').src;

            // Create URL with parameters
            const params = new URLSearchParams({
                title: title,
                category: category,
                condition: condition,
                location: location,
                description: description,
                image: image
            });

            // Navigate to details page
            window.location.href = `donation-details.html?${params.toString()}`;
        });

        // Make the card look clickable
        card.style.cursor = 'pointer';
    });
});
