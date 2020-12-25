//Requires
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

//Models Requires
const staffModel = require('../../models/staff_model')
const courseModel = require('../../models/course_model')
const departmentModel = require('../../models/department_model')
const requestModel = require('../../models/request_model')
const slotModel = require('../../models/slot_model')
const attendanceLogModel = require('../../models/attendanceLog_model')


const { NoAccess,
  noRequest, accountNotFound,requestAlreadyExists,
   courseNotFound, instructorAlreadyExists, 
   memberNotFound, departmentNotFound, successCode, unknown,
  instructorAlreadyAssigned, requestNotFound , slotDoesnotExist, courseDoesNotExist,
  slotAlreadyExists,coordinatorDoesNotExist,slotAlreadyAssignedOrNotAssignedToYourCourse , requestAlreadyAnswered} = require('../constants/statusCodesEnum')
const department_model = require('../../models/department_model')
const enums = require('../constants/enums')
const { requestType , requestStatus } = require('../constants/enums')

 
///////////////////////// HEAD OF DEPARTMENT ///////////////////////

// Delete Course Instructor
const deleteCourseInstructor = async (req, res) => {
  try {

    const courseFound = await courseModel.findOne({courseName: req.body.Body.courseID})
    const accountFound = await staffModel.findOne({memberId: req.body.Body.memberId})

    if (!courseFound) {
      
      return res.json({
        statusCode: courseNotFound.statusCode,
        error: courseNotFound.message,
      })
    }
    if (!accountFound) {

      return res.json({
        statusCode: memberNotFound.statusCode,
        error: memberNotFound.message,
      })
    }

      console.log(courseFound.courseInstructors)


      if(!(courseFound.courseInstructors.includes(accountFound.memberId))){
        return res.json({
          statusCode: "9080",
          message: "This instructor does not teach this course"
      })
    }

      var array = courseFound.courseInstructors
      var index = array.indexOf(accountFound.memberId)

      console.log(array)
      console.log(index)

      if(index==-1){
          return res.json({
             statusCode: InstructorDoesnotExist.statusCode,
             message: InstructorDoesnotExist.message, 
          })
        
      }
      array.splice(index)
      console.log(array)

      await courseModel.findOneAndUpdate({courseID: courseFound.courseID} , {courseInstructors: courseFound.courseInstructors})
      await courseFound.save()
    
      console.log(courseFound.courseInstructors)

    return res.json({
      statusCode: successCode,
      message: 'Instructor removed from course successfully',
    })
  
  } catch (e) {
    return res.json({
      statusCode: unknown,
      error: 'Could not delete Instructor from the course',
    })
  }
}


  //Assign Course Instructor(s)

const assignCourseInstructor = async (req, res) => {
  try {
    const  Course  = req.body

    
    const courseFound = await courseModel.findOne({courseName: Course.Body.courseName})
    const accountFound = await staffModel.findOne({email: Course.Body.instructorEmail})

    
    if (!courseFound) {
      return res.json({
        statusCode: courseNotFound.statusCode,
        error: courseNotFound.message,
      })
    }

    if (!accountFound) {
      return res.json({
        statusCode: accountNotFound.statusCode,
        error: accountNotFound.message,
      })
    }

    if(!(courseFound.courseInstructors.includes(Course.email))){
      console.log(courseFound.courseInstructors)
      courseFound.courseInstructors.push(Course.Body.instructorEmail)
      console.log(courseFound.courseInstructors)
      await courseModel.findOneAndUpdate({courseInstructors: courseFound.courseInstructors})

    }
    else {
      return res.json({
        statusCode: instructorAlreadyAssigned.statusCode,
        error: instructorAlreadyAssigned.message,
      })
    }
   
  
    



    return res.json({
      statusCode: successCode,
      message: 'Instructors Assigned To This Course',
    })
  } catch (e) {
    console.log(e)
    res.json({
      statusCode: unknown,
      error: 'Could Not Assign',
    })
  }
}


//View Days Off

const viewDaysOff = async (req, res) => {
  try {
    const Department = req.body
    const deptFound = await departmentModel.findOne({departmentName:Department.Department.departmentName},)

    if (!deptFound) {
      res.json({
        statusCode: departmentNotFound.statusCode,
        error: departmentNotFound.message,
      })
    }
   
    const staff = deptFound.staff

    var result = ""
    var i = 0
   
    var arr = []
    while(i < staff.length){
      
      var accountFound = await staffModel.findOne({email:staff[i]})
      var days = accountFound.daysOff

      if (accountFound.daysOff == null){
        arr[i] =" " + accountFound.firstName + " " +accountFound.lastName + " This is a very hardworking person who has no daysoff"
      }
      else{
      arr[i] =" " + accountFound.firstName + " " +accountFound.lastName + " " +accountFound.daysOff
      console.log(arr[i])}
      
      
      result+=accountFound.firstName.toString()+" "+accountFound.lastName.toString()+" "+
      accountFound.memberId.toString()+" " + accountFound.daysOff+ " - "
    
     
      i+=1
    }

    return res.json({
    arr
    })



  } catch (e) {
    return res.json({
      statusCode: unknown,
      error: 'Could not view department daysoff',
    })
  }
}

const viewRequests = async (req, res) => {
  try {
    const Department = req.body
    const deptFound = await departmentModel.findOne({departmentName:Department.Department.departmentName},)

    if (!deptFound) {
      res.json({
        statusCode: departmentNotFound.statusCode,
        error: departmentNotFound.message,
      })
    }
   
    console.log(Department.Department.departmentName)

    var staff = deptFound.staff
    var staffArr = []

    var i = 0
    while(i < staff.length){
      var accountFound = await staffModel.findOne({email:staff[i]})
      staffArr[i] = accountFound
      i+=1

    }
    i = 0
    var requests= []
    while(i < staffArr.length){
    const memberRequests = await requestModel.find({senderID:staffArr[i].memberId})
      requests[i]=memberRequests
      i++
    }

    return res.json({
      requests
    })



  } catch (e) {
    return res.json({
      statusCode: unknown,
      error: 'Could not view department requests',
    })
  }
}

const viewCourseCoverage = async (req, res) => {
  try {
    const Department = req.body
    const deptFound = await departmentModel.findOne({departmentName:Department.Department.departmentName})
    
    if (!deptFound) {
      res.json({
        statusCode: departmentNotFound.statusCode,
        error: departmentNotFound.message,
      })
    }
    const coursesFound = deptFound.courses
    
    console.log(coursesFound)


    var coursesCoverage = []
    var coursesCouple = []
    var courses= []
    var i = 0

    while(i < coursesFound.length){
      courses[i] = await courseModel.findOne({courseID:coursesFound[i]})
    
      console.log(courses[i])
      i+=1
    }
    i = 0

    while(i < coursesFound.length){
      coursesCouple = [courses[i].courseID, courses[i].courseCoverage]
           console.log(coursesCouple)
 coursesCoverage[i] = coursesCouple
      i+=1

    }

    return res.json({
      coursesCoverage
    })



  } catch (e) {
    return res.json({
      statusCode: unknown,
      error: 'Could not view course coverage',
    })
  }
}

