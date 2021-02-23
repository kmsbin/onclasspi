module.exports = (sequelize, DataType) => {
    const ClassModel = sequelize.define('turmas', {
        'disciplina': DataType.STRING,
        'turma': DataType.STRING,
        'professorID': DataType.STRING,
        'usuarioId': DataType.INTEGER,
        'codigo': {
            type: DataType.STRING,
            unique: true,
            primaryKey: false, 
            constraints: false,
        }
    });

    return ClassModel;
}