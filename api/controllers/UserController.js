/**
 * UserController
 *
 * @module      :: Controller
 * @description	:: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {

  foo: function(req, res) {

    res.send(200);
  },
    
  create: function(req, res, next) {

  	var userObj = {
  		name: req.param('name'),
  		email: req.param('email'),
  		company: req.param('company'),
  		phone: req.param('phone')
  	}

  	User.create(userObj, function userCreated(err, user){

  		if (err)  return next(err);

  		res.json({user: user});

  	});

  },  

  profile: function (req, res, next) {
    var slug = req.param('slug');

    // Use whatever heuristics you want to make sure
    // you don't add the overhead of doing this slug
    // match (which involves a slow User query) for 
    // every single request for flat files, i.e. assets 
    // or your favicon.ico or robots.txt.
    //
    // A good heurstic  is looking for things with dots.
    if (slug.match(/\..+$/)) return next();

    User
    .findOneBySlug(slug)
    .exec(function (err, user) {
        if (err) return res.serverError(err);
        if (!user) return next();
        res.view({user: user});

      });
  },

  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to UserController)
   */
  _config: {}

  
};
