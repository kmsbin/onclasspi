module.exports = (sequelize, DataType) => {
    const QuestionModel = sequelize.define('questoes', {
        'conteudo': DataType.TEXT,
        'tipo': DataType.BOOLEAN,
        'provaId': DataType.INTEGER
    });

    return QuestionModel;
}