let mysql = require('mysql');
const {mysqlConfig} = require('./Config/Config');
let Repo = function () {

    let pool = mysql.createPool({
        connectionLimt: mysqlConfig.connectionLimt,
        host: mysqlConfig.host,
        user: mysqlConfig.user,
        password:mysqlConfig.password,
        database: mysqlConfig.database,
        port : mysqlConfig.port,
        debug: mysqlConfig.debug
    });

    let queryGenerator = function (data,db) {
        return new Promise(function (resolve,reject) {
            pool.database = db;
            let query = data.query;
            query = format(query,data.table);
            execute(query)
                .then(function (res) {
                    if(data.query.toString().indexOf('INSERT INTO')>-1 && data.selectRequired === true){
                        resolve(selectInsertedRecords(data));
                    }
                    else{
                        resolve(res);
                    }
                })
                .catch(function (err) {
                    reject(err);
                });
        });
    };

    let selectInsertedRecords = function(req){
        return new Promise(function (resolve, reject) {
            let field = Object.keys(data.selectRecordId)[0];
            let data = req[field];
            let output =[];
            let i =0;
            self();
            function self() {
                let query = 'SELECT DISTINCT * FROM '+data.db+'.'+data.tableName+ " WHERE "+ field+' = '+'"'+data[i]+'";';
                execute(query)
                    .then(function (res) {
                        output.push(res);
                        i++;
                        if(i === data.length){
                            resolve(output);
                        }
                        else {
                            self();
                        }
                    })
                    .catch(function (err) {
                        reject(err);
                    });
            }
        })
    };

    let execute = function (query) {
        return new Promise(function (resolve,reject) {
            pool.getConnection(function (error,connection) {
                // console.log("Executing query" + query);
                if(error){
                    // connection.release();
                    reject(error);
                    console.log("Issue with getting connection");
                }
                else{
                    // console.log('connected as id ' + connection.threadId);
                    connection.query(query,function (err,res) {
                        // console.log("Inside query execution");
                        if(err){
                            console.log("Error execution query"+ err);
                            reject(err);
                        }
                        else {
                            if(Array.isArray(res)){
                                if(res.length >1){
                                    resolve(res);
                                }
                                else{
                                    resolve(res[0]);
                                }

                            }
                            else {
                                resolve(res);
                            }
                        }
                        connection.on('error',function (err) {
                            resolve( JSON.stringify({"Error" : true, "Message" : err}));
                        });
                    });
                    connection.release();
                }
            });
        });
    };

    let format = function (query,table) {
        return mysql.format(query,table);
    };

    console.log("createig mainRepo");
    return{
        queryGenerator:queryGenerator,
        format:format,
        execute:execute
    }
};

module.exports  = new Repo();
