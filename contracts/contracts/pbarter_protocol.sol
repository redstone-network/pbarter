//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@solvprotocol/erc-3525/ERC3525.sol";
// import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
// import "@openzeppelin/contracts/utils/Counters.sol";

contract Pbarter_Protocol { 

  // 合约拥有者
  address public contract_owner;

  // 存储定单详细信息
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

  // 订单编号 -> 订单
  mapping (uint256 => Order) order_map;

  // [订单编号]
  uint256[] orders;

  // 当前未完成的订单总数（游标）
  uint256 public unfinished_order_numbers;

  // 下一个订单编号
  uint256 public next_order_id;

  // 当前用户地址 -> [订单编号]
  mapping (address => uint256[]) owner_orders;

  
  constructor() {
    contract_owner = msg.sender;

    // 初始化和订单数量和订单号
    unfinished_order_numbers = 0;
    next_order_id = 0;
  }
  
  event OrderedSucess(address _from,uint256 order_id);
  event BoughtSuccess(address _from,address _destAddr,uint256 order_id);
  event WithDrawSuccess(address _from,address to,uint256 order_id);

  // 获取所有订单,未完成订单游标为 unfinished_order_numbers 
  // 即完成订单: [0:unfinished_order_numbers]
  function allOrders() public view returns (uint256[] memory)  {
    return orders;   
  }

  // 查看某个订单
  function getOrder(uint256 order_id) public view returns (Order memory) {
    return order_map[order_id];
  }

  function orderOwner(uint256 order_id) public view returns (address ) {
    return order_map[order_id].order_owner;
  }

  // 获取当前用户的所有订单
  function allOwnOrders() public view returns (uint256[] memory ){
        return owner_orders[msg.sender];
  }

  // 获取所有交易未完成的订单
  function unFinishedOrders() public view returns (uint256[] memory ){
        
        // 新建空数组
        uint256[] memory temp_orders = new uint256[](unfinished_order_numbers);

        // 复制所有未完成订单至空数组并返回
        for (uint64 i =0; i<unfinished_order_numbers; i++) 
        {
            temp_orders[i] = orders[i];
        }
        return temp_orders;
  }

  // 撤销订单
  function withDrawOrder(uint256 order_id)  public {

    // 确保订单所有权
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

      // 判断当前订单是否为最后一个未完成的订单

      if (order_id == orders[unfinished_order_numbers-1]) {
        
        // 只需更改订单状态，无需交换位置
        order_map[order_id].sell_status = false;

        // 未成交订单数减1
        unfinished_order_numbers --;
      } else {

        // 更改订单状态
      order_map[order_id].sell_status = false;

      // 更改订单位置,将当前订单替换为订单列表最后一个未成交订单
      orders[order_map[order_id].order_index] = orders[unfinished_order_numbers-1];
      
      // 更改当前定单到未成交订单队尾
      orders[unfinished_order_numbers-1] = order_id;

      // 未成交订单数减1
      unfinished_order_numbers --;

      } 
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
    

    if (unfinished_order_numbers == orders.length) {
      
      addOrder(order);

      //判断合约是否有转账权限
      require(address(this) == base_address.getApproved(base_nft_sfts[0]),
      "You are not allow to transfer current asset, please get appoved");
      
      base_address.transferFrom(msg.sender,address(this),base_nft_sfts[0]); 
      
    } else {

      // 装入map
      order_map[next_order_id] = order;

      // 换位置/增加订单
      orders.push(orders[unfinished_order_numbers]);
      // 替换
      orders[unfinished_order_numbers] = next_order_id;
      
      // 改变未完成订单的索引
      order_map[next_order_id].order_index = unfinished_order_numbers;

      // 改变已完成订单的索引
      order_map[orders[orders.length-1]].order_index = orders[orders.length-1];

      // 装入当前用户订单列表
      owner_orders[msg.sender].push(next_order_id);

      // order +1
      next_order_id ++;

      // 未完成订单 +1
      unfinished_order_numbers ++;

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
      unfinished_order_numbers ++;

  }

}

