import {
  FaMusic, FaUtensils, FaChild, FaGift, FaTicketAlt,
  FaBullhorn, FaStore, FaMotorcycle, FaIceCream, FaFlag,
  FaBoxOpen, FaCalendarAlt, FaCheckCircle, FaGlassCheers,
  FaUsers, FaMapMarkerAlt, FaStar, FaCog, FaSignOutAlt,
  FaMoneyBillWave, FaRocket, FaGraduationCap, FaPizzaSlice,
  FaUserTie, FaCashRegister, FaHeadset, FaClock, FaRupeeSign,
  FaArrowRight, FaFileSignature, FaPhoneAlt, FaHandshake,
  FaHeartbeat, FaUmbrellaBeach, FaChartLine, FaAward,
  FaPercent, FaBox, FaHome, FaHamburger, FaBirthdayCake,
  FaNewspaper,

} from "react-icons/fa";

export const foods = [
  {
    id: 1,
    name: "Chicken Momos",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRuz_zUgYTfFr4ZzYkuWEw-G1QTZFrWQBkPZWj1PiCHA&s=10",
    rating: 4.8,
    price: "₹199"
  },
  {
    id: 2,
    name: "Veg Momos",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtpa3TcRv35syQguJnRt9Tld1cRb_GQxNo_bK8LqAHFw&s=10",
    rating: 4.7,
    price: "₹149"
  },
  {
    id: 3,
    name: "Cheese Burger",
    image: "data:image/jpeg;base64,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",
    rating: 4.6,
    price: "₹249"
  },
  {
    id: 4,
    name: "Crispy Samosa",
    image: "data:image/jpeg;base64,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",
    rating: 4.5,
    price: "₹59"
  },
];

export const features = [
  {
    id: 1,
    icon: "🚚",
    title: "Fast Delivery",
    desc: "Get your food delivered in 20-30 minutes."
  },
  {
    id: 2,
    icon: "👨‍🍳",
    title: "Fresh Ingredients",
    desc: "Prepared daily using fresh ingredients."
  },
  {
    id: 3,
    icon: "💯",
    title: "Premium Quality",
    desc: "High-quality food with great taste."
  },
  {
    id: 4,
    icon: "💳",
    title: "Easy Payment",
    desc: "UPI, Cards, Cash on Delivery supported."
  }
];

export const Reviews = [
  {
    id: 1,
    name: "Rahul Sharma",
    rating: 5,
    review: "Best Momos I've ever tasted. Delivery was super fast."
  },
  {
    id: 2,
    name: "Priya Verma",
    rating: 5,
    review: "Pizza was hot and delicious. Highly recommended!"
  },
  {
    id: 3,
    name: "Aman Gupta",
    rating: 5,
    review: "Cold Coffee was amazing. Will order again."
  },
  {
    id: 4,
    name: "Sneha Singh",
    rating: 5,
    review: "Excellent quality and premium packaging."
  },
  {
    id: 5,
    name: "Rohit Kumar",
    rating: 5,
    review: "Burger was juicy and fresh."
  }
];

