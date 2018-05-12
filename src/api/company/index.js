import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Company, { schema } from './model'

const router = new Router()
const { name, rfc, razon, description } = schema.tree

/**
 * @api {post} /companies Create company
 * @apiName CreateCompany
 * @apiGroup Company
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam rfc Company's rfc.
 * @apiParam razon Company's razon.
 * @apiSuccess {Object} company Company's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Company not found.
 * @apiError 401 user access only.
 */
router.post('/',
  token({ required: true }),
  body({ name, rfc, razon, description }),
  create)

/**
 * @api {get} /companies Retrieve companies
 * @apiName RetrieveCompanies
 * @apiGroup Company
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiUse listParams
 * @apiSuccess {Object[]} companies List of companies.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 admin access only.
 */
router.get('/',
  token({ required: true, roles: ['admin'] }),
  query(),
  index)

/**
 * @api {get} /companies/:id Retrieve company
 * @apiName RetrieveCompany
 * @apiGroup Company
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} company Company's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Company not found.
 * @apiError 401 user access only.
 */
router.get('/:id',
  token({ name, rfc, razon, description }),
  show)

/**
 * @api {put} /companies/:id Update company
 * @apiName UpdateCompany
 * @apiGroup Company
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam rfc Company's rfc.
 * @apiParam razon Company's razon.
 * @apiSuccess {Object} company Company's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Company not found.
 * @apiError 401 user access only.
 */
router.put('/:id',
  token({ required: true }),
  body({ name, rfc, razon, description }),
  update)

/**
 * @api {delete} /companies/:id Delete company
 * @apiName DeleteCompany
 * @apiGroup Company
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Company not found.
 * @apiError 401 user access only.
 */
router.delete('/:id',
  token({ required: true }),
  destroy)

export default router
