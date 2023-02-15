import { ContractList } from '~/server';
import React, { useCallback, useState } from 'react';
import { createOrder } from '~/server';
import { toast } from 'react-toastify';

type AppProps = {
  show: boolean;
  close: () => void;
};

export default function ({ show, close }: AppProps) {
  const [baseAddr, setBaseAddr] = useState('');
  const [targetAddr, setTargetAddr] = useState('');
  const [baseId, setBaseId] = useState('');
  const changeBaseId = useCallback((event: React.FormEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    setBaseId(value);
  }, []);

  const [targetId, setTargetId] = useState('');
  const changeTargetId = useCallback((event: React.FormEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    setTargetId(value);
  }, []);
  const changeBaseAddr = useCallback(
    (event: React.FormEvent<HTMLSelectElement>) => {
      const value = event.currentTarget.value;
      const valueList = ContractList.map((item) => item.address);
      const otherValue = valueList.find((item) => item !== value);
      setBaseAddr(value);
      setTargetAddr(otherValue!);
    },
    [baseAddr]
  );
  const changeTargetAddr = useCallback(
    (event: React.FormEvent<HTMLSelectElement>) => {
      const value = event.currentTarget.value;
      const valueList = ContractList.map((item) => item.address);
      const otherValue = valueList.find((item) => item !== value);
      setTargetAddr(value);
      setBaseAddr(otherValue!);
    },
    [baseAddr]
  );

  const submit = async () => {
    try {
      const res = await createOrder(baseAddr, targetAddr, baseId, targetId)
      console.log(res)
      console.log(res)
      toast.success('create order successful', {
        autoClose: 2000,
        isLoading: false,
        pauseOnFocusLoss: false,
        hideProgressBar: true,
        closeButton: false
      })
    } catch (e) {
      console.log(e)
      toast.error('create order error', {
        autoClose: 2000,
        isLoading: false,
        pauseOnFocusLoss: false,
        hideProgressBar: true,
        closeButton: false
      })
    }
  }

  const closeMod = () => {
    close();
    setBaseAddr('');
    setTargetAddr('');
    setBaseId('');
    setTargetId('');
  }
  const modalStyle = {
    maxWidth: 'none',
    width: '1200px',
    height: '420px',
  };

  return (
    <div onClick={closeMod} className={show ? 'modal modal-open' : 'modal'}>
      <div onClick={(e) => e.stopPropagation()} style={modalStyle} className="max-w-5xl modal-box">
        <h3 className="mb-5 text-lg font-bold">Create Order</h3>
        <div className="flex flex-col">
          <div className="flex">
            <div className="mr-3">
              <div className="flex items-center w-auto max-w-xs py-2 flex-nowrap">
                <div className="w-40 mr-3 label">
                  <span className="block w-full font-sans text-lg font-bold text-right text-label">base address</span>
                </div>
                <select value={baseAddr} onChange={changeBaseAddr} className="select w-400 select-bordered">
                  <option disabled value="">
                    chose the base nft address
                  </option>
                  {ContractList.map((item) => (
                    <option value={item.address} key={item.key}>
                      {item.address}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex-shrink-0">
              <div className="flex items-center w-auto max-w-xs py-2 flex-nowrap">
                <div className="flex-shrink-0 w-40 mr-3 text-right label">
                  <span className="block w-full font-sans text-lg font-bold text-label">base token id</span>
                </div>
                <input value={baseId} onChange={changeBaseId} type="text" placeholder="Type here" className="max-w-xs input input-bordered w-80" />
              </div>
            </div>
          </div>
          <div className="m-5 divider font-momo">TRANSITION TO</div>
          <div className="flex">
            <div className="mr-3">
              <div className="flex items-center w-auto max-w-xs py-2 flex-nowrap">
                <div className="w-40 mr-3 label">
                  <span className="block w-full font-sans text-lg font-bold text-right text-label">target address</span>
                </div>
                <select value={targetAddr} onChange={changeTargetAddr} className="select w-400 select-bordered">
                  <option disabled value="">
                    chose the target nft address
                  </option>
                  {ContractList.map((item) => (
                    <option value={item.address} key={item.key}>
                      {item.address}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex-shrink-0">
              <div className="flex items-center w-auto max-w-xs py-2 flex-nowrap">
                <div className="flex-shrink-0 w-40 mr-3 text-right label">
                  <span className="block w-full font-sans text-lg font-bold text-label">target token id</span>
                </div>
                <input value={targetId} onChange={changeTargetId} type="text" placeholder="Type here" className="max-w-xs input input-bordered w-80" />
              </div>
            </div>
          </div>
        </div>
        <div className="modal-action">
          <button onClick={closeMod} className="btn btn-outline">
            <div className="w-80">Cancel</div>
          </button>
          <button onClick={submit} className="btn btn-primary">
            <div className="w-80">OK</div>
          </button>
        </div>
      </div>
      </div>
  );
}
