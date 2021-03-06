var Strategy = require('../models/strategy.js').Strategy;
var User = require('../models/user').User;
var strategies = require('./strategies.json');

exports.home = function(req, res) {
  var options = { 'title': 'Home page' };
  var user = req.session.user;

  if (!user) {
    Strategy.find({}, function(err, strats) {
      options.strategies = [];

      // Get the strategies we have OAuth keys for
      strats.forEach(function(strat) {
        options.strategies.push({ 'strat' : strat.name,
          'display' : strat.display });
      });

      // Get OpenId strategies
      for (var name in strategies) {
        var strategy = strategies[name];
        if (!strategy.oauth) {
          options.strategies.push({ 'strat' : name,
            'display' : strategy.name });
        }
      }

      res.render('index', options, res);
    });
  } else {
    options.username = user.name;
    res.render('index', options, res);
  }
}
