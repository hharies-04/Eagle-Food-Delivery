// Curated Unsplash images categorized by food type for visual fallback integrity
const foodImages = {
  biryani: [
    "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&q=80&w=300",
    "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&q=80&w=300"
  ],
  dosa: [
    "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&q=80&w=300",
    "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&q=80&w=300"
  ],
  burger: [
    "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=300",
    "https://images.unsplash.com/photo-1571091718767-18b5b1457add?auto=format&fit=crop&q=80&w=300"
  ],
  pizza: [
    "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=300",
    "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?auto=format&fit=crop&q=80&w=300"
  ],
  dessert: [
    "https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&q=80&w=300",
    "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&q=80&w=300"
  ],
  chinese: [
    "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&q=80&w=300",
    "https://images.unsplash.com/photo-1625220194771-7ebded0d90ae?auto=format&fit=crop&q=80&w=300"
  ],
  northIndian: [
    "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?auto=format&fit=crop&q=80&w=300",
    "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&q=80&w=300"
  ],
  beverage: [
    "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&q=80&w=300",
    "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=300"
  ],
  roll: [
    "https://images.unsplash.com/photo-1626700051175-6518c4793f4f?auto=format&fit=crop&q=80&w=300"
  ],
  restaurantCovers: [
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1625220194771-7ebded0d90ae?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1626700051175-6518c4793f4f?auto=format&fit=crop&q=80&w=600"
  ]
};

