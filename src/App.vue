/* eslint-disable vue/this-in-template */
<template>
  <div id="app">
    <el-header>
      <img
        src="./assets/login.png"
        alt=""
        class="header-login"
        replace
        @click="goHome"
      >
      <div class="header-input">
        <el-input placeholder="Search by creator collectible or collection " />
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
        >
      </div>
      <div class="header-icon">
        <router-link
          class="header-icon-a"
          :to="'/'"
          :class="{ active: cur === 1 ? true : false }"
          @click.native="cur = 1"
        >
          Home
        </router-link>
        <router-link
          class="header-icon-a"
          :to="'/bazaar'"
          :class="{ active: cur === 2 ? true : false }"
          @click.native="cur = 2"
        >
          Browse
        </router-link>
        <router-link
          class="header-icon-a"
          :to="'/personalCenter'"
          :class="{ active: cur === 3 ? true : false }"
          @click.native="cur = 3"
        >
          Account
        </router-link>
        <el-button type="primary" class="create" round @click="account()">
          Create
        </el-button>

        <div v-if="success == 200" class="loginSuccessful">
          <p class="lfet">
            <img src="./assets/point.png" alt="" style="margin: 0 4px">
            <span>BSC Mainnet</span>
          </p>
          <p class="right">
            <img src="./assets/Avatar.png" alt="" style="margin: 0 4px">
            <el-popover placement="bottom" trigger="click">
              <p class="popoverstyle_a">
                {{ address }}
                <img
                  src="./assets/fz.png"
                  style="cursor: pointer"
                  alt=""
                  @click="copyText"
                >
              </p>
              <p class="popoverstyle_b">Set display name</p>
              <div class="popoverstyle_c">
                <img src="./assets/tx1.png" alt="">
                <p class="popoverstyle_c_a">Balance</p>
                <p class="popoverstyle_c_b">{{ balance }} BNB</p>
              </div>
              <el-divider />
              <p
                class="popoverstyle_d"
                @click="$router.push({ name: 'personalCenter' })"
              >
                My items
              </p>
              <p class="popoverstyle_d">Edit profile</p>
              <el-button
                id="userstyle"
                slot="reference"
                style="background-color: #d7e8fe"
              >
                {{ userName || "未设置" }}
              </el-button>
            </el-popover>
          </p>
        </div>
        <el-button v-else type="primary" class="userlogin" round @click="open">
          Link wallet
        </el-button>

        <img
          style="margin: 0 10px; height: 26px"
          src="./assets/language.png"
          alt=""
        >
      </div>
    </el-header>

    <router-view />

    <div :class="toRouter == 1 ? 'bottoms' : 'bottom'">
      <div class="bottom_a">
        <img src="./assets/login.png" alt="">
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
          <tr>
            <td>ABOUT US</td>
            <td>WHITE PAPER</td>
            <td>AUDIT REPORT</td>
          </tr>
          <tr>
            <td>COMPANY VISION</td>
            <td>COMPANY VISIONT</td>
            <td>HOW TO BUY</td>
          </tr>
          <tr>
            <td>CONTACT US</td>
          </tr>
          <tr>
            <td>BUSINESS COOPERATION</td>
          </tr>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import imgUrl from "./assets/xiaohuli.png";
import { initWallet, getBalance } from "./wallet/wallet";
import { userInfoApi } from "./api/user";