export const foodItems = [
  {
    category: "Burger",
    items: [
      {
        id: 1,
        name: "Cheese Burger",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgxSv76_3d4__bXrCFLvkIdkPVCuFVB0q3pSsvkLJSaQ&s=10",
        price: 8.99,
        description: "A juicy burger with melted cheese, lettuce, tomato, and creamy sauce."
      },
      {
        id: 2,
        name: "Veg Burger",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2Zc7db3u3p9Apu1Uu_xpi8UEmGUlNotgawLzMQbQg8Q&s=10",
        price: 6.49,
        description: "A crispy vegetable patty served with fresh veggies and mayonnaise."
      },
      {
        id: 3,
        name: "Chicken Burger",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpgcbzYIPy2LumC30B2OuHTabfcHyBSzuWsqN7mWG0-w&s=10",
        price: 9.99,
        description: "Grilled chicken fillet with lettuce, onions, and spicy sauce."
      },
      {
        id: 4,
        name: "Double Patty Burger",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS07iMy1xpxguqMtssW0Fg0RmxXC3VXeGcG79OyYnq0dQ&s=10",
        price: 12.49,
        description: "Two beef patties with double cheese and signature burger sauce."
      }
    ]
  },

  {
    category: "Pizza",
    items: [
      {
        id: 5,
        name: "Margherita Pizza",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpwE33Ce4vv_zLgYuUTvNaxU1Pjs85nM0Pua3HTt4UPw&s=10",
        price: 10.99,
        description: "Classic pizza with mozzarella cheese and tomato sauce."
      },
      {
        id: 6,
        name: "Veggie Pizza",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhgq7DRLE8pxr3EKZoWslIOJVVcZ0khDwSBDEoW9cmjA&s=10",
        price: 11.99,
        description: "Loaded with capsicum, onion, olives, mushrooms, and sweet corn."
      },
      {
        id: 7,
        name: "Pepperoni Pizza",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8YF1d0Yp3tVcDpjlyb_PbCaDBWmoK0wnzoLQQ4JAj9A&s=10",
        price: 13.99,
        description: "Cheesy pizza topped with spicy pepperoni slices."
      },
      {
        id: 8,
        name: "Farmhouse Pizza",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZZh-MpTOGcoYPkoELTtO2nl3ATE1DA8bPqm1nwL7ekA&s=10",
        price: 12.99,
        description: "A delicious mix of fresh vegetables and mozzarella cheese."
      }
    ]
  },

  {
    category: "Momos",
    items: [
      {
        id: 9,
        name: "Veg Momos",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtGEx76lZVsdBLJiPbUL3xwVin9ItEFn2lyOdLCbey7A&s=10",
        price: 5.99,
        description: "Steamed dumplings stuffed with fresh vegetables."
      },
      {
        id: 10,
        name: "Paneer Momos",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSE2z_S3aI05-jnkiK4kH4cByjmw_VX3poIcd3xOlL4tw&s=10",
        price: 6.99,
        description: "Soft momos filled with spiced paneer and herbs."
      },
      {
        id: 11,
        name: "Chicken Momos",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQkrfbPK9OOuBW5XTfa51yZBk5_8sd5Fe4gcgZcqS8ng&s=10",
        price: 7.99,
        description: "Juicy chicken dumplings served with spicy chutney."
      },
      {
        id: 12,
        name: "Fried Momos",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSl8VMl9G-rlxTaqNox_WL8Py0nK5MShkiAPSFY926n9A&s=10",
        price: 6.49,
        description: "Golden fried momos with a crispy outer layer."
      }
    ]
  },

  {
    category: "Manchurian",
    items: [
      {
        id: 13,
        name: "Veg Manchurian",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJJpkaE2U6ujYxgVhey7q38zXm5kpSqhyuKiico3UmGQ&s=10",
        price: 8.49,
        description: "Vegetable balls cooked in a flavorful Indo-Chinese sauce."
      },
      {
        id: 14,
        name: "Paneer Manchurian",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-wkKJZchF33WP_XzZ8WKBW52HZCMbiDPxSyWMLnXz3g&s",
        price: 9.49,
        description: "Soft paneer cubes tossed in spicy Manchurian gravy."
      },
      {
        id: 15,
        name: "Chicken Manchurian",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcWDfszv4I25pDUa7IVWhpCvCJMO163_hRrfHfFNhZow&s=10",
        price: 10.99,
        description: "Tender chicken pieces coated in rich Manchurian sauce."
      },
      {
        id: 16,
        name: "Dry Manchurian",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7ge_Z4HnugkabbxEx7wIvDIhxPjgaUrb498GnSqRKiA&s=10",
        price: 9.99,
        description: "Crispy Manchurian served dry with onions and capsicum."
      }
    ]
  },

  {
    category: "Samosa",
    items: [
      {
        id: 17,
        name: "Aloo Samosa",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7IQq4KzFyvgpo1Wzo_LTNEFxzo9xMM0uiI_q0URWF1Q&s=10",
        price: 2.49,
        description: "Traditional crispy pastry filled with spicy potato mixture."
      },
      {
        id: 18,
        name: "Paneer Samosa",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7CEcvLj6axzK4Ky5ceeNi8i9T-5MYuPWhhQb-cK-nRQ&s=10",
        price: 3.49,
        description: "Crunchy samosa stuffed with flavorful paneer filling."
      },
      {
        id: 19,
        name: "Cheese Samosa",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLnhCm71GTtbMeXWQNKDDECIOU8C5LXzZYzQBeH272Cw&s=10",
        price: 3.99,
        description: "Crispy samosa filled with melted cheese and herbs."
      },
      {
        id: 20,
        name: "Corn Samosa",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBqggklD-ISxHYgs-8WBXmJhemxnUFvazEWCvrwzqnxg&s=10",
        price: 3.29,
        description: "Delicious samosa filled with sweet corn and spices."
      }
    ]
  },

  {
    category: "Tea",
    items: [
      {
        id: 21,
        name: "Masala Tea",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1qiaV0XB20OG5Z3Ae3Mqi38-u39VIKxg9Jd_-E_hX3Q&s=10",
        price: 2.49,
        description: "Traditional Indian tea made with aromatic spices."
      },
      {
        id: 22,
        name: "Green Tea",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJ55qUC4v6nw8piROwnqAv503ntoXNUj949TJK8KhO_A&s=10",
        price: 3.49,
        description: "Healthy antioxidant-rich tea with a refreshing taste."
      },
      {
        id: 23,
        name: "Lemon Tea",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJFnZpVcuobdARvZds0Jt9Ks92ZI6seWyVfv0t4YRYAw&s=10",
        price: 2.99,
        description: "Light tea mixed with fresh lemon for a refreshing drink."
      },
      {
        id: 24,
        name: "Ginger Tea",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKhgIOqGs7ebvdl2vTZ_crrnAzuPE2t-1ZcY5Brxh4Ww&s=10",
        price: 3.19,
        description: "Hot tea brewed with fresh ginger for a soothing flavor."
      }
    ]
  }
];




