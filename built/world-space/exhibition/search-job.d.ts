import * as MRE from "@microsoft/mixed-reality-extension-sdk";
export default class SearchJobv3 {
    private context;
    private assets;
    private _userController;
    private jobList;
    private jobListElement;
    private jobDetailElement;
    private _recruitdayApi;
    private _emailHelper;
    private userData;
    constructor(context: MRE.Context, q: String, UserData: any, company: String);
    run(q: String, UserData: any, company: String): void;
    private getJob;
    private createjobList;
    private renderJob;
    private renderJobDetails;
    private renderCloseButton;
    private renderApplyButton;
    private sliptText;
}
//# sourceMappingURL=search-job.d.ts.map