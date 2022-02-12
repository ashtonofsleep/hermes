import {isObjectId} from '../helpers';

import clickModel from '../models/click.model';

import HermesError from '../error';

/**
 * Gets click data from the database using request parameters
 */
export const getClick = async (req, res, next) => {
	try {
		if (!req.params.id) throw new HermesError(400, 'No click ID provided', ['params', 'id']);
		if (!isObjectId(req.params.id)) throw new HermesError(400, 'Invalid ID provided', ['params', 'id']);

		const node = await clickModel.findOne({_id: req.params.id});
		if (!node) throw new HermesError(404, 'Not Found', 'No click matching provided ID found', ['params', 'id']);

		res.locals.data = {node};
		return next();
	} catch (err) { next(err) }
}

/**
 * Deletes a click using request parameters
 */
export const deleteClick = async (req, res, next) => {
	try {
		if (!req.params.id) throw new HermesError(400, 'No click ID provided', ['params', 'id']);
		if (!isObjectId(req.params.id)) throw new HermesError(400, 'Invalid ID provided', ['params', 'id']);

		const node = await clickModel.deleteOne({_id: req.params.id});

		if (node.deletedCount === 1) {
			res.locals.data = {deletedId: params.id};
		} else {
			res.locals.statusCode = 500;
			res.locals.message = 'Resource was not deleted, please check if correct ID provided'
			res.locals.data = {deletedId: null};
		}

		return next();
	} catch (err) { next(err) }
}