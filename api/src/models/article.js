/**
 * Article model
 */

'use strict';

// eslint-disable-next-line no-redeclare
let mongoose = require('mongoose');

const Schema = mongoose.Schema;


/*----------------------------------------------------------------------------*\
  Schema
\*----------------------------------------------------------------------------*/

/**
 * Article Schema
 * @constructor Article
 */
const ArticleSchema = new Schema(/** @lends Article.prototype */ {
  // meta data
  createdAt: {
    type: Date,
    default: Date.now,
  },

  updatedAt: {
    type: Date,
    default: Date.now,
  },

  title: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 20,
  },

  content: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 5000,
  },

  author: {
    type: String,
    minLength: 2,
    maxLength: 20,
  },

  user: {
    type: Schema.ObjectId,
    ref: 'User',
  },
}, {
  timestamps: true,
});


/*----------------------------------------------------------------------------*\
  Increase
\*----------------------------------------------------------------------------*/

ArticleSchema.virtual('id').get(function() {
  return this._id.toString();
});

/*----------------------------------------------------------------------------*\
  Expose
\*----------------------------------------------------------------------------*/

// JSON serialization
ArticleSchema.set('toJSON', {
  getters: true,
  virtuals: true,
});

module.exports = mongoose.model('Article', ArticleSchema);
