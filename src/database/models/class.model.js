module.exports = (sequelize, DataType) => {
    const ClassModel = sequelize.define('turmas', {
        'disciplina': DataType.STRING,
        'usuarioId': DataType.INTEGER,
        'codigo': DataType.UUID
    });

    return ClassModel;
}