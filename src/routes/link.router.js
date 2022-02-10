import express from 'express';

import {createLink, deleteLink, generateQr, getLink, updateLink} from '../controllers/link.controller';

const router = express.Router({mergeParams: true})

router.post('/', createLink)

router.route('/:id')
	  .get(getLink)
	  .patch(updateLink)
	  .delete(deleteLink)

router.get('/qr/:id', generateQr);

export default router;