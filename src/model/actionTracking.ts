// const { Sequelize, DataTypes, Model } = require("sequelize");
import { Sequelize, DataTypes, Model } from "sequelize";
const conn = require("./db");

class ActionTrackingModel extends Model {}

ActionTrackingModel.init(
  {
    Id: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
      field: "Id",
      allowNull: true,
    },
    Action: DataTypes.STRING,
    AltId: DataTypes.STRING,
    SpaceId: DataTypes.STRING,
    EventId: DataTypes.STRING,
    ActionStartTime: DataTypes.STRING,
    ActionEndTime: DataTypes.STRING,
    Description: DataTypes.STRING,
    Created: DataTypes.DATE,
  },
  {
    sequelize: conn,
    modelName: "ActionTracking",
    tableName: "ActionTracking",
    freezeTableName: true,
  }
);

module.exports = ActionTrackingModel;
