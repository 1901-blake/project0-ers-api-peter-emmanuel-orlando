import express from 'express';
import { User } from '../models/User';
import { getUserByCredentials } from '../data-access-objects/user.dao';

// all routes defined with this router start with '/login'
export const loginRouter = express.Router();
export default loginRouter;

loginRouter.post('', async (req, res) => {
    //fetch user from databse
    const fetchedUser: User = <User>await getUserByCredentials(req.body.username, req.body.password).catch((e)=>{console.log(e);});
    if (fetchedUser) {
        //handle session here. Attaches the entire user object to it for ease of access        
        req.session.user = fetchedUser;
        req.session.isAdmin = fetchedUser.role.role === 'finance-manager';
        res.json( fetchedUser );
    }
    else
    res.status(400).json({ message: "Invalid Credentials" });
});

