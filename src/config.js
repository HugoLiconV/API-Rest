/* eslint-disable no-unused-vars */
import path from 'path'
import _ from 'lodash'

const requireProcessEnv = (name) => {
	if (!process.env[name]) {
		throw new Error('You must set the ' + name + ' environment variable')
	}
	return process.env[name]
}


if (process.env.NODE_ENV !== 'production') {
	const dotenv = require('dotenv-safe')
	dotenv.load({
		path: path.join(__dirname, '../.env'),
		sample: path.join(__dirname, '../.env.example')
	})
}


const PRODUCTION_MONGO_URI = "ds241019.mlab.com:41019/job-board";
const user = requireProcessEnv('USER_DB')
const psw = requireProcessEnv('USER_PWD')

const config = {
	all: {
		env: process.env.NODE_ENV || 'development',
		root: path.join(__dirname, '..'),
		port: process.env.PORT || 9000,
		ip: process.env.IP || '0.0.0.0',
		masterKey: requireProcessEnv('MASTER_KEY'),
		jwtSecret: requireProcessEnv('JWT_SECRET'),
		pswdb: requireProcessEnv('USER_PWD'),
		userdb: requireProcessEnv('USER_DB'),
		mongo: {
			options: {
				db: {
					safe: true
				}
			}
		}
	},
	test: {
		mongo: {
			uri: 'mongodb://localhost/API-Rest-test',
			options: {
				debug: false
			}
		}
	},
	development: {
		mongo: {
			uri: 'mongodb://localhost/API-Rest-dev',
			options: {
				debug: true
			}
		}
	},
	production: {
		ip: process.env.IP || undefined,
		port: process.env.PORT || 8080,
		mongo: {
			uri: process.env.MONGODB_URI || `mongodb://${user}:${psw}@${PRODUCTION_MONGO_URI}`
		}
	}
};

module.exports = _.merge(config.all, config[config.all.env])
export default module.exports
