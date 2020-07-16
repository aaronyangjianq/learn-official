<template>
  <div>
    <div class="min-he">
      <section
        v-for="(item, index) in demolist"
        :key="item.id"
        class="position-relative padding-top padding-bottom bg-color"
      >
        <div class="container">
          <div class="row align-center">
            <div class="left margin-bottom" v-if="index % 2 === 0">
              <div class="align-center">
                <h1>{{item.title}}</h1>
                <p>{{item.exp}}</p>
                <a class="btn border" style="cursor: pointer;" @click="download(item.id)">立即下载</a>
              </div>
            </div>
            <div class="left margin-bottom" v-if="index % 2 !== 0">
              <div class="align-center">
                <img
                  :src="item.media.url"
                  alt="Image placeholder"
                  style="width: 460px; height:240px;"
                />
              </div>
            </div>
            <div class="right margin-bottom" v-if="index % 2 === 0">
              <div class="align-center">
                <img
                  :src="item.media.url"
                  alt="Image placeholder"
                  style="width: 460px; height:240px; margin-left: 70px"
                />
              </div>
            </div>
            <div class="secondRight margin-bottom" v-if="index % 2 !== 0">
              <div class="align-center">
                <h1>{{item.title}}</h1>
                <p>{{item.exp}}</p>
                <a class="btn border" style="cursor: pointer;" @click="download(item.id)">立即下载</a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div v-if="this.count > 10" style="text-align: center; ">
        <a class="btn border" style="cursor: pointer;" @click="loadList" v-if="load">点击加载</a>
        <a class="btn border" style="cursor: pointer; color: #999999" v-if="!load">已经到底了</a>
      </div>
      <el-dialog :visible.sync="first" :before-close="handleClose" class="email">
        <div v-if="first">
          <div>
            <div class="input-border">
              <p class="input-title">邮箱</p>
              <el-input type="text" placeholder="请输入邮箱号" v-model="emailData.email"></el-input>
            </div>
            <div class="duiqi">
              <div class="input-border2">
                <p class="input-title ip11">验证码</p>
                <el-input type="text" placeholder="请输入验证码" v-model="emailData.code"></el-input>
              </div>
              <div>
                <button class="button" @click="sendEmailcode" v-if="isEmailButton">获取验证码</button>
                <button class="button" v-else>{{content}}</button>
              </div>
            </div>
            <p class="wrong" v-if="ruleWrong">{{wrongMessage}}</p>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="bindPhoneOrEmail">确定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
// import axios from "axios";
import { get, post } from "@/store/request";
export default {
  layout: "navbar",
  data() {
    return {
      load: true,
      pageCount: 1,
      url: "",
      emailData: {
        email: "",
        code: null
      },
      isEmailButton: true,
      content: "发送验证码", // 按钮里显示的内容
      totalTime: 60, //记录具体倒计时时间,
      ruleWrong: false,
      wrongMessage: "",
      first: false
    };
  },
  async asyncData({ params, store }) {
    let demolist = [];
    let count = null;
    let limit = null;
    let page = null;
    let total_page = null;
    const demoList = await get("home/demo/list", {
      page: 1,
      limit: 10
    });
    const leftList = demoList && demoList.data && demoList.data.list.filter((item, index) => index % 2 !== 0);
    const rightList = demoList && demoList.data && demoList.data.list.filter((item, index) => index % 2 === 0);
    
    demolist = demoList.data.list;
    count = demoList.data.count;
    limit = demoList.data.limit;
    page = demoList.data.page;
    total_page = demoList.data.total_page;
    return { demolist, count, limit, page, total_page };
  },
  watch: {
    "$store.state.userInfo": function(Nval, Oval) {
      if (Nval.id) {
        this.$store.state.userInfo = Nval;
        this.$store.state.userInfo &&
          localStorage.setItem(
            "userInfo",
            JSON.stringify(this.$store.state.userInfo)
          );
        window.location.reload();
      }
    }
  },
  methods: {
    handleClose() {
      this.first = false;
    },
    async loadList() {
      this.page = this.page + 1;
      let total_page = this.total_page;
      let newdemolist = [];

      if (this.page <= total_page) {
        const rawData = await get("home/demo/list", {
          page: this.page,
          limit: 10
        });
        newdemolist = rawData.data.list;
        this.demolist = [...this.demolist, ...newdemolist];
      } else if (this.page > total_page) {
        this.load = !this.load;
      }
    },
    async download(id) {
      const versionId = id;
      if (localStorage.getItem("userInfo")) {
        const rawData = await get("home/demo/down", {
          version_id: versionId
        });
        if (rawData.code === 100) {
          this.url = rawData.data.url;
          this.url && window.open(this.url);
        } else if (rawData.code === 407) {
          this.first = true;
        }
      } else {
        window.location.href =
          "http://account.pacific-future.com/user/login/index.html?callback_url=http://open.rixiazai.com/home/user/afterLogin";
      }
    },
    async sendEmailcode() {
      if (this.emailData.email === "") {
        this.ruleWrong = true;
        this.wrongMessage = "请填写邮箱";
      } else {
        this.isEmailButton = false;
        this.content = this.totalTime + "s后发送"; //这里解决60秒不见了的问题
        let clock = window.setInterval(() => {
          this.totalTime--;
          this.content = this.totalTime + "s后发送";
          if (this.totalTime < 0) {
            //当倒计时小于0时清除定时器
            window.clearInterval(clock);
            this.content = "发送验证码";
            this.isEmailButton = true;
            this.totalTime = 60;
          }
        }, 1000);
        const rawdata = await post("home/user/send", {
          username: this.emailData.email
        });

        if (rawdata.code === 400) {
          this.$message(rawdata.msg);
        }
      }
    },
    async bindPhoneOrEmail() {
      const qs = require("qs");

      if (this.emailData.email === "") {
        this.ruleWrong = true;
        this.wrongMessage = "请填写邮箱";
      } else if (this.emailData.code === null) {
        this.ruleWrong = true;
        this.wrongMessage = "请填写邮箱验证码";
      } else {
        const rawData = await post(
          `${this.$store.state.baseUrl}/home/user/bindEmail`,
          qs.stringify({
            email: this.emailData.email,
            code: this.emailData.code
          })
        );
        if (rawData.code === 100) {
          this.$message("绑定成功");
          localStorage.removeItem("userInfo");
          this.getUserInfoData();
          this.emailData = {};
          this.first = false;
        } else if (rawData.code === 405) {
          localStorage.removeItem("userInfo");
        } else {
          this.ruleWrong = true;
          this.wrongMessage = rawData.msg;
        }
      }
    },
    getUserInfoData() {
      this.$store.dispatch("getUserInfo");
    }
  }
};
</script>

