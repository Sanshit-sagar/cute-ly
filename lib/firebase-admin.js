import * as admin from 'firebase-admin';

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: "https://fir-application-fe50f-default-rtdb.firebaseio.com",
  });
}

// var auth = admin.auth();
// var database = admin.database();
// var firestore = admin.firestore();

export default admin.database();  