#!/usr/bin/env node
const _ = require('lodash');
const journalExports = module.exports = {
  apiRootName: 'htapi',
  apiVersion: '1',
  apiAuthModule: 'htvalidate',
  apiAuthMethod: 'validateRequest',
};

function writeJsonMessage(message, resType, res, err) {
  res.writeHead(resType, { 'Content-Type': 'application/json' });
  if (typeof(err) === 'undefined') {
    res.write(JSON.stringify({
      body: message,
      status: resType,
    }));
  } else {
    res.write(JSON.stringify({
      body: message,
      status: resType,
      error: err,
    }));
  }
  // res.end();
  return true;
}
/**
 * Health Tracker New Journal Entry Endpoint API Module
 *
 * @module newJournalEntry
 *
 * @param {String} url The file/path
 * @param {Object} query The parsed query
 * @param {Object} response The response object
 */
journalExports.newJournalEntry = function newJournalEntry(url, query, response) {
  const msg = 'Hello World, this is node';
  console.log(`Message to write: ${msg}`);
  response.writeHead(200, { 'Content-Type': 'text/plain; charset=UTF-8' });
  response.write(msg);
  return true;
};

/**
 * Health Tracker Edit Journal Endpoint API Module
 *
 * @module editJournalEntry
 *
 * @param {String} url The file/path
 * @param {Object} query The parsed query
 * @param {Object} response The response object
 */
journalExports.editJournalEntry = function editJournalEntry(url, query, response) {
  console.log(url, query, response);
  _.noop();
};

/**
 * Health Tracker delete Journal Endpoint API Module
 *
 * @module deleteJournalEntry
 *
 * @param {String} url The file/path
 * @param {Object} query The parsed query
 * @param {Object} response The response object
 */
journalExports.deleteJournalEntry = function deleteJournalEntry(url, query, response) {
  console.log(url, query, response);
  _.noop();
};

/**
 * Health Tracker Read Journal Endpoint API Module
 *
 * @module readJournalEntry
 *
 * @param {String} url The file/path
 * @param {Object} query The parsed query
 * @param {Object} response The response object
 */
journalExports.readJournalEntry = function readJournalEntry(url, query, response) {
  console.log(url, query, response);
  // select id, subject, datestamp, entry, tags
  // from journalEntries where id=query.id and owner=userid
  const staticEntry = {
    id: 1,
    date: '01/02/16 09:00',
    subject: 'Journal One',
    entry: 'This is the entry txt',
    tags: ['tagone', 'tagtwo', 'tagthree'],
  };
  writeJsonMessage(staticEntry, 200, response);
  return true;
};

/**
 * Health Tracker List Journals Endpoint API Module
 *
 * @module listJournalEntries
 *
 * @param {String} url The file/path
 * @param {Object} query The parsed query
 * @param {Object} response The response object
 */
journalExports.listJournalEntries = function listJournalEntries(url, query, response) {
  // Perform the entry lookup
  const staticEntries = [
    {
      id: 1,
      subject: 'Journal One',
      date: '01/02/16 09:00',
    },
    {
      id: 2,
      subject: 'Journal Two',
      date: '01/02/16 12:08',
    },
    {
      id: 3,
      subject: 'Journal Three',
      date: '01/02/16 17:23',
    },
  ];
  writeJsonMessage(JSON.stringify(staticEntries), 200, response);
  // return the results of the lookup
  /* response.writeHead(200, { 'Content-Type': 'application/json' });
  response.write(JSON.stringify(staticEntries));
  response.end(); */
  return true;
};

/**
 * Health Tracker search Journals Endpoint API Module
 *
 * @module searchJournalEntries
 *
 * @param {String} url The file/path
 * @param {Object} query The parsed query
 * @param {Object} response The response object
 */
journalExports.searchJournalEntries = function searchJournalEntries(url, query, response) {
  const thisVal = `Response Value ${response}`;
  writeJsonMessage(thisVal, 200, response);
  _.noop();
};
