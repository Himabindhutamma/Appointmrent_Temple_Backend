

const jwt =  require('../Utilities/JsonWebToken');

const Cryptr = require('cryptr');

const otp = require('../Utilities/OTP');

const sms = require('../Utilities/SMS');

const email = require('../Utilities/Email');

const cryptr = new Cryptr('AppointmentBookingSystem');

const sha = require("sha256");
const fields = require('../Table/Fields');

const qeries = require('../Table/Queries');

const loadfiles = require('../Utilities/LoadFiles');

const validation = require('../Utilities/Validation');

const excelExtract = require('../Utilities/ExcelExtractor');

const fs = require('fs');

const repo = require('../Repo');

const cache = require("../Utilities/Cache");

const csvTojson = require("../Utilities/CSVtoJSON");

const _ = require('underscore');


            
let loginController = function () {

let Login  = (data)=>{
        return new Promise((resolve,reject)=>{
            let out,token;
            if(Object.keys(data).indexOf('email_users') >-1 && Object.keys(data).indexOf('password_users') >-1){
                data = {...data,'password_users':sha.x2(data['password_users'])};
                let query = qeries['users'].SelectAll;
                let keys = Object.keys(data);
                if(keys.length>0 && typeof  data === 'object'){
                    keys.map((i,j)=>{
                        if(j ===0){
                            query = query+" WHERE "+i.split('_')[1]+"."+i.split('_')[0]+" = '"+data[i]+"'";
                        }
                        else{
                            query = query+" AND "+i.split('_')[1]+"."+i.split('_')[0]+" = '"+data[i]+"'";
                        }
                        if((j+1) === keys.length){
                            repo.queryGenerator({query:query,table:[],selectRequired:false})
                                .then(function (res) {
                                    if(res){
                                        out = res;
                                        return jwt.createToken(data['email_users']);

                                    }
                                    else{
                                        reject("Invalid Login");
                                    }
                                })
                                .then(res=>{
                                    token = res;
                                    return cache.setCache({title:res,data:out})
                                })
                                .then(res=>{
                                    return cache.setCache({title:"LoggedInWith_"+data['email_users'],data:token})
                                })
                                .then(res=>{
                                    resolve({...out,token:cryptr.encrypt(token)})
                                })
                                .catch(function (err) {
                                    reject(err);
                                })

                        }
                    });
                }
                else {
                    reject("Invalid request");
                }
            }
            else{
                reject("Invalid request");
            }
        })
    };

let Registration = (data,regTable) => {
        return new Promise((resolve, reject) => {
            let newData = {...data, 'password_users': sha.x2(data['password_users'])};
            regTable['InsertData_users'](newData)
                .then(res=>{
                    resolve(res);
                })
                .catch(err=>{
                    reject(err);
                })
        })
    };

let ForgotPassword = (data) => {
        return new Promise((resolve, reject) => {
            let email = 'email_users';
            let mobile = '_users';
            if (Object.keys(data).length === 1) {
                if (Object.keys(data) === email) {
                    CheckEmailAvailablity(data[email])
                        .then(res => {
                            if (res) {
                                resolve(sendEmailOTP(data[email]));
                            } else {
                                reject("EmailId is not found");
                            }
                        })
                        .catch(err => {
                            reject(err);
                        })
                } else if (Object.keys(data) === mobile) {
                    CheckMobileNumberAvailablity(data[mobile])
                        .then(res => {
                            if (res) {
                                resolve(sendMobileOTP(data[mobile]));
                            } else {
                                reject("Mobile number is not found");
                            }
                        })
                        .catch(err => {
                            reject(err);
                        })
                } else {
                    reject("Invalid request");
                }
            } else if (Object.keys(data).length === 2) {

                if (Object.keys(data).indexOf(email) > -1 && Object.keys(data).indexOf(mobile) > -1) {
                    CheckEmailAvailablity(data[email])
                        .then(res => {
                            if (res) {
                                return CheckMobileNumberAvailablity(data[mobile]);
                            } else {
                                reject("EmailId is not found");
                            }
                        })
                        .then(res => {
                            if (res) {
                                return sendMobileOTP(data[mobile]);
                            } else {
                                reject("Mobile number is not found");
                            }
                        })
                        .then(res => {
                            resolve(sendEmailOTP(data[email]));
                        })
                        .catch(err => {
                            reject(err);
                        })
                } else {
                    reject("Invalid request");
                }

            } else {
                reject("Invalid requrest")
            }
        });
    };

    let UpdatePasswordWithOTP = (data) => {
        return new Promise((resolve, reject) => {
            let email = 'email_users';
            let mobile = '_users';

            if (Object.keys(data).indexOf(email) > -1 && Object.keys(data).indexOf(mobile) > -1) {
                cache.getCache({"title": "EmailOTP_" + data[email]})
                    .then(res => {
                        if (data.emailOTP.toString() === res) {
                            return cache.getCache({"title": "MobileOTP_" + data[mobile]})
                        } else {
                            reject("Invalid OTP");
                        }
                    })
                    .then(res => {
                        if (data.mobileOTP.toString() === res) {
                            delete data['mobileOTP'];
                            delete data['emailOTP'];
                            resolve(UpdatePassword(data));
                        } else {
                            reject("Invalid OTP");
                        }
                    })
                    .catch(err => {
                        reject("Invalid OTP");
                    });
            } else if (Object.keys(data).indexOf(email) > -1) {
                cache.getCache({"title": "EmailOTP_" + data[email]})
                    .then(res => {
                        if (data.emailOTP.toString() === res) {
                            delete data['emailOTP'];
                            resolve(UpdatePassword(data));
                        } else {
                            reject("Invalid OTP");
                        }
                    })
                    .catch(err => {
                        reject("Invalid OTP");
                    });
            } else if (Object.keys(data).indexOf(mobile) > -1) {
                cache.getCache({"title": "MobileOTP_" + data[mobile]})
                    .then(res => {
                        if (data.mobileOTP.toString() === res) {
                            delete data['mobileOTP'];
                            resolve(UpdatePassword(data));
                        } else {
                            reject("Invalid OTP");
                        }
                    })
                    .catch(err => {
                        reject("Invalid OTP");
                    });
            } else {
                reject("Invalid request");
            }

        });
    };

let CheckEmailAvailablity = (data) => {
        return new Promise((resolve, reject) => {
            return new Promise((resolve, reject) => {
                let query = qeries['users'].SelectAll;
                query = query + " WHERE email = '" + data + "'";
                repo.queryGenerator({query: query, table: [], selectRequired: false})
                    .then(function (res) {
                        resolve(res);
                    })
                    .catch(function (err) {
                        reject(err);
                    });
            });
        });
    };

let sendEmailOTP = (data) => {
        return new Promise((resolve, reject) => {
            let otp;
            otp.getOTP()
                .then(res=>{
                    otp = res;
                    let obj = {
                        email:data,
                        subject:"Forgot password",
                        content:``,
                    };
                    return email.sendEmail(obj);
                })
                .then(res=>{
                    let obj ={
                        title:"EmailOTP_"+data,
                        data:otp,
                        ttl: 5 * 60
                    };
                    return cache.setCacheWithTime(obj);
                })
                .then(res=>{
                    resolve("OTP has been sent to your email");
                })
                .catch(err=>{
                    reject(err);
                })
        });
    };

let UpdatePassword = (data) => {
        return new Promise((resolve, reject) => {
            let password = 'password_users';
            let tabledata = [];
            tabledata.push(sha.x2(data[password]));
            let query = qeries['users'].UpdatePassword;
            let keys = Object.keys(data);
            delete data[password];
            if (keys.length > 0 && typeof data === 'object'){
                keys.map((i,j)=>{
                    if(i in data){
                        if (tabledata.length === 1) {
                            query = query +  i.split('_')[1] + "." + i.split('_')[0] + " = '" + data[i] + "'";
                        } else {
                            query = query + " AND " + i.split('_')[1] + "." + i.split('_')[0] + " = '" + data[i] + "'";
                        }
                    }
                    if ((j + 1) === keys.length) {
                        repo.queryGenerator({query: query, table: tabledata})
                            .then(function (res) {
                                resolve(res);
                            })
                            .catch(function (err) {
                                reject(err);
                            });
                    }
                })
            }
        });
    };

    return {
        Login: Login,
        Registration:Registration,
        ForgotPassword: ForgotPassword,
        UpdatePasswordWithOTP: UpdatePasswordWithOTP,
        CheckEmailAvailablity: CheckEmailAvailablity,
        sendEmailOTP: sendEmailOTP,
        UpdatePassword: UpdatePassword,
    }
};
module.exports = loginController();