// Common functions for all pages

// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
        });
    }
});

// Handle search form submission on home page
function handleSearch(event) {
    event.preventDefault();
    window.location.href = 'browse.html';
}

// Load categories on home page
function loadCategories() {
    const grid = document.getElementById('categoriesGrid');
    if (!grid) return;

    grid.innerHTML = categories.map(cat => `
        <a href="browse.html?category=${cat.id}" class="category-card">
            <div class="category-image">
                <img src="${cat.image}" alt="${cat.name} professional at work">
            </div>
            <h3 class="category-name">${cat.name}</h3>
        </a>
    `).join('');
}

// Initialize home page
if (window.location.pathname === '/' || window.location.pathname.includes('index.html')) {
    document.addEventListener('DOMContentLoaded', loadCategories);
}
