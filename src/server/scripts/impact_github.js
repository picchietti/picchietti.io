const moment = require('moment');
const cheerio = require('cheerio');
const axios = require('axios');

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

axios.get(url).then((response) => {
  processHtml(response.data);
}).catch((error) => {
  if (error.response) {
    console.log('error', error.response.data);
  }
  else {
    console.log('error', error.message);
  }
});
