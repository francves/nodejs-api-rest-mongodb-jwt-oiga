'use strict'

const jwt = require('jwt-simple')
const moment = require('moment')
const config = require('../config')

exports.createToken = (user) => {
	const payload = {
		sub: user._id,
		iat: moment().unix(),
		exp: moment().add(14, 'days').unix()
	}

	return jwt.encode(payload, config.SECRET_TOKEN)
}

exports.decodeToken = (token) => {
	const decoded = new Promise((resolve, reject) => {
		try {
			const payload = jwt.decode(token, config.SECRET_TOKEN)

			if (payload.exp <= moment().unix()) {
				reject({
					status: 401,
					message: 'The token has expired'
				})
			}
			resolve(payload.sub)
		} catch (err) {
			reject({
				status: 500,
				message: 'Invalid Token'
			})
		}
	})

	return decoded
}