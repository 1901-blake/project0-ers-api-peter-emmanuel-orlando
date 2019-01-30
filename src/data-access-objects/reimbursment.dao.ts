import { talkToDB, endDBConnection, Inquiry} from "./dbGoBetween";
import { Reimbursement } from "../models/Reimbursement";
import { Pool, QueryResult } from "pg";
import { ReimbursementStatus } from "../models/ReimbursementStatus";
import { ReimbursementType } from "../models/ReimbursementType";


export function foo()
{
    //talkToDB("select * from employee").then((res)=>{console.log(res)});
    //getReimbursementsWithStatus(0).then((res)=>{console.log(res)});

    Reimbursement.factory('harrydave1', 2, 6, 0, 'hgf', 'harrydave', ReimbursementStatus.pending, ReimbursementType.Food ).then((res)=>{
        console.log(res);
        sendToDB(res);
    }).catch((e)=>{console.trace(); console.log(e);})

    console.log('hey');
    //endDBConnection();
}
foo();

export async function getReimbursementsWithStatus( statusId: Number, startdate: string = undefined, enddate: string = undefined): Promise<Reimbursement[]>
{
    let result: Reimbursement[] = undefined;
    let command = `SELECT * FROM reimbursments WHERE statusId = $1`;  
    let vars: any[] = [statusId];
    if(startdate && enddate) 
    {
        command += `AND startdate >= $2 AND enddate >= $3`;
        vars[1] = startdate;
        vars[2] = enddate;
    }
    let inquiry = new Inquiry(command, vars);
    let query = <QueryResult>await talkToDB(inquiry).catch((e)=>{console.trace(); console.log(e)});
    if(query && query.rows)
    result = query.rows.map<Reimbursement>((val) =>{return Reimbursement.castCaseInsensitive(val); });
    return result;
}

export async function getReimbursementsWithUserID( userId: Number, startdate: string = undefined, enddate: string = undefined): Promise<Reimbursement[]>
{
    let result: Reimbursement[] = undefined;
    let command = `SELECT * FROM reimbursments WHERE statusId = $1`;  
    let vars: any[] = [userId];
    if(startdate && enddate) 
    {
        command += `AND startdate >= $2 AND enddate >= $3`;
        vars[1] = startdate;
        vars[2] = enddate;
    }
    let inquiry = new Inquiry(command, vars);
    let query = <QueryResult>await talkToDB(inquiry).catch((e)=>{console.trace(); console.log(e)});
    if(query && query.rows)
        result = Reimbursement.castArrCaseInsensitive(query.rows);
    return result;
}

export async function getReimbursementbyID( reimbursementId: Number): Promise<Reimbursement>
{
    let result: Reimbursement = undefined;
    let command = `SELECT * FROM reimbursments WHERE reimbursementId = $1`; 
    let vars: any[] = [reimbursementId];
    let inquiry = new Inquiry(command, vars);
    let query = <QueryResult>await talkToDB(inquiry).catch((e)=>{console.trace(); console.log(e)});
    if(query && query.rows)
        result = Reimbursement.castCaseInsensitive(query.rows[0] ) ;
    return result;
}

export async function getReimbursement( origAuthor: number, submittedOn: number ): Promise<Reimbursement>
{
    let result: Reimbursement = undefined;
    let command = `SELECT * FROM reimbursments WHERE author = $1 AND dateSubmitted = $1`;
    let vars: any[] = [origAuthor, submittedOn];
    let inquiry = new Inquiry(command, vars);
    let query = <QueryResult>await talkToDB(inquiry).catch((e)=>{console.trace(); console.log(e)});
    if(query && query.rows)
        result = Reimbursement.castCaseInsensitive(query.rows[0]) ;
    return result;
}



///////////////////////////////////////////////////////////////////////////////////////////////
// date submitted should not be changed. this is a timestamp. I can use author and timestamp to check 
// that two reimbursments reference the same thing 
export async function sendToDB( reimbursement: Reimbursement): Promise<Reimbursement>
{     
    //check that this is a valid reimbursment  
    // TODO
    //let success = false;
    //delete from db where author matches author and timestamp matches timestamp
    let command = `DELETE FROM reimbursements WHERE author = $1 AND dateSubmitted = $2;`;  
    let vars: any[] = [reimbursement.author, reimbursement.dateSubmitted]; 
    let inquiry = new Inquiry(command, vars);
    await talkToDB(inquiry).catch((e)=>{console.trace(); console.log(e)});

    //insert this reimbursment into db    
    //  DONT FORGET TO CHANGE THE ID COLUMN TO 'DEFAULT'
    command = `INSERT INTO reimbursements ( reimbursementId, author, amount, dateSubmitted, dateResolved, description, resolver, status, "type" )
        VALUES (DEFAULT, $1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING *;`;
    vars = [reimbursement.author, reimbursement.amount, reimbursement.dateSubmitted, reimbursement.dateResolved, reimbursement.description, (reimbursement.resolver)? reimbursement.resolver : 'NULL', reimbursement.status, reimbursement.type];    
    inquiry = new Inquiry(command, vars);
    
    let result: any = await talkToDB(inquiry).catch((e)=>{console.trace(); console.log(e)});
    if(result)
        result = Reimbursement.castCaseInsensitive(result.rows[0]);
    return result;
}