export const Latest_News = [
  {
    id: 1,
    title: "New Cheese Momos Launch",
    date: "2 Aug 2026",
    image:
      "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=800",
  },
  {
    id: 2,
    title: "Weekend Special Combo Offer",
    date: "30 Jul 2026",
    image:
      "https://images.unsplash.com/photo-1550547660-d9450f859349?w=800",
  },
  {
    id: 3,
    title: "Free Delivery on Orders Above ₹499",
    date: "28 Jul 2026",
    image:
      "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?w=800",
  },

];

export const events = [
  {
    icon: <FaMusic />,
    title: "Live Music Night",
    color: "#6C63FF",
  },
  {
    icon: <FaUtensils />,
    title: "Food Festival",
    color: "#FF6B35",
  },
  {
    icon: <FaChild />,
    title: "Kids Special Day",
    color: "#00B894",
  },
  {
    icon: <FaGift />,
    title: "Buy 1 Get 1 Weekend",
    color: "#E84393",
  },
];

export const galleryImages = [
  "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800",
  "https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=800",
  "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800",
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800",
  "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=800",
  "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
];

export const PartyFeatures = [
  "Premium Decoration",
  "Unlimited Food",
  "Live DJ",
  "Professional Photography",
];

export const Partypackages = [
  {
    id: 1,
    name: "Silver Package",
    price: "₹4,999",
    color: "#C0C0C0",
    features: [
      "Premium Decoration",
      "Music System",
      "Birthday Cake",
      "Snacks & Soft Drinks",
    ],
  },
  {
    id: 2,
    name: "Gold Package",
    price: "₹8,999",
    color: "#FFD700",
    popular: true,
    features: [
      "Luxury Decoration",
      "Live DJ",
      "2-Tier Cake",
      "Unlimited Dinner",
      "Photography",
    ],
  },
  {
    id: 3,
    name: "Platinum Package",
    price: "₹14,999",
    color: "#9B59B6",
    features: [
      "Premium Theme Decoration",
      "Live DJ + Dance Floor",
      "Designer Cake",
      "Unlimited Food",
      "Photography & Videography",
      "Return Gifts",
    ],
  },
];


export const ChoosePartyfeatures = [
  {
    icon: "🎂",
    title: "Customized Themes",
  },
  {
    icon: "🎈",
    title: "Luxury Decoration",
  },
  {
    icon: "🍕",
    title: "Unlimited Delicious Food",
  },
  {
    icon: "📷",
    title: "Photography",
  },
  {
    icon: "🎵",
    title: "Live DJ",
  },
  {
    icon: "🎁",
    title: "Return Gifts",
  },
];


