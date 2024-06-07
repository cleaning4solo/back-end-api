const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) {
    return res.status(401).send({ message: 'Token diperlukan' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).send({ message: 'Token tidak valid atau telah kadaluarsa' });
    }
    req.user = user;
    next();
  });
}

// Fungsi untuk menghasilkan token
function generateToken(userId) {
  const secretKey = process.env.JWT_SECRET; // Gunakan variabel lingkungan untuk secret key
  const expiresIn = '1h'; // Durasi token
  return jwt.sign({ _id: userId }, secretKey, { expiresIn });
}

module.exports = { authenticateToken, generateToken };
