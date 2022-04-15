const UserModel = require("./user.model");
import * as MRE from "@microsoft/mixed-reality-extension-sdk";

export default class UserController {
  public async getUser(user: MRE.User) {
    const result = await UserModel.findOne({
      where: {
        AltName: user.name,
      },
    });
    return result ? result.toJSON() : null;
  }

  public async CreateUser(
    FirstName: String,
    LastName: String,
    Email: String,
    PhoneNumber: String,
    AltId: String,
    AltName: String,
    RecruitdayId: String
  ) {
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
