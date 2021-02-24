module.exports = (sequelize, DataType) => {
    const TestModel = sequelize.define('provas', {
        'data': {
            type: DataType.DATE,
            allowNull: true,
        },
        'nome': DataType.STRING,
        'turmaId': DataType.INTEGER
    });

    return TestModel;
};