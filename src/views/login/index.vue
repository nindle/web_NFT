<template>
  <div class="loginStyle">
    <div class="loginStyleleft"></div>
    <div class="loginStyleright">
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        status-icon
        label-width="100px"
        class="demo-ruleForm"
        label-position="top"
        :rules="rules"
      >
        <h2>Sign in to LionNFT</h2>

        <el-form-item label="Email address" prop="age">
          <el-input v-model="ruleForm.age" placeholder="请输入邮箱账号" />
        </el-form-item>

        <el-form-item label="Password" prop="password">
          <p class="forgotPassword" @click="$router.replace('/reset')">
            forgot password？
          </p>
          <el-input
            v-model="ruleForm.password"
            type="password"
            placeholder="请输入密码"
            autocomplete="off"
          />
        </el-form-item>

        <el-form-item id="formSubmit">
          <el-button
            type="primary"
            class="logStyle"
            @click="submitForm('ruleForm')"
          >
            Sign In
          </el-button>
        </el-form-item>

        <p>
          Don’t have an account?
          <span @click="$router.push({ name: 'register' })">Get started</span>
        </p>
      </el-form>
    </div>
  </div>
</template>

<script>
import $http from "../../utils/request";
import { getBalance, initWallet } from "../../wallet/wallet";
import { ethers } from "ethers";

export default {
  data() {
    return {
      userInfo: {},
      ruleForm: {
        password: "",
        age: ""
      },
      rules: {
        age: [
          {
            required: true,
            message: "Please input the email address",
            trigger: "blur"
          },
          {
            type: "email",
            message: "Please enter a valid email address.",
            trigger: ["blur", "change"]
          }
        ],
        password: [
          {
            required: true,
            message: "Please enter the password",
            trigger: "blur"
          }
        ]
      }
    };
  },
  computed: {},
  mounted() {},
  methods: {
    async submitForm(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          let formData = new FormData();
          formData.append("email", this.ruleForm.age);
          formData.append("password", this.ruleForm.password);
          const resp = await $http({
            method: "POST",
            url: "/v1/account/login",
            withCredentials: true,
            data: formData
          });
          sessionStorage.setItem("emailWalletAddress", resp.data);
          this.userInfo = resp;
          if (resp.code == 200) {
            console.log(this.userInfo);
            if (this.userInfo.data == null) {
              this.$message({
                message: "未绑定钱包地址",
                type: "warning"
              });
              sessionStorage.setItem("showSuccess", 200);
              this.$router.replace("/bind");
            } else if (this.userInfo.data == "") {
              this.$message({
                message: "未绑定钱包地址",
                type: "warning"
              });
              sessionStorage.setItem("showSuccess", 200);
              this.$router.replace("/bind");
            } else {
              const address = await initWallet();
              console.log(address);
              if (this.userInfo.data == address) {
                sessionStorage.setItem("address", address);
                const data = await $http.get(
                  `/v1/account?address=${this.userInfo.data}`
                );
                if (data.code == 500) {
                  this.$message({
                    message: "个人信息为空",
                    type: "warning"
                  });
                  this.$router.replace("/redactUser");
                } else if ((data.code = 200)) {
                  const userData = data.data;
                  sessionStorage.setItem("userInfo", userData.user_name);
                  sessionStorage.setItem(
                    "showAddress",
                    this.SubStr(userData.user_address.toString())
                  );
                  sessionStorage.setItem("balance", await getBalance());
                  this.$message({
                    message: "登录成功",
                    type: "success"
                  });
                  sessionStorage.setItem("showSuccess", 200);
                  this.$router.push({
                    name: "personalCenter",
                    params: { address: address }
                  });
                }
              } else {
                this.$message.error("登录钱包与绑定钱包不一致");
              }
            }
          } else if (resp.code == 500) {
            this.$message.error("登录失败");
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
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
  height: 100%;
  .loginStyleleft {
    width: 516px;
    height: 100%;
    background: url("../../assets/login/left.png");
    background-size: cover;
  }
  .loginStyleright {
    flex: 1;
    display: flex;
    .el-form {
      width: 444px;
      height: 568px;
      padding: 30px 40px;
      background: #ffffff;
      /deep/.el-form-item__label {
        font-size: 16px;
        font-family: Arial-BoldMT, Arial;
        font-weight: normal;
        color: #000000;
        line-height: 18px;
      }
      box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.06);
      border-radius: 16px;
      border: 1px solid #f2f2f2;
      margin: auto;
      align-items: center;
      h2 {
        font-size: 24px;
        font-family: Arial-BoldMT, Arial;
        font-weight: normal;
        color: #000000;
        line-height: 28px;
        margin: 40px 0 70px;
      }
      /deep/.el-input__inner {
        border: 0;
        padding: 0;
        border-radius: 0;
        border-bottom: 1px solid #f2f2f2;
      }
      /deep/.el-button--primary {
        margin-top: 30px;
        width: 234px;
        height: 48px;
        background: #0066ed;
        border-radius: 4px;
      }
      p {
        font-size: 14px;
        font-family: ArialMT;
        color: #000000;
        line-height: 16px;
        span {
          font-size: 14px;
          font-family: Arial-BoldMT, Arial;
          font-weight: normal;
          color: #0066ed;
          line-height: 16px;
          cursor: pointer;
        }
      }
      .forgotPassword {
        position: absolute;
        z-index: 10;
        top: -29px;
        right: 45px;
        font-size: 16px;
        font-family: ArialMT;
        color: #0066ed;
        line-height: 18px;
        cursor: pointer;
      }
    }
  }
}
</style>
