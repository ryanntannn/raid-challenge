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

app.listen(42069, function () {
	console.log('listening on 42069');
});
