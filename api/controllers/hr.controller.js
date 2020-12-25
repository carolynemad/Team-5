//Requires
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
var authenticate = require('../authentication/verifyToken')




//Models Requires
const facultyModel = require('../../models/faculty_model')
const departmentModel = require('../../models/department_model')
const staffModel = require('../../models/staff_model')
const acMemberModel = require('../../models/acMember_model')
const locationModel = require('../../models/location_model')
const courseModel = require('../../models/course_model')
const slotModel = require('../../models/slot_model')
const attendanceLogModel = require('../../models/attendanceLog_model')

const {staffMemberType , memberType} = require('../constants/enums')

const {
  salt, secretOrKey,
} = require('../../config/keys')

//statusCode imports
const {
    successCode,
    accountDoesntExist,
    signinSuccessfully,
    wrongCredentials,
    accountNotFound,
    breach,
    emailEditedSuccessfully,
    passwordChangedSuccessfully,
    oldPasswordIsWrong,
    newPasswordNotLikeOld,
    emailDoesntExist,
    unknown,
    facultyNotFound,
    facultyAlreadyExists,
    facultyAdded,
    departmentAdded,
    departmentNotFound,
    departmentAlreadyExists,
    emailAlreadyExists,
    memberNotFound,
    memberAdded,
    locationAlreadyExists,
    locationNotFound,
    courseAlreadyExists,
    courseNotFound
    } = require('../constants/statusCodesEnum')
const course_model = require('../../models/course_model')
const slot_model = require('../../models/slot_model')
const attendanceLog_model = require('../../models/attendanceLog_model')

var hrCounter = 1
var acCounter = 1


//Add Location
    const addLocation = async (req, res) => {
      try {
        const { Location } = req.body
    
        const locationFound = await locationModel.findOne({locationName: Location.locationName})
    
        if (locationFound) {
          return res.json({
            statusCode: locationAlreadyExists.statusCode,
            error: locationAlreadyExists.message,
          })
        }
      
        
        
    
        const locationCreated = await locationModel.create(Location)
    
        console.log(locationCreated)
    
    
        return res.json({
          statusCode: successCode,
          message: 'New Location Created',
        })
      } catch (e) {
        console.log(e)
        res.json({
          statusCode: unknown,
          error: 'Could not add new location',
        })
      }
    }


//Remove Location

const removeLocation = async (req, res) => {
  try {
    const { Location } = req.body

    const locationFound = await locationModel.findOne({locationName: Location.locationName})

    if (!locationFound) {
      return res.json({
        statusCode: locationNotFound.statusCode,
        error: locationNotFound.message,
      })
    }
  
    
    

    await locationModel.findOneAndDelete({locationName: Location.locationName},)

    


    return res.json({
      statusCode: successCode,
      message: 'Location Removed',
    })
  } catch (e) {
    console.log(e)
    res.json({
      statusCode: unknown,
      error: 'Could not remove new location',
    })
  }
}

//Update Location

const updateLocation = async (req, res) => {
  try {
    const { Location } = req.body

    const locationFound = await locationModel.findOne({locationName: Location.locationName})

    if (!locationFound) {
      return res.json({
        statusCode: locationNotFound.statusCode,
        error: locationNotFound.message,
      })
    }
  
    
    

    await locationModel.findOneAndUpdate({locationName: Location.locationName},{
      locationType: Location.locationType , capacity: Location.capacity})

    


    return res.json({
      statusCode: successCode,
      message: 'Location Updated',
    })
  } catch (e) {
    console.log(e)
    res.json({
      statusCode: unknown,
      error: 'Could not update new location',
    })
  }
}
//Remove Faculty

const deleteFaculty = async (req, res) => {
  try {
    const { Faculty } = req.body

    const facultyFound = await facultyModel.findOne({facultyName: Faculty.facultyName})

    if (!facultyFound) {
      return res.json({
        statusCode: facultyNotFound.statusCode,
        error: facultyNotFound.message,
      })
    }
  
    
    

    await facultyModel.findOneAndDelete({facultyName: Faculty.facultyName},)

    


    return res.json({
      statusCode: successCode,
      message: 'Faculty Removed',
    })
  } catch (e) {
    console.log(e)
    res.json({
      statusCode: unknown,
      error: 'Could not remove faculty',
    })
  }
}

