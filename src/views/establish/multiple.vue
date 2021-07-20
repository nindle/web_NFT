<template>
  <div class="establish">
    <div class="rollback" @click="$router.go(-1)">
      <i class="el-icon-arrow-left" />
      {{ $t("Single.fanhui") }}
    </div>
    <el-form label-position="top" :model="formLabelAlign" :rules="rules">
      <!-- 标题 -->
      <p
        style="
          font-size: 30px;
          color: #09090a;
          font-weight: bold;
          padding: 20px 0;
        "
      >
        {{ $t("Single.duoge") }}
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
          {{ $t("Single.shangchuan") }}
        </p>
        <p
          style="
            font-size: 18px;
            font-weight: bold;
            color: #09090a;
            text-align: center;
          "
        >
          {{ $t("Single.yulan") }}
        </p>
      </div>

      <!-- 文件上传 -->
      <el-upload
        ref="upload"
        action="https://api.lionnft.io/v1/upload/file"
        list-type="picture-card"
        :auto-upload="false"
        :on-success="uploadSuccess"
      >
        <p>PNG, GIF, WEBP, MP4 or MP3. Max 30mb.</p>
        <el-button plain round>{{ $t("Single.xuanze") }}</el-button>
        <div slot="file" slot-scope="{ file }">
          <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
        </div>
      </el-upload>

      <!-- 文件预览区 -->
      <div class="establish-img">
        <p class="establish-img-p">{{ $t("Single.yulan1") }}</p>
      </div>

      <div style="position: relative; margin-bottom: 10px">
        <span style="font-size: 20px; font-weight: bold; color: #333333">
          {{ $t("Single.toufang") }}
        </span>
        <el-switch v-model="value" />
        <p
          style="
            font-size: 14px;
            font-weight: bold;
            color: #adadad;
            margin-top: 5px;
          "
        >
          {{ $t("Single.shurujiage") }}
        </p>
      </div>

      <el-form-item v-show="value" :label="$t('Single.price')" prop="price">
        <el-input
          v-model.number="formLabelAlign.price"
          type="number"
          :placeholder="$t('Single.PleasePrice')"
        >
          <template slot="append">BNB</template>
        </el-input>
      </el-form-item>

      <div style="position: relative; margin-bottom: 10px">
        <span style="font-size: 20px; font-weight: bold; color: #333333">
          {{ $t("Single.jiesuo") }}
        </span>
        <el-switch v-model="values" />
      </div>

      <el-form-item :label="$t('Single.Title')" prop="title">
        <el-input
          v-model="formLabelAlign.title"
          :placeholder="$t('Single.PleaseTitle')"
        />
      </el-form-item>

      <el-form-item :label="$t('Single.Description')" prop="description">
        <el-input
          v-model="formLabelAlign.description"
          :placeholder="$t('Single.PleaseDescription')"
        />
      </el-form-item>

      <el-form-item :label="$t('Single.Royalties')">
        <el-input v-model="formLabelAlign.royalties" placeholder="E.g. 10%">
          <template slot="append">%</template>
        </el-input>
      </el-form-item>

      <el-form-item :label="$t('Single.Supply')">
        <el-input-number
          v-model="formLabelAlign.supply"
          controls-position="right"
          :min="1"
          :max="10"
          @change="handleChange"
        />
      </el-form-item>

      <el-form-item :label="$t('Single.Properties')">
        <div
          v-for="(item, index) in propertiesList"
          :key="index"
          class="properties"
        >
          <el-input
            v-model="formLabelAlign.properties[index]"
            placeholder="E.g. size"
          >
            <template slot="append" />
          </el-input>
          <el-input
            v-model="formLabelAlign.propertiess[index]"
            placeholder="E.g. M"
          >
            <template slot="append" />
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
        {{ $t("Single.tijiao") }}
      </el-button>
    </el-form>
    <el-dialog
      :title="$t('Single.Create')"
      :visible.sync="dialogVisible"
      center
    >
      <div class="Approve">
        <p class="Approve_a">{{ $t("Single.Approve") }}</p>
        <p class="Approve_b">{{ $t("Single.Checking") }}</p>
        <el-button
          :disabled="aprLoading == true || changes == 1"
          :class="changes == '' ? 'Approve_c' : 'Approve_cc'"
          @click="setApproveAll"
        >
          {{
            changes >= 1
              ? $t("Single.Done")
              : aprLoading
              ? $t("Single.Progress")
              : $t("Single.Start")
          }}
        </el-button>
      </div>
      <div class="Approve">
        <p class="Approve_a">{{ $t("Single.toKen") }}</p>
        <p class="Approve_b">{{ $t("Single.method") }}</p>
        <el-button
          :disabled="upLoading == true || changes == 2"
          :class="changes == '1' ? 'Approve_c' : 'Approve_cc'"
          @click="uploadFile"
        >
          {{
            changes >= 2
              ? $t("Single.Done")
              : upLoading
              ? $t("Single.Progress")
              : $t("Single.Start")
          }}
        </el-button>
      </div>
      <div class="Approve">
        <p class="Approve_a">{{ $t("Single.order") }}</p>
        <p class="Approve_b">{{ $t("Single.orderusing") }}</p>
        <el-button
          :disabled="ordLoading == true || changes == 3"
          :class="changes == '2' ? 'Approve_c' : 'Approve_cc'"
          @click="createOrder"
        >
          {{
            changes == 3
              ? $t("Single.Done")
              : ordLoading
              ? $t("Single.Progress")
              : $t("Single.Start")
          }}
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import contracts from "../../wallet/contracts";

