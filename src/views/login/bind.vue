<template>
  <div class="loginStyle">
    <div class="loginStyleright">
      <el-card class="bind_card">
        <h3>Connect Your Wallet</h3>
        <img src="../../assets/login/metamask.png" alt="" />
        <p>MetaMask</p>

        <div class="bind_div">{{ address }}</div>

        <el-button type="primary" @click="getAddress">
          {{ buttonValue == false ? "binding" : "unbundle" }}
        </el-button>

        <span class="bind_span">
          Connect with MetaMask to securely store your digital assets and crypto
          currencies.
        </span>
      </el-card>
    </div>
  </div>
</template>

<script>
import $http from "../../utils/request";
import { getBalance, initWallet } from "../../wallet/wallet";

export default {
  data() {
    return {
      address: sessionStorage.getItem("address"),
      buttonValue: false
    };
  },
  computed: {},
  mounted() {
    if (sessionStorage.getItem("address") !== null) {
      this.buttonValue = true;
    }
    console.log(this.buttonValue);
  },

  methods: {
    async getAddress() {
      if (this.buttonValue == true) {
        const resp = await $http({
          method: "GET",
          withCredentials: true,
          url: "/v1/account/bind_address"
        });
        console.log(resp);
        if (resp.code == 200) {
          this.$message({
            message: "钱包解绑成功",
            type: "success"
          });
          sessionStorage.setItem("address", "");
          this.address = "";
          this.buttonValue = false;
        } else if (resp.code == 401) {
          this.$message({
            message: "账号未登录",
            type: "warning"
          });
        }
      } else {
        this.address = await initWallet();
        sessionStorage.setItem("address", this.address);
        let formData = new FormData();
        formData.append("address", this.address);
        const resp = await $http({
          method: "POST",
          url: "/v1/account/bind_address",
          withCredentials: true,
          data: formData
        });
        if (resp.code == 200) {
          this.$message({
            message: "钱包绑定成功",
            type: "success"
          });
          const data = await $http.get(`/v1/account?address=${this.address}`);
          const dataResp = data.data;
          if (data.code == 200) {
            sessionStorage.setItem("userInfo", dataResp.user_name);
            sessionStorage.setItem(
              "showAddress",
              this.SubStr(dataResp.user_address.toString())
            );
            sessionStorage.setItem("balance", await getBalance());
          }
          sessionStorage.setItem("showSuccess", 200);
          this.$router.push({
            name: "personalCenter",
            params: { address: this.address }
          });
        } else if (resp.code == 401) {
          this.$message({
            message: "账号未登录",
            type: "warning"
          });
          this.buttonValue = true;
          this.$router.push({
            name: "login"
          });
        } else if (resp.code == 500) {
          this.$message({
            message: "钱包已绑定",
            type: "warning"
          });
          this.$router.push({
            name: "personalCenter",
            params: { address: this.address }
          });
        }
      }
    },
    SubStr(str) {
      var subStr1 = str.slice(0, 6);
      var subStr2 = str.slice(str.length - 5, 42);
      var subStr = subStr1 + "..." + subStr2;
      return subStr;
    }
  }
};
</script>

<style scoped lang="less">
.loginStyle {
  display: flex;
  width: 100%;
  .loginStyleright {
    flex: 1;
    display: flex;
    margin: auto;
    justify-content: center;
    .bind_card {
      width: 444px;
      height: 568px;
      background: #ffffff;
      border-radius: 16px;
      border: 1px solid #f2f2f2;
      h3 {
        text-align: center;
        font-size: 24px;
        font-family: Arial-BoldMT, Arial;
        font-weight: normal;
        color: #09090a;
        line-height: 28px;
        margin: 40px 0;
      }
      img {
        width: 86px;
        height: 79px;
        margin: 0 auto;
        margin-bottom: 23px;
      }
      p {
        font-size: 24px;
        font-family: ArialMT;
        color: #09090a;
        line-height: 28px;
        margin: 0 auto;
        margin-bottom: 78px;
      }
      .el-button {
        width: 234px;
        height: 48px;
        background: #0066ed;
        border-radius: 4px;
        margin: 0 auto;
      }

      /deep/.el-card__body {
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
      }
      .bind_span {
        font-size: 14px;
        width: 342px;
        font-family: ArialMT;
        color: #898989;
        line-height: 16px;
        text-align: center;
        margin-top: 30px;
      }
      .bind_div {
        width: 334px;
        height: 25px;
        margin-bottom: 20px;
        border-bottom: 1px solid #f2f2f2;
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #09090a;
        line-height: 20px;
      }
    }
  }
}
</style>
