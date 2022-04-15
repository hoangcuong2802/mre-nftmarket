import { Sequelize } from "sequelize-typescript";
const { Sequelize: SequelizeJs } = require("sequelize");

SequelizeJs.DATE.prototype._stringify = function _stringify(
  date: any,
  options: any
) {
  return this._applyTimezone(date, options).format("YYYY-MM-DD HH:mm:ss.SSS");
};

module.exports = new Sequelize({
  database: "barhead",
  username: "doannq",
  password: "Bloom!@#123",
  host: "barhead-bloom.database.windows.net",
  dialect: "mssql",
  logging: false,
});
