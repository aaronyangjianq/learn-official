<template>
  <footer>
    <div class="footer-left">
      <ul>
        <li>
          <span>首页</span>
          <span class="divider">|</span>
        </li>
        <li>
          <span>说明文档</span>
          <span class="divider">|</span>
        </li>
        <li>
          <span>SDK下载</span>
          <span class="divider">|</span>
        </li>
        <li>
          <span>Demo演示</span>
          <span class="divider">|</span>
        </li>
        <li>
          <span>FAQ</span>
        </li>
      </ul>
      <h3>©1997-2019 xx公司 版权所有</h3>
    </div>
    <div class="footer-right">
      <span>关注我们</span>
      <ul>
        <li>
          <img :src="facebook" alt />
        </li>
        <li>
          <img :src="shipin" alt />
        </li>
        <li>
          <img :src="twittier" alt />
        </li>
        <li>
          <img :src="weibo" alt />
        </li>
      </ul>
    </div>
  </footer>
</template>

<script>
import ccc from "@/static/images/icon_facebook.png";
import ddd from "@/static/images/icon_shipin.png";
import cdc from "@/static/images/icon_twttier.png";
import dcd from "@/static/images/icon_twttier.png"
export default {
  data() {
    return {
      input: "",
      facebook: ccc,
      shipin: ddd,
      twittier: cdc,
      weibo: dcd,
    };
  }
};
</script>

<style lang="scss" scoped>
$activeColor: #fc6b00;
footer {
  width: 100%;
  min-width: 1100px;
  height: 130px;
  background: linear-gradient(
    215deg,
    rgba(5, 220, 255, 1) 0%,
    rgba(2, 182, 255, 1) 100%
  );
  padding-top: 21px;
  box-sizing: border-box;
  position: relative;
  ul > li {
    float: left;
    list-style: none;
  }
  ul > li > span {
    font-size: 12px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    line-height: 32px;
  }
  h3 {
    position: absolute;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    line-height: 20px;
    margin-left: 44px;
    margin-top: 35px;
  }
  .divider {
    margin-left: 6px;
    margin-right: 6px;
  }
  .footer-right {
    float: right;
    margin-top: 10px;
    margin-right: 356px;
    span {
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      line-height: 20px;
    }
    ul > li {
      list-style: none;
      float: right;
    }
  }
}
</style>