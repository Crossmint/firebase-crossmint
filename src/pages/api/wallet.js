import {
  verifyIdTokenAndUserIdMatch,
  createWallets,
  findExistingWallets,
  getUserEmailFromIdToken
} from "../../utils/helpers.js";

export default function handler(req, res) {
  switch (req.method) {
    case "GET":
      handleGet(req, res);
      break;

    case "POST":
      handlePost(req, res);
      break;

    default:
      res
        .status(400)
        .json({ error: true, message: "Unsupported request method" });
      break;
  }
}

async function handlePost(req, res) {
  const idToken = req.headers.authorization;
  const email = await getUserEmailFromIdToken(idToken);

  const created = await createWallets(email);
  if (!created) {
    res.status(500).json({
      error: true,
      message: "Failed to create wallets for user",
    });
    return;
  }
  return res.status(200).json({
    email: email,
    walletsCreated: created,
  });
}

async function handleGet(req, res) {
  const idToken = req.headers.authorization || null;
  const userId = req.query.userId;

  if (!idToken) {
    res.status(400).json({ error: "Bad request" });
    return;
  }

  if (verifyIdTokenAndUserIdMatch(userId, idToken)) {
    const data = await findExistingWallets(userId);
    if (data.error) {
      res.status(400).json(data);
      return;
    }
    let jsonData = {};

    data.forEach((wallet) => {
      const chain = wallet.chain;
      const address = wallet.publicKey;

      jsonData[chain] = address;
    });

    res.status(200).json(jsonData);
    return;
  } else {
    res.status(403).json({ error: "Not authorized" });
    return;
  }
}
