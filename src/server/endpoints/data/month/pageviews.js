const moment = require('moment');
const mongo = require('../../../mongodb.js');

module.exports = (req, res) => {
  const thirtyDaysAgo = moment().subtract(30, 'days').toDate();

  const results = {
    one: null, // the prev total
    two: null // 30 most recent records
  };

  function queriesComplete() {
    for(let i = 0, y = results.two.length; i < y; i++) {
      results.one += results.two[i].count;
      results.two[i].count = results.one;
      results.two[i].date = moment(results.two[i].date).format('YYYY-MM-DD');
    }

    res.json(results.two);
  }

  mongo.getDb().then((db) => {
    const setResults = (result, value) => {
      results[result] = value;

      if(!!results.one && !!results.two)
        queriesComplete();
    };

    // get the total of every record before the most recent thirty days
    db.collection('impact_analytics').aggregate([
      {
        $match: { ymd: { $lt: thirtyDaysAgo } }
      },
      {
        $group: { _id: null, pageviews: { $sum: '$pageviews' } }
      }
    ]).toArray().then((rows) => {
      setResults('one', rows[0].pageviews);
    });

    // get the 30 most recent records
    db.collection('impact_analytics').aggregate([
      {
        $match: { ymd: { $gte: thirtyDaysAgo } }
      },
      {
        $group: {
          _id: '$ymd',
          count: { $sum: '$pageviews' },
          date: { $first: '$ymd' }
        }
      },
      {
        $sort: { date: 1 }
      }
    ]).toArray().then((rows) => {
      setResults('two', rows);
    });
  });
};
