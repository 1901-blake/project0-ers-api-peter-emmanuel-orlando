"use strict";
// **Role**  
// The Role model is used to track what permissions a user has
// ```javascript
// {
//   roleId: number, // primary key
//   role: string // not null, unique
// }
// ```
Object.defineProperty(exports, "__esModule", { value: true });
class Role {
    constructor(roleId, role) {
        this.roleId = roleId; // primary key
        this.role = role; // not null, unique        
    }
}
exports.Role = Role;
//# sourceMappingURL=Role.js.map