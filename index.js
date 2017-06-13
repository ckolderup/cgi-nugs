const requireDir = require('require-dir');
const _ = require('underscore');
const wordfilter = require('wordfilter');

//strip out ideas that require additional context
//strip out edited posts
//strip out some additional tasteless stuff
wordfilter.addWords(['http', 'Edit:', 'anal']);



const nugs = _.values(requireDir('./data'))
  .reduce((all, thread) => {
      return all.concat(_.reject(thread, nug => {
        return wordfilter.blacklisted(nug.body) ||
               wordfilter.blacklisted(nug.user);
      }));
  }, []);

console.log(nugs.length + " nugs loaded.");
console.log("A random nug: ");
console.log(_.sample(nugs));
