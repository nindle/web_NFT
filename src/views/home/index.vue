<template>
  <div class="bsc-box">
    <div style="width: 100%">
      <!-- 轮播图 -->
      <template>
        <el-carousel indicator-position="outside">
          <el-carousel-item v-for="(item, index) in imgUrl" :key="index">
            <img :src="item.url" alt="" />
          </el-carousel-item>
        </el-carousel>
      </template>
      <!-- 轮播图中的定位 搜索创建 -->
      <div class="el-main-a">
        <div class="el-main-b">
          {{ $t("home.title") }}
        </div>
        <div class="el-main-c">
          {{ $t("home.content") }}
        </div>
        <div class="el-main-d">
          <el-button
            id="Createstyle"
            plain
            @click="$router.push({ name: 'establish' })"
          >
            {{ $t("home.buttons") }}
            <i class="el-icon-arrow-right el-icon--right" />
          </el-button>
        </div>
      </div>
      <!-- 热门商品展示 -->
      <div class="exhibition">
        <div class="exhibition-a">
          <div class="exhibition-b">
            {{ $t("home.NameSwiper") }}
          </div>
          <div style="height: 300px, width:100%">
            <NameSwiper />
          </div>
        </div>
      </div>
      <div class="exhibition">
        <div class="exhibition-a">
          <div class="exhibition-b">
            {{ $t("home.author") }}
          </div>
          <div style="height: 300px, width:100%">
            <Bestselling />
          </div>
        </div>
      </div>
      <div class="introduce">
        <p>{{ $t("home.introduce") }}</p>
        <ul>
          <li>
            <img src="../../assets/qb@2x.png" alt="" />
            <p class="introduce_title">
              {{ $t("home.wallet") }}
            </p>
            <p class="introduce_content">
              {{ $t("home.walletintroduce") }}
            </p>
          </li>
          <li>
            <img src="../../assets/cz@2x.png" alt="" />
            <p class="introduce_title">
              {{ $t("home.collect") }}
            </p>
            <p class="introduce_content">
              {{ $t("home.collectintroduce") }}
            </p>
          </li>
          <li>
            <img src="../../assets/tp@2x.png" alt="" />
            <p class="introduce_title">
              {{ $t("home.establish") }}
            </p>
            <p class="introduce_content">
              {{ $t("home.establishintroduce") }}
            </p>
          </li>
          <li>
            <img src="../../assets/sm@2x.png" alt="" />
            <p class="introduce_title">
              {{ $t("home.sale") }}
            </p>
            <p class="introduce_content">
              {{ $t("home.saleintroduce") }}
            </p>
          </li>
        </ul>
        <!-- <img src="../../assets/zanshi1.png" alt="" /> -->
      </div>
      <el-button
        id="ExploretheBrowse"
        type="primary"
        @click="$router.replace('/bazaar')"
      >
        {{ $t("home.bazaar") }}
      </el-button>
      <div class="sponsor">
        <img src="../../assets/zanzhushang.png" alt="" />
      </div>
    </div>
  </div>
</template>
<script>
import NameSwiper from "../../../src/components/Swiper/NameSwiper";
import Bestselling from "../../../src/components/Swiper/Best-selling";

export default {
  name: "Home",
  components: {
    NameSwiper,
    Bestselling
  },
  props: {},
  data() {
    return {
      a: 3,

      imgUrl: [
        { url: require("../../assets/bannar7.jpg") },
        // { url: require("../../assets/bannar2.jpeg") },
        { url: require("../../assets/bannar3.jpg") },
        // { url: require("../../assets/bannar4.jpeg") },
        { url: require("../../assets/bannar5.jpg") }
        // { url: require("../../assets/bannar6.jpeg") },
      ]
    };
  },
  watch: {},
  created() {},
  mounted() {},
  methods: {}
};
</script>

<style lang="less" scoped>
#Createstyle {
  border: 1px solid #2081e2;
  width: 200px;
  height: 55px;
  line-height: 55px;
  background: #ffffff;
  color: #0066ed;
  border: 3px solid #0066ed;
  border-radius: 10px;
  padding: 0;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

