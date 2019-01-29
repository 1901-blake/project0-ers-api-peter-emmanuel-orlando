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

    private constructor ( statusId: number, status: string )
    {
        this.statusId = statusId;// primary key
        this.status = status;// not null, unique      
    }

    static readonly pending = new ReimbursementStatus(1, 'Pending');
    static readonly approved = new ReimbursementStatus(2, 'Approved');
    static readonly denied = new ReimbursementStatus(3, 'Denied');
}