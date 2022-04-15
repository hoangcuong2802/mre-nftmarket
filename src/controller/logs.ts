const UserModel = require("../model/user");
import * as MRE from "@microsoft/mixed-reality-extension-sdk";

export default class LogController {
  public async createLog(
    Action: String,
    AltId: String,
    SpaceId: String,
    EventId: String,
    Description: String
  ) {
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
