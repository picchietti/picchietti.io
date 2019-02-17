const moment = require('moment');
const cheerio = require('cheerio');
const request = require('request');

function processHtml(html) {
  const contributions = [];
  const $ = cheerio.load(html);

  $('.js-calendar-graph-svg .day').each(function(i, day) {
    const dayDate = $(day).attr('data-date');
    const dayCount = $(day).attr('data-count');

    if(moment(dayDate).year() === year) {
      // output for json file. remember to remove the last ','
      console.log(`{"date": ${dayDate}, count: ${dayCount}},`);

      contributions.push([dayDate, dayCount]);
    }
  });
}

const year = process.argv[2] || moment().year();
console.log('Getting contributions from year:', year);
const url = `https://github.com/users/picchietti/contributions?from=${year}-12-01&to=${year}-12-31`;

request(url, function(error, response, body) {
  if(error)
    console.error('error', error);

  processHtml(body);
});