// Dish templates by cuisine
const dishTemplates = {
  "Biryani": [
    { name: "Dum Chicken Biryani", price: 299, isVeg: false, desc: "Aromatic basmati rice layered with spiced chicken cooked on slow dum. Served with raita.", type: "biryani" },
    { name: "Premium Paneer Biryani", price: 259, isVeg: true, desc: "Saffron basmati rice layered with spiced paneer cubes and fried onions.", type: "biryani" },
    { name: "Egg Biryani", price: 219, isVeg: false, desc: "Fragrant rice layered with boiled eggs in a special masala gravy.", type: "biryani" },
    { name: "Seeraga Samba Chicken Biryani", price: 289, isVeg: false, desc: "Traditional South Indian style biryani made with fragrant Seeraga samba rice.", type: "biryani" },
    { name: "Mutton Dum Biryani", price: 399, isVeg: false, desc: "Juicy mutton chunks layered with long-grain basmati rice and premium spices.", type: "biryani" }
  ],
  "North Indian": [
    { name: "Butter Paneer Masala", price: 220, isVeg: true, desc: "Rich and creamy tomato onion gravy topped with fresh cottage cheese chunks.", type: "northIndian" },
    { name: "Dal Makhani Classic", price: 180, isVeg: true, desc: "Lentils slow cooked overnight with butter and dairy cream.", type: "northIndian" },
    { name: "Chole Bhature Plate", price: 140, isVeg: true, desc: "Piped white chickpea curry served with two fluffy deep-fried breads.", type: "northIndian" },
    { name: "Kadhai Paneer Special", price: 230, isVeg: true, desc: "Paneer cubes sautéed with bell peppers and roasted ground spices.", type: "northIndian" },
    { name: "Butter Naan", price: 50, isVeg: true, desc: "Flaky clay-oven baked flatbread brushed with butter.", type: "northIndian" },
    { name: "Garlic Naan Bread", price: 60, isVeg: true, desc: "Naan topped with chopped garlic and coriander flakes.", type: "northIndian" },
    { name: "Jeera Basmati Rice", price: 120, isVeg: true, desc: "Basmati rice tempered with roasted cumin seeds and pure ghee.", type: "northIndian" }
  ],
  "South Indian": [
    { name: "Ghee Roast Masala Dosa", price: 130, isVeg: true, desc: "Crispy rice crepe roasted in cow ghee and filled with potato mash. Sambar served.", type: "dosa" },
    { name: "Steamed Idli Sambar (3 Pcs)", price: 80, isVeg: true, desc: "Fluffy steamed rice cakes served dipped in hot piping sambar.", type: "dosa" },
    { name: "Crispy Medu Vada (2 Pcs)", price: 75, isVeg: true, desc: "Fritters made of black lentils, crispy outside and soft inside.", type: "dosa" },
    { name: "Onion Uttapam pancake", price: 110, isVeg: true, desc: "Thick rice pancake topped with fresh chopped onions and coriander.", type: "dosa" },
    { name: "Madras Filter Coffee", price: 45, isVeg: true, desc: "Traditional frothy coffee brewed from chicory blend and hot milk.", type: "beverage" },
    { name: "Ghee Podi Idli (12 Pcs)", price: 120, isVeg: true, desc: "Bite-sized mini idlis tossed in gun powder spices and melted ghee.", type: "dosa" }
  ],
  "Chinese": [
    { name: "Steamed Chicken Dumpling (8 Pcs)", price: 169, isVeg: false, desc: "Juicy minced chicken stuffed in steamed dough wraps. Momo sauce included.", type: "chinese" },
    { name: "Steamed Vegetable Momo (8 Pcs)", price: 139, isVeg: true, desc: "Dumplings stuffed with cabbage, carrot, and spring onions.", type: "chinese" },
    { name: "Schezwan Veg Fried Rice", price: 159, isVeg: true, desc: "Wok-tossed rice with fresh cut vegetables in hot Schezwan sauce.", type: "chinese" },
    { name: "Hakka Chicken Noodles", price: 189, isVeg: false, desc: "Stir-fried noodles with egg scrambles, chicken stripes, and soy sauce.", type: "chinese" },
    { name: "Chilli Chicken Dry (8 Pcs)", price: 219, isVeg: false, desc: "Crispy chicken cubes tossed with diced bell peppers and green chillies.", type: "chinese" },
    { name: "Honey Chilli Potato Crisp", price: 149, isVeg: true, desc: "Fried potato fingers glazed in sweet and spicy honey chilli paste.", type: "chinese" }
  ],
  "Burgers": [
    { name: "Cheese Double Veg Burger", price: 119, isVeg: true, desc: "Double crisp vegetable patty with cheddar cheese slice and tomato sauce.", type: "burger" },
    { name: "Crispy Chicken Tikka Burger", price: 149, isVeg: false, desc: "Juicy chicken tikka patty topped with melted cheese, lettuce, and mayo.", type: "burger" },
    { name: "Spicy Peri Peri Paneer Burger", price: 139, isVeg: true, desc: "Paneer slab coated in peri peri seasoning, grilled with onion rings.", type: "burger" },
    { name: "Peri Peri Fries (Large)", price: 99, isVeg: true, desc: "Golden salted potato fries tossed in hot African peri peri salt.", type: "burger" }
  ],
  "Pizzas": [
    { name: "Cheese Margherita Pizza (Medium)", price: 239, isVeg: true, desc: "Mozzarella cheese base with herb infused tomato sauce on hand-tossed dough.", type: "pizza" },
    { name: "Peppy Paneer Pizza (Medium)", price: 349, isVeg: true, desc: "Paneer chunks, capsicum, corn, and mozzarella cheese on hand-tossed base.", type: "pizza" },
    { name: "Spicy Chicken Sausage Pizza (Medium)", price: 399, isVeg: false, desc: "Slices of hot chicken sausage, red paprika, and loaded cheese.", type: "pizza" }
  ],
  "Beverages": [
    { name: "Desi Ginger Tea (Kulhad)", price: 49, isVeg: true, desc: "Brewed tea leaves with fresh crushed ginger and milk in clay cup.", type: "beverage" },
    { name: "Chilled Sweet Lassi", price: 79, isVeg: true, desc: "Sweetened yogurt drink blended and served with a layer of cream.", type: "beverage" },
    { name: "Oreo Cocoa Shake", price: 119, isVeg: true, desc: "Rich milkshake blended with vanilla ice cream and crushed Oreo cookies.", type: "beverage" },
    { name: "Cold Lemon Iced Tea", price: 69, isVeg: true, desc: "Refreshing iced tea brewed with lemon juice extract.", type: "beverage" }
  ],
  "Desserts": [
    { name: "Hot Chocolate Walnut Brownie", price: 119, isVeg: true, desc: "Dense chocolate cake with walnuts, served warm.", type: "dessert" },
    { name: "Saffron Kesar Rasmalai (2 Pcs)", price: 89, isVeg: true, desc: "Spongy cottage cheese discs soaked in sweetened saffron milk.", type: "dessert" },
    { name: "Death By Chocolate Cake Slice", price: 149, isVeg: true, desc: "Double layers of dark chocolate fudge cake and rich ganache layers.", type: "dessert" }
  ],
  "Rolls": [
    { name: "Double Egg Chatpata Roll", price: 119, isVeg: false, desc: "Wheat flatbread rolled with double eggs, onions, and local spices.", type: "roll" },
    { name: "Spicy Chicken Tikka Wrap", price: 179, isVeg: false, desc: "Grilled chicken pieces with mint mayonnaise rolled inside paratha.", type: "roll" },
    { name: "Jumbo Paneer Tikka Wrap", price: 159, isVeg: true, desc: "Soft paneer cubes sautéed in tikka spices, rolled in thin flatbread.", type: "roll" }
  ],
  "Chettinad": [
    { name: "Chettinad Chicken Masala Curry", price: 260, isVeg: false, desc: "Fiery chicken pieces cooked in roasted coconut paste and black pepper.", type: "northIndian" },
    { name: "Chettinad Mutton Pepper Fry", price: 320, isVeg: false, desc: "Goat mutton chunks pan-fried with onions, green chillies, and crushed pepper.", type: "northIndian" }
  ],
  "Andhra": [
    { name: "Andhra Special Chicken Biryani", price: 299, isVeg: false, desc: "Spicy Guntur style chicken biryani served with salan and yogurt raita.", type: "biryani" },
    { name: "Guntur Paneer dry", price: 219, isVeg: true, desc: "Cottage cheese pieces tossed in Guntur chilli masala paste.", type: "northIndian" }
  ]
};

