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

export class Reimbursement
{    
    reimbursementId: number; // primary key
    author: number;  // foreign key -> User, not null
    amount: number;  // not null
    dateSubmitted: number; // not null
    dateResolved: number; // not null
    description: string; // not null
    resolver: number; // foreign key -> User
    status: number; // foreign ey -> ReimbursementStatus, not null
    type: number; // foreign key -> ReimbursementType    

    constructor (reimbursementId: number, author: number, amount: number, dateSubmitted: number, dateResolved: number, description: string, resolver: number, status: number, type: number)
    {
        this.reimbursementId = reimbursementId; // primary key
        this.author = author;  // foreign key -> User, not null
        this.amount = amount;  // not null
        this.dateSubmitted = dateSubmitted; // not null
        this.dateResolved = dateResolved; // not null
        this.description = description; // not null
        this.resolver = resolver; // foreign key -> User
        this.status = status; // foreign ey -> ReimbursementStatus, not null
        this.type = type; // foreign key -> ReimbursementType        
    }
}

export function getReimbursementsWithStatus( statusId: Number, startdate: string = undefined, enddate: string = undefined): Reimbursement[]
{
    let result: Reimbursement[] = [];

    return result;
}

export function getReimbursementsWithUserID( userId: Number, startdate: string = undefined, enddate: string = undefined): Reimbursement[]
{
    let result: Reimbursement[] = [];

    return result;
}

export function isValidReimbursement(objectToCheck: any): boolean
{
    var result: boolean = true;
    //check that the fields that shouldnt be null arnt null
    //check resolver, status, and 
    //set objectid to 0
    return result;
}


