#!/usr/bin/env node
const _ = require('lodash');
const data = [{
  name: 'User 1',
  id: '1',
}, {
  name: 'User 2',
  id: '2',
}, {
  name: 'User 3',
  id: '3',
}];
let users = {};
/**
 *
 * @method writeJsonResponse
 *
 * @param {object} jsonData json object to write
 * @param {object} res the resonse object
 */
function writeJsonResponse(jsonData, res) {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.write(JSON.stringify(jsonData));
  // res.end();
  return true;
}

/**
 * Mock Users Admin
 *
 * @module users
 *
 * @param {String} url The file/path
 * @param {Object} query The parsed query
 * @param {Object} response The response object
 */
users = {
  apiRootName: 'mockapi',
  apiVersion: '1',
  /**
   *
   * @module mockusers.getAll
   * Returns all users
   *
   * @param {string} url The url/path
   * @param {Object} qry the query object
   * @param {Object} res the response object
   */
  getAll: function getAll(url, qry, res) {
    const allusers = data; // Spoof a DB call
    writeJsonResponse(allusers, res);
  },
  /**
   *
   * @module mockusers.getOne
   * Returns the users specified by the id
   *
   * @param {string} url The url/path
   * @param {Object} qry the query object
   * @param {Object} res the response object
   */
  getOne: function getOne(url, qry, res) {
    const id = qry.id;
    let user = ''; // Spoof a DB call
    user = _.find(data, userData => userData.id === id);
    writeJsonResponse(user.name, res);
  },
  create: function create(url, qry, res) {
    const newuser = qry.body;
    data.push(newuser); // Spoof a DB call
    writeJsonResponse(newuser, res);
  },
  update: function update(url, qry, res) {
    const updateuser = qry.body;
    const id = qry.id;
    data[id] = updateuser; // Spoof a DB call
    writeJsonResponse(updateuser, res);
  },
  deleteUser: function deleteUser(url, qry, res) {
    const id = qry.id;
    data.splice(id, id); // Spoof a DB call
    writeJsonResponse(true, res);
  },
};

module.exports = users;
