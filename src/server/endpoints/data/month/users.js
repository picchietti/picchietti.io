const moment = require('moment');
const mongo = require('../../../mongodb.js');

module.exports = (ctx, next) => {
  // we dont have data for today so +1
  const dataStartDate = moment().subtract(30 + 1, 'days').toDate();

  const previousTotalPromise = mongo.getDb().then((db) => (
    db.collection('impact_analytics').aggregate([
      {
        $match: { ymd: { $lt: dataStartDate } }
      },
      {
        $group: { _id: null, users: { $sum: '$users' } }
      }
    ]).toArray().then((rows) => (
      rows[0].users
    ))
  ));

  const recentDataPromise = mongo.getDb().then((db) => (
    db.collection('impact_analytics').aggregate([
      {
        $match: { ymd: { $gte: dataStartDate } }
      },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$ymd' } },
          count: { $sum: '$users' },
          date: { $first: '$ymd' }
        }
      },
      {
        $sort: { date: 1 }
      }
    ]).toArray().then((rows) => (
      rows
    ))
  ));

  return Promise.all([previousTotalPromise, recentDataPromise]).then(([previousTotal, recentData]) => {
    let total = previousTotal;

    recentData.forEach((contribution) => {
      total += contribution.count;
      contribution.count = total;
      contribution.date = moment(contribution.date).format('YYYY-MM-DD');
    });

    ctx.body = recentData;
  });
};
