import express from 'express';
import { User } from '../models/User';
import { getUserByCredentials } from '../data-access-objects/user.dao';
import { traceLog } from '../utils';

// all routes defined with this router start with '/login'
export const loginRouter = express.Router();
export default loginRouter;

loginRouter.post('', async (req, res) => {
    //fetch user from databse
    traceLog(req.body);
    const fetchedUser: User = <User>await getUserByCredentials(req.body.username, req.body.password).catch((e)=>{console.trace(); console.log(e);});
    if (fetchedUser && fetchedUser.username) {
        //handle session here. Attaches the entire user object to it for ease of access        
        req.session.user = fetchedUser;
        traceLog(req.session.user);
        if(fetchedUser.role)
            req.session.isAdmin = fetchedUser.role.role === 'finance-manager';
        fetchedUser.password = '******';
        res.json( fetchedUser );
    }
    else
    res.status(400).json({ message: "Invalid Credentials" });
});

