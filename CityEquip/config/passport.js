const LocalStrategy = require('passport-local').Strategy;
const axios = require('axios');

const API_URL = process.env.API_URL || 'http://localhost:3001/users';

module.exports = function(passport) {
  
  passport.use(new LocalStrategy(
    { usernameField: 'email', passwordField: 'password' },
    async (email, password, done) => {
      try {
        const { data: user } = await axios.post(`${API_URL}/login`, {
          email,
          password
        });
        
        if (!user) return done(null, false);
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  ));
  
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });
  
  passport.deserializeUser(async (id, done) => {
    try {
      const { data: user } = await axios.get(`${API_URL}/${id}`);
      done(null, user);
    } catch (err) {
      done(err);
    }
  });
};
