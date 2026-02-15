// Worker data
const categories = [
  { id: "electrician", name: "Electrician", icon: "⚡" },
  { id: "plumber", name: "Plumber", icon: "🔧" },
  { id: "carpenter", name: "Carpenter", icon: "🪚" },
  { id: "painter", name: "Painter", icon: "🎨" },
  { id: "cleaner", name: "Cleaner", icon: "🧹" },
  { id: "gardener", name: "Gardener", icon: "🌱" },
  { id: "ac-repair", name: "AC Repair", icon: "❄️" },
  { id: "appliance", name: "Appliance Repair", icon: "🔌" },
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
    image: "https://images.unsplash.com/photo-1762330465376-b89b5584306d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJpY2lhbiUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3NzExMjM0Mjh8MA&ixlib=rb-4.1.0&q=80&w=1080",
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
    image: "https://images.unsplash.com/photo-1635221798248-8a3452ad07cd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwbHVtYmVyJTIwcHJvZmVzc2lvbmFsfGVufDF8fHx8MTc3MTEyMzQyOHww&ixlib=rb-4.1.0&q=80&w=1080",
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
    image: "https://images.unsplash.com/photo-1740754699699-c8b4b1635faf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXJwZW50ZXIlMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzcxMTIzNDI5fDA&ixlib=rb-4.1.0&q=80&w=1080",
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
    image: "https://images.unsplash.com/photo-1752649935345-f7d2511b2f6e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYWludGVyJTIwcHJvZmVzc2lvbmFsfGVufDF8fHx8MTc3MTEyMzQyOXww&ixlib=rb-4.1.0&q=80&w=1080",
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
    image: "https://images.unsplash.com/photo-1579154341140-5aa3a445d43b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNobmljaWFuJTIwcHJvZmVzc2lvbmFsfGVufDF8fHx8MTc3MTEyMzQyOXww&ixlib=rb-4.1.0&q=80&w=1080",
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
    image: "https://images.unsplash.com/photo-1504827274833-7db1774520e3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbGVhbmluZyUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3NzExMjM0Mjl8MA&ixlib=rb-4.1.0&q=80&w=1080",
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
    image: "https://images.unsplash.com/photo-1758524055036-dad692d2f5aa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYXJkZW5lciUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3NzExMjM0Mjl8MA&ixlib=rb-4.1.0&q=80&w=1080",
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
    image: "https://images.unsplash.com/photo-1676630444903-163fe485c5d1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXBhaXIlMjB0ZWNobmljaWFufGVufDF8fHx8MTc3MTEyMzQyOXww&ixlib=rb-4.1.0&q=80&w=1080",
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
