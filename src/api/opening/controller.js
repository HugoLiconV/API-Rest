import _ from 'lodash'
import {success, notFound, authorOrAdmin} from '../../services/response/'
import {Opening} from '.'
import {Company} from '../company'
import {User} from "../user";

export const create = ({user, bodymen: {body}}, res, next) => {
	console.log(`Profile id ${user.profile}`)
	Company.findById((user.profile), function (err, company) {
		if (err) console.log('err creating opening: ' + err)
		console.log(company)
		company.openings.push()
	})
	Opening.create({...body, company: user.profile})
		.then((opening) => {
			if (opening) {
				Company.findById((user.profile), function (err, company) {
					if (err) console.log('err creating opening: ' + err)
					// company.openings.push(opening._id)
					let openings = [...company.openings, opening.id]
					company.openings = openings
					company.save(function (err, updatedCompany) {
						if (err) console.log(`error actualizando: ${err}`)
						console.log(updatedCompany)
					})
				})
			}
			return opening.view(true)
		})
		.then(success(res, 201))
		.catch(next)
}

export const index = ({querymen: {query, select, cursor}}, res, next) => {
	console.log(query)
	console.log(select)
	console.log(cursor)
	Opening.find(query, select, cursor)
		.populate('company')
		.then((openings) => openings.map((opening) => opening.view()))
		.then(success(res))
		.catch(next)
}

export const show = ({params}, res, next) =>
	Opening.findById(params.id)
		.populate('company')
		.then(notFound(res))
		.then((opening) => opening ? opening.view() : null)
		.then(success(res))
		.catch(next)

export const update = ({user, bodymen: {body}, params}, res, next) => {
	console.log(user)
	console.log('user id ' + user.id)
	console.log('user profile ' + user.profile)
	Opening.findById(params.id)
		.populate('company')
		.then(notFound(res))
		.then(authorOrAdmin(res, user, 'company'))
		.then((opening) => opening ? _.merge(opening, body).save() : null)
		.then((opening) => opening ? opening.view(true) : null)
		.then(success(res))
		.catch(next)
}
export const destroy = ({user, params}, res, next) =>
	Opening.findById(params.id)
		.then(notFound(res))
		.then(authorOrAdmin(res, user, 'user'))
		.then((opening) => opening ? opening.remove() : null)
		.then(success(res, 204))
		.catch(next)

export const myOpenigns = ({ user }, res, next) => {
	console.log(user.profile)
	Opening.find({company: user.profile})
		.then(notFound(res))
		.then((openings) => openings.map((opening) => opening.view()))
		.then(success(res))
		.catch(next)
}
