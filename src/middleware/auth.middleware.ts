import express from 'express';
import { User } from '../models/User';
import { getUserByCredentials } from '../data-access-objects/user.dao';

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
    console.log("user tried to pass auth");
    console.log(accessingUser);
    let success = !!accessingUser;
    if(success)
    {
        getUserByCredentials(accessingUser.username, accessingUser.password).then(( matchingUser)=>{
            //if not logged in, or no exact match was found
            if( matchingUser && accessingUser.credentialsMatch(matchingUser))
            {
                req.session.user = matchingUser;
                next();
            }
            else
                redirectToLogin(req, res);
        });
    }
    else
        redirectToLogin(req, res);
})

function redirectToLogin(req, res)
{
    //invalidate session
    req.session.destroy(()=>{});
    //redirect to login
    res.redirect('/login');
}