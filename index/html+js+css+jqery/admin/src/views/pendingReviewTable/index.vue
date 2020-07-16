<template>
  <div class="app-container">
    <div class="title">
      <h1>待审核的内容</h1>
    </div>
    <el-row :gutter="20">
      <el-col :span="14">
        <el-select v-model="value" placeholder="全部" @change="filterContent">
          <el-option v-for="item in options" :key="item.id" :label="item.value" :value="item.id" />
        </el-select>
      </el-col>
      <el-col :span="2">
        <el-button type="primary" size="small" @click="noPass()">审核不通过</el-button>
      </el-col>
      <el-col :span="2">
        <el-button type="primary" size="small" @click="pass()" :disabled="disabledpass">审核通过</el-button>
      </el-col>
      <el-col :span="2">
        <el-button type="primary" size="small" @click="handleDelete">删除</el-button>
      </el-col>
    </el-row>
    <el-table :data="tableData" style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" label="全选" />
      <el-table-column prop="id" width="55" label="序号" />
      <el-table-column prop="dev_type" label="开发类型" width="180">
        <template v-slot="scope">
          <span>{{ scope.row.dev_type && scope.row.dev_type.join(' ') }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="product" label="项目名称" />
      <el-table-column prop="has_file" label="是否上传相关文档" />
      <el-table-column prop="name" label="需求方姓名" />
      <el-table-column prop="phone" label="联系方式" />
      <el-table-column prop="status" label="状态" />
      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="toDetail(scope.row.id)">详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      style="text-align: center; margin-top: 30px;"
      background
      prev-text="上一页"
      next-text="下一页"
      :current-page="currentPage"
      :page-size="pageInfo.limit"
      :total="pageInfo.total"
      layout="prev, pager, next"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
import {
  getPendingReviewData,
  getReviewData,
  upStatus,
  deleteData
} from "../../api/interface";
export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: "success",
        draft: "gray",
        deleted: "danger"
      };
      return statusMap[status];
    }
  },
  data() {
    return {
      list: null,
      listLoading: true,
      visible: false,
      multipleSelection: [],
      options: [
        {
          id: 1,
          value: "全部"
        },
        {
          id: 0,
          value: "待审核"
        },
        {
          id: 2,
          value: "已下架"
        }
      ],
      value: "",
      tableData: [
        {
          id: 1,
          dev_type: [],
          product: "",
          has_file: "",
          name: "",
          phone: "",
          status: "",
          operation: ""
        }
      ],
      pageInfo: {
        limit: 10,
        page: 1,
        total: null,
        totalPage: null
      },
      currentPage: 1,
      disabledpass: true
    };
  },
  created() {
    this.fetchPendingReviewData();
  },
  methods: {
    fetchPendingReviewData() {
      getPendingReviewData().then(response => {
        this.tableData = response.data;
        this.pageInfo = response.pageInfo;
      });
    },
    fetchReviewData() {
      getReviewData();
    },
    toDetail(id) {
      const type = "pendingReviewTable";
      this.$router.push(`/detail/${id}/${type}`);
    },
    noPass() {
      const ids = this.multipleSelection.map(item => item.id).toString();
      const status = 2;

      ids &&
        status &&
        upStatus(ids, status).then(() => this.fetchPendingReviewData());
    },
    pass() {
      const ids = this.multipleSelection.map(item => item.id).toString();
      const status = 1;

      ids &&
        status &&
        upStatus(ids, status).then(() => this.fetchPendingReviewData());
    },
    handleDelete() {
      this.$confirm("是否确定删除？", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          const ids = this.multipleSelection.map(item => item.id).toString();
          deleteData(ids).then(() => this.fetchPendingReviewData());
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      if (this.multipleSelection) {
        this.disabledpass = false;
      }
      if (this.multipleSelection.length === 0) {
        this.disabledpass = true;
      }
    },
    async filterContent(val) {
      const filterlist = {
        all: 1,
        pendingReview: 0,
        offshelf: 2
      };
      if (val === filterlist.all) {
        const rawdata = await getPendingReviewData();
        this.tableData = rawdata.data;
        this.pageInfo = rawdata.pageInfo;
      } else {
        const rawdata = await getPendingReviewData(
          this.pageInfo.page,
          this.pageInfo.limit,
          val
        );
        this.tableData = rawdata.data;
        this.pageInfo = rawdata.pageInfo;
      }
    },
    handleSizeChange(size) {
      this.pageInfo.limit = size;
    },
    async handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
      const rawdata = await getPendingReviewData(
        currentPage,
        this.pageInfo.limit
      );
      this.tableData = rawdata.data;
    }
  }
};
</script>
<style lang="scss" scoped>
.app-container {
  .title {
    text-align: center;
  }
}
</style>
