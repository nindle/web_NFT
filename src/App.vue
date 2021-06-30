<template>
  <div id="app">
    <el-header>
      <img
        src="./assets/login.png"
        alt=""
        class="header-login"
        @click="goHome"
        replace
      />
      <div class="header-input">
        <el-input placeholder="Search by creator collectible or collection ">
        </el-input>
        <img
          src="./assets/search.png"
          alt=""
          style="
            position: absolute;
            top: 16px;
            left: 8px;
            width: 27px;
            height: 27px;
          "
        />
      </div>
      <div class="header-icon">
        <router-link
          class="header-icon-a"
          :to="'/'"
          @click.native="cur = 1"
          :class="{ active: cur === 1 ? true : false }"
          >Home</router-link
        >
        <router-link
          class="header-icon-a"
          @click.native="cur = 2"
          :to="'/bazaar'"
          :class="{ active: cur === 2 ? true : false }"
          >Browse</router-link
        >
        <router-link
          class="header-icon-a"
          @click.native="cur = 3"
          :to="'/personalCenter'"
          :class="{ active: cur === 3 ? true : false }"
          >Account</router-link
        >
        <el-button type="primary" @click="account()" class="create" round>
          Create
        </el-button>
        <div class="loginSuccessful" v-if="this.success == 200">
          <p class="lfet">
            <img src="./assets/point.png" alt="" style="margin: 0 4px" />
            <span>Ethereum Mainnet</span>
          </p>
          <p class="right">
            <img src="./assets/Avatar.png" alt="" style="margin: 0 4px" />
            <span>Lucy LU</span>
          </p>
        </div>
        <el-button type="primary" class="userlogin" @click="open" round v-else>
          Link wallet
        </el-button>

        <img
          style="margin: 0 10px; height: 26px"
          src="./assets/language.png"
          alt=""
        />

        <!-- @click="drawer = true"  之前连接qb样式 -->
      </div>
      <!-- <el-drawer :visible.sync="drawer" :withHeader="false">
        已登录
        <div v-if="walletimg.length == 0">
          <div
            style="
              display: flex;
              align-items: center;
              border-bottom: 1px solid #eceef0;
            "
          >
            <img
              src="./assets/个人中心.png"
              alt=""
              style="margin: 0 20px; width: 25px; height: 25px"
            />
            <p style="color: #09090a; font-size: 16px">My wallet</p>
            <p style="color: #84858a; font-size: 14px; margin-left: 80px">
              0xfbe6...1e36
              <img
                style="width: 16px; height: 16px"
                src="./assets/fz.png"
                alt=""
              />
            </p>
          </div>
          <div
            style="
              width: 345px;
              height: 132px;
              line-height: 37px;
              text-align: center;
              margin: 20px;
              border-radius: 10px;
            "
          >
            <p style="color: #84858a; font-size: 14px">Total balance</p>
            <p style="color: #09090a; font-size: 16px; font-weight: 500">
              $0.00 USD
            </p>
          </div>
        </div>
        未登录
        <div v-else>
          <div
            style="
              display: flex;
              align-items: center;
              border-bottom: 1px solid #eceef0;
            "
          >
            <img
              src="./assets/个人中心.png"
              alt=""
              style="margin: 0 20px; width: 25px; height: 25px"
            />
            <p style="color: #09090a; font-size: 16px">My wallet</p>
          </div>
          <div style="line-height: 30px">
            <p style="color: #84858a; font-size: 14px; margin: 10px 20px">
              Connect with one of our available wallet infoproviders or create a
              new one.
            </p>
          </div>

          <ul
            style="
              margin: 0 20px;
              border: 1px solid #d4d4d4;
              border-radius: 10px;
            "
          >
            <li
              style="
                display: flex;
                align-items: center;
                border-bottom: 1px solid #eceef0;
              "
              v-for="(item, index) in walletimg.slice(0, a)"
              :key="index"
            >
              <img
                :src="item.img"
                alt=""
                style="width: 36px; height: 36px; margin: 0 20px"
              />
              <p style="color: #484848; font-size: 14px">{{ item.value }}</p>
            </li>
            <li
              style="text-align: center; color: #484848; font-size: 14px"
              @click="load"
            >
              Show more options
            </li>
          </ul>
        </div>
      </el-drawer> -->
    </el-header>

    <router-view />
    <div class="bottom">
      <div class="bottom_a">
        <img src="./assets/login.png" alt="" />
        <p
          style="
            font-size: 24px;
            font-family: Source Han Sans CN;
            font-weight: bold;
            color: #ffffff;
            margin: 20px 0;
          "
        >
          Join the creator ecosystem
        </p>
        <p
          style="
            width: 294px;
            height: 34px;
            font-size: 12px;
            font-family: Source Han Sans CN;
            font-weight: 500;
            color: #ffffff;
          "
        >
          If you and your team want to publish and push NFT, please contact
          nft@Meta World.com
        </p>
        <div class="bottom_b">
          <img
            src="./assets/WeChatead37cdb38c97fdd427f7dc5d266f2e2.png"
            alt=""
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import imgUrl from "./assets/xiaohuli.png";
export default {
  data() {
    return {
      cur: 1,
      a: 5,
      success: "",
      drawer: false,
      // imgUrl: [
      //   {
      //     img1: require("./assets/个人中心.png"),
      //   },
      //   {
      //     img2: require("./assets/个人中心选中.png"),
      //   },
      // ],
      walletimg: [
        {
          img: require("./assets/zu.png"),
          value: "MetaMask",
        },
        {
          img: require("./assets/zu.png"),
          value: "MetaMask",
        },
        {
          img: require("./assets/zu.png"),
          value: "MetaMask",
        },
        {
          img: require("./assets/zu.png"),
          value: "MetaMask",
        },
        {
          img: require("./assets/zu.png"),
          value: "MetaMask",
        },
        {
          img: require("./assets/zu.png"),
          value: "MetaMask",
        },
        {
          img: require("./assets/zu.png"),
          value: "MetaMask",
        },
        {
          img: require("./assets/zu.png"),
          value: "MetaMask",
        },
        {
          img: require("./assets/zu.png"),
          value: "MetaMask",
        },
        {
          img: require("./assets/zu.png"),
          value: "MetaMask",
        },
      ],
    };
  },

  computed: {
    imgSrc() {
      return this.cur == 3 ? this.imgUrl[1].img2 : this.imgUrl[0].img1;
    },
    weight() {
      if (this.success == "") {
        return "width: 600px;";
      }
    },
  },

  created() {},
  mounted() {},
  methods: {
    account() {
      this.$router.replace("/establish");
    },
    personalCenterFn() {
      // this.cur = 0;
      this.$router.push({ name: "personalCenter", params: { userId: "123" } });
      this.cur = 3;
    },
    goHome() {
      this.cur = 0;
      this.$router.push({ name: "Home", params: { userId: "123" } });
    },
    load() {
      this.a += 3;
    },
    open() {
      this.$alert(
        `<img src="${imgUrl}" style="width: 137px;height: 137px;" alt= "">`,
        "Please connect the wallet",
        {
          confirmButtonText: "Connecting Wallet",
          center: true,
          dangerouslyUseHTMLString: true,
        }
      ).then(() => {
        this.success = 200;
        this.$message({
          type: "success",
          message: "登录成功!",
        });
      });
    },
  },
};
</script>
<style lang="less" scoped>
.userlogin {
  // width: 147px;
  height: 38px;
  background: #0066ed;
  border-radius: 19px;
}
.create {
  // width: 88px;
  height: 38px;
  background: #d9e8ff;
  border-radius: 19px;
  color: #0066ed;
  font-family: Source Han Sans CN;
  font-weight: 400;
}
.loginSuccessful {
  width: 245px;
  height: 38px;
  float: right;
  line-height: 38px;
  background: #d9e8ff;
  align-items: center;
  border-radius: 19px;
  margin-left: 5px;
}
.loginSuccessful .lfet {
  width: 147px;
  height: 32px;
  float: left;
  line-height: 32px;
  margin: 3px 0 0 5px;
  border-radius: 16px;
  background-color: #fff;
}
.loginSuccessful .right {
  height: 32px;
  line-height: 32px;
  margin: 3px 0 0 5px;
  border-radius: 16px;
}
.loginSuccessful .right img {
  width: 24px;
  height: 24px;
}
.loginSuccessful .right span {
  font-size: 13px;
  font-family: Source Han Sans CN;
  font-weight: 400;
  color: #000000;
}
/deep/.el-input__inner {
  border-radius: 20px;
  padding-left: 45px;
}
.bottom {
  position: relative;
  height: 238px;
  background: #262b34;
  margin-top: 30px;
  // line-height: 118px;
  // text-align: center;
}
.bottom_a {
  width: 1200px;
  margin: 0 auto;
  padding: 35px 0;
}
.bottom_b {
  position: absolute;
  top: 0px;
  right: 540px;
  width: 464px;
  height: 220px;
}
.bottom_b img {
  width: 100%;
  height: 100%;
}
/deep/.el-button--mini,
.el-button--small {
  font-size: 12px;
  border-radius: 20px;
  border-radius: 50%;
}

