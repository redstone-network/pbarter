import React, { useState, useEffect } from 'react';
import { getNFTS, getSFTS } from '~/server';
import { NftIem } from '~/server/type';

export default function () {
  const [list, setList] = useState<NftIem[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const [nfts, sfts] = await Promise.all([getNFTS(), getSFTS()]);
      console.log(nfts, sfts);
      setList([...nfts, ...sfts]);
    };

    fetchData();
  }, []);
  return (
    <div className="font-mono">
      <div className="pb-4">
        <div className="text-2xl font-medium ">NFT List</div>
      </div>
      <div>
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th></th>
                <th>Type</th>
                <th>NFTId</th>
                <th>Name</th>
                <th>Slot</th>
                <th>symbol</th>
              </tr>
            </thead>
            <tbody>
              {list.map((row, index) => (
                <tr key={index}>
                  <th>{index + 1}</th>
                  <td>{row.type}</td>
                  <td>{row.id}</td>
                  <td>{row.name}</td>
                  <td>{row.slot}</td>
                  <td>{row.symbol}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
