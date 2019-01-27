// **ReimbursementStatus**  
// The ReimbursementStatus model is used to track the status of reimbursements. Status possibilities are `Pending`, `Approved`, or `Denied`.
// ```javascript
// {
//   statusId: number, // primary key
//   status: string // not null, unique
// }
// ```
import pg from 'pg';

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
    
    const client = new pg.Client()
    client.connect()
    client.query('SELECT $1::text as name', ['brianc'], (err, res) => {
        if (err) throw err
        console.log(res)
        //client.end()
    })
    return result;
}