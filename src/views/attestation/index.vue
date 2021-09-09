<template>
  <div class="fromStyle" v-loading="dialogVisibleLoading">
    <div class="attestationTitle">
      <div class="attestationCss">
        <div class="attestationCss_a">
          <p>Personal Verification</p>
          <img src="../../assets/kyc0.png" alt="" />
        </div>
        <div class="attestationCss_b">
          <i class="el-icon-s-custom"></i>
          <p>Your Current Limit</p>
        </div>
      </div>
    </div>

    <div class="attestationStyle">
      <div class="attestationStyle_a">
        <p class="attestationStyle_a_a">Current</p>
        <p class="attestationStyle_a_b"><span></span> Email</p>
        <p class="attestationStyle_a_c">
          <i class="el-icon-circle-check"></i> Registered
        </p>
        <p class="attestationStyle_a_d">Transaction type</p>
        <p class="attestationStyle_a_e">No type</p>
        <p class="attestationStyle_a_f">transaction amount</p>
        <p
          style="
            font-size: 14px;
            font-family: HelveticaNeue-Medium, HelveticaNeue;
            font-weight: 500;
            color: #09090a;
          "
        >
          No amount
        </p>
      </div>

      <div class="attestationStyle_a">
        <p class="attestationStyle_a_a">Basic</p>
        <p class="attestationStyle_a_b">
          <span></span> All Corrent requirements
        </p>
        <p class="attestationStyle_a_b"><span></span> Personal Information</p>
        <p class="attestationStyle_a_b"><span></span> ID number</p>
        <p class="attestationStyle_a_b" style="margin-bottom: 35px">
          <span></span> Review time: 10 days
        </p>
        <el-button
          v-if="attestationOne == 'null'"
          type="primary"
          class="attestationStyle_a_btn"
          @click="attestationOneFn"
          >Verify Now</el-button
        >
        <p class="attestationStyle_a_c_btn" v-else>
          <i class="el-icon-circle-check"></i> Registered
        </p>
        <p class="attestationStyle_a_d">Transaction type</p>
        <p class="attestationStyle_a_e">Excluding auction type transactions</p>
        <p class="attestationStyle_a_f">transaction amount</p>
        <p
          style="
            font-size: 14px;
            font-family: HelveticaNeue-Medium, HelveticaNeue;
            font-weight: 500;
            color: #09090a;
          "
        >
          0 <i class="el-icon-arrow-left"></i> transaction amount
          <i class="el-icon-arrow-left"></i> 1BNB
        </p>
      </div>

      <div class="attestationStyle_a">
        <p class="attestationStyle_a_a">Advanced</p>
        <p class="attestationStyle_a_b"><span></span> All Basic requirements</p>
        <p class="attestationStyle_a_b">
          <span></span> the front and back photos of the certificate
        </p>
        <p class="attestationStyle_a_b" style="margin-bottom: 72px">
          <span></span> Review time: 10 days
        </p>
        <el-button
          v-if="attestationTwo"
          :class="btn ? 'attestationStyle_a_btns' : 'attestationStyle_a_btn'"
          type="info"
          :disabled="btn"
          @click="dialogVisibleSf = true"
        >
          Verify Now
        </el-button>
        <p class="attestationStyle_a_c_btn" v-else>
          <i class="el-icon-circle-check"></i> Registered
        </p>
        <p class="attestationStyle_a_d">Transaction type</p>
        <p class="attestationStyle_a_e">All types of transactions</p>
        <p class="attestationStyle_a_f">transaction amount</p>
        <p
          style="
            font-size: 14px;
            font-family: HelveticaNeue-Medium, HelveticaNeue;
            font-weight: 500;
            color: #09090a;
          "
        >
          0 <i class="el-icon-arrow-right"></i> 0U, No limit
        </p>
      </div>
    </div>

    <el-dialog
      title=""
      :visible.sync="dialogVisible"
      width="30%"
      custom-class="formCard"
    >
      <h2 class="Advancedh2">Basic Verification</h2>
      <el-form
        :model="ruleFormData"
        :rules="rules"
        ref="ruleFormData"
        label-width="100px"
        label-position="top"
      >
        <el-form-item label="姓名" prop="name">
          <el-input v-model="ruleFormData.name"></el-input>
        </el-form-item>
        <el-form-item label="国家" prop="country">
          <el-input v-model="ruleFormData.country"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="telephone">
          <el-input v-model="ruleFormData.telephone"></el-input>
        </el-form-item>
        <el-form-item label="身份证号" prop="idcard">
          <el-input v-model="ruleFormData.idcard"></el-input>
        </el-form-item>
        <el-form-item class="clickBtn">
          <el-button
            type="primary"
            class="dialog_btn"
            @click="submitForm('ruleFormData')"
            >立即认证</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>

    <el-dialog
      title=""
      :visible.sync="dialogVisibleSf"
      width="30%"
      custom-class="idCard"
    >
      <h2 class="Advancedh2">Advanced Verification</h2>
      <h3 class="Advancedh3">Upload Image of ID Card</h3>

      <div class="idTips">
        <img src="../../assets/IDTips1.png" alt="" />
        <img src="../../assets/IDTips2.png" alt="" />
        <img src="../../assets/IDTips3.png" alt="" />
      </div>
      <p
        style="
          font-size: 12px;
          font-family: HelveticaNeue;
          color: #7a7a7a;
          margin-bottom: 16px;
        "
      >
        File size must be between <i class="el-icon-arrow-left"></i> 5120KB in
        ..jpg/.jpeg/.png format.
      </p>
      <div style="display: flex; justify-content: space-between">
        <el-upload
          class="upload-demo"
          action="#"
          :auto-upload="false"
          :on-change="fileChange"
          list-type="picture-card"
        >
          <div style="margin: 25% 0">
            <i slot="default" class="el-icon-plus"> </i>
            <p class="el-upload__text">Upload Front Page</p>
          </div>
        </el-upload>
        <el-upload
          class="upload-demo"
          action="#"
          :auto-upload="false"
          :on-change="fileChange"
          list-type="picture-card"
        >
          <div style="margin: 25% 0">
            <i slot="default" class="el-icon-plus"> </i>
            <p class="el-upload__text">Upload Back Page</p>
          </div>
        </el-upload>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button class="dialog_btn" type="primary" @click="postIdCardFn"
          >Verify</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import $http from "../../utils/request";
