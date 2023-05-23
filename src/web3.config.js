export const CONTRACT_ADDRESS = "0x0B932868fC73Bca3F5E8EaC297de784ff50E6a82";
export const CONTRACT_ABI = [
  {
    inputs: [
      {
        internalType: "string",
        name: "_a",
        type: "string",
      },
    ],
    name: "letters",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "check",
    outputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];
