const db = require('../database');

exports.createClass = (clas) => {
    db.class.create({
            'disciplina': clas.disciplina,
            'userId': clas.user_id
        })
        .then((clas) => {
            console.log(">> Created class: " + JSON.stringify(clas, null, 4));
            return user;
        })
        .catch((err) => {
            console.log(">> Error while creating class: ", err);
        });
};

exports.getClassById = (clas) => {
    return db.class.findAll({
        where: {
            id: clas.id,
        },
        include: ['usuarios']
    });
}

exports.getAllClasses = () => {
    return db.class.findAll({
        include: ['usuarios']
    });
}