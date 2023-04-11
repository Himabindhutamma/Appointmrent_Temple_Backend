const importer = require('node-mysql-importer')
const Repo = require('../Repo');
const {mysqlConfig} = require('../Config/Config');

let ImportMysqlDB = function () {

    DeleteSchema()
        .then(function () {
            return CreateSchema();
        })
        .then(function () {
            importer.config({
                //     host: 'localhost',
                //     user: 'root',
                //     password:'root',
                //     database: 'testdesign',
                //     port : 8889,
                //     debug: false
                host: mysqlConfig.host,
                user: mysqlConfig.user,
                password:mysqlConfig.password,
                database: mysqlConfig.database,
                port : mysqlConfig.port,
                debug: mysqlConfig.debug

            });

            importer.importSQL('./DataBase/designdeinterior_.sql').then( (err,result) => {
                console.log(err,result);
                console.log('all statements have been executed')
            }).catch( err => {
                console.log(`sukhesh error: ${err}`)
            })
        })
        .catch(function (err) {
            console.log(err);
        })
};

let DeleteSchema = function(){
    return new Promise(function (resolve,reject) {
        let query = "DROP DATABASE "+mysqlConfig.database;
        Repo.execute(query)
            .then(function (data) {
                resolve(data);
            })
            .catch(function (err) {
                reject(err);
            });
    });
};

let CreateSchema = function(){
    return new Promise(function (resolve,reject) {
        let query = "CREATE DATABASE "+mysqlConfig.database;
        Repo.execute(query)
            .then(function (data) {
                resolve(data);
            })
            .catch(function (err) {
                reject(err);
            });
    });
};
module.exports = ImportMysqlDB;
