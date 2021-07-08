// erc721
// erc1155

import $http from '../utils/request';
import { ethers } from 'ethers';
import { defaultAbiCoder, ParamType } from '@ethersproject/abi';
import { keccak256 } from '@ethersproject/keccak256';

async function uploadJson(image, title, desc, props) {
  const json = {};
  json.name = title;
  json.description = desc;
  json.image = image;
  json.attributes = props;
  const blob = new Blob([JSON.stringify(json)], { type: 'application/json;charset=utf-8' });
  const formData = new FormData();
  formData.append('file', blob);
  const jsonResp = await $http.post("https://api.lionnft.io/v1/upload/file", formData);
  return jsonResp;
}

async function newTokenId(contract) {
  const formData = new FormData();
  formData.append('address', contract);
  const tokenResp = await $http.post("https://api.lionnft.io/v1/tokenid/new", formData);
  return tokenResp;
}

async function mintErc721(contract721, tokenid, signature, fees, uri) {
  console.log('mintErc721=>', tokenid, signature, fees, uri);
  const id = ethers.BigNumber.from(tokenid).toBigInt();
  console.log(id);
  const sign = ethers.utils.splitSignature(signature);
  const tx = await contract721.mint(id, sign.v, sign.r, sign.s, fees, uri);
  console.log('transaction=>', tx);
  const receipt = await tx.wait();
  console.log('receipt=>', receipt);
  return tx;
}

async function mintErc1155(contract1155, tokenid, signature, fees, supply, uri) {
  console.log('mintErc1155=>', tokenid, signature, fees, supply, uri);
  const id = ethers.BigNumber.from(tokenid).toBigInt();
  console.log(id);
  const sign = ethers.utils.splitSignature(signature);
  const supp = ethers.BigNumber.from(supply).toBigInt();
  const tx = await contract1155.mint(id, sign.v, sign.r, sign.s, fees, supp, uri);
  console.log('transaction=>', tx);
  const receipt = await tx.wait();
  console.log('receipt=>', receipt);
  return tx;
}

async function addItem(hash, assetType) {
  const resp = await $http.post("https://api.lionnft.io/v1/item/add", {
    tx_id: hash,
    // 721=4 1155=3
    asset_type: assetType
  });
  return resp;
}

// order sell
const AssetTypeComponents = [{
  name: 'token',
  type: 'address'
}, {
  name: 'tokenId',
  type: 'uint256'
}, {
  name: 'assetType',
  type: 'uint8'
}];

const OrderKeyComponents = [{
  name: 'owner',
  type: 'address'
}, {
  name: 'salt',
  type: 'uint256'
}, {
  components: AssetTypeComponents,
  name: 'sellAsset',
  type: 'tuple'
}, {
  components: AssetTypeComponents,
  name: 'buyAsset',
  type: 'tuple'
}];

const OrderComponents = [{
  name: 'key',
  type: 'tuple',
  components: OrderKeyComponents
}, {
  name: 'selling',
  type: 'uint256'
}, {
  name: 'buying',
  type: 'uint256'
}, {
  name: 'sellerFee',
  type: 'uint256'
}];

function toJson(order) {
  return {
    key: order.key,
    selling: order.selling,
    buying: order.buying,
    sellerFee: order.sellerFee
  };
}

function toKeccak256String(orderData) {
  const order = toJson(orderData);
  console.log('toJson.order=>', order);
  const orderParam = ParamType.fromObject({
    name: 'order',
    type: 'tuple',
    components: OrderComponents
  });
  console.log('toJson.orderParam=>', orderParam);

  return keccak256(defaultAbiCoder.encode([orderParam], [order])).slice(2);
}

async function orderSigner(signer, orderData) {
  console.log(orderData);
  const message = toKeccak256String(orderData);
  console.log('message=>', message);
  const signature = await signer.signMessage(message);
  console.log('signature=>', signature);
  return signature;
}

async function changeSale(token, token_id, sale) {
  const resp = await $http.post("https://api.lionnft.io/v1/item/sale", {
    token: token,
    token_id: token_id,
    sale: sale
  });
  return resp;
}

async function createOrder(order, signature) {
  const resp = await $http.post("https://api.lionnft.io/v1/order/create", {
    order: order,
    signature: signature
  });
  return resp;
}

function sequence(order) {
  return {
    key: {
      salt: order.key.salt.toString(),
      owner: order.key.owner,
      sellAsset: {
        token: order.key.sellAsset.token,
        tokenId: order.key.sellAsset.tokenId.toString(),
        assetType: order.key.sellAsset.assetType
      },
      buyAsset: {
        token: order.key.buyAsset.token,
        tokenId: order.key.buyAsset.tokenId.toString(),
        assetType: order.key.buyAsset.assetType
      }
    },
    selling: order.selling.toString(),
    buying: order.buying.toString(),
    sellerFee: order.sellerFee.toString()
  };
}


async function setApproveAll(contract, address) {
  console.log('approveAll', address, contract);
  const tx = await contract.setApprovalForAll('0x200e61C267f040c3e00fC86d1fe507247F1b1B26', true);
  console.log('transaction=>', tx);
  const receipt = await tx.wait();
  console.log('receipt=>', receipt);
  const res = await isApprovedAll(contract, address);
  return res;
}

async function isApprovedAll(contract, address) {
  const res = await contract.isApprovedForAll(address, '0x200e61C267f040c3e00fC86d1fe507247F1b1B26');
  console.log('isApprovedForAll=>', res);
  return res;
}

async function isWhitelist(contract, address) {
  const res = await contract.isWhitelist(address);
  return res;
}

export default {
  // mint
  uploadJson,
  newTokenId,
  mintErc721,
  mintErc1155,
  addItem,
  // order
  orderSigner,
  changeSale,
  createOrder,
  sequence,
  // approve
  setApproveAll,
  isApprovedAll,
  isWhitelist,
};
