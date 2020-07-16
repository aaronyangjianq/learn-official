<template>
  <div class="sdkDetailContain">
    <section class="position-relative padding-top padding-bottom bg-color">
      <div class="container">
        <div class="row align-center">
          <div class="text-align">
            <h1>{{sdk && sdk.title}}</h1>
            <p>{{sdk && sdk.exp}}</p>
            <div class="line">历史版本下载</div>
          </div>
        </div>
      </div>
    </section>
    <div class="pball">
      <section
        class="position-relative bg-color"
        v-for="versions in versionList"
        :key="versions.id"
      >
        <div class="container1">
          <div class="row align-center">
            <div class="align-center block height border">
              <div>
                <el-popover
                  placement="bottom"
                  width="100"
                  trigger="hover"
                  :content="versions.title"
                >
                  <div slot="reference" class="font1 fsize1">{{versions.title}}</div>
                </el-popover>
              </div>
              <div class="textwid">
                <span>{{!!versions.is_toll ? `¥${versions.price}` : "免费"}}</span>
              </div>
              <div class="pf pg fontw">
                <p>{{versions.version}}</p>
                <p>{{versions.size}}</p>
                <el-popover placement="bottom" width="400" trigger="hover" :content="versions.exp">
                  <p style="font-weight:500;" slot="reference" class="fsize1">{{versions.exp}}</p>
                </el-popover>
                <p>{{versions.add_time}}</p>
              </div>
              <div>
                <a
                  href="javascript:void(0)"
                  class="li-a btn a"
                  @click="download(versions.down_status, versions.is_toll, versions.id, sdk && sdk.id, versions.title, versions.version)"
                >{{getName(versions.down_status, versions.is_toll)}}</a>
              </div>
            </div>
            <el-dialog
              :visible.sync="waitingApply"
              width="400px"
              :before-close="handleClose"
              class="want"
            >
              <span>SDK使用资格审核中</span>
              <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="waitingApply = false">确 定</el-button>
              </span>
            </el-dialog>
            <el-dialog
              title="SDK使用资格申请"
              :visible.sync="applyAaptitude"
              width="400px"
              :before-close="handleClose"
              class="from"
            >
              <div>
                <div class="bingpai mar-le">
                  <p class="title">SDK名称：</p>
                  <el-input type="text" placeholder="PF_SDK_V3.0.0" v-model="versionName" disabled></el-input>
                </div>
                <div class="bingpai mar-le1">
                  <p class="title">预计用户规模：</p>
                  <el-select v-model="applyData.scale" placeholder="请选择用户规模" class="font-style">
                    <el-option
                      v-for="item in scaleList"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </div>
                <div class="bingpai mar-le2">
                  <p class="title">应用类型：</p>
                  <el-select v-model="applyData.type" placeholder="请选择应用类型" class="font-style">
                    <el-option
                      v-for="item in typeList"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </div>
                <div class="bingpai mar-le3">
                  <p class="title">联系人：</p>
                  <el-input
                    type="text"
                    placeholder="请输入联系人姓名"
                    class="small"
                    v-model="applyData.name"
                  ></el-input>
                </div>
                <div class="bingpai mar-le2">
                  <p class="title">联系电话：</p>
                  <el-input
                    type="text"
                    placeholder="请输入联系人电话"
                    class="small"
                    v-model="applyData.phone"
                  ></el-input>
                </div>
              </div>
              <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="sendAptitudeData">确 定</el-button>
              </span>
            </el-dialog>
            <!-- 绑定邮箱 -->

            <el-dialog :visible.sync="first" :before-close="handleClose" class="email">
              <div v-if="first">
                <div>
                  <div class="input-border">
                    <p class="input-title">邮箱</p>
                    <el-input type="text" placeholder="请输入邮箱号" v-model="emailData.email"></el-input>
                  </div>
                  <div class="duiqi">
                    <div class="input-border2">
                      <p class="input-title">验证码</p>
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
      </section>
    </div>
  </div>
</template>

<script>
import { get, post } from "@/store/request";

