# Aptos Video NFT Sample Dapp

A sample app for creating video NFTs uisng Livepeer SDK on the Aptos blockchain.

## Objectives

* [ ] 🧱 Create a project directory
* [ ] ⚙️ Install [NextJS w/Typescript](https://nextjs.org/docs/getting-started)
* [ ] ⚙️ Install [Aptos SDK (Typescript)](https://aptos.dev/sdks/ts-sdk/typescript-sdk/)
* [ ] ⚙️ Install [LivepeerJS SDK](https://livepeerjs.org/)
* [ ] ⚙️ Install [Petra Wallet](https://aptos.dev/guides/building-wallet-extension/) and fund the wallet
* [ ] ⚙️ Install [dotenv](https://www.npmjs.com/package/dotenv)

## Initial Project Setup

* [ ] 🧱 Create a directory and give it a name

```sh
cd mkdir aptos-nft-dapp
```

* [ ] 👣 Go into that directory

```sh
cd aptos-nft-dapp
```

* [ ] ⚙️ Install NextJS

```sh
npx create-next-app@latest
```

* [ ] 📝 Follow the installation instructions and name your app

* [ ] ⚙️ Install dotenv package

```sh
npm install dotenv --save
```

* [ ] 🏃 Run the project

```sh
npm run dev
```

* [ ] 🛠 Setup the environment variable

  * [ ] 🤫 In the root directory of the project, create a file and name it `.env`, remember to also add it to your `.gitignore`

  * [ ] 📝 Inside this file place your Livepeer API and APTOS private key from your wallet

   `NEXT_PUBLIC_LIVEPEER_API="5dxxxxxxx-xxx-xxx-xxxx-xxxxxxxxx87"`
   `APTOS_PRIVATE_KEY="5dxxxxxxx-xxx-xxx-xxxx-xxxxxxxxx87"`

## Setting up the clients

* [ ] 🧱 Setup the LivepeerJS, APTOS clients

  * [ ] ⌨️ Insert [this code](https://github.com/livepeer/Aptos-NFT-Dapp/blob/main/pages/_app.tsx#L1-L9)

* [ ] 🧱 Provied the Livepeer API key and url to connect to Aptos devnet

  * [ ] ⌨️ Insert [this code](https://github.com/livepeer/Aptos-NFT-Dapp/blob/main/pages/_app.tsx#L11-L16)

* [ ] 🧱 Wrap the clients around the main component

  * [ ] ⌨️ Insert [this code](https://github.com/livepeer/Aptos-NFT-Dapp/blob/main/pages/_app.tsx#L19-L28)

## Creating Aptos Token

* [ ] 🧱 Conncting to the Aptos devnet to verify the address and minting NFTs

  * [ ] ⌨️ Insert [this code](https://github.com/livepeer/Aptos-NFT-Dapp/blob/main/pages/api/create-aptos-token.ts)


## Setting up the frontend

* [ ] 🧱 Importing packages

  * [ ] ⌨️ Insert [this code](https://github.com/livepeer/Aptos-NFT-Dapp/blob/main/pages/index.tsx#L1-L11)

* [ ] 🧱 Delaring the global window object and checking for connection to Aptos

  * [ ] ⌨️ Insert [this code](https://github.com/livepeer/Aptos-NFT-Dapp/blob/main/pages/index.tsx#L13)

* [ ] 🧱 Setting state variables

  * [ ] ⌨️ Insert [this code](https://github.com/livepeer/Aptos-NFT-Dapp/blob/main/pages/index.tsx#L19)

* [ ] 🧱 Assigning Aptos client and verifying if connected to the Aptos blockchain

  * [ ] ⌨️ Insert [this code](https://github.com/livepeer/Aptos-NFT-Dapp/blob/main/pages/index.tsx#L25-L30)

* [ ] 🧱 Using Livepeer SDK to create assets

  * [ ] ⌨️ Insert [this code](https://github.com/livepeer/Aptos-NFT-Dapp/blob/main/pages/index.tsx#L32)

* [ ] 🧱 Using Livepeer SDK to retrieve information of assets

  * [ ] ⌨️ Insert [this code](https://github.com/livepeer/Aptos-NFT-Dapp/blob/main/pages/index.tsx#L39)

* [ ] 🧱 Using Livepeer SDK to to update assets

  * [ ] ⌨️ Insert [this code](https://github.com/livepeer/Aptos-NFT-Dapp/blob/main/pages/index.tsx#L44)

* [ ] 🧱 Implementing drag and drop feature for getting assets

  * [ ] ⌨️ Insert [this code](https://github.com/livepeer/Aptos-NFT-Dapp/blob/main/pages/index.tsx#L46-L58)

* [ ] 🧱 Verifying progress of assets in different stages from creating to uploading to IPFS

  * [ ] ⌨️ Insert [this code](https://github.com/livepeer/Aptos-NFT-Dapp/blob/main/pages/index.tsx#L60-L78)

* [ ] 🧱 Connecting to the Petra wallet

  * [ ] ⌨️ Insert [this code](https://github.com/livepeer/Aptos-NFT-Dapp/blob/main/pages/index.tsx#L80-L91)

* [ ] 🧱 Minting NFT on Aptos blockchain

  * [ ] ⌨️ Insert [this code](https://github.com/livepeer/Aptos-NFT-Dapp/blob/main/pages/index.tsx#L93-L143)

* [ ] 🧱 Create asset with Livepeer Studio

  * [ ] ⌨️ Insert [this code](https://github.com/livepeer/Aptos-NFT-Dapp/blob/main/pages/index.tsx#L202)

* [ ] 🧱 Get asset from Livepeer Studio and upload it to IPFS

  * [ ] ⌨️ Insert [this code](https://github.com/livepeer/Aptos-NFT-Dapp/blob/main/pages/index.tsx#L215)

* [ ] 🧱 Mint NFT on Aptos blockchain after providing NFT metadata

  * [ ] ⌨️ Insert [this code](https://github.com/livepeer/Aptos-NFT-Dapp/blob/main/pages/index.tsx#L239)