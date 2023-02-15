import React, { useState, useEffect } from 'react';
import MetaMaskSDK from '@metamask/sdk/dist/browser/umd/metamask-sdk.js';
import Avatar from '~/assets/avatar.png';
import Wallet from '~/assets/wallet.svg';

const MMSDK = new MetaMaskSDK();

const ethereum = MMSDK.getProvider(); // You can also access via window.ethereum

function Nav() {
  const [account, setAccount] = useState('');

  useEffect(() => {
    const account: string = window.localStorage.getItem('account') ?? '';
    setAccount(account);
  });
  const connect = async () => {
    if (typeof ethereum !== 'undefined') {
      const res = await ethereum.request({ method: 'eth_requestAccounts', params: [] });
      console.log(res)
      window.localStorage.setItem('account', res[0]);
      setAccount(res[0]);
    } else {
      console.log('MetaMask is not installed!');
    }
  };
  const logout = () => {
    window.localStorage.removeItem('account');
    setAccount('');
  }
  return (
    <div className="box-border flex items-center w-full h-20 px-4 shadow-md bg-base-100">
      <div className="flex-1">
        <a className="font-mono text-lg normal-case">PBarter</a>
      </div>
      <div className="flex items-center">
        <div className="dropdown dropdown-end">
          <label className="btn btn-ghost btn-circle avatar">
            <div onClick={connect} className="w-10 rounded-full">
              <img className="w-full" src={account ? Avatar : Wallet} />
            </div>
          </label>
          {account ? (
            <ul
              className="p-2 mt-3 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
            >
              <li onClick={logout}>
                <a>Logout</a>
              </li>
            </ul>
          ) : null}
        </div>
        <div className="w-20 truncate font-sans" title={account}>{ account }</div>
      </div>
    </div>
  );
}
export default Nav;
