import http from 'http'
// import { env, mongo, port, ip } from './config'
import {env, port, ip} from './config'
// import mongoose from './services/mongoose'
import express from './services/express'
import api from './api'
import chalk from 'chalk'

const app = express(api)
// const app = express();

const server = http.createServer(app)
// app.listen(3000, ()=>{
// 	console.log(chalk.blueBright.bgBlack('Express server listening on: ' +
// 		chalk.white.underline.bold('http://localhost:3000')))
// });
// mongoose.connect(mongo.uri, { useMongoClient: true });

// start our server
setImmediate(() => {
	server.listen(port, ip, () => {
		console.log(chalk.blueBright.bgBlack('Express server listening on: ' + 
			chalk.green.underline.bold(`http://${ip}:${port}`) + `, in ${env} mode`))
	})
})

// app.get('/hola/:name', (req, res)=>{
// 	res.send({message: `hola ${req.params.name}`});
// })

// const express2 = require('express')
// const router = express2.Router();
// app.use(router);

// router.get('/hi',(req, res)=>{
// 	res.send({message: `hola`});
// });


export default app
