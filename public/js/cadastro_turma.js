let modal = document.getElementById('myModal');
let btn = document.getElementById('sala');
let createButton = document.querySelector('.create');
let disciplineInput = document.querySelector('input#nome');
let classInput = document.querySelector('input#turma');  
const classList = document.querySelectorAll('.sala')

classList.forEach((clas)=>{
    clas.addEventListener('click', evt =>{
        var code = clas.getAttribute('code')
        console.log("fui clicado "+  code);
        window.location.href = '/sala-professor/code/'+code;
        
    }); 
})


createButton.addEventListener('click', async ()=>{
    await fetch('/user/create-class', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            discipline: disciplineInput.value,
            className: classInput.value,
        })
    }).then(response => response.json())
    .then((response) => {
        if (response['code'] == 0) {

        } else if (response['code'] == 1) {
            window.location.href = '/logado-professor';
        }

    });
});

var span = document.getElementsByClassName('close')[0];
btn.onclick = function() {
    modal.style.display = 'flex';
    }
span.onclick = function() {
    modal.style.display = 'none';
    }

