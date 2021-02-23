module.exports = (sequelize, DataType) => {
    const TestModel = sequelize.define('provas', {
        'data': DataType.DATE,
        'nome': DataType.STRING,
        'turmaId': DataType.INTEGER
    });

    return TestModel;
};