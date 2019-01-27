"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const pool = new pg_1.Pool({
    database: process.env.awsDatabase,
    host: process.env.awsHost,
    user: process.env.awsUser,
    password: process.env.decLew54dd,
    max: 12,
    port: 5432,
});
//either this or create a singleton to get the pool
/**
 * Function to talk to the database when performing multiple queries.
 * Returns a function that needs to be called to close the connection.
 * endDBConnection can also be called
 * @param sqlCommand command to be run on the sql database
 * @param callback gives the error and the result
 */
function multiTalkToDB(sqlCommand, callback) {
    let result = undefined;
    pool.query(sqlCommand, (err, res) => {
        //console.log(err, res);
        callback(err, res);
    });
}
exports.multiTalkToDB = multiTalkToDB;
/**
 * function to talk to the database when performing single query.
 * Returns a promise that holds the QueryResult from the database
 * @param sqlCommand command to be run on the sql database
 */
function talkToDB(sqlCommand) {
    return __awaiter(this, void 0, void 0, function* () {
        let result = undefined;
        const client = (yield pool.connect().catch((e) => { console.log(e); }));
        if (client && client.query) {
            result = (yield client.query(sqlCommand).catch((e) => { console.log(e); }));
            client.release();
        }
        return result;
    });
}
exports.talkToDB = talkToDB;
function endDBConnection() {
    return __awaiter(this, void 0, void 0, function* () {
        return pool.end();
    });
}
exports.endDBConnection = endDBConnection;
//talkToDB('select * from customer').then((res) =>{ console.log(res)}).catch((err)=>{console.error(err);});
//# sourceMappingURL=dbGoBetween.js.map