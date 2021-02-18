const express = require('express');

const app = express();

const controller = require('../../database/controller');
const PasswordManager = require('../../utils/password_manager');

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
    const passwordSalt = response[0]['password_salt'];
    const passwordHash = response[0]['password_hash'];

    const generatedPasswordHash = await PasswordManager.validatePassword(password, passwordSalt);

    if (passwordHash == generatedPasswordHash) {
        req.session.loggedin = true;
        req.session.username = username;
        req.session.uid = uid;

        return res.json({
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

app.post('/logout', (req, res) => {
    req.session.loggedin = false;

    return res.json({
        code: 1,
        message: 'User successfully logged out!'
    });
});

app.post('/create-user', async(req, res) => {
    const { name, email, teacher, password } = req.body;

    const password_salt = await PasswordManager.generateSalt();
    const password_hash = await PasswordManager.sha512(password, password_salt);

    await controller.users.createUser({
        name: name,
        email: email,
        teahcer: teacher,
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