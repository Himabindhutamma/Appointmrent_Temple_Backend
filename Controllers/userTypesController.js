
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


            
let userTypesController = function () {

	let Insert_userTypes = function (data) {
        return new Promise(((resolve, reject) => {
            if(!(Array.isArray(data) && data.length>0)){
                if(typeof data === 'object'){
                    data =[data];
                }
                else {
                    reject('Invalid Request');
                }
            }

            if(fields['userTypes'].notNullFk.length>0){
                let pfields = _.pluck(fields['userTypes'].notNullFk,"fieldWithTable");
                let newData =[];
                let canInsert = true;
                let parentTable =[];
                let fkValues ={};
                pfields.map((j,k)=>{
                    if(!(data[0][j]!== null && data[0][j]!== undefined)){
                        parentTable.push({tableName:fields['userTypes'].notNullFk[k].tableName,field:j,[j]:null});
                        canInsert = false;
                        if((k+1) === pfields.length){
                            child(data)
                                .then(res=>{
                                   parentTable.map((p,q)=>{
                                        fkValues ={...fkValues,[p.field]:p[p.field]};
                                        data[0] ={...data[0],[p.field]:p[p.field]}
                                        if((q+1) === parentTable.length){
                                           InsertData_userTypes(data)
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
                                                InsertData_userTypes(data)
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
                                resolve(InsertData_userTypes(data));
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
                resolve(InsertData_userTypes(data));
            }
        }));
    };
	let InsertData_userTypes = function(data){
        return new Promise(((resolve, reject) => {
            if(!(Array.isArray(data) && data.length>0)){
                if(typeof data === 'object'){
                    data =[data];
                }
                else {
                    reject('Invalid Request');
                }
            }
            validation.BeforeValidateion(data,fields['userTypes'],'userTypes')
                .then(function (resData) {
                    let res = resData.verifiedData;
                    let mtable =[];
                    let tableid =[];
                    res.map((item,p)=>{
                        let subtable =[];
                        fields['userTypes']['fieldsWithTableName'].map((i,j)=>{
                           if(fields['userTypes']['defaultValueFields'].indexOf(i.toString().split("_")[0]) === -1){
                                if(fields['userTypes']['pk'].indexOf(i.toString().split("_")[0]) === -1){
                                    subtable.push(item[i]);
                                }
                                else{
                                    tableid.push(item[i]);
                                    subtable.push(item[i]);
                                }
                            }
                            if((j+1) === fields['userTypes']['fieldsWithTableName'].length){
                                mtable.push(subtable);
                            }
                        });
                        if((p+1) === res.length){
                            let query = qeries['userTypes'].Insert;
                            repo.queryGenerator({query:query,table:[mtable],selectRecordId:{['userTypes'+'Id']:tableid},selectRequired:false})
                                .then(function (resData) {
                                    cache.deleteTableCache('userTypes');
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
	let Upload_userTypes = function (data,files) {
        return new Promise(((resolve, reject) => {
            loadfiles(data,files)
                .then((res)=>{
                    resolve(InsertData_userTypes(res));
                })
                .catch((err)=>{
                    reject(err);
                })
        }));
    };
	let Update_userTypes = function (data) {
        return new Promise(((resolve, reject) => {
            let tabledata =[];
            let pk = fields['userTypes'].pk.toString().split(",").map(i=>{ return  i+"_"+'userTypes'});
            let query = qeries['userTypes'].Update;
            fields['userTypes'].fieldsWithTableName.map((i,j)=>{
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
                if((j+1) ===fields['userTypes'].fieldsWithTableName.length ){
                   pk.map((l,m)=>{
                        tabledata.push(data[l]);
                        if((m+1) === pk.length){
                            repo.queryGenerator({query:query,table:tabledata})
                                .then(function (res) {
                                    cache.deleteTableCache('userTypes');
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
	let UpdateFile_userTypes = function (data,files) {
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
                    resolve(Update_userTypes(data));
                }
            });
        }));
    };
	let DeleteFile_userTypes = function (data) {
        return new Promise(((resolve, reject) => {
            Update_userTypes('userTypes',data)
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

	let SelectAll_userTypes = function () {
        return new Promise(((resolve, reject) => {
            let query = qeries['userTypes'].SelectAll;
            repo.queryGenerator({query:query,table:[],selectRequired:false})
                .then(function (res) {
                    if(Array.isArray(res)){
                        cache.setCacheWithTime({title:'userTypes:s_*_userTypes',data:res,ttl:3600});
                        resolve(res);    
                    }
                    else{
                        if(res){
                            cache.setCacheWithTime({title:'userTypes:s_*_userTypes',data:[res],ttl:3600});
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
	let SelectAllWithParent_userTypes = function () {
        return new Promise(((resolve, reject) => {
            let query = qeries['userTypes'].SelectWithParent;
            repo.queryGenerator({query:query,table:[],selectRequired:false})
                .then(function (res) {
                       if(Array.isArray(res)){
                            cache.setCacheWithTime({title:'userTypes:s_*p_userTypes',data:res,ttl:3600});
                            resolve(res);
                        }
                        else{
                           if(res){
                                cache.setCacheWithTime({title:'userTypes:s_*p_userTypes',data:[res],ttl:3600});
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
	let SelectAllWithChild_userTypes = function () {
        return new Promise(((resolve, reject) => {
            let query = qeries['userTypes'].SelectWithChild;
            repo.queryGenerator({query:query,table:[],selectRequired:false})
                .then(function (res) {
                       if(Array.isArray(res)){
                            cache.setCacheWithTime({title:'userTypes:s_*c_userTypes',data:res,ttl:3600});
                            resolve(res);
                        }
                        else{
                           if(res){
                                cache.setCacheWithTime({title:'userTypes:s_*c_userTypes',data:[res],ttl:3600});
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
	let SelectAllWithChildAndParent_userTypes = function () {
        return new Promise(((resolve, reject) => {
            let query = qeries['userTypes'].SelectWithParentNChild;
            repo.queryGenerator({query:query,table:[],selectRequired:false})
                .then(function (res) {
                       if(Array.isArray(res)){
                            cache.setCacheWithTime({title:'userTypes:s_*pc_userTypes',data:res,ttl:3600});
                            resolve(res);
                        }
                        else{
                           if(res){
                                cache.setCacheWithTime({title:'userTypes:s_*pc_userTypes',data:[res],ttl:3600});
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
	let SelectCondition_userTypes = function (data) {
        return new Promise(((resolve, reject) => {
            let query = qeries['userTypes'].SelectAll;
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
                                   cache.setCacheWithTime({title:'userTypes:s_{c}_userTypes_w_'+JSON.stringify(data),data:res,ttl:3600});
                                    resolve(res);
                                }
                                else{
                                    if(res){
                                        cache.setCacheWithTime({title:'userTypes:s_{c}_userTypes_w_'+JSON.stringify(data),data:[res],ttl:3600});
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

	let SelectConditionWithParent_userTypes = function (data) {
        return new Promise(((resolve, reject) => {
            let query = qeries['userTypes'].SelectWithParent;
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
                                    cache.setCacheWithTime({title:'userTypes:s_{c}p_userTypes_w_'+JSON.stringify(data),data:res,ttl:3600});
                                    resolve(res);
                                   }
                                   else{
                                       if(res){
                                            cache.setCacheWithTime({title:'userTypes:s_{c}p_userTypes_w_'+JSON.stringify(data),data:[res],ttl:3600});
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
	let SelectConditionWithChild_userTypes = function (data) {
        return new Promise((resolve, reject) => {
            let query = qeries['userTypes'].SelectWithChild;
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
                                   cache.setCacheWithTime({title:'userTypes:s_{c}c_userTypes_w_'+JSON.stringify(data),data:res,ttl:3600});
                                    resolve(res);
                                   }
                                   else{
                                       if(res){
                                            cache.setCacheWithTime({title:'userTypes:s_{c}c_userTypes_w_'+JSON.stringify(data),data:[res],ttl:3600});
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
	let SelectConditionWithChildAndParent_userTypes = function (data) {
        return new Promise((resolve, reject) => {
            let query = qeries['userTypes'].SelectWithParentNChild;
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
                                    cache.setCacheWithTime({title:'userTypes:s_{c}pc_userTypes_w_'+JSON.stringify(data),data:res,ttl:3600});
                                    resolve(res);
                                   }
                                   else{
                                    if(res){
                                        cache.setCacheWithTime({title:'userTypes:s_{c}pc_userTypes_w_'+JSON.stringify(data),data:[res],ttl:3600});
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
    return{
		Insert_userTypes: Insert_userTypes,
		InsertData_userTypes: InsertData_userTypes,
		Upload_userTypes: Upload_userTypes,
		Update_userTypes: Update_userTypes,
		UpdateFile_userTypes: UpdateFile_userTypes,
		DeleteFile_userTypes: DeleteFile_userTypes,
		SelectAll_userTypes: SelectAll_userTypes,
		SelectAllWithParent_userTypes: SelectAllWithParent_userTypes,
		SelectAllWithChild_userTypes: SelectAllWithChild_userTypes,
		SelectAllWithChildAndParent_userTypes: SelectAllWithChildAndParent_userTypes,
		SelectCondition_userTypes: SelectCondition_userTypes,
		SelectConditionWithParent_userTypes: SelectConditionWithParent_userTypes,
		SelectConditionWithChild_userTypes: SelectConditionWithChild_userTypes,
		SelectConditionWithChildAndParent_userTypes: SelectConditionWithChildAndParent_userTypes
	};
};
module.exports = userTypesController();
