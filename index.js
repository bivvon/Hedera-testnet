
require("dotenv").config();
const { Client, TransferTransaction, Hbar, PrivateKey } = require("@hashgraph/sdk");


const client = Client.forTestnet();
client.setOperator(process.env.HEDERA_ACCOUNT_ID, PrivateKey.fromString(process.env.HEDERA_PRIVATE_KEY));

async function main() {
    console.log("Succefully connected to Hedera Testnet!");
}

async function sendHbar() {
    try {
        const transaction = new TransferTransaction()
            .addHbarTransfer(process.env.HEDERA_ACCOUNT_ID, new Hbar(-10)) // Sender
            .addHbarTransfer("0.0.5674184", new Hbar(10)); 

        const txResponse = await transaction.execute(client);
        console.log(" Transaction sent! ID:", txResponse.transactionId.toString());
    } catch (error) {
        console.error("Error sending HBAR:", error);
    }
}

main().then(sendHbar);
