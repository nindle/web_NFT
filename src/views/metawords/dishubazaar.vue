<template>
  <div class="dishubazaar">
    <div class="dishubazaar_a">
      <div class="dishubazaar_a_a">
        <div class="a">Metawords Mystery Box</div>

        <div class="b" @click="FiltersFn">
          <i class="el-icon-caret-bottom"></i> Filters
        </div>
        <div></div>

        <div class="c">
          <div>
            <p>Sale Types</p>
            <p>All</p>
            <p>Auction</p>
            <p>Fixed Price</p>
          </div>
        </div>
      </div>
    </div>

    <div class="dishubazaar_b">
      <div class="dishu_d">
        <div class="dishu_d_a">
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

        <div class="dishu_d_a">
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

        <div class="dishu_d_a">
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

        <div class="dishu_d_a">
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

        <div class="dishu_d_a">
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

        <div class="dishu_d_a">
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

        <div class="dishu_d_a">
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

        <div class="dishu_d_a">
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
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      arr: false,
    };
  },
  mounted() {},
  methods: {
    FiltersFn() {
      this.arr = this.arr == false ? true : false;
      if (this.arr == true) {
        document.getElementsByClassName("c")[0].style.display = "block";
        document.getElementsByClassName("el-icon-caret-bottom")[0].className =
          "el-icon-caret-top";
      } else {
        document.getElementsByClassName("c")[0].style.display = "none";
        document.getElementsByClassName("el-icon-caret-top")[0].className =
          "el-icon-caret-bottom";
      }
    },
  },
  computed: {},
};
</script>

<style scoped lang='less'>
.dishubazaar {
  .dishubazaar_a {
    width: 100%;
    // height: 100;
    background: #f6f6f6;
    .dishubazaar_a_a {
      width: 1200px;
      height: 100%;
      padding-bottom: 30px;
      margin: 0 auto;
      .a {
        font-size: 32px;
        font-family: HelveticaNeue-Medium, HelveticaNeue;
        font-weight: 500;
        color: #09090a;
        padding: 40px 0;
      }
      .b {
        width: 114px;
        height: 40px;
        border-radius: 4px;
        border: 1px solid #cbcbd4;
        font-size: 14px;
        font-family: Poppins-SemiBold, Poppins;
        font-weight: 600;
        color: #09090a;
        line-height: 40px;
        margin-bottom: 30px;
        text-align: center;
        cursor: pointer;
      }
      .c {
        display: none;
        div {
          display: flex;
          p {
            margin-right: 24px;
            font-size: 14px;
            font-family: Poppins-Regular, Poppins;
            font-weight: 400;
            color: #09090a;
            padding: 0 10px;
          }
          p:nth-of-type(1) {
            margin-right: 127px;
          }
          p:hover {
            background: #dbe6f3;
            border-radius: 4px;
            cursor: pointer;
            font-size: 14px;
            font-family: Poppins-Regular, Poppins;
            font-weight: 400;
            color: #0066ed;
          }
        }
      }
    }
  }

  .dishubazaar_b {
    width: 1200px;
    height: 100%;
    margin: 40px auto;
    .dishu_d {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      .dishu_d_a {
        width: 282px;
        height: 443px;
        background: #ffffff;
        border-radius: 8px;
        border: 1px solid #e5e8eb;
        margin-bottom: 20px;
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
}
</style>