.el-header {
  line-height: 60px;
  padding: 0;
  box-shadow: 0px 3px 4px 0px rgba(140, 140, 140, 0.19);
  z-index: 10;
}
.header-login {
  width: 99px;
  height: 30px;
  margin-left: 50px;
}
.header-input {
  display: inline-block;
  position: relative;
  width: 680px;
  margin-left: 210px;
}
.header-icon {
  float: right;
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-grow: 1;
  justify-content: flex-start;
  justify-content: space-between;
  // width: 750px;
  height: 60px;
}
.icon-public {
  margin-right: 20px;
  font-size: 16px;
}

.exhibition {
  height: 719px;
}
.exhibition-a {
  background-color: #fff;
  width: 1200px;
  height: 100%;
  margin: 0 auto;
}
.exhibition-b {
  text-align: center;
  font-size: 24px;
  color: #09090a;
  padding-top: 70px;
  padding-bottom: 60px;
}
.exhibition-c {
  width: 373px;
  height: 401px;
  background: #ffffff;
  border: 1px solid #d6d6d6;
  border-radius: 10px;
  margin-right: 25px;
  margin-top: 40px;
}
// .bottom {
//   height: 468px;
//   background-color: #262b34;
// }
.bottom-a {
  width: 1200px;
  padding-top: 60px;
  margin: 0 auto;
}
.bottom-b {
  color: #fffcfc;
  padding-top: 40px;
}
.bottom-c {
  cursor: pointer;
  color: #fffcfc;
  margin: 0 0 15px 20px;
}
hr {
  border: 1px solid #fff;
  margin-top: 55px;
  margin-bottom: 33px;
}
.el-carousel {
  margin: 0;
  padding: 0;
  border: 0;
  width: 100%;
  height: 100%;
}
/deep/ .el-carousel__container {
  height: 500px !important;
}

.el-carousel__indicators {
  bottom: 0;
}

/deep/ .el-carousel__indicators--outside {
  position: absolute;
  bottom: 0px;
  left: 50%;
  transform: translate(-50%);
  z-index: 5;
}
/deep/.el-carousel__button {
  width: 15px;
  height: 15px;
  border-radius: 7px;
  background-color: #2081e2;
}
.header-icon-a {
  margin-right: 20px;
  font-size: 18px;
  font-family: Source Han Sans CN;
  font-weight: 400;
  color: #333333;
}

.header-icon-a.active {
  color: #2081e2;
}
/deep/.el-drawer {
  width: 395px !important;
}
/deep/.el-dialog--center .el-dialog__body {
  text-align: left;
  padding-bottom: 10px;
}
/deep/.el-drawer.rtl {
  top: 60px !important;
}
</style>
