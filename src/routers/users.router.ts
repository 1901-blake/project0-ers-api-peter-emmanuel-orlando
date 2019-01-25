import express from 'express';
import { User, getAllUsers, getUserById, setOrReplaceUser } from '../models/user';
import { updateWith } from '../utils';

// all routes defined with this router start with '/users'
export const usersRouter = express.Router();
export default usersRouter;

usersRouter.get('', (req, res) =>{
    let accessingUser: User = req.session.user;
    if(accessingUser.role.role === 'finance-manager'){
        let allUsers = getAllUsers();
        res.status(200).json(allUsers);
    }
});

usersRouter.patch('', (req, res) =>{
    let accessingUser: User = req.session.user;
    if(accessingUser.role.role === 'finance-manager'){
        //get updates
        let updatesToUser: User = req.body;
        //fetch user
        let result: User = getUserById(updatesToUser.userId);
        //set variaable with status code
        let statusCode = 400;
        //update user with new val if current user is found
        if(result)
        {
            statusCode = 200;
            result = updateWith<User>(result, updatesToUser);
        }
        //send user back to db
        setOrReplaceUser(result);
        //send back response        
        res.status(statusCode).json(result);        
    }
});

usersRouter.get('/:id', (req, res) =>{
    let accessingUser: User = req.session.user;
    if(accessingUser.role.role === 'finance-manager' || accessingUser.userId === req.params.id ){
        let requestedUser = getUserById(req.params.id);
        res.status(200).json(requestedUser);
    }
})


