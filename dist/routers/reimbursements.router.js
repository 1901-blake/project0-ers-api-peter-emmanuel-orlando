"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Reimbursement_1 = require("../models/Reimbursement");
const utils_1 = require("../utils");
// all routes defined with this router start with '/users'
exports.reimbursmentsRouter = express_1.default.Router();
exports.default = exports.reimbursmentsRouter;
exports.reimbursmentsRouter.get('/status/:statusId/', (req, res) => {
    let accessingUser = req.session.user;
    if (accessingUser.role.role === 'finance-manager') {
        let startEndDate = getStartEndDateFromURL(req.originalUrl);
        let reimbursments = Reimbursement_1.getReimbursementsWithStatus(req.params.statusId, startEndDate[0], startEndDate[1]);
        res.status(200).json(reimbursments);
    }
    else
        res.sendStatus(403);
});
exports.reimbursmentsRouter.get('/author/userId/:userId', (req, res) => {
    let accessingUser = req.session.user;
    if (accessingUser.role.role === 'finance-manager' || accessingUser.userId === req.params.userId) {
        let startEndDate = getStartEndDateFromURL(req.originalUrl);
        let reimbursments = Reimbursement_1.getReimbursementsWithUserID(req.params.userId, startEndDate[0], startEndDate[1]);
        res.status(200).json(reimbursments);
    }
    else
        res.sendStatus(403);
});
exports.reimbursmentsRouter.post('', (req, res) => {
    let accessingUser = req.session.user;
    let newReimbursement = req.body;
    let statusResult = 201;
    //if Reimbursement author id doesnt match the userId or the user isnt administrator, return error
    if (accessingUser.role.role === 'finance-manager' || accessingUser.userId === newReimbursement.author) {
        //set objectid to 0 before sending to db  
        newReimbursement.reimbursementId = 0;
        //send to db
        if (!Reimbursement_1.addNewReimbursement(newReimbursement))
            statusResult = 400;
    }
    else {
        statusResult = 403;
    }
    ;
    res.sendStatus(statusResult);
});
exports.reimbursmentsRouter.patch('', (req, res) => {
    let accessingUser = req.session.user;
    if (accessingUser.role.role === 'finance-manager') {
        //get updates
        let updatesToReimbursement = req.body;
        //fetch current Reimbursement
        let result = Reimbursement_1.getReimbursementbyID(updatesToReimbursement.reimbursementId);
        //set variaable with status code
        let statusCode = 400;
        //update result with new val if current user is found
        if (result) {
            statusCode = 200;
            result = utils_1.updateWith(result, updatesToReimbursement);
        }
        //send result back to db
        Reimbursement_1.updateReimbursementInDB(result);
        //send back response        
        res.status(statusCode).json(result);
    }
});
function getStartEndDateFromURL(url) {
    let result = [];
    let dirtyString = url;
    dirtyString = dirtyString.replace(/.*\?/, '');
    let startdate = dirtyString.split('&')[0].replace('start=:', '');
    let enddate = dirtyString.split('&')[1].replace('end=:', '');
    result = [startdate, enddate];
    return result;
}
//# sourceMappingURL=reimbursements.router.js.map