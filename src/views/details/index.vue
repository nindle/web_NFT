<template>
  <div id="detailsid" v-loading="loading" class="details">
    <!-- 商品大图zs -->
    <img
      id="imgShows"
      :src="details.prop_image"
      style="border-radius: 20px"
      alt=""
      @error="setDefaultImage"
    />
    <div id="clearid" class="clear" />
    <!-- 产品详情 -->
    <ul class="details-a">
      <li class="productTitle">
        {{ details.prop_name }}
      </li>
      <li class="attestation">{{ $t("details.approve") }}</li>
      <li>
        <span class="browse">{{ $t("details.Owned") }}</span>
        <span style="color: #0066ed; margin: 0 13px 0 -12px">
          {{ details.creator_user_name }}
        </span>
        <span class="browse">
          {{ details.supply_sell }} of {{ details.supply }}
          {{ $t("details.available") }}
        </span>
        <span class="browse" style="position: relative; margin-left: 20px">
          <img id="examines" src="../../assets/examine.png" alt="" />
          2212
          <!-- <div class="clear"></div> -->
        </span>
        <span class="browse" style="position: relative; margin-left: 20px">
          <img id="examine" src="../../assets/souchang.png" alt="" />
          2122
        </span>
      </li>
      <li class="price">
        <img
          src="../../assets/price.png"
          style="width: 47px; height: 47px; margin: 5px 15px 0 0"
          alt=""
        />
        {{ details.price }} {{ details.coin_name }}
      </li>
      <!-- 下架 -->
      <li v-if="details.saleable == 0">
        <el-button class="details-button" type="primary" :disabled="true">{{
          $t("details.UnSale")
        }}</el-button>
      </li>
      <!-- 限价模式 -->
      <li
        v-else-if="details.saleable == 1 && details.price && details.price > 0"
      >
        <div>
          <el-button
            class="details-button"
            type="primary"
            :disabled="buyisApproved == true"
            @click="buyApprove"
          >
            {{
              buyisApproved ? $t("details.Approved") : $t("details.approvedNoW")
            }}
          </el-button>
        </div>
        <el-button
          class="details-button"
          type="primary"
          :disabled="buyisApproved == false || buyLoading == true"
          @click="onBuy"
        >
          {{ buyLoading ? $t("details.Buying") : $t("details.BuyNow") }}
        </el-button>
      </li>
      <!-- 竞拍模式 -->
      <li v-else-if="details.saleable == 1 && details.price == 0">
        <div>
          <el-input
            v-model="bid_price"
            type="text"
            placeholder="竞拍价格(WBNB)"
          />
        </div>
        <div>余额 {{ wbnb_balance }} WBNB</div>
        <div>
          <el-button
            class="danger-button"
            type="danger"
            :disabled="isApproved == true"
            @click="bidApprove"
          >
            {{
              isApproved ? $t("details.Approved") : $t("details.approvedNoW")
            }}
          </el-button>
        </div>
        <el-button
          class="danger-button"
          type="danger"
          :disabled="isApproved == false || bidLoading == true"
          @click="onBid"
        >
          {{ bidLoading ? $t("details.Biding") : $t("details.BidNow") }}
        </el-button>
      </li>

      <li v-for="(v, k) in bid_list" :key="k">
        <div class="productdetails">
          <div style="width: 100%">
            <img
              :src="v.bid_user_cover"
              style="margin: 10px 15px 0 0; cursor: pointer"
              alt=""
              @click="
                $router.push({
                  name: 'personalCenter',
                  params: { address: str },
                })
              "
            />
          </div>

          <div class="clear" />
          <div
            class="productdetails-a"
            style="position: absolute; left: 65px; top: 0px"
          >
            <p
              style="
                font-size: 12px;
                font-family: Source Han Sans CN;
                font-weight: 400;
                color: #aaaaaa;
              "
            >
              bider
            </p>
            <div
              style="
                display: flex;
                justify-content: space-between;
                width: 439px;
              "
            >
              <span
                style="
                  color: #0066ed;
                  font-size: 14px;
                  font-family: Source Han Sans CN;
                  font-weight: 400;
                "
              >
                {{ SubStr(v.bid_user_address) }}
              </span>
              <span style="padding: 0 10px 0 80px">
                {{ v.bid_price | feth }} WBNB
              </span>
              <span style="margin: 0 30px 0 10px">
                {{
                  v.bid_result == 0
                    ? "竞拍中"
                    : v.bid_result == 1
                    ? "竞拍成功"
                    : "竞拍失败"
                }}
              </span>
              <el-button
                v-if="v.bid_result == 0"
                type="danger"
                size="small"
                style="float: right"
                :disabled="bidLoading == true"
                @click="bidAccept(v.bid_id)"
              >
                Accept
              </el-button>
            </div>
          </div>
        </div>
      </li>

      <hr style="border: 1px solid #eeeeee; margin: 24px 0" />
      <li>
        <div class="productdetails">
          <div style="width: 100%">
            <img
              :src="creator_pic"
              style="margin: 10px 15px 0 0; cursor: pointer"
              alt=""
              @click="
                $router.push({
                  name: 'personalCenter',
                  params: { address: str },
                })
              "
            />
          </div>

          <div class="clear" />
          <div
            class="productdetails-a"
            style="position: absolute; left: 65px; top: 0px"
          >
            <p
              style="
                font-size: 12px;
                font-family: Source Han Sans CN;
                font-weight: 400;
                color: #aaaaaa;
              "
            >
              {{ $t("details.creator") }}
            </p>
            <span
              style="
                font-size: 14px;
                font-family: Source Han Sans CN;
                font-weight: 400;
                color: #000000;
              "
            >
              {{ details.creator_user_name }} /
            </span>
            <span
              style="
                color: #0066ed;
                font-size: 14px;
                font-family: Source Han Sans CN;
                font-weight: 400;
              "
            >
              {{ creator }}
            </span>
            <img
              id="replicator"
              src="../../assets/replicator.png"
              alt=""
              style="cursor: pointer"
              @click="copyText(1)"
            />
          </div>
        </div>
      </li>
      <li>
        <div class="productdetails">
          <div style="width: 100%">
            <img
              :src="own_user_pic"
              style="margin: 10px 15px 0 0; cursor: pointer"
              alt=""
              @click="
                $router.push({
                  name: 'personalCenter',
                  params: { address: strs },
                })
              "
            />
          </div>
          <div class="clear" />
          <div
            class="productdetails-a"
            style="position: absolute; left: 65px; top: 0px"
          >
            <p
              style="
                font-size: 12px;
                font-family: Source Han Sans CN;
                font-weight: 400;
                color: #aaaaaa;
              "
            >
              {{ $t("details.own") }}
            </p>
            <span
              style="
                font-size: 14px;
                font-family: Source Han Sans CN;
                font-weight: 400;
                color: #000000;
              "
            >
              {{ details.own_user_name }} /
            </span>
            <span
              style="
                color: #0066ed;
                font-size: 14px;
                font-family: Source Han Sans CN;
                font-weight: 400;
              "
            >
              {{ creator_address }}
            </span>
            <img
              id="replicator"
              src="../../assets/replicator.png"
              alt=""
              style="cursor: pointer"
              @click="copyText(2)"
            />
          </div>
        </div>
      </li>
      <hr style="border: 1px solid #eeeeee; margin: 24px 0" />
      <li
        style="
          font-size: 15px;
          font-family: Source Han Sans CN;
          font-weight: bold;
          color: #313131;
        "
      >
        {{ $t("details.Transaction") }}
      </li>
      <li>
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="user_name" :label="$t('details.user')" />
          <el-table-column prop="ord_cate" :label="$t('details.perating')" />
          <el-table-column prop="ord_time" :label="$t('details.time')" />
        </el-table>
      </li>
    </ul>
    <el-tabs v-model="activeName">
      <el-tab-pane :label="$t('details.product')" name="first">
        {{ details.prop_desc }}
      </el-tab-pane>
      <el-tab-pane :label="$t('details.About')" name="second">
        The full name of NFT is non-Fungible Token, which is a non-homogeneous
        Token. It is the only cryptocurrency Token used to represent digital
        assets, and has the characteristics of indivisible, irreplaceable and
        unique. On the blockchain, digital cryptocurrencies are divided into two
        categories: coinage and token. Native currencies, such as Bitcoin and
        Ethereum, have their own main chain and use transactions on the chain to
        maintain ledger data. Tokens are ledger records that are tied to
        existing blockchains using smart contracts, such as tokens issued on
        Ethereum. Token can be divided into two kinds of homogenization and
        non-homogenization. The homogeneous Token is FT (Fungible Token), which
        can be substituted with each other and can be split infinitely. For
        example, if you have a bitcoin in your hand and I have a bitcoin in my
        hand, there is essentially no difference, this is homogenization, this
        is homogenized currency.
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import loadScript from "load-script";
import $http from "../../utils/request";
import { ethers } from "ethers";
import imgUrl from "../../assets/xiaohuli.png";
import exchange from "../../wallet/exchange";
import {
  initWallet,
  ContractExchange,
  randomHex,
  getBalance,
  getProvider,
  Erc20Balance,
  Erc20IsApproved,
  Erc20Approve,
  erc20TranProxyAddr,
  wbnbAddr,
  Contracts721,
  Contracts1155,
} from "../../wallet/wallet";
import { BigNumber } from "@ethersproject/bignumber";
import contracts from "../../wallet/contracts";
import { userInfoApi } from "../../api/user";
let currCont = null;
let addr = "";

