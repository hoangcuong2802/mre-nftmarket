import * as MRE from "@microsoft/mixed-reality-extension-sdk";
import ImageRender from "../../helper/Img-render";
import RecruitdayApi from "../../helper/RecruitdayApi";
import dotenv from "dotenv";
const { convert } = require("html-to-text");
import EmailHelper from "../../helper/email";
import UserController from "../../modules/users/user.controller";

dotenv.config();

export default class SearchJobv3 {
  private assets: MRE.AssetContainer;
  private _userController = new UserController();
  private jobList: any;
  private jobListElement = new Map<MRE.Guid, MRE.Actor>();
  private jobDetailElement = new Map<MRE.Guid, MRE.Actor>();
  private _recruitdayApi = new RecruitdayApi();
  private _emailHelper = new EmailHelper();
  private userData: any;

  constructor(private context: MRE.Context, q: String, UserData: any, company: String) {
    this.assets = new MRE.AssetContainer(context);
    this.run(q, UserData, company)
  }

  public run(q: String, UserData: any, company: String) {
    this.userData = UserData;
    this.getJob(q).then(() => {
      this.createjobList();
    });
  }

  private async getJob(q: String) {
    this.jobList = [];
    this.jobList = await this._recruitdayApi.searchJob(q);
    return true;
  }

  private createjobList() {
    if (this.jobListElement.get(this.userData.AltId))
      this.jobListElement.get(this.userData.AltId).destroy();
    this.jobListElement.delete(this.userData.AltId);

    let x = 0;
    let y = 0;

    this.jobListElement.set(
      this.userData.AltId,
      MRE.Actor.Create(this.context, {
        actor: {
          exclusiveToUser: this.userData.AltId,
          transform: {
            local: {
              position: { x: x, y: y },
            },
          },
        },
      })
    );

    /**
     * Create Wall
     */
    const mat = this.assets.createMaterial("previewMaterial", {
      color: MRE.Color3.Black(),
      emissiveColor: MRE.Color3.FromHexString("#012451"),
    });
    MRE.Actor.Create(this.context, {
      actor: {
        name: "window",
        appearance: {
          meshId: this.assets.createBoxMesh("button", 0.7, 1, 0.01).id,
          materialId: mat.id,
        },
        transform: {
          local: {
            position: { x: x + 0.25, y: y + 0.3, z: 0.01 },
          },
        },
        collider: {
          geometry: { shape: MRE.ColliderType.Auto },
        },
        parentId: this.jobListElement.get(this.userData.AltId).id,
      },
    });

    /**
     * Render Job Item
     */

    for (var job of this.jobList) {
      this.renderJob(job, x, y);
      y += 0.065;
    }
  }

  private renderJob(job: any, x: number, y: number) {
    let title = job.job_title;
    const jobElement = MRE.Actor.Create(this.context, {
      actor: {
        transform: {
          local: {
            position: { x: x, y: y, z: 0 },
          },
        },
        parentId: this.jobListElement.get(this.userData.AltId).id,
      },
    });

    MRE.Actor.Create(this.context, {
      actor: {
        transform: { local: { position: { x: x, y: y - 0.08, z: 0 } } },
        text: {
          contents: `\n---------------------------------------\n`,
          height: 0.01,
          justify: MRE.TextJustify.Left,
        },
        parentId: jobElement.id,
      },
    });

    MRE.Actor.Create(this.context, {
      actor: {
        transform: { local: { position: { x: x, y: y - 0.04, z: 0 } } },
        text: {
          contents: `${job.job_location} | Vacancies: ${job.number_of_vacancies}`,
          height: 0.02,
          justify: MRE.TextJustify.Left,
        },
        parentId: jobElement.id,
      },
    });

    let button = MRE.Actor.Create(this.context, {
      actor: {
        transform: { local: { position: { x: x, y: y, z: 0 } } },
        collider: {
          geometry: {
            shape: MRE.ColliderType.Box,
            size: { x: 1, y: 0.03, z: 0.01 },
          },
        },
        text: {
          contents: title,
          height: 0.03,
          justify: MRE.TextJustify.Left,
        },
        parentId: jobElement.id,
      },
    });
    button.setBehavior(MRE.ButtonBehavior).onClick(async (user) => {
      if (this.jobDetailElement.get(this.userData.AltId))
        this.jobDetailElement.get(this.userData.AltId).destroy();
      this.jobDetailElement.delete(this.userData.Altid);
      this.renderJobDetails(job);
    });
  }

