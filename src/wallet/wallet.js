import Vue from 'vue';
import ERC721 from './VVMERC721.json';
import ERC1155 from './VVMToken1155.json';
import ExchangeV1 from './ExchangeV1.json';
import { ethers } from 'ethers';
import { Message } from 'element-ui';

export function getProvider() {
  let provider = new ethers.providers.Web3Provider(window.ethereum);
  return provider;
}

// 实例化合约721
export function Contracts721() {
  const provider = getProvider();
  // console.log(ERC721.address, ERC721.abi);
  const erc721 = new ethers.Contract(ERC721.address, ERC721.abi, provider.getSigner());
  return erc721;
}

// 实例化合约1155
export function Contracts1155() {
  const provider = getProvider();
  // console.log(ERC1155.address, ERC1155.abi);
  const erc1155 = new ethers.Contract(ERC1155.address, ERC1155.abi, provider.getSigner());
  return erc1155;
}

// 实例化交易合约
export function ContractExchange() {
  const provider = getProvider();
  // console.log(ExchangeV1.address, ExchangeV1.abi);
  const cont = new ethers.Contract(ExchangeV1.address, ExchangeV1.abi, provider.getSigner());
  return cont;
}

// 初始化ethers
export async function initWallet() {
  if (typeof window.ethereum === 'undefined') {
    // alert('您未安装BSC钱包！');
    Message.error('您未安装BSC钱包！');
    return '';
  }
  const accounts = await window.ethereum.request({
    method: 'eth_requestAccounts',
    jsonrpc: '2.0'
  });
  if (!accounts || accounts.length == 0) {
    // alert('您未解锁BSC钱包！');
    Message.error('您未解锁BSC钱包！');

    return '';
  }
  // console.log('eth_requestAccounts=>', accounts);
  Vue.prototype.$address = accounts[0];

  // console.log('networkVersion=>', window.ethereum.networkVersion);
  if (window.ethereum.networkVersion != 97) {
    // alert('请切换到BSCTestnet网络！');
    Message.error('请切换到BSCTestnet网络！');
    return '';
  }
  // if (ethereum.networkVersion != 56) {
  //     alert('请切换到BSCMainnet网络！');
  //     return '';
  // }
  sessionStorage.setItem("address", Vue.prototype.$address);
  return Vue.prototype.$address;
}

export async function getBalance() {
  const provider = getProvider();
  const balance = await provider.getBalance(provider.provider.selectedAddress);
  // console.log('balance=>', ethers.utils.formatEther(ethers.BigNumber.from(balance)));
  let amount = ethers.utils.formatEther(ethers.BigNumber.from(balance));
  sessionStorage.setItem("balance", Math.round(amount * 1e4) / 1e4);
  return Math.round(amount * 1e4) / 1e4;
}

export function randomHex(length) {
  const result = [];
  const characters = 'ABCDEFabcdef0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result.push(characters.charAt(Math.floor(Math.random() * charactersLength)));
  }
  return '0x' + result.join('');
}
