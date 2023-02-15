import SFTs_ABI from '~/../../contracts/abi/sfts_abi';
import SFTS_Address from '~/../../contracts/abi/sfts_address';

import NFTS_ABI from '~/../../contracts/abi/nfts_abi';
import NFTS_Address from '~/../../contracts/abi/nfts_address';

import PBP_ABI from '~/../../contracts/abi/pbarter_protocol_abi';
import PBP_Address from '~/../../contracts/abi/pbarter_protocol_address';
import { ethers } from 'ethers';
import { NftIem } from './type';
import detectEthereumProvider from '@metamask/detect-provider';
console.log(11111)

const browserProvider = await detectEthereumProvider();
console.log("#### provider", browserProvider)

const providerRPC = {
  moonbase: {
    name: 'moonbase-alpha',
    rpc: 'https://rpc.api.moonbase.moonbeam.network',
    chainId: 1287, // 0x507 in hex,
  },
};
// Create ethers provider
// console.log(ethers.providers)
// const provider = new ethers.providers.Web3Provider(window["ethereum"]);
// console.log(provider.provider.isMetaMask)
// Contract

const provider = new ethers.providers.Web3Provider(browserProvider);

const SFTS_CONT = new ethers.Contract(SFTS_Address, SFTs_ABI, provider.getSigner())
const NFTS_CONT = new ethers.Contract(NFTS_Address, NFTS_ABI, provider.getSigner())
const PBP_CONT = new ethers.Contract(PBP_Address, PBP_ABI, provider.getSigner())

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

export async function getSFTS():Promise<NftIem[]> {
  const myAccount = window.localStorage.getItem('account') || '';
  let sum = await SFTS_CONT['balanceOf(address)'](myAccount);
  sum = Number(sum);
  const nfts: NftIem[] = [];
  for (let i = 0; i < sum; i++) {
    const res = await SFTS_CONT.tokenOfOwnerByIndex(myAccount, i)
    nfts.push({
      type: '3525',
      id: Number(res),
    })
  }
  return nfts;
}
export async function getNFTS():Promise<NftIem[]> {
  const myAccount = window.localStorage.getItem('account') || '';
  let sum = await NFTS_CONT.balanceOf(myAccount);
  console.log(Number(sum))
  sum = Number(sum);
  const nfts: NftIem[] = [];
  for (let i = 0; i < sum; i++) {
    // const res = await SFTS_CONT.tokenOfOwnerByIndex(myAccount, i+1)
    nfts.push({
      type: '721',
      id: i+1,
    })
  }
  return nfts;
}
export async function createOrder(baseAddr: string, targetAddr: string, baseId: string, targetId: string) {
  const myAccount = window.localStorage.getItem('account') || '';
  if (baseAddr === SFTS_Address) {
    console.log('3525', baseAddr)
    const approveRes = await SFTS_CONT['approve(address, unit256)'](PBP_Address, baseId);
    const res = await PBP_CONT.createOrder(baseAddr, targetAddr, [baseId], [targetId]);
    return res
  } else if (baseAddr === NFTS_Address) {
    console.log('721', baseAddr)
    const approveRes = await NFTS_CONT['approve(string, string)'](PBP_Address, baseId);
    const res = await PBP_CONT.createOrder(baseAddr, targetAddr, [baseId], [targetId]);
    return res
  }
}
// This function detects most providers injected at window.ethereum
// import detectEthereumProvider from '@metamask/detect-provider';