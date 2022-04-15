import * as MRE from "@microsoft/mixed-reality-extension-sdk";
export default class TrackingUSer {
    private _connectedUsers;
    private firstUser;
    get connectedUsers(): Map<MRE.Guid, MRE.User>;
    userJoined(user: MRE.User): void;
    userLeft(user: MRE.User): void;
}
//# sourceMappingURL=TrackingUser.d.ts.map