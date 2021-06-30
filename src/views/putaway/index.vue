<template>
  <div class="establish">
    <el-form label-position="top" :model="formLabelAlign">
      <!-- 标题 -->
      <p
        style="font-size: 30px;color: #09090A;font-weight: bold;padding:50px 0;"
      >
        Put your product on the shelves
      </p>
      <!-- 价格币种选择 -->
      <el-form-item label="Price">
        <el-input
          placeholder="Enter price for one piece"
          v-model="formLabelAlign.title"
        >
        </el-input>

        <el-select
          style="float: right;margin-top: -40px;"
          v-model="values"
          placeholder="请选择"
        >
          <el-option
            v-for="item in types"
            :key="item.index"
            :label="item.label"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <!-- 分类选择 -->
      <el-form-item label="Classification">
        <el-input
          placeholder="Please select type"
          v-model="formLabelAlign.Description"
        ></el-input>
        <el-select
          style="float: right;margin-top: -40px;"
          v-model="value"
          placeholder="请选择"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <!-- 时间选择 -->
      <el-form-item label="Time of sale">
        <div class="block">
          <el-date-picker
            v-model="value1"
            type="daterange"
            range-separator="go"
            start-placeholder="Starting Date"
            end-placeholder="Expiration Date"
          >
          </el-date-picker>
        </div>
      </el-form-item>
      <el-button
        style="width: 180px;
        height: 45px;
        background: #2081E2;
        border-radius: 22px;
        margin-top:20px"
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
      value2: [new Date(2016, 9, 10, 8, 40), new Date(2016, 9, 10, 9, 40)],
      dialogImageUrl: "",
      dialogVisible: false,
      disabled: false,
      formLabelAlign: {
        title: "",
        Description: "",
        type: ""
      },
      options: [
        {
          value: "1",
          label: "New"
        },
        {
          value: "2",
          label: "Art"
        },
        {
          value: "3",
          label: "Domain Names"
        },
        {
          value: "4",
          label: "Virtual Worlds"
        },
        {
          value: "5",
          label: "Collectibles"
        },
        {
          value: "6",
          label: "Sports"
        },
        {
          value: "7",
          label: "Utility"
        }
      ],
      value: "",
      types: [
        {
          index: "1",
          label: "ETH"
        },
        {
          index: "2",
          label: "DAI"
        },
        {
          index: "3",
          label: "DAI"
        },
        {
          index: "4",
          label: "DAI"
        },
        {
          index: "5",
          label: "DAI"
        }
      ],
      values: "",
      value1: ""
    };
  },
  created() {},
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
/deep/.el-date-editor .el-range-separator {
  width: 15%;
}
</style>
