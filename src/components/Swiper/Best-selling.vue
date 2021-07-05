<template>
  <div style="position: relative">
    <swiper
      ref="bestSelling"
      style="padding: 0 16px"
      :options="swiperOption"
      @swiper="onSwipers"
      @click="ggs"
      @slideChange="onSlideChanges"
    >
      <swiper-slide
        v-for="(item, index) in userInfoList.slice(0, 5)"
        :key="index"
      >
        <div class="neirong">
          <img
            :src="item.background"
            style="width: 371px; height: 186px"
            alt=""
          >
          <img
            :src="item.headPortrait"
            style="
              width: 60px;
              height: 60px;
              position: absolute;
              top: 156px;
              left: 154px;
            "
            alt=""
          >
          <h3 class="username">{{ item.user_name }}</h3>
          <p class="usermessage">{{ item.message }}</p>
        </div>
      </swiper-slide>
      <div slot="pagination" class="swiper-pagination" />
    </swiper>
    <div class="swiper-button-prev bestSelling-left">
      <img src="../../assets/left.png" alt="">
    </div>
    <div class="swiper-button-next bestSelling-right">
      <img src="../../assets/right.png" alt="">
    </div>
  </div>
</template>
<script>
import "swiper/swiper-bundle.min.css";
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import SwiperCore, { Autoplay, Navigation } from "swiper";

SwiperCore.use([Navigation, Autoplay]);

// import Http from "../../utils/http";
import $http from '../../utils/request';

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      swiperOption: {
        slidesPerView: 3,
        spaceBetween: 40,
        slidesPerGroup: 1,
        loop: true,
        loopFillGroupWithBlank: true,
        pagination: {
          el: ".swiper-pagination",
          // type: "fraction",
          // clickable: true,
        },
        navigation: {
          nextEl: ".bestSelling-right",
          prevEl: ".bestSelling-left",
        },
      },
      userInfoList: [],
    };
  },
  computed: {
    swiper() {
      return this.$refs.bestSelling.$swiper;
    },
  },
  mounted() {
    this.getUserInfo();
  },
  methods: {
    onSwipers(swiper) {
      console.log(swiper);
    },
    onSlideChanges() {
      console.log("slide change");
    },
    ggs() {
      console.log("click");
    },
    async getUserInfo() {
      const resp = await $http.get("https://api.lionnft.io/v1/user/top?user=seller");
      console.log(resp);
      this.userInfoList = resp.list;
      this.userInfoList.forEach((item) => {
        item.headPortrait = require("../../assets/head.png");
        item.background = require("../../assets/bgc.png");
        item.message = "暂无简介1";
        if (item.user_name == null) {
          item.user_name = "暂无名称";
        }
        //  headPortrait: require("../../assets/head.png"),
        // background: require("../../assets/bgc.png"),
      });
      // this.userInfoList = resp.list;
    },
  },
};
</script>
<style scoped>
.headPortrait {
  width: 60px;
  height: 60px;
  position: absolute;
  top: 0;
  left: 0;
}
.userprice {
  margin-left: 20px;
  margin-top: 10px;
  font-size: 18px;
  font-family: Source Han Sans CN;
  font-weight: 500;
  color: #0066ed;
}
.neirong .userpriceimg img {
  width: 21px;
  height: 18px;
}
.userpriceimg_a {
  width: 100%;
  height: 100%;
}
.usermessage {
  padding: 20px;
  text-align: center;
  font-size: 14px;
  font-family: Source Han Sans CN;
  font-weight: 400;
  color: #898989;
}
.username {
  margin-top: 50px;
  text-align: center;
  font-size: 20px;
  font-family: Source Han Sans CN;
  font-weight: bold;
  color: #333333;
}
.neirong {
  overflow: hidden;
  width: 372px;
  height: 400px;
  cursor: pointer;
  box-shadow: 0px 0px 19px 0px rgba(186, 191, 205, 0.45);
  border-radius: 20px;
}
.neirong img {
  width: 372px;
  height: 389px;
}
.swiper-button-prev {
  left: -85px;
  right: auto;
  top: 49%;
}
.swiper-button-prev img {
  width: 72px;
  height: 72px;
}
.swiper-button-next {
  right: -85px;
  left: auto;
  top: 49%;
}
.swiper-button-next img {
  width: 72px;
  height: 72px;
}
.swiper-button-prev:after,
.swiper-button-next:after,
.swiper-container-rtl .swiper-button-next:after {
  content: "none";
}
.swiper-container {
  overflow-x: hidden;
  height: 450px;
}
</style>
