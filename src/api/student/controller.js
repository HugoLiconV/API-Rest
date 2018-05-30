import _ from 'lodash'
import {success, notFound, authorOrAdmin} from '../../services/response/'
import {Student} from '.'

export const create = ({user, bodymen: {body}}, res, next) =>
	Student.create({...body, user})
		.then((student) => student.view(true))
		.then(success(res, 201))
		.catch(next)

export const index = ({querymen: {query, select, cursor}}, res, next) =>
	Student.find(query, select, cursor)
		.populate('user')
		.populate('favorites')
		.then((students) => students.map((student) => student.view()))
		.then(success(res))
		.catch(next)

export const show = ({params}, res, next) =>
	Student.findById(params.id)
		.populate('user')
		.populate('favorites')
		.then(notFound(res))
		.then((student) => student ? student.view() : null)
		.then(success(res))
		.catch(next)

export const update = ({user, bodymen: {body}, params}, res, next) => {
	Student.findById(params.id)
		.populate('user')
		.populate('favorites')
		.then(notFound(res))
		.then(authorOrAdmin(res, user, 'user'))
		.then((student) => {
			if (student){
				student.skills = body.skills
				student.favorites = body.favorites
				student.favorites.map(fav => console.log(fav))
				body.favorites.map(fav => console.log(fav))
				manageFavorites(student.favorites, body.favorites);
				student.achievements = body.achievements
			}
			return student ? _.merge(student, body).save() : null
		})
		.then((student) => student ? student.view(true) : null)
		.then(success(res))
		.catch(next)
}

export const destroy = ({user, params}, res, next) =>
	Student.findById(params.id)
		.then(notFound(res))
		.then(authorOrAdmin(res, user, 'user'))
		.then((student) => student ? student.remove() : null)
		.then(success(res, 204))
		.catch(next)

export const manageFavorites = (currentFavorites, newFavorites) => {
	let result = [...currentFavorites]
	newFavorites.map(newFavorite => {
		console.log(`newFavorite ${newFavorite}`)
		const index = result.indexOf(newFavorite)
		const isNewFavorite = index < 0;
		if (isNewFavorite) {
			console.log('is new favorite')
			result.push(newFavorite)
		} else {
			console.log('Already exists')
			result.splice(index, 1);
		}
	});
	console.log('result')
	console.log(result)
	return result;
}
