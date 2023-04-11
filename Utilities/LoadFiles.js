let LoadFiles = function(data,files) {
    return new Promise(function (resolve, reject) {
        let newData =[];
        if(!(Array.isArray(data) && data.length>0)){
            if(typeof data === 'object'){
                data =[data];
            }
            else {
                reject('Invalid Request');
            }
        }
        data.map((i,j)=>{
            let keys = [];
            if(i.uploadedFiels)
                keys = Object.keys(JSON.parse(i.uploadedFiels));
            let obj ={};
            if(keys.length >0){
                keys.map((k,l)=>{
                    let fileNames =[];
                    if(JSON.parse(i.uploadedFiels)[k].indexOf('***,***')>-1){
                        fileNames = JSON.parse(i.uploadedFiels)[k].split('***,***');
                    }
                    else {
                        fileNames.push(JSON.parse(i.uploadedFiels)[k]);
                    }

                    let concatFileNames ="";
                    fileNames.map((f1,r)=>{
                        if(files.length >0){
                            let file = files.filter(m=>{
                                return m.originalname.toString() === f1;
                            });

                            if(r !==0){
                                concatFileNames = concatFileNames+"***,***"+file[0].filename;
                            }
                            else {
                                concatFileNames = concatFileNames+file[0].filename;
                            }
                            if((r+1) === fileNames.length){
                                obj = {...obj,[k]:concatFileNames};
                            }
                        }
                        else{
                            concatFileNames = null;
                            if((r+1) === fileNames.length){
                                obj = {...obj,[k]:concatFileNames};
                            }
                        }
                    });

                    if((l+1) === keys.length){
                        newData.push({...i,...obj});
                    }
                });
                if((j+1) === data.length){
                    resolve(newData);
                }
            }
            else{
                newData.push(i);
                if((j+1) === data.length){
                    resolve(newData);
                }
            }

        });
    })
};

module.exports = LoadFiles;