var https = require('https');
var moment = require('moment');
var cheerio = require('cheerio');

function html_response(incoming_message){
  var data = '';

  incoming_message.on('data', function(chunk){
    data += chunk;
  });
  incoming_message.on('end', function(){
    data = data.toString();
    process_html(data);
  });
}

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
var request = https.get(url, html_response);

request.on('error', function(err){
  console.error('error', err);
});
