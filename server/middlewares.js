const jwt = require("jsonwebtoken");
const secretKey = require("./secretKey");

const validarToken = (req, res, next) => {
  const authorization = req.header("Authorization");
  if (!authorization) return res.status(401).json({ message: "No llevas tu pase VIP (Token)" });

  try {
    const token = authorization.split("Bearer ")[1];
    const payload = jwt.verify(token, secretKey);
    req.user = payload; 
    next(); 
  } catch (error) {
    res.status(401).json({ message: "Ese pase ya no sirve o es falso" });
  }
};

module.exports = { validarToken };