export default (err, req, res, next) => {
	err.statusCode ??= 500;
	err.status ??= 'Internal Server Error';

	console.log('Error detected: ', err.statusCode)

	res.status(err.statusCode).json({
		code: err.statusCode,
		status: err.status,
		message: err.message,
		trace: err.trace
	});
}