const hodViewDepartmentStaff = async (req, res) => {
  try {

    const departmentFound = await departmentModel.findOne({departmentName: req.body.Body.departmentName})

    if (!departmentFound) {
      
      return res.json({
        statusCode: departmentNotFound.statusCode,
        error: departmentNotFound.message,
      })
    }


    var staff = departmentFound.staff
    var arr = []
    var i = 0
    for (i = 0; i<staff.length; i++){
      var accountFound = await staffModel.findOne({email:staff[i]})      

      arr[i] = accountFound

     
    }

    return res.json({
      arr,
      statusCode:successCode,
    })

  }
  
  catch (e) {
    return res.json({
      statusCode: unknown,
      error: 'Could not view department staff',
    })
  }
  }

  const hodViewDepartmentStaffPerCourse = async (req, res) => {
    try {

      const departmentFound = await departmentModel.findOne({departmentName: req.body.Body.departmentName})

      if (!departmentFound) {
        
        return res.json({
          statusCode: departmentNotFound.statusCode,
          error: departmentNotFound.message,
        })
      }
      
      var courses = departmentFound.courses
      //var staff = departmentFound.staff
      // console.log(courses)

      var arr = []
      var i = 0

      for (i = 0; i<courses.length; i++){

        const course = await courseModel.findOne({courseID:courses[i]},)  

        if(course){
          var instructors = course.courseInstructors
          var coordinator = course.courseCoordinator
          var tas = course.courseAssistant
     
  
          arr[i] = "Course: " + course.courseName + "--" +
          "Instructors: " + instructors + "--" +
          "Coordinator: " + coordinator + "--" +
          "TAs: " + tas 
  
        }
       
       
      }

      return res.json({
        statusCode:successCode,
        arr,
      })

    }
    
    catch (e) {
      return res.json({
        statusCode: unknown,
        error: 'Could not view department staff',
      })
    }
    }

   
    const viewTeachingAssignments = async (req, res) => {
      try {
    
        const departmentFound = await departmentModel.findOne({departmentName: req.body.Body.departmentName})
        console.log('a')
        if (!departmentFound) {
          
          return res.json({
            statusCode: departmentNotFound.statusCode,
            error: departmentNotFound.message,
          })
        }
        console.log(departmentFound)

        const courses = departmentFound.courses
        var coursesFound = []
        console.log(courses)

        var i = 0
        for (i = 0; i<courses.length; i++){
          var courseFound = await courseModel.findOne({courseID:courses[i]})      
          coursesFound[i] = courseFound
          console.log('1')

        }
        console.log(coursesFound)

        i=0
        var slotsPerCourse =[]
        for (i = 0; i<courses.length; i++){
          slotsFound = await slotModel.find({courseID:coursesFound[i].courseID})      
          slotsPerCourse[i] = slotsFound
          console.log('2')
        }

        
        console.log(slotsPerCourse)

        return res.json({
          slotsPerCourse,
          statusCode:successCode,
        })
    
      }
      
      catch (e) {
        return res.json({
          statusCode: unknown,
          error: 'Could not view department staff',
        })
      }
      }

///////////////////////// ACADEMIC MEMBERS ///////////////////////

