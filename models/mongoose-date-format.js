'use strict';

const _ = require('lodash');
const moment = require('moment');

function findPaths(schema) {
  return Object.keys(schema.paths).filter((path) => {
    return schema.paths[path].instance === 'Date';
  });
}

module.exports = function toJSON(schema) {

  //NOTE: this plugin is actually called *after* any schema's
  //custom to JSON has been defined, need to be sure not to overwrite. Place here and called later
  let transform;
  if (schema.options.toJSON && schema.options.toJSON.transform) {
    transform = schema.options.toJSON.transform;
  }

  //Extend toJSON options
  schema.options.toJSON = Object.assign(schema.options.toJSON || {}, {
    transform(doc, ret) {

      // find date field
      const paths = findPaths(schema);

      // format
      _.each(paths, (path, index) => {
        const date = _.get(ret, path);
        _.set(ret, path, moment(date).format('MM-DD-YYYY'));
      });
      

      //Call custom transform if present
      if (transform) {
        return transform(doc, ret);
      }
    }
  });
};