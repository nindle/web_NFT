// 交易
import $http from '../utils/request';

// order info
async function orderInfoApi(token_id, token, address) {
    const url = `https://api.lionnft.io/v1/order/info?token=${token}&token_id=${token_id}&address=${address}`;
    console.log(url);
    const resp = await $http.get(url);
    return resp;
}

// buy handler
async function buyApi(tx_id) {
    const formData = new FormData();
    formData.append('tx_id', tx_id);
    const resp = await $http.post(`https://api.lionnft.io/v1/buy/tx_id`, formData);
    return resp;
}

// buyer fee
async function getBuyerFeeApi(token_id, token) {
    const url = `https://api.lionnft.io/v1/chain/prepare/buyerfeemessage?token=${token}&token_id=${token_id}`;
    const resp = await $http.get(url);
    return resp;
}

export default {
    // order
    orderInfoApi,
    // buyApi
    buyApi,
    // buyer fee
    getBuyerFeeApi,
};