import { Pool, Client } from "pg";

const pool = new Pool({
    user: 'dbuser',
    host: 'database.server.com',
    database: 'mydb',
    password: 'secretpassword',
    port: 3211,
  })

  
export function talkToDB( sqlCommand: string)
pool.query('SELECT NOW()', (err, res) => {
    console.log(err, res)
    pool.end()
  })