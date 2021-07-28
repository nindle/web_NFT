<template>
  <div class="cast">
    <div class="rollback" @click="$router.go(-1)">
      <i class="el-icon-arrow-left" />{{ $t("establish.go") }}
    </div>
    <div class="create">
      {{ $t("establish.Create") }}
    </div>
    <div class="create_a">
      {{ $t("establish.jieshao") }}
    </div>

    <div class="Choice">
      <div class="Single" @click="Single">
        <img src="../../assets/single.png" alt="" />
        <p>{{ $t("establish.dan") }}</p>
      </div>
      <div class="Multiple" @click="Multiple">
        <img src="../../assets/Multiple.png" alt="" />
        <p>{{ $t("establish.duo") }}</p>
      </div>
      <div class="weiqi" @click="dialogVisible = true">
        <img src="../../assets/weiqijinkou.jpg" alt="" />
        <p>{{ $t("establish.weiqi") }}</p>
      </div>
    </div>
    <div class="prompt">
      {{ $t("establish.zijin") }}
    </div>

    <el-dialog
      :title="$t('establish.tishi')"
      :visible.sync="dialogVisible"
      width="50%"
    >
      <p class="tishi">{{ $t("establish.tihsi1") }}</p>
      <p class="tishi">{{ $t("establish.tishi2") }}</p>
      <iframe
        class="iframestyle"
        id="iframeid"
        src="https://lionnft.io/weiqi.html"
      />
      <span slot="footer" class="dialog-footer">
        <el-button @click="weiqiFn">{{ $t("establish.quxiao") }} </el-button>
        <el-button type="primary" @click="weiqiFn" :disabled="next">
          {{ $t("establish.xiayibu") }}
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import imgUrl from "../../assets/xiaohuli.png";
import { initWallet, getBalance } from "../../wallet/wallet";
import { userInfoApi } from "../../api/user";

export default {
  data() {
    return {
      next: true,
      dialogVisible: false,
    };
  },
  computed: {},
  mounted() {
    window.addEventListener(
      "message",
      (ev) => {
        var data = ev.data;
        if (data.code === 10000) {
          this.next = false;
        }
      },
      false
    );
    var timer = setTimeout(this.setTimeoutFn, 500);
    timer;
  },
  methods: {
    weiqiFn() {
      this.dialogVisible = false;
      this.$router.push({
        name: "Weiqi",
        // params: { userId: sessionStorage.getItem("address") },
      });
    },

    setTimeoutFn() {
      if (sessionStorage.getItem("address") == null) {
        this.$message.error("未登录");
      } else if (sessionStorage.getItem("userInfo") == null) {
        this.$message.error("个人信息不全");
        this.$router.push({
          name: "redactUser",
          params: { userId: sessionStorage.getItem("address") },
        });
      }
    },

    Single() {
      this.$router.push({ name: "single", params: { userId: "123" } });
    },
    Multiple() {
      this.$router.push({ name: "multiple", params: { userId: "123" } });
    },
  },
};
</script>

<style scoped lang='less'>
.tishi {
  color: red;
  font-family: Source Han Sans CN;
}
/deep/.el-dialog {
  margin-top: 7vh !important;
}
.iframestyle {
  width: 100%;
  height: 620px;
  border: 0;
}
.cast {
  width: 1200px;
  height: 700px;
  margin: 0 auto;
}
.rollback {
  padding-top: 40px;
  font-size: 14px;
  cursor: pointer;
  font-family: Source Han Sans CN;
  font-weight: 500;
  color: #333333;
}
.create {
  font-size: 30px;
  font-family: Source Han Sans CN;
  font-weight: bold;
  color: #333333;
  padding-top: 40px;
}
.create_a {
  width: 421px;
  padding-top: 15px;
  font-size: 14px;
  font-family: Source Han Sans CN;
  font-weight: 400;
  color: #898989;
  line-height: 23px;
}
.Choice {
  margin-top: 40px;
  display: flex;
  flex-direction: row;
}
.Choice p {
  font-size: 16px;
  font-family: Source Han Sans CN;
  font-weight: bold;
  color: #333333;
}
.Single {
  width: 353px;
  height: 258px;
  text-align: center;
  cursor: pointer;
  margin-bottom: 40px;
  border: 1px solid #e3e3e4;
  border-radius: 10px;
}
.Single img {
  margin-top: 50px;
  width: 189px;
  height: 160px;
}

.Multiple {
  width: 353px;
  height: 258px;
  text-align: center;
  cursor: pointer;
  margin-left: 80px;
  border: 1px solid #e3e3e4;
  border-radius: 10px;
}
.Multiple img {
  margin-top: 50px;
  width: 189px;
  height: 160px;
}
.weiqi {
  width: 353px;
  height: 258px;
  text-align: center;
  cursor: pointer;
  margin-left: 80px;
  border: 1px solid #e3e3e4;
  border-radius: 10px;
}
.weiqi img {
  margin-top: 50px;
  width: 189px;
  height: 160px;
}
.prompt {
  width: 408px;
  font-size: 14px;
  font-family: Source Han Sans CN;
  font-weight: 400;
  color: #898989;
  line-height: 23px;
}
</style>
