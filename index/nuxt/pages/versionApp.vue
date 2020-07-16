<template>
  <div class="core-w">
    <AppSidebar :isVer="true" :appid="appid" :version="left_version" :create_status="create_status" />
    <div style="width:100%">
      <section class="app-frame">
        <div class="version-box" v-for="item in versions" :key="item.id">
          <p class="version-h">版本 {{item.version}}</p>
          <ul>
            <li v-for="(log,index) in item.logs" :key="index">
              <span><span :class="['doc-no-m',statusOptions[log.version_status].colorC]"></span>{{log.status_name}}</span>
              <span>{{log.add_time}}</span>
            </li>
          </ul>
        </div>
      </section>
      <!-- 分页 -->
      <div class="pagination">
        <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :total="listTotal">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { get } from "@/store/request";
import AppSidebar from "../components/AppSidebar";
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
  layout: "other",
  components: {
    AppSidebar
  },
  data() {
    return {
      statusOptions,
      listTotal: 0,
      pagination: {
        page: 1,
        limit: 3
      },
      left_version: [],
      versions: [],
      listTotal: 0,
      create_status: 0,
      appid: null,
    };
  },
  async created() {
    const id = this.$route.query.id;
    const rawData = await get('/home/app/versionList', {
      app_id: id
    });
    this.left_version = rawData.data.left_version;
    this.versions = rawData.data.versions && rawData.data.versions.list;
    this.listTotal = rawData.data.versions && rawData.data.versions.count;
    this.create_status = rawData.data.create_status;
    this.appid = id;
  },
  methods: {
    handleCurrentChange(val) {
      this.pagination.page = val;
      this.getVersionlist();
    },
    async getVersionlist() {
      const rawData = await get('/home/app/versionList', {
        app_id: this.appid,
        page: this.pagination.page
      });
      this.left_version = rawData.data.left_version;
      this.versions = rawData.data.versions && rawData.data.versions.list;
      this.listTotal = rawData.data.versions && rawData.data.versions.count;
      this.create_status  = rawData.data.create_status;
    }
  }
};
</script>

<style lang="scss" scoped>
.core-w {
  width: 1100px;
  margin: 0 auto;
  padding: 36px 0;
  display: flex;
  min-height: calc(100vh - 179px);

  .doc-no-m {
    margin: 0 6px 0 0px;

    display: inline-block;
    width: 6px;
    height: 6px;
    background-color: #f5cf49;
    border-radius: 50%;
  }
}
.version-box {
  margin-bottom: 20px;
  .version-h {
    font-size: 16px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: rgba(51, 51, 51, 1);
    line-height: 20px;
    padding-bottom: 14px;
  }
  ul {
    border: 1px solid rgba(232, 232, 232, 1);
    li {
      height: 49px;
      line-height: 49px;
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(0, 0, 0, 1);
      display: flex;
      justify-content: space-around;
      padding: 0 200px;
      border-bottom: 1px solid #f2f2f2;
      &:last-child {
        border-bottom: none;
      }
    }
  }
}

.pagination {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 50px;
}
</style>