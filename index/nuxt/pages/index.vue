<template>
  <div>
    <div class="top">
      <section class="padding-top">
        <div class="container">
          <div class="row">
            <div class="text-center lg">
              <h1 class="h1">SDK功能</h1>
              <p class="p">提供各类眼镜SDK，涵盖多种功能，支持适用于多个场景快速定制开发属于你的App</p>
              <a href="javascript:void(0)" class="btn a" @click="toSDK">立即下载</a>
            </div>
          </div>
        </div>
      </section>
    </div>
    <div id="headers-header-7">
      <section class="position-relative pb-lg-8 bg-dark">
        <div class="bg-img-holder top-0 right-0 col-lg-6 zindex-100 bg1-1" data-bg-size="cover">
          <span></span>
          <img alt="Image placeholder" src="@/static/images/img_1.jpg" />
        </div>
        <div class="container-1 py-6">
          <div class="row-1">
            <div class="col-lg-51 pt-lg-9">
              <div class="text-center text-lg-left">
                <h1 class="h1-1">适用性说明</h1>
                <h2 class="h2">DSAGUDGSUADSHJKCDS</h2>
                <p class="p-1">AR眼镜是谷歌率先打造的一款带有科幻色彩的产品，也是一项拥有前卫技术的产品，带上它可以体验到在科幻电影里帅气的男、女主角所使用的未来功能。</p>
                <p
                  class="p-1 margin-top"
                >AR眼镜可以实现诸多功能，可以看作是一台微型的手机，通过跟踪眼球视线轨迹判断用户处于的状态，并且可以开启相应功能，如果需要打电话或者发短信只需要开启Google Voice语音输入信息即可。</p>
                <a href="javascript:void(0)" class="btn-1 border a" @click="learnMore">了解更多</a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="position-relative pb-lg-8 pt-lg-9 bg-dark1">
        <div class="bg-img-holder top-0 left-0 col-lg-6 zindex-100 bg1-2" data-bg-size="cover">
          <span></span>
          <img alt="Image placeholder" src="@/static/images/home_four.jpg" />
        </div>
        <div class="container-1 py-6">
          <div class="row-1">
            <div class="col-lg-51 ml-lg-auto">
              <div class="text-center text-lg-left">
                <h1 class="h1-1">使用限制</h1>
                <h2 class="h2">DSAGUDGSUADSHJKCDS</h2>
                <p class="p-1">AR眼镜是谷歌率先打造的一款带有科幻色彩的产品，也是一项拥有前卫技术的产品，带上它可以体验到在科幻电影里帅气的男、女主角所使用的未来功能。</p>
                <p
                  class="p-1 margin-top"
                >AR眼镜可以实现诸多功能，可以看作是一台微型的手机，通过跟踪眼球视线轨迹判断用户处于的状态，并且可以开启相应功能，如果需要打电话或者发短信只需要开启Google Voice语音输入信息即可。</p>
                <a href="javascript:void(0)" class="btn-1 border a" @click="learnMore">了解更多</a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="position-relative pb-lg-8 bg-dark2">
        <div class="bg-img-holder top-0 right-0 col-lg-6 zindex-100 bg1-3" data-bg-size="cover">
          <span></span>
          <img alt="Image placeholder" src="@/static/images/home_seven.jpg" />
        </div>
        <div class="container-1 py-6">
          <div class="row-1">
            <div class="col-lg-51 pt-lg-9">
              <div class="text-center text-lg-left">
                <h1 class="h1-1">使用方式与使用场景</h1>
                <h2 class="h2">DSAGUDGSUADSHJKCDS</h2>
                <p class="p-1">AR眼镜是谷歌率先打造的一款带有科幻色彩的产品，也是一项拥有前卫技术的产品，带上它可以体验到在科幻电影里帅气的男、女主角所使用的未来功能。</p>
                <p
                  class="p-1 margin-top"
                >AR眼镜可以实现诸多功能，可以看作是一台微型的手机，通过跟踪眼球视线轨迹判断用户处于的状态，并且可以开启相应功能，如果需要打电话或者发短信只需要开启Google Voice语音输入信息即可。</p>
                <a href="javascript:void(0)" class="btn-1 border a" @click="learnMore">了解更多</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
    <div class="bottom">
      <section class="padding-bottom">
        <div class="container">
          <div class="row">
            <div class="text-center lg">
              <h1 class="h1-11">SDK下载</h1>
              <p class="p-11">10年服务经验积累，9种安全保障，8种服务场景，优质服务值得您信赖</p>
              <a href="javascript:void(0)" class="btn-11 a" @click="toSDK">前往下载</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  layout: "default",
  data() {
    return {
    };
  },
  watch: {
   '$store.state.userInfo':function(Nval,Oval){
     if(Nval.id) {
       this.$store.state.userInfo = Nval
       this.$store.state.userInfo && localStorage.setItem("userInfo", JSON.stringify(this.$store.state.userInfo))
     }
    }
  },
  mounted() {
    this.$store.dispatch("getUserInfo");
  },
  components: {},
  methods: {
    learnMore() {
      this.$router.push('/document/')
    },
    toSDK() {
      this.$router.push('/sdk/')
    }
  }
};
</script>

