import {sequelize} from '../models';
import app from './app';

const serverPort = process.env.PORT || 3200;
const serverHost = process.env.HOST || '127.0.0.1';

let server;

sequelize.sync()
	.then(() => {
		server = app.listen({port: serverPort, host: serverHost}, async () => {
			console.log('Listening on port %d', serverPort);
		});
	});

console.log(`Run server on  http://${serverHost}:${serverPort}`);

exports.closeServer = () => {
	server.close();
};
