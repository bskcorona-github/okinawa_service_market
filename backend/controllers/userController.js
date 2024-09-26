const User = require("../models/User");

// 新しいユーザーを作成する
exports.createUser = async (req, res) => {
  const { email, password, name, phone_number, address, role } = req.body;

  const user = new User({
    email,
    password,
    name,
    phone_number,
    address,
    role,
  });

  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// 全てのユーザーを取得する
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
