var admin = require("firebase-admin");

var serviceAccount = require("../app/credentials.json");

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    name: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  });
}

export async function verifyIdTokenAndUserIdMatch(userId, idToken) {
  admin
    .auth()
    .verifyIdToken(idToken)
    .then(async function (decodedToken) {
      var uid = decodedToken.uid;
      const user = await admin.auth().getUser(uid);

      if (user.email == userId) {
        return true;
      } else {
        return false;
      }
    });
}

export async function getUserEmailFromIdToken(idToken) {
  const email = admin
    .auth()
    .verifyIdToken(idToken)
    .then(async function (decodedToken) {
      const uid = decodedToken.uid;
      const user = await admin.auth().getUser(uid);
      return user;
    })
    .then((user) => user.email);
  
    return email
}

export async function createWallets(userId) {
  for (const chain of ["ethereum", "solana", "cardano"]) {
    const url = `${process.env.CROSSMINT_BASEURL}/api/v1-alpha1/wallets`;
    const options = {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        "X-CLIENT-SECRET": process.env.CROSSMINT_X_CLIENT_SECRET,
        "X-PROJECT-ID": process.env.CROSSMINT_X_PROJECT_ID,
      },
      body: JSON.stringify({ chain: chain, userId: userId }),
    };

    try {
      await fetch(url, options);
    } catch (error) {
      console.error("Error whilst creating wallets", error);
      return false;
    }
  }
  return true;
}

export async function findExistingWallets(userId) {
  const url = `${process.env.CROSSMINT_BASEURL}/api/v1-alpha1/wallets?userId=${userId}`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      "X-CLIENT-SECRET": process.env.CROSSMINT_X_CLIENT_SECRET,
      "X-PROJECT-ID": process.env.CROSSMINT_X_PROJECT_ID,
    },
  };

  try {
    const response = await fetch(url, options);
    return await response.json();
  } catch (error) {
    console.error("Error whilst fetching wallets", error);
    return { error: true, message: "An internal error has occurred" };
  }
}
