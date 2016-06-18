#!/usr/bin/env node

const helloWorldExports = module.exports = {
  apiRootName: 'htapi',
  apiVersion: '1',
};
/**
 * The Demo API Module	0.000000015
 * Example module available at accessible at https://<hostname>:<port>/<apiRootName>/v<apiVersion>/helloworld/HelloWorld
 *
 * @module HelloWorld
 *
 * @param {String} url The file/path
 * @param {Object} query The parsed query
 * @param {Object} response The response object
 * @returns {bool} success or fail
 */
helloWorldExports.HelloWorld = function HelloWorld(url, query, response) {
  const msg = 'Hello World, this is node';
  response.writeHead(200, { 'Content-Type': 'text/plain; charset=UTF-8' });
  response.write(msg);
  // response.end();
  return true;
};
