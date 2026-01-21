const jwt = require('jsonwebtoken');

exports.authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  const apiKey = req.headers['x-api-key'];
  
  if (!token && !apiKey) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  
  try {
    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
    } else if (apiKey === process.env.API_KEY) {
      req.user = { role: 'admin' };
    } else {
      return res.status(403).json({ error: 'Forbidden' });
    }
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
};
