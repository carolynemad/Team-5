//success codes
const successCode = 0

//error code

const unknown = 900
const validationError = 901

//verificatoin
const accountNotSent = {
  statusCode: 998,
  message: 'Breach! Account not sent',
}

const breach = {
  statusCode: 999,
  message: 'Breach! Account and data dont match',
}



//signin codes

const signinSuccessfully = {
  statusCode: successCode,
  message: 'Sign in process was successful',
}
const wrongCredentials = {
  statusCode: 904,
  message: 'Wrong email or password',
}
const accountDoesntExist = {
  statusCode: 905,
  message: 'Account doesnt exist',
}

//editAccountInfo codes

const accountNotFound = {
  statusCode: 906,
  message: 'Account not found',
}

const facultyNotFound = {
  statusCode: 1000,
  message: 'Faculty not found',
}

const facultyAlreadyExists = {
  statusCode: 1001,
  message: 'Faculty Already Exists'
}


const facultyAdded = {
  statusCode: 1002,
  message: 'Faculty Added'
}

const departmentNotFound = {
  statusCode: 1003,
  message: 'Department Not Found'
}

const departmentAdded = {
  statusCode: 1004,
  message: 'Department Added'
}

const departmentAlreadyExists = {
  statusCode: 1005,
  message: 'Department Already Exists'
}

const memberNotFound = {
  statusCode: 1009,
  message: 'Member Not Found'
}

//editEmail
const emailDoesntExist = {
  statusCode: 0,
  message: 'Email Address Doesnt exist!',
}
const emailEditedSuccessfully = {
  statusCode: successCode,
  message: 'Email has been edited successfully',
}

const emailAlreadyExists = {
  statusCode: 1007,
  message: 'Email Already Exists',
}
//changePassword
const passwordChangedSuccessfully = {
  statusCode: successCode,
  message: 'Password has been changed successfully',
}

const oldPasswordIsWrong = {
  statusCode: 907,
  message: 'Old password does not match the account password',
}

const newPasswordNotLikeOld = {
  statusCode: 908,
  message: 'New password cannot be like the old password',
}
// head of department 
const courseNotFound = {
  statusCode: 909 ,
  message : 'Course not found'
}
const instructorAlreadyExists = {
  statusCode: 910 ,
  message : 'Instructor already exists'
}
const courseAlreadyExists = {
  statusCode: 9110 ,
  message : 'Course Already Exists'
}
const NoAccess = {
  statusCode: 911 ,
  message : 'No Access to this information'
}
const noRequest = {
  statusCode: 912 ,
  message : 'No requests to view'
}

const memberAdded = {
  statusCode: 1100 ,
  message : 'A New Member Has Been Added'
}

const onlyHr = {
  statusCode: 1110 ,
  message : 'Only Hr Member Can Edit These Fields'
}


const cantChangeName = {
  statusCode: 1111 ,
  message : 'You Can Not Edit Your Name Or Id'
}

const locationAlreadyExists = {
  statusCode: 2000 ,
  message : 'This Location Already Exists'
}

const locationNotFound = {
  statusCode: 2001 ,
  message : 'This Location Not Found'
}

const instructorAlreadyAssigned = {
  statusCode: 2011 ,
  message : 'This Instructor Is Already Assigned To This Course'
}

const requestNotFound = {
  statusCode : 1010,
  message: 'This Request Does Not Exist'
}

const requestAlreadyExists = {
  statusCode : 9997,
  message: 'This Request Already Exists'
}

const courseDoesNotExist = {
  statusCode: 1111,
  message: 'Course Does Not Exist'
}
const slotAlreadyExists = {
  statusCode: 9999,
  message: 'Slot Already Exists'
}

const slotDoesnotExist = {
  statusCode: 9998,
  message: 'Slot Does not Exist'
}
const coordinatorDoesNotExist={
  statusCode:9997,
  message: "coordinator Does Not Exist"
}

const slotAlreadyAssignedOrNotAssignedToYourCourse = {
  statusCode: 1110,
  message: "Slot Already Assigned"
}

const requestAlreadyAnswered = {
  statusCode: 200 ,
  message : 'This Request Has Been Already Answered'
}
const userNotLoggedIn = {
  statusCode: 250 ,
  message : 'You Are Not Logged In'
}


module.exports = {
  noRequest,
  NoAccess,
  instructorAlreadyExists,
  courseNotFound,
  emailDoesntExist,
  emailEditedSuccessfully,
  passwordChangedSuccessfully,
  oldPasswordIsWrong,
  newPasswordNotLikeOld,
  breach,
  accountNotFound,
  successCode,
  validationError,
  unknown,
  signinSuccessfully,
  wrongCredentials,
  accountDoesntExist,
  accountNotSent,
  facultyNotFound,
  facultyAlreadyExists,
  facultyAdded,
  departmentAdded,
  departmentNotFound,
  departmentAlreadyExists,
  emailAlreadyExists,
  memberNotFound,
  memberAdded,
  onlyHr,
  cantChangeName,
  locationAlreadyExists,
  locationNotFound,
  instructorAlreadyAssigned,
  requestNotFound,
  requestAlreadyExists,
 slotDoesnotExist,
courseDoesNotExist,
slotAlreadyExists,
coordinatorDoesNotExist,
slotAlreadyAssignedOrNotAssignedToYourCourse,
courseAlreadyExists,
requestAlreadyAnswered,
userNotLoggedIn
  
}
