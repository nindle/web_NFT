<template>
  <div class="redactUser">
    <div class="uploading">
      <el-upload action="#" list-type="picture-card" :auto-upload="false">
        <el-button
          round
          style="
            width: 115px;
            height: 37px;
            border: 1px solid #0066ed;
            border-radius: 18px;
          "
          >Choose file</el-button
        >
        <div slot="file" slot-scope="{ file }">
          <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
        </div>
      </el-upload>
      <div class="preview"></div>
      <div class="uploading_a">
        We recommend an image of at least 400x400. Gifs work too.
      </div>
    </div>
    <div class="rollback" @click="$router.go(-1)">
      <i class="el-icon-arrow-left"></i>Go back
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
          class="el-input-a"
          placeholder="Enter yuor display name"
          v-model="formLabelAlign.username"
        ></el-input>
      </el-form-item>
      <el-form-item label="Custom URL">
        <el-input
          width:400px
          class="el-input-a"
          placeholder="Enter your custom URL"
          v-model="formLabelAlign.short_url"
        >
          <template slot="prepend">rarible.com/</template>
        </el-input>
      </el-form-item>
      <el-form-item label="Bio">
        <el-input
          class="el-input-a"
          placeholder="Tell about yourself in a few words"
          v-model="formLabelAlign.desc"
        ></el-input>
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
        >Update profile</el-button
      >
    </el-form>
  </div>
</template>

<script>
import Http from "../../utils/http";

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
        address: "",
        cover: "",
        website: "",
        twitter: "",
        pic: "",
      },
    };
  },
  created() {},
  mounted() {
    this.formLabelAlign.address = this.$route.params.userId;
  },
  methods: {
    postUserEdit() {
      const formLabelAlign = this.formLabelAlign;
      Http.httpPost("v1/user/edit", { ...formLabelAlign }, (resp) => {
        this.formLabelAlign = {};
        console.log(resp);
        if (resp.code == 200) {
          this.$message({
            message: "编辑成功",
            type: "success",
          });
          this.$router.go(-1);
        } else {
          this.$message.error("编辑失败");
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
