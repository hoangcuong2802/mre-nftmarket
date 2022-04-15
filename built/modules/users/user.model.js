"use strict";
const { Sequelize, DataTypes, Model } = require("sequelize");
const conn = require("../../helper/db");
class UserModel extends Model {
}
UserModel.init({
    Id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
        field: "id",
        allowNull: true,
    },
    AltName: DataTypes.STRING,
    AltId: DataTypes.STRING,
    FirstName: DataTypes.STRING,
    LastName: DataTypes.STRING,
    Email: DataTypes.STRING,
    RecruitdayId: DataTypes.STRING,
    PhoneNumber: DataTypes.STRING,
}, {
    sequelize: conn,
    modelName: "Users",
    tableName: "Users",
    freezeTableName: true,
});
module.exports = UserModel;
//# sourceMappingURL=user.model.js.map