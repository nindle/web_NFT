<template>
  <div>
    <!-- 个人中心背景图 -->
    <div class="personalCenter-bgc">
      <img :src="userBgc" class="personalCenter-img" alt="" />
      <el-upload
        action="https://api.lionnft.net/v1/upload/file"
        :auto-upload="true"
        :on-success="uploadSuccessbgcFn"
      >
        <el-button
          id="editBackground"
          type="primary"
          icon="el-icon-edit"
          circle
        />
      </el-upload>
    </div>

    <!-- 个人中头像图 -->
    <div class="personalCenter-pic">
      <img :src="userpic" alt="" />
    </div>
    <!-- 个人简介 -->
    <div class="personalCenter-id">
      <p style="color: #09090a; font-size: 20px">
        {{ userinfo.user_name }}
      </p>
      <p>
        {{ subStr }}
        <img
          src="../../assets/fz.png"
          style="cursor: pointer"
          alt=""
          @click="copyText"
        />
      </p>

      <el-button
        v-show="userShow != ''"
        round
        style="
          border-radius: 21px;
          width: 130px;
          height: 43px;
          border: 1px solid #eceef0;
          color: #09090a;
          font-weight: 500;
        "
        @click="open"
      >
        {{ $t("personalCenter.edit") }}
      </el-button>
      <div
        v-show="userShow != ''"
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
        />
      </div>
    </div>
    <!-- 产品系列 -->
    <div class="personalCenter-Tabs">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane :label="$t('personalCenter.creaTed')" name="first">
          <ul v-if="createdList.length !== 0" class="exhibition">
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
                    'https://api.lionnft.net/v1/upload/view?hash='
                  )
                "
                :class="{ hoverBg: index == hoverIndex }"
                alt=""
                @mouseover="hoverIndex = index"
                @error="setDefaultImage"
                @mouseout="hoverIndex = -1"
              />

              <h3 class="username">{{ item.prop_name }}</h3>
              <p class="usermessage">{{ item.prop_desc }}</p>
              <div class="userprice">
                <span style="float: left; color: #0066ed; margin-right: 20px">
                  {{ item.price }} {{ item.coin_name }}
                </span>
                <span> {{ item.supply_sell }}/{{ item.supply }}</span>
                <div
                  class="userpriceimg"
                  style="float: right; margin-right: 40px"
                >
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
              v-if="a < createdList.length"
              class="loadMore"
              @click="loadMore"
            >
              {{ $t("bazaar.jiazai") }}
            </div>

            <div v-else class="loadMore">{{ $t("bazaar.meiyou") }}</div>
          </ul>
          <div v-else class="createdStyle">暂无商品</div>
        </el-tab-pane>
        <el-tab-pane :label="$t('personalCenter.sold')" name="second">
          <ul v-if="createdList.length !== 0" class="exhibition">
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
                    'https://api.lionnft.net/v1/upload/view?hash='
                  )
                "
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
                <div
                  class="userpriceimg"
                  style="float: right; margin-right: 40px"
                >
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
              v-if="a < createdList.length"
              class="loadMore"
              @click="loadMore"
            >
              {{ $t("bazaar.jiazai") }}
            </div>

            <div v-else class="loadMore">{{ $t("bazaar.meiyou") }}</div>
          </ul>
          <div v-else class="createdStyle">暂无商品</div>
        </el-tab-pane>
        <el-tab-pane
          v-if="userShow != ''"
          :label="$t('personalCenter.bought')"
          name="third"
        >
          <ul v-if="createdList.length !== 0" class="exhibition">
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
                    'https://api.lionnft.net/v1/upload/view?hash='
                  )
                "
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
                <div
                  class="userpriceimg"
                  style="float: right; margin-right: 40px"
                >
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
              v-if="a < createdList.length"
              class="loadMore"
              @click="loadMore"
            >
              {{ $t("bazaar.jiazai") }}
            </div>

            <div v-else class="loadMore">{{ $t("bazaar.meiyou") }}</div>
          </ul>
          <div v-else class="createdStyle">暂无商品</div>
        </el-tab-pane>
        <!-- <el-tab-pane :label="$t('personalCenter.collection')" name="fourth">
          <ul v-if="createdList.length !== 0" class="exhibition">
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
                    'https://api.lionnft.net/v1/upload/view?hash='
                  )
                "
                :class="{ hoverBg: index == hoverIndex }"
                alt=""
                @error="setDefaultImage"
                @mouseover="hoverIndex = index"
                @mouseout="hoverIndex = -1"
              >
              <h3 class="username">{{ item.prop_name }}</h3>
              <p class="usermessage">{{ item.prop_desc }}</p>
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
              {{ $t("bazaar.jiazai") }}
            </div>

            <div v-else class="loadMore">{{ $t("bazaar.meiyou") }}</div>
          </ul>
          <div v-else class="createdStyle">暂无商品</div>
        </el-tab-pane> -->
      </el-tabs>
    </div>
  </div>
</template>

