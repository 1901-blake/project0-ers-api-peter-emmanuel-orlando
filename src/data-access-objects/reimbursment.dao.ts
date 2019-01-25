
export function getReimbursementsWithStatus( statusId: Number, startdate: string = undefined, enddate: string = undefined): Reimbursement[]
{
    let result: Reimbursement[] = [];

    return result;
}

export function getReimbursementsWithUserID( userId: Number, startdate: string = undefined, enddate: string = undefined): Reimbursement[]
{
    let result: Reimbursement[] = [];

    return result;
}

export function getReimbursementbyID( reimbursementId: Number, callback:(err: Error, result: QueryResult) => void)
{
    let result: Reimbursement = null;

    return result;
}

///////////////////////////////////////////////////////////////////////////////////////////////

export function InsertOrUpdateReimbursementInDB( reimbursement: Reimbursement, callback:(err: Error, result: QueryResult) => void)
{       
    if(isValidReimbursement(reimbursement))
    {
        getReimbursementbyID(reimbursement.reimbursementId, (err, res) =>{
            if(err)
                insertReimbursementInDB(reimbursement, callback);
            else
                updateReimbursementInDB(reimbursement, callback);
        });
    }
    else
    {
        let errStr = 'reinbursment is not valid. Check that all the fields are properly initialized, especially values that shouldnt be null'
        callback(Error(errStr), undefined);
    }
}

function insertReimbursementInDB( reimbursement: Reimbursement, callback:(err: Error, result: QueryResult) => void)
{
    //must set reimbursment id to 0 so it doesnt collide with anything in the database
    reimbursement.reimbursementId = 0;
 
    let command = `INSERT INTO reimbursements( reimbursementId, author, amount, dateSubmitted, dateResolved, description, resolver, status, type )
    VALUES (${reimbursement.reimbursementId}, ${reimbursement.author}, ${reimbursement.amount}, ${reimbursement.dateSubmitted}, ${reimbursement.dateResolved}, ${reimbursement.description}, ${reimbursement.resolver}, ${reimbursement.status}, ${reimbursement.type})`;

    talkToDB(command, callback);
}

function updateReimbursementInDB( reimbursement: Reimbursement, callback:(err: Error, result: QueryResult) => void)
{
    let command =
    `UPDATE reimbursements
    SET reimbursementId = ${reimbursement.reimbursementId}, author = ${reimbursement.author}, amount = ${reimbursement.amount}, dateSubmitted = ${reimbursement.dateSubmitted}, dateResolved = ${reimbursement.dateResolved}, description = ${reimbursement.description}, resolver = ${reimbursement.resolver}, status = ${reimbursement.status}, type = ${reimbursement.type}
    WHERE condition`
    talkToDB(command, callback);
}