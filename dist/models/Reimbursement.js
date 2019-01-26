"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("./User");
const ReimbursementStatus_1 = require("./ReimbursementStatus");
const ReimbursementType_1 = require("./ReimbursementType");
// **Reimbursement**  
// The Reimbursement model is used to represent a single reimbursement that an employee would submit
// ```javascript
// {
//   reimbursementId: number, // primary key
// 	author: number,  // foreign key -> User, not null
// 	amount: number,  // not null
//   dateSubmitted: number, // not null
//   dateResolved: number, // not null
//   description: string, // not null
//   resolver: number, // foreign key -> User
//   status: number, // foreign ey -> ReimbursementStatus, not null
//   type: number // foreign key -> ReimbursementType
// }
// ```
class Reimbursement {
    constructor(reimbursementId, author, amount, dateSubmitted, dateResolved, description, resolver, status, type) {
        this.reimbursementId = reimbursementId; // primary key
        this.author = author; // foreign key -> User, not null
        this.amount = amount; // not null
        this.dateSubmitted = dateSubmitted; // not null
        this.dateResolved = dateResolved; // not null
        this.description = description; // not null
        this.resolver = resolver; // foreign key -> User
        this.status = status; // foreign ey -> ReimbursementStatus, not null
        this.type = type; // foreign key -> ReimbursementType        
    }
}
exports.Reimbursement = Reimbursement;
function isValidReimbursement(obj) {
    var result = true;
    result = result &&
        //check that obj isnt null
        obj &&
        //check that the fields are the correct type and the feilds that shouldnt be null arnt null
        typeof (obj.reimbursementId) === 'number' && //cant check null normally because zero equates to false
        typeof (obj.author) === 'number' && // foreign key -> User, not null
        typeof (obj.amount) === 'number' && // not null
        typeof (obj.dateSubmitted) === 'number' && // not null
        typeof (obj.dateResolved) === 'number' && // not null
        typeof (obj.description) === 'string' && // not null
        (typeof (obj.resolver) === 'number' || typeof (obj.resolver) === 'undefined' || !obj.resolver) && // foreign key -> User
        typeof (obj.status) === 'number' && // foreign ey -> ReimbursementStatus, not null
        typeof (obj.type) === 'number'; // foreign key -> ReimbursementType    
    //check author is a real user
    User_1.checkUserExists(obj.author) &&
        //check resolver is either undefined, null or a real user
        (!obj.resolver || typeof (obj.resolver) === 'undefined' || User_1.checkUserExists(obj.resolver)) && //may break where resolver === 0
        //check dateSubmitted is before current date
        obj.dateSubmitted <= Date.UTC &&
        //check status and type are real
        ReimbursementStatus_1.isValidReimbursementStatus(obj.status) &&
        ReimbursementType_1.isValidReimbursementType(obj.type);
    return result;
}
exports.isValidReimbursement = isValidReimbursement;
//# sourceMappingURL=Reimbursement.js.map