export default {
  name: "Details",
  props: {},
  data() {
    return {
      creator_pic: "",
      own_user_pic: "",
      loading: true,
      details: {
        saleable: 0,
      },
      activeName: "first",
      tableData: [],
      token_id: this.$route.params.id,
      token: this.$route.params.token,
      str: "",
      strs: "",
      creator: "",
      creator_address: "",
      creator_addr: "",
      owner_addr: "",
      order: {},
      fee: {},
      buyLoading: false,
      buyErr: false,
      bid_price: "",
      bid_list: [],
      bidLoading: false,
      bidErr: false,
      wbnb_balance: 0,
      isApproved: false,
      buyisApproved: false,
    };
  },
  created() {},
  async mounted() {
    this.getDetails();
    this.getRecord();
    // 竞拍列表
    const bid_resp = await exchange.bidListApi(this.token, this.token_id, 1);
    console.log(bid_resp);
    if (bid_resp.code == 200) {
      let _bid_list = bid_resp.list;
      for (let k in _bid_list) {
        console.log(_bid_list[k]);
        if (!_bid_list[k].bid_user_cover || _bid_list[k].bid_user_cover == "") {
          _bid_list[k].bid_user_cover = require("../../assets/touxiang.png");
        } else {
          _bid_list[k].bid_user_cover = this.$Cover(
            _bid_list[k].bid_user_cover
          );
        }
      }
      this.bid_list = _bid_list;
    }

    // wbnb余额
    if (sessionStorage.getItem("address") == null) {
      this.open();
    } else {
      const account = await initWallet();
      const erc20_balance = await Erc20Balance(account);
      console.log("wbnb_balance", this.$formatEther(erc20_balance.toString()));
      this.wbnb_balance = this.$formatEther(erc20_balance.toString());
      const isApproved = await Erc20IsApproved(account, erc20TranProxyAddr);
      console.log("isApproved", isApproved);
      this.isApproved = isApproved;
    }
    // approve
  },
  methods: {
    async buyApprove() {
      let currCont = null;
      // buy approve
      if (this.details.asset_id == 4) {
        // 721
        currCont = Contracts721();
      } else if (this.details.asset_id == 3) {
        // 1155
        currCont = Contracts1155();
      }
      if (currCont) {
        const res = await contracts.setApproveAll(currCont, this.$address);
        if (res == true) {
          this.buyisApproved = res;
        }
      }
    },
    open() {
      this.$alert(
        `<img src="${imgUrl}" style="width: 137px;height: 137px;" alt= "">`,
        "Please connect the wallet",
        {
          confirmButtonText: "Connecting Wallet",
          center: true,
          dangerouslyUseHTMLString: true,
          confirmButtonClass: "btnstyle",
        }
      ).then(async () => {
        const address = await initWallet();
        if (address != "") {
          this.success = 200;
          this.addres = address;
          this.address = this.SubStr(address);
          sessionStorage.setItem("showAddress", this.address);
          this.balance = await getBalance();
          const { data: data } = await userInfoApi(address);
          this.userInfo = data;
          location.reload();
        }
      });
    },

    SubStr(str) {
      var subStr1 = str.slice(0, 7);
      var subStr2 = str.slice(str.length - 5, 42);
      var subStr = subStr1 + "..." + subStr2;
      return subStr;
    },

    initSgf() {
      loadScript(
        "https://lionnft.io/123.js",
        {
          async: false,
        },
        function (err, script) {
          if (err) {
          } else {
            // document.getElementById("d1NavigationDiv").style.display = "none";
            document.getElementById("d1VersionDiv").style.display = "none";
          }
        }
      );
    },

    setDefaultImage() {
      console.log(1);
      document.getElementById("imgShows").style.display = "none";
      const divhe = document.createElement("div");
      divhe.id = "divhe";
      divhe.style = " width: 612px;height: 782px;";

      window.document.body.children[2].children[1].insertBefore(divhe, clearid);
      if (this.details.prop_image == "") {
        console.log(123);
      } else {
        sessionStorage.setItem("SgfUrl", this.$Cover(this.details.prop_image));
      }
      this.initSgf();
    },

    copyText(id) {
      var input = document.createElement("input"); // js创建一个input输入框
      if (id == 1) {
        input.value = this.str;
      } else {
        input.value = this.strs;
      }
      // 将需要复制的文本赋值到创建的input输入框中
      document.body.appendChild(input); // 将输入框暂时创建到实例里面
      input.select(); // 选中输入框中的内容
      document.execCommand("Copy"); // 执行复制操作
      document.body.removeChild(input); // 最后删除实例中临时创建的input输入框，完成复制操作
      this.$message({
        message: "复制成功",
        type: "success",
      });
    },

    async getRecord() {
      const resp = await $http.get(
        `/v1/order/history?token=${this.token}&token_id=${this.token_id}&page=1`
      );
      // console.log(resp.list);
      this.tableData = resp.list;
      this.tableData.forEach((item) => {
        item.ord_time = this.$dayjs(item.ord_time).format(
          "YYYY-MM-DD HH:mm:ss"
        );
      });
    },

    async getDetails() {
      const resp = await $http.get(
        `/v1/item/info?token=${this.token}&token_id=${this.token_id}`
      );
      // eslint-disable-next-line no-empty
      // console.log(resp);
      if (resp.code !== 200) {
      } else {
        this.loading = false;
      }
      this.details = resp.data;
      this.details.prop_image = this.$Cover(this.details.prop_image);
      // 设置创建者默认头像
      if (this.details.creator_pic == "") {
        this.creator_pic = require("../../assets/touxiang.png");
      } else if (this.details.creator_pic == null) {
        this.creator_pic = require("../../assets/touxiang.png");
      } else {
        this.creator_pic = this.$Cover(this.details.creator_pic);
      }
      // 设置所有者默认头像
      if (this.details.own_user_pic == "") {
        this.own_user_pic = require("../../assets/touxiang.png");
      } else if (this.details.own_user_pic == null) {
        this.own_user_pic = require("../../assets/touxiang.png");
      } else {
        this.own_user_pic = this.$Cover(this.details.own_user_pic);
      }
      this.details.price = ethers.utils.formatUnits(this.details.price);
      this.str = this.details.creator_address;
      this.strs = this.details.own_address;
      this.creator = this.SubStr(this.str);
      this.creator_address = this.SubStr(this.strs);
      this.creator_addr = this.details.creator_address;
      this.owner_addr = this.details.own_address;

      // buy approve
      if (resp.data.saleable == 1 && resp.data.price && resp.data.price > 0) {
        if (resp.data.asset_id == 4) {
          // 721
          const cont721 = Contracts721();
          const res = await contracts.isApprovedAll(cont721, this.$address);
          console.log("721 buy-isApprovedAll", res);
          this.buyisApproved = res;
        } else if (resp.data.asset_id == 3) {
          // 1155
          const cont1155 = Contracts1155();
          const res = await contracts.isApprovedAll(cont1155, this.$address);
          console.log("1155 buy-isApprovedAll", res);
          this.buyisApproved = res;
        }
      }

      this.orderInfo();
      this.buyFee();
    },

    // 订单信息
    async orderInfo() {
      const resp = await exchange.orderInfoApi(
        this.token_id,
        this.token,
        this.creator_addr
      );

      this.order = resp.data.ord_data;
    },
    // 交易手续费
    async buyFee() {
      const resp = await exchange.getBuyerFeeApi(this.token_id, this.token);
      this.fee = resp;
    },
    // 购买
    async onBuy() {
      const address = await initWallet();
      if (address != "") {
        addr = address;
        currCont = ContractExchange();
      }
      this.loading = true;

      this.buyLoading = true;
      let _order = JSON.parse(JSON.stringify(this.order.order));
      console.log(_order);
      const order2 = {
        key: {
          salt: BigNumber.from(_order.key.salt),
          owner: _order.key.owner,
          sellAsset: {
            token: _order.key.sellAsset.token,
            tokenId: BigNumber.from(_order.key.sellAsset.tokenId),
            assetType: _order.key.sellAsset.assetType,
          },
          buyAsset: {
            token: _order.key.buyAsset.token,
            tokenId: BigNumber.from(_order.key.buyAsset.tokenId),
            assetType: _order.key.buyAsset.assetType,
          },
        },
        selling: BigNumber.from(_order.selling),
        buying: BigNumber.from(_order.buying),
        sellerFee: BigNumber.from(_order.sellerFee),
      };
      // console.log(order2);

      // console.log(this.order.signature);
      // console.log(this.fee.buyFee);
      // console.log(this.fee.buyFeeSignature);
      // console.log(this.owner_addr);

      const sign = ethers.utils.splitSignature(this.order.signature);
      const feeSign = ethers.utils.splitSignature(this.fee.buyFeeSignature);

      const amount = BigNumber.from(1);
      const paying = order2.buying
        .mul(amount)
        .div(order2.selling)
        .mul(BigNumber.from(10000).add(BigNumber.from(this.fee.buyFee)))
        .div(BigNumber.from(10000));

      let tx = null;
      try {
        tx = await currCont.exchange(
          order2,
          { v: sign.v, r: sign.r, s: sign.s },
          BigNumber.from(this.fee.buyFee),
          { v: feeSign.v, r: feeSign.r, s: feeSign.s },
          amount,
          addr,
          { value: paying }
        );
        console.log(tx);
      } catch (err) {
        this.buyLoading = false;
        this.loading = false;
        console.log("exchange.err=>", err);
        if (err.data.code !== 3) {
          this.$message({
            message: "余额不足",
            type: "warning",
          });
          this.loading = false;
        } else {
          this.$message({
            message: "库存不足",
            type: "warning",
          });
          this.loading = false;
        }
        return;
      }

      try {
        const buyResp = await exchange.buyApi(tx.hash);
        console.log("buyResp=>", buyResp);
      } catch (err) {
        this.buyLoading = false;
        console.log("buyApi.err=>", err);
        alert(err);
        return;
      }

      const receipt = await tx.wait();
      console.log("receipt=>", receipt);
      this.buyLoading = false;
      this.$message({
        message: "购买成功",
        type: "success",
      });
      this.loading = false;
      setTimeout(() => {
        location.reload();
      }, 2000);
    },

    // 竞拍
    async onBid() {
      const address = await initWallet();
      if (address != "") {
        addr = address;
        currCont = ContractExchange();
      }

      console.log(parseFloat(this.bid_price));
      if (
        this.bid_price == "" ||
        isNaN(this.bid_price) ||
        parseFloat(this.bid_price) <= 0
      ) {
        this.$message({
          message: "请填写正确的竞拍价格",
          type: "warning",
        });
        return;
      }
      if (parseFloat(this.bid_price) > parseFloat(this.wbnb_balance)) {
        this.$message({
          message: "账号WBNB余额不足",
          type: "warning",
        });
        return;
      }

      console.log(this.order.order);
      let _order = JSON.parse(JSON.stringify(this.order.order));
      const order2 = {
        key: {
          salt: BigNumber.from(randomHex(32)),
          owner: addr,
          sellAsset: {
            token: wbnbAddr,
            tokenId: BigNumber.from("0"),
            assetType: 2,
          },
          buyAsset: {
            token: _order.key.sellAsset.token,
            tokenId: BigNumber.from(_order.key.sellAsset.tokenId),
            assetType: _order.key.sellAsset.assetType,
          },
        },
        selling: this.$parseEther(this.bid_price),
        buying: BigNumber.from(_order.selling),
        sellerFee: BigNumber.from(_order.sellerFee),
      };

      console.log(order2);

      const provider = getProvider();
      const signResp = await contracts.orderSigner(
        provider.getSigner(),
        order2
      );
      console.log("signResp=>", signResp);

      const bidOrder = contracts.sequence(order2);

      const resp = await exchange.bidCreateApi({
        order: bidOrder,
        signature: signResp,
      });
      console.log(resp);
      if (resp.code == 200) {
        this.$message({
          message: "参加竞拍成功",
          type: "success",
        });
        setTimeout(() => {
          location.reload();
        }, 2000);
      }
    },

    // Approve
    async bidApprove() {
      const resp = await Erc20Approve(erc20TranProxyAddr);
      console.log("Erc20Approve", resp);
      setTimeout(() => {
        location.reload();
      }, 2000);
    },

    // 竞拍交易
    async bidAccept(bid_id) {
      const address = await initWallet();
      if (address != "") {
        addr = address;
        currCont = ContractExchange();
      }

      let _order = null;
      let _signature = null;
      for (let k in this.bid_list) {
        if (this.bid_list[k]["bid_id"] == bid_id) {
          const bid_data = JSON.parse(this.bid_list[k]["bid_data"]);
          _order = bid_data["order"];
          _signature = bid_data["signature"];
          break;
        }
      }

      console.log("_order", _order);
      if (!_order) {
        this.$message({
          message: "订单不正确",
          type: "warning",
        });
        return;
      }

      const order2 = {
        key: {
          salt: BigNumber.from(_order.key.salt),
          owner: _order.key.owner,
          sellAsset: {
            token: _order.key.sellAsset.token,
            tokenId: BigNumber.from(_order.key.sellAsset.tokenId),
            assetType: _order.key.sellAsset.assetType,
          },
          buyAsset: {
            token: _order.key.buyAsset.token,
            tokenId: BigNumber.from(_order.key.buyAsset.tokenId),
            assetType: _order.key.buyAsset.assetType,
          },
        },
        selling: BigNumber.from(_order.selling),
        buying: BigNumber.from(_order.buying),
        sellerFee: BigNumber.from(_order.sellerFee),
      };
      console.log("order2", order2);

      this.bidLoading = true;
      const fee_resp = await exchange.bidOrderFeeApi({ order: _order });
      console.log("fee_resp", fee_resp);

      const sign = ethers.utils.splitSignature(_signature);
      console.log("sign", sign);
      const feeSign = ethers.utils.splitSignature(fee_resp.signature);
      console.log("feeSign", feeSign);

      // todo
      console.log("order2.buying", order2.buying);
      console.log("order2.selling", order2.selling);
      console.log("fee.buyFee", this.fee.buyFee);
      const amount = order2.selling;

      let tx = null;
      try {
        tx = await currCont.exchange(
          order2,
          { v: sign.v, r: sign.r, s: sign.s },
          BigNumber.from(this.fee.buyFee),
          { v: feeSign.v, r: feeSign.r, s: feeSign.s },
          amount,
          addr
        );
        console.log(tx);
      } catch (err) {
        this.bidLoading = false;
        console.log("exchange.err=>", err);
        if (err.data.code !== 3) {
          this.$message({
            message: "余额不足",
            type: "warning",
          });
          this.loading = false;
        } else {
          this.$message({
            message: "库存不足",
            type: "warning",
          });
          this.loading = false;
        }
        return;
      }

      try {
        const bidResp = await exchange.bidTxidApi(tx.hash);
        console.log("bidResp=>", bidResp);
      } catch (err) {
        this.bidLoading = false;
        console.log("bidTxidApi.err=>", err);
        // this.$message({
        //   message: err,
        //   type: "warning",
        // });
        alert(err);
        return;
      }

      const receipt = await tx.wait();
      console.log("receipt=>", receipt);
      this.bidLoading = false;
      this.$message({
        message: "竞拍成功",
        type: "success",
      });
      this.loading = false;
      setTimeout(() => {
        location.reload();
      }, 2000);
    },
  },
};
</script>

