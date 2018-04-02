'use strict';

import jwt from 'jwt-simple';
import moment from 'moment';
import secret_token  from '../../config';

export const createToken = (user) => {
	const payload = {
		sub: user._id,
		iat: moment().unix(),
		exp: moment().add(14, "days").unix(),
	};
	//exp: momento en que el token expira
	//iat: //cuando fue creado el token
	return jwt.encode(payload, secret_token);
};

export const decodeToken = (token) =>{
	const decoded = new Promise((resolve, reject) =>{
		try {
			const payload = jwt.decode(token, secret_token);
			
			if (payload.exp <= moment().unix){
				reject({
					status: 401,
					message: "El token ha expirado" 
				})
			}
			
			resolve(payload.sub);
		}catch (err){
			reject({
				status: 500,
				message: 'invalid token'
			})
		}
	})
	
	return decoded;
};

