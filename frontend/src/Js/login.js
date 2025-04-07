const h1 = document.getElementById("nombre-usuario");
const email_login = document.getElementById("login-email");
const email_password = document.getElementById("login-password");
const email_form = document.getElementById("login-form");
const email_registerBtn = document.getElementById("login-submit");

document.addEventListener("DOMContentLoaded", async () => {
    try {
        const res = await fetch("http://localhost:3000/api/user", {
            method: "GET",
            credentials: "include",
        });
        const data = await res.json();

        if (res.ok) {
            h1.textContent = `Hola, ${data.user.name}`;
        } else {
            h1.textContent = "Hola, invitado";
        }
    } catch (error) {
        console.error("Error al obtener usuario:", error);
        h1.textContent = "Error al cargar el usuario";
    }
});

email_form.addEventListener("submit", async (e) => {
    e.preventDefault();

    try {
        const res = await fetch("http://localhost:3000/api/login", {
            credentials: "include",
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email_login.value,
                password: email_password.value,
            }),
        });

        const data = await res.json();

        if (res.ok) {
            h1.textContent = `Hola, ${data.iniciarSesion.name}`;
            alert("Inicio de sesión exitoso");
        } else {
            alert("Error: " + data.msg);
            h1.textContent = "Error al cargar el usuario";
        }
    } catch (error) {
        console.error("Error en login:", error);
        h1.textContent = "Error al cargar el usuario";
    }
});
