import { Pool, Client, QueryResult } from "pg";
import { getSuperSecretPassword } from "./superNormalFile.ignored";


const pool = new Pool({
    user: 'p0670083130',
    host: 'revature-server.cehts5jd7lml.us-east-2.rds.amazonaws.com',
    database: 'p0670083130',
    password: getSuperSecretPassword(),
    port: 5432,
  })
  
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