<style lang="less" scoped>
#replicator {
  position: absolute;
  top: 30px;
  left: 331px;
  width: 16px;
  height: 16px;
  border-radius: 0;
}
#examine {
  position: absolute;
  top: 2px;
  left: -22px;
  margin-right: 20px;
  width: 20px;
  height: 17px;
  border-radius: 0;
  box-shadow: 0px 0px 0px 0px;
}
#examines {
  position: absolute;
  top: 3px;
  left: -22px;
  margin-right: 20px;
  width: 20px;
  height: 14px;
  border-radius: 0;
  box-shadow: 0px 0px 0px 0px;
}
.el-table--enable-row-transition {
  border: 1px solid #ebf0f5;
  border-bottom: 0;
  border-radius: 10px;
}
.el-tabs--top {
  width: 100%;
  margin: 40px 0 150px 0;
}
/deep/ tr td:first-child .cell {
  font-size: 9px;
  font-family: Source Han Sans CN;
  font-weight: 400;
  color: #0066ed;
}
.el-table {
  margin: 0;
}
.price {
  font-size: 36px;
  font-family: Source Han Sans CN;
  font-weight: 400;
  color: #000000;
  line-height: 60px;
}
.browse {
  // position: relative;
  font-size: 14px;
  font-family: Source Han Sans CN;
  font-weight: 400;
  color: #7b7b7b;
  margin-right: 13px;
}
.attestation {
  font-size: 18px;
  font-family: Source Han Sans CN;
  font-weight: 400;
  color: #0066ed;
}
.productTitle {
  width: 503px;
  // height: 57px;
  font-size: 26px;
  font-family: Source Han Sans CN;
  font-weight: bold;
  color: #000000;
  line-height: 36px;
}
.details {
  // position: relative;、
  display: flex;
  width: 1200px;
  // height: 640px;
  margin: 0 auto;
  flex-wrap: wrap;
  margin-top: 60px;
}
.details img {
  float: left;
  width: 612px;
  height: 782px;
  background: #ffffff;
  // box-shadow: 0px 0px 8px 1px rgba(140, 140, 140, 0.26);
  border-radius: 36px;
}

.clear {
  clear: both;
}
.details-a {
  display: flex;
  flex-direction: column;
  padding-left: 81px;
  line-height: 42px;
}
.details-button {
  margin-top: 30px;
  width: 504px;
  height: 61px;
  background: #0066ed;
  box-shadow: 0px 0px 19px 0px rgba(186, 191, 205, 0.45);
  border-radius: 10px;
}
.danger-button {
  margin-top: 20px;
  width: 504px;
  height: 61px;
  box-shadow: 0px 0px 19px 0px rgba(186, 191, 205, 0.45);
  border-radius: 10px;
}
.details-b {
  display: flex;
  border-bottom: 1px solid #eceef0;
}
.productdetails {
  position: relative;
}
.productdetails img {
  width: 48px;
  height: 48px;
  margin-right: 20px;
  border-radius: 50%;
}
.productdetails-a p {
  display: flex;
  height: 17px;
  line-height: 37px;
  flex-direction: column;
}
.productdetails-b p {
  height: 30px;
  line-height: 30px;
}
</style>
