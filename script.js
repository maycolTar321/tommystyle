const productos = [
    { id: 1, nombre: "Ajuar Recién Nacido", precio: 195, img: "https://images.unsplash.com/photo-1522771917714-d73b52b75243?w=500" },
    { id: 2, nombre: "Manta Punto Calado", precio: 220, img: "https://images.unsplash.com/photo-1544126592-807daa2b565b?w=500" },
    { id: 3, nombre: "Saquito Ochos", precio: 145, img: "https://images.unsplash.com/photo-1607345366928-199e649ce44e?w=500" },
    { id: 4, nombre: "Gorrito Pompon", precio: 45, img: "https://images.unsplash.com/photo-1522771917714-d73b52b75243?w=500" }
];

let carrito = JSON.parse(localStorage.getItem('cart')) || [];

function init() {
    const grid = document.getElementById('product-grid');
    if(grid) {
        grid.innerHTML = productos.map(p => `
            <div class="product-card" onclick="addToCart(${p.id})">
                <img src="${p.img}" alt="${p.nombre}">
                <div style="padding:15px; text-align:left;">
                    <h4 style="margin:0; font-size:13px; letter-spacing:1px;">${p.nombre.toUpperCase()}</h4>
                    <p style="font-weight:600;">Bs ${p.precio}</p>
                </div>
            </div>
        `).join('');
    }
    updateCartUI();
}

function addToCart(id) {
    const p = productos.find(item => item.id === id);
    carrito.push(p);
    localStorage.setItem('cart', JSON.stringify(carrito));
    updateCartUI();
    toggleCart();
}

function updateCartUI() {
    document.getElementById('cart-count').innerText = carrito.length;
    const list = document.getElementById('cart-items-list');
    list.innerHTML = carrito.map((item, index) => `
        <div style="display:flex; justify-content:space-between; margin-bottom:15px; border-bottom:1px solid #f4f4f4; padding-bottom:10px;">
            <span style="font-size:12px;">${item.nombre}</span>
            <span style="font-weight:600;">Bs ${item.precio}</span>
            <button onclick="removeItem(${index})" style="background:none; border:none; color:red; cursor:pointer;">✕</button>
        </div>
    `).join('');
    
    const total = carrito.reduce((sum, item) => sum + item.precio, 0);
    document.getElementById('total-price').innerText = `Bs ${total}`;
}

function removeItem(index) {
    carrito.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(carrito));
    updateCartUI();
}

function toggleCart() {
    document.getElementById('cart-sidebar').classList.toggle('active');
}

function checkout() {
    if(carrito.length === 0) return alert("Tu bolsa está vacía");
    const total = document.getElementById('total-price').innerText;
    const items = carrito.map(i => i.nombre).join(", ");
    const waUrl = `https://wa.me/591XXXXXXXX?text=Hola TommyStyle, quiero estos tejidos: ${items}. Total: ${total}`;
    window.open(waUrl, '_blank');
}

window.onload = init;