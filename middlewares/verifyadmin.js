'use strict'

//Middleware to verify if the user is admin

exports.isAdmin = (req, res, next) => {
  if(req.headers.role == '0') {
    return res.status(403).send({ message: 'You do not have admin level' })
  }
  next()
}