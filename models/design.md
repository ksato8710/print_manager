sequelize を使って users テーブルをモデル化し、User モデルを作成しています。
User モデルは、email と password の2つのフィールドを持ち、自動生成される id をプライマリーキーとして
使用しています。

../config/database.js にはデータベースの接続情報を設定します。
sequelize は、このファイルで指定した接続情報を使用してデータベースに接続します。

他のモデル化したファイルについては以下の通りです。

Family.js: 家族のモデル。users テーブルと 1 対多 の関係を持つ。
Category.js: カテゴリのモデル。users テーブルと 1 対多 の関係を持つ。
Photo.js: 写真のモデル。family テーブルと 1 対多 の関係を持ち、category テーブルとも 1 対多 の関係を持つ。
また、file_id、file_url、thumbnail_url の 3 つのフィールドが含まれています。