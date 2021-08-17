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

        <h3>
          Enter your email address to register an account
        </h3>

        <el-form-item label="Email address" prop="age">
          <el-input v-model="ruleForm.age" placeholder="请输入邮箱账号">
          </el-input>
        </el-form-item>

        <el-form-item label="Password" prop="password">
          <el-input
            v-model="ruleForm.password"
            type="password"
            placeholder="请输入密码"
            autocomplete="off"
          />
        </el-form-item>

        <el-form-item label="Verification code" prop="code">
          <el-input v-model="ruleForm.code" placeholder="请输入验证码">
            <el-button v-show="show" slot="append" @click="getCode(ruleForm)">
              获取验证码
            </el-button>
          </el-input>
          <span v-show="!show" class="count">{{ count }} s</span>
        </el-form-item>

        <el-form-item id="formSubmit">
          <el-button
            type="primary"
            class="logStyle"
            @click="submitForm('ruleForm')"
          >
            Register
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import $http from "../../utils/request";

export default {
  data() {
    return {
      show: true,
      count: "",
      timer: null,
      ruleForm: {
        code: "",
        age: "",
        password: ""
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
            message: "Please enter a valid email address",
            trigger: ["blur", "change"]
          }
        ],
        code: [
          {
            required: true,
            message: "please enter verification code",
            trigger: "blur"
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
    async getCode(e) {
      const TIME_COUNT = 60;
      if (!this.timer) {
        this.count = TIME_COUNT;
        this.show = false;
        this.timer = setInterval(() => {
          if (this.count > 0 && this.count <= TIME_COUNT) {
            this.count--;
          } else {
            this.show = true;
            clearInterval(this.timer);
            this.timer = null;
          }
        }, 1000);
      }
      let formData = new FormData();
      formData.append("email", e.age);
      formData.append("sendtype", 0);
      const resp = await $http.post("/v1/account/vcode", formData);
      if (resp.code == 200) {
        this.$message({
          message: "验证码已发送",
          type: "success"
        });
      }
    },

    submitForm(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          let formData = new FormData();
          formData.append("email", this.ruleForm.age);
          formData.append("password", this.ruleForm.password);
          formData.append("code", this.ruleForm.code);
          const resp = await $http.post("/v1/account/create", formData);
          if (resp.code == 200) {
            this.$message({
              message: "注册成功",
              type: "success"
            });
            this.$router.replace("/login");
          } else if (resp.code == 500) {
            this.$message.error("账号已存在或验证码错误");
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
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
        margin-bottom: 20px;
        margin-top: 20px;
      }
      h3 {
        margin-bottom: 70px;
      }
      /deep/.el-input__inner {
        border: 0;
        padding: 0;
        border-radius: 0;
        border-bottom: 1px solid #f2f2f2;
      }
      /deep/.el-button--primary {
        margin-top: 15px;
        width: 234px;
        height: 48px;
        background: #0066ed;
        border-radius: 4px;
      }
      /deep/.el-input-group__append,
      .el-input-group__prepend {
        border: 0;
        background-color: #fff;
        border-bottom: 1px solid #f2f2f2;
      }
      .count {
        position: absolute;
        top: 0;
        width: 30px;
        margin-left: -30px;
      }
    }
  }
}
</style>