export const PartygalleryImages = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=900",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=900",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=900",
  },
  {
    id: 4,
    image:
      "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=900",
  },
  {
    id: 5,
    image:
      "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=900",
  },
  {
    id: 6,
    image:
      "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=900",
  },
];


export const steps = [
  {
    id: 1,
    icon: <FaBoxOpen />,
    title: "Choose Package",
    description: "Select the perfect party package for your celebration.",
  },
  {
    id: 2,
    icon: <FaCalendarAlt />,
    title: "Book Date",
    description: "Pick your preferred date and event schedule.",
  },
  {
    id: 3,
    icon: <FaCheckCircle />,
    title: "Confirm Booking",
    description: "Complete booking confirmation with our team.",
  },
  {
    id: 4,
    icon: <FaGlassCheers />,
    title: "Celebrate",
    description: "Enjoy your luxury celebration with Calvixo.",
  },
];

export const Partythemes = [
  {
    title: "Princess",
    emoji: "👸",
    image:
      "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600",
  },
  {
    title: "Super Hero",
    emoji: "🦸",
    image:
      "https://images.unsplash.com/photo-1577083552431-6e5fd01988c5?w=600",
  },
  {
    title: "Jungle",
    emoji: "🌴",
    image:
      "https://images.unsplash.com/photo-1511497584788-876760111969?w=600",
  },
  {
    title: "Royal",
    emoji: "👑",
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=600",
  },
  {
    title: "Royal",
    emoji: "👑",
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=600",
  },
  {
    title: "Space",
    emoji: "🚀",
    image:
      "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=600",
  },
  {
    title: "Frozen",
    emoji: "❄️",
    image:
      "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=600",
  },
  {
    title: "Cartoon",
    emoji: "🎨",
    image:
      "https://images.unsplash.com/photo-1594784055413-5b7b0d6b7d8a?w=600",
  },
];

export const CareerPageDesignstats = [
  {
    number: "1200+",
    title: "Employees",
    icon: <FaUsers />,
  },
  {
    number: "50+",
    title: "Restaurants",
    icon: <FaStore />,
  },
  {
    number: "25+",
    title: "Cities",
    icon: <FaMapMarkerAlt />,
  },
  {
    number: "4.9 ★",
    title: "Rating",
    icon: <FaStar />,
  },
];

export const Careerbenefits = [
  {
    icon: <FaMoneyBillWave />,
    title: "Competitive Salary",
    desc: "Earn an attractive salary with timely payments and annual increments.",
  },
  {
    icon: <FaRocket />,
    title: "Career Growth",
    desc: "Grow faster with promotions and leadership opportunities.",
  },
  {
    icon: <FaGraduationCap />,
    title: "Free Training",
    desc: "Professional training programs to improve your skills.",
  },
  {
    icon: <FaPizzaSlice />,
    title: "Free Meals",
    desc: "Enjoy complimentary meals during your working hours.",
  },
  {
    icon: <FaGift />,
    title: "Performance Bonus",
    desc: "Receive exciting rewards for outstanding performance.",
  },
  {
    icon: <FaUsers />,
    title: "Friendly Team",
    desc: "Work with a supportive and positive team environment.",
  },
];

export const Careeejobs = [
  {
    icon: <FaUserTie />,
    title: "Head Chef",
    location: "Lucknow",
    type: "Full Time",
    salary: "₹40K - ₹60K",
  },
  {
    icon: <FaMotorcycle />,
    title: "Delivery Executive",
    location: "Kanpur",
    type: "Full Time",
    salary: "₹20K - ₹35K",
  },
  {
    icon: <FaCashRegister />,
    title: "Cashier",
    location: "Ayodhya",
    type: "Full Time",
    salary: "₹18K - ₹25K",
  },
  {
    icon: <FaPizzaSlice />,
    title: "Kitchen Staff",
    location: "Lucknow",
    type: "Full Time",
    salary: "₹16K - ₹22K",
  },
  {
    icon: <FaHeadset />,
    title: "Customer Support",
    location: "Lucknow",
    type: "Full Time",
    salary: "₹22K - ₹30K",
  },
];

