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
    const res = await SFTS_CONT.methods.tokenOfOwnerByIndex(myAccount, i).call();
    console.log('res', res);
    nfts.push({
      type: '3525',
      id: Number(res),
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
    nfts.push({
      type: '721',
      id: i + 1,
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
  const allOrders: number[] = await PBP_CONT.methods.allOrders().call();
  const unFinishOrders = await PBP_CONT.methods.unFinishedOrders().call();
  const myOrders = await PBP_CONT.methods.allOwnOrders().call();

  const showOrders = unFinishOrders.filter((item: number) => !myOrders.includes(item));
  const showMyOrders = myOrders;
  const orders = [];
  for (let i = 0; i < showOrders.length; i++) {
    const detail = await PBP_CONT.methods.getOrder(showOrders[i]).call();
    orders.push({
      ...detail,
      orderId: showOrders[i],
    });
  }
  console.log('orders', orders);
  console.log('myOrders', myOrders);

  return [orders, showMyOrders];
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

export async function buy(orderId: string): Promise<boolean> {
  const myAccount = window.localStorage.getItem('account') || '';
  const res = await PBP_CONT.methods.buy(orderId).send({
    from: myAccount,
  });
  if (res.status) {
    return true
  }
  return false
}
