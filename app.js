// Application State Manager
const state = {
  currentView: 'home',          // home, restaurant-details, cart, tracking
  selectedRestaurantId: null,   // active restaurant for details view
  activeCity: 'All Cities',     // city filter
  activeCuisine: 'All Cuisines', // cuisine filter
  searchQuery: '',              // header search input
  vegOnly: false,               // veg-only switch
  rating4Plus: false,           // 4.0+ rating filter
  sortBy: 'default',            // default, rating, deliveryTime, costLowHigh, costHighLow
  
  // Cart Structure: { restaurantId, restaurantName, items: [ { dish, quantity } ] }
  cart: {
    restaurantId: null,
    restaurantName: null,
    items: []
  },
  
  // User Authentication
  user: {
    isLoggedIn: false,
    name: '',
    email: '',
    address: 'H-15, Sector 63, Noida, Uttar Pradesh - 201301',
    phone: ''
  },
  
  // Current active tracking order ID
  activeOrderId: null,
  trackingTimer: null
};

// --- Initial Setup and Event Handling ---
document.addEventListener('DOMContentLoaded', () => {
  loadLocalStorage();
  initCityFilters();
  initCuisineFilters();
  bindEvents();
  renderApp();
});

// Load session data
function loadLocalStorage() {
  const savedUser = localStorage.getItem('food_delivery_user');
  if (savedUser) {
    state.user = JSON.parse(savedUser);
  }
  
  const savedCart = localStorage.getItem('food_delivery_cart');
  if (savedCart) {
    state.cart = JSON.parse(savedCart);
  }
  
  // Theme management
  const savedTheme = localStorage.getItem('food_delivery_theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);
  
  updateHeaderState();
  updateCartBadge();
}

// Bind Global UI interactions
function bindEvents() {
  // Navigation Logo click
  document.getElementById('nav-logo').addEventListener('click', () => {
    navigateTo('home');
  });

  // Search input change handler
  const searchInput = document.getElementById('search-input');
  searchInput.addEventListener('input', (e) => {
    state.searchQuery = e.target.value.trim().toLowerCase();
    // Search is best executed on the home view
    if (state.currentView !== 'home') {
      navigateTo('home');
      // Set the query back in the search input since it might clear or lose focus on redraw
      document.getElementById('search-input').value = e.target.value;
    } else {
      renderRestaurants();
    }
  });

  // Veg only switch
  document.getElementById('veg-only-input').addEventListener('change', (e) => {
    state.vegOnly = e.target.checked;
    renderRestaurants();
  });

  // 4.0+ Star filter
  document.getElementById('rating-filter-btn').addEventListener('click', (e) => {
    state.rating4Plus = !state.rating4Plus;
    e.target.classList.toggle('active', state.rating4Plus);
    renderRestaurants();
  });

  // Sorting control
  document.getElementById('sort-select').addEventListener('change', (e) => {
    state.sortBy = e.target.value;
    renderRestaurants();
  });

  // Cart Button Click
  document.getElementById('nav-cart-btn').addEventListener('click', () => {
    navigateTo('cart');
  });

  // Theme Toggle Click
  document.getElementById('theme-toggle-btn').addEventListener('click', toggleTheme);

  // Authentication Buttons
  document.getElementById('nav-login-btn').addEventListener('click', () => openAuthModal('login'));
  document.getElementById('nav-signup-btn').addEventListener('click', () => openAuthModal('signup'));
  
  // Auth Form Submission
  document.getElementById('auth-form-el').addEventListener('submit', handleAuthSubmit);
  
  // Modal close handlers
  document.getElementById('close-auth-modal').addEventListener('click', closeAuthModal);
  document.getElementById('auth-modal-overlay').addEventListener('click', (e) => {
    if (e.target.id === 'auth-modal-overlay') closeAuthModal();
  });
  
  // Replace Cart Modal handlers
  document.getElementById('replace-cart-cancel').addEventListener('click', closeReplaceCartModal);
  document.getElementById('replace-cart-confirm').addEventListener('click', confirmReplaceCart);
}

// Initialize City filter tabs
function initCityFilters() {
  const container = document.getElementById('city-filters-container');
  container.innerHTML = '';
  
  citiesList.forEach((city, idx) => {
    const button = document.createElement('button');
    button.className = `filter-pill ${idx === 0 ? 'active' : ''}`;
    button.textContent = city.toUpperCase();
    button.addEventListener('click', () => {
      document.querySelectorAll('#city-filters-container .filter-pill').forEach(pill => pill.classList.remove('active'));
      button.classList.add('active');
      
      state.activeCity = city;
      renderRestaurants();
    });
    container.appendChild(button);
  });
}

// Initialize horizontal scroll list of cuisines
function initCuisineFilters() {
  const container = document.getElementById('cuisine-filters-container');
  container.innerHTML = '';
  
  cuisinesList.forEach((cuisine, idx) => {
    const button = document.createElement('button');
    button.className = `filter-pill ${idx === 0 ? 'active' : ''}`;
    button.textContent = cuisine;
    button.addEventListener('click', () => {
      // Toggle active states within cuisine container only
      document.querySelectorAll('#cuisine-filters-container .filter-pill').forEach(pill => pill.classList.remove('active'));
      button.classList.add('active');
      
      state.activeCuisine = cuisine;
      renderRestaurants();
    });
    container.appendChild(button);
  });
}

// --- Navigation / Routing ---
function navigateTo(view, params = {}) {
  // Clear any existing intervals if we navigate away from tracking page
  if (state.currentView === 'tracking' && view !== 'tracking') {
    clearInterval(state.trackingTimer);
  }
  
  state.currentView = view;
  if (view === 'restaurant-details') {
    state.selectedRestaurantId = params.restaurantId;
  }
  
  renderApp();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function renderApp() {
  // Deactivate all view sections
  document.querySelectorAll('.page-view').forEach(view => view.classList.remove('active'));
  
  // Activate target view
  const targetViewEl = document.getElementById(`${state.currentView}-view`);
  if (targetViewEl) {
    targetViewEl.classList.add('active');
  }
  
  // Trigger specific view renders
  if (state.currentView === 'home') {
    renderRestaurants();
  } else if (state.currentView === 'restaurant-details') {
    renderRestaurantDetails();
  } else if (state.currentView === 'cart') {
    renderCart();
  } else if (state.currentView === 'tracking') {
    renderOrderTracker();
  }
}

// --- Views Rendering Engine ---

// Renders the list of restaurants and matching/popular dishes on Home Page
function renderRestaurants() {
  const restGrid = document.getElementById('restaurants-grid');
  const dishGrid = document.getElementById('dishes-grid');
  const restHeader = document.getElementById('matched-restaurants-header');
  const dishHeader = document.getElementById('matched-dishes-header');
  
  restGrid.innerHTML = '';
  dishGrid.innerHTML = '';
  
  // Filter restaurants
  let filteredRest = restaurantsData.filter(rest => {
    // City matches
    const matchesCity = (state.activeCity === 'All Cities') || 
                        rest.city.toLowerCase() === state.activeCity.toLowerCase();
                        
    // Cuisine matches
    const matchesCuisine = (state.activeCuisine === 'All Cuisines') || 
                           rest.cuisines.some(c => c.toLowerCase() === state.activeCuisine.toLowerCase());
                           
    // Search query matches restaurant name, cuisines, or menu items
    const matchesSearch = rest.name.toLowerCase().includes(state.searchQuery) ||
                          rest.cuisines.some(c => c.toLowerCase().includes(state.searchQuery)) ||
                          rest.menu.some(dish => dish.name.toLowerCase().includes(state.searchQuery));
                          
    // Veg only matches
    const matchesVeg = !state.vegOnly || rest.isVeg || rest.menu.every(dish => dish.isVeg);
    
    // Rating 4.0+ matches
    const matchesRating = !state.rating4Plus || rest.rating >= 4.0;
    
    return matchesCity && matchesCuisine && matchesSearch && matchesVeg && matchesRating;
  });
  
  // Filter dishes
  let filteredDishes = [];
  if (state.searchQuery === '') {
    // Pick one Recommended dish from each restaurant to display as "Popular Dishes" on load
    restaurantsData.forEach(rest => {
      const matchesCity = (state.activeCity === 'All Cities') || 
                          rest.city.toLowerCase() === state.activeCity.toLowerCase();
      if (!matchesCity) return;
      
      const recDish = rest.menu.find(d => d.category === "Recommended");
      if (recDish) {
        filteredDishes.push({ dish: recDish, restaurantId: rest.id, restaurantName: rest.name });
      }
    });
    // Limit to 12 popular items
    filteredDishes = filteredDishes.slice(0, 12);
    
    // Apply filters to popular dishes
    if (state.activeCuisine !== 'All Cuisines') {
      filteredDishes = filteredDishes.filter(item => 
        item.dish.name.toLowerCase().includes(state.activeCuisine.toLowerCase()) || 
        item.dish.category.toLowerCase().includes(state.activeCuisine.toLowerCase()) ||
        item.dish.description.toLowerCase().includes(state.activeCuisine.toLowerCase())
      );
    }
    if (state.vegOnly) {
      filteredDishes = filteredDishes.filter(item => item.dish.isVeg);
    }
  } else {
    // User is searching: find all matching dishes across all restaurants
    restaurantsData.forEach(rest => {
      const matchesCity = (state.activeCity === 'All Cities') || 
                          rest.city.toLowerCase() === state.activeCity.toLowerCase();
      if (!matchesCity) return;
      
      rest.menu.forEach(dish => {
        const matchesSearch = dish.name.toLowerCase().includes(state.searchQuery) ||
                              dish.description.toLowerCase().includes(state.searchQuery) ||
                              rest.name.toLowerCase().includes(state.searchQuery);
                              
        const matchesCuisine = (state.activeCuisine === 'All Cuisines') || 
                               rest.cuisines.some(c => c.toLowerCase() === state.activeCuisine.toLowerCase());
                               
        const matchesVeg = !state.vegOnly || dish.isVeg;
        
        if (matchesSearch && matchesCuisine && matchesVeg) {
          filteredDishes.push({ dish, restaurantId: rest.id, restaurantName: rest.name });
        }
      });
    });
  }
  
  // Sorting logic for restaurants
  if (state.sortBy === 'rating') {
    filteredRest.sort((a, b) => b.rating - a.rating);
  } else if (state.sortBy === 'deliveryTime') {
    filteredRest.sort((a, b) => a.deliveryTime - b.deliveryTime);
  } else if (state.sortBy === 'costLowHigh') {
    filteredRest.sort((a, b) => a.costForTwo - b.costForTwo);
  } else if (state.sortBy === 'costHighLow') {
    filteredRest.sort((a, b) => b.costForTwo - a.costForTwo);
  }
  
  // Sorting logic for dishes
  if (state.sortBy === 'rating') {
    filteredDishes.sort((a, b) => (b.dish.rating || 0) - (a.dish.rating || 0));
  } else if (state.sortBy === 'costLowHigh') {
    filteredDishes.sort((a, b) => a.dish.price - b.dish.price);
  } else if (state.sortBy === 'costHighLow') {
    filteredDishes.sort((a, b) => b.dish.price - a.dish.price);
  }
  
  // Setup headers toggling
  if (state.searchQuery === '') {
    restHeader.textContent = 'EXPLORE RESTAURANTS';
    restHeader.style.display = 'block';
    dishHeader.textContent = 'POPULAR DISHES ON EAGLE';
    dishHeader.style.display = filteredDishes.length > 0 ? 'block' : 'none';
  } else {
    restHeader.textContent = 'MATCHING RESTAURANTS';
    restHeader.style.display = filteredRest.length > 0 ? 'block' : 'none';
    dishHeader.textContent = 'MATCHING DISHES';
    dishHeader.style.display = filteredDishes.length > 0 ? 'block' : 'none';
  }
  
  // If both empty, show empty state graphic
  if (filteredRest.length === 0 && filteredDishes.length === 0) {
    restHeader.style.display = 'none';
    dishHeader.style.display = 'none';
    restGrid.innerHTML = `
      <div class="empty-state" style="grid-column: 1 / -1; width: 100%;">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/></svg>
        <h3>No restaurants or dishes found</h3>
        <p>Try refining your search terms or filters</p>
      </div>
    `;
    return;
  }
  
  // Render Restaurants
  filteredRest.forEach(rest => {
    const card = document.createElement('div');
    card.className = 'restaurant-card';
    card.addEventListener('click', () => {
      navigateTo('restaurant-details', { restaurantId: rest.id });
    });
    
    const isVegBadge = rest.isVeg ? `<div class="card-veg-indicator">Veg Only</div>` : '';
    
    card.innerHTML = `
      <div class="card-img-wrapper">
        <img class="card-img" src="${rest.image}" alt="${rest.name}" onerror="handleImgError(this)">
        ${isVegBadge}
        <div class="card-rating-badge ${rest.rating >= 4.0 ? 'high-rating' : ''}">
          <svg style="width: 12px; height: 12px; fill: currentColor" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
          ${rest.rating}
        </div>
      </div>
      <div class="card-content">
        <h3 class="card-title">${rest.name}</h3>
        <p class="card-cuisines">${rest.cuisines.join(', ')}</p>
        <div class="card-meta">
          <span>
            <svg style="width: 14px; height: 14px; fill: currentColor;" viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>
            ${rest.deliveryTime} MINS
          </span>
          <span>•</span>
          <span>${rest.distance}</span>
          <span>•</span>
          <span>₹${rest.costForTwo} FOR TWO</span>
        </div>
      </div>
    `;
    restGrid.appendChild(card);
  });
  
  // Render Dishes
  filteredDishes.forEach(item => {
    const dish = item.dish;
    const restId = item.restaurantId;
    const restName = item.restaurantName;
    
    const cartItem = state.cart.restaurantId === restId ? state.cart.items.find(i => i.dish.id === dish.id) : null;
    const currentQty = cartItem ? cartItem.quantity : 0;
    const vegClass = dish.isVeg ? '' : 'non-veg';
    
    const itemEl = document.createElement('div');
    itemEl.className = 'dish-item';
    itemEl.style.flexDirection = 'column';
    itemEl.style.justifyContent = 'space-between';
    itemEl.style.padding = '1.25rem';
    
    itemEl.innerHTML = `
      <div>
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.5rem;">
          <div class="dish-veg-box ${vegClass}">
            <div class="dish-veg-dot"></div>
          </div>
          <span style="font-family: var(--font-sans-meat); font-size: 11px; color: var(--color-impossible-red); text-transform: uppercase; border: 1px solid var(--color-impossible-red); padding: 2px 6px; cursor: pointer; border-radius: 4px;" id="rest-link-${dish.id}-${restId}">
            FROM: ${restName}
          </span>
        </div>
        <h3 class="dish-name" style="font-size: 1.15rem; line-height: 1.1;">${dish.name}</h3>
        <p class="dish-price">₹${dish.price}</p>
        ${dish.rating ? `<span class="dish-rating" style="margin-bottom: 0.5rem;"><svg style="width:12px;height:12px;fill:currentColor" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>${dish.rating}</span>` : ''}
        <p class="dish-desc" style="display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; margin-bottom: 1rem;">${dish.description}</p>
      </div>
      <div class="dish-actions-wrapper" style="width: 100%; height: 80px; display: flex; flex-direction: row; justify-content: space-between; align-items: flex-end;">
        <img class="dish-image" src="${dish.image}" alt="${dish.name}" style="width: 70px; height: 70px; margin-bottom: 0;" onerror="handleImgError(this)">
        <div class="dish-add-control-box" style="position: static; transform: none; width: 96px; height: 32px;">
          <button class="dish-add-btn" id="add-btn-${dish.id}" style="display: ${currentQty > 0 ? 'none' : 'block'}">Add</button>
          <div class="qty-control ${currentQty > 0 ? 'active' : ''}" id="qty-ctrl-${dish.id}">
            <button class="qty-btn qty-minus" data-id="${dish.id}">-</button>
            <div class="qty-val">${currentQty}</div>
            <button class="qty-btn qty-plus" data-id="${dish.id}">+</button>
          </div>
        </div>
      </div>
    `;
    
    // Bind restaurant link navigation
    itemEl.querySelector(`#rest-link-${dish.id}-${restId}`).addEventListener('click', () => {
      navigateTo('restaurant-details', { restaurantId: restId });
    });
    
    // Bind Add click
    itemEl.querySelector(`#add-btn-${dish.id}`).addEventListener('click', () => {
      handleAddItem(dish, restId, restName);
    });
    
    // Bind Qty buttons
    itemEl.querySelector('.qty-minus').addEventListener('click', () => {
      handleUpdateQty(dish.id, -1);
    });
    itemEl.querySelector('.qty-plus').addEventListener('click', () => {
      handleUpdateQty(dish.id, 1);
    });
    
    dishGrid.appendChild(itemEl);
  });
}

// Renders the Menu Details Page for a single restaurant
function renderRestaurantDetails() {
  const rest = restaurantsData.find(r => r.id === state.selectedRestaurantId);
  if (!rest) {
    navigateTo('home');
    return;
  }
  
  // Render Hero
  const heroContainer = document.getElementById('restaurant-hero-container');
  heroContainer.innerHTML = `
    <button class="restaurant-back-btn" id="back-to-home-btn">
      <svg style="width: 16px; height: 16px; fill: currentColor" viewBox="0 0 24 24"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></svg>
      Back to restaurants
    </button>
    <img src="${rest.bannerImage}" alt="${rest.name}">
    <div class="restaurant-hero-overlay"></div>
    <div class="restaurant-hero-info">
      <h1 class="restaurant-name">${rest.name}</h1>
      <p class="restaurant-cuisines-list">${rest.cuisines.join(', ')}</p>
      <div class="restaurant-stat-strip">
        <span class="restaurant-stat-rating">
          <svg style="width: 14px; height: 14px; fill: white; margin-right: 2px" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
          ${rest.rating}
        </span>
        <span>|</span>
        <span>${rest.deliveryTime} mins delivery time</span>
        <span>|</span>
        <span>₹${rest.costForTwo} for two</span>
        <span>|</span>
        <span style="color: var(--text-muted)">${rest.address}</span>
      </div>
    </div>
  `;
  
  document.getElementById('back-to-home-btn').addEventListener('click', () => navigateTo('home'));
  
  // Group menu by categories
  const categories = {};
  rest.menu.forEach(dish => {
    if (!categories[dish.category]) {
      categories[dish.category] = [];
    }
    categories[dish.category].push(dish);
  });
  
  // Render Sidebar Category list
  const sidebar = document.getElementById('menu-sidebar-container');
  sidebar.innerHTML = '<h3 class="menu-sidebar-title">Categories</h3>';
  
  Object.keys(categories).forEach((cat, idx) => {
    const link = document.createElement('div');
    link.className = `menu-category-link ${idx === 0 ? 'active' : ''}`;
    link.innerHTML = `
      <span>${cat.toUpperCase()}</span>
      <span class="menu-sidebar-badge">${categories[cat].length}</span>
    `;
    link.addEventListener('click', () => {
      document.querySelectorAll('.menu-category-link').forEach(l => l.classList.remove('active'));
      link.classList.add('active');
      
      const targetSec = document.getElementById(`section-${cat.replace(/\s+/g, '-')}`);
      if (targetSec) {
        targetSec.scrollIntoView({ behavior: 'smooth' });
      }
    });
    sidebar.appendChild(link);
  });
  
  // Render Dishes Section
  const dishesPanel = document.getElementById('menu-dishes-panel');
  dishesPanel.innerHTML = '';
  
  Object.entries(categories).forEach(([categoryName, dishesList]) => {
    const section = document.createElement('section');
    section.className = 'menu-section';
    section.id = `section-${categoryName.replace(/\s+/g, '-')}`;
    
    section.innerHTML = `
      <h2 class="menu-section-header">${categoryName} (${dishesList.length})</h2>
      <div class="dishes-list"></div>
    `;
    
    const listContainer = section.querySelector('.dishes-list');
    
    dishesList.forEach(dish => {
      const itemEl = document.createElement('div');
      itemEl.className = 'dish-item';
      
      // Get current quantity in cart
      const cartItem = state.cart.restaurantId === rest.id ? state.cart.items.find(i => i.dish.id === dish.id) : null;
      const currentQty = cartItem ? cartItem.quantity : 0;
      
      const vegClass = dish.isVeg ? '' : 'non-veg';
      
      itemEl.innerHTML = `
        <div class="dish-info">
          <div class="dish-veg-box ${vegClass}">
            <div class="dish-veg-dot"></div>
          </div>
          <h3 class="dish-name">${dish.name}</h3>
          <p class="dish-price">₹${dish.price}</p>
          ${dish.rating ? `<span class="dish-rating"><svg style="width:12px;height:12px;fill:currentColor" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>${dish.rating}</span>` : ''}
          <p class="dish-desc">${dish.description}</p>
        </div>
        <div class="dish-actions-wrapper">
          <img class="dish-image" src="${dish.image}" alt="${dish.name}" onerror="handleImgError(this)">
          <div class="dish-add-control-box">
            <button class="dish-add-btn" id="add-btn-${dish.id}" style="display: ${currentQty > 0 ? 'none' : 'block'}">Add</button>
            <div class="qty-control ${currentQty > 0 ? 'active' : ''}" id="qty-ctrl-${dish.id}">
              <button class="qty-btn qty-minus" data-id="${dish.id}">-</button>
              <div class="qty-val">${currentQty}</div>
              <button class="qty-btn qty-plus" data-id="${dish.id}">+</button>
            </div>
          </div>
        </div>
      `;
      
      // Bind Add click
      itemEl.querySelector(`#add-btn-${dish.id}`).addEventListener('click', () => {
        handleAddItem(dish, rest.id, rest.name);
      });
      
      // Bind Qty buttons
      itemEl.querySelector('.qty-minus').addEventListener('click', () => {
        handleUpdateQty(dish.id, -1);
      });
      itemEl.querySelector('.qty-plus').addEventListener('click', () => {
        handleUpdateQty(dish.id, 1);
      });
      
      listContainer.appendChild(itemEl);
    });
    
    dishesPanel.appendChild(section);
  });
}

// Renders the Cart Summary Page
function renderCart() {
  const view = document.getElementById('cart-view');
  view.innerHTML = '';
  
  if (!state.cart.items || state.cart.items.length === 0) {
    view.innerHTML = `
      <div class="cart-empty-view">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.9 2 1.99 2 2-.9 2-2-.9-2-2-2z"/></svg>
        <h2>Your Cart is Empty</h2>
        <p>Good food is always cooking! Go ahead, order some yummy items from the menu.</p>
        <button class="shop-now-btn" id="shop-now-btn">Browse Restaurants</button>
      </div>
    `;
    document.getElementById('shop-now-btn').addEventListener('click', () => navigateTo('home'));
    return;
  }
  
  // Calculate Totals
  let subtotal = 0;
  state.cart.items.forEach(item => {
    subtotal += item.dish.price * item.quantity;
  });
  
  const gst = Math.round(subtotal * 0.18); // 18% GST
  const deliveryCharge = 40; // Flat ₹40
  const total = subtotal + gst + deliveryCharge;
  
  // Create grid split template
  const layout = document.createElement('div');
  layout.className = 'cart-layout';
  
  // Left Column (Delivery & Payment details)
  const leftCol = document.createElement('div');
  leftCol.className = 'cart-left-col';
  
  // Delivery address card
  const addressCard = document.createElement('div');
  addressCard.className = 'checkout-card';
  addressCard.innerHTML = `
    <h3 class="checkout-card-title">
      <svg viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
      Delivery Address
    </h3>
    <div class="address-input-group">
      <div class="input-box-wrapper">
        <textarea class="form-input form-textarea" id="delivery-address-textarea" placeholder="Enter full delivery address">${state.user.address}</textarea>
      </div>
    </div>
  `;
  
  // Payment methods card
  const paymentCard = document.createElement('div');
  paymentCard.className = 'checkout-card';
  paymentCard.innerHTML = `
    <h3 class="checkout-card-title">
      <svg viewBox="0 0 24 24"><path d="M21 18v1c0 1.1-.9 2-2 2H5c-1.11 0-2-.9-2-2V5c0-1.1.89-2 2-2h14c1.1 0 2 .9 2 2v1h-9c-1.11 0-2 .9-2 2v8c0 1.1.89 2 2 2h9zm-9-2h10V8H12v8zm4-2.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/></svg>
      Choose Payment Method
    </h3>
    <div class="payment-options-grid">
      <div class="payment-option-card selected" data-method="upi">
        <svg viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-5 14H4v-4h11v4zm0-5H4V9h11v4zm5 5h-4V9h4v9z"/></svg>
        <div>BHIM UPI</div>
      </div>
      <div class="payment-option-card" data-method="cards">
        <svg viewBox="0 0 24 24"><path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"/></svg>
        <div>Credit / Debit</div>
      </div>
      <div class="payment-option-card" data-method="cod">
        <svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H7c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.04-.42 1.99-1.07 2.75z"/></svg>
        <div>Cash On Delivery</div>
      </div>
    </div>
  `;
  
  leftCol.appendChild(addressCard);
  leftCol.appendChild(paymentCard);
  
  // Right Column (Bill summary)
  const rightCol = document.createElement('div');
  rightCol.className = 'cart-right-col';
  
  const billCard = document.createElement('div');
  billCard.className = 'bill-card';
  
  // List elements inside bill
  let itemRowsHTML = '';
  state.cart.items.forEach(item => {
    const isVegFlag = item.dish.isVeg ? '' : 'non-veg';
    itemRowsHTML += `
      <div class="bill-item-row">
        <div class="bill-item-details">
          <div class="bill-item-veg ${isVegFlag}">
            <div class="bill-item-veg-dot"></div>
          </div>
          <span class="bill-item-name" title="${item.dish.name}">${item.dish.name}</span>
          <span class="bill-item-math">x ${item.quantity}</span>
        </div>
        <span class="bill-item-price">₹${item.dish.price * item.quantity}</span>
      </div>
    `;
  });
  
  billCard.innerHTML = `
    <div class="bill-restaurant-header">
      <h4 class="bill-restaurant-name">${state.cart.restaurantName}</h4>
      <p class="bill-restaurant-address">Ordering Food Items</p>
    </div>
    <div class="bill-items-list">
      ${itemRowsHTML}
    </div>
    <div class="bill-breakdown">
      <div class="bill-breakdown-row">
        <span>Item Total</span>
        <span>₹${subtotal}</span>
      </div>
      <div class="bill-breakdown-row">
        <span>Govt Taxes & GST (18%)</span>
        <span>₹${gst}</span>
      </div>
      <div class="bill-breakdown-row">
        <span>Delivery Partner Fee</span>
        <span>₹${deliveryCharge}</span>
      </div>
      <div class="bill-total-row">
        <span>To Pay</span>
        <span>₹${total}</span>
      </div>
    </div>
    <button class="place-order-btn" id="place-order-btn">PLACE ORDER & TRACK</button>
  `;
  
  rightCol.appendChild(billCard);
  layout.appendChild(leftCol);
  layout.appendChild(rightCol);
  
  view.appendChild(layout);
  
  // Bind Payment select
  const paymentOptions = paymentCard.querySelectorAll('.payment-option-card');
  paymentOptions.forEach(opt => {
    opt.addEventListener('click', () => {
      paymentOptions.forEach(o => o.classList.remove('selected'));
      opt.classList.add('selected');
    });
  });
  
  // Bind Place Order Trigger
  document.getElementById('place-order-btn').addEventListener('click', handlePlaceOrder);
}

// Renders the simulated live tracking status
function renderOrderTracker() {
  const view = document.getElementById('tracking-view');
  view.innerHTML = `
    <div class="tracker-container">
      <div class="tracker-header">
        <span class="tracker-id">ORDER ID: ${state.activeOrderId || 'OD' + Math.floor(Math.random() * 900000 + 100000)}</span>
        <h2 class="tracker-eta" id="tracker-eta-timer">Arriving in 25 Mins</h2>
      </div>
      
      <div class="tracker-status-bar">
        <div class="tracker-status-line" id="tracker-status-line"></div>
        
        <div class="tracker-step completed" id="step-1">
          <div class="tracker-dot"></div>
          <h4 class="tracker-step-title">Order Confirmed</h4>
          <p class="tracker-step-desc">Your order has been received by ${state.cart.restaurantName || 'the restaurant'}</p>
        </div>
        
        <div class="tracker-step" id="step-2">
          <div class="tracker-dot"></div>
          <h4 class="tracker-step-title">Preparing Food</h4>
          <p class="tracker-step-desc">Chef is preparing your tasty meal with extra hygiene</p>
        </div>
        
        <div class="tracker-step" id="step-3">
          <div class="tracker-dot"></div>
          <h4 class="tracker-step-title">Out for Delivery</h4>
          <p class="tracker-step-desc">Our delivery partner is rushing towards your address</p>
        </div>
        
        <div class="tracker-step" id="step-4">
          <div class="tracker-dot"></div>
          <h4 class="tracker-step-title">Delivered</h4>
          <p class="tracker-step-desc">Enjoy your delicious food! Don't forget to rate us.</p>
        </div>
      </div>
    </div>
  `;
  
  // Start simulation of order tracking
  simulateOrderProgress();
}

// Simulated real-time delivery tracking steps
function simulateOrderProgress() {
  let progressStep = 1;
  const etaTimer = document.getElementById('tracker-eta-timer');
  const statusLine = document.getElementById('tracker-status-line');
  
  const stepTimes = [25, 20, 8, 0];
  
  const runStepUpdate = () => {
    progressStep++;
    if (progressStep > 4) {
      clearInterval(state.trackingTimer);
      return;
    }
    
    // Update ETA label text
    const minsLeft = stepTimes[progressStep - 1];
    if (minsLeft === 0) {
      etaTimer.textContent = 'Delivered!';
      etaTimer.style.color = 'var(--accent-color)';
    } else {
      etaTimer.textContent = `Arriving in ${minsLeft} Mins`;
    }
    
    // Update UI status dots and lines
    for (let i = 1; i <= 4; i++) {
      const stepEl = document.getElementById(`step-${i}`);
      if (i < progressStep) {
        stepEl.className = 'tracker-step completed';
      } else if (i === progressStep) {
        stepEl.className = 'tracker-step active';
      } else {
        stepEl.className = 'tracker-step';
      }
    }
    
    // Update active connection bar heights
    const lineHeights = [0, 33, 66, 100];
    statusLine.style.height = `${lineHeights[progressStep - 1]}%`;
    
    if (progressStep === 4) {
      showToast('Order delivered successfully! Bon appétit!', 'success');
      // Clear cart once order is fully processed
      state.cart = { restaurantId: null, restaurantName: null, items: [] };
      localStorage.removeItem('food_delivery_cart');
      updateCartBadge();
    } else {
      showToast('Order status updated!', 'success');
    }
  };
  
  // Initial step setup
  document.getElementById('step-1').className = 'tracker-step completed';
  document.getElementById('step-2').className = 'tracker-step active';
  statusLine.style.height = '0%';
  
  // Trigger update step updates every 8 seconds
  state.trackingTimer = setInterval(runStepUpdate, 8000);
}

// --- Cart Actions and Rules ---

// Triggers when Add button is clicked on Menu
function handleAddItem(dish, restaurantId, restaurantName) {
  // Check Swiggy/Zomato rule: Order from only one restaurant at a time
  if (state.cart.restaurantId && state.cart.restaurantId !== restaurantId) {
    // Show confirmation replace cart modal
    state.pendingItemToAdd = { dish, restaurantId, restaurantName };
    document.getElementById('pending-restaurant-name').textContent = restaurantName;
    document.getElementById('current-cart-restaurant-name').textContent = state.cart.restaurantName;
    document.getElementById('replace-cart-modal').style.display = 'flex';
    return;
  }
  
  // Add item normally
  if (!state.cart.restaurantId) {
    state.cart.restaurantId = restaurantId;
    state.cart.restaurantName = restaurantName;
  }
  
  state.cart.items.push({ dish, quantity: 1 });
  saveCartData();
  
  // Update view UI elements dynamically without full redraw if on details view
  toggleQtyControlUI(dish.id, true, 1);
  updateCartBadge();
  showToast(`${dish.name} added to cart`, 'success');
}

function handleUpdateQty(dishId, delta) {
  const itemIndex = state.cart.items.findIndex(i => i.dish.id === dishId);
  if (itemIndex === -1) return;
  
  const newQty = state.cart.items[itemIndex].quantity + delta;
  if (newQty <= 0) {
    // Remove item
    const removedName = state.cart.items[itemIndex].dish.name;
    state.cart.items.splice(itemIndex, 1);
    toggleQtyControlUI(dishId, false, 0);
    
    // Clear restaurant context if cart is empty
    if (state.cart.items.length === 0) {
      state.cart.restaurantId = null;
      state.cart.restaurantName = null;
    }
    showToast(`${removedName} removed from cart`, 'error');
  } else {
    state.cart.items[itemIndex].quantity = newQty;
    toggleQtyControlUI(dishId, true, newQty);
  }
  
  saveCartData();
  updateCartBadge();
}

function toggleQtyControlUI(dishId, showQty, qtyValue) {
  const addBtns = document.querySelectorAll(`#add-btn-${dishId}`);
  const qtyCtrls = document.querySelectorAll(`#qty-ctrl-${dishId}`);
  
  addBtns.forEach(btn => {
    btn.style.display = showQty ? 'none' : 'block';
  });
  
  qtyCtrls.forEach(ctrl => {
    if (showQty) {
      ctrl.classList.add('active');
      ctrl.querySelector('.qty-val').textContent = qtyValue;
    } else {
      ctrl.classList.remove('active');
      ctrl.querySelector('.qty-val').textContent = '0';
    }
  });
}

function saveCartData() {
  localStorage.setItem('food_delivery_cart', JSON.stringify(state.cart));
}

// Confirmation of replacing items in cart
function confirmReplaceCart() {
  if (state.pendingItemToAdd) {
    const { dish, restaurantId, restaurantName } = state.pendingItemToAdd;
    
    // Clear old cart
    state.cart = {
      restaurantId: restaurantId,
      restaurantName: restaurantName,
      items: [{ dish, quantity: 1 }]
    };
    
    saveCartData();
    updateCartBadge();
    
    // Close modal & redraw
    closeReplaceCartModal();
    renderRestaurantDetails(); // Refresh details view quantities
    showToast(`Cart replaced! Added ${dish.name}`, 'success');
    state.pendingItemToAdd = null;
  }
}

function closeReplaceCartModal() {
  document.getElementById('replace-cart-modal').style.display = 'none';
}

function updateCartBadge() {
  const badge = document.getElementById('cart-badge-count');
  let totalItems = 0;
  if (state.cart && state.cart.items) {
    state.cart.items.forEach(i => totalItems += i.quantity);
  }
  
  if (totalItems > 0) {
    badge.textContent = totalItems;
    badge.style.display = 'flex';
  } else {
    badge.style.display = 'none';
  }
}

// --- Order Placement ---
function handlePlaceOrder() {
  // Address check
  const addressText = document.getElementById('delivery-address-textarea').value.trim();
  if (!addressText) {
    showToast('Please specify a delivery address!', 'error');
    return;
  }
  
  // Save updated address
  state.user.address = addressText;
  if (state.user.isLoggedIn) {
    localStorage.setItem('food_delivery_user', JSON.stringify(state.user));
  }
  
  // Login verification: Force user to login or sign up before order
  if (!state.user.isLoggedIn) {
    showToast('Please login to place your order!', 'error');
    openAuthModal('login');
    return;
  }
  
  // Create mock order
  state.activeOrderId = 'OD' + Math.floor(Math.random() * 900000 + 100000);
  showToast('Order placed successfully!', 'success');
  navigateTo('tracking');
}

// --- Authentication UI & Forms ---
function openAuthModal(mode) {
  const overlay = document.getElementById('auth-modal-overlay');
  const title = document.getElementById('auth-modal-title');
  const subtitle = document.getElementById('auth-modal-subtitle');
  const nameGroup = document.getElementById('auth-name-group');
  const phoneGroup = document.getElementById('auth-phone-group');
  const submitBtn = document.getElementById('auth-submit-btn');
  const prompt = document.getElementById('auth-prompt-msg');
  
  overlay.className = 'modal-overlay show';
  
  // Toggle form structures
  if (mode === 'login') {
    title.textContent = 'Welcome Back';
    subtitle.textContent = 'Sign in to access your orders and saved locations';
    nameGroup.style.display = 'none';
    phoneGroup.style.display = 'none';
    submitBtn.textContent = 'LOGIN';
    prompt.innerHTML = `New to the platform? <span class="auth-switch-link" onclick="openAuthModal('signup')">Create an account</span>`;
    document.getElementById('auth-name-input').removeAttribute('required');
    document.getElementById('auth-phone-input').removeAttribute('required');
  } else {
    title.textContent = 'Create Account';
    subtitle.textContent = 'Sign up to order delicious food and track details';
    nameGroup.style.display = 'block';
    phoneGroup.style.display = 'block';
    submitBtn.textContent = 'SIGN UP';
    prompt.innerHTML = `Already have an account? <span class="auth-switch-link" onclick="openAuthModal('login')">Login here</span>`;
    document.getElementById('auth-name-input').setAttribute('required', 'true');
    document.getElementById('auth-phone-input').setAttribute('required', 'true');
  }
  
  state.authMode = mode;
}

function closeAuthModal() {
  document.getElementById('auth-modal-overlay').className = 'modal-overlay';
}

function handleAuthSubmit(e) {
  e.preventDefault();
  
  const email = document.getElementById('auth-email-input').value.trim();
  const password = document.getElementById('auth-pass-input').value.trim();
  
  if (state.authMode === 'login') {
    // Login mock: accept any user
    state.user.isLoggedIn = true;
    state.user.email = email;
    state.user.name = email.split('@')[0]; // Simple mock username
    showToast(`Welcome back, ${state.user.name}!`, 'success');
  } else {
    // Signup mock
    const name = document.getElementById('auth-name-input').value.trim();
    const phone = document.getElementById('auth-phone-input').value.trim();
    
    state.user.isLoggedIn = true;
    state.user.email = email;
    state.user.name = name;
    state.user.phone = phone;
    showToast(`Account created successfully! Welcome ${name}`, 'success');
  }
  
  localStorage.setItem('food_delivery_user', JSON.stringify(state.user));
  updateHeaderState();
  closeAuthModal();
  
  // If user was placing order and got interrupted, refresh the checkout views
  if (state.currentView === 'cart') {
    renderCart();
  }
}

function updateHeaderState() {
  const guestActions = document.getElementById('nav-guest-actions');
  const userMenu = document.getElementById('nav-user-menu');
  const userInitials = document.getElementById('nav-user-initials');
  const userNameSpan = document.getElementById('nav-user-name');
  
  if (state.user.isLoggedIn) {
    guestActions.style.display = 'none';
    userMenu.style.display = 'block';
    
    const initial = state.user.name ? state.user.name.charAt(0).toUpperCase() : 'U';
    userInitials.textContent = initial;
    userNameSpan.textContent = state.user.name;
    
    // Bind dropdown click toggle
    const profileBtn = document.getElementById('user-profile-toggle');
    const dropdown = document.getElementById('user-menu-dropdown');
    
    // Clear old listeners by cloning
    const newBtn = profileBtn.cloneNode(true);
    profileBtn.parentNode.replaceChild(newBtn, profileBtn);
    
    newBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      dropdown.classList.toggle('show');
    });
    
    // Close dropdown on click outside
    document.addEventListener('click', () => {
      dropdown.classList.remove('show');
    });
    
    // Bind logout
    document.getElementById('logout-btn').addEventListener('click', () => {
      handleLogout();
    });
  } else {
    guestActions.style.display = 'flex';
    userMenu.style.display = 'none';
  }
}

