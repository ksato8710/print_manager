# ルーティング設定の準備
Express.jsでルーティングを設定するために、routesディレクトリを作成し、
その中にusers.js、family.js、categories.js、photos.jsというファイルを作成します。
各ファイルに対応するルーティングを設定します。

ルーティングの例（users.js）
js
Copy code
const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');

router.post('/users/register', UserController.register);
router.post('/users/login', UserController.login);
router.get('/users/logout', UserController.logout);

module.exports = router;
ルーティングの例（family.js）
js
Copy code
const express = require('express');
const router = express.Router();
const FamilyController = require('../controllers/familyController');

router.get('/families', FamilyController.getFamilies);
router.post('/families', FamilyController.createFamily);
router.put('/families/:id', FamilyController.updateFamily);
router.delete('/families/:id', FamilyController.deleteFamily);

module.exports = router;
ルーティングの例（categories.js）
js
Copy code
const express = require('express');
const router = express.Router();
const CategoryController = require('../controllers/categoryController');

router.get('/categories', CategoryController.getCategories);
router.post('/categories', CategoryController.createCategory);
router.put('/categories/:id', CategoryController.updateCategory);
router.delete('/categories/:id', CategoryController.deleteCategory);

module.exports = router;
ルーティングの例（photos.js）
js
Copy code
const express = require('express');
const router = express.Router();
const PhotoController = require('../controllers/photoController');

router.get('/photos', PhotoController.getPhotos);
router.post('/photos', PhotoController.createPhoto);
router.put('/photos/:id', PhotoController.updatePhoto);
router.delete('/photos/:id', PhotoController.deletePhoto);

module.exports = router;
コントローラーの作成

次に、ルーティングで設定した各エンドポイントに対応するコントローラーを作成します。コントローラーで、リクエストを受け取り、必要な処理を実行し、レスポンスを返します。

コントローラーの例（userController.js）
js
Copy code
const UserService = require('../services/userService');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const UserController = {
  async register(req, res) {
    try {
      const { email, password } = req.body;

      // ユーザー登録処理
      const user = await UserService.register(email, password);

      // JWTを生成して返す
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });
      res.status(200).json({ token });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  async login(req, res) {
    try {
      const { email, password } = req.body;

      // ログイン


