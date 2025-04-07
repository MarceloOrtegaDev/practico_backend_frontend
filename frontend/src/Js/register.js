const username = document.getElementById("register-username")
const email = document.getElementById("register-email")
const password = document.getElementById("register-password")
const form = document.getElementById("register-form")
const registerBtn = document.getElementById("register-submit")

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    
    console.log({
        username: username.value,
        email: email.value,
        password: password.value
    });

    try {
        const res = await fetch("http://localhost:3000/api/register", {
            credentials: "include",
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: username.value,
                email: email.value,
                password: password.value,
            }),
        });

        const data = await res.json();

        if (res.ok) {
            console.log(data);
            alert("Registro exitoso: Ya puedes iniciar sesión");
        } else {
            alert("Error: " + data.msg);
        }
    } catch (error) {
        console.error(error);
    }
});
