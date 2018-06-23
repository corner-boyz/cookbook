const Expo = require('expo');
const { manifest } = Expo.Constants;

// Uncomment the domain you want to be used as the server
// module.exports = 'cookbookserver.herokuapp.com';
module.exports = manifest.packagerOpts.dev ? manifest.debuggerHost.split(`:`).shift().concat(`:3000`) : 'cookbookserver.herokuapp.com';

