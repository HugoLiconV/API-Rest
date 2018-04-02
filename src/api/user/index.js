'use strict'

const express = require('express');
const { email, displayName, avatar, password, signupDate, lastLogin } = schema.tree;
export User, { schema } from './model'
import { signUp, signIn, show, showById, update, destroy } from './controller'
import { middleware as body } from 'bodymen'
import { schema } from './model'

const router = express.Router()


/**
 * @api {get} /users Regresa todos los usuarios.
 * @apiName RetrieveUsers
 * @apiGroup Users
 * @apiUse listParams
 * @apiSuccess {Object[]} movies Lista de usuarios.
 * @apiError {Object} 400 Parametros incorrectos o valores erroneos.
 */
router.get('/', show);


/**
 * @api {get} /users/:id Regresa un usuario en específico
 * @apiName RetrieveUser
 * @apiGroup Users
 * @apiSuccess {Object} user Datos del usuario
 * @apiError {Object} 400 Parametros incorrectos o valores erroneos.
 * @apiError 404 Usuario no encontrado.
 */
router.get('/:id', showById);

// email, displayName, avatar, password, signupDate, lastLogin
/**
 * @api {post} /users Guarda un usuario
 * @apiName SaveUser
 * @apiGroup Users
 * @apiParam email Email del usuario.
 * @apiParam displayName Nombre del usuario
 * @apiParam avatar URL del avatar del usuario
 * @apiParam password Contraseña del usuario
 * @apiParam signupDate Fecha de creación de la cuenta
 * @apiParam lastLogin Fecha del último inicio de sesión.
 * @apiSuccess {Object} user Datos del usuario 
 * @apiError {Object} 400 Parametros incorrectos o valores erroneos.
 * @apiError 404 Usuario no encontrado.
 */
router.post('/signup', body(
	{email, displayName}),
	signUp);

router.post('/signin', body(
	{email, password},
	signIn
))

/**
 * @api {put} /movies/:id Actualizar un usuario.
 * @apiName UpdateUser
 * @apiGroup Users
 * @apiParam email Email del usuario.
 * @apiParam displayName Nombre del usuario
 * @apiParam avatar URL del avatar del usuario
 * @apiParam password Contraseña del usuario
 * @apiParam signupDate Fecha de creación de la cuenta
 * @apiParam lastLogin Fecha del último inicio de sesión.
 * @apiSuccess {Object} user Datos del usuario actualizados.
 * @apiError {Object} 400 Parametros incorrectos o valores erroneos.
 * @apiError 404 Usuario no encontrado.
 */
router.put('/:id', body(
	{email, displayName, avatar, password, signupDate, lastLogin}),
	update )

/**
 * @api {delete} /users/:id Eliminar usuario
 * @apiName DeleteUser
 * @apiGroup Users
 * @apiSuccess (Success 204) 204 Sin contenido.
 * @apiError 404 Usuario no encontrada.
 */
router.delete('/:id', destroy)

export default router;
