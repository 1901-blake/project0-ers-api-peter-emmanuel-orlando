import { Pool, Client, PoolClient, QueryResult } from "pg";
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
 * Function to talk to the database when performing multiple queries. 
 * Returns a function that needs to be called to close the connection.
 * endDBConnection can also be called
 * @param sqlCommand command to be run on the sql database
 * @param callback gives the error and the result
 */
export function multiTalkToDB( sqlCommand: string, callback:(err: Error, result: QueryResult) => void)
{
    let result: QueryResult = undefined;

    pool.query(sqlCommand, (err, res) => {
        //console.log(err, res);
        callback(err, res);
    })
} 

/**
 * function to talk to the database when performing single query. 
 * Returns a promise that holds the QueryResult from the database
 * @param sqlCommand command to be run on the sql database
 */
export async function talkToDB( sqlCommand: string): Promise<QueryResult>
{
    let result: QueryResult = undefined;

    const client = <PoolClient> (await pool.connect().catch((e)=>{console.log(e);}));
    if (client && client.query) 
    {
        result = <QueryResult>(await client.query(sqlCommand).catch((e)=>{console.log(e);}));
        client.release();        
    } 
    return result;
}


export async function endDBConnection(): Promise<void>
{
    return pool.end()
}



//talkToDB('select * from customer').then((res) =>{ console.log(res)}).catch((err)=>{console.error(err);});