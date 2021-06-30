<template>
  <div>
    <div class="personalCenter-bgc"></div>  <!-- 个人中心背景图 -->
    <div class="personalCenter-pic"></div>  <!-- 个人中心头像图 -->
    <!-- 个人资料介绍 -->
    <div class="personalCenter-id">
      <p style="color: #09090A;font-size: 20px;">Skywent</p>
      <p>OxDa25EF...b523Fbaf</p>
      <p style="color: #84858A;font-size: 16px;line-height: 33px;">
        Verified Cryptoartist | 2D&3D illustrator | Created AirNFTs logos: 20/20
        | New collection coming soon
      </p>
      <p style="color: #2081E2;font-size: 16px;">
        https://twitter.com/skitenkobohdan
      </p>
    </div>
    <!-- 个人产品 -->
    <div class="personalCenter-Tabs">
      <el-tabs v-model="activeName">
        <el-tab-pane label="COLLECTION" name="first">
          <div class="personalCenter-Tabs-a" v-if="userUrl.length == 0">
            <p style="color: #09090A;font-size: 22px;">No items found</p>
            <p style="width:260px;line-height: 28px; margin: 0 auto;">
              Come back soon! Or try to browse something for you on our
              marketplace
            </p>
            <el-button style="margin-top:20px;" type="primary" round
              >Browse marketplace</el-button
            >
          </div>
          <ul class="exhibition" v-else>
            <li
              class="exhibition-a"
              v-for="item in userUrl.slice(0, a)"
              :key="item"
              @click="$router.push({ name: 'details', params: { id: index } })"
            >
              <img :src="item.url" alt="" />
              <svg-icon icon="icon-aixin2" class="collection"></svg-icon>
              <div class="exhibition-b">
                <span style="color: #09090A;font-size: 18px;">X-Ray Doge</span>
                <br />
                <span style="color: #484848;font-size: 14px;">0.5 BNB</span>
              </div>
            </li>
            <div class="loadMore" v-if="a < userUrl.length" @click="loadMore">
              Load More
            </div>
            <div class="loadMore" v-else>
              没有更多了
            </div>
          </ul>
        </el-tab-pane>
        <el-tab-pane label="SOLD" name="second">卖</el-tab-pane>
        <el-tab-pane label="CREATED" name="third">创作</el-tab-pane>
        <el-tab-pane label="BOUGHT" name="fourth">买</el-tab-pane>
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
      a: 6,
      activeName: "first",
      userUrl: [
        {
          url: require("../../assets/19.jpeg"),
          asd: "Blockasaurus....",
          zxc: 19.15
        },
        {
          url: require("../../assets/19.jpeg"),
          asd: "Blockasaurus....",
          zxc: 19.15
        },
        {
          url: require("../../assets/19.jpeg"),
          asd: "Blockasaurus....",
          zxc: 19.15
        },
        {
          url: require("../../assets/19.jpeg"),
          asd: "Blockasaurus....",
          zxc: 19.15
        },
        {
          url: require("../../assets/19.jpeg"),
          asd: "Blockasaurus....",
          zxc: 19.15
        },
        {
          url: require("../../assets/19.jpeg"),
          asd: "Blockasaurus....",
          zxc: 19.15
        },
        {
          url: require("../../assets/19.jpeg"),
          asd: "Blockasaurus....",
          zxc: 19.15
        },
        {
          url: require("../../assets/19.jpeg"),
          asd: "Blockasaurus....",
          zxc: 19.15
        },
        {
          url: require("../../assets/19.jpeg"),
          asd: "Blockasaurus....",
          zxc: 19.15
        },
        {
          url: require("../../assets/19.jpeg"),
          asd: "Blockasaurus....",
          zxc: 19.15
        },
        {
          url: require("../../assets/19.jpeg"),
          asd: "Blockasaurus....",
          zxc: 19.15
        },
        {
          url: require("../../assets/19.jpeg"),
          asd: "Blockasaurus....",
          zxc: 19.15
        },
        {
          url: require("../../assets/19.jpeg"),
          asd: "Blockasaurus....",
          zxc: 19.15
        },
        {
          url: require("../../assets/19.jpeg"),
          asd: "Blockasaurus....",
          zxc: 19.15
        },
        {
          url: require("../../assets/19.jpeg"),
          asd: "Blockasaurus....",
          zxc: 19.15
        },
        {
          url: require("../../assets/19.jpeg"),
          asd: "Blockasaurus....",
          zxc: 19.15
        },
        {
          url: require("../../assets/19.jpeg"),
          asd: "Blockasaurus....",
          zxc: 19.15
        }
      ]
    };
  },
  created() {},
  mounted() {},
  methods: {
    loadMore() {
      this.a += 6;
    }
  }
};
</script>

<style lang="less" scoped>
.personalCenter-bgc {
  width: 100%;
  height: 224px;
  background-image: url("../../assets/19.jpeg");
  z-index: 2;
}
.personalCenter-pic {
  position: absolute;
  left: 50%;
  top: 200px;
  transform: translate(-50%);
  width: 126px;
  height: 126px;
  background-color: red;
  border: 4px solid #ffffff;
  border-radius: 50%;
}
.personalCenter-id {
  text-align: center;
  width: 480px;
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
  margin-top: 20px;
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

  border-top-left-radius: 36px;
  border-top-right-radius: 36px;
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
</style>
