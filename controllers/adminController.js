import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Admin } from "../models/Admin.js"

export const signup = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existing = await Admin.findOne({ email });
    if (existing) return res.status(400).json({ msg: "Admin already exists" });

    const hashed = await bcrypt.hash(password, 10);
    const admin = await Admin.create({ email, password: hashed });
    res.json({ msg: "Admin registered", admin });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(404).json({ msg: "Admin not found" });

    const valid = await bcrypt.compare(password, admin.password);
    if (!valid) return res.status(401).json({ msg: "Invalid credentials" });

    const token = jwt.sign({ id: admin._id }, "tusharkumar9871", {
      expiresIn: "1h",
    });

    res.json({ msg: "Login successful", token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
