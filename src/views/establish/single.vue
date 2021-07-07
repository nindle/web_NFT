<template>
  <div class="establish">
    <div class="rollback" @click="$router.go(-1)">
      <i class="el-icon-arrow-left" />
      Mangae collectible type
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
      <el-upload
        ref="upload"
        action="https://api.lionnft.io/v1/upload/file"
        list-type="picture-card"
        :auto-upload="false"
        :on-success="uploadSuccess"
      >
        <p>PNG, GIF, WEBP, MP4 or MP3. Max 30mb.</p>
        <el-button plain round>Choose file</el-button>
        <div slot="file" slot-scope="{ file }">
          <img class="el-upload-list__item-thumbnail" :src="file.url" alt="">
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
        <el-switch v-model="value" />
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

      <el-form-item v-show="value" label="Price">
        <el-input
          v-model="formLabelAlign.price"
          placeholder="e.g.Redeemable T-Shirt with logo"
        >
          <template slot="append">BNB</template>
        </el-input>
      </el-form-item>

      <div style="position: relative; margin-bottom: 10px">
        <span style="font-size: 20px; font-weight: bold; color: #333333">
          Unlock once purchased
        </span>
        <el-switch v-model="values" />
      </div>

      <el-form-item label="Title">
        <el-input
          v-model="formLabelAlign.title"
          placeholder="e.g. “Redeemable T-Shirt with logo”"
        />
      </el-form-item>

      <el-form-item label="Description(Optional)">
        <el-input
          v-model="formLabelAlign.description"
          placeholder="e.g.”After purchasing you”ll be able to get the real T-Shirt”"
        />
      </el-form-item>

      <el-form-item label="Royalties">
        <el-input v-model="formLabelAlign.royalties" placeholder="E.g. 10%">
          <template slot="append">%</template>
        </el-input>
      </el-form-item>

      <el-form-item label="Properties (Optional)">
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
        Create item
      </el-button>
    </el-form>
    <el-dialog title="Create NFT steps" :visible.sync="dialogVisible" center>
      <div class="Approve">
        <p class="Approve_a">Approve</p>
        <p class="Approve_b">Checking balance and approving</p>
        <el-button
          :disabled="aprLoading == true || changes == 1"
          :class="changes == '' ? 'Approve_c' : 'Approve_cc'"
          @click="setApproveAll"
        >
          {{ changes >= 1 ? "Done" : aprLoading ? "In Progress..." : "Start" }}
        </el-button>
      </div>
      <div class="Approve">
        <p class="Approve_a">Upload files & Mint token</p>
        <p class="Approve_b">Call contract method</p>
        <el-button
          :disabled="upLoading == true || changes == 2"
          :class="changes == '1' ? 'Approve_c' : 'Approve_cc'"
          @click="uploadFile"
        >
          {{ changes >= 2 ? "Done" : upLoading ? "In Progress..." : "Start" }}
        </el-button>
      </div>
      <div class="Approve">
        <p class="Approve_a">Sign sell order</p>
        <p class="Approve_b">sign sell order using your wallet</p>
        <el-button
          :disabled="ordLoading == true || changes == 3"
          :class="changes == '2' ? 'Approve_c' : 'Approve_cc'"
          @click="createOrder"
        >
          {{ changes == 3 ? "Done" : ordLoading ? "In Progress..." : "Start" }}
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import contracts from "../../wallet/contracts";
import {
  initWallet,
  Contracts721,
  getProvider,
  randomHex,
} from "../../wallet/wallet";
import { BigNumber } from "@ethersproject/bignumber";

let currCont = null;
export default {
  name: "Establish",
  props: {},
  data() {
    return {
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
        token: "0x3f1f2Eff3A7EF3890b1b91cf1b13e72899Bb1A38",
        image: "",
        title: "",
        price: "",
        description: "",
        type: "",
        royalties: "",
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
  created() {},
  async mounted() {
    const address = await initWallet();
    console.log(address);
    if (address != "") {
      const cont721 = Contracts721();
      currCont = cont721;
      await this.whiteList(cont721);
      await this.isApprovedAll(cont721);
    }
  },
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
        alert("不在白名单，无法创建NFT");
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

      const mintResp = await contracts.mintErc721(
        currCont,
        tokenResp.data.tokenid,
        tokenResp.data.signature,
        [],
        jsonResp.ipfs.replace("ipfs://ipfs", "")
      );
      console.log("mintResp=>", mintResp);

      const addResp = await contracts.addItem(mintResp.hash, 4);
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
            assetType: 4,
          },
          buyAsset: {
            token: "0x0000000000000000000000000000000000000000",
            tokenId: BigNumber.from("0"),
            assetType: 1,
          },
        },
        selling: BigNumber.from("1"),
        buying: this.$parseEther(this.formLabelAlign.price || "0.1"),
        sellerFee: BigNumber.from(this.formLabelAlign.royalties || "100"),
      };
      console.log(order);
      const provider = getProvider();
      const signResp = await contracts.orderSigner(provider.getSigner(), order);
      console.log("signResp=>", signResp);

      const saleResp = await contracts.changeSale(
        order.key.sellAsset.token,
        order.key.sellAsset.tokenId.toString(),
        1
      );
      console.log("saleResp=>", saleResp);

      const createOrder = contracts.sequence(order);

      const createOrderResp = await contracts.createOrder(
        createOrder,
        signResp
      );
      console.log("createOrderResp=>", createOrderResp);
      this.ordLoading = false;
      this.changes = 3;
      alert("创建完成");
      this.dialogVisible = false;
    },
  },
};
</script>

<style lang="less" scoped>
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
