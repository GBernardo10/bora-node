import { Model, Sequelize, DataTypes } from 'sequelize';
import config from '../config/database';
const sequelize = new Sequelize(config);

class Extract extends Model {}
Extract.init(
  {
    id_extract: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
    },
    balance: {type : DataTypes.FLOAT},
    date: {
      type: Sequelize.DATE,
    },
    createdAt: {
      type: DataTypes.DATE,
      field: 'created_at',
    },
    updatedAt: {
      type: DataTypes.DATE,
      field: 'updated_at'
    },
    wallet_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model : 'wallet', key: 'id_wallet'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    }
  },
  {
    tableName: 'extract',
    sequelize
  }
);

export default Extract
