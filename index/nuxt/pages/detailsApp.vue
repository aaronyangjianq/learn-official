<template>
  <div class="core-w" v-loading="loading">
    <AppSidebar
      :status="appDetail.app && appDetail.app.status_name"
      :version="appDetail.left_version"
      :appid="appDetail.app && appDetail.app.id"
      :create_status="create_status"
      :currentId="verid"
    />
    <div class="app-info" v-if="appDetail.app">
      <!-- 版本信息 -->
      <section class="app-frame">
        <h4>版本信息</h4>
        <ul class="info-list">
          <li>
            <span>软件安装包：</span>
            <p>{{appDetail.app.version_data.file.name}}</p>
          </li>
          <li>
            <span>软件大小：</span>
            <p>{{ (appDetail.app.version_data.file.size/1024/1024).toFixed(2)}}M</p>
          </li>
          <li>
            <span>版本号：</span>
            <p>{{appDetail.app.version_data.version}}</p>
          </li>
          <li>
            <span>状态：</span>
            <p>
              <span
                :class="['doc-no-m',statusOptions[appDetail.app.status] && statusOptions[appDetail.app.status].colorC]"
              ></span>
              {{ appDetail.app.status_name}}
            </p>
          </li>
          <li>
            <span>更新内容：</span>
            <p>{{appDetail.app.version_data.update_content}}</p>
          </li>
          <li v-if="appDetail.version_log">
            <span style="width:140px">{{ appDetail.app.status_name}}原因：</span>
            <p style="color:#e83c3c;">{{appDetail.version_log?appDetail.version_log.note:'暂无'}}</p>
          </li>
        </ul>
      </section>
      <!-- 测试结果 -->
      <section v-if="appDetail.test_result" class="app-frame">
        <h4>测试结果</h4>
        <ul class="info-list">
          <li>
            <span>测试下载量：</span>
            <p>{{appDetail.test_result.downloads}}</p>
          </li>
          <li>
            <span>测试评论数：</span>
            <p>
              {{appDetail.test_result.comment}}
              <span class="look-pre" @click="goReviewApp">查看评论</span>
            </p>
          </li>
        </ul>
      </section>
      <!-- 应用信息 -->
      <section class="app-frame" v-if="appDetail.app">
        <h4>应用信息</h4>
        <div class="info-box">
          <ul class="info-list">
            <li>
              <span>支持设备：</span>
              <p>{{ appDetail.app.os}}</p>
            </li>
            <li>
              <span>应用名称：</span>
              <p>{{ appDetail.app.name}}</p>
            </li>
            <li>
              <span>应用ID：</span>
              <p>{{appDetail.app.id}}</p>
            </li>
            <li>
              <span>应用类型：</span>
              <p>{{appDetail.app.cat_name}}</p>
            </li>
            <li>
              <span>应用介绍：</span>
              <p>{{ appDetail.app.desc}}</p>
            </li>
            <li>
              <span>图标：</span>
              <img style="width:80px;height:80px;margin-bottom:6px" :src="appDetail.app.icon.url" />
            </li>
            <li class="spe-li">
              <span class="more-width">应用介绍截图：</span>
              <div>
                <img
                  :class="[appDetail.app.direction?'directionV':'directionC']"
                  v-for="img in appDetail.app.images"
                  :key="img.url"
                  :src="img.url"
                />
              </div>
            </li>
          </ul>
          <ul class="spe-info-list">
            <li>
              <span>有无内置广告：</span>
              <p>{{ appDetail.app.ad?'是':'否'}}</p>
            </li>
            <li>
              <span>年龄分级标准：</span>
              <p>{{appDetail.app.age}}</p>
            </li>
            <li>
              <span>是否需要登录进行审核:：</span>
              <p>{{ appDetail.app.need_login?'是':'否'}}</p>
            </li>
            <li v-if=" appDetail.app.need_login==1">
              <span>测试账号：</span>
              <p>{{appDetail.app.test_account}}</p>
            </li>
            <li v-if="appDetail.app.need_login==1">
              <span>测试密码：</span>
              <p>{{ appDetail.app.test_pass}}</p>
            </li>
            <li>
              <span>是否收费：</span>
              <p>{{appDetail.app.is_toll?'是':'否'}}</p>
            </li>
            <li v-if="appDetail.app.downloads>0">
              <span>下载量：</span>
              <p>{{ appDetail.app.downloads}}</p>
            </li>
            <li>
              <span>应用创建时间：</span>
              <p>{{ appDetail.app.add_time}}</p>
            </li>
            <li>
              <span>更新时间：</span>
              <p>{{ appDetail.app.update_time}}</p>
            </li>
          </ul>
        </div>
      </section>
      <div class="btn-area" v-if="appDetail.app">
        <el-button
          type="primary"
          v-if="appDetail.app.status===0 || appDetail.app.status===4"
          @click="cancelAuth"
        >撤销审核</el-button>
        <el-button
          type="primary"
          v-if="appDetail.app.status===9 || appDetail.app.status===2"
          @click="goEditVersion"
        >编辑版本</el-button>
        <el-button v-if="appDetail.app.status===3" @click="confirmTest">白名单测试</el-button>
        <el-button v-if="appDetail.app.status===8" @click="overTest">结束白名单测试</el-button>
        <el-button
          type="primary"
          v-if="appDetail.app.status===3 || appDetail.app.status===8 || checkDownStatus(appDetail.app.status) || appDetail.app.status===7"
          @click="nowUp"
        >立即上架</el-button>
        <el-button type="primary" v-if="appDetail.app.status === 10" @click="soldOut">立即下架</el-button>
        <el-button
          v-if="appDetail.app.status===1 && appDetail.left_version.length>1"
          @click="handleReback"
        >版本回退</el-button>
        <el-button
          type="primary"
          v-if="appDetail.app.status===1 || appDetail.app.status === 6"
          @click="soldOut"
        >下架应用</el-button>
      </div>
    </div>
    <el-dialog
      class="persion"
      :visible.sync="dialogVisible"
      width="400px"
      :before-close="handleClose"
    >
      <div class="content">
        <h3 class="title">是否确认版本回退，一旦回退不可撤销</h3>
        <span class="tip">生效后当前版本下架，上一版本上架</span>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="sureReback">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { get, post } from "@/store/request";
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
      appDetail: {},
      create_status: 0,
      loading: false,
      dialogVisible: false
    };
  },

  async created() {
    this.id = this.$route.query.id;
    this.verid = this.$route.query.verid;
    this.loading = true;
    await get("/home/app/AppDetail", { app_id: this.$route.query.id, version_id: this.verid ? this.verid : "" })
      .then(res => {
        this.appDetail = res.data;
        this.create_status = res.data.create_status;
      })
      .catch(err => {})
      .finally(() => {
        this.loading = false;
      });
  },
  watch: {
    $route: function(nval, oval) {
      if (nval.query.verid) {
        this.getDetail(nval.query.verid);
      }
    }
  },
  methods: {
    goEditVersion() {
      this.$router.push({
        path: "/editVersion/",
        query: { id: this.appDetail.app.id, isEdit: 1 }
      });
    },
    goReviewApp() {
      this.$router.push({
        path: "/reviewApp/",
        query: { id: this.appDetail.app.version_id }
      });
    },
    getDetail(version_id) {
      get("/home/app/AppDetail", {
        app_id: this.appDetail.app.id,
        version_id: version_id ? version_id : ""
      })
        .then(res => {
          this.appDetail = res.data;
          this.create_status = res.data.create_status;
          this.verid = version_id;
        })
        .catch(err => {});
    },
    // 撤销审核
    cancelAuth() {
      let _this = this;
      this.$confirm("应用已经在审核中，是否确认撤销？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        post("home/app/cancelAuth", {
          version_id: _this.appDetail.app.version_data.id
        }).then(res => {
          if (res.code == 400) {
            this.$message({
              message: res.msg,
              type: "warning"
            });
          } else {
            this.$message({
              message: "撤销成功",
              type: "success"
            });
            _this.getDetail();
          }
        });
      });
    },
    // 白名单测试
    confirmTest() {
      let _this = this;
      this.$confirm("是否确认进行白名单测试？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "success"
      })
        .then(() => {
          post("home/app/toTest", {
            version_id: _this.appDetail.app.version_data.id
          }).then(res => {
            if (res.code == 400) {
              this.$message({
                message: res.msg,
                type: "warning"
              });
            } else {
              this.$message({
                message: "白名单测试开始",
                type: "success"
              });
              _this.getDetail();
            }
          });
        })
        .catch(() => {});
    },
    //关闭测试
    overTest() {
      let _this = this;
      this.$confirm("是否确认结束白名单测试？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        post("home/app/cancelTest", {
          version_id: _this.appDetail.app.version_data.id
        }).then(res => {
          if (res.code == 400) {
            this.$message({
              message: res.msg,
              type: "warning"
            });
          } else {
            this.$message({
              message: "关闭测试成功",
              type: "success"
            });
            _this.getDetail();
          }
        });
      });
    },
    handleClose() {
      this.dialogVisible = false;
    },
    //立即上架
    nowUp() {
      let _this = this;
      this.$confirm("是否要立即上架应用？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "success"
      }).then(() => {
        post("home/app/upNow", {
          version_id: _this.appDetail.app.version_data.id
        }).then(res => {
          if (res.code == 400) {
            this.$message({
              message: res.msg,
              type: "warning"
            });
          } else {
            this.$message({
              message: "立即上架成功",
              type: "success"
            });
            _this.getDetail();
          }
        });
      });
    },
    //下架应用
    soldOut() {
      let _this = this;
      this.$prompt("请输入下架原因", "提示", {
        confirmButtonText: "提交审核",
        cancelButtonText: "取消",
        inputValidator: data => {
          if (data == "" || data == null) {
            return "下架原因不能为空";
          }
        },
        inputErrorMessage: "下架原因不能为空"
      })
        .then(({ value }) => {
          post("home/app/soldOut", {
            version_id: _this.appDetail.app.version_data.id,
            note: value
          }).then(res => {
            if (res.code == 400) {
              this.$message({
                message: res.msg,
                type: "warning"
              });
            } else {
              this.$message({
                message: "下架审核提交成功",
                type: "success"
              });
              _this.getDetail();
            }
          });
        })
        .catch(() => {});
    },
    // 版本回退
    handleReback() {
      this.dialogVisible = true;
    },
    sureReback() {
      this.reback();
    },
    reback() {
      let _this = this;
      post("home/app/goBack", {
        version_id: _this.appDetail.app.version_data.id
      }).then(res => {
        if (res.code == 400) {
          this.$message({
            message: res.msg,
            type: "warning"
          });
        } else {
          this.dialogVisible = false;
          this.$message({
            message: "版本回退成功",
            type: "success"
          });
          _this.getDetail();
        }
      });
    },
    // 检测已下架状态逻辑
    checkDownStatus(status) {
      // console.log('this.appDetail', this.appDetail)
      if (status === 5) {
        const data = this.appDetail;
        const result = data.left_version.find(item => item.status === 1);
        const resultOne = data.left_version.find(item => item.status === 6);
        const resultTwo = data.left_version.find(item => item.status === 10);
        const resultThree = data.left_version.find(item => item.status === 4);
        if (
          result !== undefined ||
          resultOne !== undefined ||
          resultTwo !== undefined  || 
          resultThree !== undefined 
        ) {
          return false;
        } else {
          return true;
        }
      }
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

  .doc {
    margin: 0 6px 0 32px;
    display: inline-block;
    width: 6px;
    height: 6px;
    background-color: #e83c3c;
    border-radius: 50%;
  }

  .doc-no-m {
    margin: 0 6px 0 0px;
    display: inline-block;
    width: 6px;
    height: 6px;
    border-radius: 50%;
  }
}

