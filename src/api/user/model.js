'use strict';

import mongoose, { Schema } from 'mongoose'
import bcrypt from 'bcrypt-nodejs';
import crypto from 'crypto';
import randtoken from 'rand-token'
import mongoose, { Schema } from 'mongoose'
import mongooseKeywords from 'mongoose-keywords'
import { env } from '../../config'
// email, displayName, avatar, password, signupDate, lastLogin
const UserSchema = new Schema({
	email: {
		type: String,
		match: /^\S+@\S+\.\S+$/,
		required: true,
		unique: true,
		trim: true,
		lowercase: true
	},
	displayName: {
		type: String,
		index: true,
		trim: true
	},
	avatar: {
		type: String,
		trim: true
	},
	password: {
		type: String,
		required: true,
		minlength: 6,
		select: false
	},
	signupDate: { type: Date, default: Date.now() },
	lastLogin: Date
}, {
	timestamps: true
});

UserSchema.pre('save', (next)=>{
	let user = this;
	if (!user.isModified('password')) return next();
	
	bcrypt.genSalt(10, (err, salt) => {
		if (err) return next(err);
		
		bcrypt.hash(user.password, salt, null, (err, hash) => {
			if (err) return next(err)
			
			user.password = hash;
			next();
		});
	});
});

UserSchema.path('email').set(function (email) {
	if (!this.avatar || this.avatar.indexOf('https://gravatar.com') === 0){
		const hash = crypto.createHash('md5').update(this.email).digest('hex');
		this.avatar = `https://gravatar.com/avatar/${hash}?s=200&d=retro`
	}
	
	if(!this.name){
		this.name = email.replace(/^(.+)@.+$/, '$1');
	}
	
	return email
});

// email, displayName, avatar, password, signupDate, lastLogin
UserSchema.methods = {
	view(full) {
		let view = {};
		let fields = ['id', 'name', 'avatar']

		if (full) {
			fields = [...fields, 'email', 'createdAt']
		}

		fields.forEach((field) => { view[field] = this[field] })
		return view
	},
	
	gravatar() {
		if (!this.email) return `https://gravatar.com/avatar/?s=200&d=retro`;
		
		const md5 = crypto.createHash('md5').update(this.email).digest('hex');
		return `https;//gravatar.com/avatar/${md5}/?s=200&d=retro`
	}
}

const model = mongoose.model('User', UserSchema)

export const schema = model.schema
export default model
