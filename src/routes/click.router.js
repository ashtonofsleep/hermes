import express from 'express';
import {deleteClick, getClick} from '../controllers/click.controller';

const router = express.Router({mergeParams: true})

router.route('/:id')
	  .get(getClick)
	  .delete(deleteClick)

export default router;