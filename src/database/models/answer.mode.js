const { sequelize } = require("../database");

module.exports = (sequelize, DataType) => {
    const AnswerModel = sequelize.define('respostas', {
        'conteudo': DataType.TEXT,
        'questoId': DataType.INTEGER
    });

    return AnswerModel;
};