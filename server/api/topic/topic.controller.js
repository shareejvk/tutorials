/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/topics              ->  index
 * POST    /api/topics              ->  create
 * GET     /api/topics/:id          ->  show
 * PUT     /api/topics/:id          ->  update
 * DELETE  /api/topics/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
var Topic = require('./topic.model');

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

function responseWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function saveUpdates(updates) {
  return function(entity) {
    var updated = _.merge(entity, updates);
    return updated.saveAsync()
      .spread(updated => {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.removeAsync()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

// Gets a list of Topics
export function index(req, res) {
  Topic.findAsync()
    .then(responseWithResult(res))
    .catch(handleError(res));
}

// Gets a single Topic from the DB
export function show(req, res) {
  Topic.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(responseWithResult(res))
    .catch(handleError(res));
}

// Creates a new Topic in the DB
export function create(req, res) {
  Topic.createAsync(req.body)
    .then(responseWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Topic in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Topic.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(responseWithResult(res))
    .catch(handleError(res));
}

// Deletes a Topic from the DB
export function destroy(req, res) {
  Topic.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
