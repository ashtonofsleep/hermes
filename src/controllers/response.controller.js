import {getReasonPhrase} from 'http-status-codes';

export default (req, res) => {
	const response = {};

	response.statusCode = res.locals.statusCode || 200;
	response.status = getReasonPhrase(response.statusCode);
	response.message = res.locals.message;
	response.data = res.locals.data;
	response.warnings = (res.locals.warnings.length !== 0) ? res.locals.warnings : undefined;

	res.status(response.statusCode).json(response);
}