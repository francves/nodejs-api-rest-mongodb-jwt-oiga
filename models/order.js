'use strict'
// We load the mongoose module
var mongoose =  require('mongoose');
// We will use the schemes
var Schema = mongoose.Schema;
// We create the object of the scheme and its attributes
var OrderSchema = Schema({
    name: String,
    price: String,
}, {
	timestamps: true //For createAt and updateAt
});
// We export the model to use it in other files
module.exports = mongoose.model('Order', OrderSchema);