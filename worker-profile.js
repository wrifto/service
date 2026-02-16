// Worker profile page functionality
let currentWorker = null;
let currentHourlyRate = 0;

// Get URL parameter
function getUrlParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

// Initialize worker profile page
document.addEventListener('DOMContentLoaded', function() {
    const workerId = getUrlParameter('id');
    if (workerId) {
        loadWorkerProfile(workerId);
        setupBookingModal();
    }
    updateHeaderAuth();
});

function updateHeaderAuth() {
    const user = typeof getCurrentUser === 'function' ? getCurrentUser() : null;
    const signIn = document.getElementById('headerSignIn');
    const credits = document.getElementById('headerCredits');
    const dashboard = document.getElementById('headerDashboard');
    if (user && user.type === 'customer') {
        if (signIn) signIn.style.display = 'none';
        const c = typeof getCustomer === 'function' ? getCustomer(user.id) : null;
        const bal = (c && c.credits) ? c.credits : 0;
        if (credits) { credits.textContent = 'Credits: ' + bal; credits.style.display = 'flex'; }
        if (dashboard) dashboard.style.display = 'flex';
    } else {
        if (signIn) signIn.style.display = 'flex';
        if (credits) credits.style.display = 'none';
        if (dashboard) dashboard.style.display = 'none';
    }
}

function handleContactWorker() {
    if (!currentWorker) return;
    const user = typeof getCurrentUser === 'function' ? getCurrentUser() : null;
    if (!user) {
        window.location.href = 'auth.html?redirect=' + encodeURIComponent(window.location.href);
        return;
    }
    if (user.type !== 'customer') {
        alert('Only customers can contact workers.');
        return;
    }
    const result = typeof contactWorker === 'function' ? contactWorker(user.id, currentWorker.id, currentWorker.name) : { ok: false };
    if (result.ok) {
        alert('Contact request sent! The worker will reach out to you.');
        updateHeaderAuth();
    } else {
        if (result.msg && result.msg.includes('credit')) {
            if (confirm('You need 5 credits to contact. Buy credits?')) window.location.href = 'subscriptions.html';
        } else alert(result.msg || 'Failed to contact.');
    }
}

// Load worker profile
function loadWorkerProfile(workerId) {
    currentWorker = getWorkerById(workerId);
    
    if (!currentWorker) {
        alert('Worker not found');
        window.location.href = 'browse.html';
        return;
    }

    currentHourlyRate = currentWorker.hourlyRate;

    // Update header section
    document.getElementById('workerImage').src = currentWorker.image;
    document.getElementById('workerName').textContent = currentWorker.name;
    document.getElementById('workerSpecialty').textContent = currentWorker.specialty;
    document.getElementById('workerRating').textContent = currentWorker.rating;
    document.getElementById('workerReviews').textContent = `(${currentWorker.reviewCount} reviews)`;
    document.getElementById('completedJobs').textContent = `${currentWorker.completedJobs} jobs completed`;
    document.getElementById('workerLocation').textContent = currentWorker.location;
    document.getElementById('workerAvailability').textContent = currentWorker.availability;
    document.getElementById('responseTime').textContent = `Responds ${currentWorker.responseTime}`;
    document.getElementById('experience').textContent = `${currentWorker.experience} years experience`;
    document.getElementById('workerPrice').textContent = `₹${currentWorker.hourlyRate}`;

    // Show/hide pro badge
    if (currentWorker.proBadge) {
        document.getElementById('proBadge').style.display = 'flex';
    }

    // Update bio
    document.getElementById('workerBio').textContent = currentWorker.bio;

    // Load skills
    const skillsContainer = document.getElementById('workerSkills');
    skillsContainer.innerHTML = currentWorker.skills.map(skill => `
        <span class="skill-badge">${skill}</span>
    `).join('');

    // Load reviews
    const reviewsContainer = document.getElementById('reviewsContainer');
    document.getElementById('reviewCount').textContent = currentWorker.reviewCount;
    reviewsContainer.innerHTML = currentWorker.reviews.map(review => `
        <div class="review-item">
            <div class="review-header">
                <div>
                    <h4 class="review-user">${review.userName}</h4>
                    <p class="review-date">${formatDate(review.date)}</p>
                </div>
                <div class="review-rating">
                    ${generateStars(review.rating)}
                </div>
            </div>
            <p class="review-comment">${review.comment}</p>
        </div>
    `).join('');

    // Update pricing sidebar
    document.getElementById('hourlyRate').textContent = `₹${currentWorker.hourlyRate}`;

    // Update modal name
    document.getElementById('modalWorkerName').textContent = currentWorker.name;
}

// Generate star rating HTML
function generateStars(rating) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        const filled = i <= rating;
        stars += `
            <svg width="16" height="16" viewBox="0 0 24 24" fill="${filled ? 'currentColor' : 'none'}" stroke="${filled ? 'none' : 'currentColor'}" stroke-width="2" class="star ${filled ? 'filled' : ''}">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
            </svg>
        `;
    }
    return stars;
}

// Format date
function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

// Setup booking modal
function setupBookingModal() {
    const hoursSlider = document.getElementById('hoursSlider');
    const hoursDisplay = document.getElementById('hoursDisplay');
    const summaryRate = document.getElementById('summaryRate');
    const summaryHours = document.getElementById('summaryHours');
    const summaryTotal = document.getElementById('summaryTotal');

    // Set min date to today
    const bookingDate = document.getElementById('bookingDate');
    const today = new Date().toISOString().split('T')[0];
    bookingDate.min = today;

    // Update pricing summary
    summaryRate.textContent = `₹${currentHourlyRate}`;

    hoursSlider.addEventListener('input', function() {
        const hours = parseFloat(this.value);
        hoursDisplay.textContent = hours;
        summaryHours.textContent = `× ${hours}`;
        summaryTotal.textContent = `₹${currentHourlyRate * hours}`;
    });

    // Initialize summary
    const initialHours = parseFloat(hoursSlider.value);
    hoursDisplay.textContent = initialHours;
    summaryHours.textContent = `× ${initialHours}`;
    summaryTotal.textContent = `₹${currentHourlyRate * initialHours}`;
}

// Open booking modal
function openBookingModal() {
    document.getElementById('bookingModal').style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

// Close booking modal
function closeBookingModal() {
    document.getElementById('bookingModal').style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Handle booking form submission
function handleBooking(event) {
    event.preventDefault();
    
    const bookingData = {
        workerId: currentWorker.id,
        workerName: currentWorker.name,
        date: document.getElementById('bookingDate').value,
        time: document.getElementById('bookingTime').value,
        hours: parseFloat(document.getElementById('hoursSlider').value),
        notes: document.getElementById('bookingNotes').value,
        totalCost: currentHourlyRate * parseFloat(document.getElementById('hoursSlider').value)
    };

    // Store booking data in localStorage
    localStorage.setItem('latestBooking', JSON.stringify(bookingData));

    // Redirect to confirmation page
    window.location.href = 'booking-confirmation.html';
}

// Close modal when clicking outside
document.addEventListener('click', function(event) {
    const modal = document.getElementById('bookingModal');
    if (event.target === modal) {
        closeBookingModal();
    }
});
