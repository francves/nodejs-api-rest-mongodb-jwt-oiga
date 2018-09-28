'use strict'
// We load the mongoose module
const mongoose =  require('mongoose')
// We will use the schemes
const Schema = mongoose.Schema
// We create the object of the scheme and its attributes
const OrderSchema = Schema({
	userId: String,
	productId: String,
	quantity: Number,
	totalAmount: Number,

}, {
	timestamps: true //For createAt and updateAt
})
// We export the model to use it in other files
module.exports = mongoose.model('Order', OrderSchema)