  private async renderJobDetails(job: any) {
    const jobDescDetails = await this._recruitdayApi.getJobDetails(job.id);
    const rotation = { y: -3, x: 0, z: 0.0, w: 0.5 };
    const wall = { x: 0.7, y: 1, z: 0.01 };
    let x = 0,
      y = 0,
      z = 0;
    this.jobDetailElement.set(
      this.userData.AltId,
      MRE.Actor.Create(this.context, {
        actor: {
          exclusiveToUser: this.userData.AltId,
          transform: {
            local: {
              position: { x: x, y: y },
            },
          },
        },
      })
    );
    /**
     * Create Wall
     */
    const mat = this.assets.createMaterial("previewMaterial", {
      color: MRE.Color3.Black(),
      emissiveColor: MRE.Color3.FromHexString("#012451"),
    });
    const wallElement = MRE.Actor.Create(this.context, {
      actor: {
        name: "window",
        appearance: {
          meshId: this.assets.createBoxMesh("button", wall.x, wall.y, wall.z)
            .id,
          materialId: mat.id,
        },
        transform: {
          local: {
            position: { x: 0.93, y: y + 0.3, z: -0.08 },
            rotation: rotation,
          },
        },
        collider: {
          geometry: { shape: MRE.ColliderType.Auto },
        },
        parentId: this.jobDetailElement.get(this.userData.AltId).id,
      },
    });

    /**
     * Display Button
     */

    this.renderCloseButton(wallElement, wall);
    this.renderApplyButton(wallElement, wall, jobDescDetails);

    ImageRender(
      this.context,
      "assets/button/get-job.png",
      0.15,
      0.05,
      0,
      { x: 0 + 0.3 - wall.x / 2, y: 0 + 0.05 - wall.y / 2, z: 0.02 },
      { y: -3, x: 0, z: 0, w: 0 },
      wallElement.id
    )
      .setBehavior(MRE.ButtonBehavior)
      .onClick(async (user) => {
        user
          .prompt(
            `Are you sure you want to receive this job's full description sent to your email`,
            false
          )
          .then(async (r) => {
            if (r.submitted) {
              const userData = await this._userController.getUser(user);
              await this._emailHelper.SendEmail(
                jobDescDetails,
                this.userData.Email
              );
              user
                .prompt(
                  `We have sent this job's full description to your email address ${this.userData.Email}`,
                  false
                )
                .then((q) => {
                  if (this.jobDetailElement.get(user.id))
                    this.jobDetailElement.get(user.id).destroy();
                  this.jobDetailElement.delete(user.id);
                });
            }
          });
      });

    /**
     * Display Title
     */

    x = wall.x / 2 - 0.05;
    y = wall.y / 2 - 0.05;

    MRE.Actor.Create(this.context, {
      actor: {
        transform: {
          local: {
            position: { x: x, y: y, z: 0.01 },
            rotation: { y: -3, x: 0, z: 0, w: 0 },
          },
        },
        text: {
          contents: `${job.job_title}\n___________________--_________________`,
          height: 0.02,
          justify: MRE.TextJustify.Left,
        },
        parentId: wallElement.id,
      },
    });

    y -= 0.1;

    ImageRender(
      this.context,
      "https://rdblobprod.blob.core.windows.net/prod/custom/company/original/5aff78f93f7f8.jpeg",
      0.15,
      0.15,
      0,
      { x: x - 0.07, y: y - 0.05, z: 0.01 },
      { y: -3, x: 0, z: 0, w: 0 },
      wallElement.id
    );
    /**
     * Display Job Description
     */
    MRE.Actor.Create(this.context, {
      actor: {
        transform: {
          local: {
            position: { x: x, y: y, z: 0.01 },
            rotation: { y: -3, x: 0, z: 0, w: 0 },
          },
        },
        text: {
          contents: `                                 - ${jobDescDetails.job_location
            }
            \n                                 - Type: ${jobDescDetails.custom_employment_type
            }\n                                 - Position Level: ${jobDescDetails.custom_position_level
            }\n                                 - Vacancies: ${jobDescDetails.number_of_vacancies
            }\n\n${this.sliptText(jobDescDetails.description)}`,
          height: 0.02,
          justify: MRE.TextJustify.Left,
        },
        parentId: wallElement.id,
      },
    });
  }

  private renderCloseButton(wallElement: any, wall: any) {
    ImageRender(
      this.context,
      "assets/button/close.png",
      0.15,
      0.05,
      0,
      { x: 0 + 0.1 - wall.x / 2, y: 0 + 0.05 - wall.y / 2, z: 0.02 },
      { y: -3, x: 0, z: 0, w: 0 },
      wallElement.id
    )
      .setBehavior(MRE.ButtonBehavior)
      .onClick(async (user) => {
        if (this.jobDetailElement.get(this.userData.AltId))
          this.jobDetailElement.get(this.userData.AltId).destroy();
        this.jobDetailElement.delete(this.userData.AltId);
      });
  }

  private renderApplyButton(wallElement: any, wall: any, jobDescription: any) {
    ImageRender(
      this.context,
      "assets/button/apply.png",
      0.15,
      0.05,
      0,
      { x: 0 + 0.5 - wall.x / 2, y: 0 + 0.05 - wall.y / 2, z: 0.02 },
      { y: -3, x: 0, z: 0, w: 0 },
      wallElement.id
    )
      .setBehavior(MRE.ButtonBehavior)
      .onClick(async (user) => {
        user
          .prompt(`Are you sure you want to apply this job?`, false)
          .then(async (r) => {
            if (r.submitted) {
              if (this.jobDetailElement.get(user.id))
                this.jobDetailElement.get(user.id).destroy();
              this.jobDetailElement.delete(user.id);
              const userData = await this._userController.getUser(user);
              this._recruitdayApi
                .applyJob(jobDescription.id, userData)
                .then((response) => {
                  if (!response) {
                    user.prompt(
                      `You have already applied for this job. Please check your email inbox for more details.`,
                      false
                    );
                  }
                });
            }
          });
      });
  }

  private sliptText(str: any) {
    str =
      str.length > 1000
        ? str.substr(0, str.lastIndexOf(" ", 997)) + "..."
        : str;
    str = convert(str, {
      wordwrap: 60,
    });
    return str;
  }
}
