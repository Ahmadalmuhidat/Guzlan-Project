const pool = require("../helper/database").pool.promise(); // Use promise wrapper
const bcrypt = require("bcryptjs"); // For password hashing
const jwt = require("jsonwebtoken"); // For JWT generation
const uuid = require("uuid");

// JWT secret key 
const JWT_SECRET = process.env.JWT_SECRET ;

// Get all users
exports.GetUsers = async (req, res) => {
  const sqlQuery = "SELECT * FROM Users";
  try {
    const [results] = await pool.query(sqlQuery); // Await the query execution
    res.status(200).json({ data: results });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ErrorMessage: "Something went wrong" });
  }
};

// Register a new user
exports.Register = async (req, res) => {
  const { username, email, password } = req.body;
  const userid = uuid.v4();
  const role = "user";

  if (!username || !email || !password) {
    return res.status(400).json({ ErrorMessage: "All fields are required" });
  }

  try {
    // Check if the user already exists
    const userExistsQuery = "SELECT * FROM Users WHERE email = ?";
    const [existingUser] = await pool.query(userExistsQuery, [email]);

    if (existingUser.length > 0) {
      return res.status(400).json({ ErrorMessage: "User already exists" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Insert the new user into the database
    const insertUserQuery = "INSERT INTO Users (UserID, Name, Email, Password, Role) VALUES (?, ?, ?, ?, ?)";
    const [result] = await pool.query(insertUserQuery, [userid, username, email, hashedPassword, role]);

    // Generate JWT
    const tokenPayload = { id: result.insertId, username, email };
    const token = jwt.sign(tokenPayload, JWT_SECRET, { expiresIn: "1h" });

    res.status(201).json({
      message: "User registered successfully",
      token,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ErrorMessage: "Something went wrong" });
  }
};

// Login a user
exports.Login = async (req, res) => {
  const email = req.query.email;
  const password = req.query.password;

  // Validate request body
  if (!email || !password) {
    return res.status(400).json({ ErrorMessage: "Email and password are required" });
  }

  try {
    // Check if the user exists
    const userQuery = "SELECT * FROM Users WHERE Email = ?";
    const [users] = await pool.query(userQuery, [email]);

    if (users.length === 0) {
      return res.status(404).json({ ErrorMessage: "User not found" });
    }

    const user = users[0]; // Get the user details

    // Validate the password
    const isPasswordMatch = await bcrypt.compare(password, user.Password);
    if (!isPasswordMatch) {
      return res.status(401).json({ ErrorMessage: "Email or password is incorrect" });
    }

    // Generate JWT
    const tokenPayload = { id: user.UserID, username: user.Name, email: user.Email, role: user.Role };
    const token = jwt.sign(tokenPayload,process.env.JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({
      message: "Login successful",
      token,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ErrorMessage: "Something went wrong" });
  }
};
