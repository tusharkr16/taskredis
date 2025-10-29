import jwt from "jsonwebtoken";

export const verifyAdmin = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ msg: "No token" });

  try {
    const decoded = jwt.verify(token, "tusharkumar9871");
    req.admin = decoded;
    next();
  } catch (err) {
    res.status(403).json({ msg: "Invalid token" });
  }
};
