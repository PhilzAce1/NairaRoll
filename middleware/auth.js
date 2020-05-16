const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token)
    res
      .status(401)
      .json({ success: false, payload: 'Access denied. No token provided' });

  try {
    const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({
      success: false,
      payload: 'invalid Token',
    });
  }
};
