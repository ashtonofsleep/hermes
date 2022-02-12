import express from 'express';
import {createClick, deleteClick, getClick} from '../controllers/click.controller';

const router = express.Router({mergeParams: true})

router.put('/', createClick);

router.route('/:id')
	  .get(getClick)
	  .delete(deleteClick)

router.put('/:code')

export default router;