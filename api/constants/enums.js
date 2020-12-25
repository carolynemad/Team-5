const staffMemberType = {
    HOD: 'Head Of Department',
    INSTRUCTOR: 'Course Instructor',
    COORDINATOR: 'Course Coordinator',
    HR: 'HR Member',
    TA: 'Teacher Assistant',
    UNASSIGNED: 'Unassigned'
  }

  const accountType = {
    HR: 'HR Member',
    ACADEMIC: 'Academic Member',
    
  }

  const gender = {
    MALE: 'Male',
    FEMALE: 'Female',
  }

  const requestStatus={
    PENDING: 'Pending',
    ACCEPTED: 'Accepted',
    REJECTED:'Rejected',
  }
  
  const requestType={
    // LEAVE:'Leave',
    ACCIDENTAL: "Accidental Leave",
    ANNUAL:"Annual Leave",
    COMPENSATION: "Compensation Leave",
    MATERNITY: "Maternity Leave",
    SICK: "Sick Leave",
    REPLACEMENT:"Replacement",
    CHANGEDAYOFF: "ChangeDayOff",
    SLOTLINKING:"SlotLinking",
  }

  const slotNumber={
    FIRST:'First',
    SECOND:"Second",
    THIRD: "Third",
    FORTH:"Forth",
    FIFTH:"Fifth",
  }

  const slotDay={
    SATURDAY:'Saturday',
    SUNDAY:"Sunday",
    MONDAY: "Monday",
    TUESDAY:"Tuesday",
    WEDNESDAY:"Wednesday",
    THURSDAY: "Thursday",
  }

  const slotType={
    LECTURE:'Lecture',
    TUTORIAL:"Tutorial",
    LAB: "Lab",
  }

  

  const months={
    JAN:'01',
    FEB:"02",
    MAR:"03",
    APR:'04',
    MAY:"05",
    JUN:"06",
    JUL:'07',
    AUG:"08",
    SEP:"09",
    OCT:'10',
    NOV:"11",
    DEC:"12",
  }
 
  module.exports = {
    staffMemberType,
    accountType,
    gender,
    requestStatus,
    requestType,
    slotType,
    slotDay,
    slotNumber,
    months
  }
  