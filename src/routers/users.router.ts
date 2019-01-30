import express from 'express';
import { User} from '../models/user';
import { updateWith } from '../utils';
import { getAllUsers, getUserById, sendToDB } from '../data-access-objects/user.dao';

// all routes defined with this router start with '/users'
export const usersRouter = express.Router();
export default usersRouter;

usersRouter.get('', async (req, res) =>{
    let accessingUser: User = req.session.user;
    if(accessingUser.role.role === 'finance-manager'){
        let result: User[] = <User[]>await getAllUsers().catch((e)=>{console.trace(); console.log(e);} )
        res.status(200).json(result);
    }
});


usersRouter.patch('', async (req, res) =>{
    let accessingUser: User = req.session.user;
    if(accessingUser.role.role === 'finance-manager'){
        //get updates
        let updatesToUser: User = req.body;
        //fetch user
        let result: User = <User>await getUserById(updatesToUser.userId).catch((e)=>{console.trace(); console.log(e)});
        //set variaable with status code
        let statusCode = 400;
        //update user with new val if current user is found
        if(result)
        {
            statusCode = 200;
            result = updateWith<User>(result, updatesToUser);
        }
        //send user back to db
        await sendToDB(result).catch((e)=>{console.trace(); console.log(e)})
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


