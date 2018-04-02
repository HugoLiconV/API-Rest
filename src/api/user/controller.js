import _ from 'lodash'
import { success, notFound } from '../../services/response/'
import { User } from '.'
import { createToken } from "../../services/tokens";

export const signUp = (req, res) => {
	const user = new User({
		email: req.body.email,
		displayName: req.body.displayName,
		password: req.body.password
	});
	
	user.save((err)=>{
		if (err) res.status(500).send({ message: `Error al crear el usuario: ${err}` });
		
		return res.status(200).send({ token: createToken(user) });
	})
};

export const signIn = (req, res) => {
	User.find({ email: req.body.email }, (err, user)=>{
		if(err) return res.status(500).send({ message: err })
		if(!user) return res.status(404).send({ message: "No existe el usuario" });
		
		req.user = user;
		res.status(200).send({ message: `Te has logueado correctamente`, token: createToken(user) })
	})
};

export const create = ({ bodymen: {body} }, res, next) =>
	User.create(body)
		.then(user => user.view(true))
		.then(success(res, 201))
		.catch(next);

export const show = (req, res, next) =>
	User.find({})
		.then((users) => users.map((user) => user.view()))
		.then(success(res))
		.catch(next);

export const showById	= ({ params }, res, next) =>
	User.findById(params.id)
		.then(notFound(res))
		.then((user) => user ? user.view() : null)
		.then(success(res))
		.catch(next);

export const update = ({ bodymen: { body }, params }, res, next) =>
	User.findById(params.id)
		.then(notFound(res))
		.then((user) => user ? _.merge(user, body).save() : null)
		.then((user) => user ? user.view(true) : null)
		.then(success(res))
		.catch(next);

export const destroy = ({ params }, res, next) =>
	User.findById(params.id)
		.then(notFound(res))
		.then((user) => user ? user.remove() : null)
		.then(success(res, 204))
		.catch(next);
