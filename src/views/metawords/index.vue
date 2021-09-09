<template>
  <div class="dishu">
    <div class="bannar">
      <img src="../../assets/dishu/banner@2x.png" alt="" />
    </div>
    <div class="content">
      <div class="dishu_a">
        <div class="dishu_a_left">
          <p class="dishu_a_a">Welcome to Metawords</p>
          <p class="dishu_a_b">
            You can create your Metawords NFT in just a few minutes of
            experience!
          </p>
        </div>
        <div class="dishu_a_right" @click="$router.push({ name: 'operation' })">
          Get Started <i class="el-icon-arrow-right"></i>
        </div>
      </div>

      <h3>World Famous Works Of Metaword</h3>
      <div class="dishu_b">
        <div class="dishu_b_a">
          <div class="dishu_b_a_a">
            <img src="../../assets/dishu/show1.png" alt="" />
          </div>
          <div class="dishu_b_a_b">
            <p class="dishu_b_a_1">
              Book from the Ground: One Day in Manchester
            </p>
            <p class="dishu_b_a_2">
              2021 Manchester International Festival, Great Britain
            </p>
          </div>
        </div>
        <div class="dishu_b_a">
          <div class="dishu_b_a_a">
            <img src="../../assets/dishu/show2.png" alt="" />
          </div>
          <div class="dishu_b_a_b">
            <p class="dishu_b_a_1">Book from the Ground: Pop-up Book</p>
            <p class="dishu_b_a_2">
              a book composed entirely of symbols and icons, 2015 - 2016
            </p>
          </div>
        </div>
        <div class="dishu_b_a">
          <div class="dishu_b_a_a">
            <img src="../../assets/dishu/show3.png" alt="" />
          </div>
          <div class="dishu_b_a_b">
            <p class="dishu_b_a_1">Book From the Ground: Software</p>
            <p class="dishu_b_a_2">
              The Museum of Modern Art (MoMA), New York,June 27-September 3,
              2007
            </p>
          </div>
        </div>
      </div>

      <div class="dishu_c" @click="SeemoreFn">
        See more<i class="el-icon-arrow-right"></i>
      </div>
      <h3 style="padding: 40px 0">Metawords Mystery Box</h3>

      <div class="dishu_d">
        <div class="dishu_d_a" @click="$router.push({ name: 'Blindbox' })">
          <div class="dishu_d_a_t">
            <img src="../../assets/dishu/dishu1.png" alt="" />
          </div>
          <div class="dishu_d_a_b">
            <p class="dishu_d_a_b_a">Metawords Mystery Box</p>
            <p class="dishu_d_a_b_b">Price</p>
            <p class="dishu_d_a_b_c">
              <img src="../../assets/dishu/price.png" alt="" /> 1.9
              <span class="aa">BNB</span>
              <span class="bb">≈ $ 921.5</span>
            </p>
          </div>
        </div>
        <div class="dishu_d_a" @click="$router.push({ name: 'Blindbox' })">
          <div class="dishu_d_a_t">
            <img src="../../assets/dishu/dishu1.png" alt="" />
          </div>
          <div class="dishu_d_a_b">
            <p class="dishu_d_a_b_a">Metawords Mystery Box</p>
            <p class="dishu_d_a_b_b">Price</p>
            <p class="dishu_d_a_b_c">
              <img src="../../assets/dishu/price.png" alt="" /> 1.9
              <span class="aa">BNB</span>
              <span class="bb">≈ $ 921.5</span>
            </p>
          </div>
        </div>
        <div class="dishu_d_a" @click="$router.push({ name: 'Blindbox' })">
          <div class="dishu_d_a_t">
            <img src="../../assets/dishu/dishu1.png" alt="" />
          </div>
          <div class="dishu_d_a_b">
            <p class="dishu_d_a_b_a">Metawords Mystery Box</p>
            <p class="dishu_d_a_b_b">Price</p>
            <p class="dishu_d_a_b_c">
              <img src="../../assets/dishu/price.png" alt="" /> 1.9
              <span class="aa">BNB</span>
              <span class="bb">≈ $ 921.5</span>
            </p>
          </div>
        </div>
        <div class="dishu_d_a" @click="$router.push({ name: 'Blindbox' })">
          <div class="dishu_d_a_t">
            <img src="../../assets/dishu/dishu1.png" alt="" />
          </div>
          <div class="dishu_d_a_b">
            <p class="dishu_d_a_b_a">Metawords Mystery Box</p>
            <p class="dishu_d_a_b_b">Price</p>
            <p class="dishu_d_a_b_c">
              <img src="../../assets/dishu/price.png" alt="" /> 1.9
              <span class="aa">BNB</span>
              <span class="bb">≈ $ 921.5</span>
            </p>
          </div>
        </div>
      </div>

      <div class="dishu_c" @click="$router.push({ name: 'dishubazaar' })">
        Explore more<i class="el-icon-arrow-right"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  mounted() {},
  methods: {
    SeemoreFn() {
      window.open("http://www.xubing.com/en/work/year/2021");
    },
  },
  computed: {},
};
</script>

