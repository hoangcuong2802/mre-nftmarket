import * as MRE from "@microsoft/mixed-reality-extension-sdk";
import UserController from "../../modules/users/user.controller";
import SearchJob from './search-job'
import MicrosoftBooth from './booths/microsoft-booth'

export default class ExhibitionWorld {
  private _userController = new UserController();
  constructor(private context: MRE.Context, private params: MRE.ParameterSet) {
    this.start()
  }

  async start() {
    this.context.onUserJoined(async (user) => {
      const userData = await this._userController.getUser(user);
      switch (this.params._i) {
        case "jobs":
          new SearchJob(this.context, "data",
            { ...userData, AltId: user.id },
            this.params._i)
          break;
        case "microsoft-booth":
          new MicrosoftBooth(this.context)
          break;
        default:
          break;
      }
    });
  }



}
