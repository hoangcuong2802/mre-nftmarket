/**
 * Init Area
 * Tracking user behavior
 */

import * as MRE from "@microsoft/mixed-reality-extension-sdk";
import dotenv from "dotenv";

dotenv.config();

export default class MicrosoftBooth {
  private MicrosoftBoothElement: any;
  private assets: MRE.AssetContainer;

  constructor(private context: MRE.Context) {
    this.assets = new MRE.AssetContainer(context);
    this.start();
  }

  private start() {
    if (this.MicrosoftBoothElement) this.MicrosoftBoothElement.destroy();

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
    this.MicrosoftBoothElement.setBehavior(MRE.ButtonBehavior).onHover(
      "enter",
      (user: any) => {
        console.log(user.id, "Enter");
      }
    );
    this.MicrosoftBoothElement.setBehavior(MRE.ButtonBehavior).onHover(
      "exit",
      (user: any) => {
        console.log(user.id, "Leave");
        this.start();
      }
    );
  }
}
