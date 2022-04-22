const { ObjectId } = require('mongodb');
const MongoInstance = require('../db/MongoInstance');

async function likeMessage(messageId) {
	return await MongoInstance.messagesCollection.updateOne(
		{ _id: ObjectId(messageId) },
		{ $inc: { likes: 1 } }
	);
}

module.exports = async (req, res) => {
	console.log(req.body);
	try {
		if (req.body.messageId == undefined)
			return res.status(400).json('No messageId');
		const result = await likeMessage(req.body.messageId);
		console.log(result);
		return res.status(200).json();
	} catch (err) {
		console.log(err);
		return res.status(400).json(err);
	}
};
