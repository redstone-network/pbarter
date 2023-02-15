import SFTs_ABI from '~/../../contracts/abi/sfts_abi';
import SFTS_Address from '~/../../contracts/abi/sfts_address';

import NFTS_ABI from '~/../../contracts/abi/nfts_abi';
import NFTS_Address from '~/../../contracts/abi/nfts_address';

import PBP_ABI from '~/../../contracts/abi/pbarter_protocol_abi';
import PBP_Address from '~/../../contracts/abi/pbarter_protocol_address';

import Web3 from "web3";
// web3 instance
const web3 = new Web3("https://rpc.testnet.moonbeam.network");
const myAccount = window.localStorage.getItem('account') || '';
// Contract
const SFTS_CONT = new web3.eth.Contract(SFTs_ABI, SFTS_Address)
const NFTS_CONT = new web3.eth.Contract(NFTS_ABI, NFTS_Address)
const PBP_CONT = new web3.eth.Contract(PBP_ABI, PBP_Address)

export async function getSFTS_NFTS() {
  const sum = await SFTS_CONT.methods.balanceOf(myAccount).call();
  console.log(sum, myAccount)
  const nfts: never[] = [];
  // for (let i = 0; i++; i < sum) {
  //   const res = await incrementer.methods.tokenOfOwnerByIndex(myAccount, i).call()
  //   console.log('res', res)
  //   nfts.push(res)
  // }
  console.log('nfts', nfts)
  return nfts;
}
