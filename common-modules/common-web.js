/**
 * Common methods for use by the web server
 */

const common = module.exports = {};

/**
 * Writes a JSON message string to the response
 *
 *  @method common.writeJsonMessage
 *  @param {string} message Message to send
 *  @param {int} resType Response Type
 *  @param {object} res The response object
 *  @param {string} err An optional error to pass
 *  @returns bool
 */
common.writeJsonMessage = function writeJsonMessage(message, resType, res, err) {
  res.writeHead(resType, { 'Content-Type': 'application/json' });
  if (typeof(err) === 'undefined') {
    res.write(JSON.stringify({
      message,
      status: resType,
    }));
  } else {
    res.write(JSON.stringify({
      message,
      status: resType,
      error: err,
    }));
  }
  // res.end();
  return true;
};

/**
* Writes a string of data to the response as a http found 200
*
* @method common.writeCustomContent
* @param {String} content The data to write to the response/client
* @param {String} type The type of data that is being written
* @param {Object response The response object
*/
common.writeCustomContent = function writeCustomContent(content, type, response) {
  response.writeHead(200, { 'Content-Type': type });
  response.write(content);
  response.end();
};
/**
* Writes a string of data to the response as a http found 200
*
* @method common.writePlainMessage
* @param {String} msg The data to write to the response/client
* @param {Object} response The response object
*/
common.writePlainMessage = function writePlainMessage(msg, response) {
  response.writeHead(200, { 'Content-Type': 'text/plain; charset=UTF-8' });
  response.write(msg);
  // response.end();
};

// Send a 404 Not Found status
/**
* Writes a http 404 not found error to the response/client
*
* @method common.write404Message
* @param {String} msg The message to write to the response/client
* @param {Object} response The response object
*/
common.write404Message = function write404Message(msg, response) {
  console.error(`File not found: ${msg}`); // eslint-disable-line no-console
  response.writeHead(404, { 'Content-Type': 'text/html; charset=UTF-8' });
  response.write('<html><head><title>404 Not Found!</title></head>' +
    '<body><h1>404: Page Not Found!</h1><p>Sorry, but this page could not be found</p>' +
    `<pre>${msg}</pre>` +
    '</body></html>');
  response.end();
};
