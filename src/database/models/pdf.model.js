const { sequelize } = require("../database");

module.exports = (sequelize, DataType) => {
    const PdfModel = sequelize.define('pdfs', {
        'url': DataType.STRING,
        'provaId': DataType.INTEGER
    });

    return PdfModel;
};