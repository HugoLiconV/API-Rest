'use strict'

const express = require('express');
// import Movie from './model'
export Movie, { schema } from './model'
import { create, show, showById, update, destroy } from './controller'
// import model from './model';
import { middleware as body } from 'bodymen'
import { schema } from './model'


const router = express.Router()

// router.get('/',(req, res)=>{
// 	res.status(200).send( {movie: `Pulp Fiction`});
// });

router.get('/', show);

// router.get('/:movieId', (req, res)=>{
	
// 	res.status(200).send({ movie: `movie with id ${res.params.movieId}: Pulp Fiction`})
// })

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
const { title, vote_average, release_date, poster_path, overview, genres } = schema.tree;
router.post('/', body( 
	{title, vote_average, release_date, poster_path, overview, genres} ),
	create)

router.put('/:id', body(
	{ title, vote_average, release_date, poster_path, overview, genres }),
	update )

router.delete('/:id', destroy)

export default router;
