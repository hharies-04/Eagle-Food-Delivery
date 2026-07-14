# Eagle Food Delivery 🕯️🍋

Eagle Food Delivery is a high-fidelity, client-side food ordering SPA (Single Page Application) designed with the moody, high-contrast visual style of a candlelit evening brasserie (inspired by the **Limón Design System**).

The project is backed by a city-scale database of **258 restaurants** and **1,800+ dishes** spanning Chennai, Bangalore, and Delhi NCR, generated procedurally on load.

---

## 🌟 Key Features

### 1. Brasserie Candlelight Aesthetic
- **Atmospheric Animations**: Subtle, warm `@keyframes candle-flicker` breathing effects on call-to-actions and steady `@keyframes neon-glow` letter shadows on typography.
- **VenusCom Wide Letter-Spacing**: Custom uppercase headings styled in Outfit with positive letter-tracking scaling from `0.02em` up to `0.06em` for a premium neon-sign feel.
- **Unsoftened Flat Edges**: Strict 1px border radii on buttons, inputs, toggles, and cards, avoiding rounded circles and modern drop shadows to preserve an editorial paper look.

### 2. City-Scale Procedural Catalog
- **Chennai Expansion (175 Restaurants)**: Procedural generation of local culinary spots (e.g. Sangeetha Veg, Adyar Ananda Bhavan, Anjappar, Dindigul Thalappakatti) across famous neighborhoods (e.g. T. Nagar, Adyar, Mylapore, Anna Nagar).
- **Bangalore Expansion (73 Restaurants)**: Authentic local institutions (e.g. Mavalli Tiffin Room, Empire, Meghana Foods, Vidyarthi Bhavan, Corner House) across areas (e.g. Indiranagar, Koramangala, Jayanagar, HSR Layout).
- **Delhi NCR (10 Restaurants)**: Hand-crafted core restaurants (e.g. Behrouz Biryani, Moti Mahal Delux, Wow! Momo).
- **1,800+ Dishes**: Every restaurant is populated with a category-grouped menu of 6-8 dishes, complete with descriptions, ratings, veg/non-veg status, and Rupee prices.

### 3. Smart Search & Filters
- **City Selector Tabs**: A sticky city filter (`CHENNAI | BANGALORE | DELHI NCR | ALL CITIES`) instantly filters all listings.
- **Hybrid Search Engine**: Searches both restaurant names and menu items simultaneously, returning two sections (`MATCHING RESTAURANTS` and `MATCHING DISHES`) with real-time synchronized quantity controls.
- **Veg & Rating Filters**: Pure Veg toggles and Ratings 4.0+ filters apply instantly across restaurants and search results.

### 4. Dynamic SVG Image Fallbacks
- Equipped with a global `handleImgError(this)` listener. Any missing, broken, or slow-loading images are replaced in-place by a custom-styled vector SVG displaying the initials of the dish/restaurant in electric yellow on a dark green background.

---

## 🛠️ Technology Stack

- **Core**: HTML5, Vanilla JavaScript (ES6+), CSS3 Variables & Keyframe Animations
- **Typography**: Google Fonts (Outfit, Plus Jakarta Sans)
- **Local Dev Server & Bundling**: Vite (v5.4.21)

---

## 🚀 Quick Start

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation
1. Clone or copy the project files to your local directory.
2. Open your terminal in the project directory:
   ```bash
   cd "c:\Users\Asus\OneDrive\Desktop\HTML WEBSITES\Food Delivery"
   ```
3. Install the development dependencies:
   ```bash
   npm install
   ```

### Running Locally
To launch the hot-reloading development server:
```bash
npm run dev
```
Open your browser and navigate to the address displayed in your terminal (typically `http://localhost:5173`).

### Building for Production
To bundle the project into optimized static assets (`dist` folder):
```bash
npm run build
```

---

## 📂 Project Structure

```
├── index.html       # Primary Single Page HTML template
├── app.js           # Main routing, state manager, and rendering engine
├── data.js          # Procedural city-scale restaurant & menu database
├── style.css        # Limón style variables, layout rules, and glow animations
├── package.json     # Node project metadata and dependencies
└── README.md        # Documentation and guide (this file)
```
