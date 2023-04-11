const csv=require('csvtojson');
const path = require('path');
let CSVtoJSON = (data)=>{
    return new Promise((resolve, reject) => {
        console.log(data,path.resolve(data.path));
        csv()
            .fromFile(path.resolve(data.path))
            .then((jsonObj)=>{
                resolve(jsonObj);
            })
            .catch(err=>{
                reject(err);
            })
    });
};

module.exports = CSVtoJSON;

