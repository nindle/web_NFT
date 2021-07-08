<template>
  <div v-loading="loading" class="details">
    <!-- 商品大图zs -->
    <img
      :src="
        details.prop_image.replace(
          'ipfs://ipfs/',
          'https://api.lionnft.io/v1/upload/view?hash='
        )
      "
      style="border-radius: 20px"
      alt=""
    >
    <div class="clear" />

    <!-- 产品详情 -->
    <ul class="details-a">
      <li class="productTitle">
        {{ details.prop_name }}
      </li>
      <li class="attestation">Meta World Certification</li>
      <li>
        <span class="browse">Owned by</span>
        <span style="color: #0066ed; margin: 0 13px 0 -12px">
          {{ details.creator_user_name }}
        </span>
        <span class="browse">
          {{ details.supply_sell }} of {{ details.supply }} available
        </span>
        <span class="browse" style="position: relative; margin-left: 20px">
          <img id="examines" src="../../assets/examine.png" alt="">2212
          <!-- <div class="clear"></div> -->
        </span>
        <span class="browse" style="position: relative; margin-left: 20px">
          <img id="examine" src="../../assets/souchang.png" alt="">
          2122</span>
      </li>
      <li class="price">
        <img
          src="../../assets/price.png"
          style="width: 47px; height: 47px; margin: 5px 15px 0 0"
          alt=""
        >
        {{ details.price }} {{ details.coin_name }}
      </li>
      <li>
        <el-button
          class="details-button"
          type="primary"
          :disabled="buyLoading == true"
          @click="onBuy"
        >
          {{ buyLoading ? "Buying" : "Buy Now" }}
        </el-button>
      </li>
      <hr style="border: 1px solid #eeeeee; margin: 24px 0">
      <li>
        <div class="productdetails">
          <div style="float: left">
            <img
              src="../../assets/19.jpeg"
              style="margin: 10px 15px 0 0"
              alt=""
            >
          </div>
          <div class="productdetails-a" style="position: relative">
            <p
              style="
                font-size: 12px;
                font-family: Source Han Sans CN;
                font-weight: 400;
                color: #aaaaaa;
              "
            >
              creator
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
            >{{ creator }}</span>
            <img
              id="replicator"
              src="../../assets/replicator.png"
              alt=""
              style="cursor: pointer"
              @click="copyText(1)"
            >
          </div>
        </div>
      </li>
      <li>
        <div class="productdetails">
          <div style="float: left">
            <img
              src="../../assets/19.jpeg"
              style="margin: 10px 15px 0 0"
              alt=""
            >
          </div>
          <div class="productdetails-a" style="position: relative">
            <p
              style="
                font-size: 12px;
                font-family: Source Han Sans CN;
                font-weight: 400;
                color: #aaaaaa;
              "
            >
              own
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
            >{{ creator_address }}</span>
            <img
              id="replicator"
              src="../../assets/replicator.png"
              alt=""
              style="cursor: pointer"
              @click="copyText(2)"
            >
          </div>
        </div>
      </li>
      <hr style="border: 1px solid #eeeeee; margin: 24px 0">
      <li
        style="
          font-size: 15px;
          font-family: Source Han Sans CN;
          font-weight: bold;
          color: #313131;
        "
      >
        Transaction Record
      </li>
      <li>
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="name" label="user" />
          <el-table-column prop="perating" label="perating" />
          <el-table-column prop="time" label="time" />
        </el-table>
      </li>
    </ul>
    <el-tabs v-model="activeName">
      <el-tab-pane label="Work description" name="first">
        {{ details.prop_desc }}
      </el-tab-pane>
      <el-tab-pane label="About NFT" name="second">
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
import $http from "../../utils/request";
import { ethers } from "ethers";
import exchange from "../../wallet/exchange";
import { initWallet, ContractExchange } from "../../wallet/wallet";
import { BigNumber } from "@ethersproject/bignumber";

let currCont = null;
let addr = "";
export default {
  name: "Details",
  props: {},
  data() {
    return {
      loading: true,
      details: {},
      activeName: "first",
      tableData: [
        {
          time: "",
          name: "",
          perating: "",
        },
        {
          time: "",
          name: "",
          perating: "",
        },
      ],
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
    };
  },
  created() {},
  async mounted() {
    const address = await initWallet();
    console.log(address);
    if (address != "") {
      addr = address;
      currCont = ContractExchange();
    }
    this.getDetails();
  },
  methods: {
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
    async getDetails() {
      const resp = await $http.get(
        `https://api.lionnft.io/v1/item/info?token=${this.token}&token_id=${this.token_id}`
      );
      console.log(resp);
      // eslint-disable-next-line no-empty
      if (resp.code !== 200) {
      } else {
        this.loading = false;
      }
      this.details = resp.data;

      this.details.price = ethers.utils.formatUnits(this.details.price);
      this.str = this.details.creator_address;
      this.strs = this.details.own_address;
      this.creator = this.SubStr(this.str);
      this.creator_address = this.SubStr(this.strs);
      this.creator_addr = this.details.creator_address;
      this.owner_addr = this.details.own_address;
      this.tableData[0].name = this.details.creator_user_name;
      this.tableData[1].name = this.details.own_user_name;
      this.tableData[0].time = this.$dayjs(this.details.create_time).format(
        "YYYY-MM-DD"
      );
      this.tableData[1].time = this.$dayjs(this.details.create_time).format(
        "YYYY-MM-DD"
      );

      this.orderInfo();
      this.buyFee();
    },
    SubStr(str) {
      var subStr1 = str.slice(0, 6);
      var subStr2 = str.slice(str.length - 5, 42);
      var subStr = subStr1 + "..." + subStr2;
      return subStr;
    },
    // 订单信息
    async orderInfo() {
      const resp = await exchange.orderInfoApi(
        this.token_id,
        this.token,
        this.creator_addr
      );
      console.log("orderInfo", resp);
      this.order = resp.data.ord_data;
      console.log(this.order);
    },
    // 交易手续费
    async buyFee() {
      const resp = await exchange.getBuyerFeeApi(this.token_id, this.token);
      console.log("getBuyerFeeApi", resp);
      this.fee = resp;
      console.log(this.fee);
    },
    // 购买
    async onBuy() {
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
      console.log(order2);

      console.log(this.order.signature);
      console.log(this.fee.buyFee);
      console.log(this.fee.buyFeeSignature);
      console.log(this.owner_addr);

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
    },
  },
};

// exchange(
//   order, // 交易对象，通过接口获取
//   props.signature, // 交易对象签名，接口获取
//   BigNumber.from(buyerFee.buyFee), // 购买手续费，接口获取
//   buyerFee.buyFeeSignature, // 购买手续费签名，接口获取
//   BigNumber.from(props.amount), // 购买数量
//   account.value // 购买的账号，和发送交易的账号是同一个账号
// )
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
.details-b {
  display: flex;
  border-bottom: 1px solid #eceef0;
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
