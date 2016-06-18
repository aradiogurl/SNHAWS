#!/usr/bin/env node

// Where the modules are located
const apiModules = '/ht-modules';
const _ = require('lodash');
const modsAutoLoader = require('modules-autoloader');

// autoloader config
const config = {
  filesToSkip: {},
  modules: {},
};
const modRename = {};
const modsAuto = modsAutoLoader.getObjects(__dirname + apiModules, config);
const apiLoader = module.exports = {};

// Sets the apiroot and versionk
// we only want modules that have an apiroot and version
_.forEach(_.omitBy(modsAuto, (val) => _.isUndefined(val.apiRootName && val.apiVersion)),
  (modData, modName) => {
    _.set(modRename, [_.get(modData, 'apiRootName'), `v${_.get(modData, 'apiVersion')}`, modName],
    modData);
  }
);

/**
* Writes a string of data to the response as a http found 200
*
* @method displayMethod
* @param {String} msg The data to write to the response/client
* @param {Object response The response object
*/
function displayMessage(msg, response) {
  response.writeHead(200, { 'Content-Type': 'text/plain; charset=UTF-8' });
  response.write(msg);
  // response.end();
}

/**
 * The primary API Module Endpoint Switcher
 *
 * @module switchApiEndpoints
 *
 * @param {String} url The file/path
 * @param {Object} query The parsed query
 * @param {Object} response The response object
 * @param {Object} request The request object used for advanced endpoints
 */
apiLoader.switchApiEndpoints = function switchApiEndpoints(epName, query, response, request) {
  // parse the url into the api and filename
  let modRes = false;
  const epArr = epName.split('/');
  const apiName = epArr[1];
  const apiVer = epArr[2];
  const servName = epArr[3];
  const ep = epArr[4];
  if (!_.isUndefined(modRename[apiName][apiVer][servName][ep])) {
    try {
      // if there is auth
      const authMeth = _.get(modRename, [apiName, apiVer, servName, 'apiAuthMethod']);
      const authMod = _.get(modRename, [apiName, apiVer, servName, 'apiAuthModules']);
      if (!_.isUndefined(authMeth) && !_.isUndefined(authMod)) {
        if (modsAuto[authMod][authMeth](epName, query, response, request) === false) {
          if (response.finished !== true) {
            displayMessage('API Authentication Error', response);
          }
          return true;
        }
      } else {
        modRes = modRename[apiName][apiVer][servName][ep](epName, query, response, request);
      }
      // else if there is not an auth method
      // we should do something with mod res
    } catch (ex) {
      console.log('catch response write status', response);
      if (!_.isUndefined(response.finished) && response.finished !== true) {
        console.log('running display messages');
        displayMessage(`API Error: ${ex} : ${ex.stack} ${modRes}`, response);
      }
      return true;
    }
  } else {
    console.log('No such module');
    return false;
  }
  return true;
};

