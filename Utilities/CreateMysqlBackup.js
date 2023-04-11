"use strict";

let mysqldump = require('mysqldump');
let nano = require('nano-time');
const {mysqlConfig} = require('../Config/Config');

let CreateMysqlBackup = function () {
    return new Promise(function (resolve,reject) {
        mysqldump({
            connection: {
                // host: 'localhost',
                // user: 'root',
                // password:'root',
                // database: 'designdeinterior',
                // port : 8889,
                // debug: false

                host: mysqlConfig.host,
                user: mysqlConfig.user,
                password:mysqlConfig.password,
                database: mysqlConfig.database,
                port : mysqlConfig.port,
                debug: mysqlConfig.debug

            },
            dumpToFile: './DataBase/Backup/'+nano()+'.sql',
        });
        resolve("Data Base Backup Successfully");
    })
}

module.exports = CreateMysqlBackup;