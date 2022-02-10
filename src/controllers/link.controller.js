import QRCode from 'qrcode';
import {nanoid} from 'nanoid';

import {config} from '../../config';
import {isObjectId} from '../helpers';

import linkModel from '../models/link.model';
import HermesError from '../error';

export const getLink = async (req, res, next) => {
	try {
		if (!req.params.id) throw new HermesError(400, 'No link ID provided', ['params', 'id']);
		if (!isObjectId(req.params.id)) throw new HermesError(400, 'Bad Request', 'Invalid ID provided', ['params', 'id']);

		const node = await linkModel.findOne({_id: req.params.id});
		if (!node) throw new HermesError(404, 'Not Found', 'No link matching provided ID found', ['params', 'id']);

		res.locals.data = {node};
		return next();
	} catch (err) { next(err) }
}

export const generateQr = async(req, res, next) => {
	try {
		if (!req.params.id) throw new HermesError(400, 'No link ID provided', ['params', 'id']);
		if (!isObjectId(req.params.id)) throw new HermesError(400, 'Invalid ID provided', ['params', 'id']);

		const node = await linkModel.findOne({_id: req.params.id});
		if (!node) throw new HermesError(404, 'No link matching provided ID found', ['params', 'id']);

		res.locals.data =  await QRCode.toDataURL(`${config.linkGateway}${node.code}`, config.qr)
									   .then(url => { return url; })
									   .catch(error => { throw new HermesError(undefined, error); });

		return next();
	} catch (err) { next(err) }
}

export const createLink = async (req, res, next) => {
	try {
		const warnings = [];

		if (!req.body.type) throw new HermesError(400, 'Link type required', ['body', 'type']);
		if (!req.body.target) throw new HermesError(400, 'Target required', ['body', 'target']);

		//if (!req.body.createdBy) throw new HermesError(400, 'No creator provided', ['body', 'createdBy']);

		if (!req.body.createdAt) warnings.push({message: 'No createdAt provided', trace: ['body', 'createdAt']})
		if (!req.body.version) warnings.push({message: 'No version provided', trace: ['body', 'version']});

		const link = {
			type: req.body.type,
			target: req.body.target,
			code: nanoid(config.nano.size),
			description: req.body.description,
			notes: req.body.notes,
			version: req.body.version || 1,
			createdAt: req.body.createdAt || new Date(),
			createdBy: '61f9a8b64bde1cc52fa8671b' // @todo Replace with authenticated user from req
		}

		res.locals.data = {node: await linkModel.create(link)};
		res.locals.warnings = warnings;
		return next();

	} catch (err) { next(err) }
}

export const updateLink = async (req, res, next) => {
	try {
		const warnings = [];

		if (!req.params.id) throw new HermesError(400, 'No link ID provided', ['params', 'id']);
		if (!isObjectId(req.params.id)) throw new HermesError(400, 'Invalid ID provided', ['params', 'id']);

		const node = await linkModel.findOne({_id: req.params.id});

		if (!node) throw new HermesError(404, 'No link matching provided ID found', ['params', 'id']);

		const link = {};
		if (req.body.type) link.type = req.body.type;
		if (req.body.target) link.target = req.body.target;
		if (req.body.description) link.description = req.body.description;
		if (req.body.notes) link.notes = req.body.notes;

		const update = (() => {
			for (let key of Object.keys(link)) {
				if (link[key] !== node[key]) {
					return true;
				}
			}

			return false;
		})();

		console.log(node, link, update)

		if (update) {
			link.version = node.version + 1;
			link.updatedAt = new Date();
			link.updatedBy = '61f9a8b64bde1cc52fa8671b' // @todo Replace with authenticated user from req
		}

		if (!update) warnings.push({message: 'No changes detected, update ignored'})

		res.locals.data = {node: await linkModel.findOneAndUpdate({_id: node._id}, (update) ? link : undefined, {new: true})};
		res.locals.warnings = warnings;
		return next();
	} catch (err) { next(err) }
}

export const deleteLink = async (req, res, next) => {
	try {
		if (!req.params.id) throw new HermesError(400, 'No link ID provided', ['params', 'id']);
		if (!isObjectId(req.params.id)) throw new HermesError(400, 'Invalid ID provided', ['params', 'id']);

		const node = await linkModel.deleteOne({_id: req.params.id});

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