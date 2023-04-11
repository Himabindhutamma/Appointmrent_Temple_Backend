let nodemailer = require('nodemailer');

resultData = [];
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'srikaalika@gmail.com',
        pass: 'Amma@123456'
    }
});

let Email = function () {

    let sendEmail = (data)=>{

        return new Promise(function (resolve,reject) {

            let mailOptions = {
                to: data.email.toString(),
                subject: data.subject.toString(),
                html: '<h4>Hi '+data.userName.toString()+'</h4>'
                +' <p>Content </p>'
            };

            transporter.sendMail(mailOptions, function(error, info){
                if (error) reject(`Got error for appstatus ${info} and error is ${error}`);
                else resolve(info);

            });

        });

    };
    return{
        sendEmail:sendEmail
    }
};

module.exports = Email();
