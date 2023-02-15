import { Outlet } from 'react-router-dom';
import Nav from './Nav';
import { ReactComponent as Logo } from '~/assets/home.svg';
import { ReactComponent as Nft } from '~/assets/order.svg';
import { useLocation, useNavigate } from 'react-router-dom';
import CreateOrder from '../CreateOrder';
import React, { useState, useCallback } from 'react';

export default function () {
  let location = useLocation();
  const navigate = useNavigate();
  const [diaShow, setDiaShow] = useState(false);

  const toggle = useCallback(() => {
    setDiaShow(!diaShow);
  }, [diaShow]);
  const closeDia = useCallback(() => {
    setDiaShow(false);
  }, [diaShow]);
  
  const menu = [
    {
      path: '/',
      name: 'Order List',
      icon: Logo,
    },
    {
      path: '/nft',
      name: 'NFT List',
      icon: Nft,
    },
  ];
  return (
    <div className="w-screen h-screen">
      <div className="flex w-screen h-screen font-sans bg-primary-content">
        <div className="flex flex-col h-full bg-base-100 w-60">
          <div className="flex flex-col w-full px-4 pt-5">
            <button onClick={toggle} className="flex items-center px-10 text-lg text-white rounded hover:bg-primary-focus bg-primary w-25 h-9">
              create order
            </button>
            <div className="divider"></div>
          </div>
          <ul className="flex-1 w-full menu">
            {menu.map((Item) => {
              return (
                <li key={Item.path} onClick={() => navigate(Item.path)}>
                  <a className={location.pathname === Item.path ? 'active' : ''}>
                    <Item.icon className="w-5 h-5"/>
                    {Item.name}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="flex flex-col flex-1">
          <Nav />
          <div className="flex-1 p-6">
            <Outlet />
          </div>
        </div>
      </div>
      <CreateOrder show={diaShow} close={closeDia} />
    </div>
  );
}
