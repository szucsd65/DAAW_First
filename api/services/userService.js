const jwt = require('jsonwebtoken');
const User = require('../models/User'); 

exports.loginUser = async (email, password) => {
  const user = { _id: 'fake1', email, role: 'user' };
  return jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '1h' });
};

exports.registerUser = async (userData) => {
  const user = new User(userData);
  return await user.save();
};

exports.getUserById = async (id) => User.findById(id);
