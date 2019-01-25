// **ReimbursementStatus**  
// The ReimbursementStatus model is used to track the status of reimbursements. Status possibilities are `Pending`, `Approved`, or `Denied`.
// ```javascript
// {
//   statusId: number, // primary key
//   status: string // not null, unique
// }
// ```
export class ReimbursementStatus
{    
    statusId: number; // primary key
    status: string; // not null, unique   

    constructor ( statusId: number, status: string )
    {
        this.statusId = statusId;// primary key
        this.status = status;// not null, unique      
    }
}
export function isValidReimbursementStatus(statusId: number): boolean
{
    var result: boolean = false;
    return result;
}