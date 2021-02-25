const logintput = document.querySelector(".logout")

logintput.addEventListener('click', async evt => {
    await fetch('/user/logout', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
    }).then(response => response.json())
    .then((response) => {
        if (response['code'] == 0) {

        } else if (response['code'] == 1) {
            if(response['isAdm']){
                window.location.href = '/logado-professor';
            }else{
                window.location.href = '/logado-aluno';
            }
        }

    });
});

