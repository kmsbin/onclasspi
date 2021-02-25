module.exports = (sequelize, DataType) => {
    const AlternativeModel = sequelize.define('alternativas', {
        'conteudo': DataType.TEXT,
        'resposta': DataType.TEXT,
        'questoId': DataType.INTEGER
    });

    return AlternativeModel;
};