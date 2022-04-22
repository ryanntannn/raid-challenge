const MongoInstance = require('../db/MongoInstance');

const MESSAGES_PER_PAGE = 4;

async function getRecords(page) {
	const res = await MongoInstance.messagesCollection
		.find()
		.sort({ likes: -1 })
		.limit(MESSAGES_PER_PAGE)
		.skip(MESSAGES_PER_PAGE * (page - 1))
		.toArray();
	return res;
}

module.exports = async (req, res) => {
	try {
		if (req.query.page == undefined) return res.status(400).json();
		req.query.page = parseInt(req.query.page);
		const records = await getRecords(req.query.page);
		return res.status(200).json(records);
	} catch (err) {
		console.log(err);
		return res.status(400).json(err);
	}
};
