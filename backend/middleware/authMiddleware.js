const { verifyToken } = require('../utils/jwt');

function authenticate(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1]; // Extract token from Authorization header
  if (!token) return res.status(401).json({ error: 'Access denied, token missing' });

  try {
    const decoded = verifyToken(token); // Verify and decode the token
    req.user = decoded; // Attach the decoded user object to req.user
    next(); // Call the next middleware or route handler
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
}


function authorizeRole(role) {
  return (req, res, next) => {
    if (req.user.role !== role) {
      return res.status(403).json({ error: 'Forbidden: Insufficient permissions' });
    }
    next();
  };
}

module.exports = { authenticate, authorizeRole };