import AWS from "aws-sdk";
import { initWallet } from "../../wallet/wallet";
export default {
  data() {
    return {
      file: "",
      attestationOne: sessionStorage.getItem("authentication"),
      attestationTwo: true,
      btn: true,
      dialogVisible: false,
      dialogVisibleSf: false,
      dialogVisibleLoading: false,
      asd: true,
      identityCardEmail: sessionStorage.getItem("email"),
      ruleFormData: {
        name: "",
        country: "",
        idcard: "",
        telephone: "",
      },
      rules: {
        name: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 2 到 8 个字符", trigger: "blur" },
        ],
        country: [{ required: true, message: "请输入地区", trigger: "blur" }],
        idcard: [
          { required: true, message: "请输入身份证号", trigger: "blur" },
          // {
          //   //自定义身份证号验证
          //   validator: (rule, value, callback) => {
          //     var checkCode = function(val) {
          //       var p = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
          //       var factor = [
          //         7,
          //         9,
          //         10,
          //         5,
          //         8,
          //         4,
          //         2,
          //         1,
          //         6,
          //         3,
          //         7,
          //         9,
          //         10,
          //         5,
          //         8,
          //         4,
          //         2
          //       ];
          //       var parity = [1, 0, "X", 9, 8, 7, 6, 5, 4, 3, 2];
          //       var code = val.substring(17);
          //       if (p.test(val)) {
          //         var sum = 0;
          //         for (var i = 0; i < 17; i++) {
          //           sum += val[i] * factor[i];
          //         }
          //         if (parity[sum % 11] == code.toUpperCase()) {
          //           return true;
          //         }
          //       }
          //       return false;
          //     };
          //     var checkDate = function(val) {
          //       var pattern = /^(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)$/;
          //       if (pattern.test(val)) {
          //         var year = val.substring(0, 4);
          //         var month = val.substring(4, 6);
          //         var date = val.substring(6, 8);
          //         var date2 = new Date(year + "-" + month + "-" + date);
          //         if (date2 && date2.getMonth() == parseInt(month) - 1) {
          //           return true;
          //         }
          //       }
          //       return false;
          //     };
          //     var checkProv = function(val) {
          //       var pattern = /^[1-9][0-9]/;
          //       var provs = {
          //         11: "北京",
          //         12: "天津",
          //         13: "河北",
          //         14: "山西",
          //         15: "内蒙古",
          //         21: "辽宁",
          //         22: "吉林",
          //         23: "黑龙江 ",
          //         31: "上海",
          //         32: "江苏",
          //         33: "浙江",
          //         34: "安徽",
          //         35: "福建",
          //         36: "江西",
          //         37: "山东",
          //         41: "河南",
          //         42: "湖北 ",
          //         43: "湖南",
          //         44: "广东",
          //         45: "广西",
          //         46: "海南",
          //         50: "重庆",
          //         51: "四川",
          //         52: "贵州",
          //         53: "云南",
          //         54: "西藏 ",
          //         61: "陕西",
          //         62: "甘肃",
          //         63: "青海",
          //         64: "宁夏",
          //         65: "新疆",
          //         71: "台湾",
          //         81: "香港",
          //         82: "澳门"
          //       };
          //       if (pattern.test(val)) {
          //         if (provs[val]) {
          //           return true;
          //         }
          //       }
          //       return false;
          //     };
          //     if (checkCode(value)) {
          //       var date = value.substring(6, 14);
          //       if (checkDate(date)) {
          //         if (checkProv(value.substring(0, 2))) {
          //           callback();
          //         }
          //       }
          //     } else {
          //       callback(new Error("请输入正确的身份证号码"));
          //       return false;
          //     }
          //   }
          // }
        ],
        telephone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          // { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
      },
    };
  },
  mounted() {
    if (sessionStorage.getItem("authentication") == "null") {
      // this.btn = true;
    } else if (sessionStorage.getItem("authentication") == "1") {
      this.btn = false;
    } else if (sessionStorage.getItem("authentication") == "2") {
      this.attestationTwo = false;
    }
  },

  methods: {
    async attestationOneFn() {
      const address = await initWallet();
      if (sessionStorage.getItem("emailWalletAddress") == "null") {
        this.$message.error("未登录！");
      } else if (sessionStorage.getItem("emailWalletAddress") !== address) {
        this.$message.error("登录钱包与绑定钱包不一致！");
      } else {
        this.dialogVisible = true;
      }
    },

    postIdCardFn() {
      let accessKeyId = "AKIAUZZ7N3HSXPDOV6QN";
      let secretAccessKey = "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";
      let s3 = new AWS.S3({
        region: "ap-southeast-1",
        accessKeyId: accessKeyId,
        secretAccessKey: secretAccessKey,
      });
      var params = {
        Body: this.file, // 实际的文件 blob
        Bucket: `lionusertest/UserImg/${this.identityCardEmail}`,
        Key: this.file.name, // 文件名
      };
      s3.putObject(params, (err, data) => {
        if (err) {
          this.$message.error("上传失败！");
        } else {
          console.log(data);
          this.$message({
            message: "上传成功！",
            type: "success",
          });
        }
      });
    },

    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          let ruleFormData = new FormData();
          ruleFormData.append("name", this.ruleFormData.name);
          ruleFormData.append("country", this.ruleFormData.country);
          ruleFormData.append("telephone", this.ruleFormData.telephone);
          ruleFormData.append("idcard", this.ruleFormData.idcard);
          const data = await $http({
            method: "POST",
            url: "/v1/account/validate_v1",
            withCredentials: true,
            data: ruleFormData,
          });
          console.log(data);
          if (data.code == 200) {
            this.$message({
              message: "上传成功！等待认证！",
              type: "success",
            });
            this.ruleFormData = [];
            this.btn = false;
            this.dialogVisible = false;
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    //aws  上传身份证
    fileChange(e) {
      this.file = e.raw;
    },
  },
  computed: {},
};
</script>