export const Careersteps = [
  {
    id: "01",
    icon: <FaFileSignature />,
    title: "Apply Online",
    desc: "Submit your application through our career portal.",
  },
  {
    id: "02",
    icon: <FaPhoneAlt />,
    title: "Phone Call",
    desc: "Our HR team will contact shortlisted candidates.",
  },
  {
    id: "03",
    icon: <FaUserTie />,
    title: "Interview",
    desc: "Attend your interview and showcase your skills.",
  },
  {
    id: "04",
    icon: <FaGraduationCap />,
    title: "Training",
    desc: "Complete our professional onboarding training.",
  },
  {
    id: "05",
    icon: <FaHandshake />,
    title: "Welcome To Calvixo",
    desc: "Start your exciting journey with our amazing team.",
  },
];

export const Careerteam = [
  {
    name: "Executive Chef",
    icon: <FaUtensils />,
    image: "https://images.unsplash.com/photo-1583394293214-28ded15ee548?w=600",
    desc: "Creating delicious experiences every day.",
  },
  {
    name: "Restaurant Manager",
    icon: <FaUserTie />,
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600",
    desc: "Leading our team with passion and excellence.",
  },
  {
    name: "Delivery Captain",
    icon: <FaMotorcycle />,
    image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600",
    desc: "Delivering happiness on time to every customer.",
  },
  {
    name: "Customer Support",
    icon: <FaHeadset />,
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600",
    desc: "Always ready to help with a smile.",
  },
];

export const Employeebenefits = [
  {
    icon: <FaHeartbeat />,
    title: "Health Insurance",
  },
  {
    icon: <FaUmbrellaBeach />,
    title: "Paid Holidays",
  },
  {
    icon: <FaGift />,
    title: "Festival Bonus",
  },
  {
    icon: <FaChartLine />,
    title: "Career Growth",
  },
  {
    icon: <FaAward />,
    title: "Performance Rewards",
  },
  {
    icon: <FaPercent />,
    title: "Employee Discounts",
  },
];

export const Employeereviews = [
  {
    id: 1,
    name: "Rahul Sharma",
    role: "Head Chef",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    review:
      "I've worked here for 3 years. Amazing environment and excellent career opportunities.",
  },
  {
    id: 2,
    name: "Priya Singh",
    role: "Restaurant Manager",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    review:
      "Best company for freshers. Great learning experience and supportive team.",
  },
  {
    id: 3,
    name: "Aman Verma",
    role: "Customer Support",
    image: "https://randomuser.me/api/portraits/men/68.jpg",
    review:
      "Supportive management and positive work culture. Proud to be part of Calvixo.",
  },
];

export const CareergalleryImages = [
  {
    image:
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=900",
    title: "Modern Office",
  },
  {
    image:
      "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=600",
    title: "Team Meeting",
  },
  {
    image:
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=600",
    title: "Team Work",
  },
  {
    image:
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=600",
    title: "Work Space",
  },
  {
    image:
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=600",
    title: "Employee Activity",
  },
  {
    image:
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600",
    title: "Office Culture",
  },
];

export const Jobcities = [
  "Lucknow",
  "Kanpur",
  "Ayodhya",
  "Varanasi",
  "Prayagraj",
  "Gorakhpur",
];

export const dashboardCardData = [

  {
    title: "Total Orders",
    value: "1254",
    growth: "+18% Today",
    icon: <FaBox />,
    color: "#FF5722"
  },

  {
    title: "Revenue",
    value: "₹85,400",
    growth: "+12%",
    icon: <FaRupeeSign />,
    color: "#28a745"
  },

  {
    title: "Customers",
    value: "540",
    growth: "+24",
    icon: <FaUsers />,
    color: "#007bff"
  },

  {
    title: "Reviews",
    value: "4.8/5",
    growth: "95% Positive",
    icon: <FaStar />,
    color: "#ffc107"
  }

];

export const deliveryData = [
  {
    status: "Preparing",
    orders: 18,
    progress: 30,
    color: "#f39c12",
  },
  {
    status: "Out for Delivery",
    orders: 35,
    progress: 60,
    color: "#3498db",
  },
  {
    status: "Delivered",
    orders: 125,
    progress: 95,
    color: "#2ecc71",
  },
];

