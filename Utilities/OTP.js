let otpGenerator = require('otp-generator');

let GenOTP =function(){
    let getOTP = function () {
        return new Promise(function (resolve,reject) {
            let otp = otpGenerator.generate(6, { upperCase: false, specialChars: false, digit:true, alphabets:false });
            resolve(otp);
        });
    };
    return{
        getOTP:getOTP
    }
};

module.exports = GenOTP();