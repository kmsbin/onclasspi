module.exports = (sequelize, DataType) => {
    const UserModel = sequelize.define('usuarios', {
        'nome': DataType.STRING,
        'email': DataType.STRING,
        'professor': DataType.BOOLEAN,
        'password_hash': DataType.STRING,
        'password_salt': DataType.STRING
    });

    return UserModel;
}