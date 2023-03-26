// Google Drive APIを利用した実装を行います。各関数は、Google Drive APIとの連携に必要な処理を
// 目的に応じた処理を実行します。

const { google } = require('googleapis');
const path = require('path');
const fs = require('fs');

const SCOPES = ['https://www.googleapis.com/auth/drive'];
const TOKEN_PATH = path.join(__dirname, 'token.json');

// Google Drive APIの認証情報を読み込む
const authorize = async () => {
  const credentials = JSON.parse(fs.readFileSync(path.join(__dirname, 'credentials.json')));
  const { client_secret, client_id, redirect_uris } = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

  // トークンをファイルから読み込む
  const token = fs.readFileSync(TOKEN_PATH);
  oAuth2Client.setCredentials(JSON.parse(token));
  return oAuth2Client;
};

exports.uploadFile = async (filePath, mimeType, fileName) => {
  const auth = await authorize();
  const drive = google.drive({ version: 'v3', auth });

  const fileMetadata = {
    name: fileName,
    mimeType,
  };
  const media = {
    mimeType,
    body: fs.createReadStream(filePath),
  };

  const response = await drive.files.create({
    requestBody: fileMetadata,
    media,
    fields: 'id, name, webContentLink, thumbnailLink',
  });

  return response.data;
};

exports.deleteFile = async (fileId) => {
  const auth = await authorize();
  const drive = google.drive({ version: 'v3', auth });

  await drive.files.delete({ fileId });
};
