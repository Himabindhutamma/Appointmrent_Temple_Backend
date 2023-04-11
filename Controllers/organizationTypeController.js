
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


            
let organizationTypeController = function () {

	let Insert_organizationType = function (data) {
        return new Promise(((resolve, reject) => {
            if(!(Array.isArray(data) && data.length>0)){
                if(typeof data === 'object'){
                    data =[data];
                }
                else {
                    reject('Invalid Request');
                }
            }

            if(fields['organizationType'].notNullFk.length>0){
                let pfields = _.pluck(fields['organizationType'].notNullFk,"fieldWithTable");
                let newData =[];
                let canInsert = true;
                let parentTable =[];
                let fkValues ={};
                pfields.map((j,k)=>{
                    if(!(data[0][j]!== null && data[0][j]!== undefined)){
                        parentTable.push({tableName:fields['organizationType'].notNullFk[k].tableName,field:j,[j]:null});
                        canInsert = false;
                        if((k+1) === pfields.length){
                            child(data)
                                .then(res=>{
                                   parentTable.map((p,q)=>{
                                        fkValues ={...fkValues,[p.field]:p[p.field]};
                                        data[0] ={...data[0],[p.field]:p[p.field]}
                                        if((q+1) === parentTable.length){
                                           InsertData_organizationType(data)
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
                                                InsertData_organizationType(data)
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
                                resolve(InsertData_organizationType(data));
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
                resolve(InsertData_organizationType(data));
            }
        }));
    };
	let InsertData_organizationType = function(data){
        return new Promise(((resolve, reject) => {
            if(!(Array.isArray(data) && data.length>0)){
                if(typeof data === 'object'){
                    data =[data];
                }
                else {
                    reject('Invalid Request');
                }
            }
            validation.BeforeValidateion(data,fields['organizationType'],'organizationType')
                .then(function (resData) {
                    let res = resData.verifiedData;
                    let mtable =[];
                    let tableid =[];
                    res.map((item,p)=>{
                        let subtable =[];
                        fields['organizationType']['fieldsWithTableName'].map((i,j)=>{
                           if(fields['organizationType']['defaultValueFields'].indexOf(i.toString().split("_")[0]) === -1){
                                if(fields['organizationType']['pk'].indexOf(i.toString().split("_")[0]) === -1){
                                    subtable.push(item[i]);
                                }
                                else{
                                    tableid.push(item[i]);
                                    subtable.push(item[i]);
                                }
                            }
                            if((j+1) === fields['organizationType']['fieldsWithTableName'].length){
                                mtable.push(subtable);
                            }
                        });
                        if((p+1) === res.length){
                            let query = qeries['organizationType'].Insert;
                            repo.queryGenerator({query:query,table:[mtable],selectRecordId:{['organizationType'+'Id']:tableid},selectRequired:false})
                                .then(function (resData) {
                                    cache.deleteTableCache('organizationType');
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
	let Upload_organizationType = function (data,files) {
        return new Promise(((resolve, reject) => {
            loadfiles(data,files)
                .then((res)=>{
                    resolve(InsertData_organizationType(res));
                })
                .catch((err)=>{
                    reject(err);
                })
        }));
    };
	let Update_organizationType = function (data) {
        return new Promise(((resolve, reject) => {
            let tabledata =[];
            let pk = fields['organizationType'].pk.toString().split(",").map(i=>{ return  i+"_"+'organizationType'});
            let query = qeries['organizationType'].Update;
            fields['organizationType'].fieldsWithTableName.map((i,j)=>{
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
                if((j+1) ===fields['organizationType'].fieldsWithTableName.length ){
                   pk.map((l,m)=>{
                        tabledata.push(data[l]);
                        if((m+1) === pk.length){
                            repo.queryGenerator({query:query,table:tabledata})
                                .then(function (res) {
                                    cache.deleteTableCache('organizationType');
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
	let UpdateFile_organizationType = function (data,files) {
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
                    resolve(Update_organizationType(data));
                }
            });
        }));
    };
	let DeleteFile_organizationType = function (data) {
        return new Promise(((resolve, reject) => {
            Update_organizationType('organizationType',data)
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

	let SelectAll_organizationType = function () {
        return new Promise(((resolve, reject) => {
            let query = qeries['organizationType'].SelectAll;
            repo.queryGenerator({query:query,table:[],selectRequired:false})
                .then(function (res) {
                    if(Array.isArray(res)){
                        cache.setCacheWithTime({title:'organizationType:s_*_organizationType',data:res,ttl:3600});
                        resolve(res);    
                    }
                    else{
                        if(res){
                            cache.setCacheWithTime({title:'organizationType:s_*_organizationType',data:[res],ttl:3600});
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
	let SelectAllWithParent_organizationType = function () {
        return new Promise(((resolve, reject) => {
            let query = qeries['organizationType'].SelectWithParent;
            repo.queryGenerator({query:query,table:[],selectRequired:false})
                .then(function (res) {
                       if(Array.isArray(res)){
                            cache.setCacheWithTime({title:'organizationType:s_*p_organizationType',data:res,ttl:3600});
                            resolve(res);
                        }
                        else{
                           if(res){
                                cache.setCacheWithTime({title:'organizationType:s_*p_organizationType',data:[res],ttl:3600});
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
	let SelectAllWithChild_organizationType = function () {
        return new Promise(((resolve, reject) => {
            let query = qeries['organizationType'].SelectWithChild;
            repo.queryGenerator({query:query,table:[],selectRequired:false})
                .then(function (res) {
                       if(Array.isArray(res)){
                            cache.setCacheWithTime({title:'organizationType:s_*c_organizationType',data:res,ttl:3600});
                            resolve(res);
                        }
                        else{
                           if(res){
                                cache.setCacheWithTime({title:'organizationType:s_*c_organizationType',data:[res],ttl:3600});
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
	let SelectAllWithChildAndParent_organizationType = function () {
        return new Promise(((resolve, reject) => {
            let query = qeries['organizationType'].SelectWithParentNChild;
            repo.queryGenerator({query:query,table:[],selectRequired:false})
                .then(function (res) {
                       if(Array.isArray(res)){
                            cache.setCacheWithTime({title:'organizationType:s_*pc_organizationType',data:res,ttl:3600});
                            resolve(res);
                        }
                        else{
                           if(res){
                                cache.setCacheWithTime({title:'organizationType:s_*pc_organizationType',data:[res],ttl:3600});
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
	let SelectCondition_organizationType = function (data) {
        return new Promise(((resolve, reject) => {
            let query = qeries['organizationType'].SelectAll;
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
                                   cache.setCacheWithTime({title:'organizationType:s_{c}_organizationType_w_'+JSON.stringify(data),data:res,ttl:3600});
                                    resolve(res);
                                }
                                else{
                                    if(res){
                                        cache.setCacheWithTime({title:'organizationType:s_{c}_organizationType_w_'+JSON.stringify(data),data:[res],ttl:3600});
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

	let SelectConditionWithParent_organizationType = function (data) {
        return new Promise(((resolve, reject) => {
            let query = qeries['organizationType'].SelectWithParent;
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
                                    cache.setCacheWithTime({title:'organizationType:s_{c}p_organizationType_w_'+JSON.stringify(data),data:res,ttl:3600});
                                    resolve(res);
                                   }
                                   else{
                                       if(res){
                                            cache.setCacheWithTime({title:'organizationType:s_{c}p_organizationType_w_'+JSON.stringify(data),data:[res],ttl:3600});
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
	let SelectConditionWithChild_organizationType = function (data) {
        return new Promise((resolve, reject) => {
            let query = qeries['organizationType'].SelectWithChild;
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
                                   cache.setCacheWithTime({title:'organizationType:s_{c}c_organizationType_w_'+JSON.stringify(data),data:res,ttl:3600});
                                    resolve(res);
                                   }
                                   else{
                                       if(res){
                                            cache.setCacheWithTime({title:'organizationType:s_{c}c_organizationType_w_'+JSON.stringify(data),data:[res],ttl:3600});
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
	let SelectConditionWithChildAndParent_organizationType = function (data) {
        return new Promise((resolve, reject) => {
            let query = qeries['organizationType'].SelectWithParentNChild;
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
                                    cache.setCacheWithTime({title:'organizationType:s_{c}pc_organizationType_w_'+JSON.stringify(data),data:res,ttl:3600});
                                    resolve(res);
                                   }
                                   else{
                                    if(res){
                                        cache.setCacheWithTime({title:'organizationType:s_{c}pc_organizationType_w_'+JSON.stringify(data),data:[res],ttl:3600});
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
		Insert_organizationType: Insert_organizationType,
		InsertData_organizationType: InsertData_organizationType,
		Upload_organizationType: Upload_organizationType,
		Update_organizationType: Update_organizationType,
		UpdateFile_organizationType: UpdateFile_organizationType,
		DeleteFile_organizationType: DeleteFile_organizationType,
		SelectAll_organizationType: SelectAll_organizationType,
		SelectAllWithParent_organizationType: SelectAllWithParent_organizationType,
		SelectAllWithChild_organizationType: SelectAllWithChild_organizationType,
		SelectAllWithChildAndParent_organizationType: SelectAllWithChildAndParent_organizationType,
		SelectCondition_organizationType: SelectCondition_organizationType,
		SelectConditionWithParent_organizationType: SelectConditionWithParent_organizationType,
		SelectConditionWithChild_organizationType: SelectConditionWithChild_organizationType,
		SelectConditionWithChildAndParent_organizationType: SelectConditionWithChildAndParent_organizationType
	};
};
module.exports = organizationTypeController();
