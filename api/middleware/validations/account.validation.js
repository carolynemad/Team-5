const Joi = require('joi')
const PasswordComplexity = require('joi-password-complexity')
const { validationError } = require('../../constants/statusCodesEnum')
const { staffMemberType, accountType, gender } = require('../../constants/enums')


const validateLogIn = (req, res, next) => {
    const schema = Joi.object({
      Account: Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
      }),
    })
    const isValid = Joi.validate(req.body, schema)
    if (isValid.error) {
      return res.json({
        statusCode: validationError,
        error: isValid.error.details[0].message,
      })
    }
    return next()
  }




  const validateUpdateProfile = (req, res, next) => {
    const schema = Joi.object({
      Account: Joi.object({
        memberId: Joi.string().min(5).required(),
        gender: Joi.string().valid([gender.MALE, gender.FEMALE]),
        birthDate: Joi.date(),
        address: Joi.string().min(3).required(),
        salary: Joi.number(),
      }),
    })
    const isValid = Joi.validate(req.body, schema)
    if (isValid.error) {
      return res.json({
        statusCode: validationError,
        error: isValid.error.details[0].message,
      })
    }
    return next()
  }

  const validateResetPassword = (req, res, next) => {
    const complexityOptions = {
      min: 8,
      max: 255,
      lowerCase: 1,
      upperCase: 1,
      numeric: 1,
      symbol: 0,
      requirementCount: 8,
    }
    const schema = {
      Account: Joi.object({ id: Joi.string().required() }).required(),
      Credentials: Joi.object({
        oldPassword: Joi.string().required(),
        newPassword: new PasswordComplexity(complexityOptions).required(),
      }).required(),
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

  const validateChangePassword = (req, res, next) => {
    const complexityOptions = {
      min: 8,
      max: 255,
      lowerCase: 1,
      upperCase: 1,
      numeric: 1,
      symbol: 0,
      requirementCount: 8,
    }
    const schema = Joi.object({
      Account: Joi.object({
        email: Joi.string().email().required(),
        memberId: Joi.string().min(5).required(),
        newPassword: new PasswordComplexity(complexityOptions).required(),
        
      }),
    })
    const isValid = Joi.validate(req.body, schema)
    if (isValid.error) {
      return res.json({
        statusCode: validationError,
        error: isValid.error.details[0].message,
      })
    }
    return next()
  }

  module.exports = {
   validateLogIn,
   validateUpdateProfile,
   validateResetPassword,
   validateChangePassword
   
  }