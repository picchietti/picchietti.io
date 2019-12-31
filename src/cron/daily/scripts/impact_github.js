import moment from 'moment';
import cheerio from 'cheerio';
import axios from 'axios';

import mongo from '../../../server/mongodb.js';

const since = 2012;
const user = 'picchietti';

function processHtml(html, year) {
  const contributions = [];
  const $ = cheerio.load(html);

  $('.js-calendar-graph-svg .day').each(function(i, day) {
    const dayDate = $(day).attr('data-date');
    const dayCount = $(day).attr('data-count');

    if (moment(dayDate).year() === year) {
      contributions.push({
        date: moment(dayDate).toDate(),
        count: parseInt(dayCount)
      });
    }
  });

  return contributions;
}

const currentYear = moment().year();
const allRequests = [];
for(let year = since; year <= currentYear; year++) {
  const delay = (year - since) * 500;
  const url = `https://github.com/users/${user}/contributions?from=${year}-01-01&to=${year}-12-31`;

  allRequests.push(
    new Promise((resolve, reject) => setTimeout(() => {
      const responsePromise = axios.get(url)
        .then((response) => {
          const contributions = processHtml(response.data, year);

          return mongo.getDb().then((db) => {
            const contributionsToOperation = contributions.map((contribution) => {
              return db.collection('impact_github').findOne(
                { date: contribution.date }
              ).then((existingContribution) => {
                let operation;

                if (existingContribution === null) {
                  operation = { insertOne: { document: contribution } };
                }
                else if (contribution.count > existingContribution.count) {
                  operation = { updateOne: { filter: existingContribution, update: { $set: { count: contribution.count } } } };
                }

                return operation;
              });
            });

            return Promise.all(contributionsToOperation).then((contributionOperations) => {
              const filteredOperations = contributionOperations.filter((operation) => operation !== undefined);

              if(filteredOperations.length === 0)
                return undefined;

              return db.collection('impact_github').bulkWrite(
                filteredOperations,
                { ordered: false }
              );
            });
          });
        })
        .catch((error) => {
          if (error.response) {
            console.log('error', error.response.data);
          }
          else {
            console.log('error', error.message);
          }
        });

      resolve(responsePromise);
    }, delay))
  );
}

Promise.all(allRequests).then(() => mongo.close());
