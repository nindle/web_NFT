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
        Create single collectible
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
          Preview
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

      <el-form-item label="Price" v-show="value">
        <el-input
          placeholder="e.g.Redeemable T-Shirt with logo"
          v-model="formLabelAlign.price"
        >
          <template slot="append">BNB</template>
        </el-input>
        <!-- <el-select v-model="valuename" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select> -->
      </el-form-item>

      <div style="position: relative; margin-bottom: 10px">
        <span style="font-size: 20px; font-weight: bold; color: #333333">
          Unlock once purchased
        </span>
        <el-switch v-model="values"> </el-switch>
      </div>

      <el-form-item label="Title">
        <el-input
          placeholder="e.g. “Redeemable T-Shirt with logo”"
          v-model="formLabelAlign.title"
        >
        </el-input>
      </el-form-item>

      <el-form-item label="Description(Optional)">
        <el-input
          placeholder="e.g.”After purchasing you”ll be able to get the real T-Shirt”"
          v-model="formLabelAlign.description"
        ></el-input>
      </el-form-item>

      <el-form-item label="Royalties">
        <el-input placeholder="E.g. 10%" v-model="formLabelAlign.royalties">
          <template slot="append">%</template>
        </el-input>
      </el-form-item>

      <el-form-item label="Supply">
        <!-- <el-input placeholder="E.g. 10%" v-model="formLabelAlign.royalties">
          <template slot="append">%</template>
        </el-input> -->

        <el-input-number
          v-model="formLabelAlign.supply"
          controls-position="right"
          @change="handleChange"
          :min="1"
          :max="10"
        >
        </el-input-number>
      </el-form-item>

      <el-form-item label="Properties (Optional)">
        <div
          v-for="(item, index) in propertiesList"
          :key="index"
          class="properties"
        >
          <el-input
            placeholder="E.g. size"
            v-model="formLabelAlign.properties[index]"
          >
            <template slot="append"></template>
          </el-input>
          <el-input
            placeholder="E.g. M"
            v-model="formLabelAlign.propertiess[index]"
          >
            <template slot="append"></template>
          </el-input>
        </div>
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
        @click="postFrom"
      >
        Create item
      </el-button>
    </el-form>
    <el-dialog title="Follow steps" :visible.sync="dialogVisible" center>
      <div class="Approve">
        <p class="Approve_a">Approve</p>
        <p class="Approve_b">Checking balance and approving</p>
        <el-button
          :class="changes == '' ? 'Approve_c' : 'Approve_cc'"
          @click="changes = 1"
        >
          Start
        </el-button>
      </div>
      <div class="Approve">
        <p class="Approve_a">Upload files & Mint token</p>
        <p class="Approve_b">Call contract method</p>
        <el-button
          :class="changes == '1' ? 'Approve_c' : 'Approve_cc'"
          @click="changes = 2"
        >
          Start
        </el-button>
      </div>
      <div class="Approve">
        <p class="Approve_a">Sign sell order</p>
        <p class="Approve_b">sign sell order using your wallet</p>
        <el-button
          :class="changes == '2' ? 'Approve_c' : 'Approve_cc'"
          @click="changes = 3"
        >
          Start
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "Establish",
  props: {},
  data() {
    return {
      changes: "",
      dialogVisible: true,
      propertiesList: [1],
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
        price: "",
        Description: "",
        type: "",
        royalties: "",
        supply: "",
        properties: [],
        propertiess: [],
      },
    };
  },
  created() {},
  mounted() {},
  beforeUpdate() {
    this.editFn();
  },

  methods: {
    editFn() {
      if (this.formLabelAlign.propertiess.length <= 3) {
        this.formLabelAlign.propertiess.forEach((item, index) => {
          if ((this.propertiesList.length = index + 1)) {
            this.propertiesList.push(Math.ceil(Math.random() * 4));
          }
        });
      }
    },

    postFrom() {
      this.dialogVisible = true;
    },
  },
};
</script>

<style lang="less" scoped>
.el-input-number {
  width: 100%;
}
/deep/.el-input-number .el-input__inner {
  text-align: left;
  padding-left: 40px;
}
/deep/.el-input-number__decrease {
  background: #fff;
}
/deep/.el-input-number__increase {
  background: #fff;
}
.Approve {
  margin-bottom: 40px;
}
.Approve_cc {
  background: #627188;
  width: 190px;
  height: 39px;
  cursor: no-drop;
  border-radius: 20px;
  color: #ffffff;
}
.Approve_c {
  width: 190px;
  height: 39px;
  background: #0066ed;
  border-radius: 20px;
  font-size: 16px;
  font-family: Source Han Sans CN;
  font-weight: 400;
  color: #ffffff;
}
.Approve_b {
  font-size: 18px;
  font-family: Source Han Sans CN;
  font-weight: 400;
  margin: 10px 0 20px;
  color: #313131;
}
.Approve_a {
  font-size: 24px;
  font-family: Source Han Sans CN;
  font-weight: 500;
  color: #313131;
}
/deep/.el-dialog {
  width: 480px;
  height: 645px;
  background: #ffffff;
  border-radius: 10px;
}
.createConfirmation {
  width: 480px;
  height: 645px;
  background: #ffffff;
  border-radius: 10px;
}
.properties {
  display: flex;
  width: 476px;
  flex-direction: row;
  border-bottom: 1px solid #eceef0;
}
/deep/ .el-form-item__content {
  display: flex;
  // flex-direction: row;
  flex-wrap: wrap;
}
/deep/.el-select {
  position: absolute;
  top: 0;
  right: 0;
  float: right;
}
.rollback {
  padding-top: 40px;
  font-size: 14px;
  cursor: pointer;
  font-family: Source Han Sans CN;
  font-weight: 500;
  color: #333333;
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
  // height: 1120px;
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
  z-index: 10;
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
