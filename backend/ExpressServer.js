const express = require('express');
const MongoInstance = require('./db/MongoInstance');
const app = express();

const MESSAGES_PER_PAGE = 4;

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
		app.post('/new-message', async (req, res) => {
			try {
				await this.createRecord(req.body);
				return res.status(200).json();
			} catch (err) {
				console.log(err);
				return res.status(400).json(err);
			}
		});

		app.get('/messages', async (req, res) => {
			try {
				if (req.query.page == undefined) return res.status(400).json();
				req.query.page = parseInt(req.query.page);
				const records = await this.getRecords(req.query.page);
				return res.status(200).json(records);
			} catch (err) {
				console.log(err);
				return res.status(400).json(err);
			}
		});

		app.listen(42069, function () {
			console.log('listening on 42069');
		});
	}

	async createRecord(item) {
		//Validate Message;
		if (!item.message || !item.sender) throw 'Invalid Message';
		item.likes = 0;
		item.timestamp = Date.now();
		const res = await this.messagesCollection.insertOne(item);
		return 'Record successfully created in the database';
	}

	async getRecords(page) {
		const res = await this.messagesCollection
			.find()
			.sort({ likes: -1 })
			.limit(MESSAGES_PER_PAGE)
			.skip(MESSAGES_PER_PAGE * (page - 1))
			.toArray();
		return res;
	}
}

module.exports = new ExpressServer();
