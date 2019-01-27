import { talkToDB, endDBConnection} from "./dbGoBetween";
import { Reimbursement, isValidReimbursement } from "../models/Reimbursement";
import { Pool, QueryResult } from "pg";



export function foo()
{
    //talkToDB("select * from employee").then((res)=>{console.log(res)});
    //getReimbursementsWithStatus(0).then((res)=>{console.log(res)});
    InsertOrUpdateReimbursementInDB(new Reimbursement(1, 8, 8, Date.now(), 0, "test", 9, 9, 8))
    console.log('hey');
    endDBConnection();
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



///////////////////////////////////////////////////////////////////////////////////////////////

export async function InsertOrUpdateReimbursementInDB( reimbursement: Reimbursement)
{       
    let success = <Reimbursement> await getReimbursementbyID(reimbursement.reimbursementId).catch((e)=>{console.log(e)});
    if(success)
        await updateReimbursementInDB(reimbursement).catch((e)=>{console.log(e)});
    else
        await insertReimbursementInDB(reimbursement).catch((e)=>{console.log(e)});
}

async function insertReimbursementInDB( reimbursement: Reimbursement)
{
    if(true)//todo: isValidReimbursement(reimbursement))
    { 
        //must set reimbursment id to 0 so it doesnt collide with anything in the database
        reimbursement.reimbursementId = 0; 
        let command = `INSERT INTO reimbursements( reimbursementId, author, amount, dateSubmitted, dateResolved, description, resolver, status, "type" )
        VALUES (${reimbursement.reimbursementId}, ${reimbursement.author}, ${reimbursement.amount}, ${reimbursement.dateSubmitted}, ${reimbursement.dateResolved}, '${reimbursement.description}', ${reimbursement.resolver}, ${reimbursement.status}, ${reimbursement.type})`;
        //console.log(command);
        let result = <QueryResult>await talkToDB(command).catch((e)=>{console.log(e)})
        if(result)
        {
            console.log(result.rows);
            return result.rows[0];
        }
    }
    else
    {
        let errStr = 'reinbursment is not valid. Check that all the fields are properly initialized, especially values that shouldnt be null';
        return Promise.reject(new Error(errStr));
    }
}

async function updateReimbursementInDB( reimbursement: Reimbursement)
{
    let command =
    `UPDATE reimbursements
    SET reimbursementId = ${reimbursement.reimbursementId}, author = ${reimbursement.author}, amount = ${reimbursement.amount}, dateSubmitted = ${reimbursement.dateSubmitted}, dateResolved = ${reimbursement.dateResolved}, description = ${reimbursement.description}, resolver = ${reimbursement.resolver}, status = ${reimbursement.status}, type = ${reimbursement.type}
    WHERE condition`
    let b = await talkToDB(command).catch((e)=>{console.log(e)})
    console.log(b);
}
