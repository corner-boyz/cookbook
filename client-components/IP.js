const Expo = require('expo');
const { manifest } = Expo.Constants;

module.exports = manifest.packagerOpts.dev
  ? manifest.debuggerHost.split(`:`).shift().concat(`:3000`)
  : 'FillThisInForDeployment';