<style scoped lang='less'>
.bannar {
  height: 640px;
  img {
    width: 100%;
    height: 100%;
  }
}
.content {
  width: 1200px;
  margin: 0 auto;
  h3 {
    text-align: center;
    font-size: 32px;
    font-family: HelveticaNeue-Medium, HelveticaNeue;
    font-weight: 500;
    color: #09090a;
  }
  .dishu_a {
    height: 148px;
    background: #e5e8eb;
    border-radius: 8px;
    margin: 60px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-image: url("../../assets/dishu/dishubg.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    padding: 0 40px;
    .dishu_a_left {
      .dishu_a_a {
        font-size: 28px;
        font-family: Poppins-SemiBold, Poppins;
        font-weight: 600;
        color: #09090a;
      }
      .dishu_a_b {
        font-size: 14px;
        font-family: Poppins-Regular, Poppins;
        font-weight: 400;
        color: #09090a;
      }
    }
    .dishu_a_right {
      width: 234px;
      height: 48px;
      background: #ffffff;
      border-radius: 24px;
      border: 1px solid #e5e8eb;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      font-size: 16px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #0066ed;
    }
  }
  .dishu_b {
    margin-top: 54px;
    justify-content: space-between;
    .dishu_b_a:nth-child(2) {
      background: #262629ff;
    }
    .dishu_b_a:nth-child(3) {
      background: #2162c3ff;
      .dishu_b_a_a {
        img {
          width: 384px;
          height: 158px;
          margin-top: 10%;
        }
      }
    }
    .dishu_b_a {
      width: 386px;
      height: 423px;
      background: #40312d;
      border-radius: 8px;
      border: 1px solid #e5e8eb;
      display: flex;
      flex-direction: column;

      img {
        width: 100%;
        height: 100%;
        border-radius: 8px;
      }
      .dishu_b_a_a {
        width: 384px;
        height: 250px;
        background: #ffffff;
      }
      .dishu_b_a_1 {
        width: 254px;
        height: 48px;
        font-size: 20px;
        font-family: HelveticaNeue-Medium, HelveticaNeue;
        font-weight: 500;
        color: #ffffff;
        line-height: 24px;
        text-align: center;
        margin: 24px auto;
      }
      .dishu_b_a_2 {
        width: 308px;
        height: 46px;
        font-size: 16px;
        font-family: HelveticaNeue-Light, HelveticaNeue;
        font-weight: 300;
        color: #ffffff;
        line-height: 23px;
        text-align: center;
        margin: 0 auto;
      }
    }
    display: flex;
  }
  .dishu_c {
    width: 234px;
    height: 48px;
    background: #ffffff;
    border-radius: 24px;
    border: 1px solid #e5e8eb;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 40px auto;
    font-size: 16px;
    font-family: HelveticaNeue-Medium, HelveticaNeue;
    font-weight: 500;
    color: #0066ed;
    cursor: pointer;
    i {
      margin-top: 2px;
    }
  }
  .dishu_d {
    display: flex;
    justify-content: space-between;
    .dishu_d_a {
      width: 282px;
      height: 443px;
      background: #ffffff;
      border-radius: 8px;
      border: 1px solid #e5e8eb;
      cursor: pointer;
      .dishu_d_a_t {
        width: 280px;
        height: 345px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .dishu_d_a_b {
        padding: 10px 0 0 16px;
        .dishu_d_a_b_a {
          font-size: 14px;
          font-family: HelveticaNeue-Medium, HelveticaNeue;
          font-weight: 500;
          color: #333333;
        }
        .dishu_d_a_b_b {
          font-size: 12px;
          font-family: HelveticaNeue;
          color: #7a7a7a;
          margin: 6px 0;
        }
        .dishu_d_a_b_c {
          font-size: 17px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #09090a;
          display: flex;
          align-items: center;
          img {
            width: 16px;
            height: 16px;
            margin-right: 6px;
          }
          .aa {
            font-size: 12px;
            margin: 3px 30px 0 6px;
          }
          .bb {
            font-size: 12px;
            font-family: HelveticaNeue;
            color: #7a7a7a;
          }
        }
      }
    }
  }
}
</style>
