"use strict";
/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const welcome_1 = __importDefault(require("./world-space/welcome"));
const exhibition_1 = __importDefault(require("./world-space/exhibition"));
const nft_market_1 = __importDefault(require("./world-space/nft-market"));
/**
 * Filter World Spaces
 *  1. Exhibition World
 *  2. Welcome World
 */
class Barhead {
    constructor(context, params) {
        this.context = context;
        this.params = params;
        // this._searchJob = new SearchJob(context);
        // this._boothArea = new BoothArea(context);
        this.context.onStarted(() => {
            switch (params._c) {
                case "exhibition":
                    new exhibition_1.default(context, params);
                    break;
                case "welcome":
                    new welcome_1.default(context);
                    break;
                case "test":
                    // new LoginForm(context);
                    // new ScaleElement(context);
                    break;
                case "nft":
                    new nft_market_1.default(context);
                    break;
                default:
                    break;
            }
        });
    }
}
exports.default = Barhead;
//# sourceMappingURL=app.js.map