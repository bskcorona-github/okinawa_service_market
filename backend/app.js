const express = require("express");
const cors = require("cors"); // CORSのミドルウェアをインポート
const dotenv = require("dotenv");
const connectDB = require("./config/database");

// 環境変数の設定
dotenv.config();

// MongoDBとの接続
connectDB();

// Expressアプリケーションの初期化
const app = express();

// CORSを全リクエストに適用
app.use(cors()); // ここでCORSミドルウェアを使用

// JSONパーサーミドルウェア
app.use(express.json());

// 認証ルートの設定
const authRoutes = require("./routes/authRoutes");
app.use("/auth", authRoutes);

// ユーザールートの設定
const userRoutes = require("./routes/userRoutes");
app.use("/users", userRoutes);

// サーバーの起動
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
