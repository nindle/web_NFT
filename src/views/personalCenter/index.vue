<template>
  <div>
    <!-- 个人中心背景图 -->
    <div class="personalCenter-bgc" />
    <!-- 个人中头像图 -->
    <div class="personalCenter-pic">
      <img src="../../assets/head.png" alt="">
    </div>
    <!-- 个人简介 -->
    <div class="personalCenter-id">
      <p style="color: #09090a; font-size: 20px">{{ userinfo.user_name }}</p>
      <p>{{ subStr }} <img src="../../assets/fz.png" alt=""></p>

      <el-button
        round
        style="
          border-radius: 21px;
          width: 130px;
          height: 43px;
          border: 1px solid #eceef0;
          color: #09090a;
          font-weight: 500;
        "
        @click="
          $router.push({
            name: 'redactUser',
            params: { userId: user_id },
          })
        "
      >
        Edit profile
      </el-button>
      <div
        style="
          width: 43px;
          height: 41px;
          border: 1px solid #eceef0;
          border-radius: 50%;
          display: inline-block;
          margin-left: 10px;
        "
      >
        <img
          src="../../assets/share.png"
          alt=""
          style="width: 17px; height: 17px"
        >
      </div>
    </div>
    <!-- 产品系列 -->
    <div v-loading="loading" class="personalCenter-Tabs">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="CREATED" name="first">
          <ul class="exhibition">
            <li
              v-for="(item, index) in createdList.slice(0, a)"
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
                :src="
                  item.prop_image.replace(
                    'ipfs://ipfs/',
                    'https://api.lionnft.io/v1/upload/view?hash='
                  )
                "
                :class="{ hoverBg: index == hoverIndex }"
                alt=""
                @mouseover="hoverIndex = index"
                @mouseout="hoverIndex = -1"
              >
              <h3 class="username">{{ item.prop_name }}</h3>
              <p class="usermessage">{{ item.message }}</p>
              <div class="userprice">
                <span style="float: left; color: #0066ed; margin-right: 20px">
                  {{ item.price }} BNB
                </span>
                <span> 1/1</span>
                <div
                  class="userpriceimg"
                  style="float: right; margin-right: 40px"
                >
                  <img src="../../assets/souchang.png" alt=""> 2314
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
              v-if="a < createdList.length"
              class="loadMore"
              @click="loadMore"
            >
              Load More
            </div>

            <div v-else class="loadMore">没有更多了</div>
          </ul>
        </el-tab-pane>
        <el-tab-pane label="SOLD" name="second">
          <ul class="exhibition">
            <li
              v-for="(item, index) in createdList.slice(0, a)"
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
                :src="
                  item.prop_image.replace(
                    'ipfs://ipfs/',
                    'https://api.lionnft.io/v1/upload/view?hash='
                  )
                "
                :class="{ hoverBg: index == hoverIndex }"
                alt=""
                @mouseover="hoverIndex = index"
                @mouseout="hoverIndex = -1"
              >
              <h3 class="username">{{ item.prop_name }}</h3>
              <p class="usermessage">{{ item.message }}</p>
              <div class="userprice">
                <span style="float: left; color: #0066ed; margin-right: 20px">
                  {{ item.price }} BNB
                </span>
                <span> 1/1</span>
                <div
                  class="userpriceimg"
                  style="float: right; margin-right: 40px"
                >
                  <img src="../../assets/souchang.png" alt=""> 2314
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
              v-if="a < createdList.length"
              class="loadMore"
              @click="loadMore"
            >
              Load More
            </div>

            <div v-else class="loadMore">没有更多了</div>
          </ul>
        </el-tab-pane>
        <el-tab-pane label="BOUGHT" name="third">
          <ul class="exhibition">
            <li
              v-for="(item, index) in createdList.slice(0, a)"
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
                :src="
                  item.prop_image.replace(
                    'ipfs://ipfs/',
                    'https://api.lionnft.io/v1/upload/view?hash='
                  )
                "
                :class="{ hoverBg: index == hoverIndex }"
                alt=""
                @mouseover="hoverIndex = index"
                @mouseout="hoverIndex = -1"
              >
              <h3 class="username">{{ item.prop_name }}</h3>
              <p class="usermessage">{{ item.message }}</p>
              <div class="userprice">
                <span style="float: left; color: #0066ed; margin-right: 20px">
                  {{ item.price }} BNB
                </span>
                <span> 1/1</span>
                <div
                  class="userpriceimg"
                  style="float: right; margin-right: 40px"
                >
                  <img src="../../assets/souchang.png" alt=""> 2314
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
              v-if="a < createdList.length"
              class="loadMore"
              @click="loadMore"
            >
              Load More
            </div>

            <div v-else class="loadMore">没有更多了</div>
          </ul>
        </el-tab-pane>
        <el-tab-pane label="COLLECTION" name="fourth">
          <ul class="exhibition">
            <li
              v-for="(item, index) in createdList.slice(0, a)"
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
                :src="
                  item.prop_image.replace(
                    'ipfs://ipfs/',
                    'https://api.lionnft.io/v1/upload/view?hash='
                  )
                "
                :class="{ hoverBg: index == hoverIndex }"
                alt=""
                @mouseover="hoverIndex = index"
                @mouseout="hoverIndex = -1"
              >
              <h3 class="username">{{ item.prop_name }}</h3>
              <p class="usermessage">{{ item.message }}</p>
              <div class="userprice">
                <span style="float: left; color: #0066ed; margin-right: 20px">
                  {{ item.price }} BNB
                </span>
                <span> 1/1</span>
                <div
                  class="userpriceimg"
                  style="float: right; margin-right: 40px"
                >
                  <img src="../../assets/souchang.png" alt=""> 2314
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
              v-if="a < createdList.length"
              class="loadMore"
              @click="loadMore"
            >
              Load More
            </div>

            <div v-else class="loadMore">没有更多了</div>
          </ul>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import Http from "../../utils/http";

