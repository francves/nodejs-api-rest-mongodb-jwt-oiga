'use strict'

const assert = require('assert')
const supertest = require('supertest')
const app = require('../app.js')

const request = supertest('http://localhost:3000')

let token = 'token value' //Token for tests that require authorization
let productIdTemp = '' // To obtain product through its id
let userIdTemp = 'User' + Math.round(Math.random() * 10000000) //Para crear ordenes de compra con un único usuario
let orderIdTemp = '' // To obtain order through your id


//Test to access endpoints without authorization
describe('Access to Endpoints without authorization', () => {
 	it('This test must return status 403 Forbidden for the Endpoint /api/products', (done) => {
 		request.get('/api/products')
 		.expect(403,done)
 	})
 	it('This test must return status 403 Forbidden for the Endpoint /api/orders', (done) => {
 		request.get('/api/orders')
 		.expect(403,done)
 	})
})
//Test to register users
describe('User Registration', () => {
 	it('This test must register users, obtain the token and status 201', (done) => {
 		request.post('/api/signup')
 			.send({
 				username: 'fran' + Math.round(Math.random() * 10000000), 
 				password: '123456', 
 				email: 'test' + Math.round(Math.random() * 10000000) +'@test.com', 
 				role: '0'
 			})
 			.expect(201)
 			.end((err, res) => {
 				token = res.body.token
 				console.log(res.body.token)
 				done()
 			})
 	})
})

//Test for products endpoint
describe('Access to product endpoint with authorization', () => {
	describe('Access to product endpoint with administrator role', () => {
		it('This test must return the status 200 ok for the Endpoint /api/products with a get request', (done) => {
 			request.get('/api/products')
 			.set('Authorization', 'Bearer ' + token)
 			.set('role', '1')
 			.expect(200,done)
 		})
 		it('This test should create a product with the endpoint /api/products with a post request', (done) => {
			request.post('/api/products')
				.set('Authorization', 'Bearer ' + token)
				.set('role', '1')
				.send({
					name: 'Apple' + Math.round(Math.random() * 10000000),
					price: + Math.round(Math.random() * 1000)
				})
				.expect(200)
 				.end((err, res) => {
					productIdTemp = res.body._id
 					done()
 				})
		})
		it('This test must obtain the product created with the previous test through its id with a get request and status 200', (done) => {
			request.get('/api/products/'+ productIdTemp)
				.set('Authorization', 'Bearer ' + token)
				.set('role', '1')
 				.expect(200)
 				.end((err, res) => {
 					console.log('New product: ')
 					console.log(res.body)
 					done()
 				})
		})
		it('This test must update the product created with the previous test through its id with a put request and obtain status 200', (done) => {
			request.put('/api/products/'+ productIdTemp)
				.set('Authorization', 'Bearer ' + token)
				.set('role', '1')
				.send({
					name: 'Product Updated' + Math.round(Math.random() * 10000000),
					price: + Math.round(Math.random() * 1000)
				})
 				.expect(200)
 				.end((err, res) => {
 					console.log('Product details updated: ')
 					console.log(res.body)
 					done()
 				})
		})
		it('This test must eliminate the updated product with the previous test through its id with a delete request and obtain status 200', (done) => {
			request.delete('/api/products/'+ productIdTemp)
				.set('Authorization', 'Bearer ' + token)
				.set('role', '1')
 				.expect(200)
 				.end((err, res) => {
 					console.log(res.body.message)
 					done()
 				})
		})	
	})
	describe('Access to product endpoint with company role', () => {
		it('This test must return the status 200 ok for the Endpoint /api/products with a get request', (done) => {
 			request.get('/api/products')
 			.set('Authorization', 'Bearer ' + token)
 			.set('role', '0')
 			.expect(200,done)
 		})
 		it('This test should yield a 403 forbidden status when trying to create a product with the company role in the endpoint /api/products', (done) => {
			request.post('/api/products')
				.set('Authorization', 'Bearer ' + token)
				.set('role', '0')
				.send({
					name: 'Apple' + Math.round(Math.random() * 10000000),
					price: + Math.round(Math.random() * 1000)
				})
				.expect(403,done)
		})
	})
})

// Test for endpoint of orders
describe('Access to order endpoint with authorization', () => {
	describe('Access to order endpoint with company role', () => {
		it('This test must create an order with the endpoint /api/orders with a post request and get status 200', (done) => {
			request.post('/api/orders')
				.set('Authorization', 'Bearer ' + token)
				.set('role', '0')
				.send({
					userId: userIdTemp,
					productId: 'Product' + Math.round(Math.random() * 10000000),
					quantity: Math.round(Math.random() * 1000),
					totalAmount: Math.round(Math.random() * 10000)
				})
				.expect(200)
 				.end((err, res) => {
					orderIdTemp = res.body._id
 					done()
 				})
		})
		it('This test must obtain a status of 200 when listing all the orders that belong to a specific user', (done) => {
			request.get('/api/orders/'+ userIdTemp)
				.set('Authorization', 'Bearer ' + token)
				.set('role', '0')
 				.expect(200, done)
		})		
	})
	describe('Access to order endpoint with admin role', () => {
		it('This test must return the status 200 ok for the Endpoint /api/orders with a get request', (done) => {
 			request.get('/api/orders')
 			.set('Authorization', 'Bearer ' + token)
 			.set('role', '1')
 			.expect(200,done)
 		})
 		it('This test must update the previously created order through its id with a put request and get status 200', (done) => {
			request.put('/api/orders/'+ orderIdTemp)
				.set('Authorization', 'Bearer ' + token)
				.set('role', '1')
				.send({
					userId: userIdTemp,
					productId: 'Product' + Math.round(Math.random() * 10000000),
					quantity: Math.round(Math.random() * 1000),
					totalAmount: Math.round(Math.random() * 10000)
				})
 				.expect(200)
 				.end((err, res) => {
 					console.log('Details of the updated order: ')
 					console.log(res.body)
 					done()
 				})
		})
		it('This test must eliminate the updated order with the previous test through its id with a delete request and obtain status 200', (done) => {
			request.delete('/api/orders/'+ orderIdTemp)
				.set('Authorization', 'Bearer ' + token)
				.set('role', '1')
 				.expect(200)
 				.end((err, res) => {
 					console.log(res.body.message)
 					done()
 				})
		})
		it('This test must return a 403 forbidden status when trying to create an order with an administrator', (done) => {
			request.post('/api/orders')
				.set('Authorization', 'Bearer ' + token)
				.set('role', '1')
				.send({
					userId: userIdTemp,
					productId: 'Product' + Math.round(Math.random() * 10000000),
					quantity: Math.round(Math.random() * 1000),
					totalAmount: Math.round(Math.random() * 10000)
				})
				.expect(403,done)
		})
		it('This test must return a 403 forbidden status when attempting to delete an order with a company', (done) => {
			request.delete('/api/orders/'+ orderIdTemp)
				.set('Authorization', 'Bearer ' + token)
				.set('role', '0')
 				.expect(403,done)
		})
	})
})