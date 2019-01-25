import { checkUserExists } from "./User";
import { isValidReimbursementStatus } from "./ReimbursementStatus";
import { isValidReimbursementType } from "./ReimbursementType";
import { QueryResult } from "pg";
import { talkToDB } from "../dbGoBetween";

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

export function getReimbursementbyID( reimbursementId: Number): Reimbursement
{
    let result: Reimbursement = null;

    return result;
}

export function InsertOrUpdateReimbursementInDB( reimbursement: Reimbursement, callback:(err: Error, result: QueryResult) => void)
{       
    if(isValidReimbursement(reimbursement))
    {
        if(getReimbursementbyID(reimbursement.reimbursementId))//it exists in db
            updateReimbursementInDB(reimbursement, callback);
        else 
            insertReimbursementInDB(reimbursement, callback);
    }
    else
    {
        let errStr = 'reinbursment is not valid. Check that all the fields are properly initialized, especially values that shouldnt be null'
        callback(Error(errStr), undefined);
    }
}

function insertReimbursementInDB( reimbursement: Reimbursement, callback:(err: Error, result: QueryResult) => void)
{
    //must set reimbursment id to 0 so it doesnt collide with anything in the database
    reimbursement.reimbursementId = 0;
 
    let command = `INSERT INTO reimbursements( reimbursementId, author, amount, dateSubmitted, dateResolved, description, resolver, status, type )
    VALUES (${reimbursement.reimbursementId}, ${reimbursement.author}, ${reimbursement.amount}, ${reimbursement.dateSubmitted}, ${reimbursement.dateResolved}, ${reimbursement.description}, ${reimbursement.resolver}, ${reimbursement.status}, ${reimbursement.type})`;

    talkToDB(command, callback);
}

function updateReimbursementInDB( reimbursement: Reimbursement, callback:(err: Error, result: QueryResult) => void)
{
    let command =
    `UPDATE reimbursements
    SET reimbursementId = ${reimbursement.reimbursementId}, author = ${reimbursement.author}, amount = ${reimbursement.amount}, dateSubmitted = ${reimbursement.dateSubmitted}, dateResolved = ${reimbursement.dateResolved}, description = ${reimbursement.description}, resolver = ${reimbursement.resolver}, status = ${reimbursement.status}, type = ${reimbursement.type}
    WHERE condition`
    talkToDB(command, callback);
}

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
        checkUserExists(obj.author) &&
        //check resolver is either undefined, null or a real user
        (!obj.resolver || typeof(obj.resolver) === 'undefined' || checkUserExists(obj.resolver)) && //may break where resolver === 0
        //check dateSubmitted is before current date
        obj.dateSubmitted <= Date.UTC &&
        //check status and type are real
        isValidReimbursementStatus(obj.status) &&
        isValidReimbursementType(obj.type);
    return result;
}


