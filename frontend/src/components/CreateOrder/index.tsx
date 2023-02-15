type AppProps = {
  show: boolean;
  close: () => void;
};
export default function ({ show, close }: AppProps) {
  const modalStyle = {
    maxWidth: 'none',
    width: '1080px',
    height: '620px',
  };
  return (
    <div onClick={close} className={show ? 'modal modal-open' : 'modal'}>
      <div onClick={(e) => e.stopPropagation()} style={modalStyle} className="max-w-5xl modal-box">
        <h3 className="mb-5 text-lg font-bold">Create Order</h3>
        <div className="flex flex-col">
          <div className="flex">
            <div className="mr-3">
              <div className="flex items-center w-auto max-w-xs py-2 flex-nowrap">
                <div className="w-40 mr-3 label">
                  <span className="block w-full font-sans text-lg font-bold text-right text-label">base 721 id</span>
                </div>
                <select className="select w-80 select-bordered">
                  <option disabled selected>
                    Pick one
                  </option>
                  <option>Star Wars</option>
                  <option>Harry Potter</option>
                  <option>Lord of the Rings</option>
                  <option>Planet of the Apes</option>
                  <option>Star Trek</option>
                </select>
              </div>
            </div>
            <div className="flex-shrink-0">
              <div className="flex items-center w-auto max-w-xs py-2 flex-nowrap">
                <div className="flex-shrink-0 w-40 mr-3 text-right label">
                  <span className="block w-full font-sans text-lg font-bold text-label">base 3525 id</span>
                </div>
                <input type="text" placeholder="Type here" className="max-w-xs input input-bordered w-80" />
              </div>
              <div className="flex items-center w-auto max-w-xs py-2 flex-nowrap">
                <div className="flex-shrink-0 w-40 mr-3 text-right label">
                  <span className="block w-full font-sans text-lg font-bold text-label">base 3525 id</span>
                </div>
                <input type="text" placeholder="Type here" className="max-w-xs input input-bordered w-80" />
              </div>
              <div className="flex items-center w-auto max-w-xs py-2 flex-nowrap">
                <div className="flex-shrink-0 w-40 mr-3 text-right label">
                  <span className="block w-full font-sans text-lg font-bold text-label">base 3525 id</span>
                </div>
                <input type="text" placeholder="Type here" className="max-w-xs input input-bordered w-80" />
              </div>
            </div>
          </div>
          <div className="divider">TRANSITION</div>
          <div className="flex">
            <div className="mr-3">
              <div className="flex items-center w-auto max-w-xs py-2 flex-nowrap">
                <div className="w-40 mr-3 label">
                  <span className="block w-full font-sans text-lg font-bold text-right text-label">base 721 id</span>
                </div>
                <select className="select w-80 select-bordered">
                  <option disabled selected>
                    Pick one
                  </option>
                  <option>Star Wars</option>
                  <option>Harry Potter</option>
                  <option>Lord of the Rings</option>
                  <option>Planet of the Apes</option>
                  <option>Star Trek</option>
                </select>
              </div>
            </div>
            <div className="flex-shrink-0">
              <div className="flex items-center w-auto max-w-xs py-2 flex-nowrap">
                <div className="flex-shrink-0 w-40 mr-3 text-right label">
                  <span className="block w-full font-sans text-lg font-bold text-label">base 3525 id</span>
                </div>
                <input type="text" placeholder="Type here" className="max-w-xs input input-bordered w-80" />
              </div>
              <div className="flex items-center w-auto max-w-xs py-2 flex-nowrap">
                <div className="flex-shrink-0 w-40 mr-3 text-right label">
                  <span className="block w-full font-sans text-lg font-bold text-label">base 3525 id</span>
                </div>
                <input type="text" placeholder="Type here" className="max-w-xs input input-bordered w-80" />
              </div>
              <div className="flex items-center w-auto max-w-xs py-2 flex-nowrap">
                <div className="flex-shrink-0 w-40 mr-3 text-right label">
                  <span className="block w-full font-sans text-lg font-bold text-label">base 3525 id</span>
                </div>
                <input type="text" placeholder="Type here" className="max-w-xs input input-bordered w-80" />
              </div>
            </div>
          </div>
        </div>
        <div className="modal-action">
        <button className="btn btn-outline">
            <div className="w-80">Cancle</div>
          </button>
          <button className="btn btn-primary">
            <div className="w-80">OK</div>
          </button>
        </div>
      </div>
    </div>
  );
}
