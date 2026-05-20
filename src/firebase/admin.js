const admin =
  require("firebase-admin");

if (
  !process.env.FIREBASE_SERVICE_ACCOUNT
) {

  throw new Error(
    "FIREBASE_SERVICE_ACCOUNT is required"
  );
}

let serviceAccount;

try {

  serviceAccount =
    JSON.parse(
      process.env
        .FIREBASE_SERVICE_ACCOUNT
    );

} catch (error) {

  throw new Error(
    "FIREBASE_SERVICE_ACCOUNT must be valid JSON. Check the backend environment variable."
  );
}

admin.initializeApp({

  credential:
    admin.credential.cert(
      serviceAccount
    ),
});

const db =
  admin.firestore();

module.exports = {
  admin,
  db,
};
