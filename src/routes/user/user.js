const express = require('express');
const { v4: uuidV4 } = require('uuid')

const app = express();

const controller = require('../../database/controller');
const PasswordManager = require('../../utils/password_manager');

app.use(express.json());

app.post('/code-verify', async (req, res)=>{
    const { uid } = req.body;
    const userData = {user_id: req.session.uid, codigo: uid,}

    console.log("\n\n\n\n\n\n\n\n\n\nrequest: "+ uid+ ", session response: "+req.session.uid+"\n\n\n\n\n\n\n\n" )
    const response = await controller.user_class.getClassByUserAndCode(userData)

    if(response.length > 0){
        return res.json({
            status_code: 202,
            message: 'you are yet in this class' 
        });
    }
    controller.user_class.enterClass(userData)
    return res.json({
        isAdm: isAdm,
        message: 'Login realizado com sucesso!',
        code: 1,
    });
    // res.send({ status: 'SUCCESS' });

    // const response = await controller.users.getUserByEmail({ email: email });

    // if (response.length == 0) {
    //     return res.send({
    //         message: 'Usuário ou senha incorretos.',
    //         code: 0
    //     });
    // }
});

app.post('/create-test', async(req, res)=>{
    const { test, code, name } = req.body;

    const responseClass = await controller.class.getClassByCode(code);
    const turmaId = responseClass[0].id;

    if (!responseClass.length > 0 ) {
        return res.send({
            message: "codigo não existe",
            status: 404
        })
    }
    console.log("class id: "+turmaId);

    let resp = await controller.test.createTest({
        name: name,
        turmaId: turmaId
    })
    
    console.log("\n\n resp: "+JSON.stringify(resp) )
    
    test.forEach(async quest => {
        
        const resultQuest  = await controller.test.createQuestion({
            conteudo: quest.question,
            provaId: resp.id,
            tipo: true,
        })
        quest.alternatives.forEach(async alternative =>{
            const resultAlternatives = await controller.test.createAlternatives({
                conteudo: alternative,
                questoId: resultQuest.id,
            }) 

        })
        controller.test.createAnswer({
            conteudo: quest.answer,
            questoId: resultQuest.id,
        })
        console.log("resultado: "+resultQuest.id)

    });

});

app.post('/create-class', async(req, res) => {
    const { discipline, className } = req.body;
    console.log("\n\ndiscipline: "+discipline+ "class: "+req.session.uid);

    let codigo = uuidV4();
    controller.class.createClass({
        disciplina: discipline,
        user_id: Number(req.session.uid),
        turma: className,
        codigo: codigo
    });


    return res.json({
        message: 'sala criada com sucesso',
        code: 1,
    });
});


app.post('/auth', async(req, res) => {
    const { email, password } = req.body;

    const response = await controller.users.getUserByEmail({ email: email });

    if (response.length == 0) {
        return res.send({
            message: 'Usuário ou senha incorretos.',
            code: 0
        });
    }

    const uid = response[0]['id'];
    const username = response[0]['nome'];
    const isAdm = response[0]['professor'];
    const passwordSalt = response[0]['password_salt'];
    const passwordHash = response[0]['password_hash'];


    const generatedPasswordHash = await PasswordManager.validatePassword(password, passwordSalt);

    if (passwordHash == generatedPasswordHash) {
        req.session.loggedin = true;
        req.session.username = username;
        req.session.uid = uid;
        req.session.email = email;
        req.session.isAdm = isAdm;

        return res.json({
            isAdm: isAdm,
            message: 'Login realizado com sucesso!',
            code: 1,
        });
    } else {
        return res.json({
            message: 'Usuário ou senha incorretos.',
            code: 0,
        });
    }
});

app.get('/logout', (req, res) => {
    if(!req.session.loggedin){
        return
    }
    req.session.loggedin = false;
    req.session.username = false;
    req.session.uid = false;
    req.session.email = false;
    req.session.isAdm = false;
    req.session.destroy();
    req.session = null; 
   

    // res.redirect('../logado-aluno');

    return res.json({
        code: 1,
        message: 'User successfully logged out!'
    });
});

app.post('/create-user', async(req, res) => {
    const { name, email, teacher, password } = req.body;

    const password_salt = PasswordManager.generateSalt();
    const password_hash = PasswordManager.sha512(password, password_salt);

     controller.users.createUser({
        name: name,
        email: email,
        teacher: teacher,
        password_hash: password_hash,
        password_salt: password_salt
    });

    return res.json({
        status_code: 200,
        message: 'User created successfully'
    });
});

app.get('/get-user', (req, res) => {
    const user_id = req.query.id;

    return res.send();
});



module.exports = app;