//Update Location

const updateFaculty = async (req, res) => {
  try {
    const { Faculty } = req.body

    const facultyFound = await facultyModel.findOne({facultyName: Faculty.facultyName})

    if (!facultyFound) {
      return res.json({
        statusCode: facultyNotFound.statusCode,
        error: facultyNotFound.message,
      })
    }
  
    
    

    await facultyModel.findOneAndUpdate({facultyName: Faculty.facultyName},{
      departments: Faculty.departments , facultyHead: Faculty.facultyHead})

    


    return res.json({
      statusCode: successCode,
      message: 'Faculty Updated',
    })
  } catch (e) {
    console.log(e)
    res.json({
      statusCode: unknown,
      error: 'Could not update faculty',
    })
  }
}
//Add Faculty

const addFaculty = async (req, res) => {
  try {
    const Faculty  = req.body.Faculty

    const facultyFound = await facultyModel.findOne({facultyName: Faculty.facultyName})

    if (facultyFound) {
      return res.json({
        statusCode: facultyAlreadyExists.statusCode,
        error: facultyAlreadyExists.message,
      })
    }
  
    
    

    const facultyCreated = await facultyModel.create(Faculty)

    console.log(facultyCreated)


    return res.json({
      statusCode: successCode,
      message: 'New Faculty Created',
    })
  } catch (e) {
    console.log(e)
    res.json({
      statusCode: unknown,
      error: 'Could not add new faculty',
    })
  }
}




//Remove Department

const deleteDepartment = async (req, res) => {
  try {
    const { Department } = req.body

    const deptFound = await departmentModel.findOne({departmentName: Department.departmentName})

    if (!deptFound) {
      return res.json({
        statusCode: departmentNotFound.statusCode,
        error: departmentNotFound.message,
      })
    }
  
    
    

    await departmentModel.findOneAndDelete({departmentName: Department.departmentName},)

    


    return res.json({
      statusCode: successCode,
      message: 'Department Removed',
    })
  } catch (e) {
    console.log(e)
    res.json({
      statusCode: unknown,
      error: 'Could not remove department',
    })
  }
}

//Update Department

const updateDepartment = async (req, res) => {
  try {
    const { Department } = req.body

    const deptFound = await departmentModel.findOne({departmentName: Department.departmentName})

    if (!deptFound) {
      return res.json({
        statusCode: departmentNotFound.statusCode,
        error: departmentNotFound.message,
      })
    }
  
    
    

    await departmentModel.findOneAndUpdate({departmentName: Department.departmentName},{
      courses: Department.courses , departmentHead: Department.departmentHead , staff: Department.staff})

    


    return res.json({
      statusCode: successCode,
      message: 'Department Updated',
    })
  } catch (e) {
    console.log(e)
    res.json({
      statusCode: unknown,
      error: 'Could not update department',
    })
  }
}
//Add Department

const addDepartment = async (req, res) => {
  try {
    const { Department } = req.body

    const deptFound = await departmentModel.findOne({departmentName: Department.departmentName})

    if (deptFound) {
      return res.json({
        statusCode: departmentAlreadyExists.statusCode,
        error: departmentAlreadyExists.message,
      })
    }
  
    
    

    await departmentModel.create(Department)



    return res.json({
      statusCode: successCode,
      message: 'New Department Created',
    })
  } catch (e) {
    console.log(e)
    res.json({
      statusCode: unknown,
      error: 'Could not add new depaartment',
    })
  }
}


//Add New Staff Member

