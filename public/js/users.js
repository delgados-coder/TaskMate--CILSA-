function sendLogin() {
    let email = document.getElementById('email-login').value;
    let password = document.getElementById('password-login').value;
    fetch('/login', {
        method: 'POST', // Método HTTP
        headers: {
            'Content-Type': 'application/json', // Tipo de contenido
        },
        body: JSON.stringify({
            email: email,
            password: password
        }),
    })
        .then(response => {
            return response.json();
        })
        .then(data => {
            if (data.error) {
                return document.getElementById('res-login').innerHTML = `<p class="text-danger">${data.error}</p>`
            } else {
                document.getElementById('res-login').innerHTML = `<p class="text-success">${data.loggedIn}</p>`
                setTimeout(() => {
                    return window.location.href = '/dashboard'
                }, 2000);
            }
        })
}

function sendRegistro() {
    let user = document.getElementById('user-register').value;
    let email = document.getElementById('email-register').value;
    let password = document.getElementById('password-register').value;
    let rePassword = document.getElementById('confirm-password-register').value;
    if (password != rePassword) {
        return document.getElementById('res-registro').innerHTML = `<p class="text-danger">Las contraseñas no coinciden</p>`
    }else{

        fetch('/registro', {
            method: 'POST', // Método HTTP
            headers: {
                'Content-Type': 'application/json', // Tipo de contenido
            },
            body: JSON.stringify({
                user: user,
                email: email,
                password: password
            }),
        })
        .then(response => {
            return response.json();
        })
        .then(data => {
            if (data.error) {
                return document.getElementById('res-registro').innerHTML = `<p class="text-danger">${data.error}</p>`
            } else {
                document.getElementById('res-registro').innerHTML = `<p class="text-success">${data.created}</p>`
                setTimeout(() => {
                    return window.location.href = '/dashboard'
                }, 2000);
            }
        })
    }
}