import React, { useState, useEffect } from 'react';
import { getNFTS, getSFTS } from '~/server';
import { NftIem } from '~/server/type';
import EmptyIcon from '~/assets/empty.png';

export default function () {
  const [list, setList] = useState<NftIem[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      const [nfts, sfts] = await Promise.all([getNFTS(), getSFTS()]);
      setLoading(false);
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
      <div className="w-full">
        <div className="w-full overflow-x-auto">
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
    </div>
  );
}
