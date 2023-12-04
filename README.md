# farcaster-expo

Starter kit for a Farcaster client. Uses Expo + React Native + Neynar.

### Getting Started Locally

1. Start the development server by running the command `npm run server`
2. In a new terminal, run the command `npx expo start -c`
3. Add a `.env` file with `API_DEV_URL`, `PORT`, `API_PROD_URL`, and `NEYNAR_KEY` environment variables.
4. You'll want to plug in your server's URL into the `API_DEV_URL` variable (e.g. "http://localhost:3000"). I'd recommmend using ngrok if you want to test the build on your device or simulator using Expo Go.

### Deploying the project
1. First, you should deploy the server. I recommend using railway. Make sure you change the start command to `npm run server` and add the `PORT` and `NEYNAR_KEY` environment variables.
2. Once deployed, you should enable a public domain (available in the instance's settings tab on Railway). Take that url (e.g. "https://example.up.railway.app") and put it in the `API_PROD_URL` environment variable in your project.
3. Now take your entire env sheet and add it to the "secrets" section of your project on Expo's website. You may have to configure the project if you haven't already.
4. To build and submit the app, use the `npx eas build -p ios` and `npx eas submit -p ios`. I haven't tested android submission so please let me know if it doesn't work for you.
5. That should be it!

Built by [@matthew](https://warpcast.com/matthew). Use and reconfigure however you'd like. Shoot me questions via DC on Warpcast.
