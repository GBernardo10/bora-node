import { Model, Sequelize, DataTypes } from 'sequelize';
import config from '../config/database';
const sequelize = new Sequelize(config);

class Carteira extends Model {}
Carteira.init(
  {
    id_carteira: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
    },
    id_usuario: {
      type: DataTypes.UUID,
      foreignKey: true,
    },
    saldo: DataTypes.DOUBLE
  },
  {
    tableName: 'carteira',
    sequelize
  }
);
