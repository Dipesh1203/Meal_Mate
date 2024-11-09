const { db } = require("../db/index.js"); // Ensure knex instance is correctly imported
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET; // Get JWT secret from environment variables

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
    // Check if user already exists
    const existingUser = await db("user").where({ email }).first();
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }
    if (!password) {
      return res.status(400).json({ error: "Password is required" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new user
    await db("user").insert({
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
    // Find user by email
    const user = await db("user").where({ email }).first();
    if (!user) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // Compare provided password with hashed password in database
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ message: "Login successful", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};
