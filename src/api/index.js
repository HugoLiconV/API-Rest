import { Router } from 'express'
import movies from './movies'
// import supplier from './proveedores'
// import register from './caja'
// import transaction from './transaction'
// import sale from './ventas'

const router = new Router();

router.use('/movies', movies);

/**
 * @apiDefine user User access only
 * You must pass `access_token` parameter or a Bearer Token authorization header
 * to access this endpoint.
 */
/**
 * @apiDefine listParams
 */

export default router;
