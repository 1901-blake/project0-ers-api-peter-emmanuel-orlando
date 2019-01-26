"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const User_1 = require("../models/User");
// all routes defined with this router start with '/login'
exports.loginRouter = express_1.default.Router();
exports.default = exports.loginRouter;
exports.loginRouter.post('', (req, res) => {
    //fetch user from databse
    const fetchedUser = User_1.getUserByCredentials(req.body.username, req.body.password);
    if (fetchedUser) {
        //handle session here. Attaches the entire user object to it for ease of access        
        req.session.user = fetchedUser;
        req.session.isAdmin = fetchedUser.role.role === 'finance-manager';
        res.json(fetchedUser);
    }
    else
        res.status(400).json({ message: "Invalid Credentials" });
});
//# sourceMappingURL=login.router.js.map