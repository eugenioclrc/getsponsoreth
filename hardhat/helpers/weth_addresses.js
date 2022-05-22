export const wethAddresses = {
  "mumbai": [
    {
      weth:
        "0x9c3c9283d3e44854697cd22d3faa240cfb032889",
      aeth: "0xF45444171435d0aCB08a8af493837eF18e86EE27",

    },
  ],

  "kovan": [
     {
      weth:
        "0xDD13CE9DE795E7faCB6fEC90E346C7F3abe342E2",
      aeth: "0x87b1f4cf9BD63f7BBD3eE1aD04E8F52540349347",

    },
  ],
  

  "celo": [
     {
      weth:
        "0xDD13CE9DE795E7faCB6fEC90E346C7F3abe342E2",
      aeth: "0x87b1f4cf9BD63f7BBD3eE1aD04E8F52540349347",

    },
  ],
  "gnosis": [
     {
      weth:
        "0xDD13CE9DE795E7faCB6fEC90E346C7F3abe342E2",
      aeth: "0x87b1f4cf9BD63f7BBD3eE1aD04E8F52540349347",

    },
  ],
};

export const getCollectionsByChain = (chain) => networkCollections[chain];