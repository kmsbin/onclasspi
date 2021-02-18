document.getElementById('register').addEventListener('click', () => {
    window.location.href = '/cadastro';
});

document.getElementById('login').addEventListener('click', () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    authUser(email, password);
});

async function authUser(email, password) {
    await fetch('/user/auth', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password,
            })
        }).then(response => response.json())
        .then((response) => {
            if (response['code'] == 0) {

            } else if (response['code'] == 1) {
                window.location.href = '/codigo-turma';
            }

        });
}