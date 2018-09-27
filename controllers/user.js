'use strict'
// We load the models for later use
const userModel = require('../models/user')
const service = require('../services')

//Register User
exports.signUp = (req, res) => {
  const user = new userModel({
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
    role: '0' //Users not admin for default
  })

  user.save((err) => {
    if (err) return res.status(500).send({ message: `Error creating the user: ${err}` })

    return res.status(201).send({ token: service.createToken(user) })
  })
}

//Login User
exports.signIn = (req, res) => {
  userModel.find({ email: req.body.email }, (err, user) => {
    if (err) return res.status(500).send({ message: err })
    if (!user) return res.status(404).send({ message: 'There is no user' })

    req.user = user
    res.status(200).send({
      message: 'You have successfully logged in',
      token: service.createToken(user)
    })
  })
}