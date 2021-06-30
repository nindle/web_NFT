<template>
  <div class="details">
    <!-- 产品zs图 -->
    <img :src="data.url" alt="" />
    <div class="clear"></div>
    <!-- 产品信息 -->
    <ul class="details-a">
      <li style="color: #09090a; font-size: 24px">{{ data.title }}</li>
      <li style="font-size: 18px; color: #09090a; line-height: 34px">
        <img
          style="width: 34px; height: 34px"
          src="../../assets/2.png"
          alt=""
        />
        Art
      </li>
      <li style="color: #484848; font-size: 18px">
        0.5 BNB / 2021.5.3~2021.5.22
      </li>
      <li
        style="
          line-height: 27px;
          color: #84858a;
          font-size: 16px;
          width: 319px;
          height: 80px;
        "
      >
        "On a blazing hot afternoon, the best thing you can do is lie down on
        the cool tiles of the bottom of the pool" — Moses
      </li>
      <li>
        <el-button class="details-button" type="primary"
          >Undercarriage</el-button
        >
      </li>
      <li>
        <el-button
          plain
          round
          class="details-button2"
          @click="
            $router.push({
              name: 'modification',
              params: { data },
            })
          "
          >Edit</el-button
        >
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Details",
  props: {},
  data() {
    return {
      activeName: "first",
      data: {
        title: "SO COOL/MOSES",
        Optional: "On a blazing hot afternoon",
        url: require("../../assets/19.jpeg"),
      },
    };
  },
  created() {},
  mounted() {},
  methods: {},
};
</script>

<style lang="less" scoped>
.details {
  position: relative;
  display: flex;
  width: 1200px;
  height: 640px;
  margin: 0 auto;
  margin-top: 60px;
}
.details img {
  float: left;
  width: 640px;
  height: 640px;
  background: #ffffff;
  box-shadow: 0px 0px 8px 1px rgba(140, 140, 140, 0.26);
  border-radius: 36px;
}
.clear {
  clear: both;
}
.details-a {
  display: flex;
  flex-direction: column;
  padding-left: 81px;
  line-height: 60px;
}
.details-button {
  width: 317px;
  height: 45px;
  background: #2081e2;
  border-radius: 4px;
  margin-top: 30px;
}
.details-b {
  display: flex;
  border-bottom: 1px solid #eceef0;
}
.productdetails img {
  width: 48px;
  height: 48px;
  margin-right: 20px;
  border-radius: 50%;
}
.productdetails-a p {
  display: flex;
  height: 17px;
  line-height: 17px;
  flex-direction: column;
}
.productdetails-b p {
  height: 30px;
  line-height: 30px;
}
.collection {
  width: 24px;
  height: 24px;
  position: absolute;
  top: 28px;
  left: 584px;
}
.details-button2 {
  width: 317px;
  border: 1px solid #2081e2;
  height: 45px;
  border-radius: 4px;
}
</style>