const addNewMember = async (req, res) => {
    try {

      
      const Account  = req.body.Account

      const accountFound = await staffModel.findOne({email: Account.email},)
   

      if (accountFound != null) {
        return res.json({
          statusCode: emailAlreadyExists.statusCode,
          error: emailAlreadyExists.message,
        })
      }
    else {
      if(Account.memberType == "HR"){
      // if(Account.staffMemberType == "HR Member"){
        console.log("HERREE")
        const hrMem = await staffModel.find({memberId: { $regex: 'HR'} },)
        if(hrMem[0] != null){
          const id = Number(((hrMem[hrMem.length-1]).memberId).substring(2,3))+1
          Account.memberId = "HR"+id
        }
        else{
          Account.memberId = "HR"+1
        }
        Account.staffMemberType = staffMemberType.HR
      }
      if(Account.memberType == "Academic"){
          const acMem = await staffModel.find({memberId: { $regex: 'AC'} },)
          if(acMem[0] != null){
            const id = Number(((acMem[acMem.length-1]).memberId).substring(2,3))+1
            Account.memberId = "AC"+id
          }
          else{
            Account.memberId = "AC"+1
          }
          Account.staffMemberType = staffMemberType.UNASSIGNED
        }

      //Assigning Office Location
      const loc = await locationModel.findOne({locationName: Account.officeLocation}) 
      if(!loc){
        return res.json({
          statusCode: unknown,
          message: 'This Location Is Not Found',
        
        })

      }
    
      if(!(loc.staff.length < loc.capacity)){
        return res.json({
          message: 'This Office Is Now Full, Try Another Office',
        
        })
      }
      
  

    
  
      const newAttendanceLog = {
        signIn: "-",
        signOut: "-",
        requiredMinutesPerDay: 494.4,
        minutesAttendedPerMonth: 0,
        missingMinutesPerDay: 0,
        missingMinutesPerMonth:0,
        missingDays: 0,
        totalSalaryDeductionPrevMonth: 0,
        extraMinutes:0,
        attendedDays: [],
        memberId:Account.memberId,
        log: []
      }


        const saltKey = bcrypt.genSaltSync(salt)
        const hashed_pass = bcrypt.hashSync(Account.password, saltKey)
  
        Account.password = hashed_pass
        Account.email = Account.email.toString().toLowerCase()
console.log(Account)
        await staffModel.create(Account)
        loc.staff.push(Account.memberId)
        await locationModel.findOneAndUpdate({locationName: loc.locationName} , {staff: loc.staff})
        await attendanceLogModel.create(newAttendanceLog)
  


      if(Account.staffMemberType == "HR Member"){
        await staffModel.findOneAndUpdate({email:Account.email} , {daysOff: ["Saturday"]})

      }

      return res.json({
        statusCode: successCode,
        message: 'New Member Added',
      
      })
    }
    } catch (e) {
      res.json({
        statusCode: unknown,
        error: 'Could not add new member',
      })
    }
  }
  
//Update Existing Member

const updateExistingMember = async (req, res) => {
    try {
      const { Account } = req.body
  
      const memberFound = await staffModel.findOne({email: Account.email})
  

      if (!memberFound) {
        return res.json({
          statusCode: memberNotFound.statusCode,
          error: memberNotFound.message,
        })
      }
      const idBefore = Account.staffMemberType

      const newAccount = await staffModel.findOneAndUpdate({email: Account.email},
        {salary: Account.salary , birthDate: Account.birthDate ,
        address: Account.address , staffMemberType: Account.staffMemberType,
        daysOff: Account.daysOff , officeLocation: Account.officeLocation
      })

      const idAfter = newAccount.staffMemberType
      console.log(idBefore , idAfter)
      if(idBefore != idAfter){
      if(idBefore == "HR Member"){
        const hrMem = await staffModel.find({memberId: { $regex: 'HR'} },)
        console.log(hrMem)
        if(hrMem[0] != null){
          const id = Number(((hrMem[hrMem.length-1]).memberId).substring(2,3))+1
          Account.memberId = "HR"+id
        }
        else{
          Account.memberId = "HR"+1
        }
        
      }
      else {
        const acMem = await staffModel.find({memberId: { $regex: 'AC'} },)
        if(acMem[0] != null){
          const id = Number(((acMem[acMem.length-1]).memberId).substring(2,3))+1
          Account.memberId = "AC"+id
        }
        else{
          Account.memberId = "AC"+1

        }
      }
      await staffModel.findOneAndUpdate({email: Account.email},{memberId: Account.memberId})
    }

      

      return res.json({
        statusCode: successCode,
        message: 'Member info updated successfully',
      })
    } catch (e) {
      return res.json({
        statusCode: unknown,
        error: 'Could not edit Member info',
      })
    }
  }


//Remove Existing Member

