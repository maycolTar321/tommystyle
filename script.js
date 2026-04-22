/**
 * TOMMYSTYLE CORE ENGINE v4.0
 * Developed for High-Performance E-commerce
 */

"use strict";

// 1. DATA MASTER (Base de datos local expandida)
const PRODUCT_DATABASE = [
    {
        id: "TS-001",
        name: "Ajuar Recién Nacido 'Nube Celeste'",
        price: 245.00,
        category: "RECIÉN NACIDO",
        tag: "Bestseller",
        image: "https://images.unsplash.com/photo-1522771917714-d73b52b75243?w=500",
        description: "Tejido artesanal ultra suave.",
        rating: 5
    },
    {
        id: "TS-002",
        name: "Manta Punto Ochos Premium",
        price: 320.00,
        category: "RECIÉN NACIDO",
        tag: "Lujo",
        image: "https://images.unsplash.com/photo-1544126592-807daa2b565b?w=500",
        description: "100% fibra natural hipoalergénica.",
        rating: 4
    },
    {
        id: "TS-003",
        name: "Vestido Calado 'Rosa Chura'",
        price: 195.00,
        category: "NIÑAS",
        tag: "Tendencia",
        image: "https://images.unsplash.com/photo-1515488764276-beab7607c1e6?w=500",
        description: "Inspirado en la primavera tarijeña.",
        rating: 5
    },
    {
        id: "TS-004",
        name: "Jersey Marinero con Pompones",
        price: 180.00,
        category: "NIÑOS",
        tag: "Clásico",
        image: "https://images.unsplash.com/photo-1522771917714-d73b52b75243?w=500",
        description: "Estilo atemporal para el pequeño.",
        rating: 4
    }
    // Puedes agregar hasta 100 productos siguiendo esta estructura
];

// 2. STATE MANAGEMENT
let state = {
    cart: JSON.parse(localStorage.getItem('tommyCart')) || [],
    filteredProducts: [...PRODUCT_DATABASE],
    currentCategory: 'TODOS',
    isCartOpen: false
};

// 3. INITIALIZATION
document.addEventListener('DOMContentLoaded', () => {
    // Simulamos carga para el preloader
    setTimeout(() => {
        document.getElementById('preloader').style.opacity = '0';
        setTimeout(() => document.getElementById('preloader').remove(), 800);
        document.body.classList.remove('loading');
    }, 1500);

    renderCatalog();
    updateUI();
    initAnnouncements();
});

// 4. RENDERING ENGINE
function renderCatalog() {
    const catalogContainer = document.getElementById('mainCatalog');
    const noResults = document.getElementById('noResults');
    
    if (state.filteredProducts.length === 0) {
        catalogContainer.innerHTML = '';
        noResults.style.display = 'block';
        return;
    }

    noResults.style.display = 'none';
    catalogContainer.innerHTML = state.filteredProducts.map(product => `
        <article class="product-card-v4" data-aos="fade-up">
            <div class="image-container">
                <img src="${product.image}" alt="${product.name}" loading="lazy">
                <div class="hover-overlay">
                    <button class="quick-add-btn" onclick="addToCart('${product.id}')">AÑADIR A LA BOLSA</button>
                </div>
            </div>
            <div class="product-details">
                <span class="cat">${product.category}</span>
                <h3>${product.name}</h3>
                <div class="price">Bs. ${product.price.toFixed(2)}</div>
                <div class="stars">${'★'.repeat(product.rating)}</div>
            </div>
        </article>
    `).join('');
}

// 5. SEARCH & FILTER LOGIC
function realTimeSearch() {
    const query = document.getElementById('globalSearch').value.toLowerCase();
    state.filteredProducts = PRODUCT_DATABASE.filter(p => 
        p.name.toLowerCase().includes(query) || 
        p.category.toLowerCase().includes(query)
    );
    renderCatalog();
}

function filterBy(category) {
    state.currentCategory = category;
    document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
    event.target.classList.add('active');
    
    if (category === 'TODOS') {
        state.filteredProducts = [...PRODUCT_DATABASE];
    } else {
        state.filteredProducts = PRODUCT_DATABASE.filter(p => p.category === category);
    }
    
    document.getElementById('currentCategory').innerText = category;
    renderCatalog();
}

// 6. CART CORE
function addToCart(id) {
    const product = PRODUCT_DATABASE.find(p => p.id === id);
    const existing = state.cart.find(item => item.id === id);

    if (existing) {
        existing.qty++;
    } else {
        state.cart.push({...product, qty: 1});
    }

    saveCart();
    updateUI();
    toggleCartSide(true); // Abrir carrito al añadir
}

function removeItem(index) {
    state.cart.splice(index, 1);
    saveCart();
    updateUI();
}

function saveCart() {
    localStorage.setItem('tommyCart', JSON.stringify(state.cart));
}

function updateUI() {
    const badge = document.getElementById('cart-counter-badge');
    const content = document.getElementById('cartContent');
    const subtotalEl = document.getElementById('subtotalPrice');
    const totalEl = document.getElementById('totalPriceFinal');

    // Update Badge
    const count = state.cart.reduce((acc, item) => acc + item.qty, 0);
    badge.innerText = count;

    // Update Sidebar
    if (state.cart.length === 0) {
        content.innerHTML = '<div class="empty-cart-msg">Tu bolsa está vacía actualmente.</div>';
    } else {
        content.innerHTML = state.cart.map((item, index) => `
            <div class="cart-item-row">
                <div class="item-img"><img src="${item.image}" width="50"></div>
                <div class="item-info">
                    <h5>${item.name}</h5>
                    <p>${item.qty} x Bs. ${item.price}</p>
                </div>
                <button class="remove-item" onclick="removeItem(${index})">✕</button>
            </div>
        `).join('');
    }

    // Calculations
    const subtotal = state.cart.reduce((acc, item) => acc + (item.price * item.qty), 0);
    subtotalEl.innerText = `Bs. ${subtotal.toFixed(2)}`;
    totalEl.innerText = `Bs. ${subtotal.toFixed(2)}`;
}

function toggleCartSide(forceOpen = false) {
    const sidebar = document.getElementById('sideCart');
    if (forceOpen) {
        sidebar.classList.add('active');
    } else {
        sidebar.classList.toggle('active');
    }
}

// 7. WHATSAPP ENGINE
function processOrder() {
    if (state.cart.length === 0) return alert("Tu bolsa está vacía.");
    
    let message = "¡Hola TommyStyle! ✨\nQuiero realizar un pedido desde la web:\n\n";
    state.cart.forEach(item => {
        message += `• ${item.qty} x ${item.name} (Bs. ${item.price})\n`;
    });
    
    const total = state.cart.reduce((acc, item) => acc + (item.price * item.qty), 0);
    message += `\n💰 *Total Final: Bs. ${total.toFixed(2)}*\n`;
    message += `\n📍 Ciudad: Tarija\n💬 ¿Me pueden confirmar disponibilidad?`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/591XXXXXXXX?text=${encoded}`, '_blank');
}

// 8. ANIMATIONS & UI EXTRAS
function initAnnouncements() {
    const slides = document.querySelectorAll('.announcement-slide');
    let current = 0;
    setInterval(() => {
        slides[current].style.display = 'none';
        current = (current + 1) % slides.length;
        slides[current].style.display = 'block';
    }, 4000);
}