export default {
  data() {
    return {
      address: "",
      addres: "",
      balance: 0,
      cur: 1,
      a: 5,
      success: "",
      drawer: false,
      toRouter: "",
      userInfo: {},
      userName: "",
    };
  },
  computed: {
    imgSrc() {
      return this.cur == 3 ? this.imgUrl[1].img2 : this.imgUrl[0].img1;
    },
    // eslint-disable-next-line vue/return-in-computed-property
    weight() {
      if (this.success == "") {
        return "width: 600px;";
      }
    },
  },
  watch: {
    $route(to) {
      if (to.path == "/") {
        this.toRouter = 1;
      } else {
        this.toRouter = 2;
      }
    },
  },
  // async beforeUpdate() {
  //   const { data: data } = await userInfoApi(this.addres);
  //   sessionStorage.setItem("userInfo", data.user_name);
  //   this.userName = await sessionStorage.getItem("userInfo");
  // },
  created() {},
  async mounted() {
    if (sessionStorage.getItem("address") == null) {
      this.success = "";
    } else {
      this.success = 200;
      this.userName = await sessionStorage.getItem("userInfo");
      this.address = await sessionStorage.getItem("showAddress");
      this.balance = await sessionStorage.getItem("balance");
    }
  },
  async beforeUpdate() {
    if (sessionStorage.getItem("address") == null) {
      this.success = "";
    } else {
      this.success = 200;
      this.userName = await sessionStorage.getItem("userInfo");
      this.address = await sessionStorage.getItem("showAddress");
      this.balance = await sessionStorage.getItem("balance");
    }
  },
  methods: {
    copyText() {
      var input = document.createElement("input"); // js创建一个input输入框
      input.value = this.addres; // 将需要复制的文本赋值到创建的input输入框中
      document.body.appendChild(input); // 将输入框暂时创建到实例里面
      input.select(); // 选中输入框中的内容
      document.execCommand("Copy"); // 执行复制操作
      document.body.removeChild(input); // 最后删除实例中临时创建的input输入框，完成复制操作
      this.$message({
        message: "复制成功",
        type: "success",
      });
    },

    SubStr(str) {
      var subStr1 = str.slice(0, 6);
      var subStr2 = str.slice(str.length - 5, 42);
      var subStr = subStr1 + "..." + subStr2;
      return subStr;
    },

    account() {
      this.$router.replace("/establish");
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
  },
};
</script>
<style lang="less" scoped>
#userstyle {
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  background: #fff;
  border: 0;
  color: #606266;
  -webkit-appearance: none;
  text-align: center;
  box-sizing: border-box;
  outline: 0;
  margin: 0;
  transition: 0.1s;
  font-weight: 500;
  padding: 0;
  font-size: 14px;
  border-radius: 4px;
}
.bottom_b tr td {
  width: 200px;
  cursor: pointer;
}
.popoverstyle_a {
  height: 13px;
  font-size: 16px;
  font-family: Source Han Sans CN;
  font-weight: bold;
  color: #333333;
  line-height: 32px;
}
.popoverstyle_b {
  height: 15px;
  font-size: 14px;
  font-family: Source Han Sans CN;
  font-weight: 400;
  color: #0066ed;
  line-height: 32px;
  margin: 15px 0 25px;
}
.popoverstyle_c {
  height: 47px;
  line-height: 18px;
  margin-bottom: 35px;
}
.popoverstyle_c img {
  float: left;
  width: 47px;
  height: 47px;
  margin-right: 20px;
}
.popoverstyle_c_a {
  font-size: 16px;
  font-family: Source Han Sans CN;
  font-weight: 400;
  color: #333333;
}
.popoverstyle_c_b {
  font-size: 16px;
  font-family: Source Han Sans CN;
  font-weight: bold;
  color: #333333;
  line-height: 32px;
}
.popoverstyle_d {
  font-size: 18px;
  font-family: Source Han Sans CN;
  font-weight: 500;
  color: #333333;
  line-height: 34px;
  cursor: pointer;
}
.el-divider--horizontal {
  margin: 20px 0;
}
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
  font-size: 13px;
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
.bottoms {
  position: relative;
  height: 238px;
  background: #262b34;
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
  line-height: 30px;
  margin-top: 55px;
  // text-align: center;
  font-size: 10px;
  font-family: Source Han Sans CN;
  font-weight: 500;
  color: #f0f0f0;
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
/deep/.el-drawer.rtl {
  top: 60px !important;
}
</style>
