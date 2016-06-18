#!/usr/bin/env node
const _ = require('lodash');
/* Mock authentication modules */

const jwt = require('jwt-simple');
const secretFile = require('./config/secret');
let auth = {};

function expiresIn(numDays) {
  const dateObj = new Date();
  return dateObj.setDate(dateObj.getDate() + numDays);
}
/**
 * Generate Token mock private function
 *
 * @method genToken
 *
 * @param {String} user The username
 * @return {Object} The token object
 */
function genToken(user) {
  const expires = expiresIn(7); // 7 days
  const token = jwt.encode({
    exp: expires,
  }, secretFile());
  return {
    token,
    expires,
    user,
  };
}

function writeJsonResponse(jsonData, res) {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.write(JSON.stringify(jsonData));
  res.end();
  return true;
}

auth = {
  apiRootName: 'mockapi',
  apiVersion: '1',
  /**
   * Login mock function
   *
   * @module mockauth.login
   *
   * @param {String} url The file/path
   * @param {Object} qry The parsed query
   * @param {Object} res The response object
   */
  login: function login(url, qry, res) {
    const username = qry.username || '';
    const password = qry.password || '';
    let dbUserObj = {};
    console.log(`Validating user: ${username}`); // eslint-disable-line no-console
    if (username === '' || password === '') {
      writeJsonResponse({
        status: 401,
        message: 'Invalid credentials',
      }, res);
      return;
    }
    // Fire a query to your DB and check if the credentials are valid
    dbUserObj = auth.validate(username, password);
    if (!dbUserObj) { // If authentication fails, we send a 401 back
      writeJsonResponse({
        status: 401,
        message: 'Invalid credentials',
      }, res);
      return;
    }
    if (dbUserObj) {
      // If authentication is success, we will generate a token
      // and dispatch it to the client
      writeJsonResponse(genToken(dbUserObj), res);
    }
  },
  /**
   * Validation mock function
   *
   * @module mockauth.validate
   *
   * @param {String} username The username
   * @param {String} password The password
   */
  validate: function validate(username, password) {
    // spoofing the DB response for simplicity
    const dbUserObj = { // spoofing a userobject from the DB
      name: 'arvind',
      role: 'admin',
      username: 'arvind@myapp.com',
    };
    if (username === password) {
      _.noop(); // placeholder
    }
    return dbUserObj;
  },
  /**
   * Validate User mock function
   *
   * @module mockauth.validateUser
   *
   * @param {String} username The username
   */
  validateUser: function validateUser(username) {
    // spoofing the DB response for simplicity
    if (username === '1234') {
      _.noop(); // placeholder
    }
    const dbUserObj = { // spoofing a userobject from the DB.
      name: 'arvind',
      role: 'admin',
      username: 'arvind@myapp.com',
    };
    return dbUserObj;
  },
};

module.exports = auth;
