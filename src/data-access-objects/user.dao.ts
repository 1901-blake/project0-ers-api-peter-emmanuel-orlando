import { User } from "../models/User";
import { talkToDB } from "./dbGoBetween";

export function getAllUsers(callback:(err: Error, result: QueryResult) => void){
    //get all users from database
    talkToDB( 'select * from users', callback );
}

export function getUserByCredentials (username: string, password: string)
{
    var result;
    let s = `select * from users where username = ${username} and password = ${password}`
    return result;
}

export async function getUserById (userId: number): Promise<User>
{
    var result;
    `select * from users where userId = ${userId}`;
    return result;
}

export function updateUserInDB (user: User)
{
    //nullcheck
    // TODO
}

export function checkUserExists(id: number): boolean
{
    let result: boolean;
    // TODO
    return result;
}