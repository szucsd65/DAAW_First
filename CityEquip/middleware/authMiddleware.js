exports.isLoggedIn = (req, res, next) => {
  if (req.user || req.session.user) return next();
  res.redirect('/login');
};

exports.isAdmin = (req, res, next) => {
  if (req.user?.role === 'admin') return next();
  res.redirect('/equipments');
};
