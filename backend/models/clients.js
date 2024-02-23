const { Model, DataTypes } = require('@neonjs/core');

class Client extends Model {
  static schema = {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    telefone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dataContratacao: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    checklist: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: [],
    },
    observacoes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  };
}

module.exports = Client;
