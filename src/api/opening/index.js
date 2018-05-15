import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy, myOpenigns } from './controller'
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
 * @apiParam {String} title Opening title.
 * @apiParam {Object} [location] Opening location.
 * @apiParam {String} location.city Opening city
 * @apiParam {String} location.state Opening state
 * @apiParam {String} [salary] Opening salary.
 * @apiParam {Date} [date] Opening date.
 * @apiParam {String} description Opening description.
 * @apiParam {[String]="Ingeniería en Informática","Ingeniería en Diseño Industrial","Ingeniería en Gestión Empresarial","Ingeniería en Industrial","Ingeniería en Sistemas Computacionales","Arquitectura","Licenciatura en administración"} carreer Carreers required for the opening.
 * @apiParamExample {json} Request-Example:
 * { 
 *  "access_token": "{{master_token}}",
 *  "title": "Programador web", 
 *	"location": {
 *	 "city": "Chihuahua",
 *	 "state": "Chihuahua"
 * }, 
 *  "salary": "13000", 
 *  "description": "Algo de gestion", 
 *  "carreer": ["Ingeniería en Gestión Empresarial"]
 * }
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
 * @apiUse listParams
 * @apiSuccess {Object[]} openings List of openings.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index)


/**
 * @api {get} /openings/my-openings Retrieve company's openings
 * @apiName RetrieveCompanysOpenings
 * @apiGroup Opening
 * @apiPermission user
 * @apiParam {String} access_token User access_token.
 * @apiSuccess {Object[]} openings List of openings.
 */
router.get('/my-openings',
	token({ required: true }),
	myOpenigns)

/**
 * @api {get} /openings/:id Retrieve opening
 * @apiName RetrieveOpening
 * @apiGroup Opening
 * @apiSuccess {Object} opening Opening's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Opening not found.
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
