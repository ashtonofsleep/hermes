import HermesError from '../error';

export default (req, res, next) => {
	return next(new HermesError(404));
};