<style lang="scss" scoped>
[tabindex="-1"]:focus:not(:focus-visible) {
  outline: 0 !important;
}
.position-relative {
  position: relative !important;
}
/* 头部 */
.top {
  background-image: url(.././static/images/home_one.png);
  height: 100%;
  width: 100%;
  background-size: cover;
  top: 0;
  left: 0;
  background-position: center 0 !important;
}
.padding-top {
  padding-top: 329px;
  padding-bottom: 283px;
}
.container {
  padding-left: 15px;
  padding-right: 15px;
  margin-right: auto;
  margin-left: auto;
}
@media (min-width: 576px) {
  .container {
    max-width: 540px;
  }
}
@media (min-width: 768px) {
  .container {
    max-width: 720px;
  }
}
@media (min-width: 992px) {
  .container {
    max-width: 960px;
  }
}
@media (min-width: 1200px) {
  .container {
    max-width: 1140px;
  }
}
.row {
  display: flex;
  margin-left: -15px;
  margin-right: -15px;
  flex-wrap: wrap;
  justify-content: center;
}
.text-center {
  text-align: center !important;
}
@media (min-width: 992px) {
  .lg {
    max-width: 60.33333%;
    flex: 0 0 60.33333%;
  }
}
.h1 {
  color: rgba(255, 255, 255, 1);
  margin-bottom: 2rem;
  font-size: 4.5rem;
  font-weight: 500;
  line-height: 4.5rem;
}
.p {
  color: rgba(255, 255, 255, 1);
  margin-top: 0;
  margin-bottom: 0;
  line-height: 20px;
  font-size: 1.125rem;
  font-weight: 400;
}
.btn {
  position: relative;
  transition: all 0.2s ease;
  margin-top: 100px;
  border-radius: 32px;
  border-color: #02b6ff;
  background-color: #02b6ff;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.15);
  font-size:23px;
  font-family:PingFangSC-Semibold,PingFang SC;
  font-weight:600;
  color:rgba(255,255,255,1);
  line-height:62px;
  display: inline-block;
  text-align: center;
  vertical-align: middle;
  border: 1px solid transparent;
  width: 342px;
  height: 64px;
}
.a {
  text-decoration: none;
}
/* 中间 */
.bg-dark {
  /* background-color: #ffffff !important; */
  background-image: url(../static/images/bg_1.png);
  height: 100%;
  width: 100%;
  background-size: contain;
  background-repeat: no-repeat ;
}
.bg-dark1 {
  /* background-color: #ffffff !important; */
  background-image: url(../static/images/bg_2.png);
  height: 100%;
  width: 100%;
  background-size: contain;
  background-position: right;
  background-repeat: no-repeat ;
}
.bg-dark2 {
  /* background-color: #ffffff !important; */
  background-image: url(../static/images/bg_3.png);
  height: 100%;
  width: 100%;
  background-size: contain;
  background-repeat: no-repeat ;
}
.bg1-1 {
  background-image: url(../static/images/img_1.jpg);
  background-position: initial;
  background-size: cover;
  opacity: 1;
  height: 100%;
}
.bg1-2 {
  background-image: url(../static/images/home_four.jpg);
  background-position: initial;
  background-size: cover;
  opacity: 1;
  height: 100%;
}
.bg1-3 {
  background-image: url(../static/images/home_seven.jpg);
  background-position: initial;
  background-size: cover;
  opacity: 1;
  height: 100%;
}
@media (min-width: 992px) {
  .pb-lg-8,
  .py-lg-8 {
    padding-bottom: 7.5rem !important;
  }
}
.zindex-100 {
  z-index: 2 !important;
}
.top-0 {
  top: 0;
}
.left-0 {
  left: 0;
}
.right-0 {
  right: 0;
}
.col-lg-6 {
  position: relative;

  width: 100%;
  padding-right: 15px;
  padding-left: 15px;
}
@media (max-width: 991.98px) {
  .bg-img-holder {
    background-image: none !important;
  }
  .bg-img-holder img {
    width: 100%;
  }
}
@media (min-width: 992px) {
  .bg-img-holder {
    position: absolute;
    z-index: -1;

    height: 100%;
    min-height: 20rem;

    background-repeat: no-repeat;
  }
  .bg-img-holder img {
    display: none;
  }
}
@media (min-width: 992px) {
  .col-lg-6 {
    max-width: 50%;
    flex: 0 0 50%;
  }
}
.container-1 {
  width: 100%;
  margin-right: auto;
  margin-left: auto;
  padding-right: 15px;
  padding-left: 15px;
}
@media (min-width: 576px) {
  .container-1 {
    max-width: 540px;
  }
}
@media (min-width: 768px) {
  .container-1 {
    max-width: 720px;
  }
}
@media (min-width: 992px) {
  .container-1 {
    max-width: 960px;
  }
}
@media (min-width: 1200px) {
  .container-1 {
    max-width: 1140px;
  }
}
.pt-6,
.py-6 {
  padding-top: 4.5rem !important;
}
.pb-6,
.py-6 {
  padding-bottom: 4.5rem !important;
}
.row-1 {
  display: flex;

  margin-right: -15px;
  margin-left: -15px;

  flex-wrap: wrap;
}
.col-lg-51 {
  position: relative;
  width: 100%;
  padding-right: 15px;
  padding-left: 15px;
}
@media (min-width: 992px) {
  .ml-lg-auto {
    margin-left: auto !important;
  }
}
@media (min-width: 992px) {
  .col-lg-51 {
    max-width: 41.66667%;

    flex: 0 0 41.66667%;
  }
}
@media (min-width: 992px) {
  .pt-lg-9,
  .py-lg-9 {
    padding-top: 0rem !important;
  }
}
.text-center {
  text-align: center !important;
}
@media (min-width: 992px) {
  .text-lg-left {
    text-align: left !important;
  }
  .text-lg-right {
    text-align: right !important;
  }
  .text-lg-center {
    text-align: center !important;
  }
}
.h1-1 {
  color: rgba(51, 51, 51, 1);
  font-weight: 600;
  font-size: 2rem;
  font-family: PingFangSC-Semibold, PingFang SC;
  line-height: 2rem;
  margin-bottom: 1rem;
}
.h2 {
  color: rgba(153, 153, 153, 1);
  font-weight: 300;
  font-size: 1.375rem;
  font-family: PingFangSC-Light, PingFang SC;
  line-height: 1.375rem;
  margin-bottom: 1.25rem;
}
.p-1 {
  color: rgba(51, 51, 51, 1);
  font-weight: 400;
  font-size: 1.125rem;
  font-family: PingFangSC-Light, PingFang SC;
  line-height: 2.25rem;
  margin-bottom: 0;
}
.margin-top {
  margin-top: 0;
  margin-bottom: 1rem;
}
.btn-1 {
  position: relative;
  transition: all 0.2s ease;
  margin-top: 3rem;
  border-radius: 0.25rem;
  color: #02b6ff;
  background-color: #02b6ff00;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.15);
  font-size: 1.125rem;
  font-weight: 600;
  line-height: 23px;
  display: inline-block;
  padding: 0.75rem 1.75rem;
  text-align: center;
  vertical-align: middle;
  width: 150px;
}
.border {
  border: 1px solid #02b6ff;
}
.a {
  text-decoration: none;
}
/* 底部 */
.bottom {
  background-image: url(.././static/images/home_eight.png);
  height: 100%;
  width: 100%;
  background-size: cover;
  top: 0;
  left: 0;
  background-position: center 0 !important;
}
.padding-bottom {
  padding-top: 114px;
  padding-bottom: 84px;
}
.h1-11 {
  color: rgba(255, 255, 255, 1);
  margin-bottom: 12px;
  font-size: 2.25rem;
  font-weight: 500;
  line-height: 2.625rem;
  font-family: AlibabaPuHuiTi-Medium, AlibabaPuHuiTi;
}
.p-11 {
  color: rgba(255, 255, 255, 1);
  margin-top: 0;
  margin-bottom: 0;
  line-height: 36px;
  font-size: 1.125rem;
  font-weight: 400;
  font-family: AlibabaPuHuiTi-Regular, AlibabaPuHuiTi;
}
.btn-11 {
  position: relative;
  transition: all 0.2s ease;
  margin-top: 59px;
  border-radius: 27px;
  border-color: #02b6ff;
  background-color: #02b6ff;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.15);
  font-size:20px;
  font-family:PingFangSC-Semibold,PingFang SC;
  font-weight:600;
  color:rgba(255,255,255,1);
  line-height:51px;
  display: inline-block;
  text-align: center;
  vertical-align: middle;
  border: 1px solid transparent;
  width: 200px;
  height: 53px;
}
</style>
