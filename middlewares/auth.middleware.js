const jwt = require("jsonwebtoken");
const authenticate = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ error: "Acceso denegado" });
  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).json({ error: "Token no válido" });
  }
};
const authorize = (roles) => (req, res, next) => {
  if (!roles.includes(req.user.rol)) {
    return res.status(403).json({ error: "Acceso prohibido" });
  }
  next();
};
module.exports = { authenticate, authorize };