.app-info {
  width: 100%;
}
.app-frame {
  padding: 20px 40px;
  border-radius: 4px;
  border: 1px solid rgba(241, 241, 241, 1);
  margin-bottom: 16px;
  width: 100%;
  h4 {
    font-size: 16px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: rgba(51, 51, 51, 1);
    line-height: 16px;
    border-left: 3px solid #02b6ff;
    padding-left: 10px;
    margin-bottom: 24px;
  }

  .info-box {
    display: flex;
  }
  .info-list {
    margin-right: 30px;
    li {
      display: flex;
      padding-bottom: 14px;
      align-items: center;
      & > span {
        width: 86px;
        height: 12px;
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
        line-height: 12px;
      }
      .more-width {
        width: 100px;
      }
      & > p {
        width: 316px;
        // height: 20px;
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        line-height: 20px;
      }
      .look-pre {
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(5, 164, 225, 1);
        line-height: 20px;
        margin-left: 30px;
        cursor: pointer;
      }
    }
    .spe-li {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      width: 560px;
      img {
        margin: 6px 6px 0;
      }
      .directionV {
        width: 76px;
        height: 108px;
      }
      .directionC {
        width: 120px;
        height: 60px;
      }

      div {
        padding-left: 50px;
      }
    }
  }
  .spe-info-list {
    li {
      display: flex;
      padding-bottom: 14px;
      align-items: center;
      & > span {
        // width: 86px;
        height: 12px;
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
        line-height: 12px;
      }

      & > p {
        // width: 316px;
        // height: 20px;
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        line-height: 20px;
      }
    }
  }
}
.btn-area {
  display: flex;
  justify-content: center;
  padding: 10px 342px 0;
  button {
    min-width: 108px;
  }
}
.persion /deep/ .el-dialog__body {
  .content {
    text-align: center;
    .title {
      height: 22px;
      font-size: 16px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(0, 0, 0, 1);
      line-height: 22px;
    }
    .tip {
      height: 20px;
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
      line-height: 20px;
    }
  }
}
</style>