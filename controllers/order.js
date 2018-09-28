'use strict'
// We load the models for later use
const orderModel = require('../models/order')

// Create and Save a new Order
exports.create = (req, res) => {
	// Validate request
	if(!req.body.productId) {
		return res.status(400).send({
			message: 'Order productId can not be empty'
		})
	}

	// Create a Order
	const order = new orderModel({
		productId: req.body.productId, 
		userId: req.body.userId,
		quantity: req.body.quantity,
		totalAmount: req.body.totalAmount,
	})

	// Save Order in the database
	order.save()
		.then(data => {
			res.send(data)
		}).catch(err => {
			res.status(500).send({
				message: err.message || 'Some error occurred while creating the Order.'
			})
		})
}

// Retrieve and return all orders from the database.
exports.findAll = (req, res) => {
	orderModel.find()
		.then(orders => {
			res.send(orders)
		}).catch(err => {
			res.status(500).send({
				message: err.message || 'Some error occurred while retrieving orders.'
			})
		})
}

// Find orders that belong to the user with the id
exports.findOne = (req, res) => {
	orderModel.find({userId: req.params.userId})
		.then(order => {
			if(!order) {
				return res.status(404).send({
					message: 'Order not found with user id ' + req.params.userId
				})
			}
			res.send(order)
		}).catch(err => {
			if(err.kind === 'ObjectId') {
				return res.status(404).send({
					message: 'Order not found with user id ' + req.params.userId
				})
			}
			return res.status(500).send({
				message: 'Error retrieving order with user id ' + req.params.userId
			})
		})
}

// Update a order identified by the orderId in the request
exports.update = (req, res) => {
	// Validate Request
	if(!req.body.productId) {
		return res.status(400).send({
			message: 'Order productId can not be empty'
		})
	}

	// Find order and update it with the request body
	orderModel.findByIdAndUpdate(req.params.orderId, {
		productId: req.body.productId, 
		userId: req.body.userId,
		quantity: req.body.quantity,
		totalAmount: req.body.totalAmount,
	}, {new: true})
		.then(order => {
			if(!order) {
				return res.status(404).send({
					message: 'Order not found with id ' + req.params.orderId
				})
			}
			res.send(order)
		}).catch(err => {
			if(err.kind === 'ObjectId') {
				return res.status(404).send({
					message: 'Order not found with id ' + req.params.orderId
				})
			}
			return res.status(500).send({
				message: 'Error updating order with id ' + req.params.orderId
			})
		})
}

// Delete a order with the specified noteId in the request
exports.delete = (req, res) => {
	orderModel.findByIdAndRemove(req.params.orderId)
		.then(order => {
			if(!order) {
				return res.status(404).send({
					message: 'Order not found with id ' + req.params.orderId
				})
			}
			res.send({message: 'Order deleted successfully!'})
		}).catch(err => {
			if(err.kind === 'ObjectId' || err.name === 'NotFound') {
				return res.status(404).send({
					message: 'Order not found with id ' + req.params.orderId
				})
			}
			return res.status(500).send({
				message: 'Could not delete order with id ' + req.params.orderId
			})
		})
}