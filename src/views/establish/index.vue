<template>
  <div class="cast">
    <div class="rollback" @click="$router.go(-1)">
      <i class="el-icon-arrow-left" />Go back
    </div>
    <div class="create">Create collectible</div>
    <div class="create_a">
      Choose “Single” if you want your collectible to be one of a kind or
      “Multiple” if you want to sell one collectible multiple times
    </div>
    <div class="Choice">
      <div class="Single" @click="Single">
        <img src="../../assets/single.png" alt="">
        <p>Single</p>
      </div>
      <div class="Multiple" @click="Multiple">
        <img src="../../assets/Multiple.png" alt="">
        <p>Multiple</p>
      </div>
    </div>
    <div class="prompt">
      We do not own your private keys and cannot access your funds without your
      confirmation
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {},
  mounted() {
    console.log(sessionStorage.getItem("address"));
    var timer = setTimeout(this.setTimeoutFn, 500);
    timer;
  },
  methods: {
    setTimeoutFn() {
      if (sessionStorage.getItem("userInfo") == null) {
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
  width: 516px;
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
  width: 516px;
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
.prompt {
  width: 408px;
  font-size: 14px;
  font-family: Source Han Sans CN;
  font-weight: 400;
  color: #898989;
  line-height: 23px;
}
</style>
