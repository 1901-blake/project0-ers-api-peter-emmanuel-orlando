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
function getReimbursementsWithStatus(statusId, startdate = undefined, enddate = undefined) {
    return __awaiter(this, void 0, void 0, function* () {
        let result = undefined;
        let command = `SELECT * FROM reimbursments WHERE statusId = ${statusId}`;
        if (startdate && enddate)
            command += `AND startdate >= ${startdate} AND enddate >= ${enddate}`;
        var p = yield dbGoBetween_1.talkToDB(command).then((res) => { result = res.rows; }, (reason) => { let tmp = null; return tmp; });
        console.log('butts');
        return [];
    });
}
exports.getReimbursementsWithStatus = getReimbursementsWithStatus;
function foo() {
    var g = getReimbursementsWithStatus(0).then(() => { }).catch(() => { return Promise.resolve(); });
    let arr = ['j'];
    arr.forEach(() => { console.log('hello'); });
    console.log('hey');
    dbGoBetween_1.endDBConnection();
}
exports.foo = foo;
foo();
function getReimbursementsWithUserID(userId, startdate = undefined, enddate = undefined) {
    return __awaiter(this, void 0, void 0, function* () {
        let result = undefined;
        let command = `SELECT * FROM reimbursments WHERE statusId = ${userId}`;
        if (startdate && enddate)
            command += `AND startdate >= ${startdate} AND enddate >= ${enddate}`;
        return result;
    });
}
exports.getReimbursementsWithUserID = getReimbursementsWithUserID;
/*
export function getReimbursementbyID( reimbursementId: Number, callback:(err: Error, result: QueryResult) => void)
{
    let result: Reimbursement = null;

    return result;
}

///////////////////////////////////////////////////////////////////////////////////////////////

export function InsertOrUpdateReimbursementInDB( reimbursement: Reimbursement, callback:(err: Error, result: QueryResult) => void)
{
    if(isValidReimbursement(reimbursement))
    {
        getReimbursementbyID(reimbursement.reimbursementId, (err, res) =>{
            if(err)
                insertReimbursementInDB(reimbursement, callback);
            else
                updateReimbursementInDB(reimbursement, callback);
        });
    }
    else
    {
        let errStr = 'reinbursment is not valid. Check that all the fields are properly initialized, especially values that shouldnt be null'
        callback(Error(errStr), undefined);
    }
}

function insertReimbursementInDB( reimbursement: Reimbursement, callback:(err: Error, result: QueryResult) => void)
{
    //must set reimbursment id to 0 so it doesnt collide with anything in the database
    reimbursement.reimbursementId = 0;
 
    let command = `INSERT INTO reimbursements( reimbursementId, author, amount, dateSubmitted, dateResolved, description, resolver, status, type )
    VALUES (${reimbursement.reimbursementId}, ${reimbursement.author}, ${reimbursement.amount}, ${reimbursement.dateSubmitted}, ${reimbursement.dateResolved}, ${reimbursement.description}, ${reimbursement.resolver}, ${reimbursement.status}, ${reimbursement.type})`;

    talkToDB(command, callback);
}

function updateReimbursementInDB( reimbursement: Reimbursement, callback:(err: Error, result: QueryResult) => void)
{
    let command =
    `UPDATE reimbursements
    SET reimbursementId = ${reimbursement.reimbursementId}, author = ${reimbursement.author}, amount = ${reimbursement.amount}, dateSubmitted = ${reimbursement.dateSubmitted}, dateResolved = ${reimbursement.dateResolved}, description = ${reimbursement.description}, resolver = ${reimbursement.resolver}, status = ${reimbursement.status}, type = ${reimbursement.type}
    WHERE condition`
    talkToDB(command, callback);
}

*/ 
//# sourceMappingURL=reimbursment.dao.js.map