module.exports = (sequelize, DataType) => {
    const UserClassModel = sequelize.define('usuarios_turmas', {
        'usuarioId': DataType.INTEGER,
        'turmaId': DataType.INTEGER
    });

    return UserClassModel;
};