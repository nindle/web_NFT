<template>
  <div class="redactUser">
    <div class="uploading">
      <el-upload
        action="#"
        list-type="picture-card"
        :auto-upload="false"
        :on-change="handlePictureCardPreview"
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
          Choose file
        </el-button>
        <div slot="file" slot-scope="{ file }">
          <img class="el-upload-list__item-thumbnail" :src="file.url" alt="">
        </div>
      </el-upload>
      <div class="preview" />
      <div class="uploading_a">
        We recommend an image of at least 400x400. Gifs work too.
      </div>
    </div>
    <div class="rollback" @click="$router.go(-1)">
      <i class="el-icon-arrow-left" />Go back
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
        Edit profile
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
        You can set preferred display name, create your branded profile URL and
        manage other personal settings
      </p>
    </div>
    <!-- 编辑表单 -->
    <el-form label-position="top" :model="formLabelAlign">
      <el-form-item label="Display name">
        <el-input
          v-model="formLabelAlign.username"
          class="el-input-a"
          placeholder="Enter yuor display name"
        />
      </el-form-item>
      <el-form-item label="Custom URL">
        <el-input
          v-model="formLabelAlign.short_url"
          width:400px
          class="el-input-a"
          placeholder="Enter your custom URL"
        >
          <template slot="prepend">lionnft.com/</template>
        </el-input>
      </el-form-item>
      <el-form-item label="Bio">
        <el-input
          v-model="formLabelAlign.desc"
          class="el-input-a"
          placeholder="Tell about yourself in a few words"
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
        @click="postUserEdit()"
      >
        Update profile
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
      dialogImageUrl: "",
      dialogVisible: false,
      disabled: false,
      formLabelAlign: {
        username: "",
        short_url: "",
        desc: "",
        address: this.$route.params.userId,
        cover: "",
        website: "",
        twitter: "",
        pic: "",
      },
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
    handlePictureCardPreview(fileList) {
      this.formLabelAlign.cover = fileList.url;
    },

    async ifAddress() {
      if (this.$route.params.userName == undefined) {
        this.postAdduser();
      } else {
        this.postUserEdit();
      }
    },

    async postAdduser() {
      const formLabelAlign = { ...this.formLabelAlign };
      console.log(formLabelAlign);
      const resp = await $http.post("https://api.lionnft.io/v1/user/add", {
        ...formLabelAlign,
      });
      console.log(resp);
      if (resp.code == 200) {
        this.$message({
          message: "创建成功",
          type: "success",
        });
        this.formLabelAlign = {};
        this.$router.replace("/personalCenter");
      } else {
        this.$message.error("创建失败");
      }
      sessionStorage.setItem("userInfo", formLabelAlign.username);
    },

    async postUserEdit() {
      const formLabelAlign = { ...this.formLabelAlign };
      console.log(formLabelAlign);
      const resp = await $http.post("https://api.lionnft.io/v1/user/edit", {
        ...formLabelAlign,
      });
      console.log(resp);
      if (resp.code == 200) {
        this.$message({
          message: "更新成功",
          type: "success",
        });
        sessionStorage.setItem("userInfo", formLabelAlign.username);
        this.formLabelAlign = {};
        console.log(sessionStorage.getItem("userInfo"));
        this.$router.replace("/personalCenter");
      } else {
        this.$message.error("更新失败");
      }
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
