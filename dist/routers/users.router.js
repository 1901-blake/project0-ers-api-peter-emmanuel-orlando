"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const utils_1 = require("../utils");
const user_dao_1 = require("../data-access-objects/user.dao");
// all routes defined with this router start with '/users'
exports.usersRouter = express_1.default.Router();
exports.default = exports.usersRouter;
exports.usersRouter.get('', (req, res) => {
    let accessingUser = req.session.user;
    if (accessingUser.role.role === 'finance-manager') {
        user_dao_1.getAllUsers((err, response) => {
            res.status(200).json(response.rows);
        });
    }
});
exports.usersRouter.patch('', (req, res) => {
    let accessingUser = req.session.user;
    if (accessingUser.role.role === 'finance-manager') {
        //get updates
        let updatesToUser = req.body;
        //fetch user
        let result = user_dao_1.getUserById(updatesToUser.userId);
        //set variaable with status code
        let statusCode = 400;
        //update user with new val if current user is found
        if (result) {
            statusCode = 200;
            result = utils_1.updateWith(result, updatesToUser);
        }
        //send user back to db
        setOrReplaceUser(result);
        //send back response        
        res.status(statusCode).json(result);
    }
});
exports.usersRouter.get('/:id', (req, res) => {
    let accessingUser = req.session.user;
    if (accessingUser.role.role === 'finance-manager' || accessingUser.userId === req.params.id) {
        let requestedUser = user_dao_1.getUserById(req.params.id);
        res.status(200).json(requestedUser);
    }
});
//# sourceMappingURL=users.router.js.map