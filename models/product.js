'use strict'
// We load the mongoose module
const mongoose =  require('mongoose')
// We will use the schemes
const Schema = mongoose.Schema
// We create the object of the scheme and its attributes
const ProductSchema = Schema({
	name: String,
	price: String,
}, {
	timestamps: true //For createAt and updateAt
})
// We export the model to use it in other files
module.exports = mongoose.model('Product', ProductSchema)