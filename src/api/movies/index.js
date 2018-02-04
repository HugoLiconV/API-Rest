'use strict'

const express = require('express');
const { title, vote_average, release_date, poster_path, overview, genres } = schema.tree;
export Movie, { schema } from './model'
import { create, show, showById, update, destroy } from './controller'
// import model from './model';
import { middleware as body } from 'bodymen'
import { schema } from './model'


const router = express.Router()

// router.get('/',(req, res)=>{
// 	res.status(200).send( {movie: `Pulp Fiction`});
// });

/**
 * @api {get} /movies Regresa las películas.
 * @apiName RetrieveMovies
 * @apiGroup Movies
 * @apiUse listParams
 * @apiSuccess {Object[]} movies Lista de películas.
 * @apiError {Object} 400 Parametros incorrectos o valores erroneos.
 */
router.get('/', show);

// router.get('/:movieId', (req, res)=>{
	
// 	res.status(200).send({ movie: `movie with id ${res.params.movieId}: Pulp Fiction`})
// })

/**
 * @api {get} /movie/:id Regresa una película en específico
 * @apiName RetrieveMovie
 * @apiGroup Movies
 * @apiSuccess {Object} movie Datos de la pelicula
 * @apiError {Object} 400 Parametros incorrectos o valores erroneos.
 * @apiError 404 Película no encontrada.
 */
router.get('/:id', showById);

// router.post('/', (req, res) => {
// 	let movie = new Movie();
// 	const body = req.body;
// 	console.log(body);
// 	movie.title = body.title
// 	movie.vote_average = body.vote_average
// 	movie.release_date = body.release_date
// 	movie.poster_path = body.poster_path
// 	movie.overview = body.overview
// 	movie.genres = body.genres

// 	movie.save((err, movieStored)=>{
// 		if (err) res.status(500).send({ message: 'error al guardar en la base de datos'})
// 		res.send(200, {movie: movieStored});
// 	})
// })

// title, vote_average, release_date, poster_path, overview, genres

/**
 * @api {post} /movies Guarda una película
 * @apiName SaveMovie
 * @apiGroup Movies
 * @apiParam title Nombre de la película.
 * @apiParam vote_average Puntuación promedio.
 * @apiParam release_date Fecha de estreno (año).
 * @apiParam poster_path URL del poster.
 * @apiParam overview Descripción o resumen.
 * @apiParam genres Géneros de la película.
 * @apiSuccess {Object} movie Datos de la película.
 * @apiError {Object} 400 Parametros incorrectos o valores erroneos.
 * @apiError 404 Película no encontrada.
 */
router.post('/', body( 
	{title, vote_average, release_date, poster_path, overview, genres} ),
	create)


/**
 * @api {put} /movies/:id Actualizar una película
 * @apiName UpdateMovie
 * @apiGroup Movies
 * @apiParam title Nombre de la película.
 * @apiParam vote_average Puntuación promedio.
 * @apiParam release_date Fecha de estreno (año).
 * @apiParam poster_path URL del poster.
 * @apiParam overview Descripción o resumen.
 * @apiParam genres Géneros de la película.
 * @apiSuccess {Object} movie Datos de la película.
 * @apiError {Object} 400 Parametros incorrectos o valores erroneos.
 * @apiError 404 Película no encontrada.
 */
router.put('/:id', body(
	{ title, vote_average, release_date, poster_path, overview, genres }),
	update )

	/**
 * @api {delete} /movies/:id Eliminar película
 * @apiName DeleteMovie
 * @apiGroup Movies
 * @apiSuccess (Success 204) 204 Sin contenido.
 * @apiError 404 Película no encontrada.
 */
router.delete('/:id', destroy)

export default router;
