const express = require('express');
const MongoInstance = require('./db/MongoInstance');
const newMessage = require('./services/newMessage');
const getMessages = require('./services/getMessages');
const likeMessage = require('./services/likeMessage');
const app = express();

class ExpressServer {
	constructor() {
		this.configureExpress();
		this.handleCors();
		this.configureDb();
		this.configureAPI();
	}

	configureExpress() {
		app.use(express.json());
		app.use(express.urlencoded({ extended: true }));
	}

	handleCors() {
		app.use((req, res, next) => {
			res.setHeader('Access-Control-Allow-Origin', '*');
			res.setHeader(
				'Access-Control-Allow-Methods',
				'GET, POST, PUT, DELETE'
			);
			res.setHeader('Access-Control-Allow-Headers', '*');
			res.setHeader('Access-Control-Allow-Credentials', true);
			next();
		});
	}

	configureDb() {
		this.db = MongoInstance.client.db('raid-challenge');
		this.messagesCollection = this.db.collection('messages');
	}

	configureAPI() {
		app.post('/new-message', newMessage);

		app.get('/messages', getMessages);

		app.post('/like-message', likeMessage);

		app.listen(42069, function () {
			console.log('listening on 42069');
		});
	}
}

module.exports = new ExpressServer();
