'use strict'

const express = require('express')
// We loaded the controllers
const controllerProduct = require('../controllers/product');
const controllerOrders = require('../controllers/order');
const api = express.Router()
// Parameters
const pathProducts = '/products';
const idProduct = ':productId';
const pathOrders = '/orders';
const idOrders = ':orderId';

//PRODUCTS ROUTES
//Retrieve all products
api.get(`${pathProducts}`, controllerProduct.findAll)
// Retrieve a single product with productId
api.get(`${pathProducts}/${idProduct}`, controllerProduct.findOne)
//Create a new product
api.post(`${pathProducts}`, controllerProduct.create)
//Update a product with productId
api.put(`${pathProducts}/${idProduct}`, controllerProduct.update)
// Delete a product with productId
api.delete(`${pathProducts}/${idProduct}`, controllerProduct.delete)

//ORDERS ROUTES
//Retrieve all orders
api.get(`${pathOrders}`, controllerOrders.findAll)
// Retrieve a single order with orderId
api.get(`${pathOrders}/${idOrders}`, controllerOrders.findOne)
//Create a new order
api.post(`${pathOrders}`, controllerOrders.create)
//Update a order with orderId
api.put(`${pathOrders}/${idOrders}`, controllerOrders.update)
// Delete a order with orderId
api.delete(`${pathOrders}/${idOrders}`, controllerOrders.delete)

module.exports = api