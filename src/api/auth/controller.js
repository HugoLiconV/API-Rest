'use strict';
import { decodeToken } from '../../services/tokens';
import moment from "moment";

export const isAuth = (req, res) => {
	if(!req.headers.authorization){
		return res.status(403).send({ message: "No tienes autorización" })
	}

	const token = req.headers.authorization.split(" ")[1];

	const payload = decodeToken(token)
		.then(response =>{
			req.user = response;
			next()
		})
		.catch(response =>{
			res.status(response.status)
		});

	if (payload.exp <= moment().unix){
		return res.status(401).send({ message: "El token ha expirado" })
	}

	req.user = payload.sub;
	next();
};
