import * as MRE from "@microsoft/mixed-reality-extension-sdk";
import ImageRender from "../helper/img-render";
import dotenv from "dotenv";
import RecruitdayApi from "../helper/RecruitdayApi";
import UserController from "../modules/users/user.controller";

dotenv.config();

export default class WelcomeHall {
  private assets: MRE.AssetContainer;
  private listTeleporter = new Map<MRE.Guid, MRE.Actor>();
  private SignUpForm = new Map<MRE.Guid, MRE.Actor>();
  private altUserData: any;

  private _recruitdayApi = new RecruitdayApi();
  private _userController = new UserController();

  constructor(private context: MRE.Context) {
    this.assets = new MRE.AssetContainer(this.context);
    this.start()
  }

  public Test() {
    ImageRender(
      this.context,
      "assets/welcome.png",
      1.1,
      1,
      0.19,
      { x: 0, y: 0, z: 0 },
      null,
      null
    )
      .setBehavior(MRE.ButtonBehavior)
      .onClick(async (user: MRE.User) => {
        user.prompt(`UserId - ${user.id}`, false);
        // console.log("SignUpForm", user.id);
      });
  }

  public start() {
    this.context.onUserJoined(async (user) => {
      // Check
      this.altUserData = await this._userController.getUser(user);
      if (!this.altUserData || this.altUserData == undefined) {
        this.renderSignUpButton(user);
        this.SignUpForm.get(user.id)
          .setBehavior(MRE.ButtonBehavior)
          .onClick(async (user: MRE.User) => {
            this.renderFormSignUp(user);
          });
      } else {
        this.renderTeleporter(user.id);
      }
    });
  }

  private renderFormSignUp(user: MRE.User) {
    this.makeForm(user, "Enter your First Name", (FirstName: String) => {
      this.makeForm(user, "Enter your Last Name", (LastName: String) => {
        this.makeForm(user, "Enter your Email", (Email: String) => {
          this.makeForm(
            user,
            "Enter your Phone Number",
            async (PhoneNumber: String) => {
              const { success, account_id } =
                await this._recruitdayApi.createCandidate(
                  FirstName,
                  LastName,
                  Email
                );
              this._userController
                .CreateUser(
                  FirstName,
                  LastName,
                  Email,
                  PhoneNumber,
                  user.id,
                  user.name,
                  account_id
                )
                .then(() => {
                  if (this.listTeleporter.get(user.id))
                    this.listTeleporter.get(user.id).destroy();
                  this.listTeleporter.delete(user.id);
                  if (this.SignUpForm.get(user.id))
                    this.SignUpForm.get(user.id).destroy();
                  this.SignUpForm.delete(user.id);
                  this.renderTeleporter(user.id);
                });
            }
          );
        });
      });
    });
  }

  private renderSignUpButton(user: MRE.User) {
    this.SignUpForm.set(
      user.id,
      MRE.Actor.Create(this.context, {
        actor: {
          exclusiveToUser: user.id,
        },
      })
    );
    ImageRender(
      this.context,
      "assets/welcome.png",
      1.1,
      1,
      0.19,
      { x: 0, y: 1.65, z: 0 },
      null,
      this.SignUpForm.get(user.id).id
    );
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

  private makeForm(user: MRE.User, text: String, callback: Function) {
    user.prompt(`${text}`, true).then((p) => {
      if (p.submitted === true) {
        if (p.text !== undefined && p.text != "") {
          callback(p.text);
        } else {
          this.makeForm(user, text, callback);
        }
      }
    });
  }

  private renderTeleporter(userId: any) {
    this.listTeleporter.set(
      userId,
      MRE.Actor.CreateFromLibrary(this.context, {
        resourceId:
          "teleporter:space/" + "1891167640085332143" + "?label=false",
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
      })
    );
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
