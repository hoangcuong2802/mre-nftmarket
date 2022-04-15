"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(`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`);
class EmailHelper {
    async SendEmail(Job, Email) {
        const msg = {
            to: `${Email}`,
            from: "doannq01@gmail.com",
            template_id: "d-a03846ac0e0149cca0c7e37c8a593f12",
            dynamic_template_data: {
                summary: `
                <h3><b>${Job.job_title}</b></h3>
                <p><b>Job Location</b>: ${Job.job_location}</p>
                <p><b>Employment Type</b>: Full-Time</p>
                <p><b>Position Level</b>: Professional</p>
                <p><b>Work Schedule</b>: Amenable to Any Shift</p>
                <p><b>Job Category</b>: ${Job.job_category.name}</p>
                    <p><b>Vacancy</b>: ${Job.number_of_vacancies}</p>
        `,
                job_description: `${Job.description}`,
                qualifications: `${Job.qualification_description}`,
            },
        };
        sgMail
            .send(msg)
            .then(() => {
            console.log("Email sent");
            return true;
        })
            .catch((error) => {
            console.error(error);
            return false;
        });
    }
}
exports.default = EmailHelper;
//# sourceMappingURL=email.js.map