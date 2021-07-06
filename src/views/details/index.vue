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
        <el-button class="details-button" type="primary">Buy Now</el-button>
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
            <img id="replicator" src="../../assets/replicator.png" alt="">
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
            <img id="replicator" src="../../assets/replicator.png" alt="">
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
        Louis Koo, played Lu Bu in the movie "Dynasty Warriors". ========
        Character introduction: Lu Bu, a native of Jiuyuan County, Wuyuan
        County. One of the heroes in the late Eastern Han Dynasty. Because of
        Xiaowu, Lv Bu was awarded the post of Captain of Cavalry and Chief
        Officer of Hanoi, etc. by Muding Yuan of Binzhou. After killing Ding
        Yuan, he became Dong Zhuo's adopted son and was awarded to Zhong Lang.
        Suspended by Dong Zhuo, he was instigated by Situ Wang Yun to punish
        Dong Zhuo, moved to General Wu, Kaifuyitong Sansi, and entered Fengwen
        County. Lu Bu is famous for his bravery and is known as the "flying
        commander". It is sometimes said that "Lu Bu is among the people and the
        red rabbit is in the horse." ========
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
import http from "../../utils/http";
import { ethers } from "ethers";
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
    };
  },
  created() {},
  mounted() {
    this.getDetails();
  },
  methods: {
    getDetails() {
      http.httpGet(
        "v1/item/info",
        {
          token: this.token,
          token_id: this.token_id,
        },
        (resp) => {
          console.log(resp);
          if (resp.code !== 200) {
          } else {
            this.loading = false;
          }
          this.details = resp.data;
          this.details.price = ethers.utils.formatUnits(this.details.price);
          this.str = this.details.creator;
          this.strs = this.details.creator_address;
          this.creator = this.SubStr(this.str);
          this.creator_address = this.SubStr(this.strs);
          this.tableData[0].name = this.details.creator_user_name;
          this.tableData[1].name = this.details.own_user_name;
          this.tableData[0].time = this.$dayjs(this.details.create_time).format(
            "YYYY-MM-DD"
          );
          this.tableData[1].time = this.$dayjs(this.details.create_time).format(
            "YYYY-MM-DD"
          );
        }
      );
    },
    SubStr(str) {
      var subStr1 = str.slice(0, 6);
      var subStr2 = str.slice(str.length - 5, 42);
      var subStr = subStr1 + "..." + subStr2;
      return subStr;
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
