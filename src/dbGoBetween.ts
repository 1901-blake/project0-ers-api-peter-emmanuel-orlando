import { Pool, Client } from "pg";
import { getSuperSecretPassword } from "./superNormalFile.ignored";

const pool = new Pool({
    user: 'p0670083130',
    host: 'database.server.com',
    database: 'mydb',
    password: getSuperSecretPassword(),
    port: 3211,
  })

  
export function talkToDB( sqlCommand: string)
pool.query('SELECT NOW()', (err, res) => {
    console.log(err, res)
    pool.end()
  })