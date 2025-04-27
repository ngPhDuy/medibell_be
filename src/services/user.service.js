const { User } = require("../models");
const bcryptjs = require("bcryptjs");

exports.getAllUsers = async () => {
  try {
    const users = await User.findAll();
    return users;
  } catch (error) {
    throw new Error("Error fetching users: " + error.message);
  }
};

exports.getUserById = async (id) => {
  try {
    const user = await User.findByPk(id);
    return user;
  } catch (error) {
    throw new Error("Error fetching user: " + error.message);
  }
};

exports.createUser = async (userData) => {
  try {
    const { ten_dang_nhap, mat_khau, gioi_tinh, ho_va_ten } = userData;

    if (!ten_dang_nhap || !mat_khau || !gioi_tinh || !ho_va_ten) {
      throw new Error("All fields are required");
    }

    const hashedPassword = await bcryptjs.hash(mat_khau, 10); // Hash the password with bcryptjs

    const newUser = await User.create({
      ten_dang_nhap,
      mat_khau: hashedPassword, // Store the hashed password
      gioi_tinh,
      ho_va_ten,
    });

    return newUser;
  } catch (error) {
    throw new Error("Error creating user: " + error.message);
  }
};

exports.updateUser = async (id, userData) => {
  try {
    const user = await User.findByPk(id);

    if (!user) {
      throw new Error("User not found");
    }

    const { mat_khau, gioi_tinh, ho_va_ten } = userData;

    if (mat_khau) {
      const hashedPassword = await bcryptjs.hash(mat_khau, 10); // Hash the password with bcryptjs
      user.mat_khau = hashedPassword; // Update the hashed password
    }

    if (gioi_tinh) user.gioi_tinh = gioi_tinh;
    if (ho_va_ten) user.ho_va_ten = ho_va_ten;

    await user.save();
    return user;
  } catch (error) {
    throw new Error("Error updating user: " + error.message);
  }
};
