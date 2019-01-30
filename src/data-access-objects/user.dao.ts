import { User } from "../models/User";
import { talkToDB, Inquiry } from "./dbGoBetween";
import { QueryResult } from "pg";
import { Role } from "../models/Role";

export function foo()
{
    //talkToDB("select * from employee").then((res)=>{console.log(res)});
    //getReimbursementsWithStatus(0).then((res)=>{console.log(res)});
    //sendToDB(new User(76, "harrydave", 'poogerson', 'harry', 'dave', 'hoo@boo.com', Role.financeManager));
    //sendToDB(new User(76, "harrydave1", 'poogerson1', 'harry1', 'dave1', 'hoo1@boo.com', Role.financeManager));
    console.log('hey');
    //endDBConnection();
}
foo();



export async function getAllUsers(): Promise<User[]>
{
    let result: User[] = undefined;
    let command = `SELECT * FROM "user"`;
    let inquiry = new Inquiry(command, []);
    let query = <QueryResult>await talkToDB(inquiry).catch((e)=>{console.trace(); console.log(e)});
    if(query && query.rows)
    result = User.castArrCaseInsensitive(query.rows);
    return result;
}

export async function getUserByUsername (username: string): Promise<User>
{
    let result: User = undefined;
    let command = `select * from "user" where username = $1;`;
    let vars: any[] = [username];
    let inquiry = new Inquiry(command, vars);
    let query = <QueryResult>await talkToDB(inquiry).catch((e)=>{console.trace(); console.log(e)});
    if(query && query.rows)
    {
        console.log(query.rows[0]);
        result = User.castCaseInsensitive(query.rows[0]);
    }
    return result;
}

export async function checkUserExists (username: string): Promise<boolean>
{
    let result = false;
    result = !! await getUserByUsername (username).catch(()=>{});
    return result;
}

export async function getUserByCredentials (username: string, password: string): Promise<User>
{
    let result: User = undefined;
    let command = `select * from "user" where username = $1 and password = $2`;
    let vars: any[] = [username, password];
    let inquiry = new Inquiry(command, vars);
    let query = <QueryResult>await talkToDB(inquiry).catch((e)=>{console.trace(); console.log(e)});
    if(query && query.rows)
    result = User.castCaseInsensitive(query.rows[0]);
    return result;
}

export async function checkUserCredentialsExists (username: string, password: string): Promise<boolean>
{
    let result = false;
    result = !! await getUserByCredentials (username, password).catch(()=>{});
    return result;
}


export async function getUserById (userId: number): Promise<User>
{
    let result: User = undefined;
    let command = `select * from users where userId = $1`;
    let vars: any[] = [userId];
    let inquiry = new Inquiry(command, vars);
    let query = <QueryResult>await talkToDB(inquiry).catch((e)=>{console.trace(); console.log(e)});
    if(query && query.rows)
        result = User.castCaseInsensitive(query.rows[0]);
    return result;
}

export async function sendToDB (user: User)//: Promise<boolean>
{     
    //check that this is a valid user  
    // TODO
    //let success = false;

    //delete from db where user matches user and password matches password
    let command = `DELETE FROM "user" WHERE username = '$1' AND password = '$2';`;   
    let vars: any[] = [user.username, user.password]
    let inquiry = new Inquiry(command, vars);
    await talkToDB(inquiry).catch((e)=>{console.trace(); console.log(e)});

    //insert this reimbursment into db    
    //  DONT FORGET TO CHANGE THE ID COLUMN TO 'DEFAULT'
    command = `INSERT INTO "user" (userId, username, password, firstName, lastName, email, role )
        VALUES (DEFAULT, '$1', '$2', '$3', '$4', '$5', $6)
        RETURNING *;`;
    vars = [user.username, user.password, user.firstName, user.lastName, user.email, user.role.roleId ]
    inquiry = new Inquiry(command, vars);

    let result: any = await talkToDB(inquiry).catch((e)=>{console.trace(); console.log(e)});
    if(result)
        result = User.castCaseInsensitive(result.rows[0]);
    return result;
}
