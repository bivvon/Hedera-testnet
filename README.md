# Hedera Testnet Environment Setup (JavaScript)

## Introduction
This guide walks you through setting up a Hedera development environment using JavaScript on Windows. By following these steps, you'll be able to:

✔️ Write and test Hedera transactions  
✔️ Deploy and interact with smart contracts  
---

## 1. Install Required Tools
### Install Node.js and npm
1. Download Node.js (LTS version) from [nodejs.org](https://nodejs.org/)  
2. Install using the default settings  
3. Verify installation by running:  
   ```sh
   node -v
   npm -v
   ```
   If both commands return version numbers, the installation is successful.

### Install Git (Optional but Recommended)
1. Download from [git-scm.com](https://git-scm.com/)  
2. Install using the default settings  
3. Verify installation:  
   ```sh
   git --version
   ```

---

## 2. Create and Initialize Your Project
1. Open Command Prompt (cmd) or PowerShell  
2. Navigate to the desired directory (e.g., Desktop):  
   ```sh
   cd Desktop
   ```
3. Create a new project folder and move inside it:  
   ```sh
   mkdir hedera_dev
   cd hedera_dev
   ```
4. Initialize a Node.js project:  
   ```sh
   npm init -y
   ```
   This generates a `package.json` file for managing dependencies.

---

## 3. Install Hedera SDK
Install the Hedera JavaScript SDK and dotenv for managing environment variables:  
```sh
npm install @hashgraph/sdk dotenv
```
- `@hashgraph/sdk` → The main SDK for interacting with Hedera  
- `dotenv` → Securely stores private keys  

---

## 4. Get Hedera Testnet Credentials
1. Sign up at the [Hedera Developer Portal](https://portal.hedera.com/)  
2. Create a **Testnet account**  
3. Copy your credentials:  
   - **Account ID** (e.g., `0.0.123456`)  
   - **Private Key** (a long key starting with `302e...`)  

---

## 5. Securely Store Credentials
1. Create a `.env` file in your project folder:  
   ```sh
   notepad .env
   ```
2. Add the following lines and replace with your credentials:  
   ```
   HEDERA_ACCOUNT_ID=0.0.123456
   HEDERA_PRIVATE_KEY=302e0201...
   ```
3. Save and close the file.  

---

## 6. Connect to Hedera Testnet
1. Create a new file **`index.js`** in your project folder.  
2. Add this code to test the connection:  
   ```js
   require("dotenv").config();
   const { Client } = require("@hashgraph/sdk");

   async function main() {
       const client = Client.forTestnet();
       client.setOperator(process.env.HEDERA_ACCOUNT_ID, process.env.HEDERA_PRIVATE_KEY);
       console.log(" Connected to Hedera Testnet!");
   }

   main();
   ```
3. Save and run the file:  
   ```sh
   node index.js
   ```
4. If successful, you'll see:  
   ```
    Connected to Hedera Testnet!
   ```

---

## 7. Send HBAR Transaction (Test)
Modify `index.js` to include a sample transaction:
```js
require("dotenv").config();
const { Client, TransferTransaction, Hbar } = require("@hashgraph/sdk");

async function main() {
    const client = Client.forTestnet();
    client.setOperator(process.env.HEDERA_ACCOUNT_ID, process.env.HEDERA_PRIVATE_KEY);
    
    console.log(" Connected to Hedera Testnet!");

    const transaction = new TransferTransaction()
        .addHbarTransfer(process.env.HEDERA_ACCOUNT_ID, new Hbar(-10)) // Sender
        .addHbarTransfer("0.0.YYYYYY", new Hbar(10)); // Receiver (replace with valid ID)

    const txResponse = await transaction.execute(client);
    console.log(`Transaction sent! ID: ${txResponse.transactionId}`);
}

main();
```
1. Replace `"0.0.YYYYYY"` with a valid recipient **Account ID**  
2. Run:  
   ```sh
   node index.js
   ```
3. If successful, you’ll see something like:  
   ```
   ✅ Transaction sent! ID: 0.0.123456@123456789
   ```

---

