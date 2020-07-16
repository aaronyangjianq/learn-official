<template>
  <header>
    <div class="navBox">
      <el-row :gutter="20">
        <el-col class="allcenter" :span="4">
          <img :src="headernavtwo" alt />
        </el-col>
        <el-col :span="14" class="p-center allcenter" id="tab">
          <ul>
            <li>
              <nuxt-link to="/" class="home">首页</nuxt-link>
            </li>
            <li>
              <nuxt-link to="/document/" class="document">说明文档</nuxt-link>
            </li>
            <li>
              <nuxt-link to="/sdk/" class="sdk">SDK下载</nuxt-link>
            </li>
            <li>
              <nuxt-link to="/demo/" class="demo">Demo演示</nuxt-link>
            </li>
            <li>
              <nuxt-link to="/problem/" class="problem">疑难解答</nuxt-link>
            </li>
          </ul>
        </el-col>
        <el-col :span="2" class="right allcenter spanfont" v-show="!islogin">
          <span @click="register" class="register">注册</span>
          <span class="special">|</span>
          <span @click="login" class="login">登录</span>
        </el-col>
        <el-col :span="2" class="right allcenter" v-show="islogin">
          <el-dropdown @command="handleCommand" style="outline: none">
            <div class="el-dropdown-link" style="outline: none">
              <el-avatar :size="size" :src="circleUrl" style="vertical-align: middle;"></el-avatar>
              <span class="accountTitle">{{accountName ? accountName : accountEmail}}</span>
            </div>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="account">
                <span>账号设置</span>
              </el-dropdown-item>
              <el-dropdown-item command="aptitute" divided>
                <span>资质申请</span>
              </el-dropdown-item>
              <!-- <el-dropdown-item divided>
                <span @click="toSubscribe">订阅服务</span>
              </el-dropdown-item>-->
              <el-dropdown-item command="buyhistory" divided>
                <span>购买记录</span>
              </el-dropdown-item>
              <el-dropdown-item command="sdkUseHistory" divided>
                <span>SDK使用申请记录</span>
              </el-dropdown-item>
              <el-dropdown-item command="myapps" divided>
                <span>我的应用</span>
              </el-dropdown-item>
              <el-dropdown-item command="logout" divided>
                <span>退出登录</span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
      <div class="prr">
        <el-dialog class="register" :visible.sync="dialogVisible" :before-close="handleClose">
          <div>
            <div class="input-border">
              <p class="input-title">手机</p>
              <el-input type="text" placeholder="请输入手机号码" v-model="phoneData.phone"></el-input>
            </div>
            <div class="duiqi">
              <div class="input-border2">
                <p class="input-title ip11">验证码</p>
                <el-input type="text" placeholder="请输入验证码" v-model="phoneData.phonecode"></el-input>
              </div>
              <div>
                <button class="button" @click="sendPhonecode" v-if="isphoneButton">获取验证码</button>
                <button class="button" v-else>{{content}}</button>
              </div>
            </div>
            <!-- <p class="ifwrong">密码不符合规则，请重试</p> -->
            <div class="input-border distance1">
              <p class="input-title">密码</p>
              <el-input type="text" placeholder="请设置密码" v-model="phoneData.code"></el-input>
            </div>
            <input
              type="text"
              placeholder="请再次输入密码"
              class="passagain distance"
              v-model="phoneData.recode"
            />
            <p class="ifwrong" v-if="ruleWrong">{{message}}</p>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="phoneRegister">确 定</el-button>
          </span>
        </el-dialog>
      </div>
    </div>
  </header>
</template>

