<template>
  <div class="main">
    <div class="header">
      <p @click="$router.go(-1)"><i class="el-icon-back"></i>Back</p>
      <div>
        <p>Save as draft</p>
        <el-button type="primary" round @click="saveImg('mycanvas')"
          >Download</el-button
        >
      </div>
    </div>

    <div class="wrap" @mouseup.prevent="mouseUp()">
      <div class="left">
        <div class="left_a">
          <div class="left_a_list">
            <div
              v-for="(item, index) in classifyList"
              :key="index"
              @click="classifyFn(item)"
            >
              {{
                $i18n.locale == "zh-cn"
                  ? item.ds_cate_name_cn
                  : item.ds_cate_name_en
              }}
            </div>
          </div>
        </div>

        <div class="left_b">
          <h3>Smileys & People</h3>
          <div class="left_b_list">
            <div
              class="item"
              v-for="(item, index) in leftList"
              :key="index"
              @mousedown="mouseEnter1(item)"
            >
              <img
                :src="$Cover(item.prop_image)"
                oncontextmenu="return false;"
                ondragstart="return false;"
              />
            </div>
          </div>
        </div>
      </div>

      <div class="right">
        <div class="right_a">Create Your Unique Metawords</div>

        <div class="right-wrap">
          <div
            class="item"
            v-for="(item, index) in rightList"
            :key="index"
            @mouseup.stop="mouseUp2(item)"
            @mousedown="mouseEnter2(item)"
          >
            <div v-show="item.prop_image" class="item-img">
              <img
                :src="item.prop_image"
                oncontextmenu="return false;"
                ondragstart="return false;"
              />
            </div>
          </div>

          <div class="right_c">
            <div class="right_c_a">{{ showcount }} / 100</div>
            <div class="right_c_b" @click="dialogFn">
              <i class="el-icon-view"></i> Preview
            </div>
            <div class="right_c_c" @mouseup.stop="stopUp">
              <i class="el-icon-delete"></i>(1)
            </div>
          </div>
        </div>
      </div>
    </div>

    <el-dialog
      title="Preview"
      :visible.sync="dialogVisible"
      width="610px"
      top="4vh"
    >
      <div class="show">
        <div class="right-wrap" id="mycanvas" ref="mycanvas">
          <div class="item" v-for="(item, index) in rightList" :key="index">
            <div v-show="item.prop_image" class="item-img">
              <img
                :src="item.prop_image"
                oncontextmenu="return false;"
                ondragstart="return false;"
              />
            </div>
          </div>
        </div>

        <div class="show_a" @click="saveImg('mycanvas')">
          <i class="el-icon-download"></i> Download
        </div>

        <div class="show_b">
          Create your metawords NFT in time and make it your asset
        </div>
      </div>
    </el-dialog>

    <div
      class="mouse-img"
      v-if="mouseImg"
      :style="{ left: mousePoint.x, top: mousePoint.y }"
    >
      <img
        :src="$Cover(mouseImg.prop_image)"
        oncontextmenu="return false;"
        ondragstart="return false;"
      />
    </div>
  </div>
</template>

<script>
import $http from "../../utils/request";
import html2canvas from "html2canvas";

