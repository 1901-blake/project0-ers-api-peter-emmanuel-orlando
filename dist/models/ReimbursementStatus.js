"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// **ReimbursementStatus**  
// The ReimbursementStatus model is used to track the status of reimbursements. Status possibilities are `Pending`, `Approved`, or `Denied`.
// ```javascript
// {
//   statusId: number, // primary key
//   status: string // not null, unique
// }
// ```
const pg_1 = __importDefault(require("pg"));
class ReimbursementStatus {
    constructor(statusId, status) {
        this.statusId = statusId; // primary key
        this.status = status; // not null, unique      
    }
}
exports.ReimbursementStatus = ReimbursementStatus;
function isValidReimbursementStatus(statusId) {
    var result = false;
    const client = new pg_1.default.Client();
    client.connect();
    client.query('SELECT $1::text as name', ['brianc'], (err, res) => {
        if (err)
            throw err;
        console.log(res);
        client.end();
    });
    return result;
}
exports.isValidReimbursementStatus = isValidReimbursementStatus;
//# sourceMappingURL=ReimbursementStatus.js.map