const viewSchedule = async (req, res) => {
  try {


    //my id from token
   
    const myID = req.body.Account.memberID
    
    const replacementRequests = await requestModel.find({status:enums.requestStatus.ACCEPTED, recieverID:myID})
    console.log(replacementRequests)

    var replacementRequests2 = [] 
    var i = 0
    var j = 0

    while( i<replacementRequests.length){
      if (replacementRequests[i].activeDate > Date.now()){
          replacementRequests2[j] = replacementRequests[i]
          j++
        }
        i++
        console.log("1")

    }
    console.log(replacementRequests2)


    i = 0
    j = 0

    var slots = []
    while( i<replacementRequests2.length){
      slots[i] = replacementRequests2[i].slotID
        i++
        console.log("2")

    }
    console.log(slots)

    const schedule = await slotModel.find({acID:myID})
    console.log(schedule)

    const final = schedule.concat(slots)
    console.log(final)

    return res.json({
      final,
      statusCode:successCode,
    })

  }
  
  catch (e) {
    return res.json({
      statusCode: unknown,
      error: 'Could not view schedule',
    })
  }
  }


  const viewReplacementRequests = async (req, res) => {
    try {
      const myID = req.body.Account.memberID
      
      var ReplacementRequests = await requestModel.find({requestType: requestType.REPLACEMENT , recieverID: myID})

      if(ReplacementRequests != null){
        return res.json({
          statusCode:successCode,
          message:'These Are Your Replacement Requests',
          ReplacementRequests
      
        })

      }

      else{
        return res.json({
          statusCode:unknown,
          message:'These Are No Replacement Requests',
          ReplacementRequests
      
        })

      }

      
    } catch (e) {
      return res.json({
        statusCode: unknown,
        error: 'Could not view replacement requests',
      })
    }
  }



  const sendReplacementRequests = async (req, res) => {
    try {
      const Body = req.body.Body
      const myID = "AC2 "
      const reciever = await staffModel.findOne({memberId: Body.recieverID})


      if(!reciever){
        return res.json({
          statusCode:accountNotFound.statusCode,
          message:accountNotFound.message,
      
        })
      } 

      if(reciever.requestLog.includes(Body.requestID)){
        return res.json({
          statusCode:requestAlreadyExists.statusCode,
          message:requestAlreadyExists.message,
      
        })
      }

      await requestModel.create({recieverID: Body.recieverID , senderID:myID ,
      activeDate: Body.activeDate , slotID: Body.slotID , status: Body.status , requestType: "Replacement" ,
      brief: Body.brief , comments: Body.comments , requestID: Body.requestID} )
  
      reciever.requestLog.push(Body.requestID)


      await staffModel.findOneAndUpdate({memberID: Body.recieverID},{requestLog: reciever.requestLog}, { returnOriginal: false })
      await reciever.save()

      reciever2 = await staffModel.findOne({memberId: Body.recieverID})

      return res.json({
        statusCode:successCode.statusCode,
        message:"Replacement Request Sent",
    
      })

      
    } catch (e) {
      return res.json({
        statusCode: unknown,
        error: 'Could not send replacement requests',
      })
    }
  }

  const hodRejectRequest = async (req, res) => {
    try {

      const departmentFound = await departmentModel.findOne({departmentName: req.body.Body.departmentName})
      const request = await requestModel.findOne({requestID: req.body.Body.requestID})

      // console.log('a')

      if (!departmentFound) {
        
        return res.json({
          statusCode: departmentNotFound.statusCode,
          error: departmentNotFound.message,
        })
      }
      // console.log('b')
      if (!request) {
        
        return res.json({
          statusCode: requestNotFound.statusCode,
          error: requestNotFound.message,
        })
      }

      if (req.body.Body.comments) {
        request.comments = req.body.Body.comments
        }

      // console.log('d')

      request.requestStatus = reqStat.requestStatus.REJECTED
      console.log(request.requestID)

// console.log(req.body.comments)
      await requestModel.findOneAndUpdate({requestID: request.requestID}, {requestStatus: reqStat.requestStatus.REJECTED })

      return res.json({
        statusCode:successCode,
        message:"Request Rejected"
        
      })

    }
    
    catch (e) {
      return res.json({
        statusCode: unknown,
        error: 'Could not access HOD requests',
      })
    }
    }


    const coordinatorAddCourseSlots = async (req, res) => {
      try {

        const Course  = req.body.Body
        const courseFound = await courseModel.findOne({courseID: Course.courseID})

        if (!courseFound) {
          return res.json({
            statusCode: courseDoesNotExist.statusCode,
            error: courseDoesNotExist.message,
          })
        }
        console.log(courseFound)

        if(!(courseFound.slots.includes(Course.slotID))){

          courseFound.slots.push(Course.slotID)
          console.log(courseFound.slotID)

        await slotModel.create({slotID: Course.slotID , slotNumber: Course.slotNumber, slotType: Course.slotType , slotDay: Course.slotDay , acID: Course.acID, courseID: Course.CourseID , location: Course.location})
        await courseModel.findOneAndUpdate({courseID: Course.courseID} , {slots: courseFound.slots})

        console.log(Course)


    return res.json({
      statusCode: successCode,
      message: 'New Slot Assigned',
    })
         }
    
        else {
           return res.json({
              statusCode: slotAlreadyExists,
              message: 'Slot Already Exists', 
           })
         }
       
      } catch (e) {
        console.log(e)
        res.json({
          statusCode: unknown,
          error: 'Could not assign new slot',
        })
      }
     }
    
     const coordinatorUpdateCourseSlots = async (req, res) => {
      try {

        const Course  = req.body.Body
        const courseFound = await courseModel.findOne({courseID: Course.courseID})
        const slotFound = await slotModel.findOne({slotID: Course.slotID})

        if (!courseFound) {
          return res.json({
            statusCode: courseDoesNotExist.statusCode,
            error: courseDoesNotExist.message,
          })
        }
        console.log(courseFound)

        if((courseFound.slots.includes(slotFound.slotID))){

          courseFound.slots.push(slotFound)
          console.log(courseFound.slotID)

        await slotModel.findOneAndUpdate({slotID: Course.slotID} , {slotNumber: Course.slotNumber, slotType: Course.slotType , slotDay: Course.slotDay , acID: Course.acID, courseID: Course.CourseID , location: Course.location})
        await courseModel.findOneAndUpdate({courseID: Course.courseID} , {slots: courseFound.slots})

        console.log(Course)


    return res.json({
      statusCode: successCode,
      message: 'slot Updated',
    })
         }
    
        else {
           return res.json({
              statusCode: slotAlreadyExists,
              message: 'Slot does not Exist', 
           })
         }
       
      } catch (e) {
        console.log(e)
        res.json({
          statusCode: unknown,
          error: 'Could not update slot',
        })
      }
     }

     const coordinatorDeleteCourseSlots = async (req, res) => {
      try {

        const Course  = req.body.Body
        const courseFound = await courseModel.findOne({courseID: Course.courseID})
        const slotFound = await slotModel.findOne({slotID: Course.slotID})

        if (!courseFound) {
          return res.json({
            statusCode: courseDoesNotExist.statusCode,
            error: courseDoesNotExist.message,
          })
        }

        if(!(courseFound.slots.includes(slotFound.slotID))){
          return res.json({
            statusCode: slotDoesnotExist.statusCode,
            error: slotDoesnotExist.message,
        })
      }
      
      else{

        console.log(courseFound)
        console.log(slotFound)

   
        var array = courseFound.slots
        var index = array.indexOf(slotFound.slotID)

        console.log(array)
        console.log(index)

        if(index==-1){
            return res.json({
               statusCode: slotAlreadyExists,
               message: 'Slot does not Exist', 
            })
          
        }
        array.splice(index)
        console.log(array)

        await slotModel.findOneAndDelete({slotID: Course.slotID})
        await courseModel.findOneAndUpdate({courseID: Course.courseID} , {slots: array})

        console.log(courseFound.slots)


    return res.json({
      statusCode: successCode,
      message: 'slot Deleted',
    })
  }
      } catch (e) {
        console.log(e)
        res.json({
          statusCode: unknown,
          error: 'Could not delete slot',
        })
      }
     }


     const coordinatorViewSlotLinking = async (req, res) => {
      try {

        //Will Be Changed Upon Token
        const body= req.body.Body
        const coordinator = await staffModel.findOne({memberId: body.memberId})
        var course = await courseModel.findOne({courseCoordinator: coordinator.email})
        
        var result = []
        var r = 0
        var tas = course.courseAssistant // Array
        var i = 0

        for(i = 0 ; i < tas.length ; i++){
          var ta = await staffModel.findOne({memberId: tas[i]})
          console.log(ta.requestLog)
          if(ta.requestLog.length != 0){
            var j = 0
           
            while(j < ta.requestLog.length){

              var request = await requestModel.findOne({requestID: ta.requestLog[j]})
              console.log(request)
              if(request){
                console.log(request)

              if(request.requestType == "SlotLinking"){
                var temp = [ta.memberId , ta.requestLog[j]]
                result[r] = temp
                console.log(result)
                r++
                
            }
            
          }
            j++
              

            }
          }
        }

        res.json({
          statusCode: successCode,
          message: 'Slot Linking Requests Viewed',
          result
        })


      } catch (e) {
        console.log(e)
        res.json({
          statusCode: unknown,
          error: 'Could not view slotlinking requests',
        })
      }
     }


     const sendSlotLinkingRequest = async (req, res) => {
      try {
        const Body = req.body.Body
        const reqId = "R6"
        const myID = "AC2 "

        const request = await requestModel.findOne({requestId: reqId})
        if(request){
          return res.json({
            statusCode:requestAlreadyExists.statusCode,
            message:requestAlreadyExists.message,
          })
        }
         console.log(request) 

//NO REQUEST IS MADE YET:

        const slot = await slotModel.findOne({slotID: Body.slotID})
        if(!slot){
          return res.json({
            statusCode:slotDoesnotExist.statusCode,
            message:slotDoesnotExist.message,
          })
        }
        console.log(slot)

// THE REQUIRED SLOT EXISTS .. NAMED slot

        const course = await courseModel.findOne({courseID:slot.courseID})
        if(!course){
          return res.json({
            statusCode:courseNotFound.statusCode,
            message:courseNotFound.message,
          })
        }
        console.log(course)

// THE SLOT HAS A COURSE NAMED course
        
        const coordinator = await staffModel.findOne({memberId: course.courseCoordinator})
        if(!coordinator){
          return res.json({
            statusCode:accountNotFound.statusCode,
            message:accountNotFound.message,
          })
        }
        
        console.log(coordinator.memberId)

// THE COURSE HAS A COORDINATOR NAMED course

        if(coordinator.requestLog.includes(reqId)){
          return res.json({
            statusCode:requestAlreadyExists.statusCode,
            message:requestAlreadyExists.message,
        
          })
        } 

// THE COORDINATOR LOG DOES NOT HAS THE REQUEST

        await requestModel.create({senderID: myID, recieverID: coordinator.memberId , requestID: reqId, requestType: "SlotLinking" , 
        slotID: Body.slotID ,  brief: Body.brief , comments: Body.comments })

        console.log("bbb")

        coordinator.requestLog.push(reqId)
        console.log(coordinator.requestLog)

        await staffModel.findOneAndUpdate({memberId: coordinator.memberId},{requestLog: coordinator.requestLog}, { returnOriginal: false })
        await coordinator.save()
        console.log("ccc")

       const  coordinator2 = await staffModel.findOne({memberId: coordinator.memberId})
        console.log(coordinator2.requestLog)
        console.log("ddd")

        return res.json({
          statusCode:successCode.statusCode,
          message:"slotLinking Request Sent",
      
        })
  
        
      } catch (e) {
        return res.json({
          statusCode: unknown,
          error: 'Could not send slotLinking requests',
        })
      }
    }


    const viewSlotAssignments = async (req, res) => {
      try {

        //Will Be Changed Upon Token
       
        myID = "AC5"

        var allCourses = await courseModel.find()
        if(allCourses.length != 0){
          
        var i = 0
        var result = []
        var x = 0

        while(i < allCourses.length){
          var course = allCourses[i]
          var instructors = course.courseInstructors
          if(instructors.includes(myID)){
            var temp = []
            temp[0] = course.courseName + " " + course.courseID
            temp[1] = course.slots
            result[x] = temp
          }
          i++
        }
      }

      if(result.length == 0){ 
        res.json({
          statusCode: successCode,
          message: 'You Are Not Assigned To Any Course',
          result
        })

      }
        
         

        return res.json({
          statusCode: unknown,
          message: 'These are all slots assigned to your course',
          
        })


      } catch (e) {
        console.log(e)
        res.json({
          statusCode: unknown,
          error: 'Could not view slots assignments',
        })
      }
     }


     
    const assignCourseCoordinator = async (req, res) => {
      try {

        //Will Be Changed Upon Token
       
        myID = "AC5"
        const body = req.body.Body


        const acMember = await staffModel.findOne({memberId: body.memberId})
        // console.log(acMember)
        if(!acMember){
          return res.json({
            statusCode: accountNotFound.statusCode,
            message: accountNotFound.message,
            
          })

        }



        const myCourses = []

        const courses = await courseModel.find()
        var i = 0
        var j = 0

        while(i < courses.length){
          var course = courses[i]
          if(course.courseInstructors.includes(myID)){
            myCourses[j] = course
            j++
          }
          i++
        }
        if(myCourses.length == 0){
          return res.json({
            
            message: "You Are Not Assigned To Any Course",
        
          })
        }

        i = 0
        j = 0
        var assigned = false
        while(i < myCourses.length){

          if(myCourses[i].courseID == body.courseId){

          var TAs = myCourses[i].courseAssistant

          while(j < TAs.length){

            var taFound = await staffModel.findOne({memberId: TAs[j]})
            if(!taFound){
              return res.json({
                statusCode:accountNotFound.statusCode,
                message:accountNotFound.message,
            
              })
            }

            if(TAs[j] == body.memberId){

              TAs.splice(j,1)
              await courseModel.findOneAndUpdate({courseID : body.courseId} , {courseCoordinator: body.memberId , courseAssistant: TAs})
              await staffModel.findOneAndUpdate({memberId: body.memberId} , {staffMemberType: "Course Coordinator"})
             assigned = true
            }
            j++

          }
        }
        i++
      }
      console.log(assigned)

      if(assigned){
      res.json({
        statusCode: successCode,
        message: 'This Member Is Now A Course Coordinator For This Course',
        
      })
    }
    else {
      res.json({
        statusCode: unknown,
        message: 'Could Not Assign',
        
      })
    }

      


      } catch (e) {
        console.log(e)
        res.json({
          statusCode: unknown,
          error: 'Could not assign course coordinator',
        })
      }
     }


     const assignAcMemberToUnassignedSlot = async (req, res) => {
      try {

        //Will Be Changed Upon Token
       
        myID = "AC5"
        const body = req.body.Body

        const acMember = await staffModel.findOne({memberId: body.memberId})
        // console.log(acMember)
        if(!acMember){
          return res.json({
            statusCode: accountNotFound.statusCode,
            message: accountNotFound.message,
            
          })

        }



        const myCourses = []

        const courses = await courseModel.find()
        var i = 0
        var j = 0

        while(i < courses.length){
          var course = courses[i]
          if(course.courseInstructors.includes(myID)){
            myCourses[j] = course
            j++
          }
          i++
        }
        if(myCourses.length == 0){
          return res.json({
            
            message: "You Are Not Assigned To Any Course",
        
          })
        }

        i = 0
        j = 0
        var done = false
        while(i < myCourses.length){
          
          if(myCourses[i].courseID == body.courseId){
            

            if(myCourses[i].slots.includes(body.slotID)){

            var TAs = myCourses[i].courseAssistant

            while(j < TAs.length){

              if(TAs[j] == body.memberId){

                var emptySlot = await slotModel.findOne({acID: "Unassigned" , courseID: body.courseId})
                console.log(emptySlot)
                if(!emptySlot){
                  return res.json({
                   
                    message:"There Are No Empty Slots",
                
                  })
                }
                console.log(emptySlot.slotID)
                console.log(body.slotID)
                if(emptySlot.slotID == body.slotID){
                  await slotModel.findOneAndUpdate({slotID: body.slotID} , {acID: body.memberId})
                  done = true
                  res.json({
                    statusCode: successCode,
                    message: 'Slot Assigned To This Member',
                  })
                }
                }
               
              j++
            }
          }
        }
        i++
      }
      if(done != true){
        res.json({
          
          error: "This Slot Is Not Available Or Not In Your Course",
        })
      }
     

      } catch (e) {
        res.json({
          statusCode: unknown,
          error: 'Could not assign slot to this member',
        })
      }
     }



     const changeDayOff = async (req, res) => {
      try {
        var myID = "AC6"

        

        var allCourses = await courseModel.find()

        var i = 0
        while(i < allCourses.length){
          var course = allCourses[i]
          //Instructor
          if(course.courseInstructors.includes(myID)){

            var dept = await courseModel.findOne({departmentName: course.departmentName})
            if(!dept){
              return res.json({
                statusCode: departmentNotFound.statusCode,
                message: departmentNotFound.message
              })
            }
            var dept1 = await departmentModel.findOne({departmentName: dept.departmentName})
            if(!dept1){
              return res.json({
                statusCode: departmentNotFound.statusCode,
                message: departmentNotFound.message
              })
            }
            var HOD = dept1.departmentHead

            await requestModel.create({senderID: myID , recieverID: HOD , requestDate: Date.now() , 
            status: "Pending" , requestType: requestType.CHANGEDAYOFF , brief: req.body.Body.brief , 
          requestID: req.body.Body.requestID})
          }
          //TA
          else if(course.courseAssistant.includes(myID)){

            var dept = await courseModel.findOne({departmentName: course.departmentName})
            if(!dept){
              returnres.json({
                statusCode: departmentNotFound.statusCode,
                message: departmentNotFound.message
              })
            }

            var dept1 = await departmentModel.findOne({departmentName: dept.departmentName})
            if(!dept1){
              return res.json({
                statusCode: departmentNotFound.statusCode,
                message: departmentNotFound.message
              })
            }

            var HOD = dept1.departmentHead

          console.log("Done")

          await requestModel.create({senderID: myID , recieverID: HOD ,  
            status: requestStatus.PENDING , requestType: requestType.CHANGEDAYOFF , brief: req.body.Body.brief , 
          requestID: req.body.Body.requestID})
          
          } 
          //Coordinator
          else {
            var coordinator = await courseModel.findOne({courseCoordinator: myID})
            if(!coordinator){
             return res.json({
                statusCode: accountNotFound.statusCode,
                message: accountNotFound.message
              })
            }
            console.log("HEREE")

            await requestModel.create({senderID: myID , recieverID: HOD ,  
              status: requestStatus.PENDING , requestType: requestType.CHANGEDAYOFF , brief: req.body.Body.brief , 
            requestID: req.body.Body.requestID})
          }
          
          i++
        }
        return res.json({
          statusCode: successCode,
          message: "Request Sent",
        })

      
      } catch (e) {
        return res.json({
          statusCode: unknown,
          error: 'Could Not Send Request',
        })
      }
     }


     
     const showNotifications = async (req, res) => {
      try {
        var myID = "AC6"

        const user = await staffModel.findOne({memberId: myID})

        myRequests = user.requestLog

        if(myRequests.length == 0){
          return res.json({
            statusCode: unknown,
            error: 'You Have No Requests'
          })
        }

        var before = user.notifications.length

        var i = 0

        while(i < myRequests.length){

          request = myRequests[i]
          requestFound = await requestModel.findOne({requestID: myRequests[i]})
          console.log(requestFound.status)

          if(requestFound.status == requestStatus.ACCEPTED){
            var result = "Request: " + requestFound.requestType + " - RequestID: - " + myRequests[i] + " is " + requestFound.status
            if(!(user.notifications.includes(result))){
              user.notifications.push(result)

            }
          }
          else if(requestFound.status == requestStatus.REJECTED){
            var result = "Request: " + requestFound.requestType + " - RequestID: - " + myRequests[i] + " is " + requestFound.status
            if(!(user.notifications.includes(result))){
              user.notifications.push(result)

            }
          }
          await staffModel.findOneAndUpdate({memberId: myID} , {notifications: user.notifications})
          i++
        }

        var after = user.notifications.length

        if(before != after){
          return res.json({
            statusCode: successCode,
            message: "You Have Responses To Your Requests"
          })
        }
        else {
          return res.json({
            statusCode: unknown,
            message: "You Have No New Responses To Your Requests"
          })
        }


      
      } catch (e) {
        return res.json({
          statusCode: unknown,
          error: 'Could Not Show Notifications',
        })
      }
     }

     const cancelStillPendingRequests = async (req, res) => {
      try {

      var body = req.body.Body

       var myID = "AC6"
       var user = await staffModel.findOne({memberId: myID})

      var myRequests = user.requestLog

      if(myRequests.length == 0){
        return res.json({
          statusCode: unknown,
          error: 'You Have No Requests'
        })
      }
      var i = 0
      while(i < myRequests.length){
        var request = myRequests[i]
        if(request == body.requestId){
          var RequestFound = await requestModel.findOne({requestID: myRequests[i]})
          console.log(RequestFound.status)
          console.log(RequestFound.activeDate)

          if((RequestFound.status == requestStatus.PENDING && RequestFound.activeDate > Date.now()) || RequestFound.activeDate > Date.now()){
            await requestModel.findOneAndDelete({requestID: body.requestId})
            var index = user.requestLog.indexOf(body.requestId)
            if(index != -1){
              user.requestLog.splice(index,1)
              await staffModel.findOneAndUpdate({memberId: myID} , {requestLog: user.requestLog})
              return res.json({
                statusCode: successCode,
                error: 'Your Request Is Cancelled'
              })
              
            }
          }
          else {
            return res.json({
              statusCode: unknown,
              error: 'Your Request Could Not Be Cancelled'
            })
          }
        }

        i++
      }
     





      
      } catch (e) {
        return res.json({
          statusCode: unknown,
          error: 'Could Not Cancel Request',
        })
      }
     }

     const viewStatusOfAllSubmittedRequests = async (req, res) => {
      try {

        var body = req.body.Body
        var myID = "AC6"
        var user = await staffModel.findOne({memberId: myID})

        var submittedRequests = await requestModel.find({senderID: myID})

        if(submittedRequests.length == 0){
          return res.json({
            statusCode: unknown,
            error: 'You Did Not Submit Any Request'
          })
        }
        var results = []
        var j = 0
        var i = 0
        if(!(body.criteria == requestStatus.PENDING || body.criteria == requestStatus.ACCEPTED || body.criteria == requestStatus.REJECTED || body.criteria == "All")){
          return res.json({
            statusCode: unknown,
            error: 'Please Choose Criteria For Viewing Your Submitted Requests [All , Pending , Accepted , Rejected'
          })
        }
        if(body.criteria == "All"){
          while(i < submittedRequests.length){
              var a = await requestModel.findOne({requestID: submittedRequests[i].requestID})
              results[j] = "Request Type: " + a.requestType + " - " + "Request Id: " + a.requestID + " - " + "Status: " + a.status + " - " + "Sent To Member With ID: " + a.recieverID
              j++
            i++
          }
        }
        else if(body.criteria == requestStatus.PENDING){
          while(i < submittedRequests.length){
            if(submittedRequests[i].status == requestStatus.PENDING){
              var a = await requestModel.findOne({requestID: submittedRequests[i].requestID})
              results[j] = "Request Type: " + a.requestType + " - " + "Request Id: " + a.requestID + " - " + "Status: " + a.status + " - " + "Sent To Member With ID: " + a.recieverID

              j++
             
            }
            i++
          }
        }
        else if(body.criteria == requestStatus.ACCEPTED){
          while(i < submittedRequests.length){
            if(submittedRequests[i].status == requestStatus.ACCEPTED){
              var a = await requestModel.findOne({requestID: submittedRequests[i].requestID})
              results[j] = "Request Type: " + a.requestType + " - " + "Request Id: " + a.requestID + " - " + "Status: " + a.status + " - " + "Sent To Member With ID: " + a.recieverID

              j++
             
            }
            i++
          }

        }
        else if(body.criteria == requestStatus.REJECTED){
          while(i < submittedRequests.length){
            if(submittedRequests[i].status == requestStatus.REJECTED){
              var a = await requestModel.findOne({requestID: submittedRequests[i].requestID})
              results[j] = "Request Type: " + a.requestType + " - " + "Request Id: " + a.requestID + " - " + "Status: " + a.status + " - " + "Sent To Member With ID: " + a.recieverID

              j++
             
            }
            i++
          }
        }
        console.log("DONE")

        return res.json({
          results,
          statusCode: successCode,
          error: 'Requests Upon Criteria',
        })
      
      } catch (e) {
        return res.json({
          statusCode: unknown,
          error: 'Could Not View Requests',
        })
      }
     }

     const coordinatorViewCourseCoverage = async (req, res) => {
      try {
        //token.id
        myID="AC5"
        const instructor = await staffModel.findOne({memberId: myID})

        if(!instructor){
          return res.json({
            statusCode: accountNotFound.statusCode,
            message: accountNotFound.message,
          })
        }
        const instEmail = instructor.email


        var i = 0
        var j = 0
        allCourses = await courseModel.find()
        var coursesAssignedTo = []

        while(i<allCourses.length){
          if(allCourses[i].courseInstructors.includes(instEmail)){
            coursesAssignedTo[j] = allCourses[i]
            j++
          }
          i++
        }

        var result = []

        i = 0
        while(i < coursesAssignedTo.length){
          var course = coursesAssignedTo[i]
          var temp = []
         
          result[i] = [[course.courseName, course.courseID],course.courseCoverage]
          i++
        }

        return res.json({
          statusCode: successCode,
          result

        })
    
    
      } catch (e) {
        return res.json({
          statusCode: unknown,
          error: 'Could not view course coverage',
        })
      }
    }


    const instructorViewDepartmentStaff = async (req, res) => {
      try {
    

        const myID = "AC5"    
        console.log(myID)

        var i = 0
        var allDepartments = await departmentModel.find()
        var deptName
        console.log(allDepartments.length)

        while(i<allDepartments.length){
          if(allDepartments[i].staff.includes(myID)){
            deptName = allDepartments[i].departmentName
          }
          i++
        }

        console.log(deptName)

        const departmentFound = await departmentModel.findOne({departmentName:deptName})

        if (!departmentFound) {
          
          return res.json({
            statusCode: departmentNotFound.statusCode,
            error: departmentNotFound.message,
          })
        }
        console.log(departmentFound)

    
        var staff = departmentFound.staff
        var arr = []
        var i = 0
        for (i = 0; i<staff.length; i++){
          var accountFound = await staffModel.findOne({memberId:staff[i]})
          arr[i] = accountFound
        }


    
        console.log(accountFound)

        return res.json({
          arr,
          statusCode:successCode,
        })
    
      }
      
      catch (e) {
        return res.json({
          statusCode: unknown,
          error: 'Could not view department staff',
        })
      }
      }
    
      const instructorViewDepartmentStaffPerCourse = async (req, res) => {
        try {
    
        const myID = "AC5"    
        console.log(myID)

        var i = 0
        var allDepartments = await departmentModel.find()
        var deptName
        console.log(allDepartments.length)

        while(i<allDepartments.length){
          if(allDepartments[i].staff.includes(myID)){
            deptName = allDepartments[i].departmentName
          }
          i++
        }

        console.log(deptName)

        const departmentFound = await departmentModel.findOne({departmentName:deptName})
        console.log(departmentFound)

          if (!departmentFound) {
            
            return res.json({
              statusCode: departmentNotFound.statusCode,
              error: departmentNotFound.message,
            })
          }
          
          var courses = departmentFound.courses
          console.log(courses)

          var arr = []
          var i = 0
    
          for (i = 0; i<courses.length; i++){
    
            const course = await courseModel.findOne({courseID:courses[i]},)  
    
            if(course){
              var instructorsid = course.courseInstructors
              var coordinatorid = course.courseCoordinator
              var tasid = course.courseAssistant

              var staffid = instructorsid.concat(tasid).concat(coordinatorid)
              var profiles = []
              var j = 0

              while (j<staffid.length){
                profiles[j] = await staffModel.findOne({memberId: staffid[j]})
                j++
              }
              arr[i] = [course.courseName, profiles]
            }
            console.log(arr)

           
          }
    
          return res.json({
            statusCode:successCode,
            message:"Here are the requested data",
            arr
            
          })
    
        }
        
        catch (e) {
          return res.json({
            statusCode: unknown,
            error: 'Could not view department staff',
          })
        }
        }
    

     // Delete Course Instructor
