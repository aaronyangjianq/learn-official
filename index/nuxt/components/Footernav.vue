<template>
  <footer class="footer">
    <div class="container-2">
      <div py-footer>
        <div class="row-11 footer-align-center">
          <div class="footer-left f4 f0">
            <div class="d-flex">
              <ul class="footer-ul-list right center1 start">
                <li>
                  <nuxt-link to="/" style="padding-left: 0;">首页</nuxt-link>
                </li>
                <li>
                  <nuxt-link to="/document/">说明文档</nuxt-link>
                </li>
                <li>
                  <nuxt-link to="/sdk/">SDK下载</nuxt-link>
                </li>
                <li>
                  <nuxt-link to="/demo/">Demo演示</nuxt-link>
                </li>
                <li>
                  <nuxt-link to="/problem/">疑难解答</nuxt-link>
                </li>
              </ul>
            </div>
            <p
              class="footer-font center1 start text-center1"
              style="margin: 0;
                            padding: 0;"
            >©1997-2019 xx公司 版权所有</p>
          </div>
          <div class="footer-left f4 f0">
            <ul class="footer-ul11 r1 center1 end">
              <p class="footer-font">关注我们：</p>
              <li>
                <a class="icon">
                  <img alt="Image placeholder" :src="wechat" class="icon-img" />
                </a>
              </li>
              <li>
                <a  class="icon">
                  <img alt="Image placeholder" :src="weibo" class="icon-img" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import webo from "@/static/images/weibo.png";
import wechat from "@/static/images/wechat.png";
export default {
  data() {
    return {
      wechat: wechat,
      weibo: webo
    };
  }
};
</script>

<style>
*,
*::before,
*::after {
  box-sizing: border-box;
}
html {
  font-family: sans-serif;
  line-height: 1.15;

  -webkit-text-size-adjust: 100%;
  -webkit-tap-highlight-color: rgba(31, 45, 61, 0);
}
img {
  vertical-align: middle;

  border-style: none;
}
article,
aside,
figcaption,
figure,
footer,
header,
hgroup,
main,
nav,
section {
  display: block;
}
.body {
  font-family: "Nunito", sans-serif;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.7;

  margin: 0;

  text-align: left;

  color: #8492a6;
  background-color: #fff;
}
[tabindex="-1"]:focus:not(:focus-visible) {
  outline: 0 !important;
}
.container-2 {
  padding-left: 15px;
  padding-right: 15px;
  margin-right: auto;
  margin-left: auto;
  height: 111px;
}
@media (min-width: 576px) {
  .container-2 {
    max-width: 540px;
  }
}
@media (min-width: 768px) {
  .container-2 {
    max-width: 720px;
  }
}
@media (min-width: 992px) {
  .container-2 {
    max-width: 960px;
  }
}
@media (min-width: 1200px) {
  .container-2 {
    max-width: 1140px;
  }
}
.footer {
  /* position: absolute; */
  bottom: 0;
  /* background: linear-gradient(
    215deg,
    rgba(5, 220, 255, 1) 0%,
    rgba(2, 182, 255, 1) 100%
  ); */
  background-image: url(.././static/images/footer.png);
  width: 100%;
  min-width: 1100px;
  height: 111px;
}
.py-footer {
  padding-top: 1.5rem !important;
  padding-bottom: 1.5rem !important;
}
.row-11 {
  display: flex;
  margin-left: -15px;
  margin-right: -15px;
  flex-wrap: wrap;
  height: 111px;
}
@media (min-width: 768px) {
  .footer-align-center {
    align-items: center !important;
  }
}
@media (min-width: 768px) {
  .footer-left {
    max-width: 50%;
    flex: 0 0 50%;
  }
}
.footer-left {
  position: relative;
  width: 100%;
  padding-right: 15px;
  padding-left: 15px;
}
.f4 {
  margin-bottom: 0rem !important;
}
@media (min-width: 768px) {
  .f0 {
    margin-bottom: 0 !important;
  }
}
.d-flex {
  align-items: center !important;
  padding-top: 0.75rem;
}
.footer-ul-list {
  display: flex;
  padding-left: 0;
  list-style: none;
  flex-wrap: wrap;
  margin-top: 0;
  margin: 0;
}
.footer-ul-list > li > a {
  display: block;
  padding-left: 0.75rem;
  padding-right: 0.75rem;
  text-decoration: none;
  font-size: 0.75rem;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  line-height: 13px;
  border-right: 1px solid #fff;
}
.footer-ul-list > li:last-child > a {
  border-right: none;
}
.footer-a {
  display: block;
  padding: 0.75rem 0.75rem;
  text-decoration: none;
}
.footer-font {
  font-size: 0.75rem;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  line-height: 28px;
}
.center1 {
  justify-content: center !important;
}
@media (min-width: 768px) {
  .start {
    justify-content: flex-start !important;
  }
}
@media (min-width: 768px) {
  .end {
    justify-content: flex-end !important;
  }
}
.r1 {
  margin-top: 0rem !important;
}
@media (min-width: 768px) {
  .r1 {
    margin-top: 0 !important;
  }
}
.footer-ul11 {
  display: flex;
  margin-bottom: 0;
  padding-left: 0;
  list-style: none;
  flex-wrap: wrap;
}
.border-right {
  border-right: 1px solid #fff;
}
@media (max-width: 768px) {
  .text-center1 {
    text-align: center;
  }
}
.icon {
  padding: 0;
  margin: 0;
}
.icon-img {
  margin-top: 0rem;
  margin-right: 0.75rem;
}
</style>
