
let classInput = document.querySelector('input#turma');  
const classList = document.querySelectorAll('.sala')

classList.forEach((clas)=>{
    clas.addEventListener('click', evt =>{
        var code = clas.getAttribute('code')
        console.log("fui clicado "+  code);
        window.location.href = '/sala-aluno/code/'+code;
        
    }); 
})
