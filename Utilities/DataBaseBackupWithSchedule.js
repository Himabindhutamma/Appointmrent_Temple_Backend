/*
This file can Calls Database Backup function for every 30 minute
 */
"use strict";

let schedule = require('node-schedule');
let careateMysqlBackup = require('./CreateMysqlBackup');

let DataBaseBackupWithSchedule = function () {
    console.log("Schedule started")
    let j = schedule.scheduleJob('*/30 * * * *', function(){
        careateMysqlBackup();
        console.log("backup completed");
    });
};

module.exports = DataBaseBackupWithSchedule;