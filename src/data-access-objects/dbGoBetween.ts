import { Pool, Client, QueryResult } from "pg";
import { getSuperSecretPassword } from "../superNormalFile.ignored";


const pool = new Pool({
    database: process.env.awsDatabase,
    host: process.env.awsHost,
    user: process.env.awsUser,
    password: process.env.decLew54dd,
    max: 12,
    port: 5432,
  });
//either this or create a singleton to get the pool
  
/**
 * function to talk to the database when performing multiple queries
 * returns a function that needs to be called to close the connection
 * @param sqlCommand command to be run on the sql database
 * @param callback gives the error and the result
 */
export function openTalkToDB( sqlCommand: string, callback:(err: Error, result: QueryResult) => void): ()=>void
{
    let result: QueryResult = undefined;

    pool.query(sqlCommand, (err, res) => {
        //console.log(err, res);
        callback(err, res);
        pool.end();
    })
    return ()=>{pool.end;};
} 

/**
 * function to talk to the database when performing single query
 * returns a promise that holds the QueryResult from the database
 * @param sqlCommand command to be run on the sql database
 */
export async function talkToDB( sqlCommand: string): Promise<QueryResult>
{
    let result: Promise<QueryResult> = undefined;

    const client = await pool.connect();
    result = client.query(sqlCommand);

    return result;
}




talkToDB('select * from customer').then((res) =>{ console.log(res)}).catch((err)=>{console.error(err);});