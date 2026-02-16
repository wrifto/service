// Worker data - Work-related cartoon illustrations (local SVGs)
const categories = [
  { id: "electrician", name: "Electrician", icon: "⚡", image: "images/electrician.jpeg" },
  { id: "plumber", name: "Plumber", icon: "🔧", image: "images/plumber.jpeg" },
  { id: "carpenter", name: "Carpenter", icon: "🪚", image: "images/carpenter.jpeg" },
  { id: "mechanic", name: "Mechanic", icon: "🛠️", image: "images/mechanic.jpeg" },
  { id: "painter", name: "Painter", icon: "🎨", image: "images/painter.svg" },
  { id: "cleaner", name: "Cleaner", icon: "🧹", image: "images/cleaner.svg" },
  { id: "gardener", name: "Gardener", icon: "🌱", image: "images/gardener.svg" },
  { id: "ac-repair", name: "AC Repair", icon: "❄️", image: "images/ac-repair.svg" },
  { id: "appliance", name: "Appliance Repair", icon: "🔌", image: "images/appliance.svg" },
];

const workers = [
  {
    id: "1",
    name: "Rajesh Kumar",
    category: "electrician",
    specialty: "Residential & Commercial Wiring",
    rating: 4.9,
    reviewCount: 156,
    completedJobs: 342,
    hourlyRate: 450,
    location: "Indiranagar, Bangalore",
    verified: true,
    proBadge: true,
    availability: "Available Today",
    bio: "Certified electrician with 12+ years of experience in residential and commercial electrical work. Specialized in home automation and smart lighting solutions.",
    skills: ["Home Wiring", "Smart Home Installation", "Circuit Repairs", "LED Installation", "Electrical Troubleshooting"],
    experience: 12,
    responseTime: "Within 30 mins",
    image: "images/electrician.jpeg",
    reviews: [
      {
        id: "r1",
        userName: "Priya Sharma",
        rating: 5,
        comment: "Excellent work! Fixed my electrical issues quickly and professionally. Highly recommend!",
        date: "2026-02-10",
      },
      {
        id: "r2",
        userName: "Amit Patel",
        rating: 5,
        comment: "Very knowledgeable and efficient. Installed smart switches throughout my home.",
        date: "2026-02-05",
      },
      {
        id: "r3",
        userName: "Sneha Reddy",
        rating: 4,
        comment: "Good service, arrived on time and completed the work as promised.",
        date: "2026-01-28",
      },
    ],
  },
  {
    id: "2",
    name: "Vikram Singh",
    category: "plumber",
    specialty: "Pipeline & Sanitary Work",
    rating: 4.8,
    reviewCount: 203,
    completedJobs: 487,
    hourlyRate: 400,
    location: "Koramangala, Bangalore",
    verified: true,
    proBadge: true,
    availability: "Available Today",
    bio: "Expert plumber with extensive experience in pipeline installations, leak repairs, and bathroom fittings. Quick response and quality workmanship guaranteed.",
    skills: ["Leak Repairs", "Bathroom Fittings", "Pipeline Installation", "Water Heater Installation", "Drain Cleaning"],
    experience: 10,
    responseTime: "Within 1 hour",
    image: "images/plumber.jpeg",
    reviews: [
      {
        id: "r4",
        userName: "Rahul Verma",
        rating: 5,
        comment: "Fixed a major leak in my apartment. Very professional and fair pricing.",
        date: "2026-02-12",
      },
      {
        id: "r5",
        userName: "Kavya Nair",
        rating: 5,
        comment: "Excellent service! Installed new bathroom fittings beautifully.",
        date: "2026-02-08",
      },
    ],
  },
  {
    id: "3",
    name: "Suresh Menon",
    category: "carpenter",
    specialty: "Custom Furniture & Interiors",
    rating: 4.7,
    reviewCount: 89,
    completedJobs: 156,
    hourlyRate: 500,
    location: "HSR Layout, Bangalore",
    verified: true,
    proBadge: false,
    availability: "Available Tomorrow",
    bio: "Skilled carpenter specializing in custom furniture, modular kitchens, and interior woodwork. Attention to detail and quality craftsmanship.",
    skills: ["Custom Furniture", "Modular Kitchen", "Door & Window Repair", "Wood Flooring", "Cabinet Making"],
    experience: 15,
    responseTime: "Within 2 hours",
    image: "images/carpenter.jpeg",
    reviews: [
      {
        id: "r6",
        userName: "Deepak Joshi",
        rating: 5,
        comment: "Created a beautiful custom bookshelf for my home office. Excellent craftsmanship!",
        date: "2026-02-01",
      },
      {
        id: "r7",
        userName: "Anjali Singh",
        rating: 4,
        comment: "Good work on the modular kitchen. Took a bit longer than expected but quality is great.",
        date: "2026-01-20",
      },
    ],
  },
  {
    id: "4",
    name: "Mohan Das",
    category: "painter",
    specialty: "Interior & Exterior Painting",
    rating: 4.6,
    reviewCount: 142,
    completedJobs: 298,
    hourlyRate: 350,
    location: "Whitefield, Bangalore",
    verified: true,
    proBadge: false,
    availability: "Available Today",
    bio: "Professional painter with expertise in both interior and exterior painting. Using eco-friendly paints and modern techniques for lasting finish.",
    skills: ["Interior Painting", "Exterior Painting", "Texture Work", "Wall Paper", "Wood Polish"],
    experience: 8,
    responseTime: "Within 1 hour",
    image: "images/painter.svg",
    reviews: [
      {
        id: "r8",
        userName: "Ravi Kumar",
        rating: 5,
        comment: "Painted my entire apartment. Clean work and great color suggestions!",
        date: "2026-02-11",
      },
    ],
  },
  {
    id: "5",
    name: "Prakash Iyer",
    category: "ac-repair",
    specialty: "AC Installation & Repair",
    rating: 4.9,
    reviewCount: 267,
    completedJobs: 512,
    hourlyRate: 480,
    location: "Jayanagar, Bangalore",
    verified: true,
    proBadge: true,
    availability: "Available Today",
    bio: "Certified AC technician specializing in all brands. Expert in installation, repair, and regular maintenance. Fast and reliable service.",
    skills: ["AC Installation", "AC Repair", "Gas Refilling", "Cleaning & Maintenance", "All Brands"],
    experience: 11,
    responseTime: "Within 30 mins",
    image: "images/ac-repair.svg",
    reviews: [
      {
        id: "r9",
        userName: "Sunita Rao",
        rating: 5,
        comment: "Fixed my AC in no time. Very knowledgeable and professional!",
        date: "2026-02-13",
      },
      {
        id: "r10",
        userName: "Karthik Reddy",
        rating: 5,
        comment: "Best AC service I've had. Will definitely call again for maintenance.",
        date: "2026-02-09",
      },
    ],
  },
  {
    id: "6",
    name: "Dinesh Chauhan",
    category: "cleaner",
    specialty: "Deep Cleaning Specialist",
    rating: 4.7,
    reviewCount: 178,
    completedJobs: 423,
    hourlyRate: 300,
    location: "Marathahalli, Bangalore",
    verified: true,
    proBadge: false,
    availability: "Available Tomorrow",
    bio: "Professional cleaning service with eco-friendly products. Specializing in deep cleaning, move-in/out cleaning, and regular maintenance.",
    skills: ["Deep Cleaning", "Kitchen Cleaning", "Bathroom Cleaning", "Carpet Cleaning", "Move-in/out Cleaning"],
    experience: 6,
    responseTime: "Within 2 hours",
    image: "images/cleaner.svg",
    reviews: [
      {
        id: "r11",
        userName: "Meera Pillai",
        rating: 5,
        comment: "Exceptional deep cleaning service. My house looks brand new!",
        date: "2026-02-07",
      },
    ],
  },
  {
    id: "7",
    name: "Arjun Nair",
    category: "gardener",
    specialty: "Garden Design & Maintenance",
    rating: 4.5,
    reviewCount: 94,
    completedJobs: 187,
    hourlyRate: 320,
    location: "Sarjapur Road, Bangalore",
    verified: true,
    proBadge: false,
    availability: "Available Today",
    bio: "Passionate gardener with expertise in landscaping, plant care, and garden maintenance. Creating beautiful outdoor spaces for homes and offices.",
    skills: ["Landscaping", "Plant Care", "Lawn Maintenance", "Garden Design", "Pest Control"],
    experience: 7,
    responseTime: "Within 3 hours",
    image: "images/gardener.svg",
    reviews: [
      {
        id: "r12",
        userName: "Lakshmi Menon",
        rating: 4,
        comment: "Good knowledge of plants. Regular maintenance has improved my garden significantly.",
        date: "2026-02-06",
      },
    ],
  },
  {
    id: "8",
    name: "Ramesh Patel",
    category: "appliance",
    specialty: "Washing Machine & Refrigerator Expert",
    rating: 4.8,
    reviewCount: 221,
    completedJobs: 456,
    hourlyRate: 420,
    location: "Electronic City, Bangalore",
    verified: true,
    proBadge: true,
    availability: "Available Today",
    bio: "Experienced appliance technician skilled in repairing all major home appliances. Quick diagnosis and genuine spare parts guaranteed.",
    skills: ["Washing Machine Repair", "Refrigerator Repair", "Microwave Repair", "Dishwasher Repair", "All Brands"],
    experience: 9,
    responseTime: "Within 1 hour",
    image: "images/appliance.svg",
    reviews: [
      {
        id: "r13",
        userName: "Naveen Kumar",
        rating: 5,
        comment: "Fixed my washing machine perfectly. Reasonable price and quick service.",
        date: "2026-02-14",
      },
      {
        id: "r14",
        userName: "Pooja Sharma",
        rating: 5,
        comment: "Very professional. Explained the issue clearly and fixed my refrigerator.",
        date: "2026-02-10",
      },
    ],
  },
];

