import dotenv from 'dotenv';
dotenv.config();

const env = process.env;
if (!env.NODE_ENV) env.NODE_ENV = 'DEVELOPMENT';

const config = {};
config.env = env.NODE_ENV;
config.debug = (config.env === 'DEVELOPMENT');
config.port = env.PORT;

if (!config.port) throw new Error('Unspecified port, cannot proceed');

config.database = env.MONGOCS || (() => {
	let [user, pass, host, name, opts] = [
		env.DB_USER,
		env.DB_PASS,
		env.DB_HOST,
		env.DB_NAME,
		env.DB_OPTS
	]

	if (user && !pass || !user && pass) throw new Error('Credentials incomplete, cannot proceed');

	if (/(:\|\/\|\?\|#\|\[\|]\|@)/.test(pass)) pass = encodeURIComponent(pass);

	return `mongodb://${(user)?user+':'+pass+'@':''}${host}/${name}${opts}`;
})

config.qr = {
	errorCorrectionLevel: 'Q',
	margin: 2,
	color: {
		dark: '#000000',
		light: '#ffffff'
	}
}

config.nano = {
	size: 10
}

config.linkGateway = 'https://link.wirkijowski.group/';

export default config;