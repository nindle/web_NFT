<template>
  <div class="establish">
    <el-form label-position="top" :model="formLabelAlign">
      <!-- 标题 -->
      <p
        style="font-size: 30px;color: #09090A;font-weight: bold;padding:50px 0;"
      >
        Create single collectible
      </p>
      <!-- 小标题 -->
      <div>
        <p
          style="font-size: 18px;font-weight: bold;color: #09090A; float: left;"
        >
          Upload file
        </p>
        <p
          style="font-size: 18px;font-weight: bold;color: #09090A; text-align: center;"
        >
          Preview
        </p>
      </div>
      <!-- 文件上传 -->
      <el-upload action="#" list-type="picture-card" :auto-upload="false">
        <p>PNG, GIF, WEBP, MP4 or MP3. Max 30mb.</p>

        <el-button plain round>Choose file</el-button>
        <div slot="file" slot-scope="{ file }">
          <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
          <!-- <p>{{ JSON.stringify(this.$route.params.data.url) }}</p> -->
        </div>
      </el-upload>
      <!-- 文件预览区 -->
      <div class="establish-img">
        <p class="establish-img-p">Upload file to preview your brand new NFT</p>
      </div>
      <!-- 上传作品标题 -->
      <el-form-item label="Title">
        <el-input
          placeholder="e.g.Redeemable T-Shirt with logo"
          v-model="formLabelAlign.title"
        ></el-input>
      </el-form-item>
      <!-- 上传作品描述 -->
      <el-form-item label="Description(Optional)">
        <el-input
          placeholder="e.g.”After purchasing you”ll be able to get the real T-Shirt”"
          v-model="formLabelAlign.Description"
        ></el-input>
      </el-form-item>
      <!-- 上传按钮 -->
      <el-button
        style="width: 180px;
        height: 45px;
        background: #2081E2;
        border-radius: 22px;
        margin-top:20px"
        type="primary"
        >Create item</el-button
      >

      <img
        style="position: absolute;
              left: 965px;
              top: 252px;
              width: 225px;
              height: 339px;
              border-radius: 13px;
              border: 1px dashed #84858a;"
        :src="$route.params.data.url"
        alt=""
      />
    </el-form>
  </div>
</template>

<script>
export default {
  name: "Establish",
  props: {},
  data() {
    return {
      fileList: [{ url: this.$route.params.data.url }],
      dialogImageUrl: "",
      dialogVisible: false,
      disabled: false,
      formLabelAlign: {
        title: this.$route.params.data.title,
        Description: this.$route.params.data.Optional,
        type: ""
      }
    };
  },
  created() {
    console.log(this.file.url);
    console.log("的方脑壳");
    this.file.url = this.$route.params.data.url;
  },
  mounted() {},
  methods: {}
};
</script>

<style lang="less" scoped>
.establish {
  width: 1200px;
  height: 1000px;
  margin: 0 auto;
}
/deep/.el-upload-list__item {
  position: absolute;
  left: 965px;
  top: 252px;
  width: 225px;
  height: 339px;
  border-radius: 13px;
}
/deep/.el-upload--picture-card {
  width: 433px;
  height: 130px;
  border: 1px dashed #84858a;
  border-radius: 13px;
  line-height: 60px;
  margin: 20px 0;
}

.establish-img {
  display: flex;
  align-items: center;
  position: absolute;
  left: 965px;
  top: 252px;
  width: 225px;
  height: 339px;
  border-radius: 13px;
  border: 1px dashed #84858a;
}
.establish-img-p {
  text-align: center;
  margin: auto 0;
  padding: 0 20px;
  word-wrap: break-word;
  z-index: -1;
}
/deep/.el-button {
  border: 1px solid #2081e2;
}
/deep/.el-form-item__content {
  width: 476px;
  border-bottom: 1px solid #eceef0;
}
/deep/.el-input__inner {
  border: 0;
}
</style>
