require('dotenv').config();
const snoowrap = require('snoowrap');
const jsonfile = require('jsonfile');
const Promise = require('bluebird');
const Snudown = require('snudown-js');

const r = new snoowrap({
  "userAgent": "CGI party game",
  "clientId": process.env.REDDIT_CLIENT_ID,
  "clientSecret": process.env.REDDIT_CLIENT_SECRET,
  "refresh_token": process.env.REDDIT_REFRESH_TOKEN
});

const nugPromises = r.getSubreddit('coolgamesinc')
 .search({ query: 'THE DANK NUG ZONE - The Official Game Ideas', sort: 'relevant' })
 .slice(0, 25)
 .then(listing => {
    return listing.map(thread => {
      thread.expandReplies({ depth: 1, limit: 2 }).then(submission => {
        const nugs = submission.comments.reduce((nugs, comment) => {
          return nugs.concat({
            id: comment.id,
            body: comment.body,
            score: comment.score,
            user: comment.author.name,
          });
        }, []);
        const filename = "./data/" + submission.id + ".json";
        jsonfile.writeFile(filename, Array.prototype.concat(...nugs), {spaces: 2}, () => {});
    });
  });
});