const removeExistingMember = async (req, res) => {
    try {

      const  Account  = req.body.Body

      const accountFound = await staffModel.findOne({email: Account.email})
  
  
      if (!accountFound) {
        return res.json({
          statusCode: memberNotFound.statusCode,
          error: memberNotFound.message,
        })
      }

      var allLocations = await locationModel.find()
      var i = 0

      if(accountFound.staffMemberType == "HR Member"){
        await staffModel.findOneAndDelete({memberId: Account.memberId})
        await attendanceLogModel.findOneAndDelete({memberId: Account.memberId})
        while(i < allLocations.length){
          var location = allLocations[i]
          if(location.staff.includes(Account.memberId)){
            var index = location.staff.indexOf(Account.memberId)
            if(index != -1){
              location.staff.splice(index , 1)
              await locationModel.findOneAndUpdate({locationName: loc.locationName} , {staff: loc.staff})
            }
          }
          i++
        }
      }
      else {
        var allCourses =await courseModel.find()
        var allDepts = await departmentModel.find()
        var allSlots = await slotModel.find()
        var allLocations = await locationModel.find()

        

        if(accountFound.staffMemberType == "Course Coordinator"){
          await courseModel.findOneAndUpdate({courseCoordinator: Account.memberId} , {courseCoordinator: "Unassigned"})
          while(i < allDepts.length){
            var dept = allDepts[i]
            if(dept.staff.includes(Account.memberId)){
              var index = dept.staff.indexOf(Account.memberId)
              if(index != -1){
                dept.staff.splice(index , 1)
                await departmentModel.findOneAndUpdate({departmentName: dept.departmentName} , {staff: dept.staff})

              }
            }
            i++
          }
          i = 0
          while(i < allSlots.length){
            var slot = allSlots[i]
            if(slot.acID == Account.memberId){
                await slotModel.findOneAndUpdate({slotID: slot.slotID} , {acID: slot.acID})

            }
            i++
          }
          i = 0
          while(i < allLocations.length){
            var location = allLocations[i]
            if(location.staff.includes(Account.memberId)){
              var index = location.staff.indexOf(Account.memberId)
              if(index != -1){
                location.staff.splice(index , 1)
                await locationModel.findOneAndUpdate({locationName: loc.locationName} , {staff: loc.staff})
              }
            }
            i++
          }


        }
        else if(accountFound.staffMemberType == "Head Of Department"){
          await departmentModel.findOneAndUpdate({departmentHead: Account.memberId} , {departmentHead: "Unassigned"})
          while(i < allDepts.length){
            var dept = allDepts[i]
            if(dept.staff.includes(Account.memberId)){
              var index = dept.staff.indexOf(Account.memberId)
              if(index != -1){
                dept.staff.splice(index , 1)
                await departmentModel.findOneAndUpdate({departmentName: dept.departmentName} , {staff: dept.staff})

              }
            }
            i++
          }
          i = 0
          while(i < allSlots.length){
            var slot = allSlots[i]
            if(slot.acID == Account.memberId){
                await slotModel.findOneAndUpdate({slotID: slot.slotID} , {acID: slot.acID})

            }
            i++
          }
          i = 0
          while(i < allLocations.length){
            var location = allLocations[i]
            if(location.staff.includes(Account.memberId)){
              var index = location.staff.indexOf(Account.memberId)
              if(index != -1){
                location.staff.splice(index , 1)
                await locationModel.findOneAndUpdate({locationName: loc.locationName} , {staff: loc.staff})
              }
            }
            i++
          }

        }
  
        else if(accountFound.staffMemberType == "Course Instructor"){
          while(i < allCourses.length){
            var course = allCourses[i]
            if(course.courseInstructors.includes(Account.memberId)){
              var index = course.courseInstructors.indexOf(Account.memberId)
              if(index != -1){
                course.courseInstructors.splice(index , 1)
                await courseModel.findOneAndUpdate({courseID: course.courseID} , {courseInstructors: course.courseInstructors})

              }
            }
            i++
          }
          i = 0
          while(i < allDepts.length){
            var dept = allDepts[i]
            if(dept.staff.includes(Account.memberId)){
              var index = dept.staff.indexOf(Account.memberId)
              if(index != -1){
                dept.staff.splice(index , 1)
                await departmentModel.findOneAndUpdate({departmentName: dept.departmentName} , {staff: dept.staff})

              }
            }
            i++
          }
          i = 0
          while(i < allSlots.length){
            var slot = allSlots[i]
            if(slot.acID == Account.memberId){
                await slotModel.findOneAndUpdate({slotID: slot.slotID} , {acID: slot.acID})

            }
            i++
          }
          i = 0
          while(i < allLocations.length){
            var location = allLocations[i]
            if(location.staff.includes(Account.memberId)){
              var index = location.staff.indexOf(Account.memberId)
              if(index != -1){
                location.staff.splice(index , 1)
                await locationModel.findOneAndUpdate({locationName: loc.locationName} , {staff: loc.staff})
              }
            }
            i++
          }
        }
  
        else if(accountFound.staffMemberType == "Teacher Assistant"){
          while(i < allCourses.length){
            var course = allCourses[i]
            if(course.courseAssistant.includes(Account.memberId)){
              var index = course.courseAssistant.indexOf(Account.memberId)
              if(index != -1){
                course.courseAssistant.splice(index , 1)
                await courseModel.findOneAndUpdate({courseID: course.courseID} , {courseAssistant: course.courseAssistant})

              }
            }
            i++
          }
          i = 0
          while(i < allDepts.length){
            var dept = allDepts[i]
            if(dept.staff.includes(Account.memberId)){
              var index = dept.staff.indexOf(Account.memberId)
              if(index != -1){
                dept.staff.splice(index , 1)
                await departmentModel.findOneAndUpdate({departmentName: dept.departmentName} , {staff: dept.staff})

              }
            }
            i++
          }
          i = 0
          while(i < allSlots.length){
            var slot = allSlots[i]
            if(slot.acID == Account.memberId){
                await slotModel.findOneAndUpdate({slotID: slot.slotID} , {acID: slot.acID})

            }
            i++
          }
          i = 0
          while(i < allLocations.length){
            var location = allLocations[i]
            if(location.staff.includes(Account.memberId)){
              var index = location.staff.indexOf(Account.memberId)
              if(index != -1){
                location.staff.splice(index , 1)
                await locationModel.findOneAndUpdate({locationName: loc.locationName} , {staff: loc.staff})
              }
            }
            i++
          }
        }
      }

    
      
  
      await staffModel.findOneAndDelete({email: Account.email})
      return res.json({
        statusCode: successCode,
        message: 'Member deleted successfully',
      })
    } catch (e) {
      return res.json({
        statusCode: unknown,
        error: 'Could not delete Member',
      })
    }
  }
