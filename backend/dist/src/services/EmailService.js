"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendJobApplyNotification = exports.sendUpdateUserNotification = exports.sendJobsToCandidates = exports.sendNewUserNotification = exports.sendCandidatesToEmployers = exports.sendResetPassword = exports.sendVerification = exports.sendEmail = void 0;
const path_1 = __importDefault(require("path"));
const ejs_1 = __importDefault(require("ejs"));
const mail_1 = __importDefault(require("@sendgrid/mail"));
const config_1 = __importDefault(require("../config"));
const sendEmail = (to, subject, template, data) => __awaiter(void 0, void 0, void 0, function* () {
    mail_1.default.setApiKey(config_1.default.sendgridSecret || '');
    const from = config_1.default.mailSenderEmail || "donnie@aerovision.io";
    const html = yield ejs_1.default.renderFile(path_1.default.join(__dirname, `../templates/${template}.ejs`), data);
    let message = { from, to, subject, html };
    const msg = Object.assign(Object.assign({}, message), { text: 'iDENTIFY' });
    try {
        yield mail_1.default.send(msg);
    }
    catch (error) {
        console.log(error);
        throw error;
    }
});
exports.sendEmail = sendEmail;
const sendVerification = (to, name) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const base_url = config_1.default.frontendUrl || 'http://localhost:3000';
        yield (0, exports.sendEmail)(to, 'Welcome to inTulsa!', 'register-verification', {
            url: `${base_url}/verify`,
            firstName: name,
        });
        return true;
    }
    catch (error) {
        console.log('Error during sending invitation');
        console.log(error);
        console.log(JSON.stringify(error.response.body));
        throw error;
    }
});
exports.sendVerification = sendVerification;
const sendResetPassword = (to, name, token) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const base_url = process.env.FRONTEND_URL || 'http://localhost:3000';
        yield (0, exports.sendEmail)(to, 'Reset your password!', 'reset-password', {
            url: `${base_url}/reset-password?token=${token}`,
            name: name,
        });
        return true;
    }
    catch (error) {
        console.log('Error during sending invitation');
        console.log(error);
        console.log(JSON.stringify(error.response.body));
        throw error;
    }
});
exports.sendResetPassword = sendResetPassword;
const sendCandidatesToEmployers = (candidates, employers_emails) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, exports.sendEmail)(employers_emails, 'List of candidates', 'list-of-candidates', {
            candidates: candidates,
        });
        return true;
    }
    catch (error) {
        console.log('Error during sending candidates list to employers');
        console.log(error);
        console.log(JSON.stringify(error.response.body));
        throw error;
    }
});
exports.sendCandidatesToEmployers = sendCandidatesToEmployers;
const sendNewUserNotification = (to, name) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const base_url = process.env.FRONTEND_URL || 'http://localhost:3000';
        yield (0, exports.sendEmail)(to, 'Welcome to inTulsa!', 'new-user-notification', {
            name: name,
            url: `${base_url}/login`
        });
        return true;
    }
    catch (error) {
        console.log('Error during sending new user notification');
        console.log(error);
        console.log(JSON.stringify(error.response.body));
        throw error;
    }
});
exports.sendNewUserNotification = sendNewUserNotification;
const sendJobsToCandidates = (jobs, candidates_emails) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, exports.sendEmail)(candidates_emails, 'List of jobs', 'list-of-jobs', {
            jobs: jobs,
        });
        return true;
    }
    catch (error) {
        console.log('Error during sending jobs list to candidates');
        console.log(error);
        console.log(JSON.stringify(error.response.body));
        throw error;
    }
});
exports.sendJobsToCandidates = sendJobsToCandidates;
const sendUpdateUserNotification = (to, name) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const base_url = process.env.FRONTEND_URL || 'http://localhost:3000';
        yield (0, exports.sendEmail)(to, 'Your account has been updated!', 'update-user-notification', {
            name: name,
            url: `${base_url}/login`
        });
        return true;
    }
    catch (error) {
        console.log('Error during sending update user notification');
        console.log(error);
        console.log(JSON.stringify(error.response.body));
        throw error;
    }
});
exports.sendUpdateUserNotification = sendUpdateUserNotification;
const sendJobApplyNotification = (to, name) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const base_url = process.env.FRONTEND_URL || 'http://localhost:3000';
        yield (0, exports.sendEmail)(to, 'Job has been applied!', 'apply-job-notification', {
            name: name,
            url: `${base_url}/login`
        });
        return true;
    }
    catch (error) {
        console.log('Error during sending apply job notification');
        console.log(error);
        console.log(JSON.stringify(error.response.body));
        throw error;
    }
});
exports.sendJobApplyNotification = sendJobApplyNotification;
