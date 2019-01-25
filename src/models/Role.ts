// **Role**  
// The Role model is used to track what permissions a user has
// ```javascript
// {
//   roleId: number, // primary key
//   role: string // not null, unique
// }
// ```

export class Role
{    
    roleId: number; // primary key
    role: string; // not null, unique

    constructor (roleId: number, role: string )
    {
        this.roleId = roleId; // primary key
        this.role = role; // not null, unique        
    }
}