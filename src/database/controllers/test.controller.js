const { options } = require('../../routes/routes');
const { answer } = require('../database');
const db = require('../database');
exports.createTest = async(user) => {
    return await db.test.create({
        'nome': user.name,
        'turmaId': user.turmaId,
        },

        )
        .then((usera) => {
            console.log(">> Created user: " + JSON.stringify(user, null, 4));
            return usera;
        })
        .catch((err) => {
            console.log(">> Error while creating user: ", err);
        });
}

exports.getTestById = async (id) => {
    return await db.test.findAll({
        where: {
            turmaId: id,
        },
        include: ['turmas'],
    });
}


exports.getQuestByTestId = async (id) =>{
    return await db.question.findAll({
        where: {
            provaId: id,
        },
        // include: ['questoes'],
    });
}

exports.getAlternativesByQuestId = async (id) => {
    return await db.alternative.findAll({
        where: {
            questoId: id,
        },
        // include: ['questoes'],
    });
}


exports.createQuestion = async (quest) => {
    return await db.question.create({
        'conteudo': quest.conteudo,
        'tipo': quest.tipo, 
        'provaId': quest.provaId
    })
    .then((user) => {
        console.log(">> Created quest: " + JSON.stringify(user, null, 4));
        return user;
    })
    .catch((err) => {
        console.log(">> Error while creating question: ", err);
    });

};


exports.createAlternatives = async (answer) => {
    return await db.alternative.create({
        'conteudo': answer.conteudo,
        'tipo': answer.tipo,
        'questoId': answer.questoId
    })
    .then((user) => {
        console.log(">> Created quest: " + JSON.stringify(user, null, 4));
        return user;
    })
    .catch((err) => {
        console.log(">> Error while creating question: ", err);
    });

};

exports.createAnswer = async (answer) => {
    return await db.answer.create({
        'conteudo': answer.conteudo,
        'questoId': answer.questoId
    })
    .then((user) => {
        console.log(">> Created quest: " + JSON.stringify(user, null, 4));
        return user;
    })
    .catch((err) => {
        console.log(">> Error while creating question: ", err);
    });

};
