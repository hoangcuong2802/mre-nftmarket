"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ActionTrackingModel = require("./model/actionTracking");
class TrackingUSer {
    constructor() {
        this._connectedUsers = new Map();
    }
    get connectedUsers() {
        return this._connectedUsers;
    }
    userJoined(user) {
        // this.connectedUsers.set(user.id, user);
        // if (!this.firstUser) {
        //   this.firstUser = user;
        // }
        console.log(user);
        // return user;
        // ActionTrackingModel.create({
        //   Action: ActionEvent.Join,
        //   AltId: user.id,
        //   SpaceId:
        // });
    }
    userLeft(user) {
        this.connectedUsers.delete(user.id);
        this.firstUser = null;
    }
}
exports.default = TrackingUSer;
//# sourceMappingURL=TrackingUser.js.map