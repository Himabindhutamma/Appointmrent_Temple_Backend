const _ = require("underscore");
const cache = require("./Cache");
const JSONSort = require("./JSONSorting");

let SearchTableRecords = () => {

    let search = (table, data) => {
        return new Promise((resolve, reject) => {
            if (data.value.toString().trim().length > 0) {
                cache.getCache({"title": "s_*_" + data.table})
                    .then(res => {
                        if (res) {
                            resolve(filterSeachData(res, data.field, data.value, data.index, data.sortKey));
                        } else {
                            return getSearchData(table, data.table);
                        }
                    })
                    .then(res => {
                        resolve(filterSeachData(res, data.field, data.value, data.index, data.sortKey));
                    })
                    .catch(err => {
                        console.log("error ");
                        reject(err);
                    })
            } else {
                resolve([]);
            }
        })
    };

    let getSearchData = (table, tableName) => {
        return new Promise((resolve, reject) => {
            table["SelectAll_" + tableName]()
                .then(res => {
                    resolve(res);
                })
                .catch(err => {
                    console.log("error", err);
                    resolve(err);
                });
        })
    };

    let filterSeachData = (data, field, value, position, sortKey) => {
        return new Promise((resolve, reject) => {
            if (value.toString().trim().length > 0) {

                if (position !== -1 && sortKey && field) {

                    JSONSort(data, sortKey)
                        .then(res => {
                            resolve(res.filter((i, j) => {
                                if(i[field])
                                    return i[field].toString().toLowerCase().indexOf(value.toString().toLowerCase()) === parseInt(position)
                            }));
                        })
                        .catch(err => {
                            reject(err);
                        })

                }
                else if (position !== -1 && !sortKey && field) {
                    resolve(
                        data.filter((i, j) => {
                            return i[field].toString().toLowerCase().indexOf(value.toString().toLowerCase()) === parseInt(position)
                        })
                    );
                }
                else if (position === -1 && sortKey && field) {
                    let fields = field.toString().split(",");
                    if (fields.length > 1) {
                        let condition = "";
                        fields.map((k, l) => {
                            if (l === 0) {
                                condition += "i['" + k + "'].toString().toLowerCase().indexOf(value.toString().toLowerCase()) > -1";
                            } else {
                                condition += " || i['" + k + "'].toString().toLowerCase().indexOf(value.toString().toLowerCase()) > -1";
                            }
                            if ((l + 1) === fields.length) {
                                JSONSort(data, sortKey)
                                    .then(res => {
                                        resolve(res.filter((i, j) => {
                                            return eval(condition);
                                        }))
                                    })
                                    .catch(err => {
                                        reject(err);
                                    })
                            }
                        });
                    } else {
                        JSONSort(data, sortKey)
                            .then(res => {
                                resolve(
                                    res.filter((i, j) => {
                                        if(i[field])
                                            return i[field].toString().toLowerCase().indexOf(value.toString().toLowerCase()) > -1;
                                    })
                                )
                            })
                            .catch(err => {
                                reject(err);
                            })
                    }
                }
                else if(position === -1 && !sortKey && field){
                    let fields = field.toString().split(",");
                    if (fields.length > 1) {
                        let condition = "";
                        fields.map((k, l) => {
                            if (l === 0) {
                                condition += "i['" + k + "'].toString().toLowerCase().indexOf(value.toString().toLowerCase()) > -1";
                            } else {
                                condition += " || i['" + k + "'].toString().toLowerCase().indexOf(value.toString().toLowerCase()) > -1";
                            }
                            if ((l + 1) === fields.length) {
                                resolve(data.filter((i, j) => {
                                    return eval(condition);
                                }))
                            }
                        });
                    } else {
                        resolve(
                            data.filter((i, j) => {
                                if(i[field])
                                    return i[field].toString().toLowerCase().indexOf(value.toString().toLowerCase()) > -1;
                            })
                        );
                    }
                }
                else if(position === -1 && !sortKey && !field){
                    resolve(
                        data.filter((i, j) => {
                            return i.toString().toLowerCase().indexOf(value.toString().toLowerCase()) > -1;
                        })
                    );
                }
                else if(position === -1 && sortKey && !field){
                    resolve(
                        JSONSort(data, sortKey)
                            .then(res => {
                                resolve(res.filter((i, j) => {
                                    return i.toString().toLowerCase().indexOf(value.toString().toLowerCase()) > -1;
                                }))
                            })
                            .catch(err => {
                                reject(err);
                            })
                    );
                }

            } else {
                resolve([]);
            }
        });
    };

    return {
        search: search
    }
}

module.exports = SearchTableRecords();