export const popularFoodsData = [
  {
    name: "Momos",
    emoji: "🥟",
    orders: 325,
    progress: 90,
  },
  {
    name: "Burger",
    emoji: "🍔",
    orders: 290,
    progress: 80,
  },
  {
    name: "Cold Coffee",
    emoji: "🥤",
    orders: 250,
    progress: 70,
  },
];

export const RecentOrdersData = [
  {
    id: "#1002",
    customer: "Deepak",
    item: "Burger x2",
    amount: "₹560",
    status: "Delivered",
  },
  {
    id: "#1003",
    customer: "Rahul",
    item: "Pizza",
    amount: "₹340",
    status: "Preparing",
  },
  {
    id: "#1004",
    customer: "Rohit",
    item: "Momos",
    amount: "₹180",
    status: "Cancelled",
  },
];


export const Menu_foods = [
  {
    emoji: "🍔",
    name: "Burger",
    price: "₹249",
    status: "Available",
  },
  {
    emoji: "🥟",
    name: "Momos",
    price: "₹149",
    status: "Available",
  },
  {
    emoji: "🍟",
    name: "Fries",
    price: "₹129",
    status: "Out of Stock",
  },
  {
    emoji: "🍔",
    name: "Burger",
    price: "₹249",
    status: "Available",
  },
  {
    emoji: "🥟",
    name: "Momos",
    price: "₹149",
    status: "Available",
  },
  {
    emoji: "🍟",
    name: "Fries",
    price: "₹129",
    status: "Out of Stock",
  },
];

export const Menu_stats = [
  { title: "Total Food", value: 48 },
  { title: "Categories", value: 8 },
  { title: "Available", value: 43 },
  { title: "Out Stock", value: 5 },
];

export const deliveryPartnersData = [

  {
    id: "DP-1001",
    name: "Rahul Singh",
    mobile: "+91 98XXXXXXXX",
    email: "rahul@email.com",
    vehicle: "Bike",
    city: "Lucknow",
    joining: "12 Jan 2026",

    todayOrders: 12,
    completed: 10,
    pending: 2,

    rating: 4.9,

    earningsToday: "₹1,450",
    monthlyIncome: "₹28,600",

    status: "Available"

  },


  {
    id: "DP-1002",
    name: "Aman Kumar",
    mobile: "+91 97XXXXXXXX",
    email: "aman@email.com",
    vehicle: "Scooter",
    city: "Kanpur",
    joining: "20 Feb 2026",

    todayOrders: 8,
    completed: 7,
    pending: 1,

    rating: 4.7,

    earningsToday: "₹980",
    monthlyIncome: "₹24,500",

    status: "Busy"

  }
];

export const SidebarPagesDataRoute = [

  {
    title: "Dashboard",
    value: "PagesFirst",
    icon: <FaHome />
  },

  {
    title: "Menu Management",
    value: "PagesSecond",
    icon: <FaHamburger />
  },

  {
    title: "Orders",
    value: "PageThird",
    icon: <FaBox />
  },

  {
    title: "Delivery Partners",
    value: 'PagesFourth',
    icon: <FaMotorcycle />
  },

  {
    title: "Customers",
    value: "PagesFifth",
    icon: <FaUsers />
  },

  {
    title: "Party Bookings",
    value: "PagesSixth",
    icon: <FaBirthdayCake />
  },

  {
    title: "News & Blogs",
    value: "PagesSeventh",
    icon: <FaNewspaper />
  },

  {
    title: "Reviews",
    value: "PagesEighth",
    icon: <FaStar />
  },

  {
    title: "Coupons",
    value: "PagesNinth",
    icon: <FaTicketAlt />
  },

  {
    title: "Reports",
    value: "PagesTenth",
    icon: <FaChartLine />
  },

  {
    title: "Settings",
    value: "PagesEleventh",
    icon: <FaCog />
  }
];

export const UserData = [
  {
    id: 1,
    name: "Deepak Kumar",
    email: "e@e.e",
    password: "123",
  },
  {
    id: 2,
    name: "Rahul",
    email: "rahul@gmail.com",
    password: "rahul123",
  },
];


