import { ReimbursementStatus } from "./ReimbursementStatus";
import { ReimbursementType } from "./ReimbursementType";
import { User } from "./User";
import { getUserByCredentials, getUserByUsername } from "../data-access-objects/user.dao";

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

    private constructor (reimbursementId: number, author: number, amount: number, dateSubmitted: number, dateResolved: number, description: string, resolver: number, status: number, type: number)
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

    static async factory( authorUsername: string,
        amount: number, dateSubmitted: number, dateResolved: number, 
        description: string, resolverUsername: string, status: ReimbursementStatus, type: ReimbursementType): Promise<Reimbursement>
    {
        var result: Reimbursement = undefined; 

        //get author user id from authorUserName
        let author: User = <User>await getUserByUsername(authorUsername).catch((e)=>{console.log(e)});
        //get resolver user id from resolverUserName
        let resolver: User = <User>await getUserByUsername(resolverUsername).catch((e)=>{console.log(e)});

        //because the json object returned has all lowercase, 
        //accessing it as a User does not have matching member names

        result = new Reimbursement(0, author && author.userId, amount, dateSubmitted, dateResolved, description, resolver && resolver.userId, status.statusId, type.typeId );
        console.log(author && author.userId);
        console.log(resolver);
        return result;        
    }

    matches(other: Reimbursement): boolean
    {
        var result = 
        this.author === other.author &&
        this.dateSubmitted === other.dateSubmitted;

        return result;
    }    
    
    static castCaseInsensitive(objLiteral: any): Reimbursement
    {
        let result: Reimbursement = new Reimbursement(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined);   
        let literalKeys: string[] =  Object.keys(objLiteral);
        for (const key in result) {
            let equivalentKey = literalKeys.find(literalKey => literalKey.toLowerCase() === key.toLowerCase())
            result[key] = objLiteral[equivalentKey];
        }        
        return result;
    } 
    
    static castArrCaseInsensitive(arrLiteral: any[]): Reimbursement[]
    {
        let result: Reimbursement[] = arrLiteral;
        if(result)        
            result = arrLiteral.map((val)=>{return(this.castCaseInsensitive(val));})
        return result;
    }
}


/*
let v = {
            reimbursementId: 5,
            author: 6,
            amount: 2,
            dateSubmitted: 76,
            dateResolved: 12,
            description: "string", 
            resolver: 183,
            status: 454545,
            type: 344
        }
console.log(Reimbursement.castCaseInsensitive(v));
*/    


/*

export function isValidReimbursement(obj: any): boolean
{
    var result: boolean = true;
    result = result && 
        //check that obj isnt null
        obj &&
        //check that the fields are the correct type and the feilds that shouldnt be null arnt null
        typeof(obj.reimbursementId) === 'number' &&//cant check null normally because zero equates to false
        typeof(obj.author) === 'number' && // foreign key -> User, not null
        typeof(obj.amount) === 'number' &&  // not null
        typeof(obj.dateSubmitted) === 'number' && // not null
        typeof(obj.dateResolved) === 'number' && // not null
        typeof(obj.description) === 'string' && // not null
        (typeof(obj.resolver) === 'number' || typeof(obj.resolver) === 'undefined' || !obj.resolver) && // foreign key -> User
        typeof(obj.status) === 'number' && // foreign ey -> ReimbursementStatus, not null
        typeof(obj.type) === 'number' // foreign key -> ReimbursementType    
        //check author is a real user
        (obj.author) &&
        //check resolver is either undefined, null or a real user
        (!obj.resolver || typeof(obj.resolver) === 'undefined' || checkUserExists(obj.resolver)) && //may break where resolver === 0
        //check dateSubmitted is before current date
        (<number>obj.dateSubmitted) <= Date.now() &&
        //check status and type are real
        isValidReimbursementStatus(obj.status) &&
        isValidReimbursementType(obj.type);
    return result;
}

*/