console.clear();
require("dotenv").config();
const {
  AccountId,
  PrivateKey,
  Client,
  FileCreateTransaction,
  ContractCreateTransaction,
  ContractFunctionParameters,
  ContractExecuteTransaction,
  ContractCallQuery,
  Hbar,
} = require("@hashgraph/sdk");
const fs = require("fs");

// Configure accounts and client

const operatorId = AccountId.fromString("0.0.34877377");
const operatorKey = PrivateKey.fromString(
  "302e020100300506032b657004220420e71aaf2a3ff80540b37047c126e16ebad5d0e837e10bbea7d8abe4268e6eb324"
);
const addy = "0x6CAc6323c14C14c71bF5babd1328279153e049a6";

const client = Client.forTestnet().setOperator(operatorId, operatorKey);

async function main() {
  // Import the compiled contract bytecode
  const contractBytecode = fs.readFileSync("Bytecode.bin");
  console.log("File read");

  // Create a file on Hedera and store the bytecode
  const fileCreateTx = new FileCreateTransaction()
    .setContents(contractBytecode)
    .setKeys([operatorKey])
    .freezeWith(client);
  console.log("fileTx Creation");
  const fileCreateSign = await fileCreateTx.sign(operatorKey);
  const fileCreateSubmit = await fileCreateSign.execute(client);
  //   const fileCreateRx = await fileCreateSubmit.getReceipt(client);
  //   const bytecodeFileId = fileCreateRx.fileId;
  //   console.log(`- The bytecode file ID is: ${bytecodeFileId} \n`);

  //   // Instantiate the smart contract
  //   const contractInstantiateTx = new ContractCreateTransaction()
  //     .setBytecodeFileId(bytecodeFileId)
  //     .setGas(100000)
  //     .setConstructorParameters(
  //       new ContractFunctionParameters().addAddress(addy)
  //     );
  //   const contractInstantiateSubmit = await contractInstantiateTx.execute(client);
  //   const contractInstantiateRx = await contractInstantiateSubmit.getReceipt(
  //     client
  //   );
  //   const contractId = contractInstantiateRx.contractId;
  //   const contractAddress = contractId.toSolidityAddress();
  //   console.log(`- The smart contract ID is: ${contractId} \n`);
  //   console.log(
  //     `- The smart contract ID in Solidity format is: ${contractAddress} \n`
  //   );

  //   // Query the contract to check changes in state variable
  //   const contractExecuteTx = new ContractExecuteTransaction()
  //     .setContractId(contractId)
  //     .setGas(100000)
  //     .setFunction(
  //       "updateAllowed",
  //       new ContractFunctionParameters()
  //         .addAddress(addy)
  //         .addAddress(addy)
  //         .addBool(true)
  //         .addUint256(100)
  //     );
  //   const contractExecuteSubmit = await contractExecuteTx.execute(client);
  //   const contractExecuteRx = await contractExecuteSubmit.getReceipt(client);
  //   console.log(
  //     `- Contract function call status: ${contractExecuteRx.status} \n`
  //   );

  //   // Call contract function to update the state variable
  //   const contractQueryTx = new ContractCallQuery()
  //     .setContractId(contractId)
  //     .setGas(100000)
  //     .setFunction(
  //       "isAllowedToken",
  //       new ContractFunctionParameters().addAddress(addy)
  //     );

  //   const contractQuerySubmit = await contractQueryTx.execute(client);
  //   const contractQueryResult = contractQuerySubmit.getBool();
  //   console.log(
  //     `- Here's the phone number that you asked for: ${contractQueryResult} \n`
  //   );
}
main();
