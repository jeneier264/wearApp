import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from  '../models/User.js';


/* register user */
export const register = async (req, res) => {
    try {
        const {
            userName, 
            password, 
            bio, 
            profilePicture,
        } = req.body;

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = new User({
            userName, 
            password: passwordHash, 
            bio, 
            profilePicture
        });

        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (err) {
        res.status(500).json({error: err.message })
    }
};

/* logging in */
export const login = async (req, res) => {
    try {
      const { userName, password } = req.body;
      const user = await User.findOne({ userName: userName });
      if (!user) return res.status(400).json({ msg: "User does not exist. " });
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ msg: "Invalid credentials. " });
  
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      delete user.password;
      res.status(200).json({ token, user });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
