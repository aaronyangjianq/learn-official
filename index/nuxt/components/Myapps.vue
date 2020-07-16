<template>
  <div>
    <section class="appList">
      <!-- 搜索 -->
      <div class="app-header">
        <el-select v-model="chooseStatus" placeholder="请选择状态" @change="handleStatusChange">
          <el-option v-for="item in statusOptions" :key="item.value" :value="item.value" :label="item.label"></el-option>
        </el-select>
        <el-button @click="goCreateApp">创建应用</el-button>
      </div>
      <!-- 列表 -->
      <div class="app-content" v-loading="loading">
        <ul class="app-item-box">
          <li class="app-item" v-for="item in appArrs" :key="item.id" @click="goAppDetail(item)">
            <img :src="item.icon.url">
            <div class="app-item-right">
              <p>{{item.name}}</p>
              <p>{{item.version}} <span :class="statusOptions[item.status*1+1].colorC"></span>{{statusOptions[item.status*1+1].label}}</p>
              <p>更新时间：{{item.update_time}}</p>
            </div>
          </li>
        </ul>
      </div>
      <!-- 分页 -->
      <div class="pagination">
        <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :total="listTotal">
        </el-pagination>
      </div>
    </section>
  </div>
</template>

<script>
import { get } from "@/store/request";
const statusOptions = [
   {
    value: "",
    label: "全部",
    colorC: ""
  },
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
  data() {
    return {
      chooseStatus: "",
      statusOptions,
      appArrs: [],
      pagination: {
        page: 1,
        limit: 9,
        status: ""
      },
      listTotal: 0,
      loading: false
    };
  },

  created() {
    this.getApplist();
  },

  methods: {
    goCreateApp() {
      this.$router.push("/createApp/");
    },
    goAppDetail(item) {
      // console.log(item);
      
      // this.$router.push({ name: 'detailsApp', params: { id }})
      this.$router.push({ path: "/detailsApp/", query: {id:item.id,version_id:item.id } });
    },
    handleCurrentChange(val) {
      this.pagination.page = val;
      this.getApplist();
    },
    handleStatusChange(val) {
      this.pagination.status = val;
      this.getApplist();
    },
    getApplist() {
      this.loading = true;
      get("/home/app/myApp", this.pagination)
        .then(res => {
          this.appArrs = res.data.list;
          this.listTotal = res.data.count;
        })
        .catch(err => {})
        .finally(() => {
          this.loading = false;
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.appList {
  background: rgba(255, 255, 255, 1);
  border-radius: 4px;
  border: 1px solid rgba(241, 241, 241, 1);
  padding-bottom: 24px;
  .app-header {
    padding: 16px 70px;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid rgba(241, 241, 241, 1);
  }
  .app-content {
    padding: 30px 74px;
    .app-item-box {
      display: flex;
      flex-wrap: wrap;
    }
    .app-item {
      width: 33%;
      display: flex;
      font-family: PingFangSC-Regular, PingFang SC;
      margin-bottom: 39px;
      img {
        width: 56px;
        height: 56px;
        border-radius: 4px;
        margin-right: 12px;
      }
      .app-item-right {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }
      p:nth-child(1) {
        font-size: 14px;
        font-weight: 400;
        color: rgba(0, 0, 0, 1);
        line-height: 20px;
      }
      p:nth-child(2) {
        font-size: 10px;
        font-weight: 400;
        color: rgba(0, 0, 0, 1);
        line-height: 16px;

        span {
          margin: 0 6px 0 32px;
          display: inline-block;
          width: 6px;
          height: 6px;
          border-radius: 50%;
        }
      }
      p:nth-child(3) {
        font-size: 10px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
        line-height: 16px;
      }
    }
  }

  .pagination {
    width: 100%;
    display: flex;
    justify-content: center;
  }
}
</style>