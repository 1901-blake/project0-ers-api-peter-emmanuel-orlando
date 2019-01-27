"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
function getAllUsers(callback) {
    //get all users from database
    //talkToDB( 'select * from users');
}
exports.getAllUsers = getAllUsers;
function getUserByCredentials(username, password) {
    var result;
    let s = `select * from users where username = ${username} and password = ${password}`;
    return result;
}
exports.getUserByCredentials = getUserByCredentials;
function getUserById(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        var result;
        `select * from users where userId = ${userId}`;
        return result;
    });
}
exports.getUserById = getUserById;
function updateUserInDB(user) {
    //nullcheck
    // TODO
}
exports.updateUserInDB = updateUserInDB;
function checkUserExists(id) {
    let result;
    // TODO
    return result;
}
exports.checkUserExists = checkUserExists;
//# sourceMappingURL=user.dao.js.map