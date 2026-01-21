require('dotenv').config({ path: 'variables.env' });
const app = require('./apiApp');

const port = process.env.API_PORT || 3001;
app.listen(port, () => {
  console.log(`API Server running on http://localhost:${port}`);
});

