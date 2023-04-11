let express = require("express");
let bodyParser = require("body-parser");
const Cryptr = require('cryptr');
const cryptr = new Cryptr('AppointmentSystem');
let path = require("path");
let app = express();
let cors = require('cors');
let cache = require('./Utilities/Cache');
const {upload} = require('./Utilities/DocumentsPath');
const {mysqlConfig} = require('./Config/Config');
const controllerFactory = require('./Controllers/controllerFactory');
let careateMysqlBackup = require('./Utilities/CreateMysqlBackup');
let scheduleDBBackup = require('./Utilities/DataBaseBackupWithSchedule');
let importMysqlDB = require('./Utilities/ImportMysqlDB');
app.use(bodyParser.json({limit: '1000mb'}));
app.use(bodyParser.urlencoded({limit: '1000mb', extended: true}));
require('events').EventEmitter.prototype.setMaxListeners(100);
let json2xls = require('json2xls');
app.use(json2xls.middleware);
let pdf = require('./Utilities/GeneratePdf');
const CacheMiddleWare = require("./Utilities/CacheMiddleWare");
const searchRecords = require("./Utilities/SearchTableRecords");


let whitelist =
    [
        'http://localhost:3000',
    ];
let corsOptions = {
    origin: function (origin1, callback) {
        if (whitelist === (origin1) !== -1) {
            console.log('entered into if');
            callback(null, true)
        } else {
            console.log('entered else', origin1);
            callback(new Error('Not allowed by CORS'))
        }
    },
    methods: "GET,POST"

};

app.use(cors());

//Token based authentication

// app.use(function (req, res, next) {
//     console.log('inside gateway', req.path, req.headers.tokenid, req.headers.username);
//
//     if (req.path.indexOf('/RestApi/v1/Login/') > -1) {
//
//         memoryCache.get('LoggedInWith_' + req.body['loginField'].toString().toLowerCase(), function (err, result) {
//             if (err) {
//                 console.log('gettinge error while caching user');
//                 responder(err, res, results, "Login user");
//             } else {
//                 if (result) {
//                     res.json({Error: true, Message: 'Please logOut in another device'});
//                 } else {
//                     next();
//                 }
//             }
//
//         });
//
//     }
//     else if(req.path.indexOf('/RestApi/v1/ForgtPassword/')>-1){
//         next();
//     }
//     else {
//         let token = req.headers.token;
//         cache.getCache({title: cryptr.decrypt(token)})
//             .then(function (result) {
//                 if (result) {
//                     console.log('token accepted');
//                     next();
//                 } else {
//                     res.json({Error: true, Message: 'Please Relogin'});
//                 }
//             })
//             .catch(function (err) {
//                 res.json({Error: true, Message: err});
//             });
//     }
//
// });

app.listen(parseInt(mysqlConfig.serverPort), function () {
    console.log("All right ! I am alive at Port " + mysqlConfig.serverPort + ".");
    // pdf.CreatePdf();
    // let status =  "UPDATE";
    // let status =  "CREATE";
    // scheduleDBBackup(); // Function Schedules auto backup for every 30 min
    // if(status.toString() === "CREATE"){
    //     careateMysqlBackup() // Function create backup before import the new database
    //         .then(function (result) {
    //             importMysqlDB(); // Function Import the new data base into schema
    //         })
    // }
    // else if(status.toString() === "UPDATE"){
    //     careateMysqlBackup(); // Function create backup while server started
    // }
});

app.post("/", (req, res, next) => {
    console.log(req.body);
    res.json("I am your Node Server");
});

app.post('/RestApi/v1/search/',CacheMiddleWare, (req, res, next) => {
    searchRecords.search(controllerFactory[req.body.table],req.body)
        .then(result=>{
            cache.setCacheWithTime({title:`${req.body.table}:s_s_${req.body.table}_w_${JSON.stringify(req.body)}`,data:result,ttl:600});
            res.json({'Error': false, 'Message': result});
        })
        .catch(err=>{
            res.json({'Error': true, 'Message': err});
        })

});

// ********************************************************************
// START - custom
// ********************************************************************

app.post('/RestApi/v1/Upload_files/',upload.any(),(req,res,next)=>{
    res.json({'Error':false, 'Message':req.files});
});
// ********************************************************************
// END - custom
// ********************************************************************



app.get('/RestApi/v1/GetFile/:url',(req,res,next)=>{
    res.sendFile(path.resolve("./Gallery/"+req.params.url));
});




// ********************************************************************
// START - Login
// ********************************************************************


app.post('/RestApi/v1/Login/',(req,res,next)=>{
        controllerFactory.login.Login(req.body)
            .then(function (result) {
                console.log('success');
                res.json({'Error':false, 'Message':result});
            })
            .catch(function (err) {
                console.log('Error',err);
                res.json({'Error':true,'Message':err});
            });
    });

app.post('/RestApi/v1/Registration/',(req,res,next)=>{
        controllerFactory.login.Registration(req.body,controllerFactory['users'])
            .then(function (result) {
                console.log('success');
                res.json({'Error':false, 'Message':result});
            })
            .catch(function (err) {
                console.log('Error',err);
                res.json({'Error':true,'Message':err});
            });
    });
app.post('/RestApi/v1/UpdatePassword/',(req,res,next)=>{
        controllerFactory.login.UpdatePassword(req.body)
            .then(function (result) {
                console.log('success');
                res.json({'Error':false, 'Message':result});
            })
            .catch(function (err) {
                console.log('Error',err);
                res.json({'Error':true,'Message':err});
            });
    });

app.post('/RestApi/v1/ForgotPassword/',(req,res,next)=>{
        controllerFactory.login.ForgotPassword(req.body)
            .then(function (result) {
                console.log('success');
                res.json({'Error':false, 'Message':result});
            })
            .catch(function (err) {
                console.log('Error',err);
                res.json({'Error':true,'Message':err});
            });
    });

app.post('/RestApi/v1/UpdatePasswordWithOTP/',(req,res,next)=>{
        controllerFactory.login.UpdatePasswordWithOTP(req.body)
            .then(function (result) {
                console.log('success');
                res.json({'Error':false, 'Message':result});
            })
            .catch(function (err) {
                console.log('Error',err);
                res.json({'Error':true,'Message':err});
            });
    });

app.get('/RestApi/v1/CheckEmailAvailablity/:email', (req, res, next) => {
    controllerFactory.login.CheckEmailAvailablity(req.params.email)
        .then(function (result) {
            console.log('success');
            res.json({'Error': false, 'Message': result});
        })
        .catch(function (err) {
            console.log('Error', err);
            res.json({'Error': true, 'Message': err});
        });
});

app.post('/RestApi/v1/sendEmailOTP/', (req, res, next) => {
    controllerFactory.login.sendEmailOTP(req.body)
        .then(function (result) {
            console.log('success');
            res.json({'Error': false, 'Message': result});
        })
        .catch(function (err) {
            console.log('Error', err);
            res.json({'Error': true, 'Message': err});
        });
});

// ********************************************************************
// END - Login
// ********************************************************************

