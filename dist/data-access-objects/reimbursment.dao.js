"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const dbGoBetween_1 = require("./dbGoBetween");
const Reimbursement_1 = require("../models/Reimbursement");
function foo() {
    //talkToDB("select * from employee").then((res)=>{console.log(res)});
    //getReimbursementsWithStatus(0).then((res)=>{console.log(res)});
    insertReimbursementInDB(new Reimbursement_1.Reimbursement(1, 8, 8, Date.now(), 0, "test", 9, 9, 8));
    console.log('hey');
    dbGoBetween_1.endDBConnection();
}
exports.foo = foo;
foo();
function getReimbursementsWithStatus(statusId, startdate = undefined, enddate = undefined) {
    return __awaiter(this, void 0, void 0, function* () {
        let result = undefined;
        let command = `SELECT * FROM reimbursments WHERE statusId = ${statusId}`;
        if (startdate && enddate)
            command += `AND startdate >= ${startdate} AND enddate >= ${enddate}`;
        let query = yield dbGoBetween_1.talkToDB(command).catch((e) => { console.log(e); });
        if (query && query.rows)
            result = query.rows;
        return result;
    });
}
exports.getReimbursementsWithStatus = getReimbursementsWithStatus;
function getReimbursementsWithUserID(userId, startdate = undefined, enddate = undefined) {
    return __awaiter(this, void 0, void 0, function* () {
        let result = undefined;
        let command = `SELECT * FROM reimbursments WHERE statusId = ${userId}`;
        if (startdate && enddate)
            command += `AND startdate >= ${startdate} AND enddate >= ${enddate}`;
        let query = yield dbGoBetween_1.talkToDB(command).catch((e) => { console.log(e); });
        if (query && query.rows)
            result = query.rows;
        return result;
    });
}
exports.getReimbursementsWithUserID = getReimbursementsWithUserID;
function getReimbursementbyID(reimbursementId) {
    return __awaiter(this, void 0, void 0, function* () {
        let result = undefined;
        let command = `SELECT * FROM reimbursments WHERE reimbursementId = ${reimbursementId}`;
        let query = yield dbGoBetween_1.talkToDB(command).catch((e) => { console.log(e); });
        if (query && query.rows)
            result = query.rows[0];
        return result;
    });
}
exports.getReimbursementbyID = getReimbursementbyID;
///////////////////////////////////////////////////////////////////////////////////////////////
function InsertOrUpdateReimbursementInDB(reimbursement) {
    return __awaiter(this, void 0, void 0, function* () {
        let success = yield getReimbursementbyID(reimbursement.reimbursementId).catch((e) => { console.log(e); });
        if (success)
            yield updateReimbursementInDB(reimbursement).catch((e) => { console.log(e); });
        else
            yield insertReimbursementInDB(reimbursement).catch((e) => { console.log(e); });
    });
}
exports.InsertOrUpdateReimbursementInDB = InsertOrUpdateReimbursementInDB;
function insertReimbursementInDB(reimbursement) {
    return __awaiter(this, void 0, void 0, function* () {
        if (true) //todo: isValidReimbursement(reimbursement))
         {
            //must set reimbursment id to 0 so it doesnt collide with anything in the database
            reimbursement.reimbursementId = 0;
            let command = `INSERT INTO reimbursements( reimbursementId, author, amount, dateSubmitted, dateResolved, description, resolver, status, "type" )
        VALUES (${reimbursement.reimbursementId}, ${reimbursement.author}, ${reimbursement.amount}, ${reimbursement.dateSubmitted}, ${reimbursement.dateResolved}, '${reimbursement.description}', ${reimbursement.resolver}, ${reimbursement.status}, ${reimbursement.type})`;
            //console.log(command);
            let result = yield dbGoBetween_1.talkToDB(command).catch((e) => { console.log(e); });
            if (result) {
                console.log(result.rows);
                return result.rows[0];
            }
        }
        else {
            let errStr = 'reinbursment is not valid. Check that all the fields are properly initialized, especially values that shouldnt be null';
            return Promise.reject(new Error(errStr));
        }
    });
}
function updateReimbursementInDB(reimbursement) {
    return __awaiter(this, void 0, void 0, function* () {
        let command = `UPDATE reimbursements
    SET reimbursementId = ${reimbursement.reimbursementId}, author = ${reimbursement.author}, amount = ${reimbursement.amount}, dateSubmitted = ${reimbursement.dateSubmitted}, dateResolved = ${reimbursement.dateResolved}, description = ${reimbursement.description}, resolver = ${reimbursement.resolver}, status = ${reimbursement.status}, type = ${reimbursement.type}
    WHERE condition`;
        let b = yield dbGoBetween_1.talkToDB(command).catch((e) => { console.log(e); });
        console.log(b);
    });
}
//# sourceMappingURL=reimbursment.dao.js.map