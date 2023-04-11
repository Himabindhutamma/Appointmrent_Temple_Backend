let cacheManager = require('cache-manager');
let memoryCache = cacheManager.caching({store: 'memory'});

function setCache(data) {
    return new Promise((resolve, reject) => {
        memoryCache.set(data.title, data.data, function (err, result) {
            if (err) {
                reject(err);
            } else {
                if (data.title !== "CACHE_*_INDEX") {
                    updateCacheKeys(data.title);
                }
                resolve("Succsess");
            }
        });
    });
}

function setCacheWithTime(data) {
    return new Promise((resolve, reject) => {
        memoryCache.set(data.title, data.data, {ttl: data.ttl}, function (err, result) {
            if (err) {
                reject(err);
            } else {
                if (data.title !== "CACHE_*_INDEX") {
                    updateCacheKeys(data.title);
                }
                resolve("Succsess");
            }
        });
    });
}

function getCache(data) {

    return new Promise(function (resolve, reject) {
        memoryCache.get(data.title, function (err, result) {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    })
}

function deleteCache(data) {
    memoryCache.del(data.title,(err)=>{
        if(!err){
            console.log("deleted success",data.title);
        }
    });
}

function updateCacheKeys(newKey, time) {
    return new Promise((resolve, reject) => {
        getCache({title: "CACHE_*_INDEX"})
            .then(res => {
                let list = [];
                if(res){
                    let list = typeof res === 'string' ?  JSON.parse(res) : res;
                    if(Array.isArray(list)){
                        list.push(newKey);
                        setCache({title: "CACHE_*_INDEX", data: JSON.stringify(list)});
                    }
                    else{
                        list =[];
                        list.push(newKey);
                        setCache({title: "CACHE_*_INDEX", data: JSON.stringify(list)});
                    }
                }
                else{
                    list.push(newKey);
                    setCache({title: "CACHE_*_INDEX", data: JSON.stringify(list)});
                }
            })
            .catch(err => {
                console.log(err);
            })
    });
}

function deleteTableCache(tableName) {
    return new Promise((resolve, reject) => {
        getCache({title: "CACHE_*_INDEX"})
            .then(res => {
                let list = typeof res === 'string' ?  JSON.parse(res) : res;
                if (Array.isArray(list)) {
                    let filt = list.filter(i => {

                        return i && i.toString().indexOf(tableName) > -1;
                    });
                    if (filt && filt.length > 0) {
                        filt.map(i=>{
                            deleteCache({title:i});
                        });
                    } else {
                        reject([]);
                    }
                }
            })
            .catch(err => {
                reject(err);
            })
    });
}

module.exports = {setCache: setCache, getCache: getCache, deleteCache: deleteCache, setCacheWithTime: setCacheWithTime,deleteTableCache:deleteTableCache};
