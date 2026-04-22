// CONFIGURACIÓN DEL CATÁLOGO
const productos = [
    {
        id: 1,
        nombre: "Ajuar Recién Nacido 'Cielo'",
        precio: 195,
        categoria: "Recién Nacido",
        // Reemplaza TU_ID_DE_DRIVE por el ID real de tu foto
        foto: "https://lh3.googleusercontent.com/d/TU_ID_DE_DRIVE_1"
    },
    {
        id: 2,
        nombre: "Manta Nube Tarijeña",
        precio: 250,
        categoria: "Accesorios",
        foto: "https://lh3.googleusercontent.com/d/TU_ID_DE_DRIVE_2"
    },
    {
        id: 3,
        nombre: "Jersey Trenzado Lana Soft",
        precio: 145,
        categoria: "Niño",
        foto: "https://lh3.googleusercontent.com/d/TU_ID_DE_DRIVE_3"
    },
    {
        id: 4,
        nombre: "Vestido Calado Primor",
        precio: 180,
        categoria: "Niña",
        foto: "https://lh3.googleusercontent.com/d/TU_ID_DE_DRIVE_4"
    }
];

let carrito = [];

// INICIALIZAR TIENDA
function init() {
    const grid = document.getElementById('product-grid');
    if(grid) {
        grid.innerHTML = productos.map(p => `
            <div class="product-card" onclick="addToCart(${p.id})">
                <img src="${p.foto}" alt="${p.nombre}" onerror="this.src='https://via.placeholder.com/400x500?text=Cargando+Tejido...'">
                <div class="product-info">
                    <p style="font-size: 9px; color: #aaa; letter-spacing: 1px;">${p.categoria}</p>
                    <h3>${p.nombre}</h3>
                    <div class="price">Bs. ${p.precio}</div>
                </div>
            </div>
        `).join('');
    }
}

// LÓGICA DEL CARRITO
function addToCart(id) {
    const p = productos.find(x => x.id === id);
    carrito.push(p);
    updateCartUI();
    document.getElementById('cart-sidebar').classList.add('active');
}

function toggleCart() {
    document.getElementById('cart-sidebar').classList.toggle('active');
}

function updateCartUI() {
    document.getElementById('cart-count').innerText = carrito.length;
    const itemsContenedor = document.getElementById('cart-items');
    
    itemsContenedor.innerHTML = carrito.map((item, index) => `
        <div style="display:flex; justify-content:space-between; margin-bottom:20px; align-items:center;">
            <img src="${item.foto}" style="width:60px; height:70px; object-fit:cover; border-radius:4px;">
            <div style="flex-grow:1; padding-left:15px;">
                <h4 style="font-size:11px; margin:0;">${item.nombre}</h4>
                <p style="font-size:11px; font-weight:bold;">Bs. ${item.precio}</p>
            </div>
            <button onclick="removeItem(${index})" style="background:none; border:none; color:red; cursor:pointer;">✕</button>
        </div>
    `).join('');
    
    const total = carrito.reduce((sum, item) => sum + item.precio, 0);
    document.getElementById('cart-total').innerText = `Bs. ${total}`;
}

function removeItem(index) {
    carrito.splice(index, 1);
    updateCartUI();
}

function checkout() {
    if(carrito.length === 0) return alert("Tu bolsa está vacía");
    
    const total = document.getElementById('cart-total').innerText;
    const lista = carrito.map(i => i.nombre).join(", ");
    
    const telefono = "591XXXXXXXX"; // <--- PON TU NÚMERO AQUÍ
    const mensaje = `¡Hola TommyStyle! He visto tu catálogo web y quiero pedir: ${lista}. El total es ${total}. ¿Cómo coordinamos la entrega en Tarija?`;
    
    window.open(`https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`, '_blank');
}

window.onload = init;
