"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const { Sequelize: SequelizeJs } = require("sequelize");
SequelizeJs.DATE.prototype._stringify = function _stringify(date, options) {
    return this._applyTimezone(date, options).format("YYYY-MM-DD HH:mm:ss.SSS");
};
module.exports = new sequelize_typescript_1.Sequelize({
    database: "barhead",
    username: "doannq",
    password: "Bloom!@#123",
    host: "barhead-bloom.database.windows.net",
    dialect: "mssql",
    logging: false,
});
//# sourceMappingURL=db.js.map