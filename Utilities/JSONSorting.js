let JSONSorting = function (data,key) {
    return new Promise(function (resolve, reject) {
        function sortJson(array, key) {
            return array.sort(function(a, b) {
                var x = a[key]; var y = b[key];
                return ((x < y) ? -1 : ((x > y) ? 1 : 0));
            });
        }
        let out =sortJson(data,key)
        resolve(out);
    });

};

module.exports = JSONSorting;
