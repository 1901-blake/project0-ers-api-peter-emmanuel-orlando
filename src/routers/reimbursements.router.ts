import express from 'express';
import { getReimbursementsWithStatus } from 'src/models/Reimbursement';
import { Reimbursement } from 'src/models/Reimbursement';

// all routes defined with this router start with '/users'
export const reimbursmentsRouter = express.Router();
export default reimbursmentsRouter;

usersRouter.get('/status/:statusId', (req, res) =>{
    let accessingUser: User = req.session.user;
    if(accessingUser.role.role === 'finance-manager')
    {
        let startdate: string = req.originalUrl;
        startdate = startdate.replace(/.*\?/, '');
        let enddate;
        let reimbursments: Reimbursement[] = getReimbursementsWithStatus(req.params.id);
        res.status(200).json(reimbursments);
    }
})