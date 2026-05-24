const fs = require("fs");
const path = require("path");

const admin =
  require("firebase-admin");

function loadServiceAccount() {
  if (process.env.FIREBASE_SERVICE_ACCOUNT) {
    return JSON.parse(
      process.env.FIREBASE_SERVICE_ACCOUNT
    );
  }

  const credentialsPath =
    process.env.GOOGLE_APPLICATION_CREDENTIALS ||
    path.join(
      __dirname,
      "../../firebase/serviceAccountKey.json"
    );

  if (fs.existsSync(credentialsPath)) {
    return JSON.parse(
      fs.readFileSync(
        credentialsPath,
        "utf8"
      )
    );
  }

  throw new Error(
    "Firebase credentials missing. Set FIREBASE_SERVICE_ACCOUNT or place firebase/serviceAccountKey.json"
  );
}

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(
      loadServiceAccount()
    ),
  });
}

const db = admin.firestore();

module.exports = {
  admin,
  db,
};