<style scoped lang="less">
.attestationTitle {
  width: 100%;
  height: 148px;
  background: #f6f6f6;
}

.fromStyle {
  .attestationTitle {
    width: 100%;
    height: 148px;
    background: #f6f6f6;
    .attestationCss {
      padding: 2% 17%;
      .attestationCss_a {
        display: flex;
        align-items: center;
        p {
          font-size: 32px;
          font-family: HelveticaNeue-Medium, HelveticaNeue;
          font-weight: 500;
          color: #09090a;
          line-height: 39px;
        }
        img {
          width: 24px;
          height: 24px;
          margin-left: 16px;
          margin-top: 5px;
        }
      }
      .attestationCss_b {
        display: flex;
        align-items: center;
        width: 160px;
        height: 30px;
        background: #eaecef;
        border-radius: 15px;
        justify-content: center;
        margin-top: 16px;
        p {
          font-size: 12px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #7a7a7a;
          line-height: 17px;
          margin-left: 4px;
        }
        .el-icon-s-custom:before {
          color: blue;
        }
      }
    }
  }
  .attestationStyle {
    width: 1110px;
    margin: 32px auto;
    display: flex;
    .attestationStyle_a {
      width: 350px;
      height: 523px;
      background: #ffffff;
      border-radius: 8px;
      margin-right: 20px;
      padding: 20px 30px;
      border: 1px solid #e5e8eb;
      .attestationStyle_a_a {
        font-size: 24px;
        font-family: HelveticaNeue-Medium, HelveticaNeue;
        font-weight: 500;
        color: #09090a;
        margin-bottom: 30px;
      }
      .attestationStyle_a_b {
        font-size: 14px;
        font-family: HelveticaNeue;
        display: flex;
        align-items: center;
        color: #7a7a7a;
        margin-bottom: 16px;
        span {
          display: block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #cbcbd4;
          margin-right: 8px;
        }
      }
      .attestationStyle_a_c {
        font-size: 14px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #03a66d;
        width: 117px;
        height: 44px;
        background: rgba(3, 166, 109, 0.12);
        border-radius: 8px;
        text-align: center;
        line-height: 44px;
        margin-bottom: 32px;
        margin-top: 145px;
      }
      .attestationStyle_a_c_btn {
        font-size: 14px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #03a66d;
        width: 117px;
        height: 44px;
        background: rgba(3, 166, 109, 0.12);
        border-radius: 8px;
        text-align: center;
        line-height: 44px;
        margin-bottom: 32px;
      }
      .attestationStyle_a_d {
        font-size: 14px;
        font-family: HelveticaNeue;
        color: #7a7a7a;
      }
      .attestationStyle_a_e {
        font-size: 14px;
        font-family: HelveticaNeue-Medium, HelveticaNeue;
        font-weight: 500;
        color: #09090a;
        margin: 13px 0 30px;
      }
      .attestationStyle_a_f {
        font-size: 14px;
        font-family: HelveticaNeue;
        color: #7a7a7a;
        margin-bottom: 13px;
      }
      .attestationStyle_a_btn {
        width: 289px;
        height: 44px;
        background: #0066ed;
        border-radius: 4px;
        font-size: 14px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #ffffff;
        margin-bottom: 32px;
      }
      .attestationStyle_a_btns {
        width: 289px;
        height: 44px;
        background: #eaecef;
        border-radius: 4px;
        font-size: 14px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #ffffff;
        margin-bottom: 32px;
        border: 0;
      }
    }
  }
  .clickBtn {
    margin: 0;
    text-align: right;
    margin-top: 25px;
  }
}

