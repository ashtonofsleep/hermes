import {isObjectId} from '../helpers';

import clickModel from '../models/click.model';
import linkModel from '../models/link.model';

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
 * Creates a new click using request body. Returns click node.
 */
export const createClick = async (req, res, next) => {
	try {
		if (!req.params.id) throw new HermesError(400, 'No link ID provided', ['params', 'id']);
		if (!isObjectId(req.params.id)) throw new HermesError(400, 'Invalid ID provided', ['params', 'id']);

		if (!req.body || req.body && [req.body.referer, req.body.userAgent, req.body.ipAddress, req.body.timestamp].includes(undefined)) throw new HermesError(400, 'Incomplete data provided', ['body']);

		const link = await linkModel.findOne({_id: req.params.id});
		if (!link) throw new HermesError(404, 'Not Found', 'No link matching provided ID found', ['params', 'id']);

		res.locals.data = {node: await clickModel.create({
			link: req.params.id,
			referer: req.body.referer,
			userAgent: req.body.userAgent,
			ipAddress: req.body.ipAddress,
			timestamp: req.body.timestamp
		})};

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