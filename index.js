// index.js
const express = require('express');
const app = express();
const PORT = 3000;
const ecommerce = require('./ecommerce');
const passwordStrength = require('./PasswordStrengthChecker');

// Middleware for logging
const loggerMiddleware = (req, res, next) => {
  console.log(`[${new Date().toUTCString()}] ${req.method} ${req.url}`);
  next();
};

// Middleware for parsing incoming requests
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(loggerMiddleware);

// Mount routes
app.use('/ecommerce', ecommerce);
app.use('/password-strength', passwordStrength);

// Starting the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