/deep/.el-input__inner {
  border: 0;
  border-radius: 0;
  padding-left: 10px;
  border-bottom: 1px solid #eceef0;
}

/deep/.el-dialog {
  margin-top: 10vh !important;
}
/deep/.el-form--label-top .el-form-item__label {
  padding: 0;
}
/deep/.el-form-item {
  margin-bottom: 10px;
}
/deep/.upload-demo {
  position: relative;
}
/deep/.el-upload-list {
  position: absolute;
  top: 0;
  z-index: 10;
}
.idTips {
  display: flex;
  justify-content: space-between;
  margin-bottom: 32px;
  img {
    width: 84px;
    height: 64px;
  }
}
.Advancedh2 {
  font-size: 24px;
  font-family: HelveticaNeue-Medium, HelveticaNeue;
  font-weight: 500;
  color: #09090a;
  margin-bottom: 24px;
}
.Advancedh3 {
  font-size: 16px;
  font-family: HelveticaNeue-Medium, HelveticaNeue;
  font-weight: 500;
  color: #09090a;
  margin-bottom: 16px;
}
/deep/.el-upload--picture-card {
  line-height: 0;
  width: 160px;
  height: 120px;
}
.el-upload__text {
  margin-top: 10px;
}
/deep/.el-dialog.idCard {
  width: 22% !important;
  border-radius: 8px;
}
/deep/.el-upload-list--picture-card .el-upload-list__item {
  width: 160px;
  height: 120px;
}
.dialog_btn {
  width: 325px;
  height: 44px;
  background: #0066ed;
  border-radius: 4px;
  font-size: 14px;
  font-family: HelveticaNeue-Medium, HelveticaNeue;
  font-weight: 500;
  color: #ffffff;
  margin: 0 auto;
}
/deep/.el-dialog__footer {
  text-align: center;
}
/deep/.el-dialog.formCard {
  width: 24% !important;
  border-radius: 8px;
  padding: 0 20px;
}
</style>
