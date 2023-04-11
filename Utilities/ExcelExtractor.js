let xlsx = require('xlsx-to-json');
let fs = require('fs');
let ExcelExtractor = function () {
    let getDataFromExcel = function (files) {
        return new Promise(function (resolve,reject) {
            console.log(files,files[0].filename);
            let filePath = "./Gallery/"+files[0].filename;

            xlsx({
                input: filePath,
                output: "output.json"
            }, function(err, result) {
                if(err) {
                    fs.unlink(filePath);
                    reject(err);
                }else {
                    fs.unlink(filePath,function (err,result) {
                        console.log(err,result);
                    });
                    resolve(result);
                }
            });

        });
    };
    return{
        getDataFromExcel:getDataFromExcel
    }
};

module.exports = ExcelExtractor();
