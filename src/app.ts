/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import * as MRE from "@microsoft/mixed-reality-extension-sdk";
import WelcomeHall from "./world-space/welcome";
import ExhibitionWorld from "./world-space/exhibition";
import LoginForm from "./world-space/test/login-form";
import NFTMarket from "./world-space/nft-market";

/**
 * Filter World Spaces
 *  1. Exhibition World
 *  2. Welcome World
 */
export default class Barhead {
  constructor(private context: MRE.Context, private params: MRE.ParameterSet) {
    // this._searchJob = new SearchJob(context);
    // this._boothArea = new BoothArea(context);
    this.context.onStarted(() => {
      switch (params._c) {
        case "exhibition":
          new ExhibitionWorld(context, params);
          break;
        case "welcome":
          new WelcomeHall(context);
          break;
        case "test":
          // new LoginForm(context);
          // new ScaleElement(context);
          break;
        case "nft":
          new NFTMarket(context);
          break;
        default:
          break;
      }
    });
  }
}
