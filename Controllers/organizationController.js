
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


            
let organizationController = function () {

	let Insert_organization = function (data) {
        return new Promise(((resolve, reject) => {
            if(!(Array.isArray(data) && data.length>0)){
                if(typeof data === 'object'){
                    data =[data];
                }
                else {
                    reject('Invalid Request');
                }
            }

            if(fields['organization'].notNullFk.length>0){
                let pfields = _.pluck(fields['organization'].notNullFk,"fieldWithTable");
                let newData =[];
                let canInsert = true;
                let parentTable =[];
                let fkValues ={};
                pfields.map((j,k)=>{
                    if(!(data[0][j]!== null && data[0][j]!== undefined)){
                        parentTable.push({tableName:fields['organization'].notNullFk[k].tableName,field:j,[j]:null});
                        canInsert = false;
                        if((k+1) === pfields.length){
                            child(data)
                                .then(res=>{
                                   parentTable.map((p,q)=>{
                                        fkValues ={...fkValues,[p.field]:p[p.field]};
                                        data[0] ={...data[0],[p.field]:p[p.field]}
                                        if((q+1) === parentTable.length){
                                           InsertData_organization(data)
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
                                                InsertData_organization(data)
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
                                resolve(InsertData_organization(data));
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
                resolve(InsertData_organization(data));
            }
        }));
    };
	let InsertData_organization = function(data){
        return new Promise(((resolve, reject) => {
            if(!(Array.isArray(data) && data.length>0)){
                if(typeof data === 'object'){
                    data =[data];
                }
                else {
                    reject('Invalid Request');
                }
            }
            validation.BeforeValidateion(data,fields['organization'],'organization')
                .then(function (resData) {
                    let res = resData.verifiedData;
                    let mtable =[];
                    let tableid =[];
                    res.map((item,p)=>{
                        let subtable =[];
                        fields['organization']['fieldsWithTableName'].map((i,j)=>{
                           if(fields['organization']['defaultValueFields'].indexOf(i.toString().split("_")[0]) === -1){
                                if(fields['organization']['pk'].indexOf(i.toString().split("_")[0]) === -1){
                                    subtable.push(item[i]);
                                }
                                else{
                                    tableid.push(item[i]);
                                    subtable.push(item[i]);
                                }
                            }
                            if((j+1) === fields['organization']['fieldsWithTableName'].length){
                                mtable.push(subtable);
                            }
                        });
                        if((p+1) === res.length){
                            let query = qeries['organization'].Insert;
                            repo.queryGenerator({query:query,table:[mtable],selectRecordId:{['organization'+'Id']:tableid},selectRequired:false})
                                .then(function (resData) {
                                    cache.deleteTableCache('organization');
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
	let Upload_organization = function (data,files) {
        return new Promise(((resolve, reject) => {
            loadfiles(data,files)
                .then((res)=>{
                    resolve(InsertData_organization(res));
                })
                .catch((err)=>{
                    reject(err);
                })
        }));
    };
	let Update_organization = function (data) {
        return new Promise(((resolve, reject) => {
            let tabledata =[];
            let pk = fields['organization'].pk.toString().split(",").map(i=>{ return  i+"_"+'organization'});
            let query = qeries['organization'].Update;
            fields['organization'].fieldsWithTableName.map((i,j)=>{
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
                if((j+1) ===fields['organization'].fieldsWithTableName.length ){
                   pk.map((l,m)=>{
                        tabledata.push(data[l]);
                        if((m+1) === pk.length){
                            repo.queryGenerator({query:query,table:tabledata})
                                .then(function (res) {
                                    cache.deleteTableCache('organization');
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
	let UpdateFile_organization = function (data,files) {
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
                    resolve(Update_organization(data));
                }
            });
        }));
    };
	let DeleteFile_organization = function (data) {
        return new Promise(((resolve, reject) => {
            Update_organization('organization',data)
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

	let SelectAll_organization = function () {
        return new Promise(((resolve, reject) => {
            let query = qeries['organization'].SelectAll;
            repo.queryGenerator({query:query,table:[],selectRequired:false})
                .then(function (res) {
                    if(Array.isArray(res)){
                        cache.setCacheWithTime({title:'organization:s_*_organization',data:res,ttl:3600});
                        resolve(res);    
                    }
                    else{
                        if(res){
                            cache.setCacheWithTime({title:'organization:s_*_organization',data:[res],ttl:3600});
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
	let SelectAllWithParent_organization = function () {
        return new Promise(((resolve, reject) => {
            let query = qeries['organization'].SelectWithParent;
            repo.queryGenerator({query:query,table:[],selectRequired:false})
                .then(function (res) {
                       if(Array.isArray(res)){
                            cache.setCacheWithTime({title:'organization:s_*p_organization',data:res,ttl:3600});
                            resolve(res);
                        }
                        else{
                           if(res){
                                cache.setCacheWithTime({title:'organization:s_*p_organization',data:[res],ttl:3600});
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
	let SelectAllWithChild_organization = function () {
        return new Promise(((resolve, reject) => {
            let query = qeries['organization'].SelectWithChild;
            repo.queryGenerator({query:query,table:[],selectRequired:false})
                .then(function (res) {
                       if(Array.isArray(res)){
                            cache.setCacheWithTime({title:'organization:s_*c_organization',data:res,ttl:3600});
                            resolve(res);
                        }
                        else{
                           if(res){
                                cache.setCacheWithTime({title:'organization:s_*c_organization',data:[res],ttl:3600});
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
	let SelectAllWithChildAndParent_organization = function () {
        return new Promise(((resolve, reject) => {
            let query = qeries['organization'].SelectWithParentNChild;
            repo.queryGenerator({query:query,table:[],selectRequired:false})
                .then(function (res) {
                       if(Array.isArray(res)){
                            cache.setCacheWithTime({title:'organization:s_*pc_organization',data:res,ttl:3600});
                            resolve(res);
                        }
                        else{
                           if(res){
                                cache.setCacheWithTime({title:'organization:s_*pc_organization',data:[res],ttl:3600});
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
	let SelectCondition_organization = function (data) {
        return new Promise(((resolve, reject) => {
            let query = qeries['organization'].SelectAll;
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
                                   cache.setCacheWithTime({title:'organization:s_{c}_organization_w_'+JSON.stringify(data),data:res,ttl:3600});
                                    resolve(res);
                                }
                                else{
                                    if(res){
                                        cache.setCacheWithTime({title:'organization:s_{c}_organization_w_'+JSON.stringify(data),data:[res],ttl:3600});
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

	let SelectConditionWithParent_organization = function (data) {
        return new Promise(((resolve, reject) => {
            let query = qeries['organization'].SelectWithParent;
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
                                    cache.setCacheWithTime({title:'organization:s_{c}p_organization_w_'+JSON.stringify(data),data:res,ttl:3600});
                                    resolve(res);
                                   }
                                   else{
                                       if(res){
                                            cache.setCacheWithTime({title:'organization:s_{c}p_organization_w_'+JSON.stringify(data),data:[res],ttl:3600});
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
	let SelectConditionWithChild_organization = function (data) {
        return new Promise((resolve, reject) => {
            let query = qeries['organization'].SelectWithChild;
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
                                   cache.setCacheWithTime({title:'organization:s_{c}c_organization_w_'+JSON.stringify(data),data:res,ttl:3600});
                                    resolve(res);
                                   }
                                   else{
                                       if(res){
                                            cache.setCacheWithTime({title:'organization:s_{c}c_organization_w_'+JSON.stringify(data),data:[res],ttl:3600});
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
	let SelectConditionWithChildAndParent_organization = function (data) {
        return new Promise((resolve, reject) => {
            let query = qeries['organization'].SelectWithParentNChild;
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
                                    cache.setCacheWithTime({title:'organization:s_{c}pc_organization_w_'+JSON.stringify(data),data:res,ttl:3600});
                                    resolve(res);
                                   }
                                   else{
                                    if(res){
                                        cache.setCacheWithTime({title:'organization:s_{c}pc_organization_w_'+JSON.stringify(data),data:[res],ttl:3600});
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
		Insert_organization: Insert_organization,
		InsertData_organization: InsertData_organization,
		Upload_organization: Upload_organization,
		Update_organization: Update_organization,
		UpdateFile_organization: UpdateFile_organization,
		DeleteFile_organization: DeleteFile_organization,
		SelectAll_organization: SelectAll_organization,
		SelectAllWithParent_organization: SelectAllWithParent_organization,
		SelectAllWithChild_organization: SelectAllWithChild_organization,
		SelectAllWithChildAndParent_organization: SelectAllWithChildAndParent_organization,
		SelectCondition_organization: SelectCondition_organization,
		SelectConditionWithParent_organization: SelectConditionWithParent_organization,
		SelectConditionWithChild_organization: SelectConditionWithChild_organization,
		SelectConditionWithChildAndParent_organization: SelectConditionWithChildAndParent_organization
	};
};
module.exports = organizationController();
