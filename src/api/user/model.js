import crypto from 'crypto'
import bcrypt from 'bcrypt'
import mongoose, {Schema} from 'mongoose'
import mongooseKeywords from 'mongoose-keywords'
import {env} from '../../config'
import Student from '../../api/student/model'
import Company from '../../api/company/model'

const roles = ['user', 'admin']
const kindsOfProfiles = ['Student', 'Company']


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
		enum: roles,
		default: 'user'
	},
	picture: {
		type: String,
		trim: true
	},
	address: {
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

	return email.toLowerCase()
})

userSchema.pre('save', function (next) {
	let that = this;

	if (!this.profile) { //si no tiene perfil significa que es nuevo usuario de lo contrario solo esta editando información
		this.id = new mongoose.Types.ObjectId()
		if (this.kind === kindsOfProfiles[0]) { //estudiante
			Student.create({user: this.id}, function (err, student) {
				if (err) return err;
				that.profile = student.id;
			})
		} else { //empresa
			console.log('empresa')
			Company.create({user: this.id}, function (err, company) {
				console.log('Creando perfil de empresa')
				if (err) return console.log('err: ' + err);

				that.profile = company.id;
				console.log(`${that.profile} == ${company.id}`)
			})
		}
	}


	if (!this.isModified('password')) return next()

	/* istanbul ignore next */
	const rounds = env === 'test' ? 1 : 9

	console.log(`presave id ${this.id}`)
	bcrypt.hash(this.password, rounds).then((hash) => {
		this.password = hash
		next()
	}).catch(next)
})


userSchema.methods = {
	view(full) {
		let view = {}
		let fields = ['id', 'name', 'picture', 'address', 'kind']

		if (full) {
			fields = [...fields, 'email', 'phone', 'createdAt']
		}


		fields.forEach((field) => {
			view[field] = this[field]
		})

		view.profile = this.profile.view(full);

		return view
	},

	authenticate(password) {
		return bcrypt.compare(password, this.password).then((valid) => valid ? this : false)
	}
}

userSchema.statics = {
	roles,
	kindsOfProfiles
}

userSchema.plugin(mongooseKeywords, {paths: ['email', 'name']})

const model = mongoose.model('User', userSchema)

export const schema = model.schema
export default model

//fc 99 9f
