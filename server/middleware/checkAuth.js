const jwt = require("jsonwebtoken");
require("dotenv").config();

function checkAuth(req, res, next) {
  const tokenJWT = req.cookies.tokenJWT;
  if (!tokenJWT) {
    return res.status(401).json({
      message: "You are not authenticated",
      redirectUrl: "/logged-out",
    });
  }
  try {
    const payloadDecoded = jwt.verify(tokenJWT, process.env.JWT_KEY);
    req.user = payloadDecoded; // Imposta i dati dell'utente nel request

    next();
  } catch (err) {
    res
      .status(401)
      .json({
        message: "Il token fornito non è valido",
        redirectUrl: "/logged-out",
      });
  }
}

module.exports = checkAuth;
