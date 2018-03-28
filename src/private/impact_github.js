var moment = require('moment');
var cheerio = require('cheerio');
var request = require('request');

function process_html(html){
  var contributions = [];
  var $ = cheerio.load(html);

  $('.js-calendar-graph-svg .day').each(function(i, day){
    var day_date = $(day).attr('data-date');
    var day_count = $(day).attr('data-count');

    if(moment(day_date).year() == year){
      // output for json file. remember to remove the last ','
      console.log('{"date":"' + day_date + '", "count":' + day_count + '},');

      contributions.push([day_date, day_count]);
    }
  });
}

var year = process.argv[2] || moment().year();
console.log('Getting contributions from year:', year);
var url = 'https://github.com/users/picchietti/contributions?from=' + year + '-12-01&to=' + year + '-12-31';

request(url, function (error, response, body) {
  if(error)
    console.error('error', error);

  process_html(body);
});
