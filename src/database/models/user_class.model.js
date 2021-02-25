module.exports = (sequelize, DataType) => {
    const UserClassModel = sequelize.define('usuarios_turmas', {
        'usuarioId':{
            type: DataType.INTEGER,
            constraint: false,
            primaryKey: false,
            unique: false,
            references: {
                model: 'usuarios',
                key: 'id'
              },
        },
        'turmaCodigo': {
            type: DataType.STRING,
            constraint: false,
            primaryKey: false,
            unique: false,
            references: {
                model: 'turmas',
                key: 'codigo'
              },
            onDelete: 'NO ACTION',
            allowNull: false,
            
            // unique: true,
        },
    });

    return UserClassModel;
};