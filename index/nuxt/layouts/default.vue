<template>
  <div class="min-w">
    <HeaderNav />
    <nuxt />
    <Footernav />
  </div>
</template>
<script>
import HeaderNav from "~/components/HeaderNav.vue";
// import Footer from '~/components/Footer.vue'
import Footernav from "~/components/Footernav.vue";

export default {
  components: {
    HeaderNav,
    // Footer
    Footernav
  },
  mounted() {
    // window.addEventListener("scroll", this.handleScroll)
  },
  methods: {
    // handleScroll() {
    //   if(!this.$refs.head) return
    //   const top =
    //     window.pageYOffset ||
    //     document.documentElement.scrollTop ||
    //     document.body.scrollTop;
    //   if (top > 102) {
    //     console.log('this.$refs.head.style----102', this.$refs.head.style)
    //     this.$refs.head.style.background = "white";
    //     this.ischangeTabColor = true;
    //     this.$refs.head.style.opacity = "0.8";
    //   } else {
    //     this.ischangeTabColor = false;
    //     console.log('this.$refs.head.style', this.$refs.head.style)
    //     this.$refs.head.style.background = "";
    //     this.$refs.head.style.opacity = "1";
    //   }
    // }
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
ul li{
list-style-type:none;
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
@media screen and (max-width: 1100px)
{
  .min-w
  {
    width: 1100px;
    margin: 0 auto;
  }
}
</style>
