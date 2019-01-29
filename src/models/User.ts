import { Role } from "./Role";
import { talkToDB } from "../data-access-objects/dbGoBetween";
import { QueryResult } from "pg";

// **User**  
// The User model keeps track of users information.
// ```javascript
// {
//   userId: number, // primary key
// 	username: string, // not null, unique
// 	password: string, // not null
// 	firstName: string, // not null
// 	lastName: string, // not null
// 	email: string, // not null
// 	role: Role // not null
// }
// ```
export class User
{    
    userId: number // primary key
    username: string // not null, unique
    password: string // not null
    firstName: string // not null
    lastName: string // not null
    email: string // not null
    role: Role // not null

    constructor (userId: number, username: string, password: string,
        firstName: string,
        lastName: string, email: string, role: Role )
    {
        this.userId = userId // primary key
        this.username = username // not null, unique
        this.password = password // not null
        this.firstName = firstName // not null
        this.lastName = lastName // not null
        this.email = email // not null
        this.role = role //not null
    }
    
    equals(other: User): boolean
    {
        var result = this.credentialsMatch(other) &&
        this.firstName === other.firstName &&
        this.lastName === other.lastName &&
        this.email === other.email &&
        this.role === other.role
        
        return result;
    }

    credentialsMatch(other: User): boolean
    {
        var result = 
        this.username === other.username &&
        this.password === other.password;

        return result;
    }
    
    static castCaseInsensitive(objLiteral: any): User
    {
        let result: User = new User(undefined, undefined, undefined, undefined, undefined, undefined, undefined);   
        let literalKeys: string[] =  Object.keys(objLiteral);
        for (const key in result) {
            let equivalentKey = literalKeys.find(literalKey => literalKey.toLowerCase() === key.toLowerCase())
            result[key] = objLiteral[equivalentKey];
        }        
        return result;
    }
    
}

console.log(User.castCaseInsensitive({}));