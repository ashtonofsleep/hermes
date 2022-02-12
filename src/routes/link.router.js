import express from 'express';

import {createLink, deleteLink, generateQr, clickLink, getLink, updateLink} from '../controllers/link.controller';

const router = express.Router({mergeParams: true})

router.put('/', createLink)

router.route('/:id')
	  .get(getLink)
	  .patch(updateLink)
	  .delete(deleteLink)

router.get('/:id/qr', generateQr);

router.post('/:code([a-zA-Z0-9_-]{10})/click', clickLink);

export default router;