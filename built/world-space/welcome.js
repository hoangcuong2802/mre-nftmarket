"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const MRE = __importStar(require("@microsoft/mixed-reality-extension-sdk"));
const img_render_1 = __importDefault(require("../helper/img-render"));
const dotenv_1 = __importDefault(require("dotenv"));
const RecruitdayApi_1 = __importDefault(require("../helper/RecruitdayApi"));
const user_controller_1 = __importDefault(require("../modules/users/user.controller"));
dotenv_1.default.config();
class WelcomeHall {
    constructor(context) {
        this.context = context;
        this.listTeleporter = new Map();
        this.SignUpForm = new Map();
        this._recruitdayApi = new RecruitdayApi_1.default();
        this._userController = new user_controller_1.default();
        this.assets = new MRE.AssetContainer(this.context);
        this.start();
    }
    Test() {
        img_render_1.default(this.context, "assets/welcome.png", 1.1, 1, 0.19, { x: 0, y: 0, z: 0 }, null, null)
            .setBehavior(MRE.ButtonBehavior)
            .onClick(async (user) => {
            user.prompt(`UserId - ${user.id}`, false);
            // console.log("SignUpForm", user.id);
        });
    }
    start() {
        this.context.onUserJoined(async (user) => {
            // Check
            this.altUserData = await this._userController.getUser(user);
            if (!this.altUserData || this.altUserData == undefined) {
                this.renderSignUpButton(user);
                this.SignUpForm.get(user.id)
                    .setBehavior(MRE.ButtonBehavior)
                    .onClick(async (user) => {
                    this.renderFormSignUp(user);
                });
            }
            else {
                this.renderTeleporter(user.id);
            }
        });
    }
    renderFormSignUp(user) {
        this.makeForm(user, "Enter your First Name", (FirstName) => {
            this.makeForm(user, "Enter your Last Name", (LastName) => {
                this.makeForm(user, "Enter your Email", (Email) => {
                    this.makeForm(user, "Enter your Phone Number", async (PhoneNumber) => {
                        const { success, account_id } = await this._recruitdayApi.createCandidate(FirstName, LastName, Email);
                        this._userController
                            .CreateUser(FirstName, LastName, Email, PhoneNumber, user.id, user.name, account_id)
                            .then(() => {
                            if (this.listTeleporter.get(user.id))
                                this.listTeleporter.get(user.id).destroy();
                            this.listTeleporter.delete(user.id);
                            if (this.SignUpForm.get(user.id))
                                this.SignUpForm.get(user.id).destroy();
                            this.SignUpForm.delete(user.id);
                            this.renderTeleporter(user.id);
                        });
                    });
                });
            });
        });
    }
    renderSignUpButton(user) {
        this.SignUpForm.set(user.id, MRE.Actor.Create(this.context, {
            actor: {
                exclusiveToUser: user.id,
            },
        }));
        img_render_1.default(this.context, "assets/welcome.png", 1.1, 1, 0.19, { x: 0, y: 1.65, z: 0 }, null, this.SignUpForm.get(user.id).id);
        MRE.Actor.CreateFromGltf(this.assets, {
            uri: `https://cdn-content-ingress.altvr.com/uploads/model/gltf/1903484587518984548/scene.glb`,
            colliderType: "mesh",
            actor: {
                name: "submitButton",
                transform: {
                    local: {
                        scale: { x: 0.0075, y: 0.0075, z: 0.0075 },
                        position: { x: 0, y: 0, z: 0 },
                    },
                },
                parentId: this.SignUpForm.get(user.id).id,
            },
        });
    }
    makeForm(user, text, callback) {
        user.prompt(`${text}`, true).then((p) => {
            if (p.submitted === true) {
                if (p.text !== undefined && p.text != "") {
                    callback(p.text);
                }
                else {
                    this.makeForm(user, text, callback);
                }
            }
        });
    }
    renderTeleporter(userId) {
        this.listTeleporter.set(userId, MRE.Actor.CreateFromLibrary(this.context, {
            resourceId: "teleporter:space/" + "1891167640085332143" + "?label=false",
            actor: {
                exclusiveToUser: userId,
                name: "RenderTeleporter",
                transform: {
                    local: {
                        scale: {
                            x: 1.2,
                            y: 1.2,
                            z: 1.2,
                        },
                        position: { x: 0, y: 0, z: 0 },
                        rotation: { x: 0, y: 10, z: 0 },
                    },
                },
            },
        }));
        MRE.Actor.Create(this.context, {
            actor: {
                transform: {
                    local: {
                        position: { x: 0.4, y: 1.2, z: 0 },
                        rotation: { x: 0, y: 10, z: 0 },
                    },
                },
                text: {
                    contents: `Go to Exhibition`,
                    height: 0.1,
                    justify: MRE.TextJustify.Left,
                },
                parentId: this.listTeleporter.get(userId).id,
            },
        });
    }
}
exports.default = WelcomeHall;
//# sourceMappingURL=welcome.js.map