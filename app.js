const express = require('express');

const Case = require('./lib/database');

const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());

app.get('/api/v1', function (req, res) {
	let country = req.query.country;
	let date = req.query.date;

	if (country == undefined) {
		Case.find((err, docs) => {
			if (err) {
				res.status(400).send();
			}
			res.status(200).json(docs);
		});
	}

	const firstChar = country[0].toUpperCase();
	country = firstChar + country.slice(1);

	Case.find({ Country: country }, (err, docs) => {
		if (err) {
			res.status(400).send();
			return;
		}
		res.status(200).json(docs);
		return;
	});
});

app.listen(PORT, function () {
	console.log(`server is running on port ${PORT} .....`);
});
