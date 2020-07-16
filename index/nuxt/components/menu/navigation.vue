<template>
  <div class="first-navigation">
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        router
        mode="horizontal"
        background-color="#304156"
        text-color="#bfcbd9"
        active-text-color="#409EFF"
      >
        <navigation-item v-for="menu in menuList" :key="menu.path" :item="menu" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>
<script>
import navigationItem from "./navigationItem";

export default {
  name: "navigation",
  components: { navigationItem },
  props: {
    menuList: {
      type: Array,
      required: true
    }
  }
};
</script>