const moment = require('moment');
const mongo = require('../../../mongodb.js');

module.exports = (req, res) => {
  const thirtyDaysAgo = moment().subtract(30, 'days').toDate();
  const today = moment().toDate();

  const preThirtyTotalPromise = mongo.getDb().then((db) => {
    // get the total of every record before the most recent thirty days
    return db.collection('impact_github').aggregate([
      {
        $match: { date: { $lt: thirtyDaysAgo } }
      },
      {
        $group: { _id: null, count: { $sum: '$count' } }
      }
    ]).toArray().then((rows) => {
      return rows[0].count;
    });
  });

  const lastThirtyPromise = mongo.getDb().then((db) => {
    // get the 30 most recent records
    return db.collection('impact_github').aggregate([
      {
        $match: { date: { $gte: thirtyDaysAgo } }
      },
      {
        $match: { date: { $lt: today } }
      },
      {
        $sort: { date: 1 }
      }
    ]).toArray().then((rows) => {
      return rows;
    });
  });

  Promise.all([preThirtyTotalPromise, lastThirtyPromise]).then(([preThirtyTotal, lastThirty]) => {
    let total = preThirtyTotal;

    lastThirty.forEach((contribution) => {
      total += contribution.count;
      contribution.count = total;
      contribution.date = moment(contribution.date).format('YYYY-MM-DD');
    });

    res.json(lastThirty);
  });
};
