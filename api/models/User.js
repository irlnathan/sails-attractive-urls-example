/**
 * User
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  attributes: {

  	name: {
  		type: 'string',
  		required: true
  	},

  	slug: {

  		type: 'string',
  	},

  	email: {
  		type: 'string',
  		email: true,
  		required: true,
  		unique: true
  	},

  	company: {
  		type: 'string'
  	},

  	phone: {
  		type: 'string'
  	}  
    
  },

  beforeCreate: function (values, next) {

  	if (!values.name) {
  		return next({err: ["Must have a username!"]});
  	}

  	values.slug = values.name.replace(/\s+/g, '').toLowerCase();

  	next();

  }

};
