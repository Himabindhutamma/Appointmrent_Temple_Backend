"use strict";
const now = require('nano-time');

let Validation = () => {

    let BeforeValidateion = function (data, tableFields, tableName) {
        return new Promise(function (resolve, reject) {
            let verifiedData = [];
            let j = 0;
            if (Array.isArray(data) && data.length > 0) {
                self();
            } else if (typeof data === 'object') {
                data = [data];
                self();
            } else {
                reject("Invalid Data");
            }
            let validDataReturn = [];

            function self() {
                let item = data[j];
                let obj = {};
                let dataReturn = null;
                let fieldArray = tableFields.fieldsWithTableName;
                fieldArray.map((i, j) => {
                    // if(tableFields.defaultValueFields.indexOf(i.toString().split("_")[0]) === -1){
                    //     if (i.indexOf(tableName + 'Id') > -1) {
                    //         let id = now();
                    //         dataReturn = {...item, [i]: id};
                    //         obj = {...obj, [i]: id};
                    //     } else
                    if (i.indexOf('isActive') > -1) {
                        obj = {...obj, [i]: 1};
                    } else if (i.indexOf('isDelete') > -1) {
                        obj = {...obj, [i]: 0};
                    } else if (i.indexOf('createdDate') > -1 || i.indexOf('updatedDate') > -1) {

                    } else {
                        console.log(i);
                        console.log(item[i]);
                        obj = {...obj, [i]: item[i]};
                    }
                    // }
                    if ((j + 1) === tableFields.fieldsWithTableName.length) {
                        console.log(obj);
                        callValidation();
                    }
                });

                let badData = [];

                function callValidation() {
                    DataValidation(obj, tableFields.nullFieldsWithTable, [], [], [])
                        .then(function (resultOfValidation) {
                            j++;
                            if (resultOfValidation.result === true) {
                                verifiedData.push(obj);
                                validDataReturn.push(dataReturn);
                            } else {
                                badData.push(obj);
                                console.log(" Sukhesh rs ", resultOfValidation);
                            }
                            if (j === data.length) {
                                if (verifiedData.length === data.length) {
                                    resolve({verifiedData: verifiedData, data: validDataReturn});
                                } else {
                                    reject({badData: badData});
                                }

                            } else {
                                self();
                            }
                        });
                }


            }

        });
    };


    let DataValidation = function (data, allowNullData, isMustBeaNumber, isValidPassword, isValidEmail) {
        return new Promise((resolve, reject) => {
            let keys = Object.keys(data);
            let validate = true;
            let nullData = [];
            let isNotANumber = [];
            let isNotAnEmail = [];
            let isNotAnPassword = [];
            let i = 0;
            keys.forEach(item => {

                console.log("------start--------");
                console.log(allowNullData)
                console.log(item, allowNullData.filter(r => {
                    return r === item
                })[0]);
                console.log(item !== allowNullData.filter(r => {
                    return r === item
                })[0]);
                console.log("------end----------");
                if (item !== allowNullData.filter(r => {
                    return r === item
                })[0]) {
                    check(data[item.toString()])
                        .then(function (result) {
                            i++;
                            console.log(validate, item, result, result === true);
                            // if(result === true && validate === true){
                            if (result === true) {
                                // validate =true;
                                let isNum = true, isPass = true, isEmail = true;

                                if (item === isMustBeaNumber.filter(r => {
                                    return r === item
                                })[0]) { // Check whether the data is valid number or not
                                    if (isNaN(data[item.toString()])) {
                                        isNum = false;
                                        isNotANumber.push(item);
                                    }
                                }

                                if (item === isValidPassword.filter(r => {
                                    return r === item
                                })[0]) { // Check whether the data is valid passwor or not
                                    // let strongExpression = new RegExp("(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$");
                                    let strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
                                    if (!strongRegex.test(data[item.toString()])) {
                                        isPass = false;
                                        isNotAnPassword.push(item);
                                    }
                                }

                                if (item === isValidEmail.filter(r => {
                                    return r === item
                                })[0]) { // Check whether the data is valid email or not
                                    // let emailRegex = new RegExp("/^\\w+@[a-zA-Z_]+?\\.[a-zA-Z]{2,3}$/");

                                    let emailRegex = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
                                    console.log(item, data[item.toString()], emailRegex.test(data[item.toString()]));
                                    if (!emailRegex.test(data[item.toString()])) {
                                        isEmail = false;
                                        isNotAnEmail.push(item);
                                    }
                                }

                                if (isNum && isPass && isEmail) {
                                    // validate = true;
                                } else {
                                    nullData.push(item);
                                    validate = false;
                                }

                            } else {
                                console.log("error field", item, result);
                                if (result === false) {
                                    nullData.push(item);
                                }
                                validate = false;
                            }
                            if (i === keys.length) {
                                if (validate === true) {
                                    // console.log(data,validate);
                                    resolve({result: true, error: nullData});
                                } else {
                                    resolve({result: false, error: nullData});
                                }
                            }

                        });
                } else {
                    i++;
                    if (i === keys.length) {
                        if (validate === true) {
                            // console.log(data,validate);
                            resolve({result: true, error: nullData});
                        } else {
                            resolve({result: false, error: nullData});
                        }
                    }
                }

            });
        });

    };

    let check = function (data) {
        return new Promise(function (resolve, reject) {
            // console.log(data, data !== undefined && data !== null && data !== '' && data.toString().length>0);
            if (data !== undefined && data !== null && data !== '' && data.toString().length > 0) {
                resolve(true);
            } else {
                resolve(false);
            }
        })
    };

    return {
        BeforeValidateion: BeforeValidateion,
        DataValidation: DataValidation,
    };

};

module.exports = Validation();
