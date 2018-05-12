import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Opening, { schema } from './model'

const router = new Router()
const { title, location, salary, date, description, carreer } = schema.tree

/**
 * @api {post} /openings Create opening
 * @apiName CreateOpening
 * @apiGroup Opening
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam title Opening's title.
 * @apiParam location Opening's location.
 * @apiParam salary Opening's salary.
 * @apiParam date Opening's date.
 * @apiParam description Opening's description.
 * @apiParam carreer Opening's carreer.
 * @apiSuccess {Object} opening Opening's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Opening not found.
 * @apiError 401 user access only.
 */
router.post('/',
  token({ required: true }),
  body({ title, location, salary, date, description, carreer }),
  create)

/**
 * @api {get} /openings Retrieve openings
 * @apiName RetrieveOpenings
 * @apiGroup Opening
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiUse listParams
 * @apiSuccess {Object[]} openings List of openings.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 user access only.
 */
router.get('/',
  query(),
  index)

/**
 * @api {get} /openings/:id Retrieve opening
 * @apiName RetrieveOpening
 * @apiGroup Opening
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} opening Opening's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Opening not found.
 * @apiError 401 user access only.
 */
router.get('/:id',
  token({ required: true }),
  show)

/**
 * @api {put} /openings/:id Update opening
 * @apiName UpdateOpening
 * @apiGroup Opening
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam title Opening's title.
 * @apiParam location Opening's location.
 * @apiParam salary Opening's salary.
 * @apiParam date Opening's date.
 * @apiParam description Opening's description.
 * @apiParam carreer Opening's carreer.
 * @apiSuccess {Object} opening Opening's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Opening not found.
 * @apiError 401 user access only.
 */
router.put('/:id',
  token({ required: true }),
  body({ title, location, salary, date, description, carreer }),
  update)

/**
 * @api {delete} /openings/:id Delete opening
 * @apiName DeleteOpening
 * @apiGroup Opening
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Opening not found.
 * @apiError 401 user access only.
 */
router.delete('/:id',
  token({ required: true }),
  destroy)

export default router
