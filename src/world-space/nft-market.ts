import * as MRE from "@microsoft/mixed-reality-extension-sdk";
import { LookAt, User } from "@microsoft/mixed-reality-extension-sdk";
const axios = require("axios").default;
import dotenv from "dotenv";
import { link, linkSync } from "fs";
import { Transform } from "stream";
const fetch = require('node-fetch');

dotenv.config();

export default class WelcomeHall {
  private assets: MRE.AssetContainer;
  private drawSurface: MRE.Actor;
  private nftDatas: any;
  private whiteButtonModel: MRE.Actor;
  private attachedUsertoken = new Map<MRE.Guid, MRE.Actor>();
  private userId: MRE.Guid;

  app = this
  private items = [
    {
      tokenID: 0,
      tokenURL:
        "https://ipfs.io/ipfs/QmejaAZpo2KYcEpdcNU2SXEw24NmKu4GXKBc9zdA4Rk651",
      name: "ALTVR",
      symbol: "ALT",
      contractAddress: "0x60AC63d88f71d6bDA7EE6291F6C84011e396D2ce",
      marketItem: {
        id: 2,
        marketID: 2,
        price: 30000000,
        seller: "0xDEB272a8211002f2fa64eF4c7B8a0b3dF3569Ce4",
        buyer: "0x6cf7E617d83CAbee50841b3124BB459405d9AF0D / None",
        status: "On-Sale / None",
      },
    },
    {
      tokenID: 1,
      tokenURL:
        "https://ipfs.io/ipfs/QmVKos3anKSNvUgqkFiaSdMmCRvrpnMRVkhkYzkq7Vi6Jb",
      name: "ALTVR",
      symbol: "ALT",
      contractAddress: "0x60AC63d88f71d6bDA7EE6291F6C84011e396D2ce",
      marketItem: {
        id: 3,
        marketID: 3,
        price: 50000000,
        seller: "0xDEB272a8211002f2fa64eF4c7B8a0b3dF3569Ce4",
        buyer: "0x6cf7E617d83CAbee50841b3124BB459405d9AF0D / None",
        status: "On-Sale / None",
      },
    },
  ];
  constructor(private context: MRE.Context) {
    this.assets = new MRE.AssetContainer(this.context);
    this.start();
  }

  private async start() {
    this.context.onUserJoined(async (user) => {
      this.userId = user.id;
      const { name, id } = user;
      console.log({ name, id });
      //const nftDatas = await this.fetchNftImage();
      //console.log({ nftDatas: nftDatas[0]});
      this.nftDatas = await this.fetchNftImage();
      console.log({ nftDatas: this.nftDatas[0]});
      this.showNFTvalues();
      this.userMenu(user.id);
    });
  }

  private async fetchNftImage() {
    const items = this.items;
    const tokenURLs = items.map((r) => r.tokenURL);

    const images = await Promise.all(
      tokenURLs.map(async (r) => await axios.get(`${r}`))
    );

    return items.map((r, i) => ({ ...r, ...images[i].data }));
  }

  private createFormSurface(surfaceposition: number) {
    const surfaceMesh = this.assets.createBoxMesh('NFTSurface', 2, 0.75, .01);
    const mat = this.assets.createMaterial("previewMaterial", {color: MRE.Color3.Black(), emissiveColor:MRE.Color3.FromHexString("#012451")})

    // Create NFT surface
    this.drawSurface = MRE.Actor.Create(this.context, {
      actor: {
        name: 'NFTSurface',
        transform: { local: { position: {x: -.1, y: surfaceposition, z:0.05 } } },
        appearance: { 
          meshId: surfaceMesh.id,
          materialId: mat.id,
         },
        collider: { geometry: { shape: MRE.ColliderType.Auto } }
      }
    });
  }

  private createImg(url: string, x: number, y: number) {
    const tex = this.assets.createTexture("uvgrid", {
      uri: url,
    });
    const mat = this.assets.createMaterial("previewMaterial", {
      color: MRE.Color3.Black(),
      emissiveColor: MRE.Color3.White(),
      emissiveTextureId: tex.id,
    });
    const mesh = this.assets.createBoxMesh("eraseButton", .5, .7, .001);
    return MRE.Actor.Create(this.context, {
      actor: {
        name: "window",
        appearance: {
          meshId: mesh.id,
          materialId: mat.id,
        },
        transform: {
          local: { position: { y, x } }
        },
        collider: { geometry: { shape: MRE.ColliderType.Auto } },
      },
    });
  }

