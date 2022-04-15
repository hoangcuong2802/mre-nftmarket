"use strict";
/**
 * Init Area
 * Tracking user behavior
 */
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
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class MicrosoftBooth {
    constructor(context) {
        this.context = context;
        this.assets = new MRE.AssetContainer(context);
        this.start();
    }
    start() {
        if (this.MicrosoftBoothElement)
            this.MicrosoftBoothElement.destroy();
        const mat = this.assets.createMaterial("previewMaterial", {
            color: MRE.Color3.Black(),
            emissiveColor: MRE.Color3.FromHexString("#012451"),
        });
        this.MicrosoftBoothElement = MRE.Actor.Create(this.context, {
            actor: {
                name: "window",
                appearance: {
                    meshId: this.assets.createBoxMesh("button", 2, 2, 2).id,
                    materialId: mat.id,
                },
                transform: {
                    local: {
                        scale: { x: 1, y: 1, z: 1 },
                        position: { x: 0, y: 0, z: 0 },
                    },
                },
                collider: { geometry: { shape: MRE.ColliderType.Auto } },
                parentId: null,
            },
        });
        this.MicrosoftBoothElement.setBehavior(MRE.ButtonBehavior).onHover("enter", (user) => {
            console.log(user.id, "Enter");
        });
        this.MicrosoftBoothElement.setBehavior(MRE.ButtonBehavior).onHover("exit", (user) => {
            console.log(user.id, "Leave");
            this.start();
        });
    }
}
exports.default = MicrosoftBooth;
//# sourceMappingURL=microsoft-booth.js.map