import _ from 'lodash'
import {Movie }from '.'

/* const success = (res, status) => (entity)=>{
	if (entity){
		res.status(status || 200).json(entity)
	}return null;
} */

const success = function(res, status) {
	return function (entity) {
		if (entity) {
			res.status(status || 200).json(entity)
		}return null; 
	}
}

const notFound = function(res) {
	return function (entity) {
		if (entity)
			return entity
		console.log('Error 404 Not Found');
		res.status(404).end(); 
		return null
	}
}

export const create = ( {bodymen: {body }}, res, next) => 
	Movie.create(body)
		.then(movie => movie.view())
		// .then((movie)=>{
		// 	if (movie){
		// 		res.status(201).json(movie)
		// 	}return null
		// })
		.then((movie) => success(res, 201)(movie))
		.catch(next)


export const show = (req, res, next) => 
	Movie.find( {})
		.then((movies) => movies.map((movie) => movie.view()))
		.then(success(res))
		.catch(next)

export const showById = ( { params }, res, next) => {
	// console.log(params.id.toString())
	Movie.findById(params.id)
		.then((movie) => notFound(res)(movie))
		.then((movie) => movie?movie.view():null)
		.then(success(res))
		.catch(next)
}

export const update = ({ bodymen: { body }, params } , res, next) =>  {
	Movie.findById(params.id)
		.then(notFound(res))
		.then((movie) => movie?_.merge(movie, body).save():null)
		.then((movie) => movie?movie.view(true):null)
		.then(success(res))
		.catch(next)
}

export const destroy = ( {params }, res, next) => 
	Movie.findById(params.id)
		.then(notFound(res))
		.then((movie) => movie?movie.remove():null)
		.then(success(res, 204))
		.catch(next)
