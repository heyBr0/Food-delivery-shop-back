import jwt from "jsonwebtoken";
import UsersCollection from "../Models/userSchema.js";

async function verifyToken(req, res, next) {
  try {    
    // extracting token out from headers
    const { token } = req.headers;
    //console.log(req.cookies.token);
    // verify token
    const payload = jwt.verify(token, process.env.SECRET);
    // get user from database
    const user = await UsersCollection.findById(payload._id);
    // attaching user in request
    console.log(payload);
  
    req.user = user
    next()
  } catch (err) {
    next(err);
  }
}

export default verifyToken;
