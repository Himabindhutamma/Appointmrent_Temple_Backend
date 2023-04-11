
let controllerFactory =function (){
    let controllers = this;

    let controllersList =[
		{name: 'appointmentDocuments', source: './appointmentDocumentsController'}, 
		{name: 'appointments', source: './appointmentsController'}, 
		{name: 'departmentSubCategories', source: './departmentSubCategoriesController'}, 
		{name: 'departments', source: './departmentsController'}, 
		{name: 'organization', source: './organizationController'}, 
		{name: 'organizationUsers', source: './organizationUsersController'},
		{name:'organizationType', source:'./organizationTypeController'},
		{name: 'staticPages', source: './staticPagesController'}, 
		{name: 'userInformation', source: './userInformationController'}, 
		{name: 'userRole', source: './userRoleController'}, 
		{name: 'userSlots', source: './userSlotsController'}, 
		{name: 'userTypes', source: './userTypesController'}, 
		{name: 'userVerificationDocuments', source: './userVerificationDocumentsController'}, 
		{name: 'users', source: './usersController'}, 
		{name: 'custom', source: './customController'}, 
		{name: 'login', source: './loginController'}];

 controllersList.forEach((controller) => {
        controllers[controller.name] = require(controller.source)
    })
};
module.exports = new controllerFactory;