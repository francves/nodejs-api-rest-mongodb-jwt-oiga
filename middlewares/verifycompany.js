'use strict'

//Middleware to verify if the user is company

exports.isCompany = (req, res, next) => {
	if(!req.headers.role){
		return res.status(403).send({ message: 'You are not a company' })
	}
	if(req.headers.role == '1') {
			return res.status(403).send({ message: 'You are not a company' })
	}
	next()
}