/* TOMMYSTYLE CORE ENGINE v5.0 */

// 1. BASE DE DATOS MAESTRA
const PRODUCT_DATA = [
    { id: 101, cat: "RECIÉN NACIDO", name: "Ajuar 'Nube de Tarija'", price: 195.00, img: "https://images.unsplash.com/photo-1522771917714-d73b52b75243?w=600" },
    { id: 102, cat: "NIÑAS", name: "Vestido Calado Gala", price: 240.00, img: "https://images.unsplash.com/photo-1515488764276-beab7607c1e6?w=600" },
    { id: 103, cat: "NIÑOS", name: "Jersey Marinero Soft", price: 185.00, img: "https://images.unsplash.com/photo-1544126592-807daa2b565b?w=600" },
    { id: 104, cat: "AJUARES", name: "Set Bienvenida Lujo", price: 350.00, img: "https://images.unsplash.com/photo-1607345366928-199e649ce44e?w=600" },
    { id: 105, cat: "RECIÉN NACIDO", name: "Manta Punto Ochos", price: 150.00, img: "https://images.unsplash.com/photo-1522771917714-d73b52b75243?w=600" }
];

let cartState = JSON.parse(localStorage.getItem('ts_cart')) || [];

// 2. RENDERIZADO DE TIENDA
function initShop(items) {
    const grid = document.getElementById('productGrid');
    grid.innerHTML = items.map(p => `
        <article class="p-card-v3">
            <div class="img-box">
                <img src="${p.img}" alt="${p.name}" loading="lazy">
            </div>
            <div class="card-info">
                <p style="color:var(--gold); font-size:0.7rem; font-weight:800; letter-spacing:2px;">${p.cat}</p>
                <h3>${p.name}</h3>
                <div class="price">Bs ${p.price.toFixed(2)}</div>
                <button class="btn-add-v3" onclick="addToCart(${p.id})">AÑADIR A LA BOLSA</button>
            </div>
        </article>
    `).join('');
}

// 3. LÓGICA DEL CARRITO
function addToCart(id) {
    const product = PRODUCT_DATA.find(x => x.id === id);
    cartState.push(product);
    localStorage.setItem('ts_cart', JSON.stringify(cartState));
    updateCartUI();
    handleCartUI(true); // Abre el carrito
}

function updateCartUI() {
    const badge = document.getElementById('cart-badge');
    const itemsList = document.getElementById('cartItems');
    const totalEl = document.getElementById('cartTotal');
    
    badge.innerText = cartState.length;
    
    if (cartState.length === 0) {
        itemsList.innerHTML = `<p style="text-align:center; margin-top:50px;">Tu bolsa está vacía.</p>`;
    } else {
        itemsList.innerHTML = cartState.map((p, index) => `
            <div style="display:flex; align-items:center; margin-bottom:20px; padding-bottom:15px; border-bottom:1px solid #eee;">
                <img src="${p.img}" style="width:60px; height:60px; object-fit:cover; border-radius:10px;">
                <div style="flex:1; padding-left:15px;">
                    <h4 style="font-size:0.8rem;">${p.name}</h4>
                    <p style="font-weight:bold; color:var(--gold);">Bs ${p.price}</p>
                </div>
                <button onclick="removeFromCart(${index})" style="background:none; border:none; color:red; cursor:pointer;">✕</button>
            </div>
        `).join('');
    }
    
    const total = cartState.reduce((sum, item) => sum + item.price, 0);
    totalEl.innerText = `Bs ${total.toFixed(2)}`;
}

function removeFromCart(index) {
    cartState.splice(index, 1);
    localStorage.setItem('ts_cart', JSON.stringify(cartState));
    updateCartUI();
}

// 4. INTERFAZ Y NAVEGACIÓN
function handleCartUI(forceOpen = false) {
    const drawer = document.getElementById('cartDrawer');
    if (forceOpen) drawer.classList.add('active');
    else drawer.classList.toggle('active');
}

function filterBy(cat, btn) {
    document.querySelectorAll('.f-pill').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filtered = cat === 'TODOS' ? PRODUCT_DATA : PRODUCT_DATA.filter(p => p.cat === cat);
    initShop(filtered);
}

function smartSearch() {
    const term = document.getElementById('mainSearch').value.toLowerCase();
    const results = PRODUCT_DATA.filter(p => p.name.toLowerCase().includes(term));
    initShop(results);
}

function checkoutWhatsApp() {
    if (cartState.length === 0) return alert("Bolsa vacía");
    const items = cartState.map(p => p.name).join(", ");
    const total = document.getElementById('cartTotal').innerText;
    const msg = `¡Hola TommyStyle! ✨ Quisiera pedir los siguientes tejidos: ${items}. Total: ${total}. Tarija, Bolivia.`;
    window.open(`https://wa.me/591XXXXXXXX?text=${encodeURIComponent(msg)}`);
}

// 5. INICIALIZACIÓN
window.onload = () => {
    setTimeout(() => {
        document.getElementById('master-loader').style.display = 'none';
        document.body.classList.remove('loading-state');
    }, 2000);
    
    initShop(PRODUCT_DATA);
    updateCartUI();
};
