// 交易
import $http from '../utils/request';

// order info
async function orderInfoApi(token_id, token, address) {
  const url = `https://api.lionnft.net/v1/order/info?token=${token}&token_id=${token_id}&address=${address}`;
  console.log(url);
  const resp = await $http.get(url);
  return resp;
}

// buy handler
async function buyApi(tx_id) {
  const formData = new FormData();
  formData.append('tx_id', tx_id);
  const resp = await $http.post("https://api.lionnft.net/v1/buy/tx_id", formData);
  return resp;
}

// buyer fee
async function getBuyerFeeApi(token_id, token) {
  const url = `https://api.lionnft.net/v1/chain/prepare/buyerfeemessage?token=${token}&token_id=${token_id}`;
  const resp = await $http.get(url);
  return resp;
}

// bid create
async function bidCreateApi(order) {
  const resp = await $http.post("https://api.lionnft.net/v1/item/bids/create", order);
  return resp;
}

// bid list
async function bidListApi(token, token_id, page) {
  const url = `https://api.lionnft.net/v1/item/bids/list?token=${token}&token_id=${token_id}&page=${page}`;
  const resp = await $http.get(url);
  return resp;
}

// bid order fee sign
async function bidOrderFeeApi(order) {
  const resp = await $http.post("https://api.lionnft.net/v1/chain/prepare/ordermessage", order);
  return resp;
}

// bid txid
async function bidTxidApi(tx_id) {
  const formData = new FormData();
  formData.append('tx_id', tx_id);
  const resp = await $http.post("https://api.lionnft.net/v1/bids/tx_id", formData);
  return resp;
}

export default {
  // order
  orderInfoApi,
  // buyApi
  buyApi,
  // buyer fee
  getBuyerFeeApi,

  // bid create
  bidCreateApi,
  // bid list
  bidListApi,
  // bid order fee sign
  bidOrderFeeApi,
  // bid txid
  bidTxidApi,
};
