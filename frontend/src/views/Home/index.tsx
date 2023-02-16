import React, { useState, useEffect, useCallback } from 'react';
import { getOrderList, cancel, buy } from '~/server';
import EmptyIcon from '~/assets/empty.png';
import { toast } from 'react-toastify';
import CreateOrder from '~/components/CreateOrder';

export default function () {
  const [diaShow, setDiaShow] = useState(false);

  const toggle = useCallback(() => {
    setDiaShow(!diaShow);
  }, [diaShow]);
  const closeDia = useCallback(() => {
    setDiaShow(false);
  }, [diaShow]);
  const [list, setList] = useState<any[]>([]);
  const [myOrders, setMyOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const fetchData = async () => {
    const [orders, myList] = await getOrderList();
    console.log('orders', orders);
    console.log('myList', myList);
    setLoading(false);
    setList(orders);
    setMyOrders(myList);
  };
  useEffect(() => {
    fetchData();
  }, []);

  const cancelOrder = async (orderId: string) => {
    const res = await cancel(orderId);
    if (res) {
      toast.success('cancel the order successful', {
        autoClose: 2000,
        isLoading: false,
        pauseOnFocusLoss: false,
        hideProgressBar: true,
        closeButton: false,
      });
      fetchData();
    }
  };
  const buyOrder = async (address: string, tokenId: string, orderId: string) => {
    const res = await buy(address, tokenId, orderId);
    if (res) {
      toast.success('buy the order successful', {
        autoClose: 2000,
        isLoading: false,
        pauseOnFocusLoss: false,
        hideProgressBar: true,
        closeButton: false,
      });
      fetchData();
    }
  };
  return (
    <div className="font-mono">
      <button
        onClick={toggle}
        className="flex items-center px-10 mb-8 text-lg text-white rounded hover:bg-primary-focus bg-primary w-25 h-9"
      >
        create order
      </button>
      <CreateOrder show={diaShow} close={closeDia} />
      <div className="pb-4">
        <div className="text-2xl font-medium ">Order List</div>
      </div>
      <div className="w-full">
        <div className="w-full overflow-x-auto max-h-400">
          <table className="table w-full">
            <thead>
              <tr>
                <th></th>
                <th>orderId</th>
                <th>Base Token Address</th>
                <th>Base Token ID</th>
                <th>Target Token Address</th>
                <th>Target Token ID</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {list.map((row, index) => (
                <tr key={row.orderId}>
                  <th>{index + 1}</th>
                  <td>{row.orderId}</td>
                  <td>{row.base_address}</td>
                  <td>{row.base_nfts[0]}</td>
                  <td>{row.target_address}</td>
                  <td>{row.target_nfts[0]}</td>
                  <td>
                    <button
                      onClick={() => {
                        buyOrder(row.target_address, row.target_nfts[0], row.orderId);
                      }}
                      className="btn btn-xs btn-primary"
                    >
                      Transition
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {list.length ? null : loading ? (
            <div className="flex flex-col items-center justify-center bg-white h-300">Loading...</div>
          ) : (
            <div className="flex flex-col items-center justify-center bg-white h-300">
              <img className="w-20 h-20 mb-4" src={EmptyIcon} />
              It’s Empty
            </div>
          )}
        </div>
      </div>
      <div className="p-4">
        <div className="text-2xl font-medium ">My Order List</div>
      </div>
      <div className="w-full">
        <div className="w-full overflow-x-auto max-h-400">
          <table className="table w-full">
            <thead>
              <tr>
                <th></th>
                <th>orderId</th>
                <th>Base Token Address</th>
                <th>Base Token ID</th>
                <th>Target Token Address</th>
                <th>Target Token ID</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {myOrders.map((row, index) => (
                <tr key={row.orderId}>
                  <th>{index + 1}</th>
                  <td>{row.orderId}</td>
                  <td>{row.base_address}</td>
                  <td>{row.base_nfts[0] || row.base_snfts[0]}</td>
                  <td>{row.target_address}</td>
                  <td>{row.target_nfts[0] || row.target_snfts[0]}</td>
                  <td>
                    {row.sell_status ? (
                      <button
                        onClick={() => {
                          cancelOrder(row.orderId);
                        }}
                        className="btn btn-xs"
                      >
                        CANCEL
                      </button>
                    ) : null}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {myOrders.length ? null : loading ? (
            <div className="flex flex-col items-center justify-center bg-white h-300">Loading...</div>
          ) : (
            <div className="flex flex-col items-center justify-center bg-white h-300">
              <img className="w-20 h-20 mb-4" src={EmptyIcon} />
              It’s Empty
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
