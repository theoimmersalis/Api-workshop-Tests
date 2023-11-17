'use strict';

const httpError = require('http-errors');
const User = require('../models/user');
const ctrl = {};

/**
 * Display all users.
 *
 * @param  {Request}  req
 * @param  {Response} res
 * @param  {function} next
 */
ctrl.index = function index(req, res, next) {
  User
    .find()
    .sort({createdAt: 'desc'})
    .then(function(users) {
      return res.status(200).send(users);
    })
    .catch(next)
  ;
};

/**
 * Create a new user.
 *
 * @param  {Request}  req
 * @param  {Response} res
 * @param  {function} next
 */
ctrl.create = function create(req, res, next) {
  User
    .create(req.body)
    .then(function(user) {
      return res.status(201).send(user);
    })
    .catch(next)
  ;
};

/**
 * Update an user.
 *
 * @param  {Request}  req
 * @param  {Response} res
 * @param  {function} next
 */
ctrl.update = function update(req, res, next) {
  User
    .findOneAndUpdate({_id: req.params.id}, req.body, {new: true})
    .then(function(user) {
      if (user) {
        return res.status(200).send(user);
      }

      throw httpError(404, 'Cannot find user: ' + req.params.id);
    })
    .catch(next)
  ;
};

/**
 * Remove a given user.
 *
 * @param  {Request}  req
 * @param  {Response} res
 * @param  {function} next
 */
ctrl.destroy = function destroy(req, res, next) {
  User
    .findOneAndRemove({_id: req.params.id})
    .then(function(user) {
      return res.status(200).send(user);
    })
    .catch(next)
  ;
};

/**
 * Display a given user.
 *
 * @param  {Request}  req
 * @param  {Response} res
 * @param  {function} next
 */
ctrl.show = function show(req, res, next) {
  User
    .findById(req.params.id)
    .then(function(user) {
      if (user) {
        return res.status(200).send(user);
      }

      throw next(httpError(404, 'Cannot find user: ' + req.params.id));
    })
    .catch(next)
  ;
};

module.exports = ctrl;
