#!/usr/bin/env node
// Module dependencies.
const http2 = require('http2');
const fs = require('fs');
const path = require('path');
const url = require('url');
const events = require('events');
const qs = require('querystring');
const endPoints = require('./api/api-loader.js');
const common = require('./common-modules/common-web.js'); // load the common methods we call

let http2server;
// Options for the http2 server
const httpServerOptions = {
  key: fs.readFileSync(path.join(__dirname, 'keys/htkey.pem')),
  cert: fs.readFileSync(path.join(__dirname, 'keys/htcert.pem')),
};
// Root for file server
const httpFileRoot = path.join(__dirname, 'htdocs');

/**
 * Simple async method to handle POST and GET responses and return both queries in the same format
 *
 * @method processRequestMethod
 * @param {object} request The server request
 *
 * @return {object} query The query object
 */
function processRequestMethod(request, emitter) {
  let data = '';
  let parseData = {};
  if (request.method === 'POST') {
    request.on('data', (chunk) => {
      data += chunk;
    });
    request.on('end', () => {
      if (data === '') {
        return emitter.emit('call_api_endpoints', '');
      }
      if (request.headers['content-type'] === 'application/json') {
        return emitter.emit('call_api_endpoints', JSON.parse(data));
      }
      return emitter.emit('call_api_endpoints', qs.parse(data));
    });
    request.on('error', (e) => {
      console.error(`ERROR with POST request ${e.message}`); // eslint-disable-line no-console
      return false;
    });
  }
  // Process as GET
  parseData = qs.parse(url.parse(request.url).query);
  return emitter.emit('call_api_endpoints', parseData);
}
/**
 * Method to handle the files and endpoints
 *
 * @method loadFileRequest
 * @param {String} url The full uri/url aka path+file
 * @param {Object} query The query from the request
 * @param {Oject} response The response
 */
function loadFileRequest(fileUrl, response) {
  let type;
  console.log('Switching on  ', fileUrl);
  switch (fileUrl) {
    default:
      switch (fileUrl.substring(fileUrl.lastIndexOf('.') + 1)) { // extension
        case 'html':
        case 'htm': type = 'text/html; charset=UTF-8'; break;
        case 'js': type = 'application/javascript; charset=UTF-8'; break;
        case 'css': type = 'text/css; charset=UTF-8'; break;
        case 'txt' : type = 'text/plain; charset=UTF-8'; break;
        case 'manifest': type = 'text/cache-manifest; charset=UTF-8'; break;
        default: type = 'application/octet-stream'; break;
      }
      // Read the file
      fs.readFile(fileUrl, (err, content) => {
        if (err) { // If we couldn't read the file for some reason
          common.write404Message(`Error loading file, while reading file ${err.message}`, response);
        } else { // Otherwise, if the file was read successfully.
          common.writeCustomContent(content, type, response);
        }
      });
      break;
  }
}

/**
* Callback which processes requests passed from the server
*
* @method processRequest
* @param {Object} request The server request
* @param {Object} response The response
*/
function processRequest(request, response) {
  // full path and filename from request
  const reqFile = path.join(httpFileRoot, request.url);
  let workFile = '';
  const pathName = request.url;
  const apiEmitter = new events.EventEmitter();
  // Default to index.html if no page is specified
  if (pathName === undefined || pathName === '/' || pathName === '') {
    workFile = path.join(reqFile, 'index.html');
  } else {
    workFile = reqFile;
  }
  // Verify the file exists
  if ((workFile.indexOf(__dirname) === 0) && fs.existsSync(workFile) &&
    fs.statSync(workFile).isFile()) {
    loadFileRequest(workFile, response);
  } else {
    // Setup the apiEmitter function that is called
    apiEmitter.on('call_api_endpoints', (queryData) => {
      const retVal = endPoints.switchApiEndpoints(url.parse(request.url).pathname, queryData,
        response, request);
      if (retVal !== true) { // If the endpoints failed, we return a 404 not found
        common.write404Message(`Requested file \n ${workFile} \nnot found`, response);
      }
      response.end();
    });
    const procReqResult = processRequestMethod(request, apiEmitter); // this method is async
    if (procReqResult === false) {
      console.error( // eslint-disable-line no-console
        'Unable to process request or call api endpoints', request);
    }
  }
}

// Create the Server
if (process.env.HTTP2_PLAIN) {
  console.log('Setting up HTTP2 Plain'); // eslint-disable-line no-console
  http2server = http2.raw.createServer({}, processRequest);
} else {
  console.log('Setting up HTTP2 TLS'); // eslint-disable-line no-console
  http2server = http2.createServer(httpServerOptions, processRequest);
}
console.log('Launching http2 server on 8080'); // eslint-disable-line no-console
console.log(`Web server root is set to ${httpFileRoot}`); // eslint-disable-line no-console
http2server.listen(8080, '127.0.0.1');
