import { Router } from 'express'
import movies from './movies'
import auth from './auth'
import user from './user';

// import supplier from './proveedores'
// import register from './caja'
// import transaction from './transaction'
// import sale from './ventas'

const router = new Router();

router.use('/movies', movies);
router.use('/auth', auth);
router.use('/user', user);
/**
 * @apiDefine user User access only
 * You must pass `access_token` parameter or a Bearer Token authorization header
 * to access this endpoint.
 */
/**
 * @apiDefine listParams
 */

export default router;
