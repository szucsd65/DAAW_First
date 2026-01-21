const { Types } = require('mongoose');
const ObjectId = Types.ObjectId;

exports.loginGet = (req, res) => {
  res.render('login', { error: req.query.error });
};

exports.loginPost = (req, res) => {
  
  const fakeUser = { 
    email: req.body.email || 'guest@cityequip.com', 
    role: 'admin', 
    name: 'Test User' 
  };
  
  req.session.user = fakeUser;
  req.session.save((err) => {
    if (err) {
      console.error('Session save error:', err);
      return res.redirect('/login?error=Session error');
    }
    res.redirect('/equipments');
  });
};

exports.logout = (req, res) => {
  req.session.destroy();
  res.redirect('/login');
};

exports.requireAuth = (req, res, next) => {
  const user = req.session.user || req.user;
  if (user) {
    res.locals.user = user;
    next();
  } else {
    res.redirect('/login');
  }
};

exports.registerGet = (req, res) => {
  res.render('register');
};

exports.registerPost = (req, res) => {
  req.flash('success', 'Registered! Please login.');
  res.redirect('/login');
};

exports.requireAdmin = (req, res, next) => {
  const user = req.session.user || req.user;
  
  if (user && user.role === 'admin') {
    res.locals.user = user;
    return next();
  }
  
  req.flash('error', 'Admin access required');
  res.redirect('/equipments');
};


