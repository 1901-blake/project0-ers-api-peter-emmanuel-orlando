import express from 'express';

// all routes defined with this router start with anything
export const accessControl = express.Router();
export default accessControl;


accessControl.use((req, resp, next) => {
    (process.env.MOVIE_API_STAGE === 'prod')
      ? resp.header('Access-Control-Allow-Origin', process.env.DEMO_APP_URL)
      : resp.header('Access-Control-Allow-Origin', `localhost:5500`);
    resp.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    resp.header('Access-Control-Allow-Credentials', 'true');
    next();
   });