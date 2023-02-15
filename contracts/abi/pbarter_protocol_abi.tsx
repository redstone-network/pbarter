//合约ABI
const PBP_ABI: any = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "_from",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "_destAddr",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "order_id",
        type: "uint256",
      },
    ],
    name: "BoughtSuccess",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "_from",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "order_id",
        type: "uint256",
      },
    ],
    name: "OrderedSucess",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "_from",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "order_id",
        type: "uint256",
      },
    ],
    name: "WithDrawSuccess",
    type: "event",
  },
  {
    inputs: [],
    name: "allOrders",
    outputs: [
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "allOwnOrders",
    outputs: [
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256[]",
        name: "order_ids",
        type: "uint256[]",
      },
    ],
    name: "autoMatchOrder",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "order_id",
        type: "uint256",
      },
    ],
    name: "buy",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "contract_owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract ERC3525",
        name: "base_address",
        type: "address",
      },
      {
        internalType: "contract ERC3525",
        name: "target_address",
        type: "address",
      },
      {
        internalType: "uint256[]",
        name: "base_nft_sfts",
        type: "uint256[]",
      },
      {
        internalType: "uint256[]",
        name: "target_nft_sfts",
        type: "uint256[]",
      },
    ],
    name: "createOrder",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256[]",
        name: "order_ids",
        type: "uint256[]",
      },
    ],
    name: "getFilterOrders",
    outputs: [
      {
        components: [
          {
            internalType: "contract ERC3525",
            name: "base_address",
            type: "address",
          },
          {
            internalType: "contract ERC3525",
            name: "target_address",
            type: "address",
          },
          {
            internalType: "uint256[]",
            name: "base_nfts",
            type: "uint256[]",
          },
          {
            internalType: "uint256[]",
            name: "target_nfts",
            type: "uint256[]",
          },
          {
            internalType: "uint256[]",
            name: "base_snfts",
            type: "uint256[]",
          },
          {
            internalType: "uint256[]",
            name: "target_snfts",
            type: "uint256[]",
          },
          {
            internalType: "address",
            name: "order_owner",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "order_index",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "sell_status",
            type: "bool",
          },
        ],
        internalType:
          "struct Pbarter_Protocol.Order[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "order_id",
        type: "uint256",
      },
    ],
    name: "getOrder",
    outputs: [
      {
        components: [
          {
            internalType: "contract ERC3525",
            name: "base_address",
            type: "address",
          },
          {
            internalType: "contract ERC3525",
            name: "target_address",
            type: "address",
          },
          {
            internalType: "uint256[]",
            name: "base_nfts",
            type: "uint256[]",
          },
          {
            internalType: "uint256[]",
            name: "target_nfts",
            type: "uint256[]",
          },
          {
            internalType: "uint256[]",
            name: "base_snfts",
            type: "uint256[]",
          },
          {
            internalType: "uint256[]",
            name: "target_snfts",
            type: "uint256[]",
          },
          {
            internalType: "address",
            name: "order_owner",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "order_index",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "sell_status",
            type: "bool",
          },
        ],
        internalType:
          "struct Pbarter_Protocol.Order",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "next_order_id",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "order_id",
        type: "uint256",
      },
    ],
    name: "orderOwner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "unFinishedOrders",
    outputs: [
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "unfinished_order_numbers",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "order_id",
        type: "uint256",
      },
    ],
    name: "withDrawOrder",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];
export default PBP_ABI;
