<template>
  <div>
    <Header />
    <nuxt />
    <!-- <Footer /> -->
    <Footernav />
  </div>
</template>
<script>
import Header from "~/components/Header.vue";
import Footernav from "~/components/Footernav.vue";

export default {
  components: {
    Header,
    // Footer
    Footernav
  }
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
*,
*::before,
*::after {
  box-sizing: border-box;
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
ul li {
  list-style-type: none;
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

/* // 上传图片样式 */
.avatar-uploader /deep/ .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 120px;
  height: 120px;
  line-height: 120px;
  text-align: center;
}
.avatar {
  width: 120px;
  height: 120px;
  display: block;
}

.span-red {
  background-color: #e83c3c;
}
.span-yellow {
  background-color: #f5cf49;
}
.span-gray {
  background-color: #999999;
}
.span-green {
  background-color: #9ce26a;
}
</style>