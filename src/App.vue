<template>
  <div id="app">
    <el-header id="headerStyle">
      <el-row>
        <el-col :span="4">
          <img src="./assets/logo.png" alt="" replace @click="goHome" />
        </el-col>
        <el-col :span="9">
          <div class="header-input">
            <el-autocomplete
              v-model="state"
              :fetch-suggestions="querySearchAsync"
              :trigger-on-focus="false"
              :placeholder="$t('home.search')"
              @select="handleSelect"
            >
            </el-autocomplete>
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
        </el-col>
        <el-col :span="11">
          <div class="header-icon">
            <router-link
              class="header-icon-a"
              :to="'/'"
              :class="{ active: cur === 1 ? true : false }"
              @click.native="cur = 1"
            >
              {{ $t("home.home") }}
            </router-link>

            <router-link
              class="header-icon-a"
              :to="'/bazaar'"
              :class="{ active: cur === 2 ? true : false }"
              @click.native="cur = 2"
            >
              {{ $t("home.Browse") }}
            </router-link>

            <router-link
              class="header-icon-a"
              :to="{
                name: 'personalCenter',
                params: { address: addres },
              }"
              :class="{ active: cur === 3 ? true : false }"
              @click.native="cur = 3"
            >
              {{ $t("home.Account") }}
            </router-link>

            <el-button type="primary" class="create" round @click="account()">
              {{ $t("home.Create") }}
            </el-button>

            <div v-if="showSuccess == 200" class="loginSuccessful">
              <p class="lfet">
                <img src="./assets/point.png" alt="" />
                <span>
                  {{ $t("home.LAN") }}
                </span>
              </p>
              <p class="right">
                <!-- <img src="./assets/Avatar.png" alt="" style="margin: 0 4px" /> -->
                <el-popover placement="bottom" trigger="click">
                  <p class="popoverstyle_a">
                    {{ address }}
                    <img
                      src="./assets/fz.png"
                      style="cursor: pointer"
                      alt=""
                      @click="copyText"
                    />
                  </p>
                  <p class="popoverstyle_b">{{ userName }}</p>
                  <div class="popoverstyle_c">
                    <img src="./assets/tx1.png" alt="" />
                    <p class="popoverstyle_c_a">Balance</p>
                    <p class="popoverstyle_c_b">{{ balance }} BNB</p>
                  </div>
                  <el-divider />
                  <p class="popoverstyle_d" @click="personalCenterFn">
                    My items
                  </p>
                  <p
                    class="popoverstyle_d"
                    @click="$router.push({ name: 'redactUser' })"
                  >
                    Edit profile
                  </p>
                  <el-button
                    id="userstyle"
                    slot="reference"
                    style="background-color: #d7e8fe"
                  >
                    {{ address }}
                    <span v-show="addres !== null" @click="addAddressFn"
                      >切换钱包</span
                    >
                    <span v-show="addres == null" @click="addAddressFn"
                      >连接钱包</span
                    >
                  </el-button>
                </el-popover>
              </p>
            </div>

            <el-button
              v-else
              type="primary"
              class="userlogin"
              round
              @click="$router.replace('/login')"
            >
              {{ $t("home.LoginWallet") }}
            </el-button>

            <el-col :span="2">
              <el-dropdown trigger="click" @command="handleCommand">
                <img
                  style="margin: 0 auto; height: 26px"
                  src="./assets/language.png"
                  alt=""
                />
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="a">{{
                    $t("lang.zh")
                  }}</el-dropdown-item>
                  <el-dropdown-item command="c">{{
                    $t("lang.en")
                  }}</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown></el-col
            >
          </div>
        </el-col>
      </el-row>
    </el-header>

    <router-view v-if="isRouterAlive" />

    <div id="apptest" :class="toRouter == 1 ? 'bottoms' : 'bottom'">
      <div class="bottom_a">
        <img src="./assets/logo_bottom.jpg" alt="" />
        <p
          style="
            font-size: 24px;
            font-family: Source Han Sans CN;
            font-weight: bold;
            color: #ffffff;
            margin: 20px 0;
          "
        >
          {{ $t("home.Invitealliance") }}
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
          {{ $t("home.email") }}
        </p>
        <div class="bottom_b">
          <tr>
            <td>{{ $t("home.bottom1") }}</td>
            <td>{{ $t("home.bottom2") }}</td>
            <td>{{ $t("home.bottom3") }}</td>
          </tr>
          <tr>
            <td>{{ $t("home.bottom4") }}</td>
            <td>{{ $t("home.bottom7") }}</td>
            <td>{{ $t("home.bottom8") }}</td>
          </tr>
          <tr>
            <td>{{ $t("home.bottom5") }}</td>
          </tr>
          <tr>
            <td>{{ $t("home.bottom6") }}</td>
          </tr>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $http from "./utils/request";

