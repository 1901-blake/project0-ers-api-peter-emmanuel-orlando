"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const User_1 = require("../models/User");
// all routes defined with this router start with anything
exports.authMiddleware = express_1.default.Router();
exports.default = exports.authMiddleware;
/*
//check if session is still valid. do this by seeing if there is a user object attached to the session, and the session is not expired
// if there is no user, or if the user on the session is equal to the one fetched from the database, fall through.
// if there is a user, check that the user matches the one from the database in ALL fields,
//      else set the session user to undefined. then fall through
*/
exports.authMiddleware.use('', (req, res, next) => {
    //get the user and get the matching user from the database
    let accessingUser = req.session.user;
    let matchingUser = accessingUser && User_1.getUserById(accessingUser.userId);
    //if not logged in, or no exact match was found
    if (!accessingUser || !matchingUser || !accessingUser.credentialsMatch(matchingUser)) {
        //invalidate session
        req.session.destroy(() => { });
        //redirect to login
        res.redirect('/login');
    }
    else {
        req.session.user = matchingUser;
        next();
    }
});
//# sourceMappingURL=auth.middleware.js.map