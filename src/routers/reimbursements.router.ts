import express from 'express';
import { User } from '../models/User';
import { updateWith } from '../utils';
import { Reimbursement } from '../models/Reimbursement';
import { getReimbursementsWithStatus } from '../data-access-objects/reimbursment.dao';


// all routes defined with this router start with '/users'
export const reimbursmentsRouter = express.Router();
export default reimbursmentsRouter;

reimbursmentsRouter.get('/status/:statusId/', async (req, res) =>{
    let accessingUser: User = req.session.user;
    if(accessingUser.role.role === 'finance-manager')
    {
        let startEndDate: string[] = getStartEndDateFromURL(req.originalUrl);
        let reimbursments: Reimbursement[] = <Reimbursement[]>await getReimbursementsWithStatus(req.params.statusId, startEndDate[0], startEndDate[1]).catch((e)=>{console.log(e);});
        res.status(200).json(reimbursments);
    }
    else
        res.sendStatus(403);
});


reimbursmentsRouter.get('/author/userId/:userId', async (req, res) =>{
    let accessingUser: User = req.session.user;
    if(accessingUser.role.role === 'finance-manager' || accessingUser.userId === req.params.userId)
    {
        let startEndDate: string[] = getStartEndDateFromURL(req.originalUrl);
        let reimbursments: Reimbursement[] = <Reimbursement[]>await getReimbursementsWithUserID(req.params.userId, startEndDate[0], startEndDate[1]).catch((e)=>{console.log(e);});       
        res.status(200).json(reimbursments);
    }
    else
        res.sendStatus(403);
});

reimbursmentsRouter.post('', async (req, res) =>{
    let accessingUser: User = req.session.user;
    let newReimbursement: Reimbursement = req.body;
    let statusResult = 201;
    //if Reimbursement author id doesnt match the userId or the user isnt administrator, return error
    if(accessingUser.role.role === 'finance-manager' || accessingUser.userId === newReimbursement.author)
    {
        //set objectid to 0 before sending to db  
        newReimbursement.reimbursementId = 0;
        //send to db
        await InsertOrUpdateReimbursementInDB(newReimbursement);
    }
    else {statusResult = 403};  

    res.sendStatus(statusResult);
});

reimbursmentsRouter.patch('', (req, res) =>{
    let accessingUser: User = req.session.user;
    if(accessingUser.role.role === 'finance-manager'){
        //get updates
        let updatesToReimbursement: Reimbursement = req.body;
        //fetch current Reimbursement
        let result: Reimbursement = getReimbursment(updatesToReimbursement.author, updatesToReimbursement.dateSubmitted);
        //set variaable with status code
        let statusCode = 400;
        //update result with new val if current user is found
        if(result)
        {
            statusCode = 200;
            result = updateWith<Reimbursement>(result, updatesToReimbursement);
        }
        //send result back to db
        updateReimbursementInDB(result);
        //send back response        
        res.status(statusCode).json(result);        
    }
});



function getStartEndDateFromURL(url: string): string[]{
    let result: string[] = [];
    let dirtyString: string = url;
    dirtyString = dirtyString.replace(/.*\?/, '');

    let startdate: string = dirtyString.split('&')[0].replace('start=:','');
    let enddate: string = dirtyString.split('&')[1].replace('end=:','');    
    result = [startdate, enddate];
    
    return result;
}