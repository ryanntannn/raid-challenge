const MongoInstance = require('../db/MongoInstance');

async function createRecord(item) {
	//Validate Message;
	if (!item.message || !item.sender) throw 'Invalid Message';
	item.likes = 0;
	item.timestamp = Date.now();
	const res = await MongoInstance.messagesCollection.insertOne(item);
	return 'Record successfully created in the database';
}

module.exports = async (req, res) => {
	try {
		await createRecord(req.body);
		return res.status(200).json();
	} catch (err) {
		console.log(err);
		return res.status(400).json(err);
	}
};
