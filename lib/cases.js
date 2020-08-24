const csv = require('fast-csv');
const request = require('request');
moment = require('moment');

function getCases(url, countries, model) {
	const cases = [];

	csv.parseStream(request(url))
		.on('data', (row) => {
			if (countries.includes(row[3])) {
				cases.push({
					Country: row[3],
					Confirmed: row[7],
					Active: row[10],
					Recoveries: row[9],
					Deaths: row[8],
					UpdatedOn: moment(row[4]).format('DD-MM-YYYY'),
				});
				row[3];
			}
		})
		.on('end', () => {
			console.log('File read successfully....');
			model.insertMany(cases, (err, docs) => {
				if (err) {
					console.log(err);
				}
			});
		});
}

module.exports = getCases;