// Hand-crafted base restaurants (17 initial entries)
const explicitRestaurants = [
  {
    id: "rest-1",
    name: "Behrouz Biryani",
    cuisines: ["Biryani", "Mughlai", "Hyderabadi"],
    rating: 4.4,
    ratingsCount: "10K+ ratings",
    deliveryTime: 35,
    distance: "2.4 km",
    costForTwo: 500,
    isVeg: false,
    city: "Delhi NCR",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&q=80&w=600",
    bannerImage: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&q=80&w=1200",
    address: "Sector 62, Noida, Delhi NCR",
    menu: [
      { id: "dish-101", name: "Subz-e-Falafel Biryani", price: 299, rating: 4.3, isVeg: true, description: "Fragrant basmati rice layered with crispy falafel nuggets and spiced vegetables, cooked on dum. Served with gulab jamun & mint raita.", image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&q=80&w=300", category: "Recommended" },
      { id: "dish-102", name: "Lazeez Bhuna Murgh Biryani", price: 389, rating: 4.7, isVeg: false, description: "Tender chicken pieces cooked in bhuna spices, layered with long-grain basmati rice. Served with raita.", image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&q=80&w=300", category: "Recommended" },
      { id: "dish-103", name: "Zaikadaar Paneer Biryani", price: 349, rating: 4.5, isVeg: true, description: "Soft marinated paneer cubes layered with aromatic rice and caramelized onions. Served with raita.", image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&q=80&w=300", category: "Recommended" },
      { id: "dish-104", name: "Falafel-e-Khaas (6 Pcs)", price: 189, rating: 4.2, isVeg: true, description: "Deep-fried chickpea and herb patties, served with a creamy garlic mayonnaise dip.", image: "https://images.unsplash.com/photo-1547058886-af779910d659?auto=format&fit=crop&q=80&w=300", category: "Starters" },
      { id: "dish-105", name: "Murgh Koobideh Kebab (4 Pcs)", price: 269, rating: 4.6, isVeg: false, description: "Minced chicken skewers flavored with Persian herbs and spices, grilled to juicy perfection.", image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&q=80&w=300", category: "Starters" },
      { id: "dish-106", name: "Murg Keema Gosht", price: 329, rating: 4.4, isVeg: false, description: "Minced chicken cooked slowly in a rich tomato, onion, and yogurt-based gravy with traditional spices.", image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&q=80&w=300", category: "Main Course" }
    ]
  },
  {
    id: "rest-2",
    name: "Moti Mahal Delux",
    cuisines: ["North Indian", "Mughlai", "Tandoori"],
    rating: 4.5,
    ratingsCount: "8K+ ratings",
    deliveryTime: 28,
    distance: "1.8 km",
    costForTwo: 600,
    isVeg: false,
    city: "Delhi NCR",
    image: "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?auto=format&fit=crop&q=80&w=600",
    bannerImage: "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?auto=format&fit=crop&q=80&w=1200",
    address: "Indirapuram, Ghaziabad, Delhi NCR",
    menu: [
      { id: "dish-201", name: "Original Butter Chicken", price: 369, rating: 4.9, isVeg: false, description: "Tandoori grilled chicken cooked in a rich, buttery, and creamy tomato gravy. The legendary recipe.", image: "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?auto=format&fit=crop&q=80&w=300", category: "Recommended" },
      { id: "dish-202", name: "Dal Makhani", price: 249, rating: 4.8, isVeg: true, description: "Black lentils slow-cooked overnight on tandoor with loads of fresh cream and butter.", image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&q=80&w=300", category: "Recommended" },
      { id: "dish-203", name: "Tandoori Paneer Tikka (6 Pcs)", price: 269, rating: 4.4, isVeg: true, description: "Fresh cottage cheese chunks marinated in spiced yogurt and skewered with bell peppers.", image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&q=80&w=300", category: "Starters" },
      { id: "dish-204", name: "Tandoori Chicken (Half)", price: 299, rating: 4.7, isVeg: false, description: "Chicken marinated in yogurt and spices, grilled in a traditional clay oven. Served with mint chutney.", image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&q=80&w=300", category: "Starters" },
      { id: "dish-205", name: "Kadhai Paneer Masala", price: 299, rating: 4.5, isVeg: true, description: "Cottage cheese cooked with onions, tomatoes, green capsicum, and fresh coriander seeds.", image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&q=80&w=300", category: "Main Course" },
      { id: "dish-206", name: "Butter Naan", price: 59, rating: 4.6, isVeg: true, description: "Leavened flatbread baked in a tandoor and brushed generously with butter.", image: "https://images.unsplash.com/photo-1608039829572-78524f79c4c7?auto=format&fit=crop&q=80&w=300", category: "Breads" }
    ]
  },
  {
    id: "rest-3",
    name: "Saravana Bhavan",
    cuisines: ["South Indian", "Pure Veg", "Healthy"],
    rating: 4.6,
    ratingsCount: "15K+ ratings",
    deliveryTime: 20,
    distance: "1.2 km",
    costForTwo: 300,
    isVeg: true,
    city: "Delhi NCR",
    image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&q=80&w=600",
    bannerImage: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&q=80&w=1200",
    address: "Connaught Place, Delhi NCR",
    menu: [
      { id: "dish-301", name: "Ghee Roast Masala Dosa", price: 159, rating: 4.8, isVeg: true, description: "Crispy crepe roasted with pure ghee, stuffed with potato masala. Served with sambar and 3 coconut chutneys.", image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&q=80&w=300", category: "Recommended" },
      { id: "dish-302", name: "Idli Sambar (2 Pcs)", price: 89, rating: 4.6, isVeg: true, description: "Fluffy steamed rice cakes dipped in hot, piping lentil sambar, topped with pure ghee.", image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&q=80&w=300", category: "Recommended" },
      { id: "dish-303", name: "Medu Vada (2 Pcs)", price: 99, rating: 4.5, isVeg: true, description: "Deep-fried split black gram donuts, crispy outside and soft inside. Served with chutney.", image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&q=80&w=300", category: "Recommended" },
      { id: "dish-304", name: "Rava Onion Dosa", price: 169, rating: 4.4, isVeg: true, description: "Semolina and rice-based thin lacy crepe filled with chopped green chillies and roasted onions.", image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&q=80&w=300", category: "Dosa Specials" },
      { id: "dish-305", name: "Cheese Masala Dosa", price: 189, rating: 4.6, isVeg: true, description: "Dosa filled with grated cheddar cheese, spicy potato, and mixed herbs.", image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&q=80&w=300", category: "Dosa Specials" }
    ]
  },
  {
    id: "rest-4",
    name: "Wow! Momo",
    cuisines: ["Chinese", "Momos", "Fast Food"],
    rating: 4.2,
    ratingsCount: "7K+ ratings",
    deliveryTime: 25,
    distance: "3.1 km",
    costForTwo: 350,
    isVeg: false,
    city: "Delhi NCR",
    image: "https://images.unsplash.com/photo-1625220194771-7ebded0d90ae?auto=format&fit=crop&q=80&w=600",
    bannerImage: "https://images.unsplash.com/photo-1625220194771-7ebded0d90ae?auto=format&fit=crop&q=80&w=1200",
    address: "Kalkaji, Delhi NCR",
    menu: [
      { id: "dish-401", name: "Steamed Chicken Momos (8 Pcs)", price: 179, rating: 4.5, isVeg: false, description: "Soft steamed dumplings stuffed with minced juicy chicken and onion, served with momo sauce.", image: "https://images.unsplash.com/photo-1625220194771-7ebded0d90ae?auto=format&fit=crop&q=80&w=300", category: "Recommended" },
      { id: "dish-402", name: "Steamed Veg Momos (8 Pcs)", price: 149, rating: 4.3, isVeg: true, description: "Healthy steamed dumplings packed with carrots, cabbage, coriander, and spring onion.", image: "https://images.unsplash.com/photo-1625220194771-7ebded0d90ae?auto=format&fit=crop&q=80&w=300", category: "Recommended" },
      { id: "dish-403", name: "Pan Fried Chicken Momos in Schezwan (8 Pcs)", price: 219, rating: 4.6, isVeg: false, description: "Fried dumplings tossed in dynamic, spicy Schezwan sauce and sprinkled with green spring onions.", image: "https://images.unsplash.com/photo-1625220194771-7ebded0d90ae?auto=format&fit=crop&q=80&w=300", category: "Momos" },
      { id: "dish-404", name: "Tandoori Paneer Momos (8 Pcs)", price: 209, rating: 4.4, isVeg: true, description: "Momos stuffed with paneer and tandoori spices, baked inside a clay oven.", image: "https://images.unsplash.com/photo-1625220194771-7ebded0d90ae?auto=format&fit=crop&q=80&w=300", category: "Momos" }
    ]
  },
  {
    id: "rest-5",
    name: "Domino's Pizza",
    cuisines: ["Pizzas", "Italian", "Fast Food"],
    rating: 4.3,
    ratingsCount: "20K+ ratings",
    deliveryTime: 30,
    distance: "2.0 km",
    costForTwo: 500,
    isVeg: false,
    city: "Delhi NCR",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=600",
    bannerImage: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=1200",
    address: "Preet Vihar, Delhi NCR",
    menu: [
      { id: "dish-501", name: "Margherita Pizza (Medium)", price: 249, rating: 4.6, isVeg: true, description: "Classic pizza base with mozzarella cheese, liquid cheese, and traditional herb tomato sauce.", image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=300", category: "Recommended" },
      { id: "dish-502", name: "Peppy Paneer Pizza (Medium)", price: 399, rating: 4.7, isVeg: true, description: "Chunky paneer pieces, golden corn, and capsicum on a soft hand-tossed base with extra cheese.", image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=300", category: "Recommended" },
      { id: "dish-503", name: "Chicken Dominator Pizza (Medium)", price: 499, rating: 4.8, isVeg: false, description: "Double loaded grilled chicken rashers, hot chicken meatballs, chicken tikka, and mozzarella cheese.", image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=300", category: "Recommended" }
    ]
  },
  {
    id: "rest-6",
    name: "Burger King",
    cuisines: ["Burgers", "Fast Food", "Fries"],
    rating: 4.2,
    ratingsCount: "12K+ ratings",
    deliveryTime: 22,
    distance: "1.9 km",
    costForTwo: 400,
    isVeg: false,
    city: "Delhi NCR",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=600",
    bannerImage: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=1200",
    address: "Mayur Vihar, Delhi NCR",
    menu: [
      { id: "dish-601", name: "Crispy Veg Double Burger", price: 99, rating: 4.4, isVeg: true, description: "Double crispy vegetable patties, cheese slice, fresh onion, and mayonnaise inside sesame buns.", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=300", category: "Recommended" },
      { id: "dish-602", name: "Whopper Veg Burger", price: 169, rating: 4.6, isVeg: true, description: "Signature flame-grilled plant-based patty with tomatoes, pickles, lettuce, and onions.", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=300", category: "Recommended" },
      { id: "dish-603", name: "Whopper Chicken Burger", price: 199, rating: 4.7, isVeg: false, description: "Flame-grilled juicy chicken breast patty with crispy lettuce, tomatoes, and mayo.", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=300", category: "Recommended" }
    ]
  },
  {
    id: "rest-7",
    name: "Chaayos",
    cuisines: ["Beverages", "Snacks", "Street Food"],
    rating: 4.4,
    ratingsCount: "4K+ ratings",
    deliveryTime: 18,
    distance: "1.0 km",
    costForTwo: 300,
    isVeg: true,
    city: "Delhi NCR",
    image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&q=80&w=600",
    bannerImage: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&q=80&w=1200",
    address: "Sector 63, Noida, Delhi NCR",
    menu: [
      { id: "dish-701", name: "Desi Chai (Kulhad)", price: 89, rating: 4.9, isVeg: true, description: "Traditional Indian tea brewed with milk, ginger, cardamom, and tulsi. Served in a clay kulhad.", image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&q=80&w=300", category: "Recommended" },
      { id: "dish-702", name: "Bun Maska Classic", price: 69, rating: 4.8, isVeg: true, description: "Freshly toasted soft round bun sliced and stuffed with dynamic salted yellow butter.", image: "https://images.unsplash.com/photo-1608039829572-78524f79c4c7?auto=format&fit=crop&q=80&w=300", category: "Recommended" },
      { id: "dish-703", name: "Samosa Chat Classic", price: 129, rating: 4.6, isVeg: true, description: "Crushed potato samosas topped with hot white chickpea curry, sweet yogurt, tamarind and mint chutney.", image: "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?auto=format&fit=crop&q=80&w=300", category: "Recommended" }
    ]
  },
  {
    id: "rest-8",
    name: "Haldiram's",
    cuisines: ["North Indian", "Sweets", "Street Food"],
    rating: 4.5,
    ratingsCount: "25K+ ratings",
    deliveryTime: 26,
    distance: "2.1 km",
    costForTwo: 350,
    isVeg: true,
    city: "Delhi NCR",
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&q=80&w=600",
    bannerImage: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&q=80&w=1200",
    address: "Preet Vihar, Delhi NCR",
    menu: [
      { id: "dish-801", name: "Special Chole Bhature", price: 149, rating: 4.8, isVeg: true, description: "Two puffed puffed leavened flour breads served with spicy dark chickpea curry, onion rings, and pickle.", image: "https://images.unsplash.com/photo-1626132647523-66f5bf380027?auto=format&fit=crop&q=80&w=300", category: "Recommended" },
      { id: "dish-802", name: "Deluxe Veg Thali", price: 249, rating: 4.7, isVeg: true, description: "Comprehensive meal box with paneer butter masala, dal makhani, dry veg, jeera rice, 1 butter naan, curd, and sweet.", image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&q=80&w=300", category: "Recommended" },
      { id: "dish-803", name: "Raj Kachori Chat", price: 119, rating: 4.6, isVeg: true, description: "Crispy large flour ball stuffed with boiled potatoes, sprouts, sweet yogurt, chutneys, and fine sev.", image: "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?auto=format&fit=crop&q=80&w=300", category: "Recommended" }
    ]
  },
  {
    id: "rest-9",
    name: "Naturals Ice Cream",
    cuisines: ["Desserts", "Ice Cream"],
    rating: 4.7,
    ratingsCount: "9K+ ratings",
    deliveryTime: 15,
    distance: "0.8 km",
    costForTwo: 200,
    isVeg: true,
    city: "Delhi NCR",
    image: "https://images.unsplash.com/photo-1579954115545-a95591f28bfc?auto=format&fit=crop&q=80&w=600",
    bannerImage: "https://images.unsplash.com/photo-1579954115545-a95591f28bfc?auto=format&fit=crop&q=80&w=1200",
    address: "Mayur Vihar Ph-1, Delhi NCR",
    menu: [
      { id: "dish-901", name: "Tender Coconut Ice Cream", price: 139, rating: 4.9, isVeg: true, description: "Creamy white ice cream loaded with real soft bits of fresh tender coconut kernel.", image: "https://images.unsplash.com/photo-1579954115545-a95591f28bfc?auto=format&fit=crop&q=80&w=300", category: "Recommended" },
      { id: "dish-902", name: "Mango Ice Cream", price: 129, rating: 4.8, isVeg: true, description: "Seasonal sweet Alphonso mango ice cream made with organic fruit pulp.", image: "https://images.unsplash.com/photo-1579954115545-a95591f28bfc?auto=format&fit=crop&q=80&w=300", category: "Recommended" },
      { id: "dish-903", name: "Sitaphal Ice Cream", price: 139, rating: 4.8, isVeg: true, description: "Custard apple flavored ice cream packed with sweet sitaphal pulp bits.", image: "https://images.unsplash.com/photo-1579954115545-a95591f28bfc?auto=format&fit=crop&q=80&w=300", category: "Recommended" }
    ]
  },
  {
    id: "rest-10",
    name: "Faasos Wraps & Rolls",
    cuisines: ["Rolls", "Wraps", "Fast Food"],
    rating: 4.1,
    ratingsCount: "6K+ ratings",
    deliveryTime: 24,
    distance: "2.8 km",
    costForTwo: 350,
    isVeg: false,
    city: "Delhi NCR",
    image: "https://images.unsplash.com/photo-1626700051175-6518c4793f4f?auto=format&fit=crop&q=80&w=600",
    bannerImage: "https://images.unsplash.com/photo-1626700051175-6518c4793f4f?auto=format&fit=crop&q=80&w=1200",
    address: "Sector 62, Noida, Delhi NCR",
    menu: [
      { id: "dish-1001", name: "Double Egg Chatpata Roll", price: 139, rating: 4.4, isVeg: false, description: "Flaky wheat paratha layered with double whipped eggs, onions, green chillies, and tangy chaat spices.", image: "https://images.unsplash.com/photo-1626700051175-6518c4793f4f?auto=format&fit=crop&q=80&w=300", category: "Recommended" },
      { id: "dish-1002", name: "Jumbo Paneer Chooza Wrap", price: 199, rating: 4.5, isVeg: true, description: "Soft paneer cubes sautéed in rich spices, loaded with green capsicum, cheese spread, rolled in soft tortilla.", image: "https://images.unsplash.com/photo-1626700051175-6518c4793f4f?auto=format&fit=crop&q=80&w=300", category: "Recommended" },
      { id: "dish-1003", name: "Reshmi Chicken Tikka Wrap", price: 219, rating: 4.6, isVeg: false, description: "Juicy chicken reshmi kebab chunks rolled with mint dressing and raw onion rings in a paratha.", image: "https://images.unsplash.com/photo-1626700051175-6518c4793f4f?auto=format&fit=crop&q=80&w=300", category: "Recommended" }
    ]
  },
  {
    id: "rest-11",
    name: "Adyar Ananda Bhavan (A2B)",
    cuisines: ["South Indian", "Pure Veg", "Sweets"],
    rating: 4.5,
    ratingsCount: "12K+ ratings",
    deliveryTime: 25,
    distance: "3.4 km",
    costForTwo: 300,
    isVeg: true,
    city: "Chennai",
    image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&q=80&w=600",
    bannerImage: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&q=80&w=1200",
    address: "T. Nagar, Chennai, Tamil Nadu",
    menu: [
      { id: "dish-1101", name: "Ghee Mini Idlis (14 Pcs)", price: 120, rating: 4.8, isVeg: true, description: "Bite-sized baby idlis soaked in sambar, topped with pure cow ghee and gun powder.", image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&q=80&w=300", category: "Recommended" },
      { id: "dish-1102", name: "A2B Special Masala Dosa", price: 140, rating: 4.7, isVeg: true, description: "Golden crispy rice crepe stuffed with spiced potato masala and coated inside with red chutney.", image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&q=80&w=300", category: "Recommended" },
      { id: "dish-1105", name: "Special Mysore Pak (250g)", price: 180, rating: 4.9, isVeg: true, description: "Traditional soft and crumbly sweet made of gram flour, sugar, and heavy pure ghee.", image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&q=80&w=300", category: "Desserts" }
    ]
  },
  {
    id: "rest-12",
    name: "Anjappar Chettinad Restaurant",
    cuisines: ["Chettinad", "Mughlai", "Biryani"],
    rating: 4.3,
    ratingsCount: "9K+ ratings",
    deliveryTime: 32,
    distance: "4.2 km",
    costForTwo: 500,
    isVeg: false,
    city: "Chennai",
    image: "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?auto=format&fit=crop&q=80&w=600",
    bannerImage: "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?auto=format&fit=crop&q=80&w=1200",
    address: "Nungambakkam, Chennai, Tamil Nadu",
    menu: [
      { id: "dish-1201", name: "Chettinad Chicken Masala", price: 280, rating: 4.8, isVeg: false, description: "Fiery chicken curry cooked in dry roasted coconut, black pepper, and unique Chettinad spices.", image: "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?auto=format&fit=crop&q=80&w=300", category: "Recommended" },
      { id: "dish-1202", name: "Mutton Pepper Fry", price: 320, rating: 4.7, isVeg: false, description: "Tender goat mutton pieces dry-fried with caramelized onions, green chillies, and freshly crushed black pepper.", image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&q=80&w=300", category: "Recommended" },
      { id: "dish-1203", name: "Chettinad Chicken Biryani", price: 260, rating: 4.6, isVeg: false, description: "Aromatic Seeraga Samba rice cooked with spices and chicken pieces, a classic Tamil Nadu recipe.", image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&q=80&w=300", category: "Recommended" }
    ]
  },
  {
    id: "rest-13",
    name: "Dindigul Thalappakatti Biryani",
    cuisines: ["Biryani", "South Indian", "Tandoori"],
    rating: 4.4,
    ratingsCount: "11K+ ratings",
    deliveryTime: 30,
    distance: "3.8 km",
    costForTwo: 550,
    isVeg: false,
    city: "Chennai",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&q=80&w=600",
    bannerImage: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&q=80&w=1200",
    address: "Velachery, Chennai, Tamil Nadu",
    menu: [
      { id: "dish-1301", name: "Thalappakatti Mutton Biryani", price: 349, rating: 4.9, isVeg: false, description: "Authentic biryani made with Seeraga samba rice and tender pieces of fresh mutton.", image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&q=80&w=300", category: "Recommended" },
      { id: "dish-1302", name: "Thalappakatti Chicken Biryani", price: 289, rating: 4.7, isVeg: false, description: "Seeraga samba rice layered with succulent chicken pieces and traditional Dindigul spices.", image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&q=80&w=300", category: "Recommended" },
      { id: "dish-1303", name: "Black Pepper Chicken Dry", price: 249, rating: 4.5, isVeg: false, description: "Chicken bites tossed with fresh curry leaves, capsicum, and heavy freshly crushed black pepper.", image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&q=80&w=300", category: "Recommended" }
    ]
  },
  {
    id: "rest-14",
    name: "Mavalli Tiffin Room (MTR)",
    cuisines: ["South Indian", "Pure Veg", "Karnataka"],
    rating: 4.6,
    ratingsCount: "8K+ ratings",
    deliveryTime: 22,
    distance: "2.8 km",
    costForTwo: 250,
    isVeg: true,
    city: "Bangalore",
    image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&q=80&w=600",
    bannerImage: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&q=80&w=1200",
    address: "Lalbagh, Bangalore, Karnataka",
    menu: [
      { id: "dish-1401", name: "MTR Rava Idli (2 Pcs)", price: 90, rating: 4.9, isVeg: true, description: "Steamed semolina cake mixed with yogurt, ghee, cashews, and mustard seeds.", image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&q=80&w=300", category: "Recommended" },
      { id: "dish-1402", name: "Heritage Masala Dosa", price: 120, rating: 4.8, isVeg: true, description: "Thick and golden rice crepe smeared inside with pure ghee, served with potato sagu and ghee.", image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&q=80&w=300", category: "Recommended" },
      { id: "dish-1403", name: "Badam Halwa (100g)", price: 110, rating: 4.9, isVeg: true, description: "Rich dessert made of pureed almonds, saffron, and pure ghee.", image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&q=80&w=300", category: "Recommended" }
    ]
  },
  {
    id: "rest-15",
    name: "Empire Restaurant",
    cuisines: ["North Indian", "Mughlai", "Kebabs"],
    rating: 4.4,
    ratingsCount: "14K+ ratings",
    deliveryTime: 28,
    distance: "3.6 km",
    costForTwo: 450,
    isVeg: false,
    city: "Bangalore",
    image: "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?auto=format&fit=crop&q=80&w=600",
    bannerImage: "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?auto=format&fit=crop&q=80&w=1200",
    address: "Indiranagar, Bangalore, Karnataka",
    menu: [
      { id: "dish-1501", name: "Empire Special Chicken Kebab (8 Pcs)", price: 240, rating: 4.9, isVeg: false, description: "Deep-fried chicken pieces coated in spicy red marinade, served with onion rings.", image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&q=80&w=300", category: "Recommended" },
      { id: "dish-1502", name: "Empire Butter Chicken Curry", price: 290, rating: 4.6, isVeg: false, description: "Sweet and spicy tomato cashew gravy with boneless chicken pieces and butter glaze.", image: "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?auto=format&fit=crop&q=80&w=300", category: "Recommended" },
      { id: "dish-1503", name: "Coin Parotta (3 Pcs)", price: 75, rating: 4.7, isVeg: true, description: "Crispy, multi-layered, small-sized Kerala parottas roasted with oil.", image: "https://images.unsplash.com/photo-1626132647523-66f5bf380027?auto=format&fit=crop&q=80&w=300", category: "Recommended" }
    ]
  },
  {
    id: "rest-16",
    name: "Meghana Foods",
    cuisines: ["Biryani", "South Indian", "Andhra"],
    rating: 4.5,
    ratingsCount: "16K+ ratings",
    deliveryTime: 34,
    distance: "4.0 km",
    costForTwo: 500,
    isVeg: false,
    city: "Bangalore",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&q=80&w=600",
    bannerImage: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&q=80&w=1200",
    address: "Koramangala, Bangalore, Karnataka",
    menu: [
      { id: "dish-1601", name: "Meghana Special Chicken Biryani", price: 320, rating: 4.9, isVeg: false, description: "Fried boneless chicken pieces placed on top of aromatic long-grain basmati rice.", image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&q=80&w=300", category: "Recommended" },
      { id: "dish-1602", name: "Andhra Chicken Biryani (With Bone)", price: 299, rating: 4.8, isVeg: false, description: "Classic spicy Andhra style biryani layered with marinated chicken chunks cooked on slow fire.", image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&q=80&w=300", category: "Recommended" },
      { id: "dish-1604", name: "Meghana Chicken 555 (8 Pcs)", price: 269, rating: 4.6, isVeg: false, description: "Deep-fried chicken strips marinated in hot garlic sauce and local Andhra spices.", image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&q=80&w=300", category: "Recommended" }
    ]
  },
  {
    id: "rest-17",
    name: "Corner House Ice Cream",
    cuisines: ["Desserts", "Ice Cream"],
    rating: 4.8,
    ratingsCount: "22K+ ratings",
    deliveryTime: 15,
    distance: "1.5 km",
    costForTwo: 300,
    isVeg: true,
    city: "Bangalore",
    image: "https://images.unsplash.com/photo-1579954115545-a95591f28bfc?auto=format&fit=crop&q=80&w=600",
    bannerImage: "https://images.unsplash.com/photo-1579954115545-a95591f28bfc?auto=format&fit=crop&q=80&w=1200",
    address: "Residency Road, Bangalore, Karnataka",
    menu: [
      { id: "dish-1701", name: "Death By Chocolate (DBC)", price: 280, rating: 4.9, isVeg: true, description: "Warm eggless chocolate cake, vanilla ice cream, hot chocolate fudge sauce, and roasted peanuts.", image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&q=80&w=300", category: "Recommended" },
      { id: "dish-1702", name: "Cake Fudge Double", price: 190, rating: 4.8, isVeg: true, description: "Rich chocolate cake combined with vanilla ice cream, drenched in hot chocolate fudge sauce.", image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&q=80&w=300", category: "Recommended" }
    ]
  }
];

// City area pools for address generation
const cityAreas = {
  "Chennai": ["Adyar", "T. Nagar", "Velachery", "Nungambakkam", "Mylapore", "Anna Nagar", "Besant Nagar", "OMR", "Guindy", "Royapettah", "Kodambakkam", "Egmore", "Chromepet", "Tambaram", "Thiruvanmiyur"],
  "Bangalore": ["Indiranagar", "Koramangala", "HSR Layout", "Jayanagar", "JP Nagar", "Whitefield", "Marathahalli", "Malleswaram", "Residency Road", "MG Road", "Ulsoor", "BTM Layout", "Hebbal", "Rajajinagar", "Sadashivanagar"]
};

// Procedural generator arrays
const chennaiBrandPrefixes = [
  "Sangeetha Veg", "Adyar Ananda Bhavan (A2B)", "Anjappar Chettinad", "Dindigul Thalappakatti", 
  "Ponnusamy Non-Veg", "Murugan Idli Shop", "Buhari", "Junior Kuppanna", "Karaikudi Mess", 
  "Madras Coffee House", "Geetham Veg", "Saravana Bhavan", "Madras Central Mess", "Sri Krishna", 
  "Chettinad Durbar", "Hot Chips Veg", "Vasanta Bhavan", "Kovai Alankar Vilas", "Grand Chennai Sweets",
  "Rayar's Mess", "Mylapore Filter Coffee", "Sree Gupta Bhavan", "Salem RR Biryani", "Amma Unavagam",
  "Kannappa Restaurant", "Aasife Biryani", "Erode Amman Mess", "Dindigul Venu Biryani", "Nellai Mess"
];

const bangaloreBrandPrefixes = [
  "Mavalli Tiffin Room (MTR)", "Empire", "Meghana Foods", "Corner House", "Vidyarthi Bhavan", 
  "CTR Shri Sagar", "Nagarjuna Andhra", "Truffles", "Leon Grill", "Udupi Grand Veg", 
  "Anand Sweets & Savouries", "Asha Sweet Center", "Nandhini Deluxe", "The Biere Club Kitchen", 
  "Lakeview Milkbar", "Toit Brewery Kitchen", "Sardarji Ka Dhaba", "Kota Kachori Hub", 
  "Hole in the Wall", "Glen's Bakehouse", "Smally's Resto Cafe", "Chitti Tiffin Room", 
  "CTR Express", "Namma Metro Mess", "Veena Stores", "Hari Super Sandwich", "Uipies Veg", "Gully Biryani"
];

const brandSuffixes = [
  "Restaurant", "Hotel", "Mess", "Kitchen", "Tiffin Room", "Biryani Hub", "Foods", 
  "Express", "Diner", "Cafe", "Bakehouse", "Corner", "Spices", "Chaat & Sweets"
];

const allCuisinesCombinations = [
  ["South Indian", "Pure Veg"],
  ["Biryani", "South Indian"],
  ["Chettinad", "Biryani"],
  ["North Indian", "Chinese"],
  ["Burgers", "Fast Food"],
  ["Pizzas", "Italian"],
  ["Desserts", "Ice Cream"],
  ["Beverages", "Snacks"],
  ["Andhra", "Biryani"],
  ["Rolls", "Wraps"]
];

// Helper to pick random item
const randomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Helper to generate a unique list of menu items based on cuisines
function generateMenuForCuisines(cuisines, startIdOffset) {
  const menu = [];
  let dishIndex = 1;
  
  cuisines.forEach(cuisine => {
    const templates = dishTemplates[cuisine] || dishTemplates["South Indian"];
    
    // Pick 3-4 items from each of the restaurant's cuisines
    const count = Math.min(templates.length, 3 + Math.floor(Math.random() * 2));
    const shuffled = [...templates].sort(() => 0.5 - Math.random());
    
    for (let i = 0; i < count; i++) {
      const temp = shuffled[i];
      const imageList = foodImages[temp.type] || foodImages["northIndian"];
      const finalImage = randomItem(imageList);
      
      menu.push({
        id: `dish-gen-${startIdOffset}-${dishIndex++}`,
        name: temp.name,
        price: temp.price + (Math.floor(Math.random() * 9) * 5) - 10, // Slight price randomization
        rating: +(4.0 + Math.random() * 0.9).toFixed(1),
        isVeg: temp.isVeg,
        description: temp.desc,
        image: finalImage,
        category: i === 0 ? "Recommended" : (temp.type === "dessert" ? "Desserts" : (temp.type === "beverage" ? "Beverages" : "Main Course"))
      });
    }
  });
  
  return menu;
}

// Generate the full database procedurally
const generateDatabase = () => {
  const list = [...explicitRestaurants];
  let genId = 18;
  
  // 1. Generate Chennai restaurants until we have 175
  const currentChennaiCount = list.filter(r => r.city === "Chennai").length;
  const chennaiToGen = 175 - currentChennaiCount;
  
  for (let i = 1; i <= chennaiToGen; i++) {
    const prefix = randomItem(chennaiBrandPrefixes);
    const suffix = randomItem(brandSuffixes);
    const name = `${prefix} ${suffix} ${i}`; // Ensure name is unique
    
    const cuisines = randomItem(allCuisinesCombinations);
    const rating = +(3.8 + Math.random() * 1.1).toFixed(1);
    const area = randomItem(cityAreas["Chennai"]);
    const image = randomItem(foodImages.restaurantCovers);
    
    list.push({
      id: `rest-${genId++}`,
      name: name,
      cuisines: cuisines,
      rating: rating,
      ratingsCount: `${Math.floor(200 + Math.random() * 4000)}+ ratings`,
      deliveryTime: 15 + Math.floor(Math.random() * 30),
      distance: `${(0.5 + Math.random() * 6).toFixed(1)} km`,
      costForTwo: 200 + Math.floor(Math.random() * 6) * 50,
      isVeg: cuisines.includes("Pure Veg"),
      city: "Chennai",
      image: image,
      bannerImage: image,
      address: `${area}, Chennai, Tamil Nadu`,
      menu: generateMenuForCuisines(cuisines, genId)
    });
  }
  
  // 2. Generate Bangalore restaurants until we have 73
  const currentBangaloreCount = list.filter(r => r.city === "Bangalore").length;
  const bangaloreToGen = 73 - currentBangaloreCount;
  
  for (let i = 1; i <= bangaloreToGen; i++) {
    const prefix = randomItem(bangaloreBrandPrefixes);
    const suffix = randomItem(brandSuffixes);
    const name = `${prefix} ${suffix} ${i}`; // Ensure name is unique
    
    const cuisines = randomItem(allCuisinesCombinations);
    const rating = +(3.9 + Math.random() * 1.0).toFixed(1);
    const area = randomItem(cityAreas["Bangalore"]);
    const image = randomItem(foodImages.restaurantCovers);
    
    list.push({
      id: `rest-${genId++}`,
      name: name,
      cuisines: cuisines,
      rating: rating,
      ratingsCount: `${Math.floor(200 + Math.random() * 4000)}+ ratings`,
      deliveryTime: 15 + Math.floor(Math.random() * 30),
      distance: `${(0.5 + Math.random() * 6).toFixed(1)} km`,
      costForTwo: 200 + Math.floor(Math.random() * 6) * 50,
      isVeg: cuisines.includes("Pure Veg"),
      city: "Bangalore",
      image: image,
      bannerImage: image,
      address: `${area}, Bangalore, Karnataka`,
      menu: generateMenuForCuisines(cuisines, genId)
    });
  }
  
  return list;
};

// Run generator immediately and export
const restaurantsData = generateDatabase();

const cuisinesList = [
  "All Cuisines",
  "Biryani",
  "North Indian",
  "South Indian",
  "Chinese",
  "Burgers",
  "Pizzas",
  "Beverages",
  "Snacks",
  "Desserts",
  "Rolls",
  "Chettinad",
  "Andhra"
];

const citiesList = [
  "All Cities",
  "Chennai",
  "Bangalore",
  "Delhi NCR"
];
