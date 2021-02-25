const express = require('express');
const handlebars = require('express-handlebars');
const path = require('path');

const app = express();
const { v4: uuidV4 } = require('uuid')
var http = require('http');
const test = require('../../database/controllers/test.controller')
const db = require('../../database/controllers/class.controller');
const class_user  = require('../../database/controllers/user.class');
const user  = require('../../database/controllers/class.controller');
var serv = http.createServer(app)
var io  = require('socket.io')(http).listen(serv);

const sessionValidate = (req, res, next)=>{
    if (!req.session.loggedin) {
        res.redirect('/login');
        return
    }
    next();
}


app.use(express.static(path.join(__dirname, '/../../../public')));
app.engine('.hbs', handlebars({ 
    extname: '.hbs', 
    defaultLayout: false, 
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true,
        allowCallsToHelperMissing: true,
    },
}));
let hbs = handlebars.create({});
hbs.handlebars.registerHelper('ifCond', function(v1, v2, options) {
    if(v1 === v2) {
      return options.fn(this);
    }
    return options.inverse(this);
  });

app.set('views', __dirname + '/../../views');
app.set('view engine', '.hbs');
app.set('X-Content-Type-Options', 'script')

app.get('/login', (req, res) => {
    return res.render('login');
});

app.get('/cadastro', (req, res) => {
    return res.render('cadastro');
});
app.get('/',sessionValidate , (req, res) => {
    if (req.session.isAdm) {
        res.redirect('logado-aluno')
        return
    }
    return res.render('codigo_turma', {login_status : true});
});


app.get('/codigo-turma', sessionValidate, (req, res) => {
    var loginStatus = false;

    if (req.session.loggedin) {
        loginStatus = true;
    } else {
        loginStatus = false;
    }

    return res.render('codigo_turma');
});

app.get('/logado-aluno', sessionValidate, async (req, res) => {
    if(!req.session.isAdm){

        let classList = await class_user.getClassByUserId(Number(req.session.uid ));
        let list = [];
    console.log('\n\n\n classList: '+ typeof classList)
    classList.map(async item => {

        let response = await user.getClassByCode(item.turmaCodigo)

        console.log("\n\nreponse: "+response[0].disciplina)
        console.log("\n\nreponse: "+response[0].usuarioId)
        console.log("\n\nreponse: "+response[0].turma)
        console.log("\n\nreponse: "+response[0].codigo)
        list.push({
            disciplina: response[0].disciplina,
            usuarioId: response[0].usuarioId,
            turma: response[0].turma,
            codigo: response[0].codigo,
        })

    });
    console.log("\n\n\n codeList: "+ list)
    if(!classList.lenght > 0){
        console.log("logado aluno class: "+classList)
        return res.render('logado_aluno', {classList: list, aluno: req.session.username});
    }
    console.log("logado aluno empty class: "+classList)
    return res.render('logado_aluno_empty');
    } else {
        res.redirect('logado-professor')
    }
});


app.get('/logado-professor/', sessionValidate, async (req, res) => {
    if(req.session.isAdm){
    let classList = await db.getClassById(Number(req.session.uid));

    if(!classList.lenght > 0){
        return res.render('logado_professor', {classList: classList, username: req.session.username.toUpperCase()});
    }
    return res.render('logado_professor');
    }else{
        res.redirect('/logado-aluno')
    }

});

app.get('/sala-aluno/code/:code', sessionValidate, async (req, res) => {
    const code = req.params.code;
    console.log("print code: "+code);
    const classCode = await db.getClassByCode(code);
    const classList = await class_user.getClassByUserAndCode({
        user_id: req.session.uid,
        codigo: code,
    })
    if (classList.length > 0) {
    const respTest = await test.getTestById(classCode[0].id)
    respTest.forEach(clas => {
        console.log('class: '+clas.id)
    });
    // const provas = await 
    // console.log("\n\n\nid: "+JSON.stringify(classCode[0].id))


        return res.render('sala_aluno', {classList: respTest});
    }

    return res.json({
        status_code: 404,
        message: 'voce não tem permissão de acessar essa sala' 
    });});

app.get('/sala-professor/code/:code', sessionValidate, async (req, res) => {
    if(!req.session.isAdm){
        return res.redirect('logado-aluno')
    }
    const code = req.params.code;
    let clas = await db.getClassByCode(code);
    console.log("\n\nprint clas: "+JSON.stringify(clas));
    
    let provas = await test.getTestById(clas[0].id);
    const classList = await user.getClassByCode(code)
    let list = [];
    
    classList.map(async item => {
        
    //     let response = await user.getClassByCode(item.turmaCodigo)

        console.log("\n\nreponse: "+item.disciplina)
    //     console.log("\n\nreponse: "+response[0].usuarioId)
    //     console.log("\n\nreponse: "+response[0].turma)
    //     console.log("\n\nreponse: "+response[0].codigo)
        list.push({
            disciplina:item.disciplina,
            usuarioId:item.usuarioId,
            turma:item.turma,
            codigo:item.codigo,
        })

    });


    if(list.length>0){
        return res.render('sala_professor', {code: code, provas: provas});
    }
    return res.json({
        status_code: 404,
        message: 'voce não tem permissão de acessar essa sala' 
    });
});


app.get('/video', sessionValidate, (req, res) => {
    return res.render('video');
});

app.get('/prova/:nome/:prova', sessionValidate, async (req, res) => {
    const provaId = req.params.prova;
    const testName = req.params.nome;

    let questionList = [];
    let provas = await test.getQuestByTestId(provaId)
    let promisses = provas.map(async quests => {
        // quests.forEach(async () => {
        let finalQuest ={
            question: quests.conteudo,
            answer: quests.resposta,
            alternatives: []
        }

        let alterResp = await test.getAlternativesByQuestId(quests.id)
        
        // console.log("minha pergunta: "+alterResp)
        alterResp.forEach((item)=>{
            finalQuest.alternatives.push(item.conteudo)
            // console.log("\n"+item.conteudo+"\n")
        })
        questionList.push(finalQuest)
        // console.log("\n\nfinal response: "+ JSON.stringify(finalQuest))
        
        // })
        
    })
    await Promise.all(promisses)
    console.log("\n\nfinal response: "+ JSON.stringify(questionList))
    
    return res.render('prova', {questionList: questionList, tesName: testName});
});
// app.get('/video-stream', (req, res) => {

//     // return res.render('room');
// });
app.get('/video-stream/', sessionValidate, (req, res) => {
    if(!req.session.loggedin ){
        res.redirect('/login')
    }
    res.redirect(`/video-stream/${uuidV4()}`)
  })
  
  app.get('/video-stream/:room', sessionValidate, (req, res) => {
    res.render('video', { roomId: req.params.room })
  })
//   var ps = new PeerServer({
//     path: '/peer/',
//     port: 3000,
  
// });




module.exports = app;