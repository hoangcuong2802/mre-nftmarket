"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize_1 = require("sequelize");
const conn = require("./db");
class ActionTrackingModel extends sequelize_1.Model {
}
ActionTrackingModel.init({
    Id: {
        primaryKey: true,
        autoIncrement: true,
        type: sequelize_1.DataTypes.INTEGER,
        field: "Id",
        allowNull: true,
    },
    Action: sequelize_1.DataTypes.STRING,
    AltId: sequelize_1.DataTypes.STRING,
    SpaceId: sequelize_1.DataTypes.STRING,
    EventId: sequelize_1.DataTypes.STRING,
    ActionStartTime: sequelize_1.DataTypes.STRING,
    ActionEndTime: sequelize_1.DataTypes.STRING,
    Description: sequelize_1.DataTypes.STRING,
    Created: sequelize_1.DataTypes.DATE,
}, {
    sequelize: conn,
    modelName: "ActionTracking",
    tableName: "ActionTracking",
    freezeTableName: true,
});
module.exports = ActionTrackingModel;
//# sourceMappingURL=actionTracking.js.map