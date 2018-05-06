import crypto from 'crypto'
import bcrypt from 'bcrypt'
import mongoose, { Schema } from 'mongoose'
import mongooseKeywords from 'mongoose-keywords'
import { env } from '../../config'
const roles = ['user', 'admin']
const kindsOfProfiles = ['Student', 'Company']
import Student from '../../api/student/model'

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
	phone: {
		type: String,
		required: true,
		trim: true
	},
	role: {
		type: String,
		// required: true,
		enum: roles,
		default: 'user'
	},
	picture: {
		type: String,
		trim: true
	},
	address:{
		required: true,
		type: Object,
		city: {
			type: String,
			trim: true
		},
		state: {
			type: String,
			trim: true
		}
	},
	kind: {
		type: String,
		required: true,
		enum: kindsOfProfiles
	},
	profile: {
		type: Schema.ObjectId, 
		refPath: 'kind'
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
	let that = this;
	
	/* istanbul ignore next */
	const rounds = env === 'test' ? 1 : 9

	that.id = new mongoose.Types.ObjectId()

	Student.create({ user: this.id}, function (err, student) {
		if (err) return err;
		that.profile = student.id;
	})
	
	console.log(`presave id ${this.id}`)
	bcrypt.hash(this.password, rounds).then((hash) => {
		this.password = hash
		next()
	}).catch(next)
})


userSchema.methods = {
	view (full) {
		let view = {}
		// let fields = ['id', 'name', 'genre', 'picture', 'education', 'skills', 'achievements', 'address']
		let fields = ['id', 'name', 'picture', 'address', 'kind']
		
		if (full) {
			fields = [...fields, 'email', 'createdAt', 'phone']
		}

		fields.forEach((field) => { view[field] = this[field] })
		// view.profile = this.profile.view(full);
		
		return view
	},

	authenticate (password) {
		return bcrypt.compare(password, this.password).then((valid) => valid ? this : false)
	}
}

userSchema.statics = {
	roles,
	kindsOfProfiles
}

userSchema.plugin(mongooseKeywords, { paths: ['email', 'name'] })

const model = mongoose.model('User', userSchema)

export const schema = model.schema
export default model

