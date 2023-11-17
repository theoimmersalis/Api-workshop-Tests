/**
 * User model
 */

'use strict';

// eslint-disable-next-line no-redeclare
let mongoose = require('mongoose');

const Schema = mongoose.Schema;


/*----------------------------------------------------------------------------*\
  Schema
\*----------------------------------------------------------------------------*/

/**
 * User Schema
 * @constructor User
 */
const UserSchema = new Schema(/** @lends User.prototype */ {
  // meta data
  createdAt: {
    type: Date,
    default: Date.now,
  },

  updatedAt: {
    type: Date,
    default: Date.now,
  },

  username: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 10,
    unique: true,
  },

  email: {
    type: String,
    minLength: 5,
    maxLength: 30,
  },

  articles: [{
    type: Schema.Types.ObjectId,
    ref: 'Article',
  }],
}, {
  timestamps: true,
});


/*----------------------------------------------------------------------------*\
  Increase
\*----------------------------------------------------------------------------*/

UserSchema.virtual('id').get(function() {
  return this._id.toString();
});

/*----------------------------------------------------------------------------*\
  Expose
\*----------------------------------------------------------------------------*/

// JSON serialization
UserSchema.set('toJSON', {
  getters: true,
  virtuals: true,
});

module.exports = mongoose.model('User', UserSchema);
