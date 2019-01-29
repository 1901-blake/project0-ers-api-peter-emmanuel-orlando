import { talkToDB, endDBConnection} from "./dbGoBetween";
import { Reimbursement } from "../models/Reimbursement";
import { Pool, QueryResult } from "pg";
import { ReimbursementStatus } from "../models/ReimbursementStatus";
import { ReimbursementType } from "../models/ReimbursementType";


export function foo()
{
    //talkToDB("select * from employee").then((res)=>{console.log(res)});
    //getReimbursementsWithStatus(0).then((res)=>{console.log(res)});

    Reimbursement.factory('harrydave1', 2, 6, null, 'hgf', 'harrydave', ReimbursementStatus.pending, ReimbursementType.Food ).then((res)=>{
        sendToDB(res);
    }).catch((e)=>{console.log(e);})
    console.log('hey');
    //endDBConnection();
}
foo();

export async function getReimbursementsWithStatus( statusId: Number, startdate: string = undefined, enddate: string = undefined): Promise<Reimbursement[]>
{
    let result: Reimbursement[] = undefined;
    let command = `SELECT * FROM reimbursments WHERE statusId = ${statusId}`;
    if(startdate && enddate) 
        command += `AND startdate >= ${startdate} AND enddate >= ${enddate}`;
    let query = <QueryResult>await talkToDB(command).catch((e)=>{console.log(e)});
    if(query && query.rows)
    result = query.rows;
    return result;
}

export async function getReimbursementsWithUserID( userId: Number, startdate: string = undefined, enddate: string = undefined): Promise<Reimbursement[]>
{
    let result: Reimbursement[] = undefined;
    let command = `SELECT * FROM reimbursments WHERE statusId = ${userId}`;
    if(startdate && enddate) 
        command += `AND startdate >= ${startdate} AND enddate >= ${enddate}`;
    let query = <QueryResult>await talkToDB(command).catch((e)=>{console.log(e)});
    if(query && query.rows)
    result = query.rows;
    return result;
}

export async function getReimbursementbyID( reimbursementId: Number): Promise<Reimbursement>
{
    let result: Reimbursement = undefined;
    let command = `SELECT * FROM reimbursments WHERE reimbursementId = ${reimbursementId}`;
    let query = <QueryResult>await talkToDB(command).catch((e)=>{console.log(e)});
    if(query && query.rows)
    result = query.rows[0];
    return result;
}

export async function getReimbursement( origAuthor: number, submittedOn: number ): Promise<Reimbursement>
{
    let result: Reimbursement = undefined;
    let command = `SELECT * FROM reimbursments WHERE author = ${origAuthor} AND dateSubmitted = ${submittedOn}`;
    let query = <QueryResult>await talkToDB(command).catch((e)=>{console.log(e)});
    if(query && query.rows)
    result = query.rows[0];
    return result;
}



///////////////////////////////////////////////////////////////////////////////////////////////
// date submitted should not be changed. this is a timestamp. I can use author and timestamp to check 
// that two reimbursments reference the same thing 
export async function sendToDB( reimbursement: Reimbursement)//: Promise<boolean>
{     
    //check that this is a valid reimbursment  
    // TODO
    //let success = false;

    //delete from db where author matches author and timestamp matches timestamp
    let command = `DELETE FROM reimbursements WHERE author = ${reimbursement.author} AND dateSubmitted = ${reimbursement.dateSubmitted};`;   
    await talkToDB(command).catch((e)=>{console.log(e)});

    //insert this reimbursment into db    
    //  DONT FORGET TO CHANGE THE ID COLUMN TO 'DEFAULT'
    command = `INSERT INTO reimbursements ( reimbursementId, author, amount, dateSubmitted, dateResolved, description, resolver, status, "type" )
        VALUES (DEFAULT, ${reimbursement.author}, ${reimbursement.amount}, ${reimbursement.dateSubmitted}, ${(reimbursement.dateResolved)?reimbursement.dateResolved : 'NULL'}, '${reimbursement.description}', ${(reimbursement.resolver)? reimbursement.resolver : 'NULL'}, ${reimbursement.status}, ${reimbursement.type});`;
    await talkToDB(command).catch((e)=>{console.log(e)})

    //return success;
}
