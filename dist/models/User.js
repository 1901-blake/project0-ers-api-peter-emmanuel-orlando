"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
class User {
    constructor(userId, username, password, firstName, lastName, email, role) {
        this.userId = userId; // primary key
        this.username = username; // not null, unique
        this.password = password; // not null
        this.firstName = firstName; // not null
        this.lastName = lastName; // not null
        this.email = email; // not null
        this.role = role; //not null
    }
    equals(other) {
        var result = this.credentialsMatch(other) &&
            this.firstName === other.firstName &&
            this.lastName === other.lastName &&
            this.email === other.email &&
            this.role === other.role;
        return result;
    }
    credentialsMatch(other) {
        var result = this.userId === other.userId &&
            this.username === other.username &&
            this.password === other.password;
        return result;
    }
}
exports.User = User;
//# sourceMappingURL=User.js.map