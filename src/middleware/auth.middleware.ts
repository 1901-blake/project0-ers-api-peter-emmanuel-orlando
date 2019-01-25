import express from 'express';
import { User, getUserById } from '../models/User';

// all routes defined with this router start with anything
export const authMiddleware = express.Router();
export default authMiddleware;
/*
//check if session is still valid. do this by seeing if there is a user object attached to the session, and the session is not expired 
// if there is no user, or if the user on the session is equal to the one fetched from the database, fall through. 
// if there is a user, check that the user matches the one from the database in ALL fields, 
//      else set the session user to undefined. then fall through
*/

authMiddleware.use('', (req, res, next) =>{
    //get the user and get the matching user from the database
    let accessingUser: User = req.session.user;
    let matchingUser: User = accessingUser && getUserById(accessingUser.userId);
    //if not logged in, or no exact match was found
    if(!accessingUser || !matchingUser || !accessingUser.credentialsMatch(matchingUser))
    {
        //invalidate session
        req.session.destroy(()=>{});
        //redirect to login
        res.redirect('/login');
    }
    else
    {
        req.session.user = matchingUser;
        next();
    }
})