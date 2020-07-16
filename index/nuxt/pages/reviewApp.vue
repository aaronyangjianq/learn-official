<template>
  <div class="core-w">
    <AppSidebar :version="left_version" :appid="appid" :create_status="create_status" />
    <div style="width:100%">
      <section class="app-frame">
        <h4>测试结果 <span>总条数：{{listTotal}}条</span></h4>
        <ul class="review-list">
          <li v-for="item in reviewList" :key="item.id">
            <div>
              <span>用户手机号：</span>
              <p>{{item.phone}}</p>
            </div>
            <div>
              <span>评论时间：</span>
              <p>{{item.add_time}}</p>
            </div>
            <div>
              <span>评论内容：</span>
              <p>{{item.comment}}</p>
            </div>
            <div v-if="item.res" style="padding-bottom:0;">
              <span>回复内容：</span>
              <p>{{item.res}}</p>
            </div>
          </li>

        </ul>

      </section>
      <!-- 分页 -->
      <div class="pagination">
        <el-pagination layout="prev, pager, next" :total="listTotal" @current-change="handleCurrentChange">
        </el-pagination>
      </div>
    </div>

  </div>
</template>

<script>
import AppSidebar from "../components/AppSidebar";
import axios from "axios";
export default {
  layout: "other",
  components: {
    AppSidebar
  },
  data() {
    return {
      listTotal: 0,
      pagination: {
        page: 1,
        limit: 10
      }
    };
  },
  async asyncData({ query, store }) {
    let reviewList = [];
    let listTotal = 0;
    let left_version = [];
    let create_status = 0;
    await axios
      .get(`${store.state.baseUrl}/home/comment/list`, {
        params: {
          version_id: query.id
        }
      })
      .then(res => {
        reviewList = res.data.data.comments.list;
        listTotal = res.data.data.comments.count;
        create_status = res.data.data.create_status;
      })
      .catch(err => {});
    return {
      appid: query.id,
      baseUrl: store.state.baseUrl,
      reviewList,
      listTotal
    };
  },
  methods: {
    handleCurrentChange(val) {
      this.pagination.page = val;
      this.getReviewlist();
    },
    getReviewlist() {
      axios
        .get(`${this.baseUrl}/home/comment/list`, {
          params: {
            app_id: this.appid,
            page: this.pagination.page
          }
        })
        .then(res => {
          this.reviewList = res.data.data.comments.list;
          this.listTotal = res.data.data.comments.count;
          this.left_version = res.data.data.left_version;
          this.create_status = res.data.data.create_status;
        })
        .catch(err => {});
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
}
.app-frame {
  padding: 20px 40px 0;
  border-radius: 4px;
  border: 1px solid rgba(241, 241, 241, 1);
  margin-bottom: 16px;
  width: 100%;
  min-height: 360px;
  h4 {
    font-size: 16px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: rgba(51, 51, 51, 1);
    line-height: 16px;
    border-left: 3px solid #02b6ff;
    padding-left: 10px;
    // margin-bottom: 24px;
    span {
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
      line-height: 20px;
      padding-left: 10px;
    }
  }

  .review-list {
    padding-bottom: 20px;
    li {
      // height: 100px;
      padding: 24px 0 4px;
      border-bottom: 1px solid #f2f2f2;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      div {
        display: flex;
        align-items: center;
        padding-bottom: 16px;
        span {
          font-size: 14px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: rgba(102, 102, 102, 1);
          line-height: 12px;
        }
        p {
          font-size: 14px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: rgba(51, 51, 51, 1);
          line-height: 20px;
        }
      }
    }
    li:last-child {
      border-bottom: none;
    }
  }
}

.pagination {
  width: 100%;
  display: flex;
  justify-content: center;
}
</style>