const categories = [
  { id: "electrician", name: "Electrician", icon: "⚡", image: "images/electrician.jpeg" },
  { id: "plumber", name: "Plumber", icon: "🔧", image: "images/plumber.jpeg" },
  { id: "painter", name: "Painter", icon: "🎨", image: "images/painter.jpeg" },
  { id: "mechanic", name: "Mechanic", icon: "🛠️", image: "images/mechanic.jpeg" },
  { id: "carpenter", name: "Carpenter", icon: "🪚", image: "images/carpenter.jpeg" },
  { id: "ac-repair", name: "AC Repair", icon: "❄️", image: "images/ac repair.jpeg" },
  { id: "appliance", name: "Appliance Repair", icon: "🔌", image: "images/appliance repair.jpeg" },
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
    image: "images/electrician.svg",
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
    image: "images/plumber.svg",
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
    image: "images/carpenter.svg",
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
function getWorkerById(id) {
  return workers.find(worker => worker.id === id);
}

function getWorkersByCategory(category) {
  if (!category || category === "all") return workers;
  return workers.filter(worker => worker.category === category);
}

function filterWorkers(filters) {
  let filtered = [...workers];

  // Filter by category
  if (filters.category && filters.category !== "all") {
    filtered = filtered.filter(w => w.category === filters.category);
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
