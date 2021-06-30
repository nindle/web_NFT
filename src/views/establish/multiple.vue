<template>
  <div class="establish">
    <div class="rollback" @click="$router.go(-1)">
      <i class="el-icon-arrow-left"></i>Mangae collectible type
    </div>
    <el-form label-position="top" :model="formLabelAlign">
      <!-- 标题 -->
      <p
        style="
          font-size: 30px;
          color: #09090a;
          font-weight: bold;
          padding: 20px 0;
        "
      >
        Create multiple collectible
      </p>
      <!-- 小标题 -->
      <div>
        <p
          style="
            font-size: 18px;
            font-weight: bold;
            color: #09090a;
            float: left;
          "
        >
          Upload file
        </p>
        <p
          style="
            font-size: 18px;
            font-weight: bold;
            color: #09090a;
            text-align: center;
          "
        >
          Upload file
        </p>
      </div>
      <!-- 文件上传 -->
      <el-upload action="#" list-type="picture-card" :auto-upload="false">
        <p>PNG, GIF, WEBP, MP4 or MP3. Max 30mb.</p>
        <el-button plain round>Choose file</el-button>
        <div slot="file" slot-scope="{ file }">
          <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
        </div>
      </el-upload>
      <!-- 文件预览区 -->
      <div class="establish-img">
        <p class="establish-img-p">Upload file to preview your brand new NFT</p>
      </div>
      <div style="position: relative; margin-bottom: 10px">
        <span style="font-size: 20px; font-weight: bold; color: #333333">
          Put on marketplace
        </span>
        <el-switch v-model="value"> </el-switch>
        <p
          style="
            font-size: 14px;
            font-weight: bold;
            color: #adadad;
            margin-top: 5px;
          "
        >
          Enter price to allow users instantly purchase your NFT
        </p>
      </div>
      <el-form-item label="Price" v-show="value" style="position: relative">
        <el-input
          placeholder="Enter price for one piece"
          v-model="formLabelAlign.title"
        >
        </el-input>
        <el-select v-model="valuename" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <!-- <el-tabs
        v-model="activeName"
        @tab-click="handleClick"
        style="width: 460px"
        stretch="true"
      >
        <el-tab-pane label="Fixed price" name="first">
          <el-form-item label="Price">
            <el-input
              placeholder="e.g.Redeemable T-Shirt with logo"
              v-model="formLabelAlign.title"
            >
              <template slot="append">BNB</template>
            </el-input>
          </el-form-item>
          <div style="margin-bottom: 20px">
            <p>Service fee</p>
            <p>You will receive</p>
          </div>
        </el-tab-pane>
        <el-tab-pane label="auction" name="second">
          <el-form-item label="Price">
            <el-input
              placeholder="e.g.Redeemable T-Shirt with logo"
              v-model="formLabelAlign.title"
            >
              <template slot="append">BNB</template>
            </el-input>
          </el-form-item>
          <div style="margin-bottom: 20px">
            <p>Service fee</p>
            <p>You will receive</p>
          </div>
        </el-tab-pane>
      </el-tabs> -->
      <div style="position: relative; margin-bottom: 10px">
        <span style="font-size: 20px; font-weight: bold; color: #333333">
          Unlock once purchased
        </span>
        <el-switch v-model="values"> </el-switch>
      </div>

      <el-form-item label="Title">
        <el-input
          placeholder="e.g. “Redeemable T-Shirt with logo”"
          v-model="formLabelAlign.Description"
        >
        </el-input>
      </el-form-item>
      <el-form-item label="Description(Optional)">
        <el-input
          placeholder="e.g.”After purchasing you”ll be able to get the real T-Shirt”"
          v-model="formLabelAlign.Description"
        ></el-input>
      </el-form-item>
      <el-form-item label="Royalties">
        <el-input placeholder="E.g. 10%" v-model="formLabelAlign.Description">
          <template slot="append">%</template>
        </el-input>
      </el-form-item>
      <el-form-item label="Number of copies">
        <el-input placeholder="E.g. 10" v-model="formLabelAlign.Description">
        </el-input>
      </el-form-item>
      <el-form-item label="Properties (Optional)">
        <el-input placeholder="E.g. size" v-model="formLabelAlign.Description">
          <template slot="append"></template>
        </el-input>
        <el-input placeholder="E.g. M" v-model="formLabelAlign.Description">
          <template slot="append"></template>
        </el-input>
      </el-form-item>
      <!-- 上传按钮 -->
      <el-button
        style="
          width: 480px;
          height: 45px;
          background: #2081e2;
          border-radius: 22px;
          margin-top: 20px;
        "
        type="primary"
        >Create item</el-button
      >
    </el-form>
  </div>
</template>

<script>
export default {
  name: "Establish",
  props: {},
  data() {
    return {
      options: [
        {
          value: "选项1",
          label: "BNB",
        },
        {
          value: "选项2",
          label: "DAI",
        },
        {
          value: "选项3",
          label: "BNB",
        },
        {
          value: "选项4",
          label: "DAI",
        },
        {
          value: "选项5",
          label: "BNB",
        },
      ],
      valuename: "",
      activeName: "first",
      value: true,
      values: true,
      dialogImageUrl: "",
      dialogVisible: false,
      disabled: false,
      formLabelAlign: {
        title: "",
        Description: "",
        type: "",
      },
    };
  },
  created() {},
  mounted() {},
  methods: {},
};
</script>

<style lang="less" scoped>
/deep/ .el-form-item__content {
  display: flex;
  flex-direction: row;
}
.rollback {
  padding-top: 40px;
  font-size: 14px;
  cursor: pointer;
  font-family: Source Han Sans CN;
  font-weight: 500;
  color: #333333;
}
/deep/.el-select {
  position: absolute;
  top: 0;
  right: 0;
  float: right;
}
/deep/.el-input-group__append {
  background-color: #ffffff;
  border: 0;
  border-bottom: 1px;
  color: black;
}
.el-switch {
  position: absolute;
  top: 5px;
  left: 390px;
}
.establish {
  width: 1200px;
  height: 1230px;
  margin: 0 auto;
}
/deep/.el-upload-list__item {
  position: absolute;
  left: 965px;
  top: 252px;
  // width: 225px;
  // height: 339px;
  border-radius: 13px;
}
/deep/.el-upload-list--picture-card .el-upload-list__item {
  width: 552px;
  height: 482px;
  line-height: 482px;
  text-align: center;
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
  // display: flex;
  align-items: center;
  position: absolute;
  left: 965px;
  top: 252px;
  width: 552px;
  height: 482px;
  line-height: 482px;
  text-align: center;
  border-radius: 13px;
  border: 1px dashed #84858a;
}
.establish-img-p {
  text-align: center;
  margin: auto 0;
  padding: 0 20px;
  word-wrap: break-word;
  z-index: -10;
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