//View Attendance Record

  const viewAttendanceRecord = async (req, res) => {
    try {
      const { Account } = req.body
      
      const accountFound = await staffModel.findOne({email:Account.email},console.log("Found"))
  
      if (!accountFound) {
        res.json({
          statusCode: accountNotFound.statusCode,
          error: accountNotFound.message,
        })
      }
      return res.json({
        statusCode: successCode,
        firstName: accountFound.firstName,
        lastName: accountFound.lastName,
        attendanceLog: accountFound.attendanceLog
      })
    } catch (e) {
      return res.json({
        statusCode: unknown,
        error: 'Could not view attendance log',
      })
    }
  }

  const addCourse = async (req, res) => {
    try {
      const  Course  = req.body.Body
  
      const courseFound = await courseModel.findOne({courseID: Course.courseId})
  

      const dept = await departmentModel.findOne({departmentName: Course.departmentName})

      if (!dept) {
        return res.json({
          statusCode: departmentNotFound.statusCode,
          error: departmentNotFound.message,
        })
      }
      if (courseFound) {
        return res.json({
          statusCode: courseAlreadyExists.statusCode,
          error: courseAlreadyExists.message,
        })
      }

     

      const newCourse = {
        departmentName: Course.departmentName,
        courseName: Course.courseName,
        courseID: Course.courseId,
        courseCoordinator : "",
        courseInstructors: [],
        courseAssistant: [] ,
        slots: [],             
        courseCoverage : 0
      }

      await courseModel.create(newCourse)
      if(dept.courses.includes(Course.courseId)){
        dept.courses.push(Course.courseId)
        await departmentModel.findOneAndUpdate({departmentName: Course.departmentName} , {courses: dept.courses})


      }
      else {
        return res.json({
          statusCode: courseAlreadyExists.statusCode,
          error: courseAlreadyExists.message,
        })
      }

      
      return res.json({
        statusCode: successCode,
        message: 'New Course Created',
      })
    } catch (e) {
      console.log(e)
      res.json({
        statusCode: unknown,
        error: 'Could not add new Course',
      })
    }
  }

  const deleteCourse = async (req, res) => {
    try {
      const  Course  = req.body.Body
  
      const courseFound = await courseModel.findOne({courseID: Course.courseId})
  
      if (!courseFound) {
        return res.json({
          statusCode: courseNotFound.statusCode,
          error: courseNotFound.message,
        })
      }

      const deptFound = await departmentModel.findOne({departmentName: courseFound.departmentName})
      
      if(deptFound.courses.includes(Course.courseId)){
        const index = deptFound.courses.indexOf(Course.courseId)
        if(index != -1){
          deptFound.courses.splice(index,1)
          await departmentModel.findOneAndUpdate({departmentName:deptFound.departmentName} , {courses: deptFound.courses})
        }
      }
      else {
        return res.json({
          statusCode: courseNotFound.statusCode,
          error: courseNotFound.message,
        })
      }
      
      await courseModel.findOneAndUpdate({courseID: Course.courseId} , {courseCoordinator: "" , courseInstructors: [] , 
    courseAssistant: [] , slots: [] , courseCoverage: 0})
  
      return res.json({
        statusCode: successCode,
        message: 'Course Removed',
      })
    } catch (e) {
      console.log(e)
      res.json({
        statusCode: unknown,
        error: 'Could not remove Course',
      })
    }
  }
  
  const updateCourse = async (req, res) => {
    try {
      const Course = req.body.Body
  
      const courseFound = await courseModel.findOne({courseID: Course.courseId})
  
      if (!courseFound) {
        return res.json({
          statusCode: courseNotFound.statusCode,
          error: courseNotFound.message,
        })
      }

      if(Course.newCourseName != null){
        await courseModel.findOneAndUpdate({courseID: courseFound.courseID} , {courseName: Course.courseName})

      
      }
      if(Course.courseNewId != null){
        
        const slot = await slotModel.findOne({courseID: courseFound.courseID})
        const dept = await departmentModel.findOne({departmentName: courseFound.departmentName})

        await slotModel.findOneAndUpdate({courseID: courseFound.courseID},{courseID: Course.courseNewId})

        const index = dept.courses.indexOf(courseFound.courseID)
        if(index != -1){
          dept.courses.splice(index,1)
          dept.courses.push(Course.courseNewId)
        }
        await departmentModel.findOneAndUpdate({departmentName: courseFound.departmentName} , {courses: dept.courses })

        await courseModel.findOneAndUpdate({courseID: courseFound.courseID} , {courseID: Course.courseNewId})

      }
      if(Course.newDepartmentName != null){
        await courseModel.findOneAndUpdate({courseID: Course.courseId} , {departmentName: Course.newDepartmentName})
        const dept2 = await departmentModel.findOne({departmentName: courseFound.departmentName})
        console.log(courseFound.courseID)

        const index2 = dept2.courses.indexOf(courseFound.courseID)
        if(index2 != -1){
          dept2.courses.splice(index2,1)
          const dept3 = await departmentModel.findOne({departmentName: Course.newDepartmentName})
          if(Course.courseNewId != null){
            dept3.courses.push(Course.courseNewId)
            await departmentModel.findOneAndUpdate({departmentName:dept3.departmentName} , {courses: dept3.courses})
            await departmentModel.findOneAndUpdate({departmentName:courseFound.departmentName} , {courses: dept2.courses})

          }
          else {
            dept3.courses.push(Course.courseId)
            await departmentModel.findOneAndUpdate({departmentName:dept3.departmentName} , {courses: dept3.courses})
            await departmentModel.findOneAndUpdate({departmentName:courseFound.departmentName} , {courses: dept2.courses})


          }
         
        }
        

      }


      
      return res.json({
        statusCode: successCode,
        message: 'Course Info Updated',
      })
    } catch (e) {
      console.log(e)
      res.json({
        statusCode: unknown,
        error: 'Could not update course',
      })
    }
  }

  
module.exports = {
    updateFaculty,
    addFaculty,
    deleteFaculty,
    updateDepartment,
    deleteDepartment,
    addDepartment,
    addNewMember,
    updateExistingMember,
    removeExistingMember,
    addLocation,
    removeLocation,
    updateLocation,
    viewAttendanceRecord,
    addCourse,
    deleteCourse,
    updateCourse
}