.bsc-box {
  width: 100%;
  // height: 100%;
}
.el-header {
  height: 68px;
  padding: 0;
}
.header-login {
  width: 99px;
  height: 30px;
  margin-left: 50px;
}
.header-input {
  width: 719px;
  height: 43px;
  margin: 8px 0 0 200px;
}
.header-icon {
  float: right;
  height: 60px;
  line-height: 68px;
}
.icon-public {
  margin-right: 20px;
  font-size: 16px;
}
.el-main {
  position: relative;
  padding: 0;
}

.exhibition-a {
  background-color: #fff;
  width: 1220px;
  height: 100%;
  margin: 0 auto;
}
.exhibition-b {
  text-align: center;
  font-size: 24px;
  color: #09090a;
  // padding-top: 70px;
  // padding-bottom: 60px;
  margin: 60px 0;
}
.exhibition-c {
  width: 373px;
  height: 401px;
  background: #ffffff;
  border: 1px solid #d6d6d6;
  border-radius: 10px;
  margin-right: 25px;
  margin-top: 40px;
}
.bottom {
  // width: 1920px;
  height: 238px;
  background: #262b34;
  // line-height: 118px;
  text-align: center;
}

hr {
  border: 1px solid #fff;
  margin-top: 55px;
  margin-bottom: 33px;
}
.el-carousel {
  margin: 0;
  padding: 0;
  border: 0;
  width: 100%;
}
/deep/ .el-carousel__container {
  height: 540px !important;
  overflow: hidden;
}

.el-carousel__indicators {
  bottom: 0;
}
.el-main-a {
  position: absolute;
  top: 178px;
  left: 19%;
  height: 300px;
  width: 484px;
  z-index: 10;
}
.el-main-b {
  width: 518px;
  height: 89px;
  font-size: 40px;
  font-family: Source Han Sans CN;
  font-weight: bold;
  color: #fff;
  line-height: 46px;
}
.el-main-d i {
  width: 58px;
  height: 50px;
  line-height: 50px;
  color: #fff;
  float: right;
  background: #0066ed;
}
.el-main-c {
  width: 272px;
  height: 53px;
  font-size: 20px;
  font-family: Source Han Sans CN;
  font-weight: 400;
  color: #bdbdbd;
  line-height: 32px;
  margin: 30px 0;
}
/deep/ .el-carousel__indicators--outside {
  position: absolute;
  bottom: 0px;
  left: 50%;
  transform: translate(-50%);
  z-index: 5;
}
/deep/.el-carousel__button {
  width: 15px;
  height: 15px;
  border-radius: 7px;
  background-color: #2081e2;
}
.hotcommodity {
  width: 850px;
  // height: 300px;
  margin: 0 auto;
  border: 1px solid red;
  display: flex;
  flex-direction: row;
  overflow: hidden;
}
.introduce {
  height: 450px;
  margin-top: 60px;
  padding-top: 40px;
  background: #f8fbff;
  // line-height: 118px;
  text-align: center;
}
.introduce ul {
  width: 1200px;
  height: 320px;
  margin: 0 auto;
  margin-top: 50px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.introduce ul img {
  width: 40px;
  height: 37px;
  margin-bottom: 30px;
}
.introduce ul .introduce_title {
  font-size: 18px;
  font-family: Source Han Sans CN;
  font-weight: 500;
  margin-bottom: 20px;
  color: #333333;
}
.introduce ul .introduce_content {
  width: 240px;
  font-size: 14px;
  font-family: Source Han Sans CN;
  font-weight: 400;
  color: #898989;
}
.introduce p {
  font-size: 24px;
  font-family: Source Han Sans CN;
  font-weight: bold;
  color: #09090a;
}
#ExploretheBrowse {
  width: 204px;
  height: 49px;
  margin: 30px 44%;
}
.sponsor {
  // height: 118px;
  background: #627188;
  // line-height: 118px;
  text-align: center;
}
</style>
