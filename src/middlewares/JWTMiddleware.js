const jwt = require("jsonwebtoken");

const ValidateToken = (req, res, next) => {
  let token = "";

  if(req.method == "POST"){
    token = req.body.token; 
  }else if(req.method == "GET"){
    token = req.query.token; 
  }else{
    res.status(500).json({ ErrorMessage: "Request is not allowed!" });
  }

  const JWT_SECRET = process.env.JWT_SECRET ;
  if (!token){
    res.status(500).json({ErrorMessage: "Token must be provided!"})
  }
  
  try {
      const token_valid = jwt.verify(token, JWT_SECRET);
    if (token_valid){
      next();
    }
  } catch (error) {
    res.status(500).json({ ErrorMessage: "Token is not valied" });
  }
  
};

module.exports = ValidateToken;