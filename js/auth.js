// REGISTRO
const formRegistro = document.getElementById("formRegistro");
if (formRegistro) {
    formRegistro.addEventListener("submit", function (e) {
        e.preventDefault();
        const nuevoUsuario = {
            nombre: document.getElementById("nombre").value,
            correo: document.getElementById("correo").value,
            clave: document.getElementById("clave").value,
            rol: document.getElementById("rol").value
        };
        let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
        if (usuarios.some(u => u.correo === nuevoUsuario.correo)) {
            alert("Este correo ya est� registrado");
            return;
        }
        usuarios.push(nuevoUsuario);
        localStorage.setItem("usuarios", JSON.stringify(usuarios));
        alert("Registro exitoso ");
        window.location.href = "login.html";
    });
}

// LOGIN
// LOGIN
const formLogin = document.getElementById("formLogin");
if (formLogin) {
    formLogin.addEventListener("submit", function (e) {
        e.preventDefault();

        const correoIngresado = document.getElementById("correo").value.trim().toLowerCase();
        const claveIngresada = document.getElementById("clave").value;

        const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

        const usuarioEncontrado = usuarios.find(u =>
            u.correo.trim().toLowerCase() === correoIngresado &&
            u.clave === claveIngresada
        );

        if (usuarioEncontrado) {
            localStorage.setItem("usuarioActivo", JSON.stringify(usuarioEncontrado));
            const destino = usuarioEncontrado.rol === "admin"
                ? "index.html"
                : "index.html";
            window.location.href = destino;
        } else {
            alert("Credenciales incorrectas");
        }
    });
}


    

