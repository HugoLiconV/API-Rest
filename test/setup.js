import { EventEmitter } from 'events'
import mongoose from '../src/services/mongoose'
// import mockgoose from 'mockgoose'
import {Mockgoose} from 'mockgoose';


// var Mongoose = require('mongoose').Mongoose;
// var mongoose = new Mongoose();

import { mongo } from '../src/config'

EventEmitter.defaultMaxListeners = Infinity
jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000

global.Array = Array
global.Date = Date
global.Function = Function
global.Math = Math
global.Number = Number
global.Object = Object
global.RegExp = RegExp
global.String = String
global.Uint8Array = Uint8Array
global.WeakMap = WeakMap
global.Set = Set
global.Error = Error
global.TypeError = TypeError
global.parseInt = parseInt
global.parseFloat = parseFloat

let mockgoose = new Mockgoose(mongoose);

beforeAll(async () => {
	console.log('Before All');
	mockgoose.prepareStorage().then(() => {
		console.log(`conectando a mongo ${mongo.uri}... `)
		mongoose.connect(mongo.uri);
		console.log('conectado a mongo');
	});
});

afterAll(async () => {
	
	// mongoose.disconnect()
	// mongoose.connection.close()
	// console.log('Desconectado');
	try {
		console.log('Desconectando de mongo...');
		await mongoose.disconnect();
		console.log('Desconectado');
	} catch (error) {
		console.log(`
    You did something wrong dummy!
    ${error}
  `);
		throw error;
	}
});

afterEach(async () => {
	console.log('After Each')
	const { collections } = mongoose.connection
	const promises = []
	Object.keys(collections).forEach((collection) => {
		promises.push(collections[collection].remove())
	})
	await Promise.all(promises)
})
