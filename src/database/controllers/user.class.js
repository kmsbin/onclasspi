const db = require('../database');

exports.enterClass = (clas) => {
    db.user_class.create({
            'usuarioId': clas.user_id,
            'turmaCodigo': clas.codigo
        })
        .then((clas) => {
            console.log(">> Created class: " + JSON.stringify(clas, null, 4));
            return clas;
        })
        .catch((err) => {
            console.log(">> Error while creating class: ", err);
        });
};
exports.getClassByUserId = (userClass) => {
    return db.sequelize.query('SELECT * FROM usuarios_turmas WHERE "usuarioId" = :user', 
    {
        replacements: { user: userClass},
        type: db.Sequelize.QueryTypes.SELECT,
        mapToModel: true 
    },
    )
}

exports.getClassByUserAndCode = (userClass) => {
    return db.user_class.findAll({
        where: {
            usuarioId: userClass.user_id,
            turmaCodigo: userClass.codigo,
        },
        include: ['usuarios', 'turmas'],
    });
}
exports.getClassByCode = (userClass) =>{  
    return db.user_class.findAll({
        where: {
            turmaCodigo: userClass,
        },
        include: ['usuarios', 'turmas'],
    });
}   

// exports.getAllClasses = () => {
//     return db.user_class.findAll({
//         include: ['usuarios']
//     });
// }