function handleLogout() {
  state.user = {
    isLoggedIn: false,
    name: '',
    email: '',
    address: 'H-15, Sector 63, Noida, Uttar Pradesh - 201301',
    phone: ''
  };
  localStorage.removeItem('food_delivery_user');
  updateHeaderState();
  showToast('Logged out successfully', 'error');
  
  if (state.currentView === 'cart') {
    renderCart();
  }
}

// --- Theme Toggler ---
function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const targetTheme = currentTheme === 'dark' ? 'light' : 'dark';
  
  document.documentElement.setAttribute('data-theme', targetTheme);
  localStorage.setItem('food_delivery_theme', targetTheme);
  updateThemeIcon(targetTheme);
  showToast(`Switched to ${targetTheme} mode!`, 'success');
}

function updateThemeIcon(theme) {
  const btn = document.getElementById('theme-toggle-btn');
  if (theme === 'dark') {
    btn.innerHTML = `
      <svg style="width: 20px; height: 20px; fill: currentColor" viewBox="0 0 24 24">
        <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58c-.39-.39-1.03-.39-1.41 0s-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37c-.39-.39-1.03-.39-1.41 0s-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41l-1.06-1.06zm1.06-10.96c.39-.39.39-1.03 0-1.41s-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06zM7.05 18.01c.39-.39.39-1.03 0-1.41s-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06z"/>
      </svg>
    `;
  } else {
    btn.innerHTML = `
      <svg style="width: 20px; height: 20px; fill: currentColor" viewBox="0 0 24 24">
        <path d="M12.3 22h-.1c-5.5 0-10-4.5-10-10 0-4.8 3.5-8.9 8.2-9.8.6-.1 1.2.3 1.3.9.1.6-.3 1.2-.9 1.3-3.5.7-6 3.7-6 7.6 0 4.4 3.6 8 8 8 3.9 0 6.9-2.5 7.6-6 .1-.6.7-1 1.3-.9.6.1 1 .7.9 1.3-.9 4.7-5 8.2-9.8 8.2z"/>
      </svg>
    `;
  }
}

// --- Dynamic Toast Notifications ---
function showToast(message, type = 'info') {
  let toast = document.getElementById('toast-notification');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast-notification';
    toast.className = 'toast-msg';
    document.body.appendChild(toast);
  }
  
  toast.textContent = message;
  toast.className = `toast-msg show ${type}`;
  
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

// Global Image Error Fallback - Limón Candlelit Theme Placeholder
window.handleImgError = function(img) {
  img.onerror = null; // prevent infinite loop
  
  // Extract initials from alt tag
  const alt = img.alt || "FD";
  const initials = alt.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
  
  // Replace source with a high-contrast dark green / electric yellow SVG data URI
  img.src = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300" viewBox="0 0 300 300"><rect width="100%" height="100%" fill="%23103b15"/><text x="50%" y="55%" font-family="system-ui, sans-serif" font-weight="bold" font-size="64" fill="%23f7ea48" dominant-baseline="middle" text-anchor="middle">${initials}</text></svg>`;
};
