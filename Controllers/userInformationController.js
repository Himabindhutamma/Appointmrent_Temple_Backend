const departmentsController = require("./departmentsController");

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


            
let userInformationController = function () {

	let Insert_userInformation = function (data) {
        return new Promise(((resolve, reject) => {
            if(!(Array.isArray(data) && data.length>0)){
                if(typeof data === 'object'){
                    data =[data];
                }
                else {
                    reject('Invalid Request');
                }
            }

            if(fields['userInformation'].notNullFk.length>0){
                let pfields = _.pluck(fields['userInformation'].notNullFk,"fieldWithTable");
                let newData =[];
                let canInsert = true;
                let parentTable =[];
                let fkValues ={};
                pfields.map((j,k)=>{
                    if(!(data[0][j]!== null && data[0][j]!== undefined)){
                        parentTable.push({tableName:fields['userInformation'].notNullFk[k].tableName,field:j,[j]:null});
                        canInsert = false;
                        if((k+1) === pfields.length){
                            child(data)
                                .then(res=>{
                                   parentTable.map((p,q)=>{
                                        fkValues ={...fkValues,[p.field]:p[p.field]};
                                        data[0] ={...data[0],[p.field]:p[p.field]}
                                        if((q+1) === parentTable.length){
                                           InsertData_userInformation(data)
                                                .then(res=>{
                                                    resolve({fk:fkValues,insert:res});
                                                })
                                                .catch(err=>{
                                                    reject({fk:fkValues,insert:err});
                                                });                                        }
                                    });                                })
                                .catch(err=>{
                                    reject({fk:fkValues,insert:err});
                                });
                        }
                    }
                    else{
                        if((k+1) === pfields.length){
                            if(canInsert === false){
                                child()
                                    .then((res)=>{
                                        parentTable.map((p,q)=>{
                                            fkValues ={...fkValues,[p.field]:p[p.field]};
                                            data[0] ={...data[0],[p.field]:p[p.field]}
                                            if((q+1) === parentTable.length){
                                                InsertData_userInformation(data)
                                                    .then(res=>{
                                                        resolve({fk:fkValues,insert:res});
                                                    })
                                                    .catch(err=>{
                                                        reject({fk:fkValues,insert:err});
                                                    });                                        }
                                        });                                })
                                    .catch(err=>{
                                        reject({fk:fkValues,insert:err});
                                    });
                            }
                            else{
                                resolve(InsertData_userInformation(data));
                            }

                        }

                    }                });
                function child() {
                    return new Promise(((resolve1, reject1) => {
                        let i =0;
                        sub(data);
                        function sub(data){
                            let exe = "let "+ parentTable[i].tableName+"Controller = require('./"+parentTable[i].tableName+"Controller');\n" +
                            ""+parentTable[i].tableName+"Controller.Insert_"+parentTable[i].tableName+"(data)\n" +
                            ".then(res=>{\n" +
                            "   parentTable[i] = {...parentTable[i],[parentTable[i].field]:res.insertId};" +
                            "   if((i+1) === parentTable.length){\n" +

                            "       resolve1(res);\n" +
                            "   }\n" +
                            "   else {\n" +
                            "       i++;\n" +
                            "       sub(data);\n" +
                            "   }" +
                            "})" +
                            ".catch((err)=>{\n" +
                            "   reject1(err);\n" +
                            "})";
                            eval(exe);                        }


                    }));
                }
            }
            else{
                resolve(InsertData_userInformation(data));
            }
        }));
    };
	let InsertData_userInformation = function(data){
        return new Promise(((resolve, reject) => {
            if(!(Array.isArray(data) && data.length>0)){
                if(typeof data === 'object'){
                    data =[data];
                }
                else {
                    reject('Invalid Request');
                }
            }
            validation.BeforeValidateion(data,fields['userInformation'],'userInformation')
                .then(function (resData) {
                    let res = resData.verifiedData;
                    let mtable =[];
                    let tableid =[];
                    res.map((item,p)=>{
                        let subtable =[];
                        fields['userInformation']['fieldsWithTableName'].map((i,j)=>{
                           if(fields['userInformation']['defaultValueFields'].indexOf(i.toString().split("_")[0]) === -1){
                                if(fields['userInformation']['pk'].indexOf(i.toString().split("_")[0]) === -1){
                                    subtable.push(item[i]);
                                }
                                else{
                                    tableid.push(item[i]);
                                    subtable.push(item[i]);
                                }
                            }
                            if((j+1) === fields['userInformation']['fieldsWithTableName'].length){
                                mtable.push(subtable);
                            }
                        });
                        if((p+1) === res.length){
                            let query = qeries['userInformation'].Insert;
                            repo.queryGenerator({query:query,table:[mtable],selectRecordId:{['userInformation'+'Id']:tableid},selectRequired:false})
                                .then(function (resData) {
                                    cache.deleteTableCache('userInformation');
                                    if(Array.isArray(resData)){
                                        if(resData.data.length === data.length){
                                            resolve (resData.data);
                                        }
                                        else{
                                            resolve({Message:"Some Data is Not Inserted",insertedData:resData.data});
                                        }
                                    }
                                    else{
                                        resolve(resData);
                                    }
                                })
                                .catch(function (err) {
                                    reject(err);
                                })
                        }
                    });
                })
                .catch(function (err) {
                    reject(err);
                });
        }))
    };
	let Upload_userInformation = function (data,files) {
        return new Promise(((resolve, reject) => {
            loadfiles(data,files)
                .then((res)=>{
                    resolve(InsertData_userInformation(res));
                })
                .catch((err)=>{
                    reject(err);
                })
        }));
    };
	let Update_userInformation = function (data) {
        return new Promise(((resolve, reject) => {
            let tabledata =[];
            let pk = fields['userInformation'].pk.toString().split(",").map(i=>{ return  i+"_"+'userInformation'});
            let query = qeries['userInformation'].Update;
            fields['userInformation'].fieldsWithTableName.map((i,j)=>{
                //if(pk.indexOf(i) === -1&& i.indexOf("createdDate")===-1  && i.indexOf("updatedDate")===-1){
                    //tabledata.push(data[i]);
                //}
                if(i in data){
                    if(pk.indexOf(i) === -1&& i.indexOf("createdDate")===-1  && i.indexOf("updatedDate")===-1){
                        tabledata.push(data[i]);
                    }
                }
                else{
                    let key = i.split("_")[0];
                    if(query.indexOf(`${key} = ? ,`) > -1){
                        query = query.replace(`${key} = ? ,`,"");
                    }
                    else if(query.indexOf(`,${key} = ? WHERE`) > -1){
                        query = query.replace(`,${key} = ?`,"");
                    }
                }
                if((j+1) ===fields['userInformation'].fieldsWithTableName.length ){
                   pk.map((l,m)=>{
                        tabledata.push(data[l]);
                        if((m+1) === pk.length){
                            repo.queryGenerator({query:query,table:tabledata})
                                .then(function (res) {
                                    cache.deleteTableCache('userInformation');
                                    resolve(res);
                                })
                                .catch(function (err) {
                                    reject(err);
                                })
                        }
                    })
                }
            });
        }));
    };
	let UpdateFile_userInformation = function (data,files) {
        return new Promise(((resolve, reject) => {
            let keys = Object.keys(JSON.parse(data.uploadedFiels));
            keys.map((k,l)=>{
                let fileNames =[];
                if(JSON.parse(data.uploadedFiels)[k].indexOf('***,***')>-1){
                    fileNames = JSON.parse(data.uploadedFiels)[k].split('***,***');
                }
                else {
                    fileNames.push(JSON.parse(data.uploadedFiels)[k]);
                }

                let concatFileNames ="";
                fileNames.map((f1,r)=>{
                    let file = files.filter(m=>{
                        return m.originalname.toString() === f1;
                    });
                    if(r > 0){
                        concatFileNames = concatFileNames+"***,***"+file[0].filename;
                    }
                    else {
                        concatFileNames = concatFileNames+file[0].filename;
                    }
                    if((r+1) === fileNames.length){
                        if(data[k] !== undefined && data[k] !== null && data[k] !== "" &&  data[k].length>0){
                            data = {...data,[k]:data[k]+"***,***"+concatFileNames};

                        }
                        else{
                            data = {...data,[k]:concatFileNames};

                        }

                    }
                });

                if((l+1) === keys.length){
                    resolve(Update_userInformation(data));
                }
            });
        }));
    };
	let DeleteFile_userInformation = function (data) {
        return new Promise(((resolve, reject) => {
            Update_userInformation('userInformation',data)
                .then(res=>{
                    let filesNotDeleted = true;
                    let fileNames =[];
                    if(data.deletedFiles.indexOf('***,***')>-1){
                        fileNames = data.deletedFiles.split('***,***');
                    }
                    else {
                        fileNames.push(data.deletedFiles);
                    }
                    fileNames.map((i,j)=>{
                        try{
                            fs.unlink('./Gallery/'+i,(err,result)=>{
                                if(err){filesNotDeleted = false}
                            });
                        }
                        catch (e) {}
                        if((j+1)=== fileNames.length){
                            if(filesNotDeleted === true){
                                resolve("Deleted Successfully");
                            }
                            else {
                                resolve("Deleted only on DB");
                            }
                        }

                    });
                })
                .catch(err=>{
                    reject(err);
                })

        }));
    };

	let SelectAll_userInformation = function () {
        return new Promise(((resolve, reject) => {
            let query = qeries['userInformation'].SelectAll;
            repo.queryGenerator({query:query,table:[],selectRequired:false})
                .then(function (res) {
                    if(Array.isArray(res)){
                        cache.setCacheWithTime({title:'userInformation:s_*_userInformation',data:res,ttl:3600});
                        resolve(res);    
                    }
                    else{
                        if(res){
                            cache.setCacheWithTime({title:'userInformation:s_*_userInformation',data:[res],ttl:3600});
                            resolve([res]);
                        }
                        else{
                            resolve([]);
                        }
                    }
                })
                .catch(function (err) {
                    reject(err);
                })
        }));
    };
	let SelectAllWithParent_userInformation = function () {
        return new Promise(((resolve, reject) => {
            let query = qeries['userInformation'].SelectWithParent;
            repo.queryGenerator({query:query,table:[],selectRequired:false})
                .then(function (res) {
                       if(Array.isArray(res)){
                            cache.setCacheWithTime({title:'userInformation:s_*p_userInformation',data:res,ttl:3600});
                            resolve(res);
                        }
                        else{
                           if(res){
                                cache.setCacheWithTime({title:'userInformation:s_*p_userInformation',data:[res],ttl:3600});
                                resolve([res]);
                           }
                           else{
                               resolve([]);
                           }
                        }
                })
                .catch(function (err) {
                    reject(err);
                })
        }));
    };
	let SelectAllWithChild_userInformation = function () {
        return new Promise(((resolve, reject) => {
            let query = qeries['userInformation'].SelectWithChild;
            repo.queryGenerator({query:query,table:[],selectRequired:false})
                .then(function (res) {
                       if(Array.isArray(res)){
                            cache.setCacheWithTime({title:'userInformation:s_*c_userInformation',data:res,ttl:3600});
                            resolve(res);
                        }
                        else{
                           if(res){
                                cache.setCacheWithTime({title:'userInformation:s_*c_userInformation',data:[res],ttl:3600});
                             resolve([res]);
                           }
                           else{
                               resolve([]);
                           }
                        }
                })
                .catch(function (err) {
                    reject(err);
                })
        }));
    };
	let SelectAllWithChildAndParent_userInformation = function () {
        return new Promise(((resolve, reject) => {
            let query = qeries['userInformation'].SelectWithParentNChild;
            repo.queryGenerator({query:query,table:[],selectRequired:false})
                .then(function (res) {
                       if(Array.isArray(res)){
                            cache.setCacheWithTime({title:'userInformation:s_*pc_userInformation',data:res,ttl:3600});
                            resolve(res);
                        }
                        else{
                           if(res){
                                cache.setCacheWithTime({title:'userInformation:s_*pc_userInformation',data:[res],ttl:3600});
                             resolve([res]);
                           }
                        else{
                                resolve([]);
                            }
                        }
                })
                .catch(function (err) {
                    reject(err);
                })
        }));
    };
	let SelectCondition_userInformation = function (data) {
        return new Promise(((resolve, reject) => {
            let query = qeries['userInformation'].SelectAll;
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
                                if(Array.isArray(res)){
                                   cache.setCacheWithTime({title:'userInformation:s_{c}_userInformation_w_'+JSON.stringify(data),data:res,ttl:3600});
                                    resolve(res);
                                }
                                else{
                                    if(res){
                                        cache.setCacheWithTime({title:'userInformation:s_{c}_userInformation_w_'+JSON.stringify(data),data:[res],ttl:3600});
                                        resolve([res]);
                                    }
                                    else{
                                       resolve([]);
                                    }
                                }
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
        }));
    };

	let SelectConditionWithParent_userInformation = function (data) {
        return new Promise(((resolve, reject) => {
            let query = qeries['userInformation'].SelectWithParent;
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
                                   if(Array.isArray(res)){
                                    cache.setCacheWithTime({title:'userInformation:s_{c}p_userInformation_w_'+JSON.stringify(data),data:res,ttl:3600});
                                    resolve(res);
                                   }
                                   else{
                                       if(res){
                                            cache.setCacheWithTime({title:'userInformation:s_{c}p_userInformation_w_'+JSON.stringify(data),data:[res],ttl:3600});
                                            resolve([res]);
                                       }
                                       else{
                                           resolve([]);
                                       }
                                   }
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
        }));
    };
	let SelectConditionWithChild_userInformation = function (data) {
        return new Promise((resolve, reject) => {
            let query = qeries['userInformation'].SelectWithChild;
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
                                   if(Array.isArray(res)){
                                   cache.setCacheWithTime({title:'userInformation:s_{c}c_userInformation_w_'+JSON.stringify(data),data:res,ttl:3600});
                                    resolve(res);
                                   }
                                   else{
                                       if(res){
                                            cache.setCacheWithTime({title:'userInformation:s_{c}c_userInformation_w_'+JSON.stringify(data),data:[res],ttl:3600});
                                            resolve([res]);
                                       }
                                       else{
                                             resolve([]);
                                       }
                                   }
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
        });
    };
	let SelectConditionWithChildAndParent_userInformation = function (data) {
        return new Promise((resolve, reject) => {
            let query = qeries['userInformation'].SelectWithParentNChild;
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
                                   if(Array.isArray(res)){
                                    cache.setCacheWithTime({title:'userInformation:s_{c}pc_userInformation_w_'+JSON.stringify(data),data:res,ttl:3600});
                                    resolve(res);
                                   }
                                   else{
                                    if(res){
                                        cache.setCacheWithTime({title:'userInformation:s_{c}pc_userInformation_w_'+JSON.stringify(data),data:[res],ttl:3600});
                                        resolve([res]);
                                       }
                                       else{
                                           resolve([]);
                                       }
                                   }
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
        });
    };
	let userInformation_PageRequiremnts = function () {
        return new Promise((resolve,reject)=>{
            let obj={};
            departmentsController.SelectAll_departments()
                .then(res=>{
                    if(Array.isArray(res)){
                        obj ={...obj,departments:res};    
                    }
                    else{
                        obj ={...obj,departments:[res]};
                    }
                                    cache.setCacheWithTime({title:'userInformation:s_*_userInformation_requirements',data:obj,ttl:3600});
                    resolve(obj);
                })
                .catch(err=>{
                    reject(err);
                });
        });
    }

    return{
		Insert_userInformation: Insert_userInformation,
		InsertData_userInformation: InsertData_userInformation,
		Upload_userInformation: Upload_userInformation,
		Update_userInformation: Update_userInformation,
		UpdateFile_userInformation: UpdateFile_userInformation,
		DeleteFile_userInformation: DeleteFile_userInformation,
		SelectAll_userInformation: SelectAll_userInformation,
		SelectAllWithParent_userInformation: SelectAllWithParent_userInformation,
		SelectAllWithChild_userInformation: SelectAllWithChild_userInformation,
		SelectAllWithChildAndParent_userInformation: SelectAllWithChildAndParent_userInformation,
		SelectCondition_userInformation: SelectCondition_userInformation,
		SelectConditionWithParent_userInformation: SelectConditionWithParent_userInformation,
		SelectConditionWithChild_userInformation: SelectConditionWithChild_userInformation,
		SelectConditionWithChildAndParent_userInformation: SelectConditionWithChildAndParent_userInformation,
		userInformation_PageRequiremnts: userInformation_PageRequiremnts
	};
};
module.exports = userInformationController();
