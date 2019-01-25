import { Pool, Client, QueryResult } from "pg";
import { getSuperSecretPassword } from "./superNormalFile.ignored";


const pool = new Pool({
    database: process.env.awsDatabase,
    host: process.env.awsHost,
    user: process.env.awsUser,
    password: process.env.decLew54dd,
    max: 12,
    port: 5432,
  });
//either this or create a singleton to get the pool
  
export function talkToDB( sqlCommand: string, callback:(err: Error, result: QueryResult) => void)
{
    let result: QueryResult = undefined;
    
    pool.query(sqlCommand, (err, res) => {
        //console.log(err, res);
        callback(err, res);
        pool.end();
    })
    return result;
}

talkToDB('select * from customer',(err, res) =>{ console.log(err, res)});