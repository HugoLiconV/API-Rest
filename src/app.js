import http from 'http'
import { env, mongo, port, ip } from './config'
import mongoose from './services/mongoose'
import express from './services/express'
import api from './api'
import chalk from 'chalk'

const app = express(api);
const server = http.createServer(app);

mongoose.connect(mongo.uri, { useMongoClient: true });

// start our server
setImmediate(() => {
	server.listen(port, ip, () => {
		console.log(chalk.blueBright.bgBlack('Express server listening on: ' + 
			chalk.green.underline.bold(`http://${ip}:${port}`) + `, in ${env} mode`))
	})
});

export default app
