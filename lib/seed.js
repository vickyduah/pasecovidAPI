const moment = require('moment');

const getCases = require('./cases');
const Case = require('./database');
const countries = require('./countries');

const baseURL =
	'https://github.com/CSSEGISandData/COVID-19/raw/master/csse_covid_19_data/csse_covid_19_daily_reports/';

const dates = getDates();

dates.forEach((date) => {
	const formatDate = moment(date).format('MM-DD-YYYY');
	const url = `${baseURL}${formatDate}.csv`;
	getCases(url, countries, Case);
});

function getDates() {
	const dates = [];
	const currentDate = new Date();
	let startDate = new Date('2020-01-22');

	while (currentDate >= startDate) {
		dates.push(startDate);

		const date = new Date(startDate);
		date.setDate(date.getDate() + 1);

		startDate = date;
	}
	return dates;
}
