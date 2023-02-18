//PACKAGES
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cloudinary from "cloudinary";
//IMPORTS
import User from "../models/User.js";

//REGISTER USER
export const register = async (req, res) => {
    try {
        console.log(req, "+++++++++++++++++++++++++++++++++++++");
        const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
            folder: "socialmedia/avatars",
        });

        const { firstname, lastname, email, password, friends, location, occupation } =
            await req.body;

        //hashing password using bcrypt-salt
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        //creating new user
        const newUser = new User({
            firstname,
            lastname,
            email,
            password: passwordHash,
            avatar: {
                public_id: myCloud.public_id,
                url: myCloud.secure_url,
            },
            friends,
            location,
            occupation,
            viewedProfile: Math.floor(Math.random() * 10000),
            impressions: Math.floor(Math.random() * 10000),
        });

        // saving user
        const savedUser = await newUser.save();
        const response = {
            StatusCode: 6000,
            message: "Created new user",
            data: savedUser,
        };
        res.status(201).json(response);
    } catch (error) {
        console.log(error);
        const response = {
            StatusCode: 6001,
            message: "Signup failed",
        };
        res.status(500).json(response);
    }
};

//LOGIN USER
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email });
        if (!user) {
            const response = {
                StatusCode: 6001,
                message: "User does not exists",
            };
            return res.status(400).json(response);
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            const response = {
                StatusCode: 6001,
                message: "Invalid credentials",
            };
            return res.status(400).json(response);
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        delete user.password;
        const response = {
            StatusCode: 6000,
            token: token,
            user: user,
        };
        res.status(200).json(response);
    } catch (error) {
        const response = {
            StatusCode: 6001,
            message: "Something went wrong",
            error: error.message,
        };
        res.status(500).json(response);
    }
};
