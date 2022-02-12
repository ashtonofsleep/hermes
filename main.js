import express from 'express';
import mongoose from 'mongoose';
import * as Sentry from "@sentry/node";
import * as Tracing from "@sentry/tracing";
import mongoSanitize from 'express-mongo-sanitize';
import helmet from 'helmet';
import hpp from 'hpp';

import config from './config';

import responseController from './src/middlewares/response.middleware';
import notFoundController from './src/middlewares/notFound.middleware';
import errorController from './src/middlewares/error.middleware';

import linkRouter from './src/routes/link.router';
import clickRouter from './src/routes/click.router';

const server = express();
const router = express.Router();

Sentry.init({
	dsn: config.sentry,
	integrations: [
		new Sentry.Integrations.Http({ tracing: true }),
		new Tracing.Integrations.Express({ server }),
	],
	tracesSampleRate: (config.debug) ? 1.0 : 0.1,
});

server.set('case sensitive routing', true);
server.set('env', config.env);
server.disable('x-powered-by');

mongoose.connect(config.database, (err) => {
	if (err) throw new Error(err);
});

mongoose.set('debug', config.debug);

server.use(express.json());
server.use(express.urlencoded({extended: true}));
server.use(mongoSanitize());
server.use(helmet());
server.use(hpp());

server.use(Sentry.Handlers.requestHandler());
server.use(Sentry.Handlers.tracingHandler());

router.use('/links', linkRouter);
router.use('/clicks', clickRouter);

router.get('/', (req, res, next) => {
	res.locals.message = 'Welcome to Hermes';
	next();
});

server.use('/api', router);

server.use(responseController);
server.use(notFoundController);

server.use(Sentry.Handlers.errorHandler());
server.use(errorController);

server.listen(config.port, () => {
	console.log(`Hermes online at port ${config.port} in ${config.env.toLowerCase()} mode`);
})