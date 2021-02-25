document.getElementById('back').addEventListener('click', () => {
    window.location.href = '/login';
});

document.getElementById('register').addEventListener('click', () => {
    const email = document.getElementById('email').value;
    const name = document.getElementById('name').value;
    const teacher = document.getElementById('professor-check').checked;
    const password = document.getElementById('password').value;

    createUser(email, name, teacher, password);
});

async function createUser(email, name, teacher, password) {
    await fetch('/user/create-user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                name: name,
                teacher: teacher,
                password: password
            })
        }).then(response => response.json())
        .then((response) => {
            console.log(response['status_code']);

            if (response['status_code'] == 0) {
                divDados.innerHTML += `
            <label for="register" style="align-self: center; color: red;">Email ou senha incorretos</label>                
            `;
            } else if (response['status_code'] == 200) {
                window.location.href = '/';
            }

        });
}