<style lang="scss" scoped>
.min-he {
  min-height: calc(100vh - 179px);
}
.position-relative {
  position: relative !important;
}
.padding-top {
  padding-top: 2rem;
}
.padding-bottom {
  padding-bottom: 4.5rem;
}
.bg-color {
  background-color: #fff;
}
.container {
  padding-left: 15px;
  padding-right: 15px;
  margin-right: auto;
  margin-left: auto;
}
@media (min-width: 1200px) {
  .container {
    max-width: 1140px;
  }
}
.row {
  display: flex;
  margin-left: -15px;
  margin-right: -15px;
  flex-wrap: wrap;
}
.align-center {
  align-items: center;
}
.left {
  position: relative;
  width: 100%;
  padding-right: 15px;
  padding-left: 15px;
  max-width: 50%;
  flex: 0 0 50%;
}
.margin-bottom {
  margin-bottom: 0rem;
}
.right {
  position: relative;
  width: 100%;
  padding-right: 15px;
  padding-left: 15px;
  max-width: 50%;
  flex: 0 0 50%;
}
.secondRight {
  position: relative;
  width: 100%;
  padding-right: 15px;
  padding-left: 75px;
  max-width: 50%;
  flex: 0 0 50%;
}
h1 {
  font-size: 20px;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  color: rgba(51, 51, 51, 1);
  line-height: 32px;
  padding-bottom: 1rem;
}
p {
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  line-height: 28px;
  padding-bottom: 1rem;
}
.btn {
  position: relative;
  transition: all 0.2s ease;
  border-radius: 0.25rem;
  color: #02b6ff;
  background-color: #02b6ff00;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.15);
  font-size: 1.125rem;
  font-weight: 600;
  line-height: 23px;
  display: inline-block;
  padding: 0.75rem 1.75rem;
  text-align: center;
  vertical-align: middle;
  width: 150px;
}
.border {
  border: 1px solid #02b6ff;
  text-decoration: none;
}
// 绑定邮箱
.email /deep/ .el-dialog {
  width: 460px;
  height: 312px;
}
.email /deep/ .el-dialog__header {
  padding: 0;
}
.email /deep/ .el-dialog__body {
  padding: 26px 20px 30px;
}
.email /deep/ .el-input__inner {
  border: none;
  height: 21px;
  padding: 0px 0px 0px 16px;
  border-left: 1px solid rgba(240, 240, 240, 1);
  border-radius: 0;
}
.email /deep/ .el-button {
  width: 360px;
  height: 48px;
  background: rgba(2, 182, 255, 1);
  border-radius: 4px;
  font-size: 15px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  line-height: 21px;
  margin-left: 30px;
  margin-right: 30px;
}
.email /deep/ .el-dialog__footer {
  padding: 42px 20px 20px;
}
.input-border {
  border: 1px solid rgba(246, 246, 246, 1);
  display: flex;
  align-items: center;
  width: 357px;
  height: 48px;
  margin-left: 30px;
  margin-right: 30px;
  margin-top: 34px;
}
.wrong {
  font-size: 12px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(255, 2, 2, 1);
  line-height: 12px;
  float: left;
  margin-left: 30px;
  padding-top: 12px;
}
.input-title {
  width: 53px;
  font-size: 14px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
  line-height: 14px;
  margin-left: 12px;
  margin-right: 16px;
  padding: 0;
}
.ip11 {
  width: 63px;
}
.duiqi {
  display: flex;
  align-items: center;
  margin-top: 16px;
}
.input-border2 {
  border: 1px solid rgba(246, 246, 246, 1);
  display: flex;
  align-items: center;
  width: 213px;
  height: 48px;
  margin-left: 30px;
}
.button {
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  background: #fff;
  border: 1px solid #dcdfe6;
  color: #606266;
  -webkit-appearance: none;
  text-align: center;
  box-sizing: border-box;
  outline: 0;
  margin: 0;
  transition: 0.1s;
  padding: 12px 20px;
  border-radius: 4px;
  background: rgba(2, 182, 255, 1);
  border-color: #409eff;
  font-size: 15px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  line-height: 21px;
  width: 135px;
  height: 48px;
  margin-left: 10px;
}
</style>