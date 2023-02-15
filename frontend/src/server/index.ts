import SFTs_ABI from '~/../../contracts/abi/sfts_abi';
import SFTS_Address from '~/../../contracts/abi/sfts_address';

import NFTS_ABI from '~/../../contracts/abi/nfts_abi';
import NFTS_Address from '~/../../contracts/abi/nfts_address';

import PBP_ABI from '~/../../contracts/abi/pbarter_protocol_abi';
import PBP_Address from '~/../../contracts/abi/pbarter_protocol_address';
import { ethers } from 'ethers';

const providerRPC = {
  moonbase: {
    name: 'moonbase-alpha',
    rpc: 'https://rpc.api.moonbase.moonbeam.network',
    chainId: 1287, // 0x507 in hex,
  },
};
// Create ethers provider
const provider = new ethers.JsonRpcProvider(providerRPC.moonbase.rpc, {
  chainId: providerRPC.moonbase.chainId,
  name: providerRPC.moonbase.name,
});

// Contract
const SFTS_CONT = new ethers.Contract(SFTS_Address, SFTs_ABI, provider)
const NFTS_CONT = new ethers.Contract(NFTS_Address, NFTS_ABI, provider)
const PBP_CONT = new ethers.Contract(PBP_Address, PBP_ABI, provider)

export const ContractList = [
  {
    name: '3525',
    value: 3525,
    address: SFTS_Address,
    key: 1,
  },
  {
    name: '721',
    value: 721,
    address: NFTS_Address,
    key: 2,
  }
]

export async function getNFTS(contract: any) {
  const myAccount = window.localStorage.getItem('account') || '';
  const sum = await contract.methods.balanceOf(myAccount).call();
  console.log(sum, myAccount)
  const nfts = [];
  for (let i = 0; i++; i < sum) {
    const res = await contract.methods.tokenOfOwnerByIndex(myAccount, i).call()
    nfts.push(res)
  }
  return nfts;
}

export async function createOrder(baseAddr: string, targetAddr: string, baseId: string, targetId: string) {
  const myAccount = window.localStorage.getItem('account') || '';
  const res = await PBP_CONT['balanceOf(address)'](myAccount);

  const res = await PBP_CONT.methods.createOrder(baseAddr, targetAddr, [baseId], [targetId]).call();
  return res;
}