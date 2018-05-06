import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Student, { schema } from './model'

const router = new Router()
// eslint-disable-next-line no-unused-vars
const { genre, education, skills, achievements } = schema.tree

/**
 * @api {post} /students Create student
 * @apiName CreateStudent
 * @apiGroup Student
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam genre Student's genre.
 * @apiSuccess {Object} student Student's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Student not found.
 * @apiError 401 user access only.
 */
router.post('/', 
	token({ required: true }),
	body({genre, education, skills}),
	create)

/**
 * @api {get} /students Retrieve students
 * @apiName RetrieveStudents
 * @apiGroup Student
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiUse listParams
 * @apiSuccess {Object[]} students List of students.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 admin access only.
 */
router.get('/',
  token({ required: true, roles: ['admin'] }),
  query(),
  index)

/**
 * @api {get} /students/:id Retrieve student
 * @apiName RetrieveStudent
 * @apiGroup Student
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} student Student's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Student not found.
 * @apiError 401 user access only.
 */
router.get('/:id',
  token({ required: true }),
  show)

/**
 * @api {put} /students/:id Update student
 * @apiName UpdateStudent
 * @apiGroup Student
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam genre Student's genre.
 * @apiSuccess {Object} student Student's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Student not found.
 * @apiError 401 user access only.
 */
router.put('/:id',
  token({ required: true }),
  body({genre, education, skills, achievements: [Object] }),
  update)

/**
 * @api {delete} /students/:id Delete student
 * @apiName DeleteStudent
 * @apiGroup Student
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Student not found.
 * @apiError 401 user access only.
 */
router.delete('/:id',
  token({ required: true }),
  destroy)

export default router
