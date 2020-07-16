<template>
  <div class="app-container">
    <el-row>
      <el-select v-model="value" placeholder="全部" @change="filterContent">
        <el-option v-for="item in typeList" :key="item.id" :label="item.value" :value="item.id" />
      </el-select>
    </el-row>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="id" label="序号" width="180" />
      <el-table-column prop="dev_type" label="开发类型" width="180">
        <template v-slot="scope">
          <span>{{ scope.row.dev_type && scope.row.dev_type.join(' ') }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="product" label="项目名称" />
      <el-table-column prop="name" label="需求方姓名" />
      <el-table-column prop="phone" label="联系方式" />
      <el-table-column prop="add_time" label="发布时间" />
      <el-table-column prop="operation" label="操作">
        <template v-slot="scope">
          <el-button type="primary" size="mini" @click="toDetail(scope.row.id)">详情</el-button>
          <el-button type="primary" size="mini" @click="offShelf(scope.row.id)">下架</el-button>
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
import { getReviewData, upStatus, getTypes } from '@/api/interface'

export default {
  data() {
    return {
      list: null,
      listLoading: true,
      radio: '1',
      typeList: [
        {
          id: null,
          value: ''
        }
      ],
      value: '',
      tableData: [{
        id: 1,
        dev_type: [],
        product: '',
        name: '',
        phone: '',
        add_time: '',
        status: '',
        operation: ''
      }],
      pageInfo: {
        limit: 10,
        page: 1,
        total: null,
        totalPage: null
      },
      currentPage: 1
    }
  },
  created() {
    this.fetchReviewData()
    this.fetchType()
  },
  methods: {
    fetchReviewData() {
      this.listLoading = true
      getReviewData().then(response => {
        this.tableData = response.data
        this.pageInfo = response.pageInfo
      })
    },
    toDetail(id) {
      const type = 'reviewTable'
      this.$router.push(`/detail/${id}/${type}`)
    },
    offShelf(id) {
      const ids = id
      const status = 2

      upStatus(ids, status).then(() => this.fetchReviewData())
    },
    async filterContent(val) {
      const filterlist = {
        web: 1,
        app: 2,
        wechat: 3,
        applet: 4,
        html: 5,
        other: 10
      }
      if (val === filterlist.other) {
        const rawdata = await getReviewData()
        this.tableData = rawdata.data
        this.pageInfo = rawdata.pageInfo
      } else {
        const rawdata = await getReviewData(this.pageInfo.page, this.pageInfo.limit, val)
        this.tableData = rawdata.data
        this.pageInfo = rawdata.pageInfo
      }
    },
    handleSizeChange(size) {
      this.pageInfo.limit = size
    },
    async handleCurrentChange(currentPage) {
      this.currentPage = currentPage
      const rawdata = await getReviewData(currentPage, this.pageInfo.limit)
      this.tableData = rawdata.data
    },
    fetchType() {
      getTypes().then(response => {
        this.typeList = response.data
      })
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
