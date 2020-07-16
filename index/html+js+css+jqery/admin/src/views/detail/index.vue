<template>
  <div class="detail">
    <div  @click="goback">
      <i class="el-icon-back"/> 返回
    </div>
    <el-form :ref="form" class="form" :model="form">
      <el-row :gutter="20">
        <el-col :span="10">
          <h2 style="text-align: left">项目相关信息</h2>
          <el-form-item label="开发类型">
            <el-input :value="form.dev_type.join(' ')" style="width: 60%" disabled />
          </el-form-item>
          <el-form-item label="项目名称">
            <el-input :value="form.product" style="width: 60%" disabled />
          </el-form-item>
          <el-form-item label="项目行业">
            <el-input :value="form.business" style="width: 60%" disabled />
          </el-form-item>
          <el-form-item label="项目预算">
            <el-input :value="form.price" style="width: 60%" disabled />
            <span style="color: red">({{form.bargin ? '可议价': '不可议价'}})</span>
          </el-form-item>
          <el-form-item label="交付周期">
            <el-input :value="form.days" style="width: 60%" disabled />天
          </el-form-item>
          <el-form-item label="项目描述">
            <el-input :value="form.desc" type="textarea" autosize disabled />
          </el-form-item>
          <el-form-item label="参考网站或应用">
            <el-input :value="form.consult1" disabled>
              <template slot="prepend">1</template>
            </el-input>
            <el-input :value="form.consult2" disabled>
              <template slot="prepend">2</template>
            </el-input>
          </el-form-item>
          <el-form-item label="相关文档">
            <el-link
              v-show="file1Name"
              target="_blank"
              :underline="false"
              style="margin-left:15px; margin-top: 20px"
            >
              <span>1.{{ file1Name }}</span>
              <span>{{ parseInt(file1Size/ 1024) }} KB</span>
              <el-button size="mini" type="primary" @click="downloadOne(file1Url)">查看</el-button>
            </el-link>
            <el-link
              v-show="file2Name"
              target="_blank"
              :underline="false"
              style="margin-left:15px; margin-top: 20px"
            >
              <span>2.{{ file2Name }}</span>
              <span>{{ parseInt(file2Size/ 1024) }} KB</span>
              <el-button size="mini" type="primary" @click="downloadTwo(file2Url)">查看</el-button>
            </el-link>
          </el-form-item>
          <el-form-item label="备注要求">
            <el-input :value="form.note" type="textarea" autosize disabled />
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <h2 style="text-align: left">需求方信息</h2>
          <el-form-item label="姓名">
            <el-input :value="form.name" style="width: 60%" disabled />
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input :value="form.email" style="width: 60%" disabled />
          </el-form-item>
          <el-form-item label="电话">
            <el-input :value="form.phone" style="width: 60%" disabled />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import { getPendingReviewDataDetail } from "../../api/interface";
export default {
  data() {
    return {
      form: {
        dev_type: [],
        product: "",
        business: "",
        price: "",
        days: "",
        desc: "",
        consult1: "",
        consult2: "",
        file1: "",
        file2: "",
        note: "",
        name: "",
        email: "",
        phone: ""
      },
      file1Name: "",
      file1Size: null,
      file1Url: "",
      file2Name: "",
      file2Size: null,
      file2Url: ""
    };
  },
  created() {
    this.fetchPendingReviewDataDetail();
  },
  methods: {
    goback() {
      const type =
        this.$router &&
        this.$router.history &&
        this.$router.history.current &&
        this.$router.history.current.params &&
        this.$router.history.current.params.type;
      this.$router.push(`/${type}`);
    },
    fetchPendingReviewDataDetail() {
      const id =
        this.$router &&
        this.$router.history &&
        this.$router.history.current &&
        this.$router.history.current.params &&
        this.$router.history.current.params.id;
      getPendingReviewDataDetail(id).then(response => {
        this.form = response.info;
        console.log("dd", this.form);
        this.file1Name = this.form.file1 && this.form.file1.name;
        this.file1Size = this.form.file1 && this.form.file1.size;
        this.file1Url = this.form.file1 && this.form.file1.url;
        this.file2Name = this.form.file2 && this.form.file2.name;
        this.file2Size = this.form.file2 && this.form.file2.size;
        this.file2Url = this.form.file2 && this.form.file2.url;
      });
    },
    downloadOne(url) {
      window.open(url);
    },
    downloadTwo(url) {
      window.open(url);
    }
  }
};
</script>

<style lang="scss" scoped>
.detail {
  margin-left: 40px;
  .form {
    margin-left: 80px;
  }
}
</style>

