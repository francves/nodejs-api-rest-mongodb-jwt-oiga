'use strict'

const express = require('express')
// We loaded the controller
const controller = require('../controllers/product');
const api = express.Router()
// Parameters
const pathProducts = '/products';
const idProduct = ':productId';

//Retrieve all products
api.get(`${pathProducts}`, controller.findAll)
// Retrieve a single product with productId
api.get(`${pathProducts}/${idProduct}`, controller.findOne)
//Create a new product
api.post(`${pathProducts}`, controller.create)
//Update a product with productId
api.put(`${pathProducts}/${idProduct}`, controller.update)
// Delete a product with productId
api.delete(`${pathProducts}/${idProduct}`, controller.delete)

module.exports = api