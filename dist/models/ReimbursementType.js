"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// **ReimbursementType**  
// The ReimbursementType model is used to track what kind of reimbursement is being submitted. Type possibilities are `Lodging`, `Travel`, `Food`, or `Other`.
// ```javascript
// {
//   typeId: number, // primary key
//   type: string, // not null, unique
// }
// ```
class ReimbursementType {
    constructor(typeId, type) {
        this.typeId = typeId; // primary key
        this.type = type; // not null, unique      
    }
}
exports.ReimbursementType = ReimbursementType;
function isValidReimbursementType(typeId) {
    var result = false;
    return result;
}
exports.isValidReimbursementType = isValidReimbursementType;
//# sourceMappingURL=ReimbursementType.js.map