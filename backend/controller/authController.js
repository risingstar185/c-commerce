import User from "../model/userModel.js";
import bcrypt from 'bcryptjs';
import validator from 'validator';
import { gentoken ,gentoken1} from "../config/token.js";

export const registration = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send('User already exists');
    }

    // Validate email
    if (!validator.isEmail(email)) {
      return res.status(400).send('Please enter a valid email');
    }

    // Validate password length
    if (password.length < 8) {
      return res.status(400).send('Invalid Password: Please enter at least 8 characters');
    }

    // Hash password
    const hashPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashPassword, // ✅ Correct field
    });

    // Generate token
    const token = await gentoken(user?._id);

    // Set cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'None',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // Return response
    return res.status(200).json({ message: 'Registration successful', user });

  } catch (error) {
    console.log('Registration error:', error);
    return res.status(500).send('Registration error');
  }
};

 export const login=async(req,res)=>{
  try {
     const {email,password}=req.body;
 const user=await User.findOne({
  email
 });
 if(!user){
  return res.status(404).json({message:"user is not found"})
 }
const isMatch=await bcrypt.compare(password,user.password)
if(!isMatch){
 return res.status(404).json({message:"password is not match"})
}
 // Generate token
    const token = await gentoken(user?._id);

    // Set cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'None',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // Return response
    return res.status(200).json({ message: 'user Login successfully', user });
  } catch (error) {
    console.log("login error",error)
  }
 
}

//logout
export const logout=async(req,res)=>{
  try {
      res.clearCookie('token');
    return res.status(200).json({ message: 'user logout successfully'});
  } catch (error) {
     console.log('logout error:', error);
    return res.status(500).send('logout error');
  }

}

export const googleLogin = async (req, res) => {
  try {
    const { name, email } = req.body;

    // ✅ Validate incoming data
    if (!name || !email) {
      return res.status(400).json({ message: "Name and email are required" });
    }

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({ name, email });
    }

    // Generate token
    const token = await gentoken(user._id);

    // Set cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'None',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({ message: 'Google Login successfully', user });
  } catch (error) {
    console.error("google login error", error);
    res.status(500).json({ message: 'Google login error' });
  }
};


export const adminLogin=async(req,res)=>{
  try {
  const {email,password}=req.body;
  

  // inside adminLogin controller
if (email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD) {
  return res.status(401).json({ message: "Invalid email or password" });
}

  if(email ===process.env.ADMIN_EMAIL && password===process.env.ADMIN_PASSWORD){
try {

 const token = await gentoken1(email);

    // Set cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'None',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({ message: 'Admin Login successfully', token });
    } catch (error) {
  console.log('password and email are wrong:',error)
}

  }
  } catch (error) {
     console.error("admin login error", error);
    res.status(400).json({ message: 'Invalid credentials' });
  }

}

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password"); // hide password field
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Failed to fetch users" });
  }
};
