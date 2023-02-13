const path = require('path');
const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv').config();
const { errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');
const port = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/fixie', require('./routes/fixieRoutes'));
app.use('/api/member', require('./routes/memberRoutes'));
app.use('/api/order', require('./routes/orderRoutes'));
app.use('/api/quotation', require('./routes/quotationRoutes'));
app.use('/api/service', require('./routes/serviceRoutes'));
app.use('/api/review', require('./routes/reviewRoutes'));

// Serve frontend
// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static(path.join(__dirname, '../frontend/build')));

//   app.get('*', (req, res) =>
//     res.sendFile(
//       path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')
//     )
//   );
// } else {
//   app.get('/', (req, res) => res.send('Please change to production mode'));
// }

// "heroku-postbuild": "NPM_CONFIG_PRODUCTION=false npm install --prefix frontend && npm run build --prefix frontend"

app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