export default {
  layout: "navbar",
  data() {
    return {
      visible: false,
      applyAaptitude: false,
      waitingApply: false,
      downloadUrl: "",
      applyData: {
        name: "",
        phone: null,
        version_id: null,
        type: null,
        scale: null
      },
      scaleList: [
        {
          value: "1",
          label: "1-100人"
        },
        {
          value: "2",
          label: "100-1000人"
        },
        {
          value: "3",
          label: "1000人以上"
        }
      ],
      typeList: [
        {
          value: "1",
          label: "旅游"
        },
        {
          value: "2",
          label: "出版社"
        },
        {
          value: "3",
          label: "电子商务"
        },
        {
          value: "4",
          label: "教育"
        },
        {
          value: "5",
          label: "金融"
        },
        {
          value: "6",
          label: "运输"
        },
        {
          value: "7",
          label: "建筑"
        },
        {
          value: "8",
          label: "制造业"
        },
        {
          value: "9",
          label: "其他"
        }
      ],
      shenqing: false,
      versionName: "",
      emailData: {
        email: "",
        code: null
      },
      isEmailButton: true,
      content: "发送验证码", // 按钮里显示的内容
      totalTime: 60, //记录具体倒计时时间,
      ruleWrong: false,
      wrongMessage: "",
      first: false,
      cateName: "",
      sdk: {},
      versionList: []
    };
  },
  async created() {
    const id = this.$route.query.id;
    const rawData = await get("/home/sdk/versions", {
      id: id
    });

    if (rawData.code === 100) {
      this.cateName = rawData.data && rawData.data.name;
      this.sdk = rawData.data.sdk;
      this.versionList = rawData.data.versions;
    } else if (rawData.code === 405) {
      localStorage.removeItem("userInfo");
    }
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
    tobuyOrFree(toll, id) {
      if (!!toll) {
        if (localStorage.getItem("userInfo")) {
          this.$router.push(`/sdkbuy/?versionid=${id}`);
        } else {
          window.location.href =
            "http://account.pacific-future.com/user/login/index.html?callback_url=http://open.rixiazai.com/home/user/afterLogin";
        }
      } else {
        // console.log("免费");
      }
    },
    async download(status, toll, versionId, sdkId, versionTitle, version) {
      this.applyData.version_id = versionId;
      this.versionName = versionTitle + " " + version;
      if (localStorage.getItem("userInfo")) {
        if (status === 1 || status === 4) {
          this.applyAaptitude = true;
        } else if (status === 2) {

          this.waitingApply = true;
        } else if (status === 3 || status === 7) {

          this.$router.push(`/sdkbuy/?versionid=${versionId}`);
        } else if (status === 5) {
          const rawData = await get("home/sdk/down", {
            version_id: versionId
          });
          if (rawData.code === 100) {
            this.downloadUrl = rawData.data.url;
            this.downloadUrl && window.open(this.downloadUrl);
          } else if (rawData.code === 405) {
            localStorage.removeItem("userInfo");
          } else if (rawData.code === 407) {
            this.first = true;
          }
        } else if (status === 6) {
          const command = "buyhistory";
          this.$router.push(`/personCenter/?activeName=${command}`);
        }
      } else if (status === 0) {
        window.location.href =
          "http://account.pacific-future.com/user/login/index.html?callback_url=http://open.rixiazai.com/home/user/afterLogin";
      }
    },
    use() {
      if (localStorage.getItem("userInfo")) {
      } else {
        window.location.href =
          "http://account.pacific-future.com/user/login/index.html?callback_url=http://open.rixiazai.com/home/user/afterLogin";
      }
    },
    handleClose() {
      this.applyAaptitude = false;
      this.waitingApply = false;
      this.first = false;
      this.emailData = {};
      this.applyData = {};
    },
    async sendAptitudeData() {
      if (this.applyData.name === "") {
        this.$message("请填写联系人");
      } else if (this.applyData.phone === null) {
        this.$message("请填写联系方式");
      } else if (this.applyData.scale === null) {
        this.$message("请选择用户规模");
      } else if (this.applyData.tyep === null) {
        this.$message("请选择应用类型");
      }
      const rawData = await post("home/sdk/apply", {
        name: this.applyData.name,
        phone: this.applyData.phone,
        version_id: this.applyData.version_id,
        type: this.applyData.type,
        scale: this.applyData.scale
      });

      if (rawData.code === 100) {
        this.applyData = {};
        this.applyAaptitude = false;
        this.$message("请您等待申请");
        setTimeout(function() {
          window.location.reload();
        }, 1000);
      } else if (rawData.code === 405) {
        localStorage.removeItem("userInfo");
      } else {
        this.$message(rawData.msg);
      }
    },
    getName(status, istoll) {
      if (status === 5) {
        return "立即下载";
      } else if (status === 0 || status === 1 || status === 2 || status === 4) {
        return "申请使用";
      } else if (status === 3 || status === 6 || status === 7) {
        return "立即购买";
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
        const rawData = await post("home/user/send", {
          username: this.emailData.email
        });

        if (rawData.code === 405) {
          localStorage.removeItem("userInfo");
        }
      }
    },
    async bindPhoneOrEmail() {

      if (this.emailData.email === "") {
        this.ruleWrong = true;
        this.wrongMessage = "请填写邮箱";
      } else if (this.emailData.code === null) {
        this.ruleWrong = true;
        this.wrongMessage = "请填写邮箱验证码";
      } else {
        const rawData = await post("home/user/bindEmail", {
          email: this.emailData.email,
          verification_code: this.emailData.code
        });
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
.sdkDetailContain {
  min-height: calc(100vh - 179px);
}
.position-relative {
  position: relative !important;
}
.padding-top {
  padding-top: 53px;
}
.padding-bottom {
  padding-bottom: 36px;
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
.text-align {
  text-align: left;
}
h1 {
  font-size: 30px;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  color: rgba(51, 51, 51, 1);
  line-height: 24px;
  padding-bottom: 24px;
}
h2 {
  font-size: 20px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: rgba(102, 102, 102, 1);
  line-height: 20px;
  padding-bottom: 0.75rem;
}
p {
  font-size: 20px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
  line-height: 20px;
}
.pb1 {
  padding-bottom: 3rem;
}
.pb2 {
  padding-bottom: 10rem;
}
.line {
  padding: 0 20px 0;
  margin: 20px 0;
  line-height: 1px;
  border-left: 502px solid #ddd;
  border-right: 502px solid #ddd;
  text-align: center;
}
.container1 {
  padding-left: 15px;
  padding-right: 15px;
  margin-right: auto;
  margin-left: auto;
}
@media (min-width: 1200px) {
  .container1 {
    max-width: 965px;
  }
}
.block {
  display: flex;
}
.height {
  height: 104px;
  width: 100%;
}
.border {
  margin: 0 0 -1px -1px;
  border: 1px solid rgba(232, 232, 232, 1);
}
.font1 {
  font-size: 13px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.65);
  line-height: 22px;
  margin-left: 56px;
  margin-right: 162px;
  width: 63px;
}
.btn {
  position: relative;
  transition: all 0.2s ease;
  background: rgba(255, 255, 255, 1);
  border-radius: 4px;
  border: 1px solid rgba(217, 217, 217, 1);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.15);
  font-size: 13px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.65);
  line-height: 26px;
  display: inline-block;
  text-align: center;
  vertical-align: middle;
  width: 72px;
  height: 28px;
}
.a {
  text-decoration: none;
}
.fontw {
  width: 280px;
  text-align: center;
}
.pf {
  margin-left: 62px;
}
.pg {
  margin-right: 162px;
}
p {
  font-size: 12px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
  line-height: 20px;
}
.li-a {
  font-size: 13px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(2, 182, 255, 1);
  line-height: 22px;
}
.pb5 {
  padding-bottom: 140px;
}
.fsize1 {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.textwid {
  width: 72px;
  text-align: center;
  font-size: 13px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.65);
  line-height: 22px;
}
.pball {
  padding-bottom: 140px;
  // min-height: 582px;
}
// 申请 下载 购买
.want /deep/ .el-dialog {
  height: 154px;
}
.want /deep/ .el-dialog__body {
  text-align: center;
  padding: 12px 20px 24px 20px;
  font-size: 16px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  line-height: 22px;
}
.want /deep/ .el-dialog__footer {
  padding-top: 0;
}
.want /deep/ .el-button {
  width: 352px;
  height: 40px;
  background: rgba(2, 182, 255, 1);
  border-radius: 4px;
  font-size: 14px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  line-height: 15px;
}
//表格
.from /deep/ .el-dialog {
  height: 418px;
  font-size: 16px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
  line-height: 22px;
  text-align: center;
}
.from /deep/ .el-dialog__header {
  padding-top: 30px;
}
.from /deep/ .el-dialog__body {
  padding-top: 14px;
  padding-bottom: 16px;
}
.from /deep/ .el-dialog__footer {
  padding-top: 0;
}
.from /deep/ .el-button {
  width: 352px;
  height: 40px;
  background: rgba(2, 182, 255, 1);
  border-radius: 4px;
  font-size: 14px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  line-height: 14px;
  margin-left: 4px;
}
.bingpai {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}
.el-input {
  width: 240px;
}
.small {
  width: 224px;
}
.el-input /deep/ .el-input__inner {
  height: 32px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
  line-height: 22px;
}
.font-style /deep/ .el-input__inner {
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.65);
  line-height: 24px;
}
.mar-le {
  margin-left: 31px;
}
.el-select {
  width: 240px;
}
.el-select /deep/ .el-input__inner {
  height: 32px;
}
.mar-le1 {
  margin-left: 4px;
}
.mar-le2 {
  margin-left: 32px;
}
.mar-le3 {
  margin-left: 46px;
}
.title {
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  line-height: 20px;
  margin-right: 8px;
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
  font-size: 14px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
  line-height: 14px;
  margin-left: 12px;
  margin-right: 16px;
  white-space: nowrap;
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