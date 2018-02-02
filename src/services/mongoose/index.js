'use strict'

import Promise from 'bluebird'
import mongoose from 'mongoose'
import chalk from 'chalk';
// import {mongo }from '../../config'

/* Object.keys(mongo.options).forEach((key) =>  {
	mongoose.set(key, mongo.options[key])
}) */

mongoose.Promise = Promise
/* istanbul ignore next */

// mongoose.Types.ObjectId.prototype.view = function () {
// 	return {id:this.toString()}
// }

mongoose.connection.on('error', (err) =>  {
	console.error(chalk.bold.red('MongoDB connection error: ' + err))
	process.exit(-1)
})

export default mongoose

