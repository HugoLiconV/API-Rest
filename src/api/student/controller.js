import _ from 'lodash'
import { success, notFound, authorOrAdmin } from '../../services/response/'
import { Student } from '.'

export const create = ({ user, bodymen: { body } }, res, next) =>
  Student.create({ ...body, user })
    .then((student) => student.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Student.find(query, select, cursor)
    .populate('user')
    .then((students) => students.map((student) => student.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Student.findById(params.id)
    .populate('user')
    .then(notFound(res))
    .then((student) => student ? student.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ user, bodymen: { body }, params }, res, next) => {
	Student.findById(params.id)
		.populate('user')
		.then(notFound(res))
		.then(authorOrAdmin(res, user, 'user'))
		.then((student) => {
			// console.log(student.skills)
			// console.log(body.skills)
			// let skills = [...student.skills, ...body.skills]
			// console.log(skills)
			student ? student.skills = body.skills : null
			return student ? _.merge(student, body).save() : null
		})
		.then((student) => student ? student.view(true) : null)
		.then(success(res))
		.catch(next)
}
export const destroy = ({ user, params }, res, next) =>
  Student.findById(params.id)
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'user'))
    .then((student) => student ? student.remove() : null)
    .then(success(res, 204))
    .catch(next)
