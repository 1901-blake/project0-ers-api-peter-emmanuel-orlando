import express = require("express");
import bodyParser = require("body-parser");
import session from  'express-session';
import authMiddleware from "./middleware/auth.middleware";
import loginRouter from "./routers/login.router";
import reimbursmentsRouter from "./routers/reimbursements.router";
import usersRouter from "./routers/users.router";
import accessControl from "./middleware/accessControl.middleware";
import path from 'path';

const app = express();
//allows use of a file/folder system for direct file retreval
app.use(express.static(path.join(__dirname, 'static')));

// set up body parser to convert json string to js object
app.use(bodyParser.json());

// set up a sesson and attach it. we keep the session object, and a session id is sent with the response to the user
// if the session id matches a previous session this attaches the session object directly to the object
const sess = {
    secret: 'MidorimaruHoseki',
    cookie: {secure: false},
    resave: false,
    saveUninitialized: false
};
app.use(session(sess));

// console.logs that this server was requested from
app.use((req, res, next) => {
    console.log(`request was made with url: ${req.url} and method ${req.method}`);
    // the next method allows the request to fall through after handling above
    next();
});////

//app.use(express.static(path.join(__dirname, 'static')));

// access control header setup middleware
app.use('', accessControl);

//login goes before auth middleware so that login requests arnt 
//trying to be authenticated before theyve even logged in
app.use('/login', loginRouter );

// auth middleware.
app.use('', authMiddleware);

// set up all the routers to redirect traffic from specific sub urls
app.use('/reimbursment', reimbursmentsRouter );
app.use('/users', usersRouter );

// handles homepage requests.
// maybe load index.html or redirect to login?
//for now does nothing
app.get('/', (req, res) => {
    //res.redirect('./index.html');
});

// if a user sends a request other than get and it was not handled above, this will catch them send a 400 error
app.use((req, res) => {
    console.log('a bad request was made');
    res.sendStatus(400);
});

// listen on port 3000. When someone calls get on this port, the above callback will run
app.listen(3000);
console.log('application started on port 3000');
















// provides a callback for what happens when a computer tries to get from this computer
// app.get('/relative url', (req, res) => {// req is the entire request. res is your response})
// app.use will use up any http method

/*
    http methods. this is the other computer talking to us
        get - request resource
        post - create resource
        put - create or update resource // replaces everything
        delete - delete resource
        patch - partial update to resource // replaces only information supplied. everything else stays

    http status codes
        100s - info
        200s - success
        300s - redirects, "i dont have the info, heres the server the server that does"
        400s - the request was bad, its their fault
        500s - the request was good, but i had an error its my fault


    //http request has a head and body
        head has a http method, a url, credentials and a content type
        body is the json object

    http response has a head and body too
        head has status code and content type
        body is a json object

    network protocol
        http runs on tcp[default port:80] (as opposed to udp) which runs on ip
*/