"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_controller_1 = __importDefault(require("../../modules/users/user.controller"));
const search_job_1 = __importDefault(require("./search-job"));
const microsoft_booth_1 = __importDefault(require("./booths/microsoft-booth"));
class ExhibitionWorld {
    constructor(context, params) {
        this.context = context;
        this.params = params;
        this._userController = new user_controller_1.default();
        this.start();
    }
    async start() {
        this.context.onUserJoined(async (user) => {
            const userData = await this._userController.getUser(user);
            switch (this.params._i) {
                case "jobs":
                    new search_job_1.default(this.context, "data", Object.assign(Object.assign({}, userData), { AltId: user.id }), this.params._i);
                    break;
                case "microsoft-booth":
                    new microsoft_booth_1.default(this.context);
                    break;
                default:
                    break;
            }
        });
    }
}
exports.default = ExhibitionWorld;
//# sourceMappingURL=index.js.map