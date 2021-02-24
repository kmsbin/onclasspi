const db = require('../database');

exports.createUser = (user) => {
    db.users.create({
            'nome': user.name,
            'email': user.email,
            'professor': user.teacher,
            'password_hash': user.password_hash,
            'password_salt': user.password_salt
        })
        .then((user) => {
            // console.log(">> Created user: " + JSON.stringify(user, null, 4));
            return user;
        })
        .catch((err) => {
            console.log(">> Error while creating user: ", err);
        });
}

exports.getUserByPk = (user) => {
    return db.users.findAll({
        where: {
            id: user.id,
        },
    });
}

exports.getUserByEmail = (user) => {
    return db.users.findAll({
        where: {
            email: user.email
        }
    });
}