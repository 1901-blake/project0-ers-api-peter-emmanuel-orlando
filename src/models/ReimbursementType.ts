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

    private constructor ( typeId: number, type: string )
    {
        this.typeId = typeId;// primary key
        this.type = type;// not null, unique      
    }    

    static readonly lodging = new ReimbursementType(1, 'Lodging');
    static readonly Travel = new ReimbursementType(2, 'Travel');
    static readonly Food = new ReimbursementType(3, 'Food');
    static readonly Other = new ReimbursementType(4, 'Other');
    



}
