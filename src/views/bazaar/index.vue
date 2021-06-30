<template>
  <div>
    <h2 class="bazaar_headline">Browse</h2>
    <ul class="exhibition">
      <li
        style="position: relative"
        v-for="(item, index) in userUrl.slice(0, a)"
        :key="index"
        @click="$router.push({ name: 'details', params: { id: index } })"
        @mouseover="hover = true"
        @mouseleave="hover = false"
      >
        <img
          :src="item.url"
          :class="{ hoverBg: index == hoverIndex }"
          @mouseover="hoverIndex = index"
          @mouseout="hoverIndex = -1"
          alt=""
        />
        <h3 class="username">{{ item.name }}</h3>
        <p class="usermessage">{{ item.message }}</p>
        <div class="userprice">
          <span style="float: left; color: #0066ed; margin-right: 20px">
            {{ item.price }} BNB
          </span>
          <span> 1/1</span>
          <div class="userpriceimg" style="float: right; margin-right: 40px">
            <img src="../../assets/souchang.png" alt="" /> 2314
          </div>
        </div>
        <div
          :class="hoverIndex == index ? 'redirects' : 'redirect'"
          @mouseover="hoverIndex = index"
          @mouseout="hoverIndex = -1"
        >
          Buy now →
        </div>
      </li>
      <div class="loadMore" v-if="a < userUrl.length" @click="loadMore">
        Load More
      </div>
      <div class="loadMore" v-else>没有更多了</div>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Bazaar",
  props: {},
  data() {
    return {
      hover: false,
      hoverIndex: -2,
      a: 6,
      b: 5,
      userUrl: [
        {
          url: require("../../assets/sp1.png"),
          name: "Lucy LU",
          message: "Superme China",
          price: 0.158,
        },
        {
          url: require("../../assets/sp2.png"),
          name: "Lucy LU",
          message: "Superme China",
          price: 0.158,
        },
        {
          url: require("../../assets/sp3.png"),
          name: "Lucy LU",
          message: "Superme China",
          price: 0.158,
        },
        {
          url: require("../../assets/sp4.png"),
          name: "Lucy LU",
          message: "Superme China",
          price: 0.158,
        },
        {
          url: require("../../assets/sp5.png"),
          name: "Lucy LU",
          message: "Superme China",
          price: 0.158,
        },
        {
          url: require("../../assets/sp6.png"),
          name: "Lucy LU",
          message: "Superme China",
          price: 0.158,
        },
        {
          url: require("../../assets/sp2.png"),
          name: "Lucy LU",
          message: "Superme China",
          price: 0.158,
        },
      ],
      optionMenu: [
        { url: require("../../assets/1.png"), optionMenuName: "New" },
        { url: require("../../assets/2.png"), optionMenuName: "Art" },
        { url: require("../../assets/3.png"), optionMenuName: "Domain Names" },
        {
          url: require("../../assets/4.png"),
          optionMenuName: "Virtual Worlds",
        },
        { url: require("../../assets/5.png"), optionMenuName: "Trading Cards" },
        { url: require("../../assets/6.png"), optionMenuName: "Collectibles" },
        { url: require("../../assets/7.png"), optionMenuName: "Sports" },
        { url: require("../../assets/8.png"), optionMenuName: "Utility" },
      ],
    };
  },
  created() {},
  mounted() {},
  methods: {
    loadMore() {
      this.a += 3;
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
  cursor: pointer;
}
.bazaar_headline {
  width: 1200px;
  height: 90px;
  line-height: 90px;
  margin: 0 auto;
  font-size: 29px;
  font-family: Source Han Sans CN;
  font-weight: bold;
  color: #000000;
}
.userList {
  width: 1200px;
  margin: 0 auto;
  height: 186px;
  overflow: hidden;
}
.userList-top {
  padding-top: 30px;
  font-size: 28px;
  color: #09090a;
}
.userList-user,
.userList-optionMenu {
  margin-top: 20px;
  height: 50px;
  float: left;
}
.userList-user li {
  width: 240px;
  height: 48px;
}
.userList-user li img {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  float: left;
}
.userList-user-index {
  float: left;
  line-height: 48px;
  margin-right: 15px;
}
.userList-user-a {
  margin-top: 4px;
  padding-left: 90px;
}
.userList-optionMenu {
  margin-right: 45px;
  cursor: pointer;
}
.exhibition {
  display: flex;
  position: relative;
  width: 1200px;
  // height: 1300px;
  margin: 0 auto;
  flex-direction: row;
  flex-wrap: wrap;
  cursor: pointer;
}
.exhibition li {
  position: relative;
  margin-right: 42px;
  margin-bottom: 50px;
  overflow: hidden;
  float: left;
  width: 372px;
  height: 520px;
  box-shadow: 0px 0px 19px 0px rgba(186, 191, 205, 0.45);
  border-radius: 20px;
}
.exhibition img {
  width: 372px;
  height: 389px;
  background: #ffffff;
}
.exhibition li:nth-child(3n + 0) {
  margin-right: 0px;
}
.exhibition-b {
  margin-left: 30px;
  padding-top: 15px;
}
.loadMore {
  width: 112px;
  height: 33px;
  line-height: 33px;
  text-align: center;
  background: #ffffff;
  border: 1px solid #bbbbbb;
  border-radius: 16px;
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translate(-50%);
}
.collection {
  width: 24px;
  height: 24px;
  position: absolute;
  top: 16px;
  right: 24px;
}
.neirong img {
  width: 372px;
  height: 389px;
}
.userpriceimg img {
  width: 21px;
  height: 18px;
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
  margin-top: 10px;
  margin-left: 20px;
  font-size: 20px;
  font-family: Source Han Sans CN;
  font-weight: bold;
  color: #333333;
}
.userprice {
  margin-left: 20px;
  margin-top: 10px;
  font-size: 18px;
  font-family: Source Han Sans CN;
  font-weight: 500;
}
</style>
