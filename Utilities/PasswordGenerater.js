var generator = require('generate-password');

let PasswordGenerater =function(){
    let getPassword = function () {
        return new Promise(function (resolve,reject) {
            let password = generator.generate({
                length: 8,
                numbers: true
            });
            resolve(password);
        });
    };
    return{
        getPassword:getPassword
    }
};

module.exports = PasswordGenerater();