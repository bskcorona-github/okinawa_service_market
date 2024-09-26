const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ユーザー登録
exports.registerUser = async (req, res) => {
  const { email, password, name, phone_number, address, role } = req.body;

  try {
    // パスワードをハッシュ化
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      email,
      password: hashedPassword, // ハッシュ化されたパスワードを保存
      name,
      phone_number,
      address,
      role,
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error during registration:", error.message); // エラーメッセージをログに出力
    res.status(400).json({ message: error.message }); // フロントエンドにエラーメッセージを返す
  }
};

// ユーザーログイン
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  // 入力がない場合のバリデーション
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Please provide both email and password" });
  }

  try {
    // メールアドレスを小文字に変換してユーザーを探す
    const user = await User.findOne({ email: email.toLowerCase() });
    console.log("User found:", user); // ユーザーが見つかったか確認

    if (!user) {
      console.log("Invalid email");
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // パスワードを比較
    const isMatch = await bcrypt.compare(password, user.password);
    console.log("Password match:", isMatch); // パスワードが一致しているか確認

    if (!isMatch) {
      console.log("Invalid password");
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // JWTを発行
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.json({ token, userId: user._id, role: user.role });
  } catch (error) {
    console.error("Error during login:", error.message);
    res.status(500).json({ message: error.message });
  }
};
