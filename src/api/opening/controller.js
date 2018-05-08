import _ from 'lodash'
import { success, notFound, authorOrAdmin } from '../../services/response/'
import { Opening } from '.'

export const create = ({ user, bodymen: { body } }, res, next) =>
  Opening.create({ ...body, user })
    .then((opening) => opening.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Opening.find(query, select, cursor)
    .populate('user')
    .then((openings) => openings.map((opening) => opening.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Opening.findById(params.id)
    .populate('user')
    .then(notFound(res))
    .then((opening) => opening ? opening.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ user, bodymen: { body }, params }, res, next) =>
  Opening.findById(params.id)
    .populate('user')
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'user'))
    .then((opening) => opening ? _.merge(opening, body).save() : null)
    .then((opening) => opening ? opening.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ user, params }, res, next) =>
  Opening.findById(params.id)
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'user'))
    .then((opening) => opening ? opening.remove() : null)
    .then(success(res, 204))
    .catch(next)
