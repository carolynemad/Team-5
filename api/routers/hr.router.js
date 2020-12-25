const express = require('express')
const { verifyToken } = require('../authentication/verifyToken')
const router = express.Router()

//Controllers
const {updateFaculty , addFaculty , deleteFaculty , 
    updateDepartment , addDepartment , deleteDepartment, addNewMember,
updateExistingMember , removeExistingMember, addLocation, removeLocation, 
updateLocation, viewAttendanceRecord, addCourse, deleteCourse , updateCourse} 
= require('../controllers/hr.controller')

//Validations
const {validateUpdateFaculty , validateAddFaculty , 
    validateAddDepartment , validateUpdateDepartment , validateAddNewMember,
    validateUpdateExistingMember,
    validateRemoveExistingMember,
    validateAddLocation,validateRemoveLocation,validateUpdateLocation, validateDeleteFaculty, validateDeleteDepartment, validateViewAttendanceLog, validateAddCourse, validateDeleteCourse, validateUpdateCourse
}  = require('../middleware/validations/hr.validation')


//Routings
router.post('/updateFaculty' , validateUpdateFaculty , updateFaculty)
router.post('/addFaculty' , validateAddFaculty , addFaculty)
router.post('/deleteFaculty' , validateDeleteFaculty , deleteFaculty)

router.post('/updateDepartment' , validateUpdateDepartment , updateDepartment)
router.post('/addDepartment' , validateAddDepartment , addDepartment)
router.post('/deleteDepartment' , validateDeleteDepartment , deleteDepartment)

router.post('/addNewMember' , validateAddNewMember , addNewMember)

router.post('/updateExistingMember' , validateUpdateExistingMember , updateExistingMember)
router.post('/removeExistingMember' , validateRemoveExistingMember , removeExistingMember)


router.post('/addLocation' , validateAddLocation , addLocation)
router.post('/removeLocation' , validateRemoveLocation , removeLocation)
router.post('/updateLocation' , validateUpdateLocation , updateLocation)

router.post('/viewAttendanceLog' , validateViewAttendanceLog , viewAttendanceRecord)


router.post('/addCourse' , validateAddCourse , addCourse)
router.post('/deleteCourse' , validateDeleteCourse , deleteCourse)
router.post('/updateCourse' , validateUpdateCourse , updateCourse)




module.exports = router
