let jwt = require('jsonwebtoken');

let JsonWebToken = function(object) {

    let createToken =function(object) {
        return new Promise(function (resolve,reject) {
            console.log(object);
            let token = jwt.sign({key:object}, 'car.uilderSUKAKHISOWGPISINVAMYUSSirBabMOhAmma',{ expiresIn: "1 days" });
            console.log('token',token);
            resolve(token);
        });
    };

    let decodeToken = function (token,mobileNumber) {
        return new Promise(function (resolve,reject) {
            console.log('req',token);
            jwt.verify(token, 'car.uilderSUKAKHISOWGPISINVAMYUSSirBabMOhAmma@123RAH', function(err, decoded) {
                console.log('decode',decoded);
                if(decoded !== undefined && decoded !== null && decoded !== ''){
                    console.log('Requested userId',decoded.itsme)
                    if(mobileNumber === decoded.itsme){
                        resolve(true);
                    }
                    else{
                        reject('Not a valid user');
                    }
                }
                else{
                    reject('Token is expired. Please login again!');
                }
            });
        });

    }

    return{
        createToken: createToken,
        decodeToken:decodeToken
    }

}
    module.exports = JsonWebToken();
