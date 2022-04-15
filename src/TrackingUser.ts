import * as MRE from "@microsoft/mixed-reality-extension-sdk";
const ActionTrackingModel = require("./model/actionTracking");
import { ActionEvent } from "./helper/constant";

export default class TrackingUSer {
  private _connectedUsers = new Map<MRE.Guid, MRE.User>();
  private firstUser: MRE.User;

  public get connectedUsers() {
    return this._connectedUsers;
  }

  public userJoined(user: MRE.User) {
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

  public userLeft(user: MRE.User) {
    this.connectedUsers.delete(user.id);
    this.firstUser = null;
  }
}
