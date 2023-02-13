//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@solvprotocol/erc-3525/ERC3525.sol";
// import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
// import "@openzeppelin/contracts/utils/Counters.sol";

contract Pbarter_Protocol { 

  //contract deployer
  address public contract_owner;

  // store detailed information of an order
  struct Order {
    ERC3525  base_address;
    ERC3525  target_address;
    uint256[] base_nfts;       
    uint256[] target_nfts;   
    uint256[] base_snfts;       
    uint256[] target_snfts; 
    address order_owner;
    uint256 order_index;
    bool  sell_status;
  }

  // record each order in a map
  mapping (uint256 => Order) order_map;

  // store all orders
  uint256[] orders;

  // current curser
  uint256 public current_order_number;

  // record next order id
  uint256 public next_order_id;

  // record all orders of one's address
  mapping (address => uint256[]) owner_orders;

  constructor() {
    contract_owner = msg.sender;
    current_order_number = 0;
    next_order_id = 0;
  }
  
  event OrderedSucess(address _from,uint256 order_id);
  event BoughtSuccess(address _from,address _destAddr,uint256 order_id);
  event WithDrawSuccess(address _from,address to,uint256 order_id);

  // 获取所有订单,未完成订单游标为 current_order_number 
  // 即完成订单: [0:current_order_number]
  function allOrders() public view returns (uint256[] memory)  {
    return orders;   
  }

  // 查看某个订单
  function orderStatus(uint256 order_id) public view returns (Order memory) {
    return order_map[order_id];
  }

  // 获取当前用户的所有订单
  function allOwnOrders() public view returns (uint256[] memory ){
        return owner_orders[msg.sender];
  }

  // 获取所有交易未完成的订单
  function unFinishedOrders() public view returns (uint256[] memory ){
        
        uint256[] memory temp_orders = new uint[](current_order_number);

        for (uint64 i =0; i<current_order_number; i++) 
        {
            temp_orders[i] = orders[i];
        }
        return temp_orders;
  }

  // 撤销订单
  function withDrawOrder(uint256 order_id)  public {

    // 确保所有权
    require(
            msg.sender == order_map[order_id].order_owner,
            "You are not owner of the current order"
        );

    // 确保订单在售
    require(
            true == order_map[order_id].sell_status,
            "The order has been sold or withdrawn "
        );

    // 更换订单位置
    swapOrder(order_id);

    order_map[order_id].base_address.transferFrom(address(this),msg.sender,order_map[order_id].base_nfts[0]);
    
    emit WithDrawSuccess(address(this),msg.sender,order_id);
  }

  // 直接购买
  function buy(uint256 order_id) public {

    // 确保订单在售
    require(
            true == order_map[order_id].sell_status,
            "The order has been sold or withdrawn "
        );

    // 确保当前用户持有订单目标资产
    require(
            msg.sender == order_map[order_id].target_address.ownerOf(order_map[order_id].target_nfts[0]),
            "The order has been sold or withdrawn "
        );

    // 判断当前合约是否有权限执行转账权限

    require(address(this) == order_map[order_id].target_address.getApproved(order_map[order_id].target_nfts[0]),"You are not allow to transfer current asset, please get appoved"); 
      // 更换订单位置
      swapOrder(order_id);

      // 转入
      order_map[order_id].base_address.transferFrom(address(this),msg.sender,order_map[order_id].base_nfts[0]);
  
      // 转出
      order_map[order_id].target_address.transferFrom(msg.sender,order_map[order_id].order_owner,order_map[order_id].target_nfts[0]);
    
      emit BoughtSuccess(msg.sender,order_map[order_id].order_owner,order_id);

  }

  function swapOrder(uint256 order_id) private {

        // 更改订单状态
      order_map[order_id].sell_status = false;

      // 更改订单位置,将当前订单替换为订单列表最后一个未成交订单
      orders[order_map[order_id].order_index] = orders[current_order_number-1];
      
      // 更改当前定单到未成交订单队尾
      orders[current_order_number-1] = order_id;

      // 未成交订单数减1
      current_order_number --;
      
  }

  // 拿结再确认
  function autoMatchOrder(uint256[] memory order_ids) public {
   
    //判断订单是否匹配
    order_map[order_ids[0]].base_address = order_map[order_ids[1]].target_address;
    order_map[order_ids[0]].base_nfts[0] = order_map[order_ids[1]].target_nfts[0];
    order_map[order_ids[0]].target_nfts[0] = order_map[order_ids[1]].base_nfts[0];


    // 更换订单位置
    swapOrder(order_ids[0]);
    swapOrder(order_ids[1]);

    // 转入
    order_map[order_ids[1]].base_address.transferFrom(address(this),order_map[order_ids[0]].order_owner,order_map[order_ids[1]].base_nfts[0]);

    // 转出
    order_map[order_ids[0]].base_address.transferFrom(address(this),order_map[order_ids[1]].order_owner,order_map[order_ids[0]].base_nfts[0]);
    
  }

  // 创建订单
  function createOrder(ERC3525 base_address,ERC3525 target_address,uint256[] memory base_nft_sfts,uint256[] memory target_nft_sfts) public {
    
     // 确保当前用户持有订单目标资产
    require(
            msg.sender == base_address.ownerOf(base_nft_sfts[0]),
            "You are not owner of current asset"
        );

    Order memory order;
  
    order.base_address = base_address;
    order.target_address = target_address;
    order.base_nfts = base_nft_sfts;
    order.target_nfts = target_nft_sfts;
    order.order_owner = msg.sender;
    order.order_index = next_order_id;
    order.sell_status = true;
    

    if (current_order_number == orders.length) {
      
      addOrder(order);

      //判断合约是否有转账权限
      require(address(this) == base_address.getApproved(base_nft_sfts[0]),
      "You are not allow to transfer current asset, please get appoved");
      
      base_address.transferFrom(msg.sender,address(this),base_nft_sfts[0]); 
      
    } else {

      // 装入map
      order_map[next_order_id] = order;

      // 换位置/增加订单
      orders.push(orders[current_order_number]);
      // 替换
      orders[current_order_number] = next_order_id;
      
      // 改变未完成订单的索引
      order_map[next_order_id].order_index = current_order_number;

      // 改变已完成订单的索引
      order_map[orders[orders.length-1]].order_index = orders[orders.length-1];

      // 装入当前用户订单列表
      owner_orders[msg.sender].push(next_order_id);

      // order +1
      next_order_id ++;

      // 未完成订单 +1
      current_order_number ++;

      //判断合约是否有转账权限
      require(
            address(this) == base_address.getApproved(base_nft_sfts[0]),
            "You are not allow to transfer current asset, please get appoved"
      );
      
      base_address.transferFrom(msg.sender,address(this),base_nft_sfts[0]);

    }

  }

  function addOrder(Order memory new_order) private {

  // 装入数组
      orders.push(next_order_id);

      // 装入map
      order_map[next_order_id] = new_order;

      // 装入当前用户订单列表
      owner_orders[msg.sender].push(next_order_id);
      
      // order +1
      next_order_id ++;

      // 未完成订单 +1
      current_order_number ++;

  }

}

