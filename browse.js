// Browse page functionality
let currentFilters = {
    category: 'all',
    rating: 0,
    maxPrice: 1000,
    proOnly: false
};

// Get URL parameters
function getUrlParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

// Initialize browse page
document.addEventListener('DOMContentLoaded', function() {
    // Check for category from URL
    const categoryParam = getUrlParameter('category');
    if (categoryParam) {
        currentFilters.category = categoryParam;
    }

    loadCategoryFilters();
    loadWorkers();
    setupFilters();
    setupMobileFilters();
});

// Load category filters
function loadCategoryFilters() {
    const container = document.getElementById('categoryFilters');
    if (!container) return;

    const allOption = `
        <button class="filter-option ${currentFilters.category === 'all' ? 'active' : ''}" data-category="all">
            All Services
        </button>
    `;

    const categoryOptions = categories.map(cat => `
        <button class="filter-option ${currentFilters.category === cat.id ? 'active' : ''}" data-category="${cat.id}">
            <span class="category-emoji">${cat.icon}</span>
            <span>${cat.name}</span>
        </button>
    `).join('');

    container.innerHTML = allOption + categoryOptions;

    // Add click handlers
    container.querySelectorAll('.filter-option').forEach(btn => {
        btn.addEventListener('click', function() {
            currentFilters.category = this.dataset.category;
            container.querySelectorAll('.filter-option').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            loadWorkers();
        });
    });
}

// Setup filters
function setupFilters() {
    // Rating filters
    const ratingFilters = document.querySelectorAll('#ratingFilters .filter-option');
    ratingFilters.forEach(btn => {
        btn.addEventListener('click', function() {
            currentFilters.rating = parseFloat(this.dataset.rating);
            ratingFilters.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            loadWorkers();
        });
    });

    // Price slider
    const priceSlider = document.getElementById('priceSlider');
    const maxPriceValue = document.getElementById('maxPriceValue');
    if (priceSlider) {
        priceSlider.addEventListener('input', function() {
            currentFilters.maxPrice = parseInt(this.value);
            maxPriceValue.textContent = this.value;
            loadWorkers();
        });
    }

    // Pro only checkbox
    const proCheckbox = document.getElementById('proOnlyCheckbox');
    if (proCheckbox) {
        proCheckbox.addEventListener('change', function() {
            currentFilters.proOnly = this.checked;
            loadWorkers();
        });
    }
}

// Setup mobile filters
function setupMobileFilters() {
    const mobileFilterBtn = document.getElementById('mobileFilterBtn');
    const filtersOverlay = document.getElementById('filtersOverlay');
    const closeFiltersBtn = document.getElementById('closeFiltersBtn');

    if (mobileFilterBtn && filtersOverlay) {
        mobileFilterBtn.addEventListener('click', function() {
            filtersOverlay.classList.add('active');
        });
    }

    if (closeFiltersBtn && filtersOverlay) {
        closeFiltersBtn.addEventListener('click', function() {
            filtersOverlay.classList.remove('active');
        });

        filtersOverlay.addEventListener('click', function(e) {
            if (e.target === filtersOverlay) {
                filtersOverlay.classList.remove('active');
            }
        });
    }
}

// Load and display workers
function loadWorkers() {
    const filteredWorkers = filterWorkers(currentFilters);
    const workersGrid = document.getElementById('workersGrid');
    const noResults = document.getElementById('noResults');
    const workerCount = document.getElementById('workerCount');

    if (!workersGrid) return;

    // Update count
    if (workerCount) {
        workerCount.textContent = filteredWorkers.length;
    }

    if (filteredWorkers.length === 0) {
        workersGrid.style.display = 'none';
        noResults.style.display = 'block';
        return;
    }

    workersGrid.style.display = 'grid';
    noResults.style.display = 'none';

    workersGrid.innerHTML = filteredWorkers.map(worker => `
        <div class="worker-card">
            <div class="worker-image">
                <img src="${worker.image}" alt="${worker.name}">
                ${worker.proBadge ? `
                    <div class="worker-pro-badge">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
                            <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
                            <path d="M4 22h16"></path>
                            <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path>
                            <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path>
                            <path d="M18 2H6v7a6 6 0 0 0 12 0V2z"></path>
                        </svg>
                        <span>PRO</span>
                    </div>
                ` : ''}
            </div>
            <div class="worker-card-content">
                <div class="worker-header">
                    <h3 class="worker-card-name">
                        ${worker.name}
                        ${worker.verified ? `
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="none" class="verified-icon">
                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                <polyline points="22 4 12 14.01 9 11.01"></polyline>
                            </svg>
                        ` : ''}
                    </h3>
                    <p class="worker-card-specialty">${worker.specialty}</p>
                </div>

                <div class="worker-rating">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="none" class="star-icon">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                    </svg>
                    <span class="rating-value">${worker.rating}</span>
                    <span class="rating-count">(${worker.reviewCount} reviews)</span>
                </div>

                <div class="worker-info">
                    <div class="worker-info-item">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                            <circle cx="12" cy="10" r="3"></circle>
                        </svg>
                        <span>${worker.location}</span>
                    </div>
                    <div class="worker-info-item">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="12" cy="12" r="10"></circle>
                            <polyline points="12 6 12 12 16 14"></polyline>
                        </svg>
                        <span class="availability">${worker.availability}</span>
                    </div>
                </div>

                <div class="worker-footer">
                    <div class="worker-price">
                        <span class="price-amount">₹${worker.hourlyRate}</span>
                        <span class="price-unit">/hour</span>
                    </div>
                    <a href="worker-profile.html?id=${worker.id}" class="btn-book">Contact</a>
                </div>
            </div>
        </div>
    `).join('');
}
