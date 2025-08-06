const filtros = { categoria: null, marca: null, socket: null, chipset: null, capacidad: null };
const filtroCategoria = document.getElementById('filtroCategoria');
const filtroMarca = document.getElementById('filtroMarca');
const filtroSocket = document.getElementById('filtroSocket');
const filtroChipset = document.getElementById('filtroChipset');
const filtroCapacidad = document.getElementById('filtroCapacidad');
const listaProductos = document.getElementById('listaProductos');
const btnResetFiltros = document.getElementById('btnResetFiltros');

let productos = Array.from(listaProductos.children);

// --- FILTROS ---
function ocultarFiltro(id) { document.getElementById(id).classList.remove('active'); }
function mostrarFiltro(id) { document.getElementById(id).classList.add('active'); }

function limpiarFiltrosSecundarios() {
    [filtroMarca, filtroSocket, filtroChipset, filtroCapacidad].forEach(f => { f.innerHTML = ''; f.classList.remove('active'); });
    filtros.marca = filtros.socket = filtros.chipset = filtros.capacidad = null;
}

function cargarOpciones(tipoFiltro) {
    const contenedor = document.getElementById('filtro' + tipoFiltro.charAt(0).toUpperCase() + tipoFiltro.slice(1));
    if (!contenedor) return;
    const valores = new Set();
    const productosFiltrados = Array.from(listaProductos.children).filter(prod => {
        if (filtros.categoria && prod.dataset.categoria !== filtros.categoria) return false;
        return true;
    });
    productosFiltrados.forEach(prod => { let val = prod.dataset[tipoFiltro]; if (val) valores.add(val); });
    contenedor.innerHTML = '';
    valores.forEach(val => {
        const label = document.createElement('label');
        const input = document.createElement('input');
        input.type = 'checkbox'; input.name = tipoFiltro; input.value = val;
        label.appendChild(input); label.appendChild(document.createTextNode(' ' + val));
        contenedor.appendChild(label);
        input.addEventListener('click', () => { filtros[tipoFiltro] = input.checked ? val : null; filtrarProductos(); });
    });
}

filtroCategoria.querySelectorAll('input[type=checkbox]').forEach(chk => {
    chk.addEventListener('click', () => {
        if (chk.checked) {
            filtroCategoria.querySelectorAll('input').forEach(c => { if (c !== chk) c.checked = false; });
            filtros.categoria = chk.value; limpiarFiltrosSecundarios(); cargarOpciones('marca'); mostrarFiltro('filtroMarca');
        } else { filtros.categoria = null; limpiarFiltrosSecundarios(); ocultarFiltro('filtroMarca'); }
        filtrarProductos();
    });
});

btnResetFiltros.addEventListener('click', () => {
    filtros.categoria = filtros.marca = filtros.socket = filtros.chipset = filtros.capacidad = null;
    document.querySelectorAll('#sidebarFiltros input').forEach(c => c.checked = false);
    limpiarFiltrosSecundarios(); ocultarFiltro('filtroMarca'); filtrarProductos();
});

function filtrarProductos() {
    let visibles = 0;
    Array.from(listaProductos.children).forEach(prod => {
        if (prod.id === 'mensajeNoEncontrado') return;
        if (filtros.categoria && prod.dataset.categoria !== filtros.categoria) { prod.style.display = 'none'; return; }
        if (filtros.marca && prod.dataset.marca !== filtros.marca) { prod.style.display = 'none'; return; }
        prod.style.display = ''; visibles++;
    });
    let mensaje = document.getElementById('mensajeNoEncontrado');
    if (visibles === 0) {
        if (!mensaje) {
            mensaje = document.createElement('p');
            mensaje.id = 'mensajeNoEncontrado';
            mensaje.textContent = 'No se encontraron productos.';
            listaProductos.appendChild(mensaje);
        }
    }
    else if (mensaje) mensaje.remove();
}

// --- BÚSQUEDA ---
document.getElementById('buscarInput').addEventListener('keyup', () => {
    const filtro = document.getElementById('buscarInput').value.toLowerCase();
    let coincidencias = 0;
    productos.forEach(prod => {
        const nombre = prod.textContent.toLowerCase();
        if (nombre.includes(filtro)) {
            prod.style.display = '';
            coincidencias++;
        } else {
            prod.style.display = 'none';
        }
    });
    if (coincidencias === 0) {
        if (!document.getElementById('mensajeNoEncontrado')) {
            const mensaje = document.createElement('p');
            mensaje.id = 'mensajeNoEncontrado';
            mensaje.textContent = 'No se encontraron productos';
            mensaje.style.textAlign = 'center';
            mensaje.style.fontWeight = 'bold';
            listaProductos.appendChild(mensaje);
        }
    } else {
        const mensaje = document.getElementById('mensajeNoEncontrado');
        if (mensaje) mensaje.remove();
    }
});

// --- ORDEN ---
function ordenarAZ() {
    productos.sort((a, b) => a.textContent.localeCompare(b.textContent));
    productos.forEach(p => listaProductos.appendChild(p));
}

function ordenarZA() {
    productos.sort((a, b) => b.textContent.localeCompare(a.textContent));
    productos.forEach(p => listaProductos.appendChild(p));
}

ocultarFiltro('filtroMarca');
filtrarProductos();
