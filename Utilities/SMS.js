let SMS =function(){
    const reqest = require('requestify');

    let sendSMS = function (data) {

        return new Promise(function (resolve,reject) {
            let url = 'http://alerts.digimiles.in/sendsms/bulksms?username=di80-varuni&password=digimile&type=0&dlr=1&destination='+data.mobileNumber.toString()+'&source=VARUNI&message='+data.message.toString();
            reqest.get(url).then(function (res) {
                console.log(res);
                resolve("Message is sent");
            });
        });
    }

    return{
        sendSMS:sendSMS
    }
};

module.exports = SMS();
