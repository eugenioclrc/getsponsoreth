import { ethers } from 'ethers';
import { defaultEvmStores } from 'svelte-ethers-store';

// Web3modal instance
let web3Modal

// Chosen wallet provider given by the dialog window
let provider;


// Address of the selected account
let selectedAccount;


/**
 * Setup the orchestra
 */
export async function init() {
  const WalletConnectProvider = window.WalletConnectProvider.default;
  
  console.log("Initializing example");
  console.log("WalletConnectProvider is", WalletConnectProvider);
  console.log("window.web3 is", ethers, "window.ethereum is", window.ethereum);
  
  // Check that the web page is run in a secure context,
  // as otherwise MetaMask won't be available
  
  // Tell Web3modal what providers we have available.
  // Built-in web browser provider (only one can exist as a time)
  // like MetaMask, Brave or Opera is added automatically by Web3modal
  const providerOptions = {
    walletconnect: {
      package: WalletConnectProvider,
      options: {
        // Mikko's test key - don't copy as your mileage may vary
        infuraId: "8043bb2cf99347b1bfadfb233c5325c0",
      }
    },
  };
  
  web3Modal = new window.Web3Modal.default({
    cacheProvider: true, // optional
    providerOptions, // required
    disableInjectedProvider: false, // optional. For MetaMask / Brave / Opera.
  });
  
  if (web3Modal.cachedProvider) {
    provider = await web3Modal.connect();
    defaultEvmStores.setProvider(provider);
  }
  console.log("Web3Modal instance is", web3Modal);
}



/**
 * Connect wallet button pressed.
 */
export async function onConnect() {

  console.log("Opening a dialog", web3Modal);
  try {
    provider = await web3Modal.connect();
    defaultEvmStores.setProvider(provider);
  } catch(e) {
    console.log("Could not get a wallet connection", e);
    return;
  }

}

/**
 * Disconnect wallet button pressed.
 */
export async function onDisconnect() {

  console.log("Killing the wallet connection", provider);

  // TODO: Which providers have close method?
  if (provider.close) {
    await web3Modal.clearCachedProvider();
    await provider.close();

    // If the cached provider is not cleared,
    // WalletConnect will default to the existing session
    // and does not allow to re-scan the QR code with a new wallet.
    // Depending on your use case you may want or want not his behavir.
    provider = null;
  }
  defaultEvmStores.disconnect();
}