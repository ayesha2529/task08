// index.js
const express = require('express');
const app = express();
const PORT = 3000;
const ecommerceRoutes = require('./ecommerce');
const passwordStrengthRoutes = require('./PasswordStrengthChecker');

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
app.use('/ecommerce', ecommerceRoutes);
app.use('/password-strength', passwordStrengthRoutes);

// Starting the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