<script>
// import axios from "axios";
import { get, post } from "@/store/request";
import aba from "@/static/images/headernavtwo.png";
import bab from "@/static/images/headnav.png";
import abb from "@/static/images/icon_phone.png";
import baa from "@/static/images/icon_mailbox.png";
import aab from "@/static/images/head.png";
export default {
  data() {
    return {
      headernav: bab,
      headernavtwo: aba,
      icon_phone: abb,
      icon_email: baa,
      circleUrl: aab,
      token: 0,
      islogin: false,
      size: "medium",
      account: "account",
      aptitute: "aptitute",
      subscribe: "subscribe",
      buyhistory: "buyhistory",
      sdkUseHistory: "sdkUseHistory",
      myApplication: "myApplication",
      dialogVisible: false,
      activeName: "first",
      phoneData: {
        phone: null,
        phonecode: null,
        code: null,
        recode: null
      },
      emailData: {
        email: null,
        emailCode: null,
        code: null
      },
      isphoneButton: true,
      isEmailButton: true,
      content: "发送验证码", // 按钮里显示的内容
      totalTime: 60, //记录具体倒计时时间,
      accountName: null,
      accountEmail: "",
      ruleWrong: false
    };
  },
  watch: {
    "$store.state.userInfo": function(Nval, Oval) {
      // console.log("header---", this.$store.state.userInfo.phone);
      this.accountName =
        (this.$store.state.userInfo && this.$store.state.userInfo.phone) ||
        (JSON.parse(localStorage.getItem("userInfo")) &&
          JSON.parse(localStorage.getItem("userInfo")).phone);
      this.accountEmail =
        (this.$store.state.userInfo && this.$store.state.userInfo.email) ||
        (JSON.parse(localStorage.getItem("userInfo")) &&
          JSON.parse(localStorage.getItem("userInfo")).email);
      if (Nval.id) {
        this.islogin =
          (JSON.parse(localStorage.getItem("userInfo")) || Nval.id) && true;
      } else {
        this.islogin = false;
      }
    },
    immediate: true
  },
  mounted() {
    this.accountName =
      (this.$store.state.userInfo && this.$store.state.userInfo.phone) ||
      (JSON.parse(localStorage.getItem("userInfo")) &&
        JSON.parse(localStorage.getItem("userInfo")).phone);
    this.accountEmail =
      (this.$store.state.userInfo && this.$store.state.userInfo.email) ||
      (JSON.parse(localStorage.getItem("userInfo")) &&
        JSON.parse(localStorage.getItem("userInfo")).email);
    this.islogin = localStorage.getItem("userInfo") && true;
  },
  methods: {
    // 点击跳转登录
    login() {
      window.location.href =
        "http://account.pacific-future.com/user/login/index.html?callback_url=http://open.rixiazai.com/home/user/afterLogin";
    },
    // 点击跳转注册
    register() {
      this.dialogVisible = true;
    },
    handleCommand(command) {
      if (command === "logout") {
        window.location.href =
          "http://account.pacific-future.com/user/index/logout.html?callback_url=http://open.rixiazai.com/home/user/afterLogout";
        localStorage.removeItem("userInfo");
        this.islogin = false;
      } else {
        this.$router.push(`/personCenter/?activeName=${command}`);
      }
    },
    handleClose() {
      this.dialogVisible = false;
      this.phoneData = {};
    },
    handleClick(tab, event) {
      // console.log(tab, event);
    },
    async sendPhonecode() {
      // const qs = require("qs");
      let _this = this;
      if (_this.phoneData.phone === null) {
        _this.ruleWrong = true;
        _this.message = "请填写手机号";
      } else {
        this.isphoneButton = false;
        this.content = this.totalTime + "s后发送"; //这里解决60秒不见了的问题
        let clock = window.setInterval(() => {
          this.totalTime--;
          this.content = this.totalTime + "s后发送";
          if (this.totalTime < 0) {
            //当倒计时小于0时清除定时器
            window.clearInterval(clock);
            this.content = "发送验证码";
            this.isphoneButton = true;
            this.totalTime = 60;
          }
        }, 1000);
        const rawData = post("home/user/send", {
          username: _this.phoneData.phone
        });
        // console.log("rawData", rawData);
      }
    },
    async phoneRegister() {
      // const qs = require("qs");
      let _this = this;
      if (_this.phoneData.phone === null) {
        _this.ruleWrong = true;
        _this.message = "请填写手机号";
      } else if (_this.phoneData.phoneCode === null) {
        _this.ruleWrong = true;
        _this.message = "请填写验证码";
      } else if (_this.phoneData.code === null) {
        _this.ruleWrong = true;
        _this.message = "请填写密码";
      } else if (_this.phoneData.recode !== _this.phoneData.code) {
        _this.ruleWrong = true;
        _this.message = "密码不一致";
      } else {
        const rawData = await post("home/user/reg", {
          username: _this.phoneData.phone,
          password: _this.phoneData.code,
          verification_code: _this.phoneData.phoneCode
        });

        if (rawData.code === 100) {
          _this.$message("注册成功");
          this.phoneData = {};
          this.dialogVisible = false;
        } else {
          _this.ruleWrong = true;
          _this.message = rawData.msg;
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
$activeColor: black;
@mixin productCss() {
  div {
    font-size: 14px;
    color: #8b8b8b;
    margin-top: 4px;
  }
}
@media screen and (max-width: 1100px) {
  .navBox {
    width: 100% !important;
  }
}
header {
  width: 100%;
  height: 68px;
  display: flex;
  justify-content: space-between;
  align-content: center;
  box-sizing: border-box;
  //   position: fixed;
  border-bottom: thin solid;
  border-color: #c0c0c04a;
  top: 0;
  z-index: 3;

  img {
    width: 204px;
    height: 35px;
  }
  .navBox {
    width: 1300px;
    height: 68px;
    margin: 0 auto;
    .el-row {
      width: 100%;
      height: 100%;
    }
    ul {
      display: flex;
      li {
        margin: 0 29px;
        font-size: 22px;
        list-style: none;
        &:hover {
          a {
            color: #02b6ff;
          }
          .el-dropdown {
            color: $activeColor;
          }
        }
        a {
          font-size: 18px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #02b6ff;
          text-decoration: none;
          height: 65px;
          display: inline-block;
        }
        .nuxt-link-exact-active {
          color: #02b6ff;
          border-bottom: 2px solid #02b6ff;
        }
        .el-dropdown {
          color: #02b6ff;
          font-size: 22px;
        }
      }
    }
    .spanfont {
      font-size: 18px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: rgba(255, 255, 255, 1);
      span:hover {
        color: #02b6ff;
      }
      // span:focus {
      //   color: #02b6ff;
      // }
      // span:active {
      //   color: #02b6ff;
      // }
    }
    .allcenter {
      height: 68px;
      line-height: 68px;
    }
    .el-col-2 {
      width: auto;
    }
    .el-col-14 {
      width: auto;
    }
    .el-col-4 {
      width: auto;
    }
    .right {
      float: right;
    }
    .p-center {
      padding-left: 111.11px !important;
    }
    .home {
      color: black;
    }
    .document {
      color: black;
    }
    .sdk {
      color: black;
    }
    .demo {
      color: black;
    }
    .problem {
      color: black;
    }
    .register {
      color: black;
    }
    .special {
      color: black;
    }
    .login {
      color: black;
    }
    span {
      cursor: pointer;
      color: #fff;
    }
    .accountTitle {
      color: black;
    }
  }
}
.bd1 {
  border: 1px solid rgba(246, 246, 246, 1);
  width: 360px;
  height: 48px;
  margin-left: 50px;
  margin-right: 50px;
  margin-bottom: 16px;
}
.b2 {
  border: none;
}
.p0 {
  font-size: 14px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
  line-height: 48px;
  width: 56px;
  text-align: center;
}
.ff {
  display: flex;
  align-items: center;
}
.ip {
  width: 229px;
  height: 48px;
  border: 1px solid rgba(246, 246, 246, 1);
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
  line-height: 48px;
}
.btnz {
  width: 360px !important;
  height: 48px !important;
  background: rgba(2, 182, 255, 1) !important;
  border-radius: 4px !important;
  margin-left: 50px !important;
  margin-right: 50px !important;
  font-size: 15px !important;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500 !important;
  color: rgba(255, 255, 255, 1) !important;
  line-height: 21px !important;
}
.prr {
  position: relative;
}
.paa {
  display: flex;
  position: absolute;
  bottom: 24px;
  left: 170px;
}
.p12 {
  font-size: 12px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
  line-height: 12px;
}
.a12 {
  text-decoration: none;
  color: #02b6ff;
  font-size: 12px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  line-height: 12px;
}
.register /deep/ .el-dialog {
  width: 460px;
  height: 472px;
}
.register /deep/ .el-dialog__header {
  padding: 0;
}
.register /deep/ .el-input__inner {
  border: none;
  height: 21px;
  padding: 0px 0px 0px 16px;
  border-left: 1px solid rgba(240, 240, 240, 1);
  border-radius: 0;
}
.register /deep/ .el-dialog__body {
  padding: 60px 20px 0 20px;
}
.register /deep/ .el-dialog__footer {
  text-align: center;
  padding: 10px 20px 24px;
  position: absolute;
  left: 30px;
  bottom: 0;
}
.register /deep/ .el-button {
  width: 360px;
  height: 48px;
}
.input-border {
  border: 1px solid rgba(246, 246, 246, 1);
  display: flex;
  align-items: center;
  width: 360px;
  height: 48px;
  margin-left: 30px;
  margin-right: 30px;
}
.distance {
  margin-top: 16px;
}
.distance1 {
  margin-top: 48px;
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
.ip11 {
  width: 63px;
}
.passagain {
  width: 360px;
  height: 48px;
  margin-left: 30px;
  margin-right: 30px;
  padding: 0 15px;
  border: 1px solid rgba(246, 246, 246, 1);
}
.passagain:focus {
  outline: none;
}
.passagain::-webkit-input-placeholder {
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
  line-height: 22px;
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
.ifwrong {
  padding-left: 30px;
  padding-top: 12px;
  font-size: 12px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(232, 60, 60, 1);
  line-height: 20px;
}
.el-button--primary {
  background-color: #02b6ff;
  border-color: #02b6ff;
}
// /deep/ .el-dropdown {
//   outline: 0 !important;
// }
</style>