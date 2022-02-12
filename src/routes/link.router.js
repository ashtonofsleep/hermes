import express from 'express';

import {createLink, deleteLink, generateQr, clickLink, getLink, updateLink} from '../controllers/link.controller';

const router = express.Router({mergeParams: true})

router.post('/', createLink)

router.route('/:id')
	  .get(getLink)
	  .patch(updateLink)
	  .delete(deleteLink)

router.get('/:id/qr', generateQr);

router.post('/:code/click', clickLink);

export default router;