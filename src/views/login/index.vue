<template>
  <div class="loginStyle">
    <div class="login">
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        status-icon
        label-width="100px"
        class="demo-ruleForm"
        label-position="right"
      >
        <el-form-item label="账号">
          <el-input v-model="ruleForm.age" placeholder="请输入账号" />
        </el-form-item>
        <el-form-item label="密码">
          <el-input
            v-model="ruleForm.pass"
            type="password"
            placeholder="请输入密码"
            autocomplete="off"
          />
        </el-form-item>

        <el-form-item id="formSubmit">
          <el-button
            type="primary"
            class="logStyle"
            round
            @click="submitForm('ruleForm')"
          >
            登录
          </el-button>
          <el-button class="logStyle" round @click="resetForm('ruleForm')">
            注册
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: {
        pass: "",
        checkPass: "",
        age: "",
      },
      // rules: {
      //   pass: [{ validator: validatePass, trigger: "blur" }],
      //   checkPass: [{ validator: validatePass2, trigger: "blur" }],
      //   age: [{ validator: checkAge, trigger: "blur" }],
      // },
    };
  },
  computed: {},
  mounted() {},
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style scoped lang='less'>
.logStyle {
  width: 120px;
}
.el-form {
  padding-top: 60px;
}
/deep/ .el-form-item {
  margin-bottom: 30px;
}
#formSubmit {
  margin-left: 25px;
}
/deep/ .el-form-item__label {
  width: 40px !important;
  margin-left: 40px;
}
/deep/ .el-form-item__content {
  // margin-left: 40px !important;
  margin-right: 40px !important;
}
/deep/.el-input__inner {
  padding-left: 20px;
}
.loginStyle {
  width: 100%;
  height: 540px;
  padding-top: 150px;
}
.login {
  width: 500px;
  height: 300px;
  margin: 0 auto;
  border-radius: 15px;
  border: 1px solid #ccc;
  // background-color: #ccc;
}
</style>
