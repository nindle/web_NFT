<template>
  <div>
    <!-- 个人中心背景图 -->
    <div class="personalCenter-bgc"></div>
    <!-- 个人中头像图 -->
    <div class="personalCenter-pic">
      <img src="../../assets/head.png" alt="" />
    </div>
    <!-- 个人简介 -->
    <div class="personalCenter-id">
      <p style="color: #09090a; font-size: 20px">Skywent</p>
      <p>OxDa25EF...b523Fbaf <img src="../../assets/fz.png" alt="" /></p>

      <el-button
        round
        style="
          border-radius: 21px;
          width: 130px;
          height: 43px;
          border: 1px solid #eceef0;
          color: #09090a;
          font-weight: 500;
        "
        @click="$router.push({ name: 'redactUser', params: { userId: '123' } })"
        >Edit profile</el-button
      >
      <div
        style="
          width: 43px;
          height: 41px;
          border: 1px solid #eceef0;
          border-radius: 50%;
          display: inline-block;
          margin-left: 10px;
        "
      >
        <img
          src="../../assets/share.png"
          alt=""
          style="width: 17px; height: 17px"
        />
      </div>
    </div>
    <!-- 产品系列 -->
    <div class="personalCenter-Tabs">
      <el-tabs v-model="activeName">
        <el-tab-pane label="CREATED" name="first">
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
                <div
                  class="userpriceimg"
                  style="float: right; margin-right: 40px"
                >
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
        </el-tab-pane>
        <el-tab-pane label="SOLD" name="second">
          <ul class="exhibition">
            <li
              v-for="(item, index) in userUrl.slice(0, a)"
              :key="index"
              @click="
                $router.push({ name: 'establishs', params: { id: index } })
              "
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
                <div
                  class="userpriceimg"
                  style="float: right; margin-right: 40px"
                >
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
        </el-tab-pane>
        <el-tab-pane label="BOUGHT" name="third">
          <ul class="exhibition">
            <li
              v-for="(item, index) in userUrl.slice(0, a)"
              :key="index"
              @click="$router.push({ name: 'purchase', params: { id: index } })"
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
                <div
                  class="userpriceimg"
                  style="float: right; margin-right: 40px"
                >
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
        </el-tab-pane>
        <el-tab-pane label="COLLECTION" name="fourth">
          <ul class="exhibition">
            <li
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
                <div
                  class="userpriceimg"
                  style="float: right; margin-right: 40px"
                >
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
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
export default {
  name: "PersonalCenter",
  props: {},
  data() {
    return {
      hover: false,
      hoverIndex: -2,
      a: 6,
      activeName: "first",
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
    };
  },
  created() {},
  mounted() {},
  methods: {
    loadMore() {
      this.a += 6;
    },
  },
};
</script>

<style lang="less" scoped>
.personalCenter-bgc {
  width: 100%;
  height: 224px;
  background-image: url("../../assets/bj.png");
  z-index: 2;
}
.personalCenter-pic {
  position: absolute;
  left: 50%;
  top: 200px;
  transform: translate(-50%);
  width: 126px;
  height: 126px;
  // border: 1px solid #ffffff;
  border-radius: 50%;
}
.personalCenter-pic img {
  width: 100%;
  height: 100%;
  // border: 1px solid #ffffff;
  border-radius: 50%;
}
.personalCenter-id {
  text-align: center;
  width: 300px;
  line-height: 40px;
  margin: 0 auto;
  margin-top: 50px;
}
.personalCenter-Tabs {
  width: 1200px;
  margin: 0 auto;
}
.personalCenter-Tabs-a {
  text-align: center;
  margin: 30px 0;
  line-height: 40px;
}
.exhibition {
  display: flex;
  position: relative;
  width: 1200px;
  margin: 0 auto;
  flex-wrap: wrap;
}
.exhibition li {
  position: relative;
  margin-right: 75px;
  margin-bottom: 50px;
  width: 346px;
  height: 372px;
  border-radius: 36px;
  float: left;
  box-shadow: 0px 0px 8px 1px rgba(140, 140, 140, 0.26);
}
.exhibition img {
  width: 346px;
  height: 296px;
  background: #ffffff;

  // border-top-left-radius: 36px;
  // border-top-right-radius: 36px;
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
  bottom: 10px;
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
.exhibition {
  display: flex;
  position: relative;
  width: 1200px;
  margin: 0 auto;
  flex-direction: row;
  flex-wrap: wrap;
}
.exhibition li {
  position: relative;
  margin-right: 42px;
  margin-bottom: 60px;
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
  bottom: 0px;
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
