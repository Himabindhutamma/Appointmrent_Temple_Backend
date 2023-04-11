const multer = require('multer');
let fse = require('fs-extra');
const now = require('nano-time');

let upload = multer({
    storage : multer.diskStorage({
        destination : (req,file,callback) => {
            let path = './Gallery/';
            console.log('path',path);
            fse.pathExists(path,(err,exists) => {
                if (!err && !exists) {
                    fse.ensureDirSync(path);
                    callback(undefined,path);
                }else if(!err && exists)  callback(undefined,path);
            })
        },
        filename:(req,file,callback) => {
            callback(undefined,now()+file.originalname);
            // callback(undefined,now());
        }
    })
});

module.exports = {upload};
