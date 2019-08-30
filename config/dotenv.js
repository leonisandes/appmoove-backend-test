const dotenv = require('dotenv-safe');

dotenv.config({
    allowEmptyValues: true,
    path: isProductionMode() ? '.env' : '.env.dev',
});

if (isProductionMode()) {
    console.log('Executing in production mode.');
} else {
    console.log('Executing in development mode.');
}

function isProductionMode() { return process.env.NODE_ENV === 'PROD'; }

module.exports = dotenv
