<template>
  <div>
    <h2 class="bazaar_headline">
      {{ $t("bazaar.title") }}
    </h2>
    <div class="classify">
      <el-button
        v-for="(item, index) in classifyList"
        id="classifyid"
        :key="index"
        size="small"
        round
        @click="classifyFn(item)"
      >
        {{ item.cate_name }}
      </el-button>
    </div>
    <ul v-loading="loading" class="exhibition">
      <li
        v-for="(item, index) in showList.slice(0, a)"
        :key="index"
        style="position: relative"
        @click="
          $router.push({
            name: 'details',
            params: { id: item.token_id, token: item.token },
          })
        "
        @mouseover="hover = true"
        @mouseleave="hover = false"
      >
        <img
          :src="$Cover(item.prop_image)"
          :class="{ hoverBg: index == hoverIndex }"
          alt=""
          @error="setDefaultImage"
          @mouseover="hoverIndex = index"
          @mouseout="hoverIndex = -1"
        />
        <h3 class="username">{{ item.prop_name }}</h3>
        <p class="usermessage">{{ item.prop_desc }}</p>
        <div class="userprice">
          <span style="float: left; color: #0066ed; margin-right: 20px">
            {{ item.price }} {{ item.coin_name }}
          </span>
          <span> {{ item.supply_sell }}/{{ item.supply }}</span>
          <div class="userpriceimg" style="float: right; margin-right: 40px">
            <img src="../../assets/souchang.png" alt="" /> 2314
          </div>
        </div>
        <div
          :class="hoverIndex == index ? 'redirects' : 'redirect'"
          @mouseover="hoverIndex = index"
          @mouseout="hoverIndex = -1"
        >
          Buy now →
        </div>
      </li>
      <div
        v-if="a < showList.length"
        :class="showList == 0 ? 'loadMores' : 'loadMore'"
        @click="loadMore"
      >
        {{ $t("bazaar.jiazai") }}
      </div>
      <div v-else :class="showList == 0 ? 'loadMores' : 'loadMore'">
        {{ $t("bazaar.meiyou") }}
      </div>
    </ul>
  </div>
</template>

<script>
import $http from "../../utils/request";

import { ethers } from "ethers";

export default {
  name: "Bazaar",
  props: {},
  data() {
    return {
      hover: false,
      hoverIndex: -2,
      a: 6,
      b: 5,
      showList: [],
      loading: true,
      classifyList: [],
    };
  },
  created() {},
  mounted() {
    this.getList();
    this.getClassify();
  },
  methods: {
    async classifyFn(e) {
      const data = await $http.get(`/v1/explore/list?cate_id=${e.cate_id}`);
      if (data.list.length == 0) {
        this.$message({
          message: "分类商品为空",
          type: "warning",
        });
        this.getList();
      } else {
        this.showList = [];
        this.showList = data.list;
        this.showList.forEach((item, index) => {
          if (this.showList[index].price === "") {
            this.showList[index].price = "暂无价格";
          } else {
            this.showList[index].price = ethers.utils.formatUnits(
              this.showList[index].price
            );
          }
        });
      }
    },

    setDefaultImage(e) {
      e.target.src = require("../../assets/weiqifm.jpg");
    },

    loadMore() {
      this.a += 3;
    },

    async getList() {
      const resp = await $http.get("/v1/explore/list");
      this.showList = resp.list;
      this.showList.forEach((item, index) => {
        if (this.showList[index].price === "") {
          this.showList[index].price = "暂无价格";
        } else {
          this.showList[index].price = ethers.utils.formatUnits(
            this.showList[index].price
          );
        }
      });
      this.loading = false;
    },

    async getClassify() {
      const data = await $http.get("/v1/category/list");
      this.classifyList = data.list;
    },
  },
};
</script>

<style lang="less" scoped>
#classifyid {
  margin-right: 20px;
  color: #000;
  font-family: Source Han Sans CN;
}

.classify {
  width: 1200px;
  height: 60px;
  margin: 0 auto;
  font-size: 22px;
  font-family: Source Han Sans CN;
  font-weight: bold;
  color: #000000;
}
.hoverBg {
  filter: blur(8px);
}
.redirect {
  display: none;
}
.redirects {
  display: block;
  position: absolute;
  top: 150px;
  left: 70px;
  width: 238px;
  height: 59px;
  line-height: 59px;
  text-align: center;
  border: 1px solid #ffffff;
  border-radius: 10px;
  z-index: 10;
  font-size: 24px;
  font-family: Source Han Sans CN;
  font-weight: 500;
  color: #ffffff;
  cursor: pointer;
}
.bazaar_headline {
  width: 1200px;
  height: 90px;
  line-height: 90px;
  margin: 0 auto;
  font-size: 29px;
  font-family: Source Han Sans CN;
  font-weight: bold;
  color: #000000;
}
.userList {
  width: 1200px;
  margin: 0 auto;
  height: 186px;
  overflow: hidden;
}
.userList-top {
  padding-top: 30px;
  font-size: 28px;
  color: #09090a;
}
.userList-user,
.userList-optionMenu {
  margin-top: 20px;
  height: 50px;
  float: left;
}
.userList-user li {
  width: 240px;
  height: 48px;
}
.userList-user li img {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  float: left;
}
.userList-user-index {
  float: left;
  line-height: 48px;
  margin-right: 15px;
}
.userList-user-a {
  margin-top: 4px;
  padding-left: 90px;
}
.userList-optionMenu {
  margin-right: 45px;
  cursor: pointer;
}
.exhibition {
  display: flex;
  position: relative;
  width: 1200px;
  // height: 1300px;
  margin: 0 auto;
  flex-direction: row;
  flex-wrap: wrap;
  cursor: pointer;
}
.exhibition li {
  position: relative;
  margin-right: 42px;
  margin-bottom: 50px;
  overflow: hidden;
  float: left;
  width: 372px;
  height: 520px;
  box-shadow: 0px 0px 19px 0px rgba(186, 191, 205, 0.45);
  border-radius: 20px;
}
.exhibition img {
  width: 372px;
  height: 389px;
  background: #ffffff;
}
.exhibition li:nth-child(3n + 0) {
  margin-right: 0px;
}
.exhibition-b {
  margin-left: 30px;
  padding-top: 15px;
}
.loadMores {
  display: none;
}
.loadMore {
  width: 112px;
  height: 33px;
  line-height: 33px;
  text-align: center;
  background: #ffffff;
  border: 1px solid #bbbbbb;
  border-radius: 16px;
  position: absolute;
  bottom: -10px;
  left: 50%;
  display: block;
  transform: translate(-50%);
}
.collection {
  width: 24px;
  height: 24px;
  position: absolute;
  top: 16px;
  right: 24px;
}
.neirong img {
  width: 372px;
  height: 389px;
}
.userpriceimg img {
  width: 21px;
  height: 18px;
}
.usermessage {
  margin-left: 20px;
  margin-top: 10px;
  font-size: 18px;
  font-family: Source Han Sans CN;
  font-weight: 500;
  color: #898989;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.username {
  margin-top: 10px;
  margin-left: 20px;
  font-size: 20px;
  font-family: Source Han Sans CN;
  font-weight: bold;
  color: #333333;
}
.userprice {
  margin-left: 20px;
  margin-top: 10px;
  font-size: 18px;
  font-family: Source Han Sans CN;
  font-weight: 500;
}
</style>
