"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UserModel = require("./user.model");
class UserController {
    async getUser(user) {
        const result = await UserModel.findOne({
            where: {
                AltName: user.name,
            },
        });
        return result ? result.toJSON() : null;
    }
    async CreateUser(FirstName, LastName, Email, PhoneNumber, AltId, AltName, RecruitdayId) {
        const userData = await UserModel.create({
            FirstName,
            LastName,
            Email,
            PhoneNumber,
            AltId,
            AltName,
            RecruitdayId,
        });
        return userData;
    }
}
exports.default = UserController;
//# sourceMappingURL=user.controller.js.map