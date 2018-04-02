import { Router } from 'express'
import { isAuth } from './controller'
import {show} from "../movies/controller";

const router = new Router();

router.get('/', isAuth, (req, res)=>{
	res.status(200).send({ message: "tienes Acceso" })
});

export default router
