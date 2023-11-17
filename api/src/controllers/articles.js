'use strict';

const httpError = require('http-errors');
const Article = require('../models/article');
const ctrl = {};

/**
 * Display all articles.
 *
 * @param  {Request}  req
 * @param  {Response} res
 * @param  {function} next
 */
ctrl.index = function index(req, res, next) {
  Article
    .find()
    .sort({createdAt: 'desc'})
    .then(function(articles) {
      return res.status(200).send(articles);
    })
    .catch(next)
  ;
};

/**
 * Create a new article.
 *
 * @param  {Request}  req
 * @param  {Response} res
 * @param  {function} next
 */
ctrl.create = function create(req, res, next) {
  Article
    .create(req.body)
    .then(function(article) {
      return res.status(201).send(article);
    })
    .catch(next)
  ;
};

/**
 * Update an article.
 *
 * @param  {Request}  req
 * @param  {Response} res
 * @param  {function} next
 */
ctrl.update = function update(req, res, next) {
  Article
    .findOneAndUpdate({_id: req.params.id}, req.body, {new: true})
    .then(function(article) {
      if (article) {
        return res.status(200).send(article);
      }

      throw httpError(404, 'Cannot find article: ' + req.params.id);
    })
    .catch(next)
  ;
};

/**
 * Remove a given article.
 *
 * @param  {Request}  req
 * @param  {Response} res
 * @param  {function} next
 */
ctrl.destroy = function destroy(req, res, next) {
  Article
    .findOneAndRemove({_id: req.params.id})
    .then(function(article) {
      return res.status(200).send(article);
    })
    .catch(next)
  ;
};

/**
 * Display a given article.
 *
 * @param  {Request}  req
 * @param  {Response} res
 * @param  {function} next
 */
ctrl.show = function show(req, res, next) {
  Article
    .findById(req.params.id)
    .then(function(article) {
      if (article) {
        return res.status(200).send(article);
      }

      throw next(httpError(404, 'Cannot find article: ' + req.params.id));
    })
    .catch(next)
  ;
};

module.exports = ctrl;
