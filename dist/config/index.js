"use strict";

const _ = require('lodash');

const path = require('path');

let env = process.env.NODE_ENV || 'development';
let config = {
  viewDir: path.join(__dirname, '../', 'views'),
  staticDir: path.join(__dirname, '../', 'assets')
};

if (false) {
  console.log(123);
}

if (env == 'development') {
  const localConfig = {
    port: 8081,
    baseUrl: 'http://localhost:8080/'
  };
  config = _.extend(config, localConfig);
}

if (env == 'production') {
  const prodConfig = {
    port: 8080
  };
  config = _.extend(config, prodConfig);
}

module.exports = config;