const deleteAssignmentOFAcMember = async (req, res) => {
    try {
      const body = req.body

      const myID = "AC3"
      const member =  await staffModel.findOne({memberId: myID})
      const courses = await courseModel.find()

      myCourses = []
      var j = 0
      var i = 0
      while(i < courses.length){
        var course = courses[i]

        if(course.courseInstructors.includes(myID)){

          myCourses[j] = courses[i]

          j++
        }
        i++
      }
      if(myCourses[0] == null){
        return res.json({
          statusCode: unknown,
          error: 'You Are Not Assigned To Any Course',
        })
      }

      i = 0
      j = 0
      while(i < myCourses.length){

        var course = myCourses[i]

        if(course.courseID == body.courseID){
        while(j < course.length){
          if(course.courseAssistant.includes(body)){
            var index = indexOf(course.courseAssistant)
            if(index != -1){
              course.courseAssistant.splice(index)
              await courseModel.findOneAndUpdate({courseId: body.courseID} , {courseAssistant: course.courseAssistant},{returnOriginal: false})
              await courseNotFound.save()
            }

          }
          j++
        }
      }
      i++
      }

      console.log("DONEEEEEEEEEEEEEEEEE")

      return res.json({
        statusCode: successCode,
        message: 'Done',
      })

    
    } catch (e) {
      return res.json({
        statusCode: unknown,
        error: 'Could not delete member from the course',
      })
    }
  }

  const submitAnyTypeOfLeaves = async (req, res) => {
    try {
      var body = req.body.Body
      var myID = "AC6"
      var allCourses = await courseModel.find()
      var i = 0
      var HOD = ""
      while(i < allCourses.length){
        var course = allCourses[i]
        //Case Instructor
        if(course.courseInstructors.includes(myID)){
         var dept = await departmentModel.findOne({departmentName: course.departmentName})
         HOD = dept.departmentHead
        }
        else if(course.courseAssistant.includes(myID)){
          var dept = await departmentModel.findOne({departmentName: course.departmentName})
          HOD = dept.departmentHead
        }
        i++
      }

      if(body.requestType == requestType.COMPENSATION){
        if(body.brief == null){
          return res.json({
            statusCode: unknown,
            error: 'Compensation Leaves must Have A Brief',
          })
        }
      }
      var leaveRequest = {senderID: myID , recieverID: HOD , requestDate: Date.now() , activeDate: body.requestDate , 
        requestType: body.requestType , brief: body.brief , comments: body.comments , requestID: "w331s133"}
        await requestModel.create(leaveRequest)

        var receiver = await staffModel.findOne({memberId: HOD})
console.log(HOD)
        receiver.requestLog.push(leaveRequest.requestID)
        console.log("HERE")

        await staffModel.findOneAndUpdate({memberId: HOD} , {requestLog: receiver.requestLog})


      return res.json({
        statusCode: successCode,
        error: 'Request Sent To Your Head Of Department',
      })


    } catch (e) {
      return res.json({
        statusCode: unknown,
        error: 'Could Not Send Request',
      })
    }
  }

  

  const hodAcceptRequest = async (req, res) => {
    try {
      const myID = "AC6"
      const body = req.body.Body

      const requestFound = await requestModel.findOne({requestID: body.requestId})

      if(!requestFound){
        return res.json({
          statusCode: requestNotFound,
          error: requestNotFound.message,
        })
      }
      //Leaves Start
      //Accidental
      if(requestFound.requestType == requestType.ACCIDENTAL){
        var senderId = requestFound.senderID
        var sender = await staffModel.findOne({memberId: senderId})
        if(sender.accidentalLeaveBalance < 6){

        var senderAttendanceLog = await attendanceLogModel.findOne({memberId: senderId})
        if(senderAttendanceLog.missingDays.includes(requestFound.activeDate)){
          if(requestFound.requestDate < requestFound.activeDate + 3){
            requestFound.status = requestStatus.REJECTED
          }

        }
        await requestModel.findOneAndUpdate({requestID: requestFound.requestID} , {status: requestStatus.ACCEPTED})
        sender.notifications.push("Request: " + requestFound.requestType + " - RequestID: - " + requestFound.requestID + " is " + requestFound.ACCEPTE)
        sender.accidentalLeaveBalance--
        await staffModel.findOneAndUpdate({memberId: senderId} , {notifications: sender.notifications , accidentalLeaveBalance: sender.accidentalLeaveBalance})
        var index = senderAttendanceLog.missingDays.indexOf(requestFound.activeDate)
        if(index != -1){
          senderAttendanceLog.missingDays.splice(index , 1)
        }
        await attendanceLogModel.findOneAndUpdate({memberId: senderId} , {missingDays: senderAttendanceLog.missingDays})
        sender.accidentalLeaveBalance--
      }
      }
      //Annual
      else if(requestFound.requestType == requestType.ANNUAL){
        var senderId = requestFound.senderID
        var sender = await staffModel.findOne({memberId: senderId})
      }
      //Compensation
      else if(requestFound.requestType == requestType.COMPENSATION){  
        var senderId = requestFound.senderID
        var sender = await staffModel.findOne({memberId: senderId})
        var senderAttendanceLog = await attendanceLogModel.findOne({memberId: senderId})

        if(senderAttendanceLog.missingDays.includes(requestFound.activeDate)){
          var index = senderAttendanceLog.missingDays.indexOf(requestFound.requestID)
          if(index != -1){
            senderAttendanceLog.missingDays.splice(index , 1)
            var memberDayOff = sender.daysOff[0]
            if(senderAttendanceLog.attendedDays.includes(memberDayOff)){
              await requestModel.findOneAndUpdate({requestID: requestFound.requestID} , {status: requestStatus.ACCEPTED})
              sender.notifications.push("Request: " + requestFound.requestType + " - RequestID: - " + requestFound.requestID + " is " + requestFound.ACCEPTED)
              await staffModel.findOneAndUpdate({memberId: senderId} , {notifications: sender.notifications})
              await attendanceLogModel.findOneAndUpdate({memberId: senderId} , {missingDays: senderAttendanceLog.missingDays})

            }

          }
        }
      }
      //Maternity
      else if(requestFound.requestType == requestType.MATERNITY){
        var senderId = requestFound.senderID
        var sender = await staffModel.findOne({memberId: senderId})
      }
      //Sick
      else if(requestFound.requestType == requestType.SICK){
        var senderId = requestFound.senderID
        var sender = await staffModel.findOne({memberId: senderId})
      
        var senderAttendanceLog = await attendanceLogModel.findOne({memberId: senderId})
        if(senderAttendanceLog.missingDays.includes(requestFound.activeDate)){
          if(requestFound.requestDate < requestFound.activeDate + 3){
            requestFound.status = requestStatus.REJECTED
          }

        }
        await requestModel.findOneAndUpdate({requestID: requestFound.requestID} , {status: requestStatus.ACCEPTED})
        sender.notifications.push("Request: " + requestFound.requestType + " - RequestID: - " + requestFound.requestID + " is " + requestFound.ACCEPTED)
        await staffModel.findOneAndUpdate({memberId: senderId} , {notifications: sender.notifications})
        var index = senderAttendanceLog.missingDays.indexOf(requestFound.activeDate)
        if(index != -1){
          senderAttendanceLog.missingDays.splice(index , 1)
        }
        await attendanceLogModel.findOneAndUpdate({memberId: senderId} , {missingDays: senderAttendanceLog.missingDays})
      
      }
      //Leaves End
      else if(requestFound.requestType == requestType.REPLACEMENT){
        return res.json({
          statusCode: unknown,
          error: 'Replacements Should Occur Only Between Instructors Or Teacher Assistants',
        })
      }
      //Change Day Off
      else if(requestFound.requestType == requestType.CHANGEDAYOFF){
        var senderId = requestFound.senderID
        var sender = await staffModel.findOne({memberId: senderId})
        if(body.brief == "Saturday" || body.brief == "Sunday" || body.brief == "Monday" ||
           body.brief == "Tuesday" || body.brief == "Wednesday" || body.brief == "Thursday"){
          sender.daysOff.splice(0)
          sender.daysOff.push(body.brief)
        }
        else{
          return res.json({
            statusCode: unknown,
            error: 'For Change Day Off Requests, Member Should Pass His Desired Day Off in The Brief Field',
          })
        }
        requestFound.status = requestStatus.ACCEPTED
        sender.notifications.push("Request: " + requestFound.requestType + " - RequestID: - " + requestFound.requestID + " is " + requestFound.status)
        var index = sender.requestLog.indexOf(requestFound.requestID)
        if(index != -1){
          sender.requestLog.splice(index,1)
        }
        await staffModel.findOneAndUpdate({memberId: senderId} , {notifications: sender.notifications , daysOff:sender.daysOff , requestLog: sender.requestLog})
        await requestModel.findOneAndUpdate({reuestID: requestFound.requestID})

       
      }
      //Slot Linking
      else if(requestFound.requestType == requestType.SLOTLINKING){
        return res.json({
          statusCode: unknown,
          error: 'Slot Linking Requests Are Delegated To Course Coordinator',
        })
      }

    } catch (e) {
      return res.json({
        statusCode: unknown,
        error: 'Could Not Accept Request',
      })
    }
  }

  const instructorDeleteCourseAssignment = async (req, res) => {
    try {

      myID = "AC5" //ahmad

      const body = req.body.Body
      const taID = body.taID
      const courseID = body.courseID

      const ta = await staffModel.findOne({memberId: taID})
      console.log(ta)

      if(!ta){
        return res.json({
          statusCode: accountNotFound.statusCode,
          message: accountNotFound.message,
        })
      }

      const course = await courseModel.findOne({courseID: courseID})
      console.log(course)
      console.log(course.slots.length)

      if(!course){
        return res.json({
          statusCode: courseNotFound.statusCode,
          message: courseNotFound.message,
        })
      }

      if(!(course.courseInstructors.includes(myID))){
        return res.json({
          statusCode: "9990",
          message: "This course does not belong to this Instructor",
        })
      }
      console.log("aaa")


      if(!(course.courseAssistant.includes(taID))){
        return res.json({
          statusCode: "9991",
          message: "This course is not teached by this Assistant",
        })
      }
      console.log("bbb")

      var array = course.courseAssistant
      var index = array.indexOf(taID)

      console.log(array)
      console.log(index)

      if(index==-1){
          return res.json({
             statusCode: "9992",
             message: 'This course is not teached by this Assistant', 
          })
      }
      array.splice(index)
      console.log(array)

      await courseModel.findOneAndUpdate({courseID: courseID} , {courseAssistant: array})
      // console.log("ccc")
      // const course2 = await courseModel.findOne({courseID: courseID})
      // console.log(course2.courseAssistant)

      var i = 0
      console.log(i)
      while (i<course.slots.length){
      console.log("12345")

        const slot = await slotModel.findOne({slotID: course.slots[i]})

        if (slot.acID == taID){
          slot.acID = ""
          await slotModel.findOneAndUpdate({slotID: slot.slotID} , {acID: slot.acID},{returnOriginal: false})
          await slot.save()
        }
        i++
      }

      return res.json({
        statusCode: successCode,
        error: 'Deletion is completed',
      })

    } catch (e) {
      res.json({
        statusCode: unknown,
        error: 'Could not delete assignment ',
      })
    }
   }


  




  
   const instructorUpdateCourseAssignment = async (req, res) => {
    try {

      myID = "AC5" //ahmad

      const body = req.body.Body
      const taID1 = body.taID1 //removed
      const taID2 = body.taID2 //added
      const courseID = body.courseID

      const ta1 = await staffModel.findOne({memberId: taID1})
      const ta2 = await staffModel.findOne({memberId: taID2})
      console.log(ta1)
      console.log(ta2)

      if(!ta1){
        return res.json({
          statusCode: accountNotFound.statusCode,
          message: accountNotFound.message + "First TA",
        })
      }

      if(!ta2){
        return res.json({
          statusCode: accountNotFound.statusCode,
          message: accountNotFound.message + "Second TA",
        })
      }

      const course = await courseModel.findOne({courseID: courseID})
      console.log(course)
      console.log(course.slots.length)

      if(!course){
        return res.json({
          statusCode: courseNotFound.statusCode,
          message: courseNotFound.message,
        })
      }

      if(!(course.courseInstructors.includes(myID))){
        return res.json({
          statusCode: "9990",
          message: "This course does not belong to this Instructor",
        })
      }
      console.log("aaa")

      if(!(course.courseAssistant.includes(taID1))){
        return res.json({
          statusCode: "9991",
          message: "This course is not teached by the first Assistant",
        })
      }

      console.log("bbb")

      var array = course.courseAssistant
      var index = array.indexOf(taID1)

      console.log(array)
      console.log(index)

      if(index==-1){
          return res.json({
             statusCode: "9992",
             message: 'This course is not teached by this Assistant', 
          })
      }
      course.courseAssistant[index] = taID2
      console.log(course.courseAssistant)

      await courseModel.findOneAndUpdate({courseID: courseID} , {courseAssistant: array})
      console.log("ccc")
      const course2 = await courseModel.findOne({courseID: courseID})
      console.log(course2.courseAssistant)

      var i = 0
      console.log(i)

      while (i<course.slots.length){
      console.log("12345")

        const slot = await slotModel.findOne({slotID: course.slots[i]})
         console.log(slot.slotID)

          slot.acID = taID2
          await slotModel.findOneAndUpdate({slotID: slot.slotID} , {acID: slot.acID},{returnOriginal: false})
          await slot.save()
        
        i++
      }

      console.log(course)

      return res.json({
        statusCode: successCode,
        error: 'Update is completed',
      })

    } catch (e) {
      res.json({
        statusCode: unknown,
        error: 'Could not update assignment',
      })
    }
   }


   const coordinatorRejectSlotLinkingRequest = async (req, res) => {
    try {

      const memberID  = "AC6"
      const RequestID = req.body.Body.requestID //body
      
      console.log(RequestID)
      const requestsFound = await requestModel.findOne({requestID:RequestID})

      if (!requestsFound) {
        return res.json({
          statusCode: noRequest.statusCode,
          error: noRequest.message,
        })
      }

      console.log(requestsFound)

      const slot = await slotModel.findOne({slotID:requestsFound.slotID})

      if(!slot){
        return res.json({
          statusCode: slotDoesnotExist.statusCode,
          error: slotDoesnotExist.message,
        })
      }
      console.log(slot)

      const coordinator = await staffModel.findOne({memberId:memberID})

      if (!(coordinator.requestLog.includes(RequestID))){
        return res.json({
          statusCode: requestNotFound.statusCode,
          error: requestNotFound.message,
      })
    }
    console.log(coordinator)

    console.log(requestsFound.recieverID)

      if(requestsFound.recieverID == memberID ){
        console.log(requestsFound.requestType)

        if(requestsFound.requestType == requestType.SLOTLINKING){
          console.log(requestsFound.status)

          if(requestsFound.status == requestStatus.PENDING){

           requestsFound.status = requestStatus.REJECTED
           await requestModel.findOneAndUpdate({requestID: RequestID} , {status: requestsFound.status}) 
           await requestsFound.save()

            res.json({
              statusCode: 0 ,
              message:"Request Rejected successfully" })
        }else {
          res.json({
            message : "This request has already been responded to" //Testing purposes 
          })
        }
      }else{ 
        return res.json({
        statusCode: "9898",
        error: "This request is sent to the wrong staff member",
      })

      }
    } else{
      return res.json({
        statusCode: "8989",
        error: "This is sent to the wrong coordiantor",
      })
    }

    } catch (e) {
      console.log(e)
      res.json({
        statusCode: unknown,
        error: 'Could not reject slot-linking request',
      })
    }
   }

   const coordinatorAcceptSlotLinkingRequest = async (req, res) => {
    try {

      const memberID  = "AC6"
      const RequestID = req.body.Body.requestID //body
      
      console.log(RequestID)
      const requestsFound = await requestModel.findOne({requestID:RequestID})

      if (!requestsFound) {
        return res.json({
          statusCode: noRequest.statusCode,
          error: noRequest.message,
        })
      }

      const senderID = requestsFound.senderID
      console.log(requestsFound)

      const slot = await slotModel.findOne({slotID:requestsFound.slotID})

      if(!slot){
        return res.json({
          statusCode: slotDoesnotExist.statusCode,
          error: slotDoesnotExist.message,
        })
      }
      console.log(slot)

      const coordinator = await staffModel.findOne({memberId:memberID})

      if (!(coordinator.requestLog.includes(RequestID))){
        return res.json({
          statusCode: requestNotFound.statusCode,
          error: requestNotFound.message,
      })
    }


    if (slot.acID == senderID){
      return res.json({
        statusCode: "4004",
        error: "Already yours ya moghafal",
    })
    }
    
    console.log(coordinator)

    console.log(requestsFound.recieverID)

      if(requestsFound.recieverID == memberID ){
        console.log(requestsFound.requestType)

        if(requestsFound.requestType == requestType.SLOTLINKING){
          console.log(requestsFound.status)

          if(requestsFound.status == requestStatus.PENDING){

           requestsFound.status = requestStatus.ACCEPTED
           await requestModel.findOneAndUpdate({requestID: RequestID} , {status: requestsFound.status}) 
           await requestsFound.save()

          await slotModel.findOneAndUpdate({slotID: requestsFound.slotID} , {acID: senderID}) 
          await slot.save()

            res.json({
              statusCode: 0 ,
              message:"Request Accepted successfully" })
        }else {
          res.json({
            message : "This request has already been responded to" //Testing purposes 
          })
        }
      }else{ 
        return res.json({
        statusCode: "9898",
        error: "This request is sent to the wrong staff member",
      })

      }
    } else{
      return res.json({
        statusCode: "8989",
        error: "This is sent to the wrong coordiantor",
      })
    }

    } catch (e) {
      console.log(e)
      res.json({
        statusCode: unknown,
        error: 'Could not accept slot-linking request',
      })
    }
   }  

   const updateCourseInstructor = async (req, res) => {
    try {
      const courseFound = await courseModel.findOne({courseName: req.body.Body.courseID})
      const accountFound2 = await staffModel.findOne({memberId: req.body.Body.memberId2})
      const accountFound1 = await staffModel.findOne({memberId: req.body.Body.memberId1})
  
      if (!courseFound) {
        
        return res.json({
          statusCode: courseNotFound.statusCode,
          error: courseNotFound.message,
        })
      }
      if (!accountFound2) {
  
        return res.json({
          statusCode: memberNotFound.statusCode,
          error: req.body.Body.memberId2 + " " +memberNotFound.message,
        })
      }
  
      if (!accountFound1) {
  
        return res.json({
          statusCode: memberNotFound.statusCode,
          error: req.body.Body.memberId1 + ": " +memberNotFound.message,
        })
      }
  
  
      if(!(courseFound.courseInstructors.includes(accountFound.memberId1))){
        return res.json({
          statusCode: "9080",
          message: "This instructor does not teach this course"
      })
    }
  
      if(!(courseFound.courseInstructors.includes(req.body.Body.memberId2))){
  
        var array = courseFound.courseInstructors
        var index = array.indexOf(accountFound.memberId)
  
        console.log(array)
        console.log(index)
  
        if(index==-1){
            return res.json({
               statusCode: InstructorDoesnotExist.statusCode,
               message: InstructorDoesnotExist.message, 
            })
          
        }
        array.splice(index)
        console.log(array)
  
        console.log(courseFound.courseInstructors)
  
        courseFound.courseInstructors.push(req.body.Body.courseID)
  
        console.log(courseFound.courseInstructors)
  
        await courseModel.findOneAndUpdate({courseID:req.body.Body.courseID},{courseInstructors: courseFound.courseInstructors})
        await courseFound.save()
  
      }
      else {
        return res.json({
          statusCode: instructorAlreadyAssigned.statusCode,
          error: instructorAlreadyAssigned.message,
        })
      }
     
      return res.json({
        statusCode: successCode,
        message: 'Instructors Assigned To This Course',
      })
    } catch (e) {
      console.log(e)
      res.json({
        statusCode: unknown,
        error: 'Could Not Assign',
      })
    }
  }

  module.exports={
    deleteCourseInstructor,
    assignCourseInstructor,
    viewDaysOff,
    viewRequests,
    viewCourseCoverage,
    hodViewDepartmentStaff,
    hodViewDepartmentStaffPerCourse,
    viewTeachingAssignments,
    viewSchedule,
    viewReplacementRequests,
    sendReplacementRequests,
    hodRejectRequest,
    coordinatorAddCourseSlots,
    coordinatorUpdateCourseSlots,
    coordinatorDeleteCourseSlots,
    coordinatorViewSlotLinking,
    sendSlotLinkingRequest,
    viewSlotAssignments,
    assignCourseCoordinator,
    assignAcMemberToUnassignedSlot,
    changeDayOff,
    showNotifications,
    cancelStillPendingRequests,
    viewStatusOfAllSubmittedRequests,
    coordinatorViewCourseCoverage,
    instructorViewDepartmentStaff,
    instructorViewDepartmentStaffPerCourse,
    deleteAssignmentOFAcMember,
    submitAnyTypeOfLeaves,
    hodAcceptRequest,
    instructorDeleteCourseAssignment,
    instructorUpdateCourseAssignment,
    updateCourseInstructor,
    coordinatorRejectSlotLinkingRequest,
    coordinatorAcceptSlotLinkingRequest,


  }