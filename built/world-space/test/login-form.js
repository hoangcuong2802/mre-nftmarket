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
const img_render_1 = __importDefault(require("../../helper/img-render"));
class LoginForm {
    constructor(context) {
        this.context = context;
        this.users = {
            email: "",
            pass: "",
        };
        this.assets = new MRE.AssetContainer(this.context);
        this.start();
    }
    start() {
        this.context.onUserJoined(async (user) => {
            this.userId = user.id;
            const form = img_render_1.default(this.context, "assets/Screen Shot 2022-04-01 at 14.08.20.png", 0.8, 1, 0.01, { x: 0, y: 0, z: 0 }, null, null);
            this._emailElement(form);
            this._passElement(form);
        });
    }
    _emailElement(form) {
        if (this.emailElement)
            this.emailElement.destroy();
        this.emailElement = MRE.Actor.Create(this.context, {
            actor: {
                exclusiveToUser: this.userId,
                name: "window",
                transform: {
                    local: {
                        position: { x: -0.275, y: 0.025, z: -0.02 },
                    },
                },
                text: {
                    contents: this.users.email === "" ? `Enter your email....` : this.users.email,
                    height: 0.025,
                    justify: MRE.TextJustify.Left,
                },
                parentId: form.id,
                collider: {
                    geometry: {
                        shape: MRE.ColliderType.Box,
                        size: { x: 1, y: 0.03, z: 0.01 },
                        center: { x: 0, y: 0, z: 0 },
                    },
                },
            },
        });
        this.emailElement
            .setBehavior(MRE.ButtonBehavior)
            .onClick((user) => {
            user.prompt(`Enter your email....`, true).then((p) => {
                if (p.submitted === true) {
                    if (p.text !== undefined && p.text != "") {
                        this.users = Object.assign(Object.assign({}, this.users), { email: p.text });
                        this._emailElement(form);
                    }
                }
            });
        });
        return this.emailElement;
    }
    _passElement(form) {
        if (this.passElement)
            this.passElement.destroy();
        this.passElement = MRE.Actor.Create(this.context, {
            actor: {
                exclusiveToUser: this.userId,
                transform: {
                    local: {
                        position: { x: -0.275, y: -0.072, z: -0.02 },
                    },
                },
                text: {
                    contents: this.users.pass === ""
                        ? `Enter your password....`
                        : "******************",
                    height: 0.025,
                    justify: MRE.TextJustify.Left,
                },
                parentId: form.id,
                collider: {
                    geometry: {
                        shape: MRE.ColliderType.Box,
                        size: { x: 1, y: 0.03, z: 0.01 },
                    },
                },
            },
        });
        this.passElement
            .setBehavior(MRE.ButtonBehavior)
            .onClick((user) => {
            user.prompt(`Enter your password....`, true).then((p) => {
                if (p.submitted === true) {
                    if (p.text !== undefined && p.text != "") {
                        this.users = Object.assign(Object.assign({}, this.users), { pass: p.text });
                        this._passElement(form);
                    }
                }
            });
        });
        return this.passElement;
    }
}
exports.default = LoginForm;
//# sourceMappingURL=login-form.js.map