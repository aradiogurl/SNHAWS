const jwt = require('jwt-simple');
const validateUser = require('./htauth').validateUser;
const configSecret = require('../config/secret.js');
const validateExports = module.exports = {
  apiRootName: 'htapi',
  apiVersion: '1',
};

function writeJsonMessage(message, resType, res, err) {
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
}

// module.exports = function(req, res, next) {
// This may not work as a stardard plug in module
// ... it really all depends on how this is called
// Needs (Request, Resource, next(the method to call upon  success))
validateExports.validateRequest = function validateRequest(url, qry, res, req) {
  // When performing a cross domain request, you will recieve
  // a preflighted request first. This is to check if our the app
  // is safe.
  // We skip the token outh for [OPTIONS] requests.
  // if(req.method == 'OPTIONS') next();

  // const token = (req.body && req.body.access_token) || (req.query && req.query.access_token) ||
  const token = (qry && qry.token) || req.headers['x-access-token'];
  // const key = (req.body && req.body.x_key) || (req.query && req.query.x_key) ||
  const key = (qry && qry.x_key) || req.headers['x-key'];

  console.log('token', token);
  console.log('key', key);
  // If we have a token or a key, let's check those
  if (token || key) {
    console.log('trying token or key');
    try {
      const decoded = jwt.decode(token, configSecret());
      console.log('decoded token', decoded);
      let dbUser = ''; // The key would be the logged in user's username
      if (decoded.exp <= Date.now()) {
        writeJsonMessage('Token Expired', 400, res);
        return false;
      }
      // Authorize the user to see if s/he can access our resources
      dbUser = validateUser(key); // The key would be the logged in user's username
      if (dbUser) {
        console.log('logged in as ', dbUser);
        if ((req.url.indexOf('admin') >= 0 && dbUser.role === 'admin') ||
          (req.url.indexOf('admin') < 0 && req.url.indexOf('/htapi/v1/') >= 0)) {
          // hmm, what should I do here? there is no moving to the next is there?
          // next could be calling the middlewhere, I think we can do that
          // next(); // To move to next middleware
          writeJsonMessage('Success', 200, res);
          return true; // continue
        }
        writeJsonMessage('Not Authorized', 403, res);
        return false;
      }
      // No user with this name exists, respond back with a 401
      writeJsonMessage('Invalid User', 401, res);
      return false;
    } catch (err) {
      writeJsonMessage('Oops something went wrong', 500, res, err);
      return false;
    }
  } else {
    writeJsonMessage('Invalid Token or Key', 401, res);
    return false;
  }
};
