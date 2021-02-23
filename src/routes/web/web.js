const express = require('express');
const handlebars = require('express-handlebars');
const path = require('path');

const app = express();
const { v4: uuidV4 } = require('uuid')
var http = require('http');
const db = require('../../database/controllers/class.controller');
const class_user  = require('../../database/controllers/user.class');
const user  = require('../../database/controllers/class.controller');
var serv = http.createServer(app)
var io  = require('socket.io')(http).listen(serv);

const sessionValidate = (req, res, next)=>{
    if (!req.session?.loggedin) {
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
});


app.get('/logado-professor/', sessionValidate, async (req, res) => {
    let classList = await db.getClassById(Number(req.session.uid));

    if(!classList.lenght > 0){
        return res.render('logado_professor', {classList: classList});
    }
    return res.render('logado_professor');


});

app.get('/logado', sessionValidate, (req, res) => {

    return res.render('logado');
});

app.get('/sala-aluno/code/:code', sessionValidate, async (req, res) => {
    const code = req.params.code;
    console.log("print code: "+code);
    const classList = await class_user.getClassByCode(code)
    let list = [];
    
    classList.map(async item => {        
        list.push({
            disciplina:item.disciplina,
            usuarioId:item.usuarioId,
            turma:item.turma,
            codigo:item.codigo,
        })
    });

    if (list.length > 0) {
        return res.render('sala_aluno');
    }

    return res.json({
        status_code: 404,
        message: 'voce não tem permissão de acessar essa sala' 
    });});

app.get('/sala-professor/code/:code', sessionValidate, async (req, res) => {
    const code = req.params.code;
    console.log("print code: "+code);
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

    console.log("\n\n typeof: "+list.length);

    if(list.length>0){
        return res.render('sala_professor');
    }
    return res.json({
        status_code: 404,
        message: 'voce não tem permissão de acessar essa sala' 
    });
});


app.get('/sala', sessionValidate, (req, res) => {
    return res.render('sala');
});

app.get('/video', sessionValidate, (req, res) => {
    return res.render('video');
});

app.get('/prova', sessionValidate, (req, res) => {
    return res.render('prova');
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