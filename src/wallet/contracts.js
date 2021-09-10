// erc721
// erc1155

import $http from "../utils/request";
import { ethers } from "ethers";
import { defaultAbiCoder, ParamType } from "@ethersproject/abi";
import { keccak256 } from "@ethersproject/keccak256";

const TransferProxyAddr =
  process.env.NODE_ENV === "production"
    ? "0x1ff9d91B940d552acE0f1a7A6e3c1c04b87B725d"
    : "0x200e61C267f040c3e00fC86d1fe507247F1b1B26";

async function Sgfitem(
  address,
  tokenid,
  meta_name,
  meta_field1,
  meta_field2,
  meta_field3,
  meta_field4
) {
  const json = {};
  json.address = address;
  json.tokenid = tokenid;
  json.meta_name = meta_name;
  json.meta_field1 = meta_field1;
  json.meta_field2 = meta_field2;
  json.meta_field3 = meta_field3;
  json.meta_field4 = meta_field4;

  const jsonResp = await $http.post("/v1/item/metadata", json);
  return jsonResp;
}

async function uploadJson(image, title, desc, props) {
  const json = {};
  json.name = title;
  json.description = desc;
  json.image = image;
  json.attributes = props;
  const blob = new Blob([JSON.stringify(json)], {
    type: "application/json;charset=utf-8"
  });
  const formData = new FormData();
  formData.append("file", blob);
  const jsonResp = await $http.post("/v1/upload/file", formData);
  return jsonResp;
}

async function newTokenId(contract) {
  const formData = new FormData();
  formData.append("address", contract);
  const tokenResp = await $http.post("/v1/tokenid/new", formData);
  return tokenResp;
}

async function newTokenIdV1(contract) {
  const formData = new FormData();
  formData.append("address", contract);
  const tokenResp = await $http.post("/v1/tokenid/newv1", formData);
  return tokenResp;
}

async function mintErc721(contract721, tokenid, signature, fees, uri) {
  console.log("mintErc721=>", tokenid, signature, fees, uri);
  const id = ethers.BigNumber.from(tokenid).toBigInt();
  console.log(id);
  const sign = ethers.utils.splitSignature(signature);
  const tx = await contract721.mint(id, sign.v, sign.r, sign.s, fees, uri);
  console.log("transaction=>", tx);
  const receipt = await tx.wait();
  console.log("receipt=>", receipt);
  return tx;
}

//地书方法
async function MetawordsErc721V1(contract721, tokenid, signature, fees, uri) {
  console.log("MetawordsErc721V1=>", tokenid, signature, fees, uri);
  const id = ethers.BigNumber.from(tokenid).toBigInt();
  console.log(id);
  const sign = ethers.utils.splitSignature(signature);
  const tx = await contract721.mint(id, 1, sign.v, sign.r, sign.s, [], uri);
  console.log("transaction=>", tx);
  const receipt = await tx.wait();
  console.log("receipt=>", receipt);
  return tx;
}

async function mintErc1155(
  contract1155,
  tokenid,
  signature,
  fees,
  supply,
  uri
) {
  console.log("mintErc1155=>", tokenid, signature, fees, supply, uri);
  const id = ethers.BigNumber.from(tokenid).toBigInt();
  console.log(id);
  const sign = ethers.utils.splitSignature(signature);
  const supp = ethers.BigNumber.from(supply).toBigInt();
  const tx = await contract1155.mint(
    id,
    sign.v,
    sign.r,
    sign.s,
    fees,
    supp,
    uri
  );
  console.log("transaction=>", tx);
  const receipt = await tx.wait();
  console.log("receipt=>", receipt);
  return tx;
}

async function addItem(hash, assetType) {
  const resp = await $http.post("/v1/item/add", {
    tx_id: hash,
    // 721=4 1155=3
    asset_type: assetType
  });
  return resp;
}

async function addItemV1(hash, assetType, cont_address) {
  const resp = await $http.post("/v1/item/add", {
    tx_id: hash,
    // 721=4 1155=3
    asset_type: assetType,
    cont_address: cont_address
  });
  return resp;
}

// order sell
const AssetTypeComponents = [
  {
    name: "token",
    type: "address"
  },
  {
    name: "tokenId",
    type: "uint256"
  },
  {
    name: "assetType",
    type: "uint8"
  }
];

const OrderKeyComponents = [
  {
    name: "owner",
    type: "address"
  },
  {
    name: "salt",
    type: "uint256"
  },
  {
    components: AssetTypeComponents,
    name: "sellAsset",
    type: "tuple"
  },
  {
    components: AssetTypeComponents,
    name: "buyAsset",
    type: "tuple"
  }
];

const OrderComponents = [
  {
    name: "key",
    type: "tuple",
    components: OrderKeyComponents
  },
  {
    name: "selling",
    type: "uint256"
  },
  {
    name: "buying",
    type: "uint256"
  },
  {
    name: "sellerFee",
    type: "uint256"
  }
];

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
  console.log("toJson.order=>", order);
  const orderParam = ParamType.fromObject({
    name: "order",
    type: "tuple",
    components: OrderComponents
  });
  console.log("toJson.orderParam=>", orderParam);

  return keccak256(defaultAbiCoder.encode([orderParam], [order])).slice(2);
}

async function orderSigner(signer, orderData) {
  console.log(orderData);
  const message = toKeccak256String(orderData);
  console.log("message=>", message);
  const signature = await signer.signMessage(message);
  console.log("signature=>", signature);
  return signature;
}

async function changeSale(token, token_id, sale) {
  const resp = await $http.post("/v1/item/sale", {
    token: token,
    token_id: token_id,
    sale: sale
  });
  return resp;
}

async function createOrder(order, signature) {
  const resp = await $http.post("/v1/order/create", {
    order: order,
    signature: signature
  });
  return resp;
}

async function createOrderV1(order, signature, kind, cate_id) {
  const resp = await $http.post("/v1/order/createV1", {
    order: order,
    signature: signature,
    kind: kind,
    cate_id: cate_id
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
  console.log("approveAll", address, contract);
  const tx = await contract.setApprovalForAll(TransferProxyAddr, true);
  console.log("transaction=>", tx);
  const receipt = await tx.wait();
  console.log("receipt=>", receipt);
  const res = await isApprovedAll(contract, address);
  return res;
}

async function isApprovedAll(contract, address) {
  const res = await contract.isApprovedForAll(address, TransferProxyAddr);
  console.log("isApprovedForAll=>", res);
  return res;
}

async function isWhitelist(contract, address) {
  const res = await contract.isWhitelist(address);
  return res;
}

export default {
  // mint
  uploadJson,
  Sgfitem,
  newTokenId,
  newTokenIdV1,
  mintErc721,
  mintErc1155,
  MetawordsErc721V1,
  addItem,
  addItemV1,
  // order
  orderSigner,
  changeSale,
  createOrder,
  createOrderV1,
  sequence,
  // approve
  setApproveAll,
  isApprovedAll,
  isWhitelist
};
