<template>
  <div class="main">
    <div class="header">
      <p @click="$router.push('/')"><i class="el-icon-back"></i>Home</p>
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
              {{ item.ds_cate_name }}
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
        <h3>Create Your Unique Book</h3>
        <div class="right-wrap">
          <div
            class="item"
            v-for="(item, index) in rightList"
            :key="index"
            @mouseup.stop="mouseUp2(item)"
            @mousedown="mouseEnter2(item)"
          >
            <div v-show="item.img" class="item-img">
              <img
                :src="item.img"
                oncontextmenu="return false;"
                ondragstart="return false;"
              />
            </div>
          </div>
        </div>
      </div>

      <div class="show">
        <h3>Preview</h3>
        <div class="right-wrap" id="mycanvas" ref="mycanvas">
          <div
            class="item"
            v-for="(item, index) in rightList"
            :key="index"
            @mouseup.stop="mouseUp2(item)"
            @mousedown="mouseEnter2(item)"
          >
            <div v-show="item.img" class="item-img">
              <img
                :src="item.img"
                oncontextmenu="return false;"
                ondragstart="return false;"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $http from "../../utils/request";
import html2canvas from "html2canvas";

export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  data() {
    return {
      classifyList: [],
      selectedItem: {},
      selectedItem2: {},
      mousePoint: {
        x: "",
        y: "",
      },
      mouseImg: {},
      leftList: [],
      rightList: [
        {
          id: 1,
          img: "",
          token_id: "",
        },
        {
          id: 2,
          img: "",
          token_id: "",
        },
        {
          id: 3,
          img: "",
          token_id: "",
        },
        {
          id: 4,
          img: "",
          token_id: "",
        },
        {
          id: 5,
          img: "",
          token_id: "",
        },
        {
          id: 6,
          img: "",
          token_id: "",
        },
        {
          id: 7,
          img: "",
          token_id: "",
        },
        {
          id: 8,
          img: "",
          token_id: "",
        },
        {
          id: 9,
          img: "",
          token_id: "",
        },
        {
          id: 10,
          img: "",
          token_id: "",
        },
        {
          id: 11,
          img: "",
          token_id: "",
        },
        {
          id: 12,
          img: "",
          token_id: "",
        },
        {
          id: 13,
          img: "",
          token_id: "",
        },
        {
          id: 14,
          img: "",
          token_id: "",
        },
        {
          id: 15,
          img: "",
          token_id: "",
        },
        {
          id: 16,
          img: "",
          token_id: "",
        },
        {
          id: 17,
          img: "",
          token_id: "",
        },
        {
          id: 18,
          img: "",
          token_id: "",
        },
        {
          id: 19,
          img: "",
          token_id: "",
        },
        {
          id: 20,
          img: "",
          token_id: "",
        },
        {
          id: 21,
          img: "",
          token_id: "",
        },
        {
          id: 22,
          img: "",
          token_id: "",
        },
        {
          id: 23,
          img: "",
          token_id: "",
        },
        {
          id: 24,
          img: "",
          token_id: "",
        },
        {
          id: 25,
          img: "",
          token_id: "",
        },
        {
          id: 26,
          img: "",
          token_id: "",
        },
        {
          id: 27,
          img: "",
          token_id: "",
        },
        {
          id: 28,
          img: "",
          token_id: "",
        },
        {
          id: 29,
          img: "",
          token_id: "",
        },
        {
          id: 30,
          img: "",
          token_id: "",
        },
      ],
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
  },
  methods: {
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
      this.mousePoint.x = e.pageX - 40 + "px";
      this.mousePoint.y = e.pageY - 40 + "px";
      if (this.selectedItem && this.selectedItem.img) {
        this.mouseImg = JSON.parse(JSON.stringify(this.selectedItem));
      } else if (this.selectedItem2 && this.selectedItem2.img) {
        this.mouseImg = JSON.parse(JSON.stringify(this.selectedItem2));
      } else {
        this.mouseImg = null;
      }
    },

    //选择区鼠标按下
    mouseEnter1(item) {
      console.log("mouseEnter", item);
      this.selectedItem2 = {};
      this.selectedItem = item;
    },

    //整个页面鼠标按下
    mouseUp(item) {
      console.log("mouseUp", item);
      this.selectedItem = {};
    },

    //操作区鼠标按下
    mouseUp2(item) {
      console.log("mouseUp2", item, this.selectedItem2);
      if (this.selectedItem && this.selectedItem.prop_image) {
        item.img = this.$Cover(this.selectedItem.prop_image);
        item.token_id = this.selectedItem.token_id;
        this.selectedItem = {};
      }

      if (this.selectedItem2 && this.selectedItem2.img) {
        console.log(this.selectedItem2);
        let item2 = JSON.parse(JSON.stringify(item));
        console.log(item);
        item.img = this.selectedItem2.img;
        item.token_id = this.selectedItem2.token_id;
        this.rightList.forEach((item3) => {
          console.log(item3);
          if (item3.id == this.selectedItem2.id) {
            item3.img = item2.img;
            item3.token_id = item2.token_id;
          }
        });
      }
    },

    //操作区鼠标按下
    mouseEnter2(item) {
      if (this.selectedItem && this.selectedItem.img) {
        console.log("mouseEnter2", item);
        item.img = this.selectedItem.img;
      }
      if (item) {
        this.selectedItem2 = item;
      }
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
    background: #0066ed;
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
      width: 33%;
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
      width: 33%;
      height: 770px;
      padding: 40px;
      background-color: #f1f3fb;
      h3 {
        font-size: 24px;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: #09090a;
        margin-bottom: 33px;
      }
      .right-wrap {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        // justify-content: center;
        .item {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 70px;
          height: 70px;
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

    .show {
      width: 33%;
      height: 770px;
      padding: 20px;
      h3 {
        font-size: 24px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #09090a;
        line-height: 33px;
        margin: 20px 20px;
      }
      .right-wrap {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        padding: 20px;
        .item {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 40px;
          height: 40px;
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
      width: 40px;
      height: 40px;
    }
  }
}
</style>
