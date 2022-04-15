export default class RecruitdayApi {
    /**
     * CreateAccount
     */
    createCandidate(first_name: String, last_name: String, email_address: String): Promise<{
        success: any;
        account_id: any;
    }>;
    /**
     * Search Job
     */
    searchJob(q: String): Promise<any>;
    /**
     *
     * Get Job Details
     */
    getJobDetails(jobId: String): Promise<any>;
    /**
     *
     * Apply a job
     */
    applyJob(jobId: String, userData: any): Promise<any>;
    private getAccessToken;
}
//# sourceMappingURL=RecruitdayApi.d.ts.map