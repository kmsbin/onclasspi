const db = require('../database');

exports.createClass = (clas) => {
    db.class.create({
            'disciplina': clas.disciplina,
            'usuarioId': clas.user_id,
            'turma': clas.turma,
            'codigo': clas.codigo
        })
        .then((clas) => {
            console.log(">> Created class: " + JSON.stringify(clas, null, 4));
            return clas;
        })
        .catch((err) => {
            console.log(">> Error while creating class: ", err);
        });
};

exports.getClassById = (userId) => {
    return db.class.findAll({
        where: {
            usuarioId: userId,
        },
        include: ['usuarios'],
    });
}
exports.getClassByCode = (code) => {
    return db.class.findAll({
        where: {
            codigo: code,
        },
        // include: ['usuarios'],
    });
}

exports.getAllClasses = () => {
    return db.class.findAll({
        include: ['usuarios']
    });
}