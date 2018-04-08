import crypto from 'crypto'
import bcrypt from 'bcrypt'
import mongoose, { Schema } from 'mongoose'
import mongooseKeywords from 'mongoose-keywords'
import { env } from '../../config'

const roles = ['user', 'admin']
const genres = ['hombre', 'mujer']

// TODO: add genre to schema
const userSchema = new Schema({
	email: {
		type: String,
		match: /^\S+@\S+\.\S+$/,
		required: true,
		unique: true,
		trim: true,
		lowercase: true
	},
	password: {
		type: String,
		required: true,
		minlength: 6
	},
	name: {
		type: String,
		index: true,
		trim: true
	},
	genre: {
		type: String,
		lowercase: true,
		enum: genres,
	},
	role: {
		type: String,
		enum: roles,
		default: 'user'
	},
	picture: {
		type: String,
		trim: true
	},
	phone: {
		type: String,
		trim: true
	},
	education: {
		type: Object,
		degree: {
			type: String,
			trim: true,
			required: true
		},
		date: {
			type: String,
			trim: true,
		},		
		grade: {
			type: String,
			trim: true,
		}
	},
	skills: {
		type: [String]
	},
	achievements: [{
		title: String,
		description: String,
		date: String,
	}],
	address:{
		type: Object,
		city: {
			type: String,
			trim: true
		},
		state: {
			type: String,
			trim: true
		}
	}
}, {
	timestamps: true
})

userSchema.path('email').set(function (email) {
	if (!this.picture || this.picture.indexOf('https://gravatar.com') === 0) {
		const hash = crypto.createHash('md5').update(email).digest('hex')
		this.picture = `https://gravatar.com/avatar/${hash}?d=identicon`
	}

	if (!this.name) {
		this.name = email.replace(/^(.+)@.+$/, '$1')
	}

	return email
})

userSchema.pre('save', function (next) {
	if (!this.isModified('password')) return next()

	/* istanbul ignore next */
	const rounds = env === 'test' ? 1 : 9

	bcrypt.hash(this.password, rounds).then((hash) => {
		this.password = hash
		next()
	}).catch(next)
})

userSchema.methods = {
	view (full) {
		let view = {}
		let fields = ['id', 'name', 'genre', 'picture', 'education', 'skills', 'achievements', 'address']

		if (full) {
			fields = [...fields, 'email', 'createdAt', 'phone']
		}

		fields.forEach((field) => { view[field] = this[field] })

		return view
	},

	authenticate (password) {
		return bcrypt.compare(password, this.password).then((valid) => valid ? this : false)
	}
}

userSchema.statics = {
	roles,
	genres
}

userSchema.plugin(mongooseKeywords, { paths: ['email', 'name'] })

const model = mongoose.model('User', userSchema)

export const schema = model.schema
export default model

