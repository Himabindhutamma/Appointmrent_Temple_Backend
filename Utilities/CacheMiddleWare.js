const cache = require("./Cache");
const CacheMiddleWare = ((req, res, next) => {
    if (req.method === "GET") {
        getTitle(req)
            .then(title => {
                return getCache(title)
            })
            .then(result => {
                res.json(result);
            })
            .catch(err => {
                console.log(err);
                next();
            })
    } else if (req.method === "POST") {
        postTitle(req)
            .then(title => {
                console.log("title", title);
                return getCache(title)
            })
            .then(result => {
                res.json(result);
            })
            .catch(err => {
                console.log(err);
                next();
            })
    }
});

let getTitle = (req) => {
    return new Promise((resolve, reject) => {
        console.log("req", req.path);
        let url = req.path.toString().split("/");
        let query = url[3].toString().split("_")[0];
        let table = url[3].toString().split("_")[1]
        let title = table+":";
        if (url[3].indexOf("_Requirements") > -1 && url[3].indexOf("Get_") > -1) {
            title += "s_*_" + table + "_requirements";
            resolve(title);
        } else {
            switch (query) {
                case "SelectAll":
                    title += "s_*";
                    break;
                case "SelectAllWithParent":
                    title += "s_*p";
                    break;
                case "SelectAllWithChild":
                    title += "s_*c";
                    break;
                case "SelectAllWithChildAndParent":
                    title += "s_*pc";
                    break;
            }
            title += "_" + table;
            resolve(title);
        }
    })
}

let postTitle = (req) => {
    return new Promise((resolve, reject) => {
        console.log("req", req.path);
        let url = req.path.toString().split("/");
        let query = url[3].toString().split("_")[0];
        let table = url[3].toString().split("_")[1]
        let title = table+":";

        switch (query) {
            case "search":
                title += "s_s";
                break;
            case "SelectCondition":
                title += "s_{c}";
                break;
            case "SelectConditionWithParent":
                title += "s_{c}p";
                break;
            case "SelectConditionWithChild":
                title += "s_{c}c";
                break;
            case "SelectConditionWithChildAndParent":
                title += "s_{c}pc";
                break;
        }
        title += "_" + table+"_w_"+JSON.stringify(req.body);
        resolve(title);
    })
}

let getCache = (title) => {
    return new Promise((resolve, reject) => {
        cache.getCache({"title": title})
            .then(result => {
                console.log("result1", result);
                if (result) {
                    resolve({'Error': false, 'Message': result});
                } else {
                    reject("Invalid data");
                }
            })
            .catch(err => {
                reject(err);
            })
    })
}

module.exports = CacheMiddleWare;
