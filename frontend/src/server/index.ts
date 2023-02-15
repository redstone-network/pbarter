import SFTs_ABI from '~/../../contracts/abi/sfts_abi';
import SFTS_Address from '~/../../contracts/abi/sfts_address';

import NFTS_ABI from '~/../../contracts/abi/nfts_abi';
import NFTS_Address from '~/../../contracts/abi/nfts_address';

import PBP_ABI from '~/../../contracts/abi/pbarter_protocol_abi';
import PBP_Address from '~/../../contracts/abi/pbarter_protocol_address';

import Web3 from "web3";
// web3 instance
const web3 = new Web3("https://rpc.testnet.moonbeam.network");
// Contract
const SFTS_CONT = new web3.eth.Contract(SFTs_ABI, SFTS_Address)
const NFTS_CONT = new web3.eth.Contract(NFTS_ABI, NFTS_Address)
const PBP_CONT = new web3.eth.Contract(PBP_ABI, PBP_Address)
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
  const res = await PBP_CONT.methods.createOrder(baseAddr, targetAddr, [baseId], [targetId]).call();
  return res;
}
