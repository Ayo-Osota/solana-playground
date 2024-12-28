const {
  Connection,
  Keypair,
  PublicKey,
  clusterApiUrl,
  LAMPORTS_PER_SOL,
} = require("@solana/web3.js");

const wallet = new Keypair();

const publicKey = new PublicKey(wallet._keypair.publicKey);
const secretKey = wallet._keypair.secretKey;

console.log("Public Key: ", publicKey.toString());
console.log("Secret Key: ", secretKey);

const getWalletBalance = async () => {
  try {
    const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
    const balance = await connection.getBalance(publicKey);
    console.log("Balance: ", balance);
  } catch (error) {
    console.error(error);
  }
};

const airdrop = async () => {
  try {
    const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
    const fromAirDropSignature = await connection.requestAirdrop(
      publicKey,
      2 * LAMPORTS_PER_SOL
    );
    const latestBlockHash = await connection.getLatestBlockhash();
    await connection.confirmTransaction({
      blockhash: latestBlockHash.blockhash,
      lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
      signature: fromAirDropSignature,
    });
  } catch (error) {
    console.error(error);
  }
};

const main = async () => {
  await getWalletBalance();
  await airdrop();
  await getWalletBalance();
};

main();
