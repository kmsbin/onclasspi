
(function() {
    const loginExit = document.getElementById('login-exit-button');

    if (loginExit.className.toString() == 'true') {
        loginExit.innerHTML = `
        <input class="logout" type="image" src="/assets/images/logout.svg">
        `;
    } else {
        loginExit.innerHTML = `
        <input type="image" src="/assets/images/user.svg">   
        `;
    }
}());

let input = document.querySelector('input.codigo');

document.querySelector('input.entrar').addEventListener('click', async()=>{
    if(input.value.length > 0) {
        console.log('sending'+ input.value)

        await fetch('/user/code-verify', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                uid: input.value,
            })
        }).then((response)=>{response.json()});
    }

})

// async function searchCode(uuidQuery) {
//     )}


document.getElementById('login-exit-button').addEventListener('click', async () => {
    await fetch('/user/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({})
        }).then(response => response.json())
        .then((response) => {
            if (response['code'] == 0) {

            } else if (response['code'] == 1) {
                window.location.href = '/codigo-turma';
            }

        });
});