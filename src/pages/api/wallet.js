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
        .status(405)
        .json({ error: true, message: "Unsupported request method: " + req.method });
      break;
  }
}

async function handlePost(req, res) {
  const body = JSON.parse(req.body);
  const userId = body.userId;
  if (userId == null) {
    res.status(400).json({ error: true, message: "Missing userId parameter" });
    return;
  }

  const created = await createWallets(userId);
  if (!created) {
    res
      .status(500)
      .json({ error: true, message: "Failed to create wallets for user" });
    return;
  }

  return res.status(200).json({ error: false });
}

async function handleGet(req, res) {
  const userId = req.query.userId;
  if (userId == null) {
    res.status(400).json({ error: true, message: "Missing userId parameter" });
    return;
  }

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
}

async function createWallets(userId) {
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

async function findExistingWallets(userId) {
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
