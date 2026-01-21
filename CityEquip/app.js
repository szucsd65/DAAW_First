require('dotenv').config({ path: 'variables.env' });
const express = require('express');
const path = require('path'); 
const session = require('express-session');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const methodOverride = require('method-override');

const app = express();

app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, 'public')));
app.use('/dist', express.static(path.join(__dirname, 'node_modules/bootstrap/dist')));
app.use('/icons', express.static(path.join(__dirname, 'public/icons')));
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  if (req.method === 'POST') {
    console.log('POST HIT:', req.path, 'DATA:', req.body);
  }
  next();
});
app.use(express.json());
app.use(methodOverride('_method'));

app.use(flash());

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Web app DB connected'))
  .catch(err => console.error('Mongo error:', err.message));

app.use(session({
  secret: process.env.SESSION_SECRET || 'cityequip-fixed-2026',
  resave: false,
  saveUninitialized: false,
  rolling: true,
  cookie: { 
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'lax',  
    maxAge: 1000 * 60 * 60 * 24 
  }
}));


app.get('/', (req, res) => res.redirect('/login'));

app.use('/', require('./routes/webRouter'));

app.use((req, res, next) => {
  res.locals.user = req.session?.user || null;
  res.locals.messages = req.flash();
  res.locals.flashes = req.flash();
  next();
});

app.use((req, res) => res.status(404).render('404'));
app.use((err, req, res) => {
  console.error(err);
  res.status(500).render('error', { error: err.message });
});

const port = process.env.PORT || 7777;
app.listen(port, '0.0.0.0', () => console.log(`CityEquip: http://localhost:${port}`));
