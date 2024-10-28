const crypto = require('crypto');

const generateJwtSecret = () => {
  return crypto.randomBytes(64).toString('hex');
};

const jwtSecret = generateJwtSecret();
console.log('Your JWT_SECRET:', jwtSecret);