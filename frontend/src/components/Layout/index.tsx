import { Outlet } from 'react-router-dom';
import Nav from './Nav';
import React from 'react';

export default function () {
  return (
    <div className="w-screen h-screen">
      <div className="flex flex-col w-screen h-screen bg-primary-content">
        <div className="font-mono bg-base-100">
          <Nav />
        </div>
        <div className="flex flex-col flex-grow-0 overflow-y-auto p-5">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

