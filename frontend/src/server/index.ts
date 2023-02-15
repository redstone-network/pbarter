import SFTs_ABI from '~/../../contracts/abi/sfts_abi';
import SFTS_Address from '~/../../contracts/abi/sfts_address';

import NFTS_ABI from '~/../../contracts/abi/nfts_abi';
import NFTS_Address from '~/../../contracts/abi/nfts_address';

import PBP_ABI from '~/../../contracts/abi/pbarter_protocol_abi';
import PBP_Address from '~/../../contracts/abi/pbarter_protocol_address';

import Web3 from 'web3';
import { ethers } from 'ethers';
// web3 instance
const web3 = new Web3('https://rpc.testnet.moonbeam.network');
const myAccount = window.localStorage.getItem('account') || '';
// Contract
const SFTS_CONT = new web3.eth.Contract(SFTs_ABI, SFTS_Address);
const NFTS_CONT = new web3.eth.Contract(NFTS_ABI, NFTS_Address);
const PBP_CONT = new web3.eth.Contract(PBP_ABI, PBP_Address);

export async function getSFTS_NFTS() {
  // --------------------------------

  /* web3.js 调用重名函数有些问题，下面使用是使用 ethers.js调用重名函数balanceOf的实例 */

  // ethers 获取的合约实例
  // 1. Define network configurations
  const providerRPC = {
    moonbase: {
      name: 'moonbase-alpha',
      rpc: 'https://rpc.api.moonbase.moonbeam.network',
      chainId: 1287, // 0x507 in hex,
    },
  };
  // 2. Create ethers provider
  const provider = new ethers.JsonRpcProvider(providerRPC.moonbase.rpc, {
    chainId: providerRPC.moonbase.chainId,
    name: providerRPC.moonbase.name,
  });

  // 3. Get contract instance
  let contract_ethers = new ethers.Contract(SFTS_Address, SFTs_ABI, provider);
  console.log('ethers contract:', contract_ethers);

  // 4. call same name functions

  const sum = await contract_ethers['balanceOf(address)'](myAccount);
  console.log('当前用户所持有的SNFT数量:', sum);

  const snft_number = await contract_ethers['balanceOf(uint256)'](1);
  console.log('当前用户持有TokenId为1的SNFT的份数:', snft_number);

  // --------------------------------

  // const sum = await SFTS_CONT.methods.balanceOf(myAccount).call();
  // console.log(sum, myAccount);
  // const nfts: never[] = [];
  // // for (let i = 0; i++; i < sum) {
  // //   const res = await incrementer.methods.tokenOfOwnerByIndex(myAccount, i).call()
  // //   console.log('res', res)
  // //   nfts.push(res)
  // // }
  // console.log('nfts', nfts);
  // return nfts;
}

getSFTS_NFTS();
