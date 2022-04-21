const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser());

//Cors
app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
	res.setHeader('Access-Control-Allow-Headers', '*');
	res.setHeader('Access-Control-Allow-Credentials', true);
	next();
});

const mongoClient = require('./queries/initMongo');

const db = mongoClient.client.db('raid-challenge');
const messagesCollection = db.collection('messages');

//Code snippet as required by engineering challenge.
async function createRecord(item) {
	//Validate Message;
	if (!item.message || !item.sender) throw 'Invalid Message';
	item.likes = 0;
	item.timestamp = Date.now();
	const res = await messagesCollection.insertOne(item);
	return 'Record successfully created in the database';
}

app.post('/new-message', async (req, res) => {
	try {
		await createRecord(req.body);
		return res.status(200).json();
	} catch (err) {
		console.log(err);
		return res.status(400).json(err);
	}
});

const MESSAGES_PER_PAGE = 4;

async function getRecords(page) {
	const res = await messagesCollection
		.find()
		.sort({ likes: -1 })
		.limit(MESSAGES_PER_PAGE)
		.skip(MESSAGES_PER_PAGE * (page - 1))
		.toArray();
	return res;
}

app.get('/messages', async (req, res) => {
	try {
		if (req.query.page == undefined) return res.status(400).json();
		req.query.page = parseInt(req.query.page);
		const records = await getRecords(req.query.page);
		return res.status(200).json(records);
	} catch (err) {
		console.log(err);
		return res.status(400).json(err);
	}
});

app.listen(42069, function () {
	console.log('listening on 42069');
});
