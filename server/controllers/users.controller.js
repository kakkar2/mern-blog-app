import User from "../models/users.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const handleRegisterUser = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    if (
      (!fullName && !email && !password) ||
      (fullName == " " && email == " " && password == " ")
    )
      return res
        .status(400)
        .json({ success: false, message: "all fields required." });

    // hashing the user password before sending to database
    const hashPassword = bcrypt.hashSync(password, 10);

    const user = await User.create({
      fullName,
      email,
      password: hashPassword,
    });

    if (!user)
      return res.status(400).json({
        success: false,
        message: "Something went wrong while create user",
      });
    return res
      .status(200)
      .json({ success: true, message: "user created successfully." });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const handleLoginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if ((!email && !password) || (email == " " && password == " "))
      return res.status(400).json({
        success: false,
        message: "all fields required.",
      });

    const user = await User.findOne({ email });

    if (!user)
      return res.status(404).json({
        success: false,
        message: "invalid email",
      });

    //   comparing hash password with password send by user
    const checkPassword = bcrypt.compareSync(password, user.password);

    if (!checkPassword)
      return res.status(400).json({
        success: false,
        message: "invalid password",
      });

    //creating token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    // removing password field from last output
    const { password: pass, ...rest } = user._doc;

    return (
      res
        .status(200)
        // .cookie("token", token, { httpOnly: true })
        .cookie("token", token, {
          domain: process.env.CORS_ORIGIN,
          httpOnly: true,
          secure: true,
          sameSite: "None",
        })
        .json({ success: true, data: rest, message: "login successfull" })
    );
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const handleLogoutUser = async (req, res) => {
  return res
    .clearCookie("token", {
      httpOnly: true,
    })
    .status(200)
    .json({ success: true, message: "logout successfully" });
};

//update user details
const handleUpdateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { fullName, email } = req.body;
    const ImagePathLocal = req.files?.profileImage[0]?.path;

    if (!id)
      return res.status(404).json({
        success: false,
        message: "invalid user id",
      });

    if (!fullName || !email || !ImagePathLocal)
      return res.status(400).json({
        success: false,
        message: "Atleast One field needed",
      });

    if (email) {
      const checkingEmail = User.find({ email });
      if (checkingEmail)
        return res.status(400).json({
          success: false,
          message: "email already in use. try different email.",
        });
    }

    const updatedProfileImage = await uploadResult(ImagePathLocal);

    if (!updatedProfileImage)
      return res.status(500).json({
        success: false,
        message: "something went wrong while uploading photo",
      });

    const updateUser = await User.findByIdAndUpdate(
      id,
      { fullName, email, profileImage: updatedProfileImage.url },
      { new: true }
    );

    if (updateUser) {
      return res.status(200).json({
        success: true,
        message: "user details updated successfully",
      });
    } else {
      return res.status(500).json({
        success: false,
        message:
          "something went wrong while updating user details. try again later.",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export {
  handleLoginUser,
  handleRegisterUser,
  handleLogoutUser,
  handleUpdateUser,
};
