'use strict';

import mongoose, { Schema } from 'mongoose'
import bcrypt from 'bcrypt-nodejs';
import crypto from 'crypto';

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


// email, displayName, avatar, password, signupDate, lastLogin
UserSchema.methods = {
	view(full) {
		const view = {
			//simple view
			id: this.id,
			email: this.email,
			displayName: this.displayName,
			avatar: this.avatar,
			signupDate: this.signupDate,
			lastLogin: this.lastLogin
		};

		return full ? {
			...view
		} : view
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