export default {
  data() {
    return {
      showcount: 100,
      showcounts: [],
      dialogVisible: false,
      classifyList: [],
      selectedItem: {},
      selectedItem2: {},
      mousePoint: {
        x: "",
        y: "",
      },
      mouseImg: {},
      leftList: [],
      rightList: [],
    };
  },

  created() {
    this.$nextTick(() => {
      // 禁用右键
      document.oncontextmenu = new Function("event.returnValue=false");
      // 禁用选择
      document.onselectstart = new Function("event.returnValue=false");
    });
  },

  async mounted() {
    // 实时监听鼠标位置
    window.addEventListener("mousemove", this.updateMouse);
    const data = await $http.get(`v1/explore/ds_list`);
    this.classifyList = data.data;
    const resp = await $http.get(`v1/explore/list?page=1&dsid=2`);
    this.leftList = resp.list;
    this.forFn();
  },

  methods: {
    countFn() {
      this.showcounts = [];
      this.rightList.forEach((item) => {
        if (item.prop_image !== "") {
          this.showcounts.push(item);
        }
      });
      this.showcount = 100 - this.showcounts.length;
    },

    stopUp() {
      this.selectedItem = {};
      this.selectedItem2 = {};
      this.rightList.forEach((item) => {
        if (item.id == this.mouseImg.id) {
          item.prop_image = "";
          item.token_id = "";
        }
      });
    },

    dialogFn() {
      this.dialogVisible = true;
    },

    forFn() {
      for (var i = 1; i < 101; i++) {
        var arr = {
          id: i,
          prop_image: "",
          token_id: "",
        };
        this.rightList.push(arr);
      }
    },

    drag(e) {
      console.log(e);
    },

    //下载图片
    saveImg(val) {
      window.pageYoffset = 0;
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      // 先获取你要转换为img的dom节点
      var node = document.getElementById(val); //传入的id名称
      // console.log("node", node);
      var width = node.offsetWidth; //dom宽
      var height = node.offsetHeight; //dom高
      var scale = 2; //放大倍数 这个相当于清晰度 调大一点更清晰一点
      html2canvas(node, {
        width: width,
        heigth: height,
        backgroundColor: "#ffffff", //背景颜色 为null是透明
        dpi: window.devicePixelRatio * 2, //按屏幕像素比增加像素
        scale: scale,
        X: 0,
        Y: 0,
        scrollX: -3, //如果左边多个白边 设置该偏移-3 或者更多
        scrollY: 0,
        useCORS: true, //是否使用CORS从服务器加载图像 !!!
        allowTaint: true, //是否允许跨域图像污染画布  !!!
      }).then((canvas) => {
        // console.log("canvas", canvas);
        var url = canvas.toDataURL(); //这里上面不设值cors会报错
        var a = document.createElement("a"); //创建一个a标签 用来下载
        a.download = "地书"; //设置下载的图片名称
        var event = new MouseEvent("click"); //增加一个点击事件
        a.href = url; //此处的url为base64格式的图片资源
        a.dispatchEvent(event); //触发a的单击事件 即可完成下载
      });
    },

    //切换分类
    async classifyFn(item) {
      const resp = await $http.get(
        `v1/explore/list?page=1&dsid=${item.ds_cate_id}`
      );
      this.leftList = resp.list;
    },

    //监听鼠标位置
    updateMouse(e) {
      this.mousePoint.x = e.clientX - 30 + "px";
      this.mousePoint.y = e.clientY - 30 + "px";
      if (this.selectedItem && this.selectedItem.prop_image) {
        this.mouseImg = JSON.parse(JSON.stringify(this.selectedItem));
      } else if (this.selectedItem2 && this.selectedItem2.prop_image) {
        this.mouseImg = JSON.parse(JSON.stringify(this.selectedItem2));
      } else {
        this.mouseImg = null;
      }
    },

    //选择区鼠标按下
    mouseEnter1(item) {
      this.selectedItem2 = {};
      this.selectedItem = item;
    },

    //整个页面鼠标按下
    mouseUp(item) {
      this.selectedItem = {};
      this.selectedItem2 = {};
    },

    //操作区鼠标抬起
    mouseUp2(item) {
      //左边拖拽触发
      if (this.selectedItem && this.selectedItem.prop_image) {
        item.prop_image = this.$Cover(this.selectedItem.prop_image);
        item.token_id = this.selectedItem.token_id;
        this.selectedItem = {};
      }
      //右边拖拽触发
      if (this.selectedItem2 && this.selectedItem2.prop_image) {
        let item2 = JSON.parse(JSON.stringify(item));
        item.prop_image = this.selectedItem2.prop_image;
        item.token_id = this.selectedItem2.token_id;
        this.rightList.forEach((item3) => {
          if (item3.id == this.selectedItem2.id) {
            item3.prop_image = item2.prop_image;
            item3.token_id = item2.token_id;
          }
        });
      }
      this.selectedItem = {};
      this.selectedItem2 = {};
      this.countFn();
    },

    //操作区鼠标按下
    mouseEnter2(item) {
      if (item) {
        this.selectedItem2 = item;
      }
    },

    mousemove(item) {
      console.log("item", item);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.main {
  width: 100%;
  justify-content: space-between;
  .header {
    width: 100%;
    height: 60px;
    background: #121214ff;
    display: flex;
    align-items: center;
    padding: 0 15px;
    justify-content: space-between;
    p {
      font-size: 16px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: #ffffff;
      line-height: 22px;
      cursor: pointer;
    }
    div {
      display: flex;
      align-items: center;
      .el-button {
        width: 88px;
        height: 32px;
        background: #ffffff;
        text-align: center;
        color: #0066ed;
        font-size: 14px;
        padding: 0;
        margin-left: 10px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
      }
    }
  }
  .wrap {
    width: 100%;
    display: flex;
    .left {
      width: 540px;
      height: 770px;
      display: flex;
      flex-wrap: wrap;
      h3 {
        font-size: 16px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #09090a;
        margin: 40px 0;
      }
      .left_a {
        width: 25%;
        height: 100%;
        text-align: center;
        font-size: 20px;
        background-color: #fff;
        border-right: 1px solid #0000000f;
        div {
          cursor: pointer;
        }
        .left_a_list {
          display: flex;
          flex-direction: column-reverse;
          justify-content: center;
          margin-top: 20px;
          div {
            width: 122px;
            height: 62px;
            line-height: 62px;
            margin: 0 auto;
            margin-bottom: 20px;
          }
          div:hover {
            background: #f1f3fb;
            border-radius: 4px;
          }
        }
      }
      .left_b {
        padding: 0 15px;
        .left_b_list {
          display: flex;
          flex-wrap: wrap;
        }
      }
      .item {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 70px;
        height: 50px;
        margin: 10px;
        cursor: pointer;
        z-index: 99;
        img {
          width: 40px;
          height: 40px;
        }
      }
    }

    .right {
      width: 68%;
      // height: 770px;
      background-color: #f1f3fb;
      .right_a {
        font-size: 24px;
        font-family: Poppins-SemiBold, Poppins;
        font-weight: 600;
        color: #09090a;
        height: 88px;
        line-height: 88px;
        padding-left: 40px;
        border-bottom: 1px solid #e1e7f0;
        margin-bottom: 48px;
      }
      .right-wrap {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        margin: 0 auto;
        width: 590px;
        .right_c {
          width: 100%;
          display: flex;
          margin: 20px 0;
          align-items: center;
          justify-content: space-between;
          .right_c_a {
            font-size: 16px;
            font-family: Poppins-Regular, Poppins;
            font-weight: 400;
            color: #cbcbd4;
          }
          .right_c_b {
            width: 137px;
            height: 40px;
            background: #ffffff;
            border-radius: 20px;
            line-height: 40px;
            text-align: center;
            font-size: 14px;
            font-family: Poppins-SemiBold, Poppins;
            font-weight: 600;
            cursor: pointer;
            color: #09090a;
            z-index: 99;
          }
          .right_c_c {
            font-size: 16px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #09090a;
            cursor: pointer;
          }
        }
        // justify-content: center;
        .item {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 44px;
          height: 57px;
          border-radius: 4px;
          margin-right: 15px;
          margin-bottom: 15px;
          border: 1px dashed #d4d4d4;
          cursor: pointer;
          .item-img {
            display: flex;
            justify-content: center;
            align-items: center;
            img {
              width: 40px;
              height: 40px;
            }
          }
        }
      }
    }
  }

  .mouse-img {
    position: fixed;
    top: 100px;
    left: 200px;
    z-index: 99;
    img {
      width: 30px;
      height: 30px;
    }
  }

  .show {
    width: 100%;
    padding: 20px;
    .right-wrap {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      background-image: url("../../assets/dishu/showbg.png");
      padding: 20px;
      width: 530px;
      .item {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 40px;
        height: 40px;
        cursor: pointer;
        margin: 0 10px 10px 0;
        .item-img {
          display: flex;
          justify-content: center;
          align-items: center;
          img {
            width: 40px;
            height: 40px;
          }
        }
      }
      .item:nth-of-type(10n) {
        margin-right: 0;
      }
    }
    .show_a {
      width: 153px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      background: #0066ed;
      border-radius: 20px;
      margin: 30px auto 20px;
      font-size: 14px;
      font-family: Poppins-SemiBold, Poppins;
      font-weight: 600;
      color: #ffffff;
      cursor: pointer;
    }
    .show_b {
      width: 240px;
      height: 32px;
      font-size: 12px;
      font-family: Poppins-Regular, Poppins;
      font-weight: 400;
      color: #7a7a7a;
      line-height: 16px;
      margin: 0 auto;
      text-align: center;
    }
  }
}
/deep/.el-dialog__header {
  text-align: center;
  padding: 20px 20px 0;
  font-size: 24px;
  font-family: Poppins-SemiBold, Poppins;
  font-weight: 600;
  color: #09090a;
}
</style>
