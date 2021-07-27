<template>
  <div class="redactUser">
    <div class="rollback" @click="$router.go(-1)">
      <i class="el-icon-arrow-left" />{{ $t("redactUser.fanhui") }}
    </div>
    <div class="uploading">
      <el-upload
        ref="upload"
        action="https://api.lionnft.io/v1/upload/file"
        list-type="picture-card"
        :auto-upload="false"
        :on-success="uploadSuccess"
        :on-change="before_upload"
      >
        <el-button
          round
          style="
            width: 115px;
            height: 37px;
            border: 1px solid #0066ed;
            border-radius: 18px;
          "
        >
          {{ $t("redactUser.xuanze") }}
        </el-button>
        <div slot="file" slot-scope="{ file }">
          <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
        </div>
      </el-upload>
      <div class="preview" />
      <div class="uploading_a">
        {{ $t("redactUser.recommend") }}
      </div>
    </div>

    <!-- 标题简介 -->
    <div class="redactUser-a">
      <p
        style="
          color: #09090a;
          font-size: 30px;
          font-weight: bold;
          margin-bottom: 20px;
        "
      >
        {{ $t("redactUser.Edit") }}
      </p>
      <p
        style="
          width: 504px;
          height: 47px;
          font-size: 17px;
          font-family: Source Han Sans CN;
          font-weight: 400;
          color: #84858b;
        "
      >
        {{ $t("redactUser.EditDescription") }}
      </p>
    </div>
    <!-- 编辑表单 -->
    <el-form
      label-position="top"
      :model="formLabelAlign"
      :rules="rules"
      ref="formLabelAlign"
    >
      <el-form-item :label="$t('redactUser.name')" prop="username">
        <el-input
          v-model="formLabelAlign.username"
          class="el-input-a"
          :placeholder="$t('redactUser.PleaseName')"
        />
      </el-form-item>
      <el-form-item :label="$t('redactUser.URL')" prop="short_url">
        <el-input
          v-model="formLabelAlign.short_url"
          width:400px
          class="el-input-a"
          :placeholder="$t('redactUser.PleaseURL')"
        >
          <template slot="prepend">lionnft.com/</template>
        </el-input>
      </el-form-item>
      <el-form-item :label="$t('redactUser.Bio')" prop="desc">
        <el-input
          v-model="formLabelAlign.desc"
          class="el-input-a"
          :placeholder="$t('redactUser.PleaseBio')"
        />
      </el-form-item>
      <el-button
        style="
          width: 180px;
          height: 45px;
          background: #2081e2;
          border-radius: 22px;
          margin-top: 20px;
        "
        type="primary"
        @click="postUserEdit(formLabelAlign)"
      >
        {{ $t("redactUser.Update") }}
      </el-button>
    </el-form>
  </div>
</template>

<script>
import $http from "../../utils/request";
import { initWallet } from "../../wallet/wallet";

export default {
  name: "RedactUser",
  props: {},
  data() {
    return {
      rules: {
        username: [
          { required: true, message: "名称不可为空", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 2 到 16 个字符", trigger: "blur" },
        ],
        short_url: [
          { required: true, message: "URL不可为空", trigger: "blur" },
        ],
        desc: [{ required: true, message: "介绍不可为空", trigger: "blur" }],
      },
      dialogImageUrl: "",
      dialogVisible: false,
      disabled: false,
      formLabelAlign: {
        username: "",
        short_url: "",
        desc: "",
        address: this.$route.params.userId,
        cover: this.$route.params.cover,
        website: "",
        twitter: "",
        pic: "",
      },
      userpicurl: false,
    };
  },
  created() {},
  async mounted() {
    this.formLabelAlign.address = this.$route.params.userId;
    const address = await initWallet();
    if (address != "") {
      this.formLabelAlign.address = address;
    }
  },

  methods: {
    before_upload(e) {
      if (e.url == "") {
        this.userpicurl = false;
      } else {
        this.userpicurl = true;
      }
    },
    uploadFile() {
      this.$refs.upload.submit();
    },

    async uploadSuccess(e) {
      this.formLabelAlign.pic = e.ipfs;
      const formLabelAlign = { ...this.formLabelAlign };
      const resp = await $http.post("https://api.lionnft.io/v1/user/edit", {
        ...formLabelAlign,
      });
      if (resp.code == 200) {
        this.$message({
          message: "更新成功",
          type: "success",
        });
        sessionStorage.setItem("userInfo", formLabelAlign.username);
        this.formLabelAlign = {};

        this.$router.push({
          name: "personalCenter",
          params: { address: this.$route.params.userId },
        });
      } else {
        this.$message.error("更新失败");
      }
    },

    async postUserEdit() {
      this.$refs.formLabelAlign.validate((valid) => {
        if (valid) {
          if (this.userpicurl == false) {
            this.$message({
              message: "头像不可为空",
              type: "warning",
            });
          } else {
            this.uploadFile();
          }
        } else {
          return false;
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.preview {
  position: absolute;
  top: -200px;
  left: 7px;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 1px solid #ccc;
}
.uploading_a {
  position: absolute;
  top: -64px;
  left: -12px;
  width: 255px;
  height: 36px;
  font-size: 16px;
  font-family: Source Han Sans CN;
  font-weight: 500;
  color: #84858a;
  line-height: 23px;
}
/deep/.el-upload-list--picture-card .el-upload-list__item {
  position: relative;
  position: absolute;
  top: -200px;
  left: 7px;
  width: 100px;
  height: 100px;
  background: #f6f6f6;
  border-radius: 50%;
  border: 1px solid #f6f6f6;
}
/deep/.el-upload-list--picture-card .el-upload-list__item-thumbnail {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  border-radius: 50%;
}
/deep/.el-upload--picture-card {
  background-color: #fff;
  border: 0;
  border-radius: 6px;
  box-sizing: border-box;
  width: 115px;
  height: 37px;
  line-height: 0;
  vertical-align: top;
}
.uploading {
  position: absolute;
  top: 250px;
  left: 630px;
}
.rollback {
  padding: 30px 0 20px 0;
  font-size: 14px;
  cursor: pointer;
  font-family: Source Han Sans CN;
  font-weight: 500;
  color: #333333;
}
.el-form {
  width: 1200px;
  margin: 0 auto;
  margin: 30px 0;
}
/deep/ .el-input__inner {
  border: 0;
}

/deep/ .el-form-item {
  width: 476px;
  border-bottom: 1px solid #ccc;
}
/deep/ .el-form-item__label {
  font-size: 18px;
  color: #09090a;
}
.redactUser {
  position: relative;
  width: 1200px;
  margin: 0 auto;
  // margin-top: 50px;
}
/deep/.el-input-group__prepend {
  border: 0;
  padding: 0;
  color: #09090a;
  background-color: #fff;
  font-size: 18px;
}
</style>
