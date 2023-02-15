// 1.createOrder
const createOrder = async (
  base_address: string,
  target_address: string,
  base_nft_snfts: number[],
  target_nft_snfts: number[]
) => {
  // 执行合约交易
  try {
    await pbarter_protocol.methods
      .createOrder(base_address, target_address, base_nft_snfts, target_nft_snfts)
      .send({
        from: current_account[0],
      })
      .then(function (receipt: any) {
        console.log('create order receipt:', receipt);
        if (receipt.status) {
          window.confirm('create order success!');
        }
      });
  } catch (err: any) {
    // setError(err.message);
    console.log('create order failed:', err);
  }
};

let a: number[] = [2];
const b: number[] = [0];

// createOrder(SFTS_Address, NFTS_Address, a, b);

// 2.取消订单
const withDrawOrder = async (order_id: number) => {
  // 执行合约交易
  try {
    await pbarter_protocol.methods
      .withDrawOrder(order_id)
      .send({
        from: current_account[0],
      })
      .then(function (receipt: any) {
        console.log('withdraw order receipt:', receipt);
        if (receipt.status) {
          window.confirm('withdraw order success!');
        }
      });
  } catch (err: any) {
    // setError(err.message);
    console.log('withdraw order failed:', err);
  }
};

// 3.buy
const buy = async (order_id: number) => {
  // 执行合约交易
  try {
    await pbarter_protocol.methods
      .buy(order_id)
      .send({
        from: current_account[0],
      })
      .then(function (receipt: any) {
        console.log('buy order receipt:', receipt);
        if (receipt.status) {
          window.confirm('buy order success!');
        }
      });
  } catch (err: any) {
    // setError(err.message);
    console.log('buy order failed:', err);
  }
};

// 4. autoMatchOrder
const autoMatchOrder = async (order_ids: [number]) => {
  // 执行合约交易
  try {
    await pbarter_protocol.methods
      .autoMatchOrder(order_ids)
      .send({
        from: current_account[0],
      })
      .then(function (receipt: any) {
        console.log('auto match order receipt:', receipt);
        if (receipt.status) {
          window.confirm('auto match order  success!');
        }
      });
  } catch (err: any) {
    // setError(err.message);
    console.log('auto match order  failed:', err);
  }
};