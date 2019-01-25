// **ReimbursementType**  
// The ReimbursementType model is used to track what kind of reimbursement is being submitted. Type possibilities are `Lodging`, `Travel`, `Food`, or `Other`.
// ```javascript
// {
//   typeId: number, // primary key
//   type: string, // not null, unique
// }
// ```
export class ReimbursementType
{    
    typeId: number; // primary key
    type: string; // not null, unique   

    constructor ( typeId: number, type: string )
    {
        this.typeId = typeId;// primary key
        this.type = type;// not null, unique      
    }
}

export function isValidReimbursementType(typeId: number): boolean
{
    var result: boolean = false;
    return result;
}