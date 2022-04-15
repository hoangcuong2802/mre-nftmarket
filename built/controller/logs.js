"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UserModel = require("../model/user");
class LogController {
    async createLog(Action, AltId, SpaceId, EventId, Description) {
        const userData = await UserModel.create({
            Action,
            AltId,
            SpaceId,
            EventId,
            ActionStartTime: new Date(),
            ActionEndTime: new Date(),
            Description,
        });
        return userData;
    }
}
exports.default = LogController;
//# sourceMappingURL=logs.js.map