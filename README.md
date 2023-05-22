<img src="https://upload.wikimedia.org/wikipedia/commons/3/37/Firebase_Logo.svg" alt="Firebase logo" width="value" height="50">

# Crossmint x Firebase starter

Create in under 5 minutes a fully functional user account system where each user has NFT custodial wallets created. This sample code uses Firebase for authentication and Crossmint for wallet creation.

## 1. Firebase set up

### Firebase dashboard

1. Create a Firebase account and your first project
2. Click on "Web", below "Get started by adding Firebase to your app"
3. Select a name for your App and click "Continue"
4. In the second step ("Add Firebase SDK") you will get a code snippet. Copy the values inside `firebaseConfig` as we will need them later. 
6. From the left sidebar, click on "Build" and select "Authentication". After that, click on "Get started"
7. Enable "Email/Password" as login method

### On your machine

In your terminal, clone the project and install dependencies:

```bash
git clone https://github.com/Crossmint/firebase-crossmint.git
cd firebase-crossmint
yarn
```

Next, create an .env file at the project root folder, and copy paste the following lines inside with the values we got in the step above:

```bash
NEXT_PUBLIC_FIREBASE_API_KEY=YOUR_FIREBASE_API_KEY_HERE
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=YOUR_FIREBASE_AUTH_DOMAIN_HERE
NEXT_PUBLIC_FIREBASE_PROJECT_ID=YOUR_FIREBASE_PROJECT_ID_HERE
```

## 2. Crossmint set up

Now we are going to sign up to Crossmint and create an API key that allows us to create and manage wallet for our users. During development, we're going to create wallets in the free sandbox environment ('staging').

### In the Crossmint console

1. Go to [staging.crossmint.com/console](https://staging.crossmint.com/console) and follow the steps to create an account.

2. Navigate to [API keys](https://staging.crossmint.com/console/projects/apiKeys) and click on New API Key. Then check the `wallets.read` and `wallets.create` scopes -- this will give your API key permission to create and manage crypto wallets for your users. Finally save your new key and copy the `CLIENT SECRET` and `Project ID` values for later.

### On your machine

Go back to your project, open again the `.env.local` file, and enter the following three lines:

```bash
CROSSMINT_BASEURL=https://staging.crossmint.com
CROSSMINT_X_CLIENT_SECRET=YOUR_CROSSMINT_CLIENT_SECRET_HERE
CROSSMINT_X_PROJECT_ID=YOUR_CROSSMINT_PROJECT_ID_HERE
```

And then save.

Please note: make sure the clent secret doesn't get leaked, as it would allow others to create wallets for your users.

## Running locally

After completing all the set up steps above the application can be run with the command:

```bash
yarn dev
```

The application will be available at [`http://localhost:3000`](http://localhost:3000).

You'll be able to login and register using an Email/Password combination.

## Deploy via Vercel
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FCrossmint%2Ffirebase-crossmint&env=NEXT_PUBLIC_FIREBASE_API_KEY,NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,NEXT_PUBLIC_FIREBASE_PROJECT_ID,CROSSMINT_X_CLIENT_SECRET,CROSSMINT_X_PROJECT_ID,CROSSMINT_BASEURL)
