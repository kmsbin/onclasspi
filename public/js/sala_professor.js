var modal = document.getElementById("myModal");
var btn = document.getElementById("prova");
const inputCreate = document.querySelector("input.create")
const addQuestion = document.querySelector('.add')
const inputPergunta = document.querySelector("#pergunta")
const alternatives = document.querySelectorAll('.insertalter')
const checks = document.querySelectorAll('.alter')
const quests = document.querySelector('.qtdquestoes')
const questsBalls = document.querySelectorAll('.questao')

let questionList = []; 
let checkPosition


questsBalls.forEach((check,index)=>{
    check.addEventListener('click', ()=>{
        console.log('click:  ' +index)
    })

})

checks.forEach((check,index)=>{
    check.addEventListener('click', (evt)=>{
        unMarkCheckBox()
        check.checked = true
        checkPosition = index;
    })
})

function unMarkCheckBox() {
    checks.forEach((check,index)=>{
        check.checked = false
    
    })
}

inputCreate.addEventListener('click', async ()=>{
    var testName = prompt('qual o nome da prova?')
    if(!testName == null || testName){

        console.log(testName)
        await fetch('/user/create-test', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                code: code, 
                test: questionList,
                name: testName
            })
        })
    }
    });

addQuestion.addEventListener('click', (evt)=>{
    console.log("pergunta: "+checkPosition);
    let question = {
        question: inputPergunta.value, 
        alternatives: [],
        answer: checkPosition
    }
    inputPergunta.value = "";
    alternatives.forEach((item)=>{
        question.alternatives.push(item.value)

        console.log("resposta: "+item.value)
        item.value = ""; 
    });
    unMarkCheckBox()
    console.table(question)
    questionList.push(question);
    quests.innerHTML = '';
    questionList.forEach((ass, index)=>{
        var div = document.createElement('div');
        div.classList.add('questao')
        div.addEventListener('click',()=>{
            console.log('click:  ' +index)
        })
        quests.appendChild(div)
    })


});

var span = document.getElementsByClassName("close")[0];
btn.onclick = function() {
    modal.style.display = "flex";
    }
span.onclick = function() {
    modal.style.display = "none";
    }