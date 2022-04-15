"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const axios = require("axios").default;
dotenv_1.default.config();
const { RECRUIT_API_HOST, RECRUIT_API_EMPLOYER, RECRUIT_API_CLIENT_ID, RECRUIT_API_CLIENT_SECRET, } = process.env;
class RecruitdayApi {
    /**
     * CreateAccount
     */
    async createCandidate(first_name, last_name, email_address) {
        const token = await this.getAccessToken();
        const { data } = await axios.post(`${RECRUIT_API_HOST}api/account/candidate?access_token=${token}`, {
            first_name: first_name,
            last_name: last_name,
            email_address: email_address,
        });
        const { success, account_id } = data;
        return { success, account_id };
    }
    /**
     * Search Job
     */
    async searchJob(q) {
        const token = await this.getAccessToken();
        const { data } = await axios.get(`${RECRUIT_API_HOST}api/jobs?access_token=${token}`);
        const listJobs = data.data.splice(0, 7);
        return listJobs;
    }
    /**
     *
     * Get Job Details
     */
    async getJobDetails(jobId) {
        const token = await this.getAccessToken();
        const { data } = await axios.get(`${RECRUIT_API_HOST}api/jobs/${jobId}?access_token=${token}`);
        return data.data;
    }
    /**
     *
     * Apply a job
     */
    async applyJob(jobId, userData) {
        const token = await this.getAccessToken();
        try {
            const { data, error } = await axios.post(`${RECRUIT_API_HOST}api/job-application?access_token=${token}`, {
                employer_id: 3613,
                job_id: jobId,
                candidate_id: parseInt(userData.RecruitdayId),
                message: "",
                referrer_id: null,
            });
            if (error)
                return error;
            return data.data;
        }
        catch (error) {
            return false;
        }
    }
    async getAccessToken() {
        try {
            const { data } = await axios.get(`${RECRUIT_API_HOST}oauth/v2/token?grant_type=client_credentials&client_id=${RECRUIT_API_CLIENT_ID}&client_secret=${RECRUIT_API_CLIENT_SECRET}`);
            return data.access_token;
        }
        catch (error) {
            console.error("RecruitdayApi", error);
        }
    }
}
exports.default = RecruitdayApi;
//# sourceMappingURL=RecruitdayApi.js.map