const express = require('express');
const cors = require('cors');
const path = require('path');
const admin = require('firebase-admin');
// Inisialisasi Firebase Admin
// Pastikan path ke file kredensial Firebase Anda benar
const serviceAccount = require('./config/firebaseAdminConfig.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const database = require('./config/database');
const APIRoutes = require('./routes');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

const port = process.env.PORT || 9000;

database();
app.use(APIRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = app;
