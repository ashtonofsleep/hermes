import express from 'express';
import {createClick, deleteClick, getClick} from '../controllers/click.controller';

const router = express.Router({mergeParams: true})

router.route('/:id')
	  .post(createClick);

router.route('/:id')
	  .get(getClick)
	  .delete(deleteClick)

export default router;