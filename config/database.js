const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  host: 'localhost', // データベースが動作しているホスト名
  database: 'print_manager', // データベース名
  username: 'root', // データベースに接続するためのユーザー名
  password: 'makeSense', // データベースに接続するためのパスワード
  dialect: 'mysql', // 使用するデータベースの種類
  logging: false, // SQLのログ出力を抑制する
});

module.exports = sequelize;
