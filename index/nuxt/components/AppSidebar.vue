<template>
  <section class="sidebar">
    <p class="title">
      <span @click="goToList">我的应用</span>
      <span class="des">-应用详情</span>
    </p>
    <ul class="nav">
      <li
        v-for="(ver,index) in version"
        :key="ver.id"
        :class="isVer||isCreat ?'': (currentId ? currentId==ver.id : indexA==index)?'active':''"
        @click="goToDetail(ver.app_id,ver.id,index)"
      >
        <span class="version">{{ver.version}}</span>
        <span :class="['doc-no-m',statusOptions[ver.status].colorC]"></span>
        <span class="status-t">{{ver.status_name}}</span>
      </li>
      <li :class="isVer&&!isCreat?'active':''" @click="goToVersion">版本记录</li>
      <li :class="isCreat && !isVer?'active':''" @click="goToCreateVersion">新建版本</li>
    </ul>
  </section>
</template>
<script>
const statusOptions = [
  {
    value: "0",
    label: "上架审核中",
    colorC: "span-yellow"
  },
  {
    value: "1",
    label: "已上架",
    colorC: "span-green"
  },
  {
    value: "2",
    label: "上架审核未通过",
    colorC: "span-red"
  },
  {
    value: "3",
    label: "上架审核通过",
    colorC: "span-green"
  },
  {
    value: "4",
    label: "下架审核中",
    colorC: "span-yellow"
  },
  {
    value: "5",
    label: "已下架",
    colorC: "span-gray"
  },
  {
    value: "6",
    label: "下架审核未通过",
    colorC: "span-red"
  },
  {
    value: "7",
    label: "下架审核通过",
    colorC: "span-green"
  },
  {
    value: "8",
    label: "白名单测试",
    colorC: "span-yellow"
  },
  {
    value: "9",
    label: "上架待提交",
    colorC: "span-yellow"
  },
  {
    value: "10",
    label: "下架待提交",
    colorC: "span-yellow"
  }
];
export default {
  props: {
    status: {
      default: ""
    },
    isVer: {
      default: false
    },
    isCreat: {
      default: false
    },
    version: {
      default: () => {
        return [];
      }
    },
    appid: {
      default: ""
    },
    create_status: {
      default: 0
    },
    currentId: {
      default: null
    }
  },
  data() {
    return {
      statusOptions,
      indexA: 0
    };
  },
  methods: {
    goToList() {
      this.$router.replace("/personCenter?activeName=myapps");
    },
    goToCreateVersion() {
      if (this.status == "审核中") {
        this.$alert("请等待应用审核通过或撤销审核，再新建版本", "提示", {
          confirmButtonText: "确定"
          // callback: action => {
          //   this.$message({
          //     type: 'info',
          //     message: `action: ${ action }`
          //   });
          // }
        });
      } else {
        if (this.create_status) {
          this.$router.push({
            path: "/editVersion/",
            query: { id: this.appid, isEdit: 0 }
          });
        } else {
          this.$alert("此版本状态下不支持新建版本", "提示", {
            confirmButtonText: "确定"
          });
        }
      }
    },
    goToVersion() {
      let id = this.appid;
      this.$router.push({ path: "/versionApp/", query: { id } });
    },
    goToDetail(id, verid, index) {
      this.indexA = index;
      this.$router.push({ path: "/detailsApp/", query: { id, verid } });
    }
  }
};
</script>

<style lang="scss" scoped>
.sidebar {
  min-width: 208px;
  .title {
    font-size: 15px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(102, 102, 102, 1);
    line-height: 20px;
    margin-bottom: 10px;
    span:first-child {
      cursor: pointer;
    }
    .des {
      color: #000000;
    }
  }
  .nav {
    .doc-no-m {
      margin: 0 6px 0 0px;
      display: inline-block;
      width: 6px;
      height: 6px;
      border-radius: 50%;
    }
    li {
      cursor: pointer;
      height: 40px;
      line-height: 40px;
      padding-left: 12px;
      .status-t {
        font-size: 10px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(0, 0, 0, 1);
      }
      .version {
        min-width: 79px;
        display: inline-block;
      }
    }
    .active {
      background: rgba(250, 250, 250, 1);
      border-left: 2px solid #02b6ff;
    }
  }
}
</style>