  private showNFTvalues() {
    for(let i = 0; i < this.nftDatas.length; i++)
    {
      this.createFormSurface(i);
      this._whiteButtonModel(i);
      MRE.Actor.Create(this.context, {
        actor: {
          name: 'TextLabel',
          transform: { local: { position: { x: -0.5, y: .25 + i} } },
          text: {
            contents:  this.nftDatas[i].name,
            height: .1,
            anchor: MRE.TextAnchorLocation.MiddleCenter,
            color: MRE.Color3.White()
          }
        }
    });

  //   MRE.Actor.Create(this.context, {
  //     actor: {
  //       name: 'TextLabel',
  //       transform: { local: { position: { x: -0.5, y: .125 + i} } },
  //       text: {
  //         contents:  "Owner: ",
  //         height: .1,
  //         anchor: MRE.TextAnchorLocation.MiddleCenter,
  //         color: MRE.Color3.White()
  //       }
  //     }
  // });

      MRE.Actor.Create(this.context, {
        actor: {
          name: 'TextLabel',
          transform: { local: { position: { x: -0.5, y: i} } },
          text: {
            contents: "Price: " + this.nftDatas[i].marketItem.price + " BLM",  
            height: .1,
            anchor: MRE.TextAnchorLocation.MiddleCenter,
            color: MRE.Color3.White()
          }
        }
      });
        
      //this.createImg('https://ipfs.io/ipfs/QmcH1JmpkrDMZ82FJJFhbSDdm7KNHAz2xQvANSHG5xzzAv', 0, 0)
      this.createImg(this.nftDatas[i].image, .4, i)
    }
  }

  private _whiteButtonModel (buttonposition: number)
  {
    const blackButtonModel = MRE.Actor.CreateFromGltf(this.assets, {
      uri: `https://cdn-content-ingress.altvr.com/uploads/model/gltf/1972402042165002355/answerButton2.glb `,
      colliderType: "mesh",
      actor: {
        name: "purchaseButton",
        transform: {
          local: {
            scale: { x: .5, y: .5, z: .5 },
            position: { x: -.5, y: -.2+ buttonposition, z: 0 },
          },
        },
      },
    });
    
    MRE.Actor.Create(this.context, {
      actor: {
        name: 'TextLabel',
        transform: { local: { position: { x: -.5, y: -.2 + buttonposition, z: -.05} } },
        text: {
          contents: "Buy",
          height: .1,
          anchor: MRE.TextAnchorLocation.MiddleCenter,
          color: MRE.Color3.White()
        }
      }
    });
    const iconHover = blackButtonModel.setBehavior(MRE.ButtonBehavior);
    iconHover.onHover(
      "hovering", 
      (user:any) => {
        if(!this.whiteButtonModel)
        {
          console.log("hovering");
          const mat = this.assets.createMaterial("previewMaterial", {color: MRE.Color3.White()})
          this.whiteButtonModel = MRE.Actor.CreateFromGltf(this.assets, {
          uri: `https://cdn-content-ingress.altvr.com/uploads/model/gltf/1972409441848393759/answerButton.glb `,
          colliderType: "mesh",
          actor: {
            name: "Button",
            transform: {
              local: {
                scale: { x: .5, y: .5, z: .5 },
                position: { x: -.5, y: -.2+ buttonposition, z: 0 },
              },
            },
            appearance: {
              materialId: mat.id,
             },
          },
        }); 
        }          
      }
    )
    iconHover.onHover(
      "exit", 
      (user:any) => {
        console.log("unhovering");
        //this.whiteButtonModel.destroy(); 
        //delete this.whiteButtonModel;
      }
    )
    iconHover.onClick((user: MRE.User) => {
      this.userMenu(user.id);
      console.log("Get NFT Website")
    })
  }

  private userMenu(userId: MRE.Guid) {
    const tex = this.assets.createTexture("uvgrid", {
      uri: 'https://i.imgur.com/IXrnyMl.jpg' ,
    });
    const mat = this.assets.createMaterial("previewMaterial", {
      color: MRE.Color3.Black(),
      emissiveColor: MRE.Color3.White(),
      emissiveTextureId: tex.id,
    });

    const surfaceMesh = this.assets.createBoxMesh('NFTSurface', 2, 0.75, .01);
    //const mat = this.assets.createMaterial("previewMaterial", {color: MRE.Color3.Black(), emissiveColor:MRE.Color3.FromHexString("#012451")})
    const attachPoint = <MRE.AttachPoint> ("right-foot")
      // MRE.Actor.Create(this.context,  {
      //   actor: {
      //     name: 'TextLabel',
      //     transform: { app: { 
      //       position: { x: .3, y: 2.5, z: .6},
      //       rotation: {x: -135, y: 150, z: -90} 
      //     }, 
      //   },
      //     text: {
      //       contents: "User Tokens: ",  
      //       height: .3,
      //       anchor: MRE.TextAnchorLocation.MiddleCenter,
      //       color: MRE.Color3.White()
      //     },
      //     attachment: {
      //       attachPoint: attachPoint,
      //       userId
      //     }
      //   }
      // });
      MRE.Actor.Create(this.context, {
        actor: {
          name: 'NFTSurface',
          transform: { local: 
            { position: { x: .3, y: 2.5, z: .6},
              rotation: {x:280, y:-60, z:90},
              scale: {x: .3, y: .3, z: .3}
          } },
          appearance: { 
            meshId: surfaceMesh.id,
            materialId: mat.id,
           },
          collider: { geometry: { shape: MRE.ColliderType.Auto } },
          attachment: {
            attachPoint: attachPoint,
            userId
          }
        }
      });
      //this.createImg('https://i.imgur.com/BeMS14O.png', .3, 2.5)
      console.log("Show NFT Tokens")
    }
}