export default {
  provide() {
    return {
      reload: this.reload,
    };
  },
  data() {
    return {
      restaurants: [],
      restaurantList: [],
      state: "",
      timeout: null,
      isRouterAlive: true,
      address: "",
      addres: sessionStorage.getItem("address"),
      balance: 0,
      cur: 1,
      a: 5,
      showSuccess: "",
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
  },
  watch: {
    $route(to) {
      if (to.path == "/") {
        this.toRouter = 1;
      } else {
        this.toRouter = 2;
      }
      var arr = ["/login", "/register", "/reset"];
      var arr2 = arr.some(function (x) {
        return to.path == x;
      });
      if (arr2) {
        document.getElementById("headerStyle").style.display = "none";
        document.getElementById("apptest").style.display = "none";
      } else {
        document.getElementById("headerStyle").style.display = "block";
        document.getElementById("apptest").style.display = "block";
      }
    },
  },
  created() {},
  async mounted() {
    if (sessionStorage.getItem("showSuccess") == null) {
    } else {
      // this.address = this.SubStr(sessionStorage.getItem("address"));

      this.showSuccess = await sessionStorage.getItem("showSuccess");
      if (sessionStorage.getItem("address") == null) {
        this.address = "Connect Wallet";
      } else {
        this.address = this.SubStr(sessionStorage.getItem("address"));
      }
    }

    if (sessionStorage.getItem("address") == null) {
      console.log();
    } else {
      this.showSuccess = await sessionStorage.getItem("showSuccess");
      this.userName = await sessionStorage.getItem("userInfo");
      // this.address = await sessionStorage.getItem("showAddress");
      this.balance = await sessionStorage.getItem("balance");
    }
  },
  async beforeUpdate() {
    if (sessionStorage.getItem("address") == null) {
      console.log();
    } else {
      this.showSuccess = await sessionStorage.getItem("showSuccess");
      this.userName = await sessionStorage.getItem("userInfo");
      // this.address = await sessionStorage.getItem("showAddress");
      this.balance = await sessionStorage.getItem("balance");
    }
  },
  methods: {
    addAddressFn() {
      this.$router.replace("/bind");
    },
    async querySearchAsync(queryString, cb) {
      const resp = await $http.get(`v1/explore/list?keyword=${queryString}`);
      this.restaurants = [];
      resp.list.forEach((item) => {
        this.restaurants.push({
          value: item.prop_name,
          values: item.creator_user_name,
          address: item.prop_desc,
          token: item.token,
          token_id: item.token_id,
        });
      });
      // console.log(this.restaurants);
      var restaurants = this.restaurants;
      var results = restaurants.filter(this.createStateFilter(queryString));
      // 调用 callback 返回建议列表的数据
      cb(results);
    },

    createStateFilter(queryString) {
      return (restaurant) => {
        return (
          restaurant.value ||
          values.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        );
      };
    },

    handleSelect(item) {
      this.$router.push({
        name: "details",
        params: { id: item.token_id, token: item.token },
      });
      if (this.$route.name == "details") {
        location.reload();
      }
    },

    personalCenterFn() {
      this.$router.push({
        name: "personalCenter",
        params: { address: this.addres },
      });
    },

    handleCommand(command) {
      if (command == "a") {
        localStorage.setItem("language", "zh-cn");
        this.$i18n.locale = localStorage.getItem("language");
        // console.log(this.$i18n.locale);
      } else {
        localStorage.setItem("language", "en-us");
        this.$i18n.locale = localStorage.getItem("language");
      }
    },

    reload() {
      this.isRouterAlive = false;
      this.$nextTick(function () {
        this.isRouterAlive = true;
      });
    },

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
      var subStr1 = str.slice(0, 4);
      var subStr2 = str.slice(str.length - 4, 42);
      var subStr = subStr1 + "..." + subStr2;
      return subStr;
    },

    account() {
      this.$router.replace("/establish");
    },

    goHome() {
      this.cur = 0;
      this.$router.replace("/");
    },
  },
};
</script>
<style lang="less" scoped>
/deep/.el-row {
  width: 100%;
  text-align: center;
  display: flex;
  align-items: center;
}
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
  span {
    border-radius: 20px;
    padding: 5px 10px;
    color: #0066ed;
    margin-left: 5px;
    background-color: #ffffff;
  }
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
  height: 38px;
  background: #d9e8ff;
  border-radius: 19px;
  color: #0066ed;
  font-family: Source Han Sans CN;
  font-weight: 400;
  font-size: 13px;
  margin-right: 20px;
}

.loginSuccessful {
  height: 38px;
  line-height: 38px;
  display: flex;
  background: #d9e8ff;
  align-items: center;
  border-radius: 19px;
  margin-left: 5px;
}

.loginSuccessful .lfet {
  height: 32px;
  line-height: 32px;
  margin-left: 5px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  img {
    width: 24px;
    height: 24px;
    margin: 0 5px;
  }
  span {
    margin-right: 10px;
    white-space: pre;
  }
  background-color: #fff;
}

.loginSuccessful .right {
  height: 32px;
  line-height: 32px;
  margin: 0 5px;
  border-radius: 16px;
  display: flex;
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

.header-input {
  display: inline-block;
  position: relative;
  width: 100%;
  // margin-left: 210px;
  /deep/.el-autocomplete {
    width: 100%;
  }
}

.header-icon {
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-grow: 1;
  justify-content: flex-end;
  width: 100%;
  height: 60px;
  padding-left: 30px;
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
  margin-right: 40px;
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
/deep/.el-col-11 {
  width: 47.83333%;
}
</style>
