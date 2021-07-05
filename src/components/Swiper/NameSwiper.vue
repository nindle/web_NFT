<template>
  <div style="position: relative">
    <swiper
      ref="NameSwiper"
      style="padding: 10px 16px"
      :options="swiperOptions"
      @swiper="onSwiper"
      @click="$router.push({ name: 'details', params: { id: index } })"
      @slideChange="onSlideChange"
    >
      <swiper-slide v-for="(item, index) in showList.slice(0, 5)" :key="index">
        <div
          class="neirong"
          @mouseover="hoverIndex = index"
          @mouseleave="hoverIndex = -2"
          @click="
            $router.push({
              name: 'details',
              params: { id: item.token_id, token: item.token },
            })
          "
        >
          <img
            :src="
              item.prop_image.replace(
                'ipfs://ipfs/',
                'https://api.lionnft.io/v1/upload/view?hash='
              )
            "
            :class="{ hoverBg: index == hoverIndex }"
            alt=""
            @mouseover="hoverIndex = index"
            @mouseleave="hoverIndex = -2"
          >
          <h3 class="username">{{ item.prop_name }}</h3>
          <p class="usermessage">{{ item.message }}</p>
          <div class="userprice">
            <span style="float: left; color: #0066ed; margin-right: 20px">
              {{ item.price }} {{ item.coin_name }}
            </span>
            <span> {{ item.supply_sell }}/{{ item.supply }}</span>
            <div class="userpriceimg" style="float: right; margin-right: 40px">
              <img src="../../assets/souchang.png" alt=""> 2314
            </div>
          </div>
          <div
            :class="hoverIndex == index ? 'redirects' : 'redirect'"
            @mouseover="hoverIndex = index"
            @mouseleave="hoverIndex = -2"
          >
            Buy now →
          </div>
        </div>
      </swiper-slide>
      <div slot="pagination" class="swiper-pagination" />
    </swiper>
    <div class="swiper-button-prev NameSwiperleft">
      <img src="../../assets/left.png" alt="">
    </div>
    <div class="swiper-button-next NameSwiperright">
      <img src="../../assets/right.png" alt="">
    </div>
  </div>
</template>
<script>
// Import Swiper Vue.js components

import "swiper/swiper-bundle.min.css";
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
// import SwiperCore, { Autoplay, Navigation } from "swiper";

import Swiper2, { Navigation, Pagination } from "swiper";
Swiper2.use([Navigation, Pagination]);
// import Http from "../../utils/http";
import $http from "../../utils/request";

import { ethers } from "ethers";

// SwiperCore.use([Navigation, Autoplay]);

export default {
  name: "SwiperExamplePagination",
  title: "Pagination",
  components: {
    Swiper,
    SwiperSlide,
  },

  data() {
    return {
      hover: false,
      hoverIndex: -2,
      swiperOptions: {
        slidesPerView: 3,
        spaceBetween: 40,
        slidesPerGroup: 1,
        loop: true,
        loopFillGroupWithBlank: true,
        pagination: {
          el: ".swiper-pagination",
          // type: "fraction",
          clickable: true,
        },
        navigation: {
          nextEl: ".NameSwiperright",
          prevEl: ".NameSwiperleft",
        },
        // centeredSlides: true,
      },
      showList: [],
    };
  },
  computed: {
    swiper() {
      return this.$refs.NameSwiper.$swiper;
    },
  },
  mounted() {
    this.getList();
  },
  methods: {
    onSwiper(swiper) {
      console.log(swiper);
    },
    onSlideChange() {
      console.log("slide change");
    },
    async getList() {
      const resp = await $http.get("https://api.lionnft.io/v1/explore/list");
      this.showList = resp.list;
      this.showList.forEach((item, index) => {
        if (this.showList[index].price === "") {
          this.showList[index].price = "暂无价格";
        } else {
          this.showList[index].price = ethers.utils.formatUnits(
            this.showList[index].price
          );
        }
      });
    },
  },
};
</script>
<style lang="less" scoped>
.hoverBg {
  filter: blur(8px);
}
.redirect {
  display: none;
}
.redirects {
  display: block;
  position: absolute;
  top: 150px;
  left: 70px;
  width: 238px;
  height: 59px;
  line-height: 59px;
  text-align: center;
  border: 1px solid #ffffff;
  border-radius: 10px;
  z-index: 10;
  font-size: 24px;
  font-family: Source Han Sans CN;
  font-weight: 500;
  color: #ffffff;
}
.swiper {
  position: relative;
}
.userprice {
  margin-left: 20px;
  margin-top: 10px;
  font-size: 18px;
  font-family: Source Han Sans CN;
  font-weight: 500;
}

.userpriceimg_a {
  width: 100%;
  height: 100%;
}
.usermessage {
  margin-left: 20px;
  margin-top: 10px;
  font-size: 18px;
  font-family: Source Han Sans CN;
  font-weight: 500;
  color: #898989;
}
.username {
  /* width: 74px; */
  margin-top: 10px;
  margin-left: 20px;
  font-size: 20px;
  font-family: Source Han Sans CN;
  font-weight: bold;
  color: #333333;
}
.neirong {
  cursor: pointer;
  overflow: hidden;
  width: 372px;
  height: 520px;
  box-shadow: 0px 0px 19px 0px rgba(186, 191, 205, 0.45);
  border-radius: 20px;
  z-index: 10;
  // background: rgb(247, 245, 245);
}
.neirong img {
  width: 372px;
  height: 389px;
}
.neirong .userpriceimg img {
  width: 21px;
  height: 18px;
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
  height: 570px;
}
</style>