import { BigNumber } from "@ethersproject/bignumber";

import imgUrl from "../../assets/xiaohuli.png";
import { userInfoApi } from "../../api/user";
import {
  initWallet,
  Contracts1155,
  getProvider,
  randomHex,
  getBalance,
} from "../../wallet/wallet";

let currCont = null;
export default {
  name: "Establish",
  props: {},
  data() {
    return {
      rules: {
        title: [
          { required: true, message: "请输入商品名称", trigger: "blur" },
          { min: 3, max: 8, message: "长度在 3 到 8 个字符", trigger: "blur" },
        ],
        price: [
          { required: true, message: "价格不能为空" },
          { type: "number", message: "价格必须为数字值" },
        ],
        description: [
          { required: true, message: "请输入商品介绍", trigger: "blur" },
          {
            min: 3,
            max: 15,
            message: "长度在 3 到 15 个字符",
            trigger: "blur",
          },
        ],
      },
      user_id: "",
      changes: "",
      // dialogVisible: true,
      propertiesList: [1],
      valuename: "",
      activeName: "first",
      value: true,
      values: true,
      dialogImageUrl: "",
      dialogVisible: false,
      disabled: false,
      formLabelAlign: {
        tokenid: 0,
        token: "0xE9285F4Bd13D86Fe4f4b019C6b54cc3f8c6f858C",
        image: "",
        title: "",
        price: "",
        description: "",
        type: "",
        royalties: "",
        supply: "1",
        properties: [],
        propertiess: [],
      },
      aprLoading: false,
      aprError: false,
      upLoading: false,
      upError: false,
      ordLoading: false,
      ordError: false,
    };
  },
  async created() {
    this.user_id = sessionStorage.getItem("address");
  },
  mounted() {
    this.open();
  },
  beforeUpdate() {
    this.editFn();
  },

  methods: {
    async open() {
      if (this.user_id !== null) {
        const address = await initWallet();
        if (address != "") {
          const cont1155 = Contracts1155();
          currCont = cont1155;
          await this.whiteList(cont1155);
          await this.isApprovedAll(cont1155);
        }
      } else {
        this.$alert(
          `<img src="${imgUrl}" style="width: 137px;height: 137px;" alt= "">`,
          "Please connect the wallet",
          {
            confirmButtonText: "Connecting Wallet",
            center: true,
            dangerouslyUseHTMLString: true,
            confirmButtonClass: "btnstyle",
          }
        ).then(async () => {
          const address = await initWallet();
          if (address != "") {
            const cont1155 = Contracts1155();
            currCont = cont1155;
            await this.whiteList(cont1155);
            await this.isApprovedAll(cont1155);
            this.success = 200;
            this.addres = address;
            this.address = this.SubStr(address);
            sessionStorage.setItem("showAddress", this.address);
            this.balance = await getBalance();
            const { data: data } = await userInfoApi(address);
            this.userInfo = data;
            location.reload();
          }
        });
      }
    },

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
    handleChange() {},

    // 链上开始
    async isApprovedAll(cont) {
      const res = await contracts.isApprovedAll(cont, this.$address);
      if (res == true) {
        this.changes = 1;
      }
    },
    // 授权
    async setApproveAll() {
      if (currCont) {
        const res = await contracts.setApproveAll(currCont, this.$address);
        if (res == true) {
          this.changes = 1;
        }
      }
    },
    // 白名单
    async whiteList(cont) {
      const res = await contracts.isWhitelist(cont, this.$address);
      if (res == false) {
        // alert("不在白名单，无法创建NFT");
        this.$message.error("不在白名单，无法创建NFT");
        this.$router.push("/");
        return;
      }
    },
    // 上传图片
    uploadFile() {
      this.upLoading = true;
      this.$refs.upload.submit();
    },
    // 上传成功
    async uploadSuccess(resp) {
      console.log("uploadSuccess=>", resp);
      this.formLabelAlign.image = resp.ipfs;

      let props = {};
      for (let key in this.formLabelAlign.propertiess) {
        let name = this.formLabelAlign.properties[key];
        let value = this.formLabelAlign.propertiess[key];
        props[name] = value;
      }

      const jsonResp = await contracts.uploadJson(
        this.formLabelAlign.image,
        this.formLabelAlign.title,
        this.formLabelAlign.description,
        props
      );
      console.log("jsonResp=>", jsonResp);

      const tokenResp = await contracts.newTokenId(this.formLabelAlign.token);
      console.log("tokenResp=>", tokenResp);
      this.formLabelAlign.tokenid = tokenResp.data.tokenid;

      const mintResp = await contracts.mintErc1155(
        currCont,
        tokenResp.data.tokenid,
        tokenResp.data.signature,
        [],
        this.formLabelAlign.supply,
        jsonResp.ipfs.replace("ipfs://ipfs", "")
      );
      console.log("mintResp=>", mintResp);

      const addResp = await contracts.addItem(mintResp.hash, 3);
      console.log("addResp=>", addResp);
      this.upLoading = false;
      this.changes = 2;
    },
    // 创建订单
    async createOrder() {
      this.ordLoading = true;
      const order = {
        key: {
          salt: BigNumber.from(randomHex(32)),
          owner: this.$address,
          sellAsset: {
            token: this.formLabelAlign.token,
            tokenId: BigNumber.from(this.formLabelAlign.tokenid),
            assetType: 3,
          },
          buyAsset: {
            token: "0x0000000000000000000000000000000000000000",
            tokenId: BigNumber.from("0"),
            assetType: 1,
          },
        },
        selling: BigNumber.from(this.formLabelAlign.supply || "1"),
        buying: this.$parseEther(this.formLabelAlign.price || "0"),
        sellerFee: BigNumber.from(this.formLabelAlign.royalties || "100"),
      };
      console.log(order);
      const provider = getProvider();
      const signResp = await contracts.orderSigner(provider.getSigner(), order);
      console.log("signResp=>", signResp);

      try {
        const saleResp = await contracts.changeSale(
          order.key.sellAsset.token,
          order.key.sellAsset.tokenId.toString(),
          1
        );
        console.log("saleResp=>", saleResp);
      } catch (err) {
        this.ordLoading = false;
        alert(err.data ? err.data.message : err.message);
        return;
      }

      const createOrder = contracts.sequence(order);

      try {
        const createOrderResp = await contracts.createOrder(
          createOrder,
          signResp
        );
        console.log("createOrderResp=>", createOrderResp);
      } catch (err) {
        this.ordLoading = false;
        alert(err.data ? err.data.message : err.message);
        return;
      }
      this.ordLoading = false;
      this.changes = 3;
      // alert("创建完成");
      this.$message({
        message: "创建完成",
        type: "success",
      });
      this.dialogVisible = false;
      this.$router.push({
        name: "personalCenter",
        params: { address: this.user_id },
      });
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
