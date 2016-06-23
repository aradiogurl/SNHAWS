# SNHAWS - Simple Node HTTP2 API and Web Server
A Simple Nodejs HTTP2 API and Web Server Project

## Purpose

A work-in-progress simple Nodejs based HTTP2 API and Web Server, which utilizies the node http2 server module. Provides a semi-dynamic API module infrastructure that supports setting the API path, version, and authentication and authorization support.
Originally designed for a simple API server project, it has been rebuilt, refined, and grown in capabilities.

## Current State

The Web Server is functional, but currently lacking the following planned features:

- Error and Access Logging
- Configuration file support
- Custom Error Pages
- Configurable file Mime-types
- Documentation on building modules

## Project Goal

A functionally complete HTTP2 API and Web server, that provides an easy to use but expandable module infrastructure.

## License

L incensed under the terms of the GNU GPLv3 license. See [LICENSE](LICENSE) for more information.

## Requirements

Required packages for the current implementation of the SNHAWS

### Packages and Dependencies

The most up to date list should always be available through the package.json file

```json
"engines": {
    "node": "6.2.2"
},
"dependencies": {
    "eslint-plugin-import": "1.9.1",
    "events": "1.1.0",
    "fs": "0.0.2",
    "http2": "3.3.4",
    "ink-docstrap": "1.2.1",
    "jsdoc": "3.4.0",
    "jsdoc-to-markdown": "1.3.6",
    "jwt-simple": "0.5.0",
    "lodash": "4.13.1",
    "modules-autoloader": "1.1.1",
    "path": "0.12.7",
    "querystring": "0.2.0",
    "request": "2.72.0",
    "sys": "0.0.1",
    "url": "0.11.0",
    "util": "0.10.3"
},
"devDependencies": {
    "eslint": "^2.12.0",
    "eslint-config-airbnb": "^9.0.1",
    "eslint-plugin-import": "^1.9.1",
    "eslint-plugin-jsx-a11y": "^1.4.2",
    "eslint-plugin-react": "^5.1.1",
    "gulp-eslint": "^2.0.0",
    "gulp-nodemon": "^2.1.0",
    "gulp-shell": "^0.5.2"
  }
```
  
## Initializing the Dev Environment *(Not required when cloning from git)

### Install Gulp
Gulp is being used in conjunction with gulp-nodeamon to watch for changes and restart the api server.

 npm install --global gulp

From project directory

### Install the SNHAWS dependencies
npm install

### GIT Settings

Setup your .gitignore to ignore the following files
- node_modules
- npm-debug.log
- snhaws-tech-docs

## Starting the Simple Nodejs HTTP2 API and Web Server
Run gulp

 gulp
 
## 