<script>
import $http from "../../utils/request";
import { ethers } from "ethers";
import imgUrl from "../../assets/xiaohuli.png";
import { initWallet, getBalance } from "../../wallet/wallet";
import { userInfoApi } from "../../api/user";

export default {
  name: "PersonalCenter",
  props: {},
  data() {
    return {
      user_id: "",
      userBgc: require("../../assets/bj.png"),
      userpic: require("../../assets/touxiang.png"),
      hover: false,
      hoverIndex: -2,
      a: 6,
      activeName: "first",
      createdList: [],
      userinfo: {},
      str: "",
      subStr: "",
      filters: "created",
      formLabelAlign: {
        username: sessionStorage.getItem("userInfo"),
        short_url: "",
        desc: "",
        address: sessionStorage.getItem("address"),
        cover: "",
        website: "",
        twitter: "",
        pic: "",
      },
      userShow: "",
    };
  },
  watch: {
    $route(to) {
      console.log("123===>", to);
      this.getUserInfo();

      location.reload();
    },
  },
  async created() {
    if (this.$route.params.address == sessionStorage.getItem("address")) {
      this.userShow = 123;
      this.user_id = sessionStorage.getItem("address");
    } else {
      this.user_id = this.$route.params.address;
    }
    this.getUserInfo();
    this.getCreated();
  },
  mounted() {},
  methods: {
    setDefaultImage(e) {
      e.target.src = require("../../assets/weiqifm.jpg");
    },

    async uploadSuccessbgcFn(e) {
      // console.log(e.ipfs);
      const edit = {
        username: sessionStorage.getItem("userInfo"),
        address: sessionStorage.getItem("address"),
        desc: this.userinfo.user_desc,
        cover: e.ipfs,
        short_url: this.userinfo.user_short_url,
        website: this.userinfo.user_website,
        twitter: this.userinfo.user_twitter,
        pic: this.userinfo.user_pic,
      };
      const resp = await $http.post("https://api.lionnft.net/v1/user/edit", {
        ...edit,
      });
      this.getUserInfo();
    },

    open() {
      if (this.user_id !== null) {
        this.$router.push({
          name: "redactUser",
          params: {
            userId: this.user_id,
            userName: this.userinfo.user_name,
            cover: this.userinfo.user_cover,
          },
        });
      } else {
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
      }
    },

    copyText() {
      var input = document.createElement("input"); // js创建一个input输入框
      input.value = this.userinfo.user_address; // 将需要复制的文本赋值到创建的input输入框中
      document.body.appendChild(input); // 将输入框暂时创建到实例里面
      input.select(); // 选中输入框中的内容
      document.execCommand("Copy"); // 执行复制操作
      document.body.removeChild(input); // 最后删除实例中临时创建的input输入框，完成复制操作
      this.$message({
        message: "复制成功",
        type: "success",
      });
    },

    handleClick(tab) {
      if (tab.label == "SOLD" || tab.label == "在售") {
        this.filters = "onsale";
        this.getCreated();
      } else if (tab.label == "OFFSHELF" || tab.label == "下架") {
        this.filters = "unsale";
        this.getCreated();
      } else {
        this.filters = "created";
        this.getCreated();
      }
    },

    loadMore() {
      this.a += 6;
    },

    async getUserInfo() {
      const resp = await $http.get(
        `https://api.lionnft.net/v1/user?address=${this.user_id}`
      );

      this.userinfo = resp.data;
      console.log(this.userinfo);
      // console.log(this.userinfo);
      // this.formLabelAlign.pic = this.userinfo.user_desc;
      // this.formLabelAlign.cover = this.userinfo.user_cover;

      if (this.userinfo.user_cover == "") {
        this.userBgc = require("../../assets/bj.png");
      } else {
        this.userBgc = this.userinfo.user_cover.replace(
          "ipfs://ipfs/",
          "https://api.lionnft.net/v1/upload/view?hash="
        );
      }
      if (this.userinfo.user_pic == "") {
        this.userpic = require("../../assets/touxiang.png");
      } else {
        this.userpic = this.userinfo.user_pic.replace(
          "ipfs://ipfs/",
          "https://api.lionnft.net/v1/upload/view?hash="
        );
      }
      this.str = this.userinfo.user_address;
      this.subStr = this.SubStr(this.str);
    },

    SubStr(str) {
      var subStr1 = str.slice(0, 6);
      var subStr2 = str.slice(str.length - 5, 42);
      var subStr = subStr1 + "..." + subStr2;
      return subStr;
    },

    async getCreated() {
      const resp = await $http.get(
        `https://api.lionnft.net/v1/item/list?address=${this.user_id}&filter=${this.filters}`
      );
      // console.log(resp);
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
    },
  },
};
</script>

<style lang="less" scoped>
.personalCenter-img {
  width: 100%;
  height: 224px;
}
/deep/.el-upload-list {
  display: none;
}
#editBackground {
  position: absolute;
  bottom: 10px;
  right: 10px;
  z-index: 3;
}
.createdStyle {
  text-align: center;
  margin: 100px 0;
}
.personalCenter-bgc {
  position: relative;
  width: 100%;
  height: 224px;
  // z-index: -2;
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
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
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
