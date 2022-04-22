const { MongoClient, ServerApiVersion } = require('mongodb');

class MongoInstance {
	constructor() {
		this.uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.31d0c.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
		this.client = new MongoClient(this.uri, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			serverApi: ServerApiVersion.v1,
		});
		this.connect();
		this.db = this.client.db('raid-challenge');
		this.messagesCollection = this.db.collection('messages');
	}

	async connect() {
		try {
			await this.client.connect();
			console.log('Connected to MongoDB');
		} catch (error) {
			console.error(error);
		}
		return;
	}
}

module.exports = new MongoInstance();
