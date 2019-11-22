const jwt = require('jsonwebtoken')

const auth = async (req, res, next) => {
  // Get token from header
  const token = req.header('auth-token')

  // Check if not token
  if (!token) res.status(401).json({ msg: 'No token, authorization denied' })

  // Verify token
  try {
    await jwt.verify(token, 'mysecretkey', (error, decoded) => {
      if (error) res.status(401).json({ msg: 'Token is not valid' })
      else {
        req.user = decoded.userId
        next()
      }
    })
  } catch (err) {
    console.error('something wrong with auth middleware')
    res.status(500).json({ msg: 'Server Error' })
  }
}

module.exports = auth
