const db = require('../database');

exports.createAlternative = (alternative) => {
    db.alternative.create({
            'conteudo': alternative.conteudo,
            'tipo': alternative.tipo,
            'provaId': alternative.prova_id
        })
        .then((alternative) => {
            console.log(">> Created alternative: " + JSON.stringify(alternative, null, 4));
            return user;
        })
        .catch((err) => {
            console.log(">> Error while creating alternative: ", err);
        });
};

exports.getAlternativeByTest = (alternative) => {
    return db.alternative.findAll({
        where: {
            provaId: alternative.prova_id
        }
    });
}