import { ethers } from "ethers";

import { initWallet } from "../../wallet/wallet";

export default {
  name: "PersonalCenter",
  props: {},
  data() {
    return {
      user_id: "",
      loading: true,
      hover: false,
      hoverIndex: -2,
      a: 6,
      activeName: "first",
      createdList: [],
      userinfo: {},
      str: "",
      subStr: "",
      filters: "created",
    };
  },
  async created() {
    const address = await initWallet();
    if (address != "") {
      this.user_id = address;
      this.getUserInfo();
      this.getCreated();
    }
  },
  mounted() {},
  methods: {
    handleClick(tab, event) {
      console.log(tab.label);
      if (tab.label == "SOLD") {
        this.filters = "onsale";
        this.getCreated();
      } else if (tab.label == "BOUGHT") {
        this.filters = "liked";
        this.getCreated();
      } else if ((tab.label = "COLLECTION")) {
        this.filters = "collection";
        this.getCreated();
      } else {
        this.filters = "created";
        this.getCreated();
      }
    },
    loadMore() {
      this.a += 6;
    },
    getUserInfo() {
      if (this.user_id == "") {
        this.loading = false;
      }
      Http.httpGet("v1/user", { address: this.user_id }, (resp) => {
        console.log(resp);
        this.userinfo = resp.data;
        this.str = this.userinfo.user_address;
        this.subStr = this.SubStr(this.str);
      });
    },
    SubStr(str) {
      var subStr1 = str.slice(0, 6);
      var subStr2 = str.slice(str.length - 5, 42);
      var subStr = subStr1 + "..." + subStr2;
      return subStr;
    },
    getCreated() {
      Http.httpGet(
        "v1/item/list",
        {
          address: this.user_id,
          filter: this.filters,
        },
        (resp) => {
          console.log(resp);
          this.createdList = resp.list;
          this.createdList.forEach((item, index) => {
            if (this.createdList[index].price === "") {
              this.createdList[index].price = "暂无价格";
            } else {
              this.createdList[index].price = ethers.utils.formatUnits(
                this.createdList[index].price
              );
            }
          });
          this.loading = false;
        }
      );
    },
  },
};
</script>

<style lang="less" scoped>
.personalCenter-bgc {
  width: 100%;
  height: 224px;
  background-image: url("../../assets/bj.png");
  z-index: 2;
}
.personalCenter-pic {
  position: absolute;
  left: 50%;
  top: 200px;
  transform: translate(-50%);
  width: 126px;
  height: 126px;
  // border: 1px solid #ffffff;
  border-radius: 50%;
}
.personalCenter-pic img {
  width: 100%;
  height: 100%;
  // border: 1px solid #ffffff;
  border-radius: 50%;
}
.personalCenter-id {
  text-align: center;
  width: 300px;
  line-height: 40px;
  margin: 0 auto;
  margin-top: 50px;
}
.personalCenter-Tabs {
  width: 1200px;
  margin: 0 auto;
}
.personalCenter-Tabs-a {
  text-align: center;
  margin: 30px 0;
  line-height: 40px;
}
.exhibition {
  display: flex;
  position: relative;
  width: 1200px;
  margin: 0 auto;
  flex-direction: row;
  flex-wrap: wrap;
}

.exhibition li {
  position: relative;
  margin-right: 42px;
  overflow: hidden;
  float: left;
  width: 372px;
  height: 520px;
  box-shadow: 0px 0px 19px 0px rgba(186, 191, 205, 0.45);
  border-radius: 20px;
  margin: 10px 10px;
  margin-bottom: 60px;
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
.loadMore {
  width: 112px;
  height: 33px;
  line-height: 33px;
  text-align: center;
  background: #ffffff;
  border: 1px solid #bbbbbb;
  border-radius: 16px;
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translate(-50%);
}

.collection {
  width: 24px;
  height: 24px;
  position: absolute;
  top: 16px;
  right: 24px;
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
// .exhibition {
//   display: flex;
//   position: relative;
//   width: 1200px;
//   margin: 0 auto;
//   flex-direction: row;
//   flex-wrap: wrap;
// }

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
