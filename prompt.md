# 前提条件
小学生の娘と幼稚園児の娘が学校や習い事でもらってくるプリントの管理を目的としたWEBサービスの構築
プリント類を写真にとって、管理するサービス
「子供」「カテゴリー」を入力して写真を登録し、閲覧する際は「子供別」「カテゴリー別」で参照できる
スマホにも対応

# ゴールの明確化
子供別・カテゴリー別にプリント類の写真を管理・閲覧できること

# サービスの機能
アカウント作成・ログイン機能
子供・カテゴリーの追加・編集機能
写真のアップロード・保存機能（クラウドストレージサービスを利用）
写真の閲覧機能（子供別・カテゴリー別のフィルタリング機能を提供）
写真の編集・削除機能

# 実装方針
フロントエンド: Next.js (Reactベース) と Tailwind CSS を使用
バックエンド: Node.js と Express.js を使用
データベース: MySQL
クラウドストレージ: Google Drive
デプロイ: AWS

# データモデル設計

users: ユーザー情報を管理
id (主キー)
email
password (ハッシュ化)
created_at
updated_at

family: 家族情報を管理
id (主キー)
user_id (外部キー)
name
created_at
updated_at

categories: カテゴリー情報を管理
id (主キー)
user_id (外部キー)
name
created_at
updated_at

photos: 写真情報を管理
id (主キー)
family_id (外部キー)
category_id (外部キー)
file_id (Google DriveのファイルID)
file_url (Google DriveのファイルURL)
thumbnail_url (Google DriveのサムネイルURL)
created_at
updated_at

# クラス設計
User: ユーザー管理関連の処理
Family: 家族管理関連の処理
Category: カテゴリー管理関連の処理
Photo: 写真管理関連の処理
GoogleDrive: Google Drive APIを利用したクラウドストレージ関連の処理

# 基本設計
認証: JSON Web Token (JWT) を利用した認証を実装
セキュリティ: パスワードのハッシュ化に bcrypt を使用
ページ構成: Next.js のディレクトリ構造に従ってページを作成 + Express.js のディレクトリ構造に従ってページを作成
API設計: RESTful API を実装し、フロントエンドからデータ操作を行う

# 基本的な進め方
Mac上で開発
初めはMac上で動くところまで作って、ある程度動いてからAWSにデプロイする
テストファーストで行い、少しずつ動作確認をしながら進めていく。

# 具体的な実装手順
開発環境の準備
Node.js, MySQL, Next.js, Express.js, Tailwind CSS をインストール
　Node.js, MySQLとも、Homebrewではなく、公式ページからダウンロード
プロジェクトの初期設定
Next.js のプロジェクトを作成
Tailwind CSS をプロジェクトに導入
データベース設定
MySQLでデータベースとテーブルを作成
Express.js のディレクトリ構造の作成
　models, controllers, services, routes の作成
APIエンドポイントの実装
認証機能の実装
JWTを使用した認証機能を実装し、ユーザー登録、ログイン、ログアウトをサポートします。
パスワードのハッシュ化にはbcryptを使用し、安全にデータを保存します。
Express.jsを使用して、以下のAPIエンドポイントを実装します。
ユーザー: 登録、ログイン、ログアウト
子供: 一覧表示、追加、編集、削除
カテゴリー: 一覧表示、追加、編集、削除
写真: 一覧表示、アップロード、編集、削除
Google Drive APIの設定とクラウドストレージ機能の実装
Google Drive APIをプロジェクトに統合し、認証情報を設定します。
Google Drive APIを使用して、写真のアップロード、取得、削除機能を実装します。

フロントエンドの実装
Next.jsとTailwind CSSを使用して、以下のページを作成します。
ログインページ
ユーザー登録ページ
子供管理ページ
カテゴリー管理ページ
写真管理ページ

APIとフロントエンドの連携
各ページで必要なAPIエンドポイントを呼び出して、データの表示や操作を実現します。

レスポンシブデザインの適用
Tailwind CSSを使用して、モバイルやタブレットでの表示に対応したレスポンシブデザインを実装します。

テスト
単体テストや統合テストを行い、各機能が正しく動作することを確認します。

デプロイ
AWSへプロジェクトをデプロイし、公開します。AWS Amplify, Elastic Beanstalk, EC2 などのサービスを利用できます。
継続的な改善

ユーザーからのフィードバックを受け取り、バグ修正や機能改善を行っていきます。

# プロジェクト情報
Next.jsのプロジェクト名 : print_manager
mysql の root pass : makeSense

# テーブル定義詳細

CREATE DATABASE print_manager;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE family (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  name VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  name VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE photos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  family_id INT NOT NULL,
  category_id INT NOT NULL,
  file_id VARCHAR(255) NOT NULL,
  file_url TEXT NOT NULL,
  thumbnail_url TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (family_id) REFERENCES family(id),
  FOREIGN KEY (category_id) REFERENCES categories(id)
);

# ディレクトリ構成
print_manager/
  |- node_modules/
  |- pages/
  |- public/
  |- routes/
  |- services/
  |- controllers/
  |- models/
  |  |- index.js
  |  |- User.js
  |  |- Family.js
  |  |- Category.js
  |  |- Photo.js
  |- .env
  |- .gitignore
  |- next.config.js
  |- package.json
  |- README.md
  |- tailwind.config.js
  |- yarn.lock

# アプリ起動手順
cd /Users/satokeita/dev/print_manager
npm run dev

# 完了したこと
開発環境の準備
Node.js, MySQL, Next.js, Express.js, Tailwind CSS をインストール
プロジェクトの初期設定
Next.js のプロジェクトを作成
npm install tailwindcss postcss autoprefixer
プロジェクトルートに tailwind.config.js ファイルを作成
データベース設定
MySQLでデータベースとテーブルを作成
Express.js のディレクトリ構造の作成
　models, controllers, services, routes の作成

# あなたへの依頼
できるだけテストファーストに進めていきたいです。
少しずつ検証しながら、動くことを確かめながら進めていきたいです。
その場合、進め方を変えた方が良いのかもしれません。
どのように進めるのがよいでしょうか？



まず最初に、テスト的にAPIの疎通を確認したいです。
ユーザー登録のAPIを実行して、DBにユーザーが登録できるまでを
できるだけ他に余計なことをせずに、最も小さく検証したいです。
どのファイルにどのような実装があればそれが実現できますか。
具体的に教えてください。

ユーザー登録のAPIの実行方法は以下を想定しています

Postman:
HTTPメソッド: POST
URL: http://localhost:3000/api/users/register
Bodyタブに以下のJSONデータを追加:

json
{
  "email": "test@example.com",
  "password": "testpassword"
}


テスト駆動開発 (TDD)
テストケースに基づいてテストコードを先に書き、その後に実装コードを書くことで、テストが通るように実装を進めます。これにより、実装中にバグが発生するリスクを最小限に抑えることができます。
リファクタリング
テストが通った段階で、コードのリファクタリングを行い、可読性やメンテナンス性を向上させます。この際、既存のテストがあるため、リファクタリングによって新たなバグが発生するリスクを抑えることができます。
継続的インテグレーション
コードの変更を頻繁にマージすることで、バグの早期発見や修正が可能となります。継続的インテグレーションのツールを利用して、定期的にテストを実行し、開発中の問題を迅速に検出します。
