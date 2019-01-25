import express from 'express';
import { Reimbursement , getReimbursementsWithStatus, getReimbursementsWithUserID } from '../models/Reimbursement';
import { User } from '../models/User';

// all routes defined with this router start with '/users'
export const reimbursmentsRouter = express.Router();
export default reimbursmentsRouter;

reimbursmentsRouter.get('/status/:statusId/', (req, res) =>{
    let accessingUser: User = req.session.user;
    if(accessingUser.role.role === 'finance-manager')
    {
        let startEndDate: string[] = getStartEndDateFromURL(req.originalUrl);
        let reimbursments: Reimbursement[] = getReimbursementsWithStatus(req.params.statusId, startEndDate[0], startEndDate[1]);
        res.status(200).json(reimbursments);
    }
    else
        res.sendStatus(403);
});


reimbursmentsRouter.get('/author/userId/:userId', (req, res) =>{
    let accessingUser: User = req.session.user;
    if(accessingUser.role.role === 'finance-manager' || accessingUser.userId === req.params.userId)
    {
        let startEndDate: string[] = getStartEndDateFromURL(req.originalUrl);
        let reimbursments: Reimbursement[] = getReimbursementsWithUserID(req.params.userId, startEndDate[0], startEndDate[1]);
        res.status(200).json(reimbursments);
    }
    else
        res.sendStatus(403);
});

reimbursmentsRouter.post('', (req, res) =>{
    let accessingUser: User = req.session.user;
    let newReimbursement: Reimbursement = req.body;
    //if Reimbursement author id doesnt match the userId or the user isnt administrator, return error

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
            for (const key in Object.keys(updatesToUser)) {
                if (key) {
                    result[key] = updatesToUser[key];                
                }
            }
        }
        //send user back to db
        setOrReplaceUser(result);
        //send back response        
        res.status(statusCode).json(result);        
    }
})



function getStartEndDateFromURL(url: string): string[]{
    let result: string[] = [];
    let dirtyString: string = url;
    dirtyString = dirtyString.replace(/.*\?/, '');

    let startdate: string = dirtyString.split('&')[0].replace('start=:','');
    let enddate: string = dirtyString.split('&')[1].replace('end=:','');    
    result = [startdate, enddate];
    
    return result;
}