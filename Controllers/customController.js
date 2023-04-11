const appointmentDocumentsController = require("./appointmentDocumentsController");
const appointmentsController = require("./appointmentsController");
const departmentSubCategoriesController = require("./departmentSubCategoriesController");
const departmentsController = require("./departmentsController");
const organizationController = require("./organizationController");
const organizationUsersController = require("./organizationUsersController");
const staticPagesController = require("./staticPagesController");
const userInformationController = require("./userInformationController");
const userRoleController = require("./userRoleController");
const userSlotsController = require("./userSlotsController");
const userTypesController = require("./userTypesController");
const userVerificationDocumentsController = require("./userVerificationDocumentsController");
const usersController = require("./usersController");

const fields = require('../Table/Fields');

const qeries = require('../Table/Queries');

const loadfiles = require('../Utilities/LoadFiles');

const validation = require('../Utilities/Validation');

const excelExtract = require('../Utilities/ExcelExtractor');

const fs = require('fs');

const repo = require('../Repo');

const cache = require("../Utilities/Cache");

const csvTojson = require("../Utilities/CSVtoJSON");

const _ = require('underscore');


            
let customController = function () {

    return{}
	;
};
module.exports = customController();
