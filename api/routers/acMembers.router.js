const express = require('express')
const { verifyToken } = require('../authentication/verifyToken')
const router = express.Router()

//controllers
const {deleteCourseInstructor,assignCourseInstructor,viewDaysOff,viewRequests,
     viewCourseCoverage, hodViewDepartmentStaff,hodViewDepartmentStaffPerCourse, 
     viewTeachingAssignments,viewSchedule, viewReplacementRequests,sendReplacementRequests,
     hodRejectRequest , coordinatorAddCourseSlots , coordinatorUpdateCourseSlots , 
     coordinatorDeleteCourseSlots , coordinatorViewSlotLinking, sendSlotLinkingRequest, viewSlotAssignments , assignCourseCoordinator ,
     assignAcMemberToUnassignedSlot,
     changeDayOff,
     showNotifications,
     cancelStillPendingRequests,viewStatusOfAllSubmittedRequests,coordinatorViewCourseCoverage,instructorViewDepartmentStaff,
     instructorViewDepartmentStaffPerCourse,deleteAssignmentOFAcMember,submitAnyTypeOfLeaves , instructorDeleteCourseAssignment,
     instructorUpdateCourseAssignment,coordinatorAcceptSlotLinkingRequest,coordinatorRejectSlotLinkingRequest, hodAcceptRequest

    }= require('../controllers/acMembers.controller')

//validation 
const {validateDeleteCourseInstructor , validateAssignCourseInstructor, validateViewDaysOff,
     validateViewRequests, validateViewCourseCoverage, validateHodViewDepartmentStaff,
     validateHodViewDepartmentStaffPerCourse,validateViewTeachingAssignments, validateViewSchedule ,
     validateViewReplacementRequests,validateSendReplacementRequests , validateHodRejectRequest ,
     validateCoordinatorAddCourseSlots , validateCoordinatorUpdateCourseSlots , validateCoordinatorDeleteCourseSlots ,
     validateCoordinatorViewSlotLinking, validateSendSlotLinkingRequest , validateAssignCourseCoordinator ,
     validateAssignAcMemberToUnassignedSlot,
     validateChangeDayOff,
     validateCancelStillPendingRequest , validateViewStatusOfAllSubmittedRequests,validateDeleteAssignmentOfAcMember,
     validateSubmitAnyTypeOfLeaves , validateInstructorDeleteCourseAssignment , validateInstructorUpdateCourseAssignment,
     validateCoordinatorRejectSlotLinkingRequest , validateCoordinatorAcceptSlotLinkingRequest, validateHodAcceptRequest

}= require('../middleware/validations/acMembers.validation')

//Routings

router.post('/deleteCourseInstructor', validateDeleteCourseInstructor ,  deleteCourseInstructor)
router.post('/assignCourseInstructor', validateAssignCourseInstructor ,  assignCourseInstructor)
router.post('/viewDaysOff', validateViewDaysOff ,  viewDaysOff)
router.post('/viewRequests', validateViewRequests ,  viewRequests)
router.post('/viewCourseCoverage', validateViewCourseCoverage , viewCourseCoverage)
router.post('/hodViewDepartmentStaff', validateHodViewDepartmentStaff ,  hodViewDepartmentStaff)
router.post('/hodViewDepartmentStaffPerCourse', validateHodViewDepartmentStaffPerCourse ,  hodViewDepartmentStaffPerCourse)
router.post('/viewTeachingAssignments', validateViewTeachingAssignments ,  viewTeachingAssignments)
router.post('/viewSchedule', validateViewSchedule ,  viewSchedule)
router.post('/sendReplacementRequests', validateSendReplacementRequests ,  sendReplacementRequests)
router.post('/viewReplacementRequests', validateViewReplacementRequests ,  viewReplacementRequests)
router.post('/hodRejectRequest', validateHodRejectRequest ,  hodRejectRequest)
router.post('hodAcceptRequest', validateHodAcceptRequest, hodAcceptRequest)
router.post('/coordinatorAddCourseSlots', validateCoordinatorAddCourseSlots ,  coordinatorAddCourseSlots)
router.post('/coordinatorUpdateCourseSlots', validateCoordinatorUpdateCourseSlots ,  coordinatorUpdateCourseSlots)
router.post('/coordinatorDeleteCourseSlots', validateCoordinatorDeleteCourseSlots ,  coordinatorDeleteCourseSlots)
router.post('/coordinatorViewSlotLinking', validateCoordinatorViewSlotLinking ,  coordinatorViewSlotLinking)
router.post('/sendSlotLinkingRequest', validateSendSlotLinkingRequest ,  sendSlotLinkingRequest)
router.post('/viewSlotAssignments' ,  viewSlotAssignments)
router.post('/assignCourseCoordinator', validateAssignCourseCoordinator ,  assignCourseCoordinator)
router.post('/assignAcMemberToUnassignedSlot', validateAssignAcMemberToUnassignedSlot ,  assignAcMemberToUnassignedSlot)
router.post('/changeDayOff',  validateChangeDayOff , changeDayOff)
router.post('/showNotifications' , showNotifications)
router.post('/cancelStillPendingRequest',  validateCancelStillPendingRequest , cancelStillPendingRequests)
router.post('/viewStatusOfAllSubmittedRequests',  validateViewStatusOfAllSubmittedRequests , viewStatusOfAllSubmittedRequests)
router.post('/coordinatorViewCourseCoverage' ,  coordinatorViewCourseCoverage)
router.post('/instructorViewDepartmentStaff' ,  instructorViewDepartmentStaff)
router.post('/instructorViewDepartmentStaffPerCourse' ,  instructorViewDepartmentStaffPerCourse)
router.post('/deleteAssignmentOfAcMember' , validateDeleteAssignmentOfAcMember, deleteAssignmentOFAcMember)
router.post('/submitAnyTypeOfLeaves' , validateSubmitAnyTypeOfLeaves, submitAnyTypeOfLeaves)

router.post('/instructorDeleteCourseAssignment' , validateInstructorDeleteCourseAssignment, instructorDeleteCourseAssignment)
router.post('/instructorUpdateCourseAssignment' , validateInstructorUpdateCourseAssignment, instructorUpdateCourseAssignment)

router.post('/coordinatorAcceptSlotLinkingRequest', coordinatorAcceptSlotLinkingRequest)
router.post('/coordinatorRejectSlotLinkingRequest', coordinatorRejectSlotLinkingRequest)
router.post('/instructorDeleteCourseAssignment' , validateInstructorDeleteCourseAssignment, instructorDeleteCourseAssignment)
router.post('/instructorUpdateCourseAssignment' , validateInstructorUpdateCourseAssignment, instructorUpdateCourseAssignment)

router.post('/coordinatorRejectSlotLinkingRequest' , validateCoordinatorRejectSlotLinkingRequest, coordinatorRejectSlotLinkingRequest)
router.post('/coordinatorAcceptSlotLinkingRequest' , validateCoordinatorAcceptSlotLinkingRequest, coordinatorAcceptSlotLinkingRequest)

module.exports=router