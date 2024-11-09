const { db } = require("../db/index.js"); 
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET; 

module.exports.signup = async (req, res) => {
  const {
    email,
    phone,
    entity_name,
    address,
    latitude,
    longitude,
    legal_identity,
    entity,
    password,
  } = req.body;

  try {
    const existingUser = await db("users").where({ email }).first();
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }
    if (!password) {
      return res.status(400).json({ error: "Password is required" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new users
    await db("users").insert({
      email,
      phone,
      entity_name,
      address,
      latitude,
      longitude,
      legal_identity,
      entity,
      password: hashedPassword,
    });

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find users by email
    const users = await db("users").where({ email }).first();
    if (!users) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // Compare provided password with hashed password in database
    const isPasswordValid = await bcrypt.compare(password, users.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // Generate JWT token
    // const token = jwt.sign(
    //   { id: users.id, entity: users.entity, email: users.email },
    //   JWT_SECRET,
    //   {
    //     expiresIn: "1h",
    //   }
    // );

    res.json({ message: "Login successful", users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};
