'use strict'

const express = require('express')
// We loaded the controllers
const controllerProduct = require('../controllers/product')
const controllerOrders = require('../controllers/order')
const controllerUsers = require('../controllers/user')
const api = express.Router()
// Parameters
const pathProducts = '/products'
const idProduct = ':productId'
const pathOrders = '/orders'
const idOrders = ':orderId'
//Middlewares
const auth = require('../middlewares/auth')
const verifyAdmin = require('../middlewares/verifyadmin')
const verifyCompany = require('../middlewares/verifycompany')

//PRODUCTS ROUTES
//Retrieve all products
api.get(`${pathProducts}`, auth.isAuth, controllerProduct.findAll) //Admin and Company can look and list products
// Retrieve a single product with productId
api.get(`${pathProducts}/${idProduct}`, auth.isAuth, controllerProduct.findOne) //Admin and Company can look and list products
//Create a new product
api.post(`${pathProducts}`, verifyAdmin.isAdmin, controllerProduct.create) //Admin can create products
//Update a product with productId
api.put(`${pathProducts}/${idProduct}`, verifyAdmin.isAdmin, controllerProduct.update) //Admin can update products
// Delete a product with productId
api.delete(`${pathProducts}/${idProduct}`, verifyAdmin.isAdmin, controllerProduct.delete) //Admin can delete products

//ORDERS ROUTES
//Retrieve all orders
api.get(`${pathOrders}`, verifyAdmin.isAdmin, controllerOrders.findAll) //Admin can list orders
// Retrieve a single order with orderId
api.get(`${pathOrders}/${idOrders}`, verifyCompany.isCompany, controllerOrders.findOne) //Company can list orders that belong to it
//Create a new order
api.post(`${pathOrders}`, verifyCompany.isCompany, controllerOrders.create) //Company can create orders
//Update a order with orderId
api.put(`${pathOrders}/${idOrders}`, verifyAdmin.isAdmin, controllerOrders.update) //Admin can update orders
// Delete a order with orderId
api.delete(`${pathOrders}/${idOrders}`, verifyAdmin.isAdmin, controllerOrders.delete) //Admin can delete orders

//USER ROUTES
api.post('/signup', controllerUsers.signUp) //Register User
api.post('/signin', controllerUsers.signIn) //Login User

module.exports = api