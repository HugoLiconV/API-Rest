'use strict'
const express = require('express');

// import { middleware as body } from 'bodymen'
// import { create, index, show, update, destroy } from './sales.controller'
// import { schema } from './model'
// export Sale, { schema } from './model'
const router = express.Router()

router.get('/',(req, res)=>{
	res.send({movie: `Pulp Fiction`});
});

export default router;
