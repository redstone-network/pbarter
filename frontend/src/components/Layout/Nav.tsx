import React, { useState, useEffect } from 'react';
import MetaMaskSDK from '@metamask/sdk/dist/browser/umd/metamask-sdk.js';
import Avatar from '~/assets/avatar.png';
import Wallet from '~/assets/wallet.svg';

import { ReactComponent as Logo } from '~/assets/home.svg';
import { ReactComponent as Pbarter } from '~/assets/logo.svg';
import { ReactComponent as Nft } from '~/assets/order.svg';
import { useLocation, useNavigate } from 'react-router-dom';

const MMSDK = new MetaMaskSDK();
const ethereum = MMSDK.getProvider(); // You can also access via window.ethereum
const menu = [
  {
    path: '/',
    name: 'Order List',
    icon: Logo,
  },
  {
    path: '/nft',
    name: 'NFT Details',
    icon: Nft,
  },
];

function Nav() {
  const [account, setAccount] = useState('');
  let location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const account: string = window.localStorage.getItem('account') ?? '';
    setAccount(account);
  });

  const connect = async () => {
    if (typeof ethereum !== 'undefined') {
      const res = await ethereum.request({ method: 'eth_requestAccounts', params: [] });
      window.localStorage.setItem('account', res[0]);
      setAccount(res[0]);
    } else {
      console.log('MetaMask is not installed!');
    }
  };

  ethereum.on('accountsChanged', function (accounts: string[]) {
    window.localStorage.setItem('account', accounts[0]);
    setAccount(accounts[0]);
  });

  const logout = () => {
    window.localStorage.removeItem('account');
    setAccount('');
  };

  return (
    <div className="box-border flex items-center w-full h-20 px-4 shadow-md bg-base-100 justify-between">
      <div className="flex-1 flex">
        <div className="flex items-center">
          <Pbarter className="w-10 h-10" />
          <a className="font-mono px-2 text-2xl font-bold normal-case ">PBarter</a>
        </div>
        <ul className="flex items-center ml-20 cursor-pointer">
          {menu.map((Item) => {
            return (
              <li className="font-medium mr-8 text-xl" key={Item.path} onClick={() => navigate(Item.path)}>
                <a className={location.pathname === Item.path ? 'text-primary' : ''}>{Item.name}</a>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="flex items-center">
        <div className="dropdown dropdown-end" title={account}>
          <label className="btn btn-ghost btn-circle avatar placeholder">
            {!account ? (
              <div onClick={connect} className="w-10 rounded-full">
                <img className="w-full" src={Wallet} />
              </div>
            ) : (
              <div className="bg-neutral-focus text-neutral-content rounded-full w-10">
                  <span>{ account.slice(-2)}</span>
              </div>
            )}
          </label>
          {account ? (
            <ul className="p-2 mt-3 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
              <li onClick={logout}>
                <a>Logout</a>
              </li>
            </ul>
          ) : null}
        </div>
      </div>
    </div>
  );
}
export default Nav;
