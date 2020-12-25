const jwt = require('jsonwebtoken')

const { secretOrKey } = require('../../config/keys')
const { breach } = require('../constants/statusCodesEnum')

const verifyToken = (req, res, next) => {
  return jwt.verify(
    req.headers.authorization,
    secretOrKey,
    (err, authorizedData) => {
      if (!err) {
        const header = req.headers.authorization
        const token = header
        req.data = authorizedData
        req.token = token
        return next()
      }
      console.log(err)

      return res.json({ statusCode: breach.statusCode, error: breach.message })
    }
  )
}
module.exports = {
  verifyToken,
}