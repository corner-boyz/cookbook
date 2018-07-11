const Expo = require('expo');
const { manifest } = Expo.Constants;

// Switch comments when making apk
// module.exports = 'cookbookserver.herokuapp.com';
module.exports = manifest.packagerOpts.dev ? manifest.debuggerHost.split(`:`).shift().concat(`:3000`) : 'cookbookserver.herokuapp.com';
