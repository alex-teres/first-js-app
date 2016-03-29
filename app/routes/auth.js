function login (req, res, next) {
  passport.authenticate('local',
    function(err, user, info) {
      return err
      ? next(err)
      : user
      ? req.logIn(user, function(err) {
        return err
        ? next(err)
        : res.redirect('/private');
      })
      : res.redirect('/');
    }
    )(req, res, next);
  };

  function register (req, res, next) {
    var user = new User({ username: req.body.email, password: req.body.password});
    user.save(function(err) {
      return err
      ? next(err)
      : req.logIn(user, function(err) {
        return err
        ? next(err)
        : res.redirect('/private');
      });
    });
  };