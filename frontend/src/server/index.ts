import SFTs_ABI from '~/../../contracts/abi/sfts_abi';
import SFTS_Address from '~/../../contracts/abi/sfts_address';

import NFTS_ABI from '~/../../contracts/abi/nfts_abi';
import NFTS_Address from '~/../../contracts/abi/nfts_address';

import PBP_ABI from '~/../../contracts/abi/pbarter_protocol_abi';
import PBP_Address from '~/../../contracts/abi/pbarter_protocol_address';

import { ethers } from 'ethers';
import Web3 from 'web3';

import { NftIem } from './type';
import detectEthereumProvider from '@metamask/detect-provider';
console.log(11111);

const provider: any = await detectEthereumProvider({
  mustBeMetaMask: true,
});
const web3 = new Web3(provider);

const SFTS_CONT = new web3.eth.Contract(SFTs_ABI, SFTS_Address);
const NFTS_CONT = new web3.eth.Contract(NFTS_ABI, NFTS_Address);
const PBP_CONT = new web3.eth.Contract(PBP_ABI, PBP_Address);

// Contract
// const SFTS_CONT = new ethers.Contract(SFTS_Address, SFTs_ABI, provider)
// const NFTS_CONT = new ethers.Contract(NFTS_Address, NFTS_ABI, provider)
// const PBP_CONT = new ethers.Contract(PBP_Address, PBP_ABI, provider)

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
  },
];

export async function getSFTS(): Promise<NftIem[]> {
  const myAccount = window.localStorage.getItem('account') || '';
  let sum = await SFTS_CONT.methods['balanceOf(address)'](myAccount).call();
  sum = Number(sum);
  const nfts: NftIem[] = [];
  for (let i = 0; i < sum; i++) {
    const id = await SFTS_CONT.methods.tokenOfOwnerByIndex(myAccount, i).call();
    const slot = await SFTS_CONT.methods.slotOf(id).call();
    const symbol = await SFTS_CONT.methods.symbol().call();
    const name = await SFTS_CONT.methods.name().call();
    nfts.push({
      type: '3525',
      id: Number(id),
      slot,
      ownerOf: '',
      symbol,
      name
    });
  }
  return nfts;
}
export async function getNFTS(): Promise<NftIem[]> {
  const myAccount = window.localStorage.getItem('account') || '';
  let sum = await NFTS_CONT.methods.balanceOf(myAccount).call();
  sum = Number(sum);
  const nfts: NftIem[] = [];
  for (let i = 0; i < sum; i++) {
    const symbol = await NFTS_CONT.methods.symbol().call();
    const name = await NFTS_CONT.methods.name().call();
    nfts.push({
      type: '721',
      id: '',
      slot: '',
      ownerOf: '',
      symbol,
      name
    });
  }
  return nfts;
}
export async function createOrder(baseAddr: string, targetAddr: string, baseId: string, targetId: string) {
  const myAccount = window.localStorage.getItem('account') || '';
  if (baseAddr === SFTS_Address) {
    console.log('3525', baseAddr);
    const approveRes = await SFTS_CONT.methods.approve(PBP_Address, baseId).send({
      from: myAccount,
    });
    console.log('approveRes', approveRes);
    if (approveRes.status) {
      const res = await PBP_CONT.methods.createOrder(baseAddr, targetAddr, [baseId], [targetId]).send({
        from: myAccount,
      });
      console.log('create', res);
      return res;
    } else {
      return false;
    }
  } else if (baseAddr === NFTS_Address) {
    console.log('721', baseAddr);
    const approveRes = await NFTS_CONT.methods.approve(PBP_Address, baseId).send({
      from: myAccount,
    });
    console.log('approveRes', approveRes);
    if (approveRes.status) {
      const res = await PBP_CONT.methods.createOrder(baseAddr, targetAddr, [baseId], [targetId]).send({
        from: myAccount,
      });
      console.log('create', res);
      return res;
    } else {
      return false;
    }
  }
}
export async function getOrderList() {
  const myAccount = window.localStorage.getItem('account') || '';
  const unFinishOrders = await PBP_CONT.methods.unFinishedOrders().call();
  const myOrders = await PBP_CONT.methods.allOwnOrders().call({
    from: myAccount
  });
  console.log('myOrders', myOrders)
  console.log('unFinishOrders', unFinishOrders)
  const showOrders = unFinishOrders;

  const myOrdersShow = [];
  const orders = [];
  for (let i = 0; i < showOrders.length; i++) {
    const detail = await PBP_CONT.methods.getOrder(showOrders[i]).call();
    orders.push({
      ...detail,
      orderId: showOrders[i]
    });
  }
  for (let i = 0; i < myOrders.length; i++) {
    const detail = await PBP_CONT.methods.getOrder(myOrders[i]).call();
    myOrdersShow.push({
      ...detail,
      orderId: myOrders[i]
    });
  }

  return [orders, myOrdersShow];
}
export async function cancel(orderId: string): Promise<boolean> {
  const myAccount = window.localStorage.getItem('account') || '';
  const res = await PBP_CONT.methods.withDrawOrder(orderId).send({
    from: myAccount,
  });
  if (res.status) {
    return true
  }
  return false
}

export async function buy(address: string, tokenId: string, orderId: string): Promise<boolean> {
  const myAccount = window.localStorage.getItem('account') || '';
  let approveRes;
  if (address === SFTS_Address) { 
    approveRes = await SFTS_CONT.methods.approve(PBP_Address, tokenId).send({
      from: myAccount,
    });
  } else {
    approveRes =  await NFTS_CONT.methods.approve(PBP_Address, tokenId).send({
      from: myAccount,
    });
  }
  console.log(approveRes.status)
  if (approveRes.status) { 
    const res = await PBP_CONT.methods.buy(orderId).send({
      from: myAccount,
    });
    if (res.status) {
      return true
    }
  }
  return false
}