import User from '../models/User.js';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';

export const register = async (req, res) => {
  try {
    const { name, email, password, birthYear, gender } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email is already in use." });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      id: new mongoose.Types.ObjectId().toString(), // Keep backward compatibility
      name,
      email,
      password: hashedPassword,
      birthYear,
      gender,
      savedEstablishments: [],
    });

    await newUser.save();
    
    // Don't send password back
    const userResponse = newUser.toObject();
    delete userResponse.password;

    res.status(201).json({ message: "User registered successfully.", user: userResponse });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    // Check if password is hashed (for legacy users, if any, plain text check might be needed but let's assume new system or migration)
    // Since we are modifying the backend, we assume we can enforce hashing.
    // If there are existing users with plain text passwords, they won't be able to login.
    // Ideally, we'd check if it matches hash, if not, check plain text and then rehash.
    // For this task, I'll assume we start fresh or force hash.
    
    const isMatch = await bcrypt.compare(password, user.password);
    
    // Fallback for existing plain text passwords during development (optional, but good for transition)
    if (!isMatch && user.password === password) {
        // It was plain text, let's hash it for next time (optional logic, skipping for simplicity unless requested)
        // But for now, just fail if not match.
    }

    if (!isMatch) {
       // Check for plain text fallback (TEMPORARY for existing data support)
       if (user.password !== password) {
         return res.status(401).json({ message: "Invalid credentials." });
       }
    }

    const userResponse = user.toObject();
    delete userResponse.password;

    res.status(200).json({ message: "Login successful.", user: userResponse });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

