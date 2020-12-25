const Joi = require('joi')
const PasswordComplexity = require('joi-password-complexity')
const { requestType } = require('../../constants/enums')
const { validationError } = require('../../constants/statusCodesEnum')




  const validateAssignCourseInstructor = (req, res, next) => {

    const schema = {
      Body: Joi.object({
        courseName: Joi.string().required(),
        instructorEmail: Joi.string().email().required(),
       
      })
    }
    const isValid = Joi.validate(req.body, schema)
    if (isValid.error) {
      let errorMsg = isValid.error.details[0].message
      return res.json({
        statusCode: validationError,
        error: isValid.error.details[0].message,
      })
    }
    return next()
  }

  const validateViewDaysOff = (req, res, next) => {
    const schema = {
      Department: Joi.object({ departmentName: Joi.string().required() }).required(),
    }
    const isValid = Joi.validate(req.body, schema)
    if (isValid.error) {
      return res.json({
        statusCode: validationError,
        error: isValid.error.details[0].message,
      })
    }
    return next()
  }

  const validateViewRequests = (req, res, next) => {
    const schema = {
      Department: Joi.object({ departmentName: Joi.string().required() }).required(),
    }
    const isValid = Joi.validate(req.body, schema)
    if (isValid.error) {
      return res.json({
        statusCode: validationError,
        error: isValid.error.details[0].message,
      })
    }
    return next()
  }

  const validateViewCourseCoverage = (req, res, next) => {
    const schema = {
      Department: Joi.object({ departmentName: Joi.string().required() }).required(),
    }
    const isValid = Joi.validate(req.body, schema)
    if (isValid.error) {
      return res.json({
        statusCode: validationError,
        error: isValid.error.details[0].message,
      })
    }
    return next()
  }

  const validateHodViewDepartmentStaff = (req, res, next) => {
  
    const schema = {
      Body: Joi.object({
       departmentName: Joi.string().required(),
      })
    }

    const isValid = Joi.validate(req.body, schema)
    if (isValid.error) {
      let errorMsg = isValid.error.details[0].message
      return res.json({
        statusCode: validationError,
        error: isValid.error.details[0].message,
      })
    }
    return next()
  }

  const validateHodViewDepartmentStaffPerCourse = (req, res, next) => {
  
    const schema = {
      Body: Joi.object({
      departmentName: Joi.string().required(),
      })
    }

    const isValid = Joi.validate(req.body, schema)
    if (isValid.error) {
      let errorMsg = isValid.error.details[0].message
      return res.json({
        statusCode: validationError,
        error: isValid.error.details[0].message,
      })
    }
    return next()
  }
  const validateViewTeachingAssignments = (req, res, next) => {
  
    const schema = {
      Body: Joi.object({
      departmentName: Joi.string().required(),
      })
    }

    const isValid = Joi.validate(req.body, schema)
    if (isValid.error) {
      let errorMsg = isValid.error.details[0].message
      return res.json({
        statusCode: validationError,
        error: isValid.error.details[0].message,
      })
    }
    return next()
  }

  const validateViewSchedule = (req, res, next) => {
    const schema = {
      Account: Joi.object({ memberId: Joi.string().required() }).required(),
    }
    const isValid = Joi.validate(req.body, schema)
    if (isValid.error) {
      return res.json({
        statusCode: validationError,
        error: isValid.error.details[0].message,
      })
    }
    return next()
  }

  
  const validateViewReplacementRequests = (req, res, next) => {
    const schema = {
      Account: Joi.object({ memberID:Joi.string().required(), }).required(),
    }
    const isValid = Joi.validate(req.body, schema)
    if (isValid.error) {
      return res.json({
        statusCode: validationError,
        error: isValid.error.details[0].message,
      })
    }
    return next()
  }

  const validateSendReplacementRequests = (req, res, next) => {
    const schema = {
      Body: Joi.object({
        senderID:Joi.string().required(),
         recieverID:Joi.string().required(),
         activeDate:Joi.date().required(),
         slotID:Joi.string().required(),
         status:Joi.string().required(),
         brief:Joi.string(),
         comments:Joi.string(),
         requestID:Joi.string().required(),
          })
         .required(),
    }
    const isValid = Joi.validate(req.body, schema)
    if (isValid.error) {
      return res.json({
        statusCode: validationError,
        error: isValid.error.details[0].message,
      })
    }
    return next()
  }
  const validateHodRejectRequest = (req, res, next) => {
  
    const schema = {
      Body: Joi.object({
      departmentName: Joi.string().required(),
      requestID:  Joi.string().required(),
      comments:  Joi.string(),

      })
    }

    const isValid = Joi.validate(req.body, schema)
    if (isValid.error) {
      let errorMsg = isValid.error.details[0].message
      return res.json({
        statusCode: validationError,
        error: isValid.error.details[0].message,
      })
    }
    return next()
  }
  const validateHodAcceptRequest = (req, res, next) => {
  
    const schema = {
      Body: Joi.object({
      departmentName: Joi.string().required(),
      requestID:  Joi.string().required(),
      comments:  Joi.string(),

      })
    }

    const isValid = Joi.validate(req.body, schema)
    if (isValid.error) {
      let errorMsg = isValid.error.details[0].message
      return res.json({
        statusCode: validationError,
        error: isValid.error.details[0].message,
      })
    }
    return next()
  }

  const validateCoordinatorAddCourseSlots = (req, res, next) => {
  
    const schema = {
      Body: Joi.object({
        courseID: Joi.string().required(),
        slotID: Joi.string().required(),
        slotNumber: Joi.string().required(),
        slotDay: Joi.string().required(),
        slotType: Joi.string().required(),
        acID:Joi.string().required(),
        location:Joi.string().required()

       
      })
    }
    const isValid = Joi.validate(req.body, schema)
    if (isValid.error) {
      let errorMsg = isValid.error.details[0].message
      return res.json({
        statusCode: validationError,
        error: isValid.error.details[0].message,
      })
    }
    return next()
  }
  
  const validateCoordinatorUpdateCourseSlots = (req, res, next) => {
  
    const schema = {
      Body: Joi.object({
        courseID: Joi.string().required(),
        slotID: Joi.string(). required(),
        slotNumber: Joi.string(),
        slotDay: Joi.string(),
        slotType: Joi.string(),
        acID:Joi.string(),
        location:Joi.string()

       
      })
    }
    const isValid = Joi.validate(req.body, schema)
    if (isValid.error) {
      let errorMsg = isValid.error.details[0].message
      return res.json({
        statusCode: validationError,
        error: isValid.error.details[0].message,
      })
    }
    return next()
  }
  
  const validateCoordinatorDeleteCourseSlots = (req, res, next) => {
  
    const schema = {
      Body: Joi.object({
        courseID: Joi.string().required(),
        slotID: Joi.string(). required(),
      })
    }
    const isValid = Joi.validate(req.body, schema)
    if (isValid.error) {
      let errorMsg = isValid.error.details[0].message
      return res.json({
        statusCode: validationError,
        error: isValid.error.details[0].message,
      })
    }
    return next()
  }

  const validateCoordinatorViewSlotLinking = (req, res, next) => {
  
    const schema = {
      Body: Joi.object({
        memberId: Joi.string().required(),
        
      })
    }
    const isValid = Joi.validate(req.body, schema)
    if (isValid.error) {
      let errorMsg = isValid.error.details[0].message
      return res.json({
        statusCode: validationError,
        error: isValid.error.details[0].message,
      })
    }
    return next()
  }


  const validateSendSlotLinkingRequest = (req, res, next) => {
    const schema = {
      Body: Joi.object({
         slotID:Joi.string().required(),
         brief:Joi.string(),
         comments:Joi.string(),
         requestID:Joi.string().required(),
          })
         .required(),
    }
    const isValid = Joi.validate(req.body, schema)
    if (isValid.error) {
      return res.json({
        statusCode: validationError,
        error: isValid.error.details[0].message,
      })
    }
    return next()
  }


  const validateAssignCourseCoordinator = (req, res, next) => {
    const schema = {
      Body: Joi.object({
        memberId: Joi.string().required(),
        courseId: Joi.string().required()
          })
         .required(),
    }
    const isValid = Joi.validate(req.body, schema)
    if (isValid.error) {
      return res.json({
        statusCode: validationError,
        error: isValid.error.details[0].message,
      })
    }
    return next()
  }

  const validateAssignAcMemberToUnassignedSlot = (req, res, next) => {
    const schema = {
      Body: Joi.object({
        memberId: Joi.string().required(),
        courseId: Joi.string().required(),
        slotID: Joi.string().required()
          })
         .required(),
    }
    const isValid = Joi.validate(req.body, schema)
    if (isValid.error) {
      return res.json({
        statusCode: validationError,
        error: isValid.error.details[0].message,
      })
    }
    return next()
  }

  const validateChangeDayOff = (req, res, next) => {
    const schema = {
      Body: Joi.object({
        requestDate: Joi.date(),
        brief: Joi.string(),
        requestID: Joi.string().required()
          })
         .required(),
    }
    const isValid = Joi.validate(req.body, schema)
    if (isValid.error) {
      return res.json({
        statusCode: validationError,
        error: isValid.error.details[0].message,
      })
    }
    return next()
  }

  const validateCancelStillPendingRequest = (req, res, next) => {
    const schema = {
      Body: Joi.object({
        
        requestId: Joi.string().required()
          })
         .required(),
    }
    const isValid = Joi.validate(req.body, schema)
    if (isValid.error) {
      return res.json({
        statusCode: validationError,
        error: isValid.error.details[0].message,
      })
    }
    return next()
  }

  const validateViewStatusOfAllSubmittedRequests = (req, res, next) => {
    const schema = {
      Body: Joi.object({
        
        
        criteria: Joi.string().required()
          })
         .required(),
    }
    const isValid = Joi.validate(req.body, schema)
    if (isValid.error) {
      return res.json({
        statusCode: validationError,
        error: isValid.error.details[0].message,
      })
    }
    return next()
  }



  const validateDeleteAssignmentOfAcMember = (req, res, next) => {
  
    const schema = {
      Body: Joi.object({
        courseID: Joi.string().required(),
        acMemberID: Joi.string().required(),
        
      })
    }
    const isValid = Joi.validate(req.body, schema)
    if (isValid.error) {
      let errorMsg = isValid.error.details[0].message
      return res.json({
        statusCode: validationError,
        error: isValid.error.details[0].message,
      })
    }
    return next()

  }

  const validateSubmitAnyTypeOfLeaves = (req, res, next) => {
  
    const schema = {
      Body: Joi.object({
        requestType: Joi.string().valid(["Accidental Leave",
       "Annual Leave",
        "Compensation Leave",
         "Maternity Leave",
       "Sick Leave",
        "Replacement",
       "ChangeDayOff",
        "SlotLinking",]).required(),
        activeDate: Joi.string().required(),
        
        brief: Joi.string(),
        comments: Joi.string(),


        
      })
    }
    const isValid = Joi.validate(req.body, schema)
    if (isValid.error) {
      let errorMsg = isValid.error.details[0].message
      return res.json({
        statusCode: validationError,
        error: isValid.error.details[0].message,
      })
    }
    return next()

  }

  const validateInstructorDeleteCourseAssignment = (req, res, next) => {
  
    const schema = {
      Body: Joi.object({
        taID: Joi.string().required(),
        courseID: Joi.string().required(),
        
      })
    }
    const isValid = Joi.validate(req.body, schema)
    if (isValid.error) {
      let errorMsg = isValid.error.details[0].message
      return res.json({
        statusCode: validationError,
        error: isValid.error.details[0].message,
      })
    }
    return next()

  }

  

  const validateInstructorUpdateCourseAssignment = (req, res, next) => {
  
    const schema = {
      Body: Joi.object({
        taID1: Joi.string().required(),
        taID2: Joi.string().required(),
        courseID: Joi.string().required(),
        
      })
    }
    const isValid = Joi.validate(req.body, schema)
    if (isValid.error) {
      let errorMsg = isValid.error.details[0].message
      return res.json({
        statusCode: validationError,
        error: isValid.error.details[0].message,
      })
    }
    return next()
  }

  const validateCoordinatorRejectSlotLinkingRequest = (req, res, next) => {
  
    const schema = {
      Body: Joi.object({
        requestID: Joi.string().required(),
      })
    }
    const isValid = Joi.validate(req.body, schema)
    if (isValid.error) {
      let errorMsg = isValid.error.details[0].message
      return res.json({
        statusCode: validationError,
        error: isValid.error.details[0].message,
      })
    }
    return next()
  }
  const validateCoordinatorAcceptSlotLinkingRequest = (req, res, next) => {
  
    const schema = {
      Body: Joi.object({
        requestID: Joi.string().required(),
      })
    }
    const isValid = Joi.validate(req.body, schema)
    if (isValid.error) {
      let errorMsg = isValid.error.details[0].message
      return res.json({
        statusCode: validationError,
        error: isValid.error.details[0].message,
      })
    }
    return next()
  }

  const validateUpdateCourseInstructor = (req, res, next) => {

    const schema = {
      Body: Joi.object({
        courseID: Joi.string().required(),
        memberId1: Joi.string().required(),
        memberId2: Joi.string().required(),
       
      })
    }
    const isValid = Joi.validate(req.body, schema)
    if (isValid.error) {
      let errorMsg = isValid.error.details[0].message
      return res.json({
        statusCode: validationError,
        error: isValid.error.details[0].message,
      })
    }
    return next()
  }

  const validateDeleteCourseInstructor = (req, res, next) => {
  
    const schema = {
      Body: Joi.object({
        courseID: Joi.string().required(),
        memberId: Joi.string().required(),
      })
    }

    const isValid = Joi.validate(req.body, schema)
    if (isValid.error) {
      let errorMsg = isValid.error.details[0].message
      return res.json({
        statusCode: validationError,
        error: isValid.error.details[0].message,
      })
    }
    return next()
  }
  

  module.exports={
    validateDeleteCourseInstructor,
    validateAssignCourseInstructor,
    validateViewDaysOff,
    validateViewRequests,
    validateViewCourseCoverage,
    validateHodViewDepartmentStaff,
    validateHodViewDepartmentStaffPerCourse,
    validateViewTeachingAssignments,
    validateViewSchedule,
    validateViewReplacementRequests,
    validateSendReplacementRequests,
    validateHodRejectRequest,
    validateHodAcceptRequest,
    validateCoordinatorAddCourseSlots,
    validateCoordinatorUpdateCourseSlots,
    validateCoordinatorDeleteCourseSlots,
    validateCoordinatorViewSlotLinking,
    validateSendSlotLinkingRequest,
    validateAssignCourseCoordinator,
    validateAssignAcMemberToUnassignedSlot,
    validateChangeDayOff,
    validateCancelStillPendingRequest,
    validateViewStatusOfAllSubmittedRequests,
    validateCoordinatorViewSlotLinking,
    validateDeleteAssignmentOfAcMember,
    validateSubmitAnyTypeOfLeaves,
    validateInstructorDeleteCourseAssignment,
    validateInstructorUpdateCourseAssignment,
    validateUpdateCourseInstructor,
    validateCoordinatorRejectSlotLinkingRequest,
    validateCoordinatorAcceptSlotLinkingRequest,


  }