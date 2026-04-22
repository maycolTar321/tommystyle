// CATÁLOGO DE PRODUCTOS
const productos = [
    {
        id: 1,
        nombre: "Ajuar Recién Nacido Algodón",
        precio: 195,
        categoria: "RECIÉN NACIDO",
        // REEMPLAZA EL ID POR EL DE TU DRIVE
        foto: "https://lh3.googleusercontent.com/d/TU_ID_AQUÍ"
    },
    {
        id: 2,
        nombre: "Manta Nube Tarijeña",
        precio: 250,
        categoria: "ACCESORIOS",
        foto: "https://lh3.googleusercontent.com/d/OTRO_ID_AQUÍ"
    },
    {
        id: 3,
        nombre: "Jersey Trenzado Lana Soft",
        precio: 145,
        categoria: "BEBÉ NIÑO",
        foto: "https://lh3.googleusercontent.com/d/ID_TRES"
    }
];

let carrito = [];

function cargarTienda() {
    const grid = document.getElementById('product-grid');
    if(!grid) return;

    grid.innerHTML = productos.map(p => `
        <div class="product-card" onclick="agregarAlCarrito(${p.id})">
            <img src="${p.foto}" alt="${p.nombre}" onerror="this.src='https://via.placeholder.com/400x500?text=Cargando+Imagen...'">
            <div class="product-info">
                <p style="font-size: 10px; color: #999; letter-spacing: 1px;">${p.categoria}</p>
                <h3>${p.nombre}</h3>
                <div class="price">Bs ${p.precio}</div>
            </div>
        </div>
    `).join('');
}

function agregarAlCarrito(id) {
    const p = productos.find(x => x.id === id);
    carrito.push(p);
    actualizarCarrito();
    document.getElementById('cart-sidebar').classList.add('active');
}

function toggleCart() {
    document.getElementById('cart-sidebar').classList.toggle('active');
}

function actualizarCarrito() {
    document.getElementById('cart-count').innerText = carrito.length;
    const body = document.getElementById('cart-items');
    
    document.getElementById('cart-items').innerHTML = carrito.map((item, index) => `
        <div style="display:flex; margin-bottom:20px; align-items:center;">
            <img src="${item.foto}" style="width:60px; height:80px; object-fit:cover; border-radius:4px;">
            <div style="flex-grow:1; padding-left:15px;">
                <h4 style="font-size:12px;">${item.nombre}</h4>
                <p style="font-weight:bold; font-size:13px;">Bs ${item.precio}</p>
            </div>
            <button onclick="eliminarDelCarrito(${index})" style="background:none; border:none; color:red; cursor:pointer;">✕</button>
        </div>
    `).join('');

    const total = carrito.reduce((sum, i) => sum + i.precio, 0);
    document.getElementById('cart-total').innerText = `Bs ${total}`;
}

function eliminarDelCarrito(index) {
    carrito.splice(index, 1);
    actualizarCarrito();
}

function finalizarCompra() {
    if(carrito.length === 0) return alert("Tu bolsa está vacía");
    const total = document.getElementById('cart-total').innerText;
    const lista = carrito.map(i => i.nombre).join(", ");
    
    const msj = `¡Hola TommyStyle! He visto tu catálogo web y quiero pedir: ${lista}. Total: ${total}. ¿Me dan información para el envío?`;
    window.open(`https://wa.me/591XXXXXXXX?text=${encodeURIComponent(msj)}`);
}

window.onload = cargarTienda;