// Helper functions
function getKycWorkers() {
  try {
    const raw = localStorage.getItem('workersDB');
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(w => w.kycVerified);
  } catch (e) {
    return [];
  }
}

function normalizeKycWorker(w) {
  const categoriesList = Array.isArray(w.categories) && w.categories.length
    ? w.categories
    : (w.category ? [w.category] : []);
  const primaryCategory = categoriesList[0] || '';
  const catMeta = typeof categories !== 'undefined'
    ? categories.find(c => c.id === primaryCategory)
    : null;
  return {
    id: w.id,
    name: w.name || 'Worker',
    category: primaryCategory,
    categories: categoriesList,
    specialty: w.specialty || 'General services',
    rating: w.rating || 0,
    reviewCount: w.reviewCount || 0,
    completedJobs: w.completedJobs || 0,
    hourlyRate: w.hourlyRate || 0,
    location: w.location || 'Bangalore',
    verified: true,
    proBadge: !!w.proBadge,
    availability: w.availability || 'Available',
    bio: w.bio || '',
    skills: w.skills || [],
    experience: w.experience || 0,
    responseTime: w.responseTime || 'Within a day',
    image: (catMeta && catMeta.image) || "images/electrician.svg",
    reviews: w.reviews || [],
  };
}

function getWorkerById(id) {
  const staticWorker = workers.find(worker => worker.id === id);
  if (staticWorker) return staticWorker;
  const kycWorkers = getKycWorkers();
  const found = kycWorkers.find(worker => worker.id === id);
  return found ? normalizeKycWorker(found) : null;
}

function getWorkersByCategory(category) {
  const kycWorkers = getKycWorkers().map(normalizeKycWorker);
  let combined = [...workers, ...kycWorkers];
  if (!category || category === "all") return combined;
  return combined.filter(worker => {
    if (Array.isArray(worker.categories) && worker.categories.length) {
      return worker.categories.includes(category);
    }
    return worker.category === category;
  });
}

function filterWorkers(filters) {
  const kycWorkers = getKycWorkers().map(normalizeKycWorker);
  let filtered = [...workers, ...kycWorkers];

  // Filter by category
  if (filters.category && filters.category !== "all") {
    filtered = filtered.filter(w => {
      if (Array.isArray(w.categories) && w.categories.length) {
        return w.categories.includes(filters.category);
      }
      return w.category === filters.category;
    });
  }

  // Filter by rating
  if (filters.rating && filters.rating > 0) {
    filtered = filtered.filter(w => w.rating >= filters.rating);
  }

  // Filter by price
  if (filters.maxPrice) {
    filtered = filtered.filter(w => w.hourlyRate <= filters.maxPrice);
  }

  // Filter by pro badge
  if (filters.proOnly) {
    filtered = filtered.filter(w => w.proBadge);
  }

  return filtered;
}