app.use(express.static(path.join(__dirname, 'build')));
app.get('/website/*', function(req, res) {
    console.log("calling *");
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// ********************************************************************
// START - appointmentDocuments
// ********************************************************************


app.post('/RestApi/v1/DirectInsert_appointmentDocuments/',(req,res,next)=>{
    controllerFactory.appointmentDocuments.InsertData_appointmentDocuments(req.body)
        .then(function (result) {
            console.log('success');
            res.json({'Error':false, 'Message':result});
        })
        .catch(function (err) {
            console.log('Error',err);
            res.json({'Error':true,'Message':err});
        });
});

app.post('/RestApi/v1/InsertWithParent_appointmentDocuments/',(req,res,next)=>{
    controllerFactory.appointmentDocuments.Insert_appointmentDocuments(req.body)
        .then(function (result) {
            console.log('success');
            res.json({'Error':false, 'Message':result});
        })
        .catch(function (err) {
            console.log('Error',err);
            res.json({'Error':true,'Message':err});
        });
});

app.post('/RestApi/v1/Upload_appointmentDocuments/',upload.any(),(req,res,next)=>{
    controllerFactory.appointmentDocuments.Upload_appointmentDocuments(req.body,req.files)
        .then(function (result) {
            console.log('success');
            res.json({'Error':false, 'Message':result});
        })
        .catch(function (err) {
            console.log('Error',err);
            res.json({'Error':true,'Message':err});
        });
});

app.put('/RestApi/v1/Update_appointmentDocuments/',(req,res,next)=>{
    controllerFactory.appointmentDocuments.Update_appointmentDocuments(req.body)
        .then(function (result) {
            console.log('success');
            res.json({'Error':false, 'Message':result});
        })
        .catch(function (err) {
            console.log('Error',err);
            res.json({'Error':true,'Message':err});
        });
});

app.post('/RestApi/v1/UpdateFile_appointmentDocuments/',upload.any(),(req,res,next)=>{
    controllerFactory.appointmentDocuments.UpdateFile_appointmentDocuments(req.body,req.files)
        .then(function (result) {
            console.log('success');
            res.json({'Error':false, 'Message':result});
        })
        .catch(function (err) {
            console.log('Error',err);
            res.json({'Error':true,'Message':err});
        });
});

app.put('/RestApi/v1/DeleteFile_appointmentDocuments/',(req,res,next)=>{
    controllerFactory.appointmentDocuments.DeleteFile_appointmentDocuments(req.body)
        .then(function (result) {
            console.log('success');
            res.json({'Error':false, 'Message':result});
        })
        .catch(function (err) {
            console.log('Error',err);
            res.json({'Error':true,'Message':err});
        });
});

app.get('/RestApi/v1/SelectAll_appointmentDocuments/',CacheMiddleWare,(req,res,next)=>{
    controllerFactory.appointmentDocuments.SelectAll_appointmentDocuments()
        .then(function (result) {
            console.log('success');
            res.json({'Error':false, 'Message':result});
        })
        .catch(function (err) {
            console.log('Error',err);
            res.json({'Error':true,'Message':err});
        });
});


app.get('/RestApi/v1/SelectAllWithParent_appointmentDocuments/',CacheMiddleWare,(req,res,next)=>{
    controllerFactory.appointmentDocuments.SelectAllWithParent_appointmentDocuments()
        .then(function (result) {
            console.log('success');
            res.json({'Error':false, 'Message':result});
        })
        .catch(function (err) {
            console.log('Error',err);
            res.json({'Error':true,'Message':err});
        });
});


app.get('/RestApi/v1/SelectAllWithChild_appointmentDocuments/',CacheMiddleWare,(req,res,next)=>{
    controllerFactory.appointmentDocuments.SelectAllWithChild_appointmentDocuments()
        .then(function (result) {
            console.log('success');
            res.json({'Error':false, 'Message':result});
        })
        .catch(function (err) {
            console.log('Error',err);
            res.json({'Error':true,'Message':err});
        });
});


app.get('/RestApi/v1/SelectAllWithChildAndParent_appointmentDocuments/',CacheMiddleWare,(req,res,next)=>{
    controllerFactory.appointmentDocuments.SelectAllWithChildAndParent_appointmentDocuments()
        .then(function (result) {
            console.log('success');
            res.json({'Error':false, 'Message':result});
        })
        .catch(function (err) {
            console.log('Error',err);
            res.json({'Error':true,'Message':err});
        });
});


app.post('/RestApi/v1/SelectCondition_appointmentDocuments/',CacheMiddleWare,(req,res,next)=>{
    controllerFactory.appointmentDocuments.SelectCondition_appointmentDocuments(req.body)
        .then(function (result) {
            console.log('success');
            res.json({'Error':false, 'Message':result});
        })
        .catch(function (err) {
            console.log('Error',err);
            res.json({'Error':true,'Message':err});
        });
});

app.post('/RestApi/v1/SelectConditionWithParent_appointmentDocuments/',CacheMiddleWare,(req,res,next)=>{
    controllerFactory.appointmentDocuments.SelectConditionWithParent_appointmentDocuments(req.body)
        .then(function (result) {
            console.log('success');
            res.json({'Error':false, 'Message':result});
        })
        .catch(function (err) {
            console.log('Error',err);
            res.json({'Error':true,'Message':err});
        });
});

app.post('/RestApi/v1/SelectConditionWithChild_appointmentDocuments/',CacheMiddleWare,(req,res,next)=>{
    controllerFactory.appointmentDocuments.SelectConditionWithChild_appointmentDocuments(req.body)
        .then(function (result) {
            console.log('success');
            res.json({'Error':false, 'Message':result});
        })
        .catch(function (err) {
            console.log('Error',err);
            res.json({'Error':true,'Message':err});
        });
});

app.post('/RestApi/v1/SelectConditionWithChildAndParent_appointmentDocuments/',CacheMiddleWare,(req,res,next)=>{
    controllerFactory.appointmentDocuments.SelectConditionWithChildAndParent_appointmentDocuments(req.body)
        .then(function (result) {
            console.log('success');
            res.json({'Error':false, 'Message':result});
        })
        .catch(function (err) {
            console.log('Error',err);
            res.json({'Error':true,'Message':err});
        });
});

// ********************************************************************
// END - appointmentDocuments
// ********************************************************************


// ********************************************************************
// START - appointments
// ********************************************************************


app.post('/RestApi/v1/DirectInsert_appointments/',(req,res,next)=>{
    controllerFactory.appointments.InsertData_appointments(req.body)
        .then(function (result) {
            console.log('success');
            res.json({'Error':false, 'Message':result});
        })
        .catch(function (err) {
            console.log('Error',err);
            res.json({'Error':true,'Message':err});
        });
});

app.post('/RestApi/v1/InsertWithParent_appointments/',(req,res,next)=>{
    controllerFactory.appointments.Insert_appointments(req.body)
        .then(function (result) {
            console.log('success');
            res.json({'Error':false, 'Message':result});
        })
        .catch(function (err) {
            console.log('Error',err);
            res.json({'Error':true,'Message':err});
        });
});

app.post('/RestApi/v1/Upload_appointments/',upload.any(),(req,res,next)=>{
    controllerFactory.appointments.Upload_appointments(req.body,req.files)
        .then(function (result) {
            console.log('success');
            res.json({'Error':false, 'Message':result});
        })
        .catch(function (err) {
            console.log('Error',err);
            res.json({'Error':true,'Message':err});
        });
});

app.put('/RestApi/v1/Update_appointments/',(req,res,next)=>{
    controllerFactory.appointments.Update_appointments(req.body)
        .then(function (result) {
            console.log('success');
            res.json({'Error':false, 'Message':result});
        })
        .catch(function (err) {
            console.log('Error',err);
            res.json({'Error':true,'Message':err});
        });
});

app.post('/RestApi/v1/UpdateFile_appointments/',upload.any(),(req,res,next)=>{
    controllerFactory.appointments.UpdateFile_appointments(req.body,req.files)
        .then(function (result) {
            console.log('success');
            res.json({'Error':false, 'Message':result});
        })
        .catch(function (err) {
            console.log('Error',err);
            res.json({'Error':true,'Message':err});
        });
});

app.put('/RestApi/v1/DeleteFile_appointments/',(req,res,next)=>{
    controllerFactory.appointments.DeleteFile_appointments(req.body)
        .then(function (result) {
            console.log('success');
            res.json({'Error':false, 'Message':result});
        })
        .catch(function (err) {
            console.log('Error',err);
            res.json({'Error':true,'Message':err});
        });
});

app.get('/RestApi/v1/SelectAll_appointments/',CacheMiddleWare,(req,res,next)=>{
    controllerFactory.appointments.SelectAll_appointments()
        .then(function (result) {
            console.log('success');
            res.json({'Error':false, 'Message':result});
        })
        .catch(function (err) {
            console.log('Error',err);
            res.json({'Error':true,'Message':err});
        });
});


app.get('/RestApi/v1/SelectAllWithParent_appointments/',CacheMiddleWare,(req,res,next)=>{
    controllerFactory.appointments.SelectAllWithParent_appointments()
        .then(function (result) {
            console.log('success');
            res.json({'Error':false, 'Message':result});
        })
        .catch(function (err) {
            console.log('Error',err);
            res.json({'Error':true,'Message':err});
        });
});


app.get('/RestApi/v1/SelectAllWithChild_appointments/',CacheMiddleWare,(req,res,next)=>{
    controllerFactory.appointments.SelectAllWithChild_appointments()
        .then(function (result) {
            console.log('success');
            res.json({'Error':false, 'Message':result});
        })
        .catch(function (err) {
            console.log('Error',err);
            res.json({'Error':true,'Message':err});
        });
});


app.get('/RestApi/v1/SelectAllWithChildAndParent_appointments/',CacheMiddleWare,(req,res,next)=>{
    controllerFactory.appointments.SelectAllWithChildAndParent_appointments()
        .then(function (result) {
            console.log('success');
            res.json({'Error':false, 'Message':result});
        })
        .catch(function (err) {
            console.log('Error',err);
            res.json({'Error':true,'Message':err});
        });
});


app.post('/RestApi/v1/SelectCondition_appointments/',CacheMiddleWare,(req,res,next)=>{
    controllerFactory.appointments.SelectCondition_appointments(req.body)
        .then(function (result) {
            console.log('success');
            res.json({'Error':false, 'Message':result});
        })
        .catch(function (err) {
            console.log('Error',err);
            res.json({'Error':true,'Message':err});
        });
});

app.post('/RestApi/v1/SelectConditionWithParent_appointments/',CacheMiddleWare,(req,res,next)=>{
    controllerFactory.appointments.SelectConditionWithParent_appointments(req.body)
        .then(function (result) {
            console.log('success');
            res.json({'Error':false, 'Message':result});
        })
        .catch(function (err) {
            console.log('Error',err);
            res.json({'Error':true,'Message':err});
        });
});

app.post('/RestApi/v1/SelectConditionWithChild_appointments/',CacheMiddleWare,(req,res,next)=>{
    controllerFactory.appointments.SelectConditionWithChild_appointments(req.body)
        .then(function (result) {
            console.log('success');
            res.json({'Error':false, 'Message':result});
        })
        .catch(function (err) {
            console.log('Error',err);
            res.json({'Error':true,'Message':err});
        });
});

app.post('/RestApi/v1/SelectConditionWithChildAndParent_appointments/',CacheMiddleWare,(req,res,next)=>{
    controllerFactory.appointments.SelectConditionWithChildAndParent_appointments(req.body)
        .then(function (result) {
            console.log('success');
            res.json({'Error':false, 'Message':result});
        })
        .catch(function (err) {
            console.log('Error',err);
            res.json({'Error':true,'Message':err});
        });
});

// ********************************************************************
// END - appointments
// ********************************************************************


// ********************************************************************
// START - departmentSubCategories
// ********************************************************************


app.post('/RestApi/v1/DirectInsert_departmentSubCategories/',(req,res,next)=>{
    controllerFactory.departmentSubCategories.InsertData_departmentSubCategories(req.body)
        .then(function (result) {
            console.log('success');
            res.json({'Error':false, 'Message':result});
        })
        .catch(function (err) {
            console.log('Error',err);
            res.json({'Error':true,'Message':err});
        });
});

app.post('/RestApi/v1/InsertWithParent_departmentSubCategories/',(req,res,next)=>{
    controllerFactory.departmentSubCategories.Insert_departmentSubCategories(req.body)
        .then(function (result) {
            console.log('success');
            res.json({'Error':false, 'Message':result});
        })
        .catch(function (err) {
            console.log('Error',err);
            res.json({'Error':true,'Message':err});
        });
});

app.post('/RestApi/v1/Upload_departmentSubCategories/',upload.any(),(req,res,next)=>{
    controllerFactory.departmentSubCategories.Upload_departmentSubCategories(req.body,req.files)
        .then(function (result) {
            console.log('success');
            res.json({'Error':false, 'Message':result});
        })
        .catch(function (err) {
            console.log('Error',err);
            res.json({'Error':true,'Message':err});
        });
});

app.put('/RestApi/v1/Update_departmentSubCategories/',(req,res,next)=>{
    controllerFactory.departmentSubCategories.Update_departmentSubCategories(req.body)
        .then(function (result) {
            console.log('success');
            res.json({'Error':false, 'Message':result});
        })
        .catch(function (err) {
            console.log('Error',err);
            res.json({'Error':true,'Message':err});
        });
});

app.post('/RestApi/v1/UpdateFile_departmentSubCategories/',upload.any(),(req,res,next)=>{
    controllerFactory.departmentSubCategories.UpdateFile_departmentSubCategories(req.body,req.files)
        .then(function (result) {
            console.log('success');
            res.json({'Error':false, 'Message':result});
        })
        .catch(function (err) {
            console.log('Error',err);
            res.json({'Error':true,'Message':err});
        });
});

app.put('/RestApi/v1/DeleteFile_departmentSubCategories/',(req,res,next)=>{
    controllerFactory.departmentSubCategories.DeleteFile_departmentSubCategories(req.body)
        .then(function (result) {
            console.log('success');
            res.json({'Error':false, 'Message':result});
        })
        .catch(function (err) {
            console.log('Error',err);
            res.json({'Error':true,'Message':err});
        });
});

app.get('/RestApi/v1/SelectAll_departmentSubCategories/',CacheMiddleWare,(req,res,next)=>{
    controllerFactory.departmentSubCategories.SelectAll_departmentSubCategories()
        .then(function (result) {
            console.log('success');
            res.json({'Error':false, 'Message':result});
        })
        .catch(function (err) {
            console.log('Error',err);
            res.json({'Error':true,'Message':err});
        });
});


app.get('/RestApi/v1/SelectAllWithParent_departmentSubCategories/',CacheMiddleWare,(req,res,next)=>{
    controllerFactory.departmentSubCategories.SelectAllWithParent_departmentSubCategories()
        .then(function (result) {
            console.log('success');
            res.json({'Error':false, 'Message':result});
        })
        .catch(function (err) {
            console.log('Error',err);
            res.json({'Error':true,'Message':err});
        });
});


app.get('/RestApi/v1/SelectAllWithChild_departmentSubCategories/',CacheMiddleWare,(req,res,next)=>{
    controllerFactory.departmentSubCategories.SelectAllWithChild_departmentSubCategories()
        .then(function (result) {
            console.log('success');
            res.json({'Error':false, 'Message':result});
        })
        .catch(function (err) {
            console.log('Error',err);
            res.json({'Error':true,'Message':err});
        });
});


app.get('/RestApi/v1/SelectAllWithChildAndParent_departmentSubCategories/',CacheMiddleWare,(req,res,next)=>{
    controllerFactory.departmentSubCategories.SelectAllWithChildAndParent_departmentSubCategories()
        .then(function (result) {
            console.log('success');
            res.json({'Error':false, 'Message':result});
        })
        .catch(function (err) {
            console.log('Error',err);
            res.json({'Error':true,'Message':err});
        });
});


app.post('/RestApi/v1/SelectCondition_departmentSubCategories/',CacheMiddleWare,(req,res,next)=>{
    controllerFactory.departmentSubCategories.SelectCondition_departmentSubCategories(req.body)
        .then(function (result) {
            console.log('success');
            res.json({'Error':false, 'Message':result});
        })
        .catch(function (err) {
            console.log('Error',err);
            res.json({'Error':true,'Message':err});
        });
});

app.post('/RestApi/v1/SelectConditionWithParent_departmentSubCategories/',CacheMiddleWare,(req,res,next)=>{
    controllerFactory.departmentSubCategories.SelectConditionWithParent_departmentSubCategories(req.body)
        .then(function (result) {
            console.log('success');
            res.json({'Error':false, 'Message':result});
        })
        .catch(function (err) {
            console.log('Error',err);
            res.json({'Error':true,'Message':err});
        });
});

app.post('/RestApi/v1/SelectConditionWithChild_departmentSubCategories/',CacheMiddleWare,(req,res,next)=>{
    controllerFactory.departmentSubCategories.SelectConditionWithChild_departmentSubCategories(req.body)
        .then(function (result) {
            console.log('success');
            res.json({'Error':false, 'Message':result});
        })
        .catch(function (err) {
            console.log('Error',err);
            res.json({'Error':true,'Message':err});
        });
});

app.post('/RestApi/v1/SelectConditionWithChildAndParent_departmentSubCategories/',CacheMiddleWare,(req,res,next)=>{
    controllerFactory.departmentSubCategories.SelectConditionWithChildAndParent_departmentSubCategories(req.body)
        .then(function (result) {
            console.log('success');
            res.json({'Error':false, 'Message':result});
        })
        .catch(function (err) {
            console.log('Error',err);
            res.json({'Error':true,'Message':err});
        });
});

app.get('/RestApi/v1/Get_departmentSubCategories_Requirements/',CacheMiddleWare, (req, res, next) => {
    controllerFactory.departmentSubCategories.departmentSubCategories_PageRequiremnts()
        .then(function (result) {
            console.log('success');
            res.json({'Error': false, 'Message': result});
        })
        .catch(function (err) {
            console.log('Error', err);
            res.json({'Error': true, 'Message': err});
        });
});

// ********************************************************************
// END - departmentSubCategories
// ********************************************************************


// ********************************************************************
// START - departments
// ********************************************************************


app.post('/RestApi/v1/DirectInsert_departments/',(req,res,next)=>{
    controllerFactory.departments.InsertData_departments(req.body)
        .then(function (result) {
            console.log('success');
            res.json({'Error':false, 'Message':result});
        })
        .catch(function (err) {
            console.log('Error',err);
            res.json({'Error':true,'Message':err});
        });
});

app.post('/RestApi/v1/InsertWithParent_departments/',(req,res,next)=>{
    controllerFactory.departments.Insert_departments(req.body)
        .then(function (result) {
            console.log('success');
            res.json({'Error':false, 'Message':result});
        })
        .catch(function (err) {
            console.log('Error',err);
            res.json({'Error':true,'Message':err});
        });
});

app.post('/RestApi/v1/Upload_departments/',upload.any(),(req,res,next)=>{
    controllerFactory.departments.Upload_departments(req.body,req.files)
        .then(function (result) {
            console.log('success');
            res.json({'Error':false, 'Message':result});
        })
        .catch(function (err) {
            console.log('Error',err);
            res.json({'Error':true,'Message':err});
        });
});

app.put('/RestApi/v1/Update_departments/',(req,res,next)=>{
    controllerFactory.departments.Update_departments(req.body)
        .then(function (result) {
            console.log('success');
            res.json({'Error':false, 'Message':result});
        })
        .catch(function (err) {
            console.log('Error',err);
            res.json({'Error':true,'Message':err});
        });
});

app.post('/RestApi/v1/UpdateFile_departments/',upload.any(),(req,res,next)=>{
    controllerFactory.departments.UpdateFile_departments(req.body,req.files)
        .then(function (result) {
            console.log('success');
            res.json({'Error':false, 'Message':result});
        })
        .catch(function (err) {
            console.log('Error',err);
            res.json({'Error':true,'Message':err});
        });
});

app.put('/RestApi/v1/DeleteFile_departments/',(req,res,next)=>{
    controllerFactory.departments.DeleteFile_departments(req.body)
        .then(function (result) {
            console.log('success');
            res.json({'Error':false, 'Message':result});
        })
        .catch(function (err) {
            console.log('Error',err);
            res.json({'Error':true,'Message':err});
        });
});

app.get('/RestApi/v1/SelectAll_departments/',CacheMiddleWare,(req,res,next)=>{
    controllerFactory.departments.SelectAll_departments()
        .then(function (result) {
            console.log('success');
            res.json({'Error':false, 'Message':result});
        })
        .catch(function (err) {
            console.log('Error',err);
            res.json({'Error':true,'Message':err});
        });
});


app.get('/RestApi/v1/SelectAllWithParent_departments/',CacheMiddleWare,(req,res,next)=>{
    controllerFactory.departments.SelectAllWithParent_departments()
        .then(function (result) {
            console.log('success');
            res.json({'Error':false, 'Message':result});
        })
        .catch(function (err) {
            console.log('Error',err);
            res.json({'Error':true,'Message':err});
        });
});


app.get('/RestApi/v1/SelectAllWithChild_departments/',CacheMiddleWare,(req,res,next)=>{
    controllerFactory.departments.SelectAllWithChild_departments()
        .then(function (result) {
            console.log('success');
            res.json({'Error':false, 'Message':result});
        })
        .catch(function (err) {
            console.log('Error',err);
            res.json({'Error':true,'Message':err});
        });
});


app.get('/RestApi/v1/SelectAllWithChildAndParent_departments/',CacheMiddleWare,(req,res,next)=>{
    controllerFactory.departments.SelectAllWithChildAndParent_departments()
        .then(function (result) {
            console.log('success');
            res.json({'Error':false, 'Message':result});
        })
        .catch(function (err) {
            console.log('Error',err);
            res.json({'Error':true,'Message':err});
        });
});


app.post('/RestApi/v1/SelectCondition_departments/',CacheMiddleWare,(req,res,next)=>{
    controllerFactory.departments.SelectCondition_departments(req.body)
        .then(function (result) {
            console.log('success');
            res.json({'Error':false, 'Message':result});
        })
        .catch(function (err) {
            console.log('Error',err);
            res.json({'Error':true,'Message':err});
        });
});

app.post('/RestApi/v1/SelectConditionWithParent_departments/',CacheMiddleWare,(req,res,next)=>{
    controllerFactory.departments.SelectConditionWithParent_departments(req.body)
        .then(function (result) {
            console.log('success');
            res.json({'Error':false, 'Message':result});
        })
        .catch(function (err) {
            console.log('Error',err);
            res.json({'Error':true,'Message':err});
        });
});

app.post('/RestApi/v1/SelectConditionWithChild_departments/',CacheMiddleWare,(req,res,next)=>{
    controllerFactory.departments.SelectConditionWithChild_departments(req.body)
        .then(function (result) {
            console.log('success');
            res.json({'Error':false, 'Message':result});
        })
        .catch(function (err) {
            console.log('Error',err);
            res.json({'Error':true,'Message':err});
        });
});

app.post('/RestApi/v1/SelectConditionWithChildAndParent_departments/',CacheMiddleWare,(req,res,next)=>{
    controllerFactory.departments.SelectConditionWithChildAndParent_departments(req.body)
        .then(function (result) {
            console.log('success');
            res.json({'Error':false, 'Message':result});
        })
        .catch(function (err) {
            console.log('Error',err);
            res.json({'Error':true,'Message':err});
        });
});

// ********************************************************************
// END - departments
// ********************************************************************


// ********************************************************************
// START - organization
// ********************************************************************


app.post('/RestApi/v1/DirectInsert_organization/',(req,res,next)=>{
    controllerFactory.organization.InsertData_organization(req.body)
        .then(function (result) {
            console.log('success');
            res.json({'Error':false, 'Message':result});
        })
        .catch(function (err) {
            console.log('Error',err);
            res.json({'Error':true,'Message':err});
        });
});

app.post('/RestApi/v1/InsertWithParent_organization/',(req,res,next)=>{
    controllerFactory.organization.Insert_organization(req.body)
        .then(function (result) {
            console.log('success');
            res.json({'Error':false, 'Message':result});
        })
        .catch(function (err) {
            console.log('Error',err);
            res.json({'Error':true,'Message':err});
        });
});

app.post('/RestApi/v1/Upload_organization/',upload.any(),(req,res,next)=>{
    controllerFactory.organization.Upload_organization(req.body,req.files)
        .then(function (result) {
            console.log('success');
            res.json({'Error':false, 'Message':result});
        })
        .catch(function (err) {
            console.log('Error',err);
            res.json({'Error':true,'Message':err});
        });
});

app.put('/RestApi/v1/Update_organization/',(req,res,next)=>{
    controllerFactory.organization.Update_organization(req.body)
        .then(function (result) {
            console.log('success');
            res.json({'Error':false, 'Message':result});
        })
        .catch(function (err) {
            console.log('Error',err);
            res.json({'Error':true,'Message':err});
        });
});

app.post('/RestApi/v1/UpdateFile_organization/',upload.any(),(req,res,next)=>{
    controllerFactory.organization.UpdateFile_organization(req.body,req.files)
        .then(function (result) {
            console.log('success');
            res.json({'Error':false, 'Message':result});
        })
        .catch(function (err) {
            console.log('Error',err);
            res.json({'Error':true,'Message':err});
        });
});

app.put('/RestApi/v1/DeleteFile_organization/',(req,res,next)=>{
    controllerFactory.organization.DeleteFile_organization(req.body)
        .then(function (result) {
            console.log('success');
            res.json({'Error':false, 'Message':result});
        })
        .catch(function (err) {
            console.log('Error',err);
            res.json({'Error':true,'Message':err});
        });
});

app.get('/RestApi/v1/SelectAll_organization/',CacheMiddleWare,(req,res,next)=>{
    controllerFactory.organization.SelectAll_organization()
        .then(function (result) {
            console.log('success');
            res.json({'Error':false, 'Message':result});
        })
        .catch(function (err) {
            console.log('Error',err);
            res.json({'Error':true,'Message':err});
        });
});


app.get('/RestApi/v1/SelectAllWithParent_organization/',CacheMiddleWare,(req,res,next)=>{
    controllerFactory.organization.SelectAllWithParent_organization()
        .then(function (result) {
            console.log('success');
            res.json({'Error':false, 'Message':result});
        })
        .catch(function (err) {
            console.log('Error',err);
            res.json({'Error':true,'Message':err});
        });
});


app.get('/RestApi/v1/SelectAllWithChild_organization/',CacheMiddleWare,(req,res,next)=>{
    controllerFactory.organization.SelectAllWithChild_organization()
        .then(function (result) {
            console.log('success');
            res.json({'Error':false, 'Message':result});
        })
        .catch(function (err) {
            console.log('Error',err);
            res.json({'Error':true,'Message':err});
        });
});


app.get('/RestApi/v1/SelectAllWithChildAndParent_organization/',CacheMiddleWare,(req,res,next)=>{
    controllerFactory.organization.SelectAllWithChildAndParent_organization()
        .then(function (result) {
            console.log('success');
            res.json({'Error':false, 'Message':result});
        })
        .catch(function (err) {
            console.log('Error',err);
            res.json({'Error':true,'Message':err});
        });
});


app.post('/RestApi/v1/SelectCondition_organization/',CacheMiddleWare,(req,res,next)=>{
    controllerFactory.organization.SelectCondition_organization(req.body)
        .then(function (result) {
            console.log('success');
            res.json({'Error':false, 'Message':result});
        })
        .catch(function (err) {
            console.log('Error',err);
            res.json({'Error':true,'Message':err});
        });
});

app.post('/RestApi/v1/SelectConditionWithParent_organization/',CacheMiddleWare,(req,res,next)=>{
    controllerFactory.organization.SelectConditionWithParent_organization(req.body)
        .then(function (result) {
            console.log('success');
            res.json({'Error':false, 'Message':result});
        })
        .catch(function (err) {
            console.log('Error',err);
            res.json({'Error':true,'Message':err});
        });
});

app.post('/RestApi/v1/SelectConditionWithChild_organization/',CacheMiddleWare,(req,res,next)=>{
    controllerFactory.organization.SelectConditionWithChild_organization(req.body)
        .then(function (result) {
            console.log('success');
            res.json({'Error':false, 'Message':result});
        })
        .catch(function (err) {
            console.log('Error',err);
            res.json({'Error':true,'Message':err});
        });
});

app.post('/RestApi/v1/SelectConditionWithChildAndParent_organization/',CacheMiddleWare,(req,res,next)=>{
    controllerFactory.organization.SelectConditionWithChildAndParent_organization(req.body)
        .then(function (result) {
            console.log('success');
            res.json({'Error':false, 'Message':result});
        })
        .catch(function (err) {
            console.log('Error',err);
            res.json({'Error':true,'Message':err});
        });
});

app.get('/RestApi/v1/Get_organization_Requirements/',CacheMiddleWare, (req, res, next) => {
    controllerFactory.organization.organization_PageRequiremnts()
        .then(function (result) {
            console.log('success');
            res.json({'Error': false, 'Message': result});
        })
        .catch(function (err) {
            console.log('Error', err);
            res.json({'Error': true, 'Message': err});
        });
});

// ********************************************************************
// END - organization
// ********************************************************************


// ********************************************************************
// START - organizationType
// ********************************************************************


app.post('/RestApi/v1/DirectInsert_organizationType/',(req,res,next)=>{
    controllerFactory.organizationType.InsertData_organizationType(req.body)
        .then(function (result) {
            console.log('success');
            res.json({'Error':false, 'Message':result});
        })
        .catch(function (err) {
            console.log('Error',err);
            res.json({'Error':true,'Message':err});
        });
});

app.post('/RestApi/v1/InsertWithParent_organizationType/',(req,res,next)=>{
    controllerFactory.organizationType.Insert_organizationType(req.body)
        .then(function (result) {
            console.log('success');
            res.json({'Error':false, 'Message':result});
        })
        .catch(function (err) {
            console.log('Error',err);
            res.json({'Error':true,'Message':err});
        });
});

app.post('/RestApi/v1/Upload_organizationType/',upload.any(),(req,res,next)=>{
    controllerFactory.organizationType.Upload_organizationType(req.body,req.files)
        .then(function (result) {
            console.log('success');
            res.json({'Error':false, 'Message':result});
        })
        .catch(function (err) {
            console.log('Error',err);
            res.json({'Error':true,'Message':err});
        });
});

app.put('/RestApi/v1/Update_organizationType/',(req,res,next)=>{
    controllerFactory.organizationType.Update_organizationType(req.body)
        .then(function (result) {
            console.log('success');
            res.json({'Error':false, 'Message':result});
        })
        .catch(function (err) {
            console.log('Error',err);
            res.json({'Error':true,'Message':err});
        });
});

app.post('/RestApi/v1/UpdateFile_organizationType/',upload.any(),(req,res,next)=>{
    controllerFactory.organizationType.UpdateFile_organizationType(req.body,req.files)
        .then(function (result) {
            console.log('success');
            res.json({'Error':false, 'Message':result});
        })
        .catch(function (err) {
            console.log('Error',err);
            res.json({'Error':true,'Message':err});
        });
});

app.put('/RestApi/v1/DeleteFile_organizationType/',(req,res,next)=>{
    controllerFactory.organizationType.DeleteFile_organizationType(req.body)
        .then(function (result) {
            console.log('success');
            res.json({'Error':false, 'Message':result});
        })
        .catch(function (err) {
            console.log('Error',err);
            res.json({'Error':true,'Message':err});
        });
});

app.get('/RestApi/v1/SelectAll_organizationType/',CacheMiddleWare,(req,res,next)=>{
    controllerFactory.organizationType.SelectAll_organizationType()
        .then(function (result) {
            console.log('success');
            res.json({'Error':false, 'Message':result});
        })
        .catch(function (err) {
            console.log('Error',err);
            res.json({'Error':true,'Message':err});
        });
});


app.get('/RestApi/v1/SelectAllWithParent_organizationType/',CacheMiddleWare,(req,res,next)=>{
    controllerFactory.organizationType.SelectAllWithParent_organizationType()
        .then(function (result) {
            console.log('success');
            res.json({'Error':false, 'Message':result});
        })
        .catch(function (err) {
            console.log('Error',err);
            res.json({'Error':true,'Message':err});
        });
});


app.get('/RestApi/v1/SelectAllWithChild_organizationType/',CacheMiddleWare,(req,res,next)=>{
    controllerFactory.organizationType.SelectAllWithChild_organizationType()
        .then(function (result) {
            console.log('success');
            res.json({'Error':false, 'Message':result});
        })
        .catch(function (err) {
            console.log('Error',err);
            res.json({'Error':true,'Message':err});
        });
});


app.get('/RestApi/v1/SelectAllWithChildAndParent_organizationType/',CacheMiddleWare,(req,res,next)=>{
    controllerFactory.organizationType.SelectAllWithChildAndParent_organizationType()
        .then(function (result) {
            console.log('success');
            res.json({'Error':false, 'Message':result});
        })
        .catch(function (err) {
            console.log('Error',err);
            res.json({'Error':true,'Message':err});
        });
});


app.post('/RestApi/v1/SelectCondition_organizationType/',CacheMiddleWare,(req,res,next)=>{
    controllerFactory.organizationType.SelectCondition_organizationType(req.body)
        .then(function (result) {
            console.log('success');
            res.json({'Error':false, 'Message':result});
        })
        .catch(function (err) {
            console.log('Error',err);
            res.json({'Error':true,'Message':err});
        });
});

app.post('/RestApi/v1/SelectConditionWithParent_organizationType/',CacheMiddleWare,(req,res,next)=>{
    controllerFactory.organizationType.SelectConditionWithParent_organizationType(req.body)
        .then(function (result) {
            console.log('success');
            res.json({'Error':false, 'Message':result});
        })
        .catch(function (err) {
            console.log('Error',err);
            res.json({'Error':true,'Message':err});
        });
});

app.post('/RestApi/v1/SelectConditionWithChild_organizationType/',CacheMiddleWare,(req,res,next)=>{
    controllerFactory.organizationType.SelectConditionWithChild_organizationType(req.body)
        .then(function (result) {
            console.log('success');
            res.json({'Error':false, 'Message':result});
        })
        .catch(function (err) {
            console.log('Error',err);
            res.json({'Error':true,'Message':err});
        });
});

app.post('/RestApi/v1/SelectConditionWithChildAndParent_organizationType/',CacheMiddleWare,(req,res,next)=>{
    controllerFactory.organizationType.SelectConditionWithChildAndParent_organizationType(req.body)
        .then(function (result) {
            console.log('success');
            res.json({'Error':false, 'Message':result});
        })
        .catch(function (err) {
            console.log('Error',err);
            res.json({'Error':true,'Message':err});
        });
});

// ********************************************************************
// END - organizationType
// ********************************************************************


// ********************************************************************
// START - organizationUsers
// ********************************************************************


app.post('/RestApi/v1/DirectInsert_organizationUsers/',(req,res,next)=>{
    controllerFactory.organizationUsers.InsertData_organizationUsers(req.body)
        .then(function (result) {
            console.log('success');
            res.json({'Error':false, 'Message':result});
        })
        .catch(function (err) {
            console.log('Error',err);
            res.json({'Error':true,'Message':err});
        });
});

app.post('/RestApi/v1/InsertWithParent_organizationUsers/',(req,res,next)=>{
    controllerFactory.organizationUsers.Insert_organizationUsers(req.body)
        .then(function (result) {
            console.log('success');
            res.json({'Error':false, 'Message':result});
        })
        .catch(function (err) {
            console.log('Error',err);
            res.json({'Error':true,'Message':err});
        });
});

app.post('/RestApi/v1/Upload_organizationUsers/',upload.any(),(req,res,next)=>{
    controllerFactory.organizationUsers.Upload_organizationUsers(req.body,req.files)
        .then(function (result) {
            console.log('success');
            res.json({'Error':false, 'Message':result});
        })
        .catch(function (err) {
            console.log('Error',err);
            res.json({'Error':true,'Message':err});
        });
});

app.put('/RestApi/v1/Update_organizationUsers/',(req,res,next)=>{
    controllerFactory.organizationUsers.Update_organizationUsers(req.body)
        .then(function (result) {
            console.log('success');
            res.json({'Error':false, 'Message':result});
        })
        .catch(function (err) {
            console.log('Error',err);
            res.json({'Error':true,'Message':err});
        });
});

app.post('/RestApi/v1/UpdateFile_organizationUsers/',upload.any(),(req,res,next)=>{
    controllerFactory.organizationUsers.UpdateFile_organizationUsers(req.body,req.files)
        .then(function (result) {
            console.log('success');
            res.json({'Error':false, 'Message':result});
        })
        .catch(function (err) {
            console.log('Error',err);
            res.json({'Error':true,'Message':err});
        });
});

app.put('/RestApi/v1/DeleteFile_organizationUsers/',(req,res,next)=>{
    controllerFactory.organizationUsers.DeleteFile_organizationUsers(req.body)
        .then(function (result) {
            console.log('success');
            res.json({'Error':false, 'Message':result});
        })
        .catch(function (err) {
            console.log('Error',err);
            res.json({'Error':true,'Message':err});
        });
});

app.get('/RestApi/v1/SelectAll_organizationUsers/',CacheMiddleWare,(req,res,next)=>{
    controllerFactory.organizationUsers.SelectAll_organizationUsers()
        .then(function (result) {
            console.log('success');
            res.json({'Error':false, 'Message':result});
        })
        .catch(function (err) {
            console.log('Error',err);
            res.json({'Error':true,'Message':err});
        });
});


app.get('/RestApi/v1/SelectAllWithParent_organizationUsers/',CacheMiddleWare,(req,res,next)=>{
    controllerFactory.organizationUsers.SelectAllWithParent_organizationUsers()
        .then(function (result) {
            console.log('success');
            res.json({'Error':false, 'Message':result});
        })
        .catch(function (err) {
            console.log('Error',err);
            res.json({'Error':true,'Message':err});
        });
});


app.get('/RestApi/v1/SelectAllWithChild_organizationUsers/',CacheMiddleWare,(req,res,next)=>{
    controllerFactory.organizationUsers.SelectAllWithChild_organizationUsers()
        .then(function (result) {
            console.log('success');
            res.json({'Error':false, 'Message':result});
        })
        .catch(function (err) {
            console.log('Error',err);
            res.json({'Error':true,'Message':err});
        });
});


app.get('/RestApi/v1/SelectAllWithChildAndParent_organizationUsers/',CacheMiddleWare,(req,res,next)=>{
    controllerFactory.organizationUsers.SelectAllWithChildAndParent_organizationUsers()
        .then(function (result) {
            console.log('success');
            res.json({'Error':false, 'Message':result});
        })
        .catch(function (err) {
            console.log('Error',err);
            res.json({'Error':true,'Message':err});
        });
});


app.post('/RestApi/v1/SelectCondition_organizationUsers/',CacheMiddleWare,(req,res,next)=>{
    controllerFactory.organizationUsers.SelectCondition_organizationUsers(req.body)
        .then(function (result) {
            console.log('success');
            res.json({'Error':false, 'Message':result});
        })
        .catch(function (err) {
            console.log('Error',err);
            res.json({'Error':true,'Message':err});
        });
});

app.post('/RestApi/v1/SelectConditionWithParent_organizationUsers/',CacheMiddleWare,(req,res,next)=>{
    controllerFactory.organizationUsers.SelectConditionWithParent_organizationUsers(req.body)
        .then(function (result) {
            console.log('success');
            res.json({'Error':false, 'Message':result});
        })
        .catch(function (err) {
            console.log('Error',err);
            res.json({'Error':true,'Message':err});
        });
});

app.post('/RestApi/v1/SelectConditionWithChild_organizationUsers/',CacheMiddleWare,(req,res,next)=>{
    controllerFactory.organizationUsers.SelectConditionWithChild_organizationUsers(req.body)
        .then(function (result) {
            console.log('success');
            res.json({'Error':false, 'Message':result});
        })
        .catch(function (err) {
            console.log('Error',err);
            res.json({'Error':true,'Message':err});
        });
});

app.post('/RestApi/v1/SelectConditionWithChildAndParent_organizationUsers/',CacheMiddleWare,(req,res,next)=>{
    controllerFactory.organizationUsers.SelectConditionWithChildAndParent_organizationUsers(req.body)
        .then(function (result) {
            console.log('success');
            res.json({'Error':false, 'Message':result});
        })
        .catch(function (err) {
            console.log('Error',err);
            res.json({'Error':true,'Message':err});
        });
});

app.get('/RestApi/v1/Get_organizationUsers_Requirements/',CacheMiddleWare, (req, res, next) => {
    controllerFactory.organizationUsers.organizationUsers_PageRequiremnts()
        .then(function (result) {
            console.log('success');
            res.json({'Error': false, 'Message': result});
        })
        .catch(function (err) {
            console.log('Error', err);
            res.json({'Error': true, 'Message': err});
        });
});

// ********************************************************************
// END - organizationUsers
// ********************************************************************


// ********************************************************************
// START - staticPages
// ********************************************************************


app.post('/RestApi/v1/DirectInsert_staticPages/',(req,res,next)=>{
    controllerFactory.staticPages.InsertData_staticPages(req.body)
        .then(function (result) {
            console.log('success');
            res.json({'Error':false, 'Message':result});
        })
        .catch(function (err) {
            console.log('Error',err);
            res.json({'Error':true,'Message':err});
        });
});

app.post('/RestApi/v1/InsertWithParent_staticPages/',(req,res,next)=>{
    controllerFactory.staticPages.Insert_staticPages(req.body)
        .then(function (result) {
            console.log('success');
            res.json({'Error':false, 'Message':result});
        })
        .catch(function (err) {
            console.log('Error',err);
            res.json({'Error':true,'Message':err});
        });
});

app.post('/RestApi/v1/Upload_staticPages/',upload.any(),(req,res,next)=>{
    controllerFactory.staticPages.Upload_staticPages(req.body,req.files)
        .then(function (result) {
            console.log('success');
            res.json({'Error':false, 'Message':result});
        })
        .catch(function (err) {
            console.log('Error',err);
            res.json({'Error':true,'Message':err});
        });
});

app.put('/RestApi/v1/Update_staticPages/',(req,res,next)=>{
    controllerFactory.staticPages.Update_staticPages(req.body)
        .then(function (result) {
            console.log('success');
            res.json({'Error':false, 'Message':result});
        })
        .catch(function (err) {
            console.log('Error',err);
            res.json({'Error':true,'Message':err});
        });
});

app.post('/RestApi/v1/UpdateFile_staticPages/',upload.any(),(req,res,next)=>{
    controllerFactory.staticPages.UpdateFile_staticPages(req.body,req.files)
        .then(function (result) {
            console.log('success');
            res.json({'Error':false, 'Message':result});
        })
        .catch(function (err) {
            console.log('Error',err);
            res.json({'Error':true,'Message':err});
        });
});

app.put('/RestApi/v1/DeleteFile_staticPages/',(req,res,next)=>{
    controllerFactory.staticPages.DeleteFile_staticPages(req.body)
        .then(function (result) {
            console.log('success');
            res.json({'Error':false, 'Message':result});
        })
        .catch(function (err) {
            console.log('Error',err);
            res.json({'Error':true,'Message':err});
        });
});

app.get('/RestApi/v1/SelectAll_staticPages/',CacheMiddleWare,(req,res,next)=>{
    controllerFactory.staticPages.SelectAll_staticPages()
        .then(function (result) {
            console.log('success');
            res.json({'Error':false, 'Message':result});
        })
        .catch(function (err) {
            console.log('Error',err);
            res.json({'Error':true,'Message':err});
        });
});


app.get('/RestApi/v1/SelectAllWithParent_staticPages/',CacheMiddleWare,(req,res,next)=>{
    controllerFactory.staticPages.SelectAllWithParent_staticPages()
        .then(function (result) {
            console.log('success');
            res.json({'Error':false, 'Message':result});
        })
        .catch(function (err) {
            console.log('Error',err);
            res.json({'Error':true,'Message':err});
        });
});


app.get('/RestApi/v1/SelectAllWithChild_staticPages/',CacheMiddleWare,(req,res,next)=>{
    controllerFactory.staticPages.SelectAllWithChild_staticPages()
        .then(function (result) {
            console.log('success');
            res.json({'Error':false, 'Message':result});
        })
        .catch(function (err) {
            console.log('Error',err);
            res.json({'Error':true,'Message':err});
        });
});


app.get('/RestApi/v1/SelectAllWithChildAndParent_staticPages/',CacheMiddleWare,(req,res,next)=>{
    controllerFactory.staticPages.SelectAllWithChildAndParent_staticPages()
        .then(function (result) {
            console.log('success');
            res.json({'Error':false, 'Message':result});
        })
        .catch(function (err) {
            console.log('Error',err);
            res.json({'Error':true,'Message':err});
        });
});


app.post('/RestApi/v1/SelectCondition_staticPages/',CacheMiddleWare,(req,res,next)=>{
    controllerFactory.staticPages.SelectCondition_staticPages(req.body)
        .then(function (result) {
            console.log('success');
            res.json({'Error':false, 'Message':result});
        })
        .catch(function (err) {
            console.log('Error',err);
            res.json({'Error':true,'Message':err});
        });
});

app.post('/RestApi/v1/SelectConditionWithParent_staticPages/',CacheMiddleWare,(req,res,next)=>{
    controllerFactory.staticPages.SelectConditionWithParent_staticPages(req.body)
        .then(function (result) {
            console.log('success');
            res.json({'Error':false, 'Message':result});
        })
        .catch(function (err) {
            console.log('Error',err);
            res.json({'Error':true,'Message':err});
        });
});

app.post('/RestApi/v1/SelectConditionWithChild_staticPages/',CacheMiddleWare,(req,res,next)=>{
    controllerFactory.staticPages.SelectConditionWithChild_staticPages(req.body)
        .then(function (result) {
            console.log('success');
            res.json({'Error':false, 'Message':result});
        })
        .catch(function (err) {
            console.log('Error',err);
            res.json({'Error':true,'Message':err});
        });
});

app.post('/RestApi/v1/SelectConditionWithChildAndParent_staticPages/',CacheMiddleWare,(req,res,next)=>{
    controllerFactory.staticPages.SelectConditionWithChildAndParent_staticPages(req.body)
        .then(function (result) {
            console.log('success');
            res.json({'Error':false, 'Message':result});
        })
        .catch(function (err) {
            console.log('Error',err);
            res.json({'Error':true,'Message':err});
        });
});

// ********************************************************************
// END - staticPages
// ********************************************************************


// ********************************************************************
// START - userInformation
// ********************************************************************


app.post('/RestApi/v1/DirectInsert_userInformation/',(req,res,next)=>{
    controllerFactory.userInformation.InsertData_userInformation(req.body)
        .then(function (result) {
            console.log('success');
            res.json({'Error':false, 'Message':result});
        })
        .catch(function (err) {
            console.log('Error',err);
            res.json({'Error':true,'Message':err});
        });
});

app.post('/RestApi/v1/InsertWithParent_userInformation/',(req,res,next)=>{
    controllerFactory.userInformation.Insert_userInformation(req.body)
        .then(function (result) {
            console.log('success');
            res.json({'Error':false, 'Message':result});
        })
        .catch(function (err) {
            console.log('Error',err);
            res.json({'Error':true,'Message':err});
        });
});

app.post('/RestApi/v1/Upload_userInformation/',upload.any(),(req,res,next)=>{
    controllerFactory.userInformation.Upload_userInformation(req.body,req.files)
        .then(function (result) {
            console.log('success');
            res.json({'Error':false, 'Message':result});
        })
        .catch(function (err) {
            console.log('Error',err);
            res.json({'Error':true,'Message':err});
        });
});

app.put('/RestApi/v1/Update_userInformation/',(req,res,next)=>{
    controllerFactory.userInformation.Update_userInformation(req.body)
        .then(function (result) {
            console.log('success');
            res.json({'Error':false, 'Message':result});
        })
        .catch(function (err) {
            console.log('Error',err);
            res.json({'Error':true,'Message':err});
        });
});

app.post('/RestApi/v1/UpdateFile_userInformation/',upload.any(),(req,res,next)=>{
    controllerFactory.userInformation.UpdateFile_userInformation(req.body,req.files)
        .then(function (result) {
            console.log('success');
            res.json({'Error':false, 'Message':result});
        })
        .catch(function (err) {
            console.log('Error',err);
            res.json({'Error':true,'Message':err});
        });
});

app.put('/RestApi/v1/DeleteFile_userInformation/',(req,res,next)=>{
    controllerFactory.userInformation.DeleteFile_userInformation(req.body)
        .then(function (result) {
            console.log('success');
            res.json({'Error':false, 'Message':result});
        })
        .catch(function (err) {
            console.log('Error',err);
            res.json({'Error':true,'Message':err});
        });
});

app.get('/RestApi/v1/SelectAll_userInformation/',CacheMiddleWare,(req,res,next)=>{
    controllerFactory.userInformation.SelectAll_userInformation()
        .then(function (result) {
            console.log('success');
            res.json({'Error':false, 'Message':result});
        })
        .catch(function (err) {
            console.log('Error',err);
            res.json({'Error':true,'Message':err});
        });
});


app.get('/RestApi/v1/SelectAllWithParent_userInformation/',CacheMiddleWare,(req,res,next)=>{
    controllerFactory.userInformation.SelectAllWithParent_userInformation()
        .then(function (result) {
            console.log('success');
            res.json({'Error':false, 'Message':result});
        })
        .catch(function (err) {
            console.log('Error',err);
            res.json({'Error':true,'Message':err});
        });
});


app.get('/RestApi/v1/SelectAllWithChild_userInformation/',CacheMiddleWare,(req,res,next)=>{
    controllerFactory.userInformation.SelectAllWithChild_userInformation()
        .then(function (result) {
            console.log('success');
            res.json({'Error':false, 'Message':result});
        })
        .catch(function (err) {
            console.log('Error',err);
            res.json({'Error':true,'Message':err});
        });
});


app.get('/RestApi/v1/SelectAllWithChildAndParent_userInformation/',CacheMiddleWare,(req,res,next)=>{
    controllerFactory.userInformation.SelectAllWithChildAndParent_userInformation()
        .then(function (result) {
            console.log('success');
            res.json({'Error':false, 'Message':result});
        })
        .catch(function (err) {
            console.log('Error',err);
            res.json({'Error':true,'Message':err});
        });
});


app.post('/RestApi/v1/SelectCondition_userInformation/',CacheMiddleWare,(req,res,next)=>{
    controllerFactory.userInformation.SelectCondition_userInformation(req.body)
        .then(function (result) {
            console.log('success');
            res.json({'Error':false, 'Message':result});
        })
        .catch(function (err) {
            console.log('Error',err);
            res.json({'Error':true,'Message':err});
        });
});

app.post('/RestApi/v1/SelectConditionWithParent_userInformation/',CacheMiddleWare,(req,res,next)=>{
    controllerFactory.userInformation.SelectConditionWithParent_userInformation(req.body)
        .then(function (result) {
            console.log('success');
            res.json({'Error':false, 'Message':result});
        })
        .catch(function (err) {
            console.log('Error',err);
            res.json({'Error':true,'Message':err});
        });
});

app.post('/RestApi/v1/SelectConditionWithChild_userInformation/',CacheMiddleWare,(req,res,next)=>{
    controllerFactory.userInformation.SelectConditionWithChild_userInformation(req.body)
        .then(function (result) {
            console.log('success');
            res.json({'Error':false, 'Message':result});
        })
        .catch(function (err) {
            console.log('Error',err);
            res.json({'Error':true,'Message':err});
        });
});

app.post('/RestApi/v1/SelectConditionWithChildAndParent_userInformation/',CacheMiddleWare,(req,res,next)=>{
    controllerFactory.userInformation.SelectConditionWithChildAndParent_userInformation(req.body)
        .then(function (result) {
            console.log('success');
            res.json({'Error':false, 'Message':result});
        })
        .catch(function (err) {
            console.log('Error',err);
            res.json({'Error':true,'Message':err});
        });
});

app.get('/RestApi/v1/Get_userInformation_Requirements/',CacheMiddleWare, (req, res, next) => {
    controllerFactory.userInformation.userInformation_PageRequiremnts()
        .then(function (result) {
            console.log('success');
            res.json({'Error': false, 'Message': result});
        })
        .catch(function (err) {
            console.log('Error', err);
            res.json({'Error': true, 'Message': err});
        });
});

// ********************************************************************
// END - userInformation
// ********************************************************************


// ********************************************************************
// START - userRole
// ********************************************************************


app.post('/RestApi/v1/DirectInsert_userRole/',(req,res,next)=>{
    controllerFactory.userRole.InsertData_userRole(req.body)
        .then(function (result) {
            console.log('success');
            res.json({'Error':false, 'Message':result});
        })
        .catch(function (err) {
            console.log('Error',err);
            res.json({'Error':true,'Message':err});
        });
});

app.post('/RestApi/v1/InsertWithParent_userRole/',(req,res,next)=>{
    controllerFactory.userRole.Insert_userRole(req.body)
        .then(function (result) {
            console.log('success');
            res.json({'Error':false, 'Message':result});
        })
        .catch(function (err) {
            console.log('Error',err);
            res.json({'Error':true,'Message':err});
        });
});

app.post('/RestApi/v1/Upload_userRole/',upload.any(),(req,res,next)=>{
    controllerFactory.userRole.Upload_userRole(req.body,req.files)
        .then(function (result) {
            console.log('success');
            res.json({'Error':false, 'Message':result});
        })
        .catch(function (err) {
            console.log('Error',err);
            res.json({'Error':true,'Message':err});
        });
});

app.put('/RestApi/v1/Update_userRole/',(req,res,next)=>{
    controllerFactory.userRole.Update_userRole(req.body)
        .then(function (result) {
            console.log('success');
            res.json({'Error':false, 'Message':result});
        })
        .catch(function (err) {
            console.log('Error',err);
            res.json({'Error':true,'Message':err});
        });
});

app.post('/RestApi/v1/UpdateFile_userRole/',upload.any(),(req,res,next)=>{
    controllerFactory.userRole.UpdateFile_userRole(req.body,req.files)
        .then(function (result) {
            console.log('success');
            res.json({'Error':false, 'Message':result});
        })
        .catch(function (err) {
            console.log('Error',err);
            res.json({'Error':true,'Message':err});
        });
});

app.put('/RestApi/v1/DeleteFile_userRole/',(req,res,next)=>{
    controllerFactory.userRole.DeleteFile_userRole(req.body)
        .then(function (result) {
            console.log('success');
            res.json({'Error':false, 'Message':result});
        })
        .catch(function (err) {
            console.log('Error',err);
            res.json({'Error':true,'Message':err});
        });
});

app.get('/RestApi/v1/SelectAll_userRole/',CacheMiddleWare,(req,res,next)=>{
    controllerFactory.userRole.SelectAll_userRole()
        .then(function (result) {
            console.log('success');
            res.json({'Error':false, 'Message':result});
        })
        .catch(function (err) {
            console.log('Error',err);
            res.json({'Error':true,'Message':err});
        });
});


app.get('/RestApi/v1/SelectAllWithParent_userRole/',CacheMiddleWare,(req,res,next)=>{
    controllerFactory.userRole.SelectAllWithParent_userRole()
        .then(function (result) {
            console.log('success');
            res.json({'Error':false, 'Message':result});
        })
        .catch(function (err) {
            console.log('Error',err);
            res.json({'Error':true,'Message':err});
        });
});


app.get('/RestApi/v1/SelectAllWithChild_userRole/',CacheMiddleWare,(req,res,next)=>{
    controllerFactory.userRole.SelectAllWithChild_userRole()
        .then(function (result) {
            console.log('success');
            res.json({'Error':false, 'Message':result});
        })
        .catch(function (err) {
            console.log('Error',err);
            res.json({'Error':true,'Message':err});
        });
});


app.get('/RestApi/v1/SelectAllWithChildAndParent_userRole/',CacheMiddleWare,(req,res,next)=>{
    controllerFactory.userRole.SelectAllWithChildAndParent_userRole()
        .then(function (result) {
            console.log('success');
            res.json({'Error':false, 'Message':result});
        })
        .catch(function (err) {
            console.log('Error',err);
            res.json({'Error':true,'Message':err});
        });
});


app.post('/RestApi/v1/SelectCondition_userRole/',CacheMiddleWare,(req,res,next)=>{
    controllerFactory.userRole.SelectCondition_userRole(req.body)
        .then(function (result) {
            console.log('success');
            res.json({'Error':false, 'Message':result});
        })
        .catch(function (err) {
            console.log('Error',err);
            res.json({'Error':true,'Message':err});
        });
});

app.post('/RestApi/v1/SelectConditionWithParent_userRole/',CacheMiddleWare,(req,res,next)=>{
    controllerFactory.userRole.SelectConditionWithParent_userRole(req.body)
        .then(function (result) {
            console.log('success');
            res.json({'Error':false, 'Message':result});
        })
        .catch(function (err) {
            console.log('Error',err);
            res.json({'Error':true,'Message':err});
        });
});

app.post('/RestApi/v1/SelectConditionWithChild_userRole/',CacheMiddleWare,(req,res,next)=>{
    controllerFactory.userRole.SelectConditionWithChild_userRole(req.body)
        .then(function (result) {
            console.log('success');
            res.json({'Error':false, 'Message':result});
        })
        .catch(function (err) {
            console.log('Error',err);
            res.json({'Error':true,'Message':err});
        });
});

app.post('/RestApi/v1/SelectConditionWithChildAndParent_userRole/',CacheMiddleWare,(req,res,next)=>{
    controllerFactory.userRole.SelectConditionWithChildAndParent_userRole(req.body)
        .then(function (result) {
            console.log('success');
            res.json({'Error':false, 'Message':result});
        })
        .catch(function (err) {
            console.log('Error',err);
            res.json({'Error':true,'Message':err});
        });
});

// ********************************************************************
// END - userRole
// ********************************************************************


// ********************************************************************
// START - userSlots
// ********************************************************************


app.post('/RestApi/v1/DirectInsert_userSlots/',(req,res,next)=>{
    controllerFactory.userSlots.InsertData_userSlots(req.body)
        .then(function (result) {
            console.log('success');
            res.json({'Error':false, 'Message':result});
        })
        .catch(function (err) {
            console.log('Error',err);
            res.json({'Error':true,'Message':err});
        });
});

app.post('/RestApi/v1/InsertWithParent_userSlots/',(req,res,next)=>{
    controllerFactory.userSlots.Insert_userSlots(req.body)
        .then(function (result) {
            console.log('success');
            res.json({'Error':false, 'Message':result});
        })
        .catch(function (err) {
            console.log('Error',err);
            res.json({'Error':true,'Message':err});
        });
});

app.post('/RestApi/v1/Upload_userSlots/',upload.any(),(req,res,next)=>{
    controllerFactory.userSlots.Upload_userSlots(req.body,req.files)
        .then(function (result) {
            console.log('success');
            res.json({'Error':false, 'Message':result});
        })
        .catch(function (err) {
            console.log('Error',err);
            res.json({'Error':true,'Message':err});
        });
});

app.put('/RestApi/v1/Update_userSlots/',(req,res,next)=>{
    controllerFactory.userSlots.Update_userSlots(req.body)
        .then(function (result) {
            console.log('success');
            res.json({'Error':false, 'Message':result});
        })
        .catch(function (err) {
            console.log('Error',err);
            res.json({'Error':true,'Message':err});
        });
});

app.post('/RestApi/v1/UpdateFile_userSlots/',upload.any(),(req,res,next)=>{
    controllerFactory.userSlots.UpdateFile_userSlots(req.body,req.files)
        .then(function (result) {
            console.log('success');
            res.json({'Error':false, 'Message':result});
        })
        .catch(function (err) {
            console.log('Error',err);
            res.json({'Error':true,'Message':err});
        });
});

app.put('/RestApi/v1/DeleteFile_userSlots/',(req,res,next)=>{
    controllerFactory.userSlots.DeleteFile_userSlots(req.body)
        .then(function (result) {
            console.log('success');
            res.json({'Error':false, 'Message':result});
        })
        .catch(function (err) {
            console.log('Error',err);
            res.json({'Error':true,'Message':err});
        });
});

app.get('/RestApi/v1/SelectAll_userSlots/',CacheMiddleWare,(req,res,next)=>{
    controllerFactory.userSlots.SelectAll_userSlots()
        .then(function (result) {
            console.log('success');
            res.json({'Error':false, 'Message':result});
        })
        .catch(function (err) {
            console.log('Error',err);
            res.json({'Error':true,'Message':err});
        });
});


app.get('/RestApi/v1/SelectAllWithParent_userSlots/',CacheMiddleWare,(req,res,next)=>{
    controllerFactory.userSlots.SelectAllWithParent_userSlots()
        .then(function (result) {
            console.log('success');
            res.json({'Error':false, 'Message':result});
        })
        .catch(function (err) {
            console.log('Error',err);
            res.json({'Error':true,'Message':err});
        });
});


app.get('/RestApi/v1/SelectAllWithChild_userSlots/',CacheMiddleWare,(req,res,next)=>{
    controllerFactory.userSlots.SelectAllWithChild_userSlots()
        .then(function (result) {
            console.log('success');
            res.json({'Error':false, 'Message':result});
        })
        .catch(function (err) {
            console.log('Error',err);
            res.json({'Error':true,'Message':err});
        });
});


app.get('/RestApi/v1/SelectAllWithChildAndParent_userSlots/',CacheMiddleWare,(req,res,next)=>{
    controllerFactory.userSlots.SelectAllWithChildAndParent_userSlots()
        .then(function (result) {
            console.log('success');
            res.json({'Error':false, 'Message':result});
        })
        .catch(function (err) {
            console.log('Error',err);
            res.json({'Error':true,'Message':err});
        });
});


app.post('/RestApi/v1/SelectCondition_userSlots/',CacheMiddleWare,(req,res,next)=>{
    controllerFactory.userSlots.SelectCondition_userSlots(req.body)
        .then(function (result) {
            console.log('success');
            res.json({'Error':false, 'Message':result});
        })
        .catch(function (err) {
            console.log('Error',err);
            res.json({'Error':true,'Message':err});
        });
});

app.post('/RestApi/v1/SelectConditionWithParent_userSlots/',CacheMiddleWare,(req,res,next)=>{
    controllerFactory.userSlots.SelectConditionWithParent_userSlots(req.body)
        .then(function (result) {
            console.log('success');
            res.json({'Error':false, 'Message':result});
        })
        .catch(function (err) {
            console.log('Error',err);
            res.json({'Error':true,'Message':err});
        });
});

app.post('/RestApi/v1/SelectConditionWithChild_userSlots/',CacheMiddleWare,(req,res,next)=>{
    controllerFactory.userSlots.SelectConditionWithChild_userSlots(req.body)
        .then(function (result) {
            console.log('success');
            res.json({'Error':false, 'Message':result});
        })
        .catch(function (err) {
            console.log('Error',err);
            res.json({'Error':true,'Message':err});
        });
});

app.post('/RestApi/v1/SelectConditionWithChildAndParent_userSlots/',CacheMiddleWare,(req,res,next)=>{
    controllerFactory.userSlots.SelectConditionWithChildAndParent_userSlots(req.body)
        .then(function (result) {
            console.log('success');
            res.json({'Error':false, 'Message':result});
        })
        .catch(function (err) {
            console.log('Error',err);
            res.json({'Error':true,'Message':err});
        });
});

// ********************************************************************
// END - userSlots
// ********************************************************************


// ********************************************************************
// START - userTypes
// ********************************************************************


app.post('/RestApi/v1/DirectInsert_userTypes/',(req,res,next)=>{
    controllerFactory.userTypes.InsertData_userTypes(req.body)
        .then(function (result) {
            console.log('success');
            res.json({'Error':false, 'Message':result});
        })
        .catch(function (err) {
            console.log('Error',err);
            res.json({'Error':true,'Message':err});
        });
});

app.post('/RestApi/v1/InsertWithParent_userTypes/',(req,res,next)=>{
    controllerFactory.userTypes.Insert_userTypes(req.body)
        .then(function (result) {
            console.log('success');
            res.json({'Error':false, 'Message':result});
        })
        .catch(function (err) {
            console.log('Error',err);
            res.json({'Error':true,'Message':err});
        });
});

app.post('/RestApi/v1/Upload_userTypes/',upload.any(),(req,res,next)=>{
    controllerFactory.userTypes.Upload_userTypes(req.body,req.files)
        .then(function (result) {
            console.log('success');
            res.json({'Error':false, 'Message':result});
        })
        .catch(function (err) {
            console.log('Error',err);
            res.json({'Error':true,'Message':err});
        });
});

app.put('/RestApi/v1/Update_userTypes/',(req,res,next)=>{
    controllerFactory.userTypes.Update_userTypes(req.body)
        .then(function (result) {
            console.log('success');
            res.json({'Error':false, 'Message':result});
        })
        .catch(function (err) {
            console.log('Error',err);
            res.json({'Error':true,'Message':err});
        });
});

app.post('/RestApi/v1/UpdateFile_userTypes/',upload.any(),(req,res,next)=>{
    controllerFactory.userTypes.UpdateFile_userTypes(req.body,req.files)
        .then(function (result) {
            console.log('success');
            res.json({'Error':false, 'Message':result});
        })
        .catch(function (err) {
            console.log('Error',err);
            res.json({'Error':true,'Message':err});
        });
});

app.put('/RestApi/v1/DeleteFile_userTypes/',(req,res,next)=>{
    controllerFactory.userTypes.DeleteFile_userTypes(req.body)
        .then(function (result) {
            console.log('success');
            res.json({'Error':false, 'Message':result});
        })
        .catch(function (err) {
            console.log('Error',err);
            res.json({'Error':true,'Message':err});
        });
});

app.get('/RestApi/v1/SelectAll_userTypes/',CacheMiddleWare,(req,res,next)=>{
    controllerFactory.userTypes.SelectAll_userTypes()
        .then(function (result) {
            console.log('success');
            res.json({'Error':false, 'Message':result});
        })
        .catch(function (err) {
            console.log('Error',err);
            res.json({'Error':true,'Message':err});
        });
});


app.get('/RestApi/v1/SelectAllWithParent_userTypes/',CacheMiddleWare,(req,res,next)=>{
    controllerFactory.userTypes.SelectAllWithParent_userTypes()
        .then(function (result) {
            console.log('success');
            res.json({'Error':false, 'Message':result});
        })
        .catch(function (err) {
            console.log('Error',err);
            res.json({'Error':true,'Message':err});
        });
});


app.get('/RestApi/v1/SelectAllWithChild_userTypes/',CacheMiddleWare,(req,res,next)=>{
    controllerFactory.userTypes.SelectAllWithChild_userTypes()
        .then(function (result) {
            console.log('success');
            res.json({'Error':false, 'Message':result});
        })
        .catch(function (err) {
            console.log('Error',err);
            res.json({'Error':true,'Message':err});
        });
});


app.get('/RestApi/v1/SelectAllWithChildAndParent_userTypes/',CacheMiddleWare,(req,res,next)=>{
    controllerFactory.userTypes.SelectAllWithChildAndParent_userTypes()
        .then(function (result) {
            console.log('success');
            res.json({'Error':false, 'Message':result});
        })
        .catch(function (err) {
            console.log('Error',err);
            res.json({'Error':true,'Message':err});
        });
});


app.post('/RestApi/v1/SelectCondition_userTypes/',CacheMiddleWare,(req,res,next)=>{
    controllerFactory.userTypes.SelectCondition_userTypes(req.body)
        .then(function (result) {
            console.log('success');
            res.json({'Error':false, 'Message':result});
        })
        .catch(function (err) {
            console.log('Error',err);
            res.json({'Error':true,'Message':err});
        });
});

app.post('/RestApi/v1/SelectConditionWithParent_userTypes/',CacheMiddleWare,(req,res,next)=>{
    controllerFactory.userTypes.SelectConditionWithParent_userTypes(req.body)
        .then(function (result) {
            console.log('success');
            res.json({'Error':false, 'Message':result});
        })
        .catch(function (err) {
            console.log('Error',err);
            res.json({'Error':true,'Message':err});
        });
});

app.post('/RestApi/v1/SelectConditionWithChild_userTypes/',CacheMiddleWare,(req,res,next)=>{
    controllerFactory.userTypes.SelectConditionWithChild_userTypes(req.body)
        .then(function (result) {
            console.log('success');
            res.json({'Error':false, 'Message':result});
        })
        .catch(function (err) {
            console.log('Error',err);
            res.json({'Error':true,'Message':err});
        });
});

app.post('/RestApi/v1/SelectConditionWithChildAndParent_userTypes/',CacheMiddleWare,(req,res,next)=>{
    controllerFactory.userTypes.SelectConditionWithChildAndParent_userTypes(req.body)
        .then(function (result) {
            console.log('success');
            res.json({'Error':false, 'Message':result});
        })
        .catch(function (err) {
            console.log('Error',err);
            res.json({'Error':true,'Message':err});
        });
});

// ********************************************************************
// END - userTypes
// ********************************************************************


// ********************************************************************
// START - userVerificationDocuments
// ********************************************************************


app.post('/RestApi/v1/DirectInsert_userVerificationDocuments/',(req,res,next)=>{
    controllerFactory.userVerificationDocuments.InsertData_userVerificationDocuments(req.body)
        .then(function (result) {
            console.log('success');
            res.json({'Error':false, 'Message':result});
        })
        .catch(function (err) {
            console.log('Error',err);
            res.json({'Error':true,'Message':err});
        });
});

app.post('/RestApi/v1/InsertWithParent_userVerificationDocuments/',(req,res,next)=>{
    controllerFactory.userVerificationDocuments.Insert_userVerificationDocuments(req.body)
        .then(function (result) {
            console.log('success');
            res.json({'Error':false, 'Message':result});
        })
        .catch(function (err) {
            console.log('Error',err);
            res.json({'Error':true,'Message':err});
        });
});

app.post('/RestApi/v1/Upload_userVerificationDocuments/',upload.any(),(req,res,next)=>{
    controllerFactory.userVerificationDocuments.Upload_userVerificationDocuments(req.body,req.files)
        .then(function (result) {
            console.log('success');
            res.json({'Error':false, 'Message':result});
        })
        .catch(function (err) {
            console.log('Error',err);
            res.json({'Error':true,'Message':err});
        });
});

app.put('/RestApi/v1/Update_userVerificationDocuments/',(req,res,next)=>{
    controllerFactory.userVerificationDocuments.Update_userVerificationDocuments(req.body)
        .then(function (result) {
            console.log('success');
            res.json({'Error':false, 'Message':result});
        })
        .catch(function (err) {
            console.log('Error',err);
            res.json({'Error':true,'Message':err});
        });
});

app.post('/RestApi/v1/UpdateFile_userVerificationDocuments/',upload.any(),(req,res,next)=>{
    controllerFactory.userVerificationDocuments.UpdateFile_userVerificationDocuments(req.body,req.files)
        .then(function (result) {
            console.log('success');
            res.json({'Error':false, 'Message':result});
        })
        .catch(function (err) {
            console.log('Error',err);
            res.json({'Error':true,'Message':err});
        });
});

app.put('/RestApi/v1/DeleteFile_userVerificationDocuments/',(req,res,next)=>{
    controllerFactory.userVerificationDocuments.DeleteFile_userVerificationDocuments(req.body)
        .then(function (result) {
            console.log('success');
            res.json({'Error':false, 'Message':result});
        })
        .catch(function (err) {
            console.log('Error',err);
            res.json({'Error':true,'Message':err});
        });
});

app.get('/RestApi/v1/SelectAll_userVerificationDocuments/',CacheMiddleWare,(req,res,next)=>{
    controllerFactory.userVerificationDocuments.SelectAll_userVerificationDocuments()
        .then(function (result) {
            console.log('success');
            res.json({'Error':false, 'Message':result});
        })
        .catch(function (err) {
            console.log('Error',err);
            res.json({'Error':true,'Message':err});
        });
});


app.get('/RestApi/v1/SelectAllWithParent_userVerificationDocuments/',CacheMiddleWare,(req,res,next)=>{
    controllerFactory.userVerificationDocuments.SelectAllWithParent_userVerificationDocuments()
        .then(function (result) {
            console.log('success');
            res.json({'Error':false, 'Message':result});
        })
        .catch(function (err) {
            console.log('Error',err);
            res.json({'Error':true,'Message':err});
        });
});


app.get('/RestApi/v1/SelectAllWithChild_userVerificationDocuments/',CacheMiddleWare,(req,res,next)=>{
    controllerFactory.userVerificationDocuments.SelectAllWithChild_userVerificationDocuments()
        .then(function (result) {
            console.log('success');
            res.json({'Error':false, 'Message':result});
        })
        .catch(function (err) {
            console.log('Error',err);
            res.json({'Error':true,'Message':err});
        });
});


app.get('/RestApi/v1/SelectAllWithChildAndParent_userVerificationDocuments/',CacheMiddleWare,(req,res,next)=>{
    controllerFactory.userVerificationDocuments.SelectAllWithChildAndParent_userVerificationDocuments()
        .then(function (result) {
            console.log('success');
            res.json({'Error':false, 'Message':result});
        })
        .catch(function (err) {
            console.log('Error',err);
            res.json({'Error':true,'Message':err});
        });
});


app.post('/RestApi/v1/SelectCondition_userVerificationDocuments/',CacheMiddleWare,(req,res,next)=>{
    controllerFactory.userVerificationDocuments.SelectCondition_userVerificationDocuments(req.body)
        .then(function (result) {
            console.log('success');
            res.json({'Error':false, 'Message':result});
        })
        .catch(function (err) {
            console.log('Error',err);
            res.json({'Error':true,'Message':err});
        });
});

app.post('/RestApi/v1/SelectConditionWithParent_userVerificationDocuments/',CacheMiddleWare,(req,res,next)=>{
    controllerFactory.userVerificationDocuments.SelectConditionWithParent_userVerificationDocuments(req.body)
        .then(function (result) {
            console.log('success');
            res.json({'Error':false, 'Message':result});
        })
        .catch(function (err) {
            console.log('Error',err);
            res.json({'Error':true,'Message':err});
        });
});

app.post('/RestApi/v1/SelectConditionWithChild_userVerificationDocuments/',CacheMiddleWare,(req,res,next)=>{
    controllerFactory.userVerificationDocuments.SelectConditionWithChild_userVerificationDocuments(req.body)
        .then(function (result) {
            console.log('success');
            res.json({'Error':false, 'Message':result});
        })
        .catch(function (err) {
            console.log('Error',err);
            res.json({'Error':true,'Message':err});
        });
});

app.post('/RestApi/v1/SelectConditionWithChildAndParent_userVerificationDocuments/',CacheMiddleWare,(req,res,next)=>{
    controllerFactory.userVerificationDocuments.SelectConditionWithChildAndParent_userVerificationDocuments(req.body)
        .then(function (result) {
            console.log('success');
            res.json({'Error':false, 'Message':result});
        })
        .catch(function (err) {
            console.log('Error',err);
            res.json({'Error':true,'Message':err});
        });
});

// ********************************************************************
// END - userVerificationDocuments
// ********************************************************************


// ********************************************************************
// START - users
// ********************************************************************


app.post('/RestApi/v1/DirectInsert_users/',(req,res,next)=>{
    controllerFactory.users.InsertData_users(req.body)
        .then(function (result) {
            console.log('success');
            res.json({'Error':false, 'Message':result});
        })
        .catch(function (err) {
            console.log('Error',err);
            res.json({'Error':true,'Message':err});
        });
});

app.post('/RestApi/v1/InsertWithParent_users/',(req,res,next)=>{
    controllerFactory.users.Insert_users(req.body)
        .then(function (result) {
            console.log('success');
            res.json({'Error':false, 'Message':result});
        })
        .catch(function (err) {
            console.log('Error',err);
            res.json({'Error':true,'Message':err});
        });
});

app.post('/RestApi/v1/Upload_users/',upload.any(),(req,res,next)=>{
    controllerFactory.users.Upload_users(req.body,req.files)
        .then(function (result) {
            console.log('success');
            res.json({'Error':false, 'Message':result});
        })
        .catch(function (err) {
            console.log('Error',err);
            res.json({'Error':true,'Message':err});
        });
});

app.put('/RestApi/v1/Update_users/',(req,res,next)=>{
    controllerFactory.users.Update_users(req.body)
        .then(function (result) {
            console.log('success');
            res.json({'Error':false, 'Message':result});
        })
        .catch(function (err) {
            console.log('Error',err);
            res.json({'Error':true,'Message':err});
        });
});

app.post('/RestApi/v1/UpdateFile_users/',upload.any(),(req,res,next)=>{
    controllerFactory.users.UpdateFile_users(req.body,req.files)
        .then(function (result) {
            console.log('success');
            res.json({'Error':false, 'Message':result});
        })
        .catch(function (err) {
            console.log('Error',err);
            res.json({'Error':true,'Message':err});
        });
});

app.put('/RestApi/v1/DeleteFile_users/',(req,res,next)=>{
    controllerFactory.users.DeleteFile_users(req.body)
        .then(function (result) {
            console.log('success');
            res.json({'Error':false, 'Message':result});
        })
        .catch(function (err) {
            console.log('Error',err);
            res.json({'Error':true,'Message':err});
        });
});

app.get('/RestApi/v1/SelectAll_users/',CacheMiddleWare,(req,res,next)=>{
    controllerFactory.users.SelectAll_users()
        .then(function (result) {
            console.log('success');
            res.json({'Error':false, 'Message':result});
        })
        .catch(function (err) {
            console.log('Error',err);
            res.json({'Error':true,'Message':err});
        });
});


app.get('/RestApi/v1/SelectAllWithParent_users/',CacheMiddleWare,(req,res,next)=>{
    controllerFactory.users.SelectAllWithParent_users()
        .then(function (result) {
            console.log('success');
            res.json({'Error':false, 'Message':result});
        })
        .catch(function (err) {
            console.log('Error',err);
            res.json({'Error':true,'Message':err});
        });
});


app.get('/RestApi/v1/SelectAllWithChild_users/',CacheMiddleWare,(req,res,next)=>{
    controllerFactory.users.SelectAllWithChild_users()
        .then(function (result) {
            console.log('success');
            res.json({'Error':false, 'Message':result});
        })
        .catch(function (err) {
            console.log('Error',err);
            res.json({'Error':true,'Message':err});
        });
});


app.get('/RestApi/v1/SelectAllWithChildAndParent_users/',CacheMiddleWare,(req,res,next)=>{
    controllerFactory.users.SelectAllWithChildAndParent_users()
        .then(function (result) {
            console.log('success');
            res.json({'Error':false, 'Message':result});
        })
        .catch(function (err) {
            console.log('Error',err);
            res.json({'Error':true,'Message':err});
        });
});


app.post('/RestApi/v1/SelectCondition_users/',CacheMiddleWare,(req,res,next)=>{
    controllerFactory.users.SelectCondition_users(req.body)
        .then(function (result) {
            console.log('success');
            res.json({'Error':false, 'Message':result});
        })
        .catch(function (err) {
            console.log('Error',err);
            res.json({'Error':true,'Message':err});
        });
});

app.post('/RestApi/v1/SelectConditionWithParent_users/',CacheMiddleWare,(req,res,next)=>{
    controllerFactory.users.SelectConditionWithParent_users(req.body)
        .then(function (result) {
            console.log('success');
            res.json({'Error':false, 'Message':result});
        })
        .catch(function (err) {
            console.log('Error',err);
            res.json({'Error':true,'Message':err});
        });
});

app.post('/RestApi/v1/SelectConditionWithChild_users/',CacheMiddleWare,(req,res,next)=>{
    controllerFactory.users.SelectConditionWithChild_users(req.body)
        .then(function (result) {
            console.log('success');
            res.json({'Error':false, 'Message':result});
        })
        .catch(function (err) {
            console.log('Error',err);
            res.json({'Error':true,'Message':err});
        });
});

app.post('/RestApi/v1/SelectConditionWithChildAndParent_users/',CacheMiddleWare,(req,res,next)=>{
    controllerFactory.users.SelectConditionWithChildAndParent_users(req.body)
        .then(function (result) {
            console.log('success');
            res.json({'Error':false, 'Message':result});
        })
        .catch(function (err) {
            console.log('Error',err);
            res.json({'Error':true,'Message':err});
        });
});

app.get('/RestApi/v1/Get_users_Requirements/',CacheMiddleWare, (req, res, next) => {
    controllerFactory.users.users_PageRequiremnts()
        .then(function (result) {
            console.log('success');
            res.json({'Error': false, 'Message': result});
        })
        .catch(function (err) {
            console.log('Error', err);
            res.json({'Error': true, 'Message': err});
        });
});

// ********************************************************************
// END - users
// ********************************************************************

