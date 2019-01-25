import express from 'express';
import { User, getUserByCredentials } from '../models/User';

// all routes defined with this router start with '/login'
export const loginRouter = express.Router();
export default loginRouter;

loginRouter.post('', (req, res) => {
    //fetch user from databse
    const fetchedUser: User = getUserByCredentials(req.body.username, req.body.password);
    if (fetchedUser) {
        //handle session here. Attaches the entire user object to it for ease of access        
        req.session.user = fetchedUser;
        res.json( fetchedUser );
    }
    else
    res.status(400).json({ message: "Invalid Credentials" });
});

