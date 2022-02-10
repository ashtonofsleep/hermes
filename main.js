import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import mongoSanitize from 'express-mongo-sanitize';
import hpp from 'hpp';

import {config} from './config';

const server = express();
const router = express.Router();

import responseController from './src/controllers/response.controller';
import errorController from './src/controllers/error.controller';

import linkRouter from './src/routes/link.router';
import clickRouter from './src/routes/click.router';
import HermesError from './src/error';

mongoose.connect(config.database).then(()=>{
	mongoose.set('debug', config.debug);
});

server.use(bodyParser.urlencoded({extended: true}));
server.use(bodyParser.json({limit: config.bodySizeLimit}));
server.use(mongoSanitize());
server.use(hpp());

router.use('/links', linkRouter);
router.use('/clicks', clickRouter);

router.get('/', (req, res, next) => {
	res.locals.message = 'Welcome to Hermes';
	next();
});

server.use('/api', router);

server.use('*', (req, res, next) => {
	if (!res.locals) return next(new HermesError(404, 'Not Found'), req, res, next);
	else next();
})

server.use(responseController);
server.use(errorController);

server.listen(config.port, () => {
	console.log('Hermes online')
})