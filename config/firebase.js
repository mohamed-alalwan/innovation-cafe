var admin = require("firebase-admin");

var serviceAccount = require("../google-api-credentials.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});