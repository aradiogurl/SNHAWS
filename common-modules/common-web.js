/**
 * Common methods for use by the web server
 */

const common = module.exports = {};

/**
 * Writes a JSON message string to the response
 *
 *  @method writeJsonMessage
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
* @method displayMethod
* @param {String} msg The data to write to the response/client
* @param {Object} response The response object
*/
common.writePlainMessage = function writePlainMessage(msg, response) {
  response.writeHead(200, { 'Content-Type': 'text/plain; charset=UTF-8' });
  response.write(msg);
  // response.end();
};
