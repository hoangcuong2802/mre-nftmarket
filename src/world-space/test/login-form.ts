import * as MRE from "@microsoft/mixed-reality-extension-sdk";
import ImageRender from "../../helper/img-render";

export default class LoginForm {
  private assets: MRE.AssetContainer;
  private emailElement: MRE.Actor;
  private passElement: MRE.Actor;
  private users: any = {
    email: "",
    pass: "",
  };
  private userId: MRE.Guid;

  constructor(private context: MRE.Context) {
    this.assets = new MRE.AssetContainer(this.context);
    this.start();
  }

  public start() {
    this.context.onUserJoined(async (user) => {
      this.userId = user.id;
      const form = ImageRender(
        this.context,
        "assets/Screen Shot 2022-04-01 at 14.08.20.png",
        0.8,
        1,
        0.01,
        { x: 0, y: 0, z: 0 },
        null,
        null
      );

      this._emailElement(form);

      this._passElement(form);
    });
  }

  private _emailElement(form: any) {
    if (this.emailElement) this.emailElement.destroy();
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
          contents:
            this.users.email === "" ? `Enter your email....` : this.users.email,
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
      .onClick((user: MRE.User) => {
        user.prompt(`Enter your email....`, true).then((p) => {
          if (p.submitted === true) {
            if (p.text !== undefined && p.text != "") {
              this.users = {
                ...this.users,
                email: p.text,
              };
              this._emailElement(form);
            }
          }
        });
      });

    return this.emailElement;
  }

  private _passElement(form: any) {
    if (this.passElement) this.passElement.destroy();
    this.passElement = MRE.Actor.Create(this.context, {
      actor: {
        exclusiveToUser: this.userId,
        transform: {
          local: {
            position: { x: -0.275, y: -0.072, z: -0.02 },
          },
        },
        text: {
          contents:
            this.users.pass === ""
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
      .onClick((user: MRE.User) => {
        user.prompt(`Enter your password....`, true).then((p) => {
          if (p.submitted === true) {
            if (p.text !== undefined && p.text != "") {
              this.users = {
                ...this.users,
                pass: p.text,
              };
              this._passElement(form);
            }
          }
        });
      });
    return this.passElement;
  }
}
