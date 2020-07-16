<template>
  <div class="core-w">
    <AppSidebar :version="appDetail.left_version" :isCreat="true" :appid="appDetail.app && appDetail.app.id" :create_status="create_status" />
    <div style="width:100%" v-if="ruleForm">
      <section class="app-frame app-version">
        <h4>版本信息</h4>
        <el-form :model="ruleForm" :rules="rules" ref="versionRuleForm" label-width="180px" class="demo-ruleForm">
          <el-form-item label="软件安装包:" prop="file">
            <el-upload :file-list="ruleForm && ruleForm.file?[ruleForm.file]:[]" :limit="1" class="upload-demo" style="display:flex;" :on-success="handleFileSuccess" :on-remove="handleRemoveFile" :action="appaction">
              <el-button v-if="ruleForm && ruleForm.file==''" style="margin-right:10px;" size="small">点击上传</el-button>
              <span class="size-mb" v-if="ruleForm &&ruleForm.file">{{(ruleForm && ruleForm.file.size/1024/1024).toFixed(2)}} MB</span>
            </el-upload>
          </el-form-item>
          <el-form-item label="版本号:" prop="version">
            <el-input v-model="ruleForm.version"></el-input>
          </el-form-item>
          <el-form-item label="更新内容:" prop="update_content">
            <el-input type="textarea" v-model="ruleForm.update_content"></el-input>
          </el-form-item>
        </el-form>
      </section>
      <section class="app-frame app-info">
        <h4>应用信息</h4>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="180px" class="demo-ruleForm">
          <el-form-item label="支持设备:" prop="os">
            <el-select :disabled="isEdit" v-model="ruleForm.os" placeholder="请选择支持设备">
              <el-option label="眼镜版" :value="0"></el-option>
              <el-option label="手机版" :value="1"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="应用名称:" prop="name">
            <el-input :disabled="isEdit" v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="应用类型:" prop="cid">
            <!-- @change="handleTypeChange" -->
            <el-cascader :disabled="isEdit" :show-all-levels="false" v-model="ruleForm.cid" placeholder="请选择应用类型" :options="appTypeArrs"></el-cascader>
          </el-form-item>
          <el-form-item label="应用介绍:" prop="desc">
            <el-input :disabled="isEdit" type="textarea" :autosize="{ minRows: 3, maxRows: 6}" v-model="ruleForm.desc"></el-input>
          </el-form-item>

          <el-form-item label="图标:" prop="icon">
            <el-upload :disabled="isEdit" class="avatar-uploader" :action="action" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
              <img v-if="ruleForm.icon" :src="ruleForm.icon.url" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <p class="avator-fix">大小：500以内 &emsp;&emsp;&emsp;格式：PNG</p>
          </el-form-item>
          <el-form-item label="应用介绍截图:" prop="direction">
            <el-radio-group :disabled="isEdit" v-model="ruleForm.direction">
              <el-radio :label="0">横向截图</el-radio>
              <el-radio :label="1">竖向截图</el-radio>
            </el-radio-group>
            <el-upload :disabled="isEdit" :action="action" :limit="5" :file-list.sync="appIntrofileList" :on-change="handleItrChange" :before-upload="beforeItrUpload" :class="{'hide':appIntrofileList.length>4||isEdit,'vertical':ruleForm.direction==1,'corss':ruleForm.direction==0}" list-type="picture-card" :auto-upload="true">
              <i slot="default" class="el-icon-plus"></i>
              <div slot="file" slot-scope="{file}">
                <img class="el-upload-list__item-thumbnail" :src="file.url" alt="">
                <span class="el-upload-list__item-actions">
                  <span class="el-upload-list__item-preview">
                    <i v-if="!isEdit" class="el-icon-zoom-in" @click="handlePictureCardPreview(file)"></i>
                  </span>
                  <span class="el-upload-list__item-delete">
                    <i v-if="!isEdit" class="el-icon-delete" @click="handleRemove(file)"></i>
                  </span>
                </span>
              </div>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl">
            </el-dialog>
            <p class="imgs-desc">请上传至少3张图片，规格:像素要求1080*1920 (宽高比为9:16)支持JPG、 JPEG或PNG格式，单张图片最大为2M。</p>
          </el-form-item>
          <el-form-item label="是否收费:" prop="is_toll">
            <el-radio-group :disabled="isEdit" v-model="ruleForm.is_toll">
              <el-radio :label="0">免费</el-radio>
              <el-radio :label="1">收费</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item v-if="ruleForm.is_toll==1" label="收费说明:" prop="toll_desc">
            <el-input :disabled="isEdit" type="textarea" v-model="ruleForm.toll_desc"></el-input>
          </el-form-item>
          <el-form-item label="有无内置广告:" prop="ad">
            <el-radio-group :disabled="isEdit" v-model="ruleForm.ad">
              <el-radio :label="1">有</el-radio>
              <el-radio :label="0">无</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="年龄分级标准:" prop="age">
            <el-radio-group :disabled="isEdit" v-model="ruleForm.age">
              <el-radio :label="0">
                年满3周岁
                <el-tooltip class="item" effect="dark" placement="bottom">
                  <div slot="content">此类内容不包含暴力、惊吓、不良用语（如低俗幽默、粗口）等受限制内容<br />及7+以上级别禁止内容，一般情况下，适合各个年龄段的用户。</div>
                  <img class="icon-question" src="@/static/images/icon_explanation.png">
                </el-tooltip>
              </el-radio>
              <el-radio :label="1">
                年满12周岁
                <el-tooltip class="item" effect="dark" placement="bottom">
                  <div slot="content">此类内容可能包含少量的轻微暴力（针对虚拟形象的暴力内容以及含蓄的针对<br />人类外形或动物角色的暴力内容，不含逼真、细致、血腥的暴力场景）、少量<br />的含蓄不良用语（如轻度的粗口，但不得含有性粗口）、少量可能惊吓到儿童<br />的场景（但不含惊悚/恐怖题材内容），但不得含有粗俗幽默内容及16+以上级<br />别禁止内容。</div>
                  <img class="icon-question" src="@/static/images/icon_explanation.png">
                </el-tooltip>
              </el-radio>
              <el-radio :label="2">
                年满18周岁
                <el-tooltip class="item" effect="dark" placement="bottom">
                  <div slot="content">此类内容（如理财、直播表演、恋爱交友等）仅适用于成人用户，但不得含有<br />色情、赌博、激烈的暴力（如血腥、残肢、严刑拷打等场景）、教唆犯罪、危<br />害国家利益、破坏民族团结、侮辱宗教信仰、宣扬邪教/迷信/毒品等违反法律<br />及违背社会公德的内容。</div>
                  <img class="icon-question" src="@/static/images/icon_explanation.png">
                </el-tooltip>
              </el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="是否需要登录进行审核:" prop="need_login">
            <el-radio-group :disabled="isEdit" v-model="ruleForm.need_login">
              <el-radio :label="1">是</el-radio>
              <el-radio :label="0">否</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item v-if="ruleForm.need_login==1" label="测试账号:" prop="test_account">
            <el-input :disabled="isEdit" v-model="ruleForm.test_account"></el-input>
          </el-form-item>
          <el-form-item v-if="ruleForm.need_login==1" label="测试密码:" prop="test_pass">
            <el-input :disabled="isEdit" v-model="ruleForm.test_pass"></el-input>
          </el-form-item>
        </el-form>
      </section>
      <div class="btn-area">
        <el-button @click="resetForm('ruleForm')">取消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">提交审核</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import AppSidebar from "../components/AppSidebar";
import qs from "qs";
import { get, post } from "@/store/request";

const ageObj = {
  年满3周岁: 0,
  年满12周岁: 1,
  年满18周岁: 2
};
export default {
  layout: "other",
  components: {
    AppSidebar
  },
  data() {
    return {
      ruleForm: {
        
      },
      rules: {
        os: [
          { required: true, message: "请选择支持设备", trigger: "change" }
          // { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        name: [
          {
            required: true,
            pattern: /^[\w\u4e00-\u9fa5]{1,20}$/g,
            message: "只能输入汉字，字母，数组以及'_'",
            trigger: "blur"
          }
        ],
        desc: [{ required: true, message: "请填写应有介绍", trigger: "blur" }],
        cid: [{ required: true, message: "请选择应有类型", trigger: "change" }],
        icon: [{ required: true, message: "请上传图标", trigger: "change" }],
        toll_desc: [
          { required: true, message: "请填写收费说明", trigger: "blur" }
        ],
        test_account: [
          { required: true, message: "请填写测试账号", trigger: "blur" }
        ],
        test_pass: [
          { required: true, message: "请填写测试密码", trigger: "blur" }
        ],
        //  版本信息部分

        file: [
          { required: true, message: "请上传软件安装包", trigger: "change" }
        ],
        version: [{ required: true, message: "请填写版本号", trigger: "blur" }],
        update_content: [
          { required: true, message: "请填写更新内容", trigger: "blur" }
        ]

        // type: [
        //   {
        //     type: "array",
        //     required: true,
        //     message: "请至少选择一个活动性质",
        //     trigger: "change"
        //   }
        // ],
      },
      appIntrofileList: [],
      imageUrl: "",
      dialogImageUrl: "",
      dialogVisible: false,
      disabled: false,
      appTypeArrs: [],
      appDetail: {
        app: {
          file: '',
          version: '',
          update_content: '',
          app_id: null,
          age: null,
        }
      },
      create_status: 0,
      isEdit: false,
      action: '',
      appaction: ''
    };
  },
  async created() {
    const id = this.$route.query.id;
    this.isEdit = this.$route.query.isEdit === 1 ? true : false;
    const appDetailData = await get(`/home/app/AppDetail`, { app_id: id });
    if (appDetailData.data.app) {
        if (this.isEdit === 1 && appDetailData.data.app.version_data) {
          appDetailData.data.app.file = appDetailData.data.app.version_data.file;
          appDetailData.data.app.version = appDetailData.data.app.version_data.version;
          appDetailData.data.app.update_content =
            appDetailData.data.app.version_data.update_content;
        } else {
          appDetailData.data.app.file = "";
        }
        appDetailData.data.app.app_id = appDetailData.data.app.version_data.app_id;
        appDetailData.data.app.age = ageObj[appDetailData.data.app.age];
        this.create_status = appDetailData.data.create_status;
        this.appIntrofileList = appDetailData.data.app.images;
      }
    this.appDetail = appDetailData.data;
    this.ruleForm = this.appDetail.app;
    this.action = `${this.$store.state.baseUrl}/home/aptitude/upload`;
    this.appaction = `${this.$store.state.baseUrl}/home/app/upload`;
    this.getCate();
    // this.getDetail();
  },
  methods: {
    getCate() {
      get(`/home/index/getCate`, { type: 4 }).then(res => {
        res.data.forEach(item => {
          item.value = item.id + "";
          item.label = item.name;
          if (item.children.length > 0) {
            item.children.forEach(vv => {
              vv.value = vv.id + "";
              vv.label = vv.name;
              if (vv.children.length > 0) {
                vv.children.forEach(vvv => {
                  vvv.value = vvv.id + "";
                  vvv.label = vvv.name;
                  vvv.children = null;
                });
              } else {
                vv.children = null;
              }
            });
          } else {
            item.children = null;
          }
        });
        this.appTypeArrs = res.data;
      });
    },
    // async getDetail() {

    // },
    submitForm(formName) {
      let flag = true;
      if (this.isEdit) {
        this.$refs.versionRuleForm.validate(valid => {
          if (!valid) {
            flag = false;
          }
        });
      } else {
        this.$refs[formName].validate(valid => {
          if (!valid) {
            flag = false;
          }
        });
        this.$refs.versionRuleForm.validate(valid => {
          if (!valid) {
            flag = false;
          }
        });
        if (this.appIntrofileList.length < 3) {
          this.$message({
            message: "请上传至少3张应用介绍截图",
            type: "warning"
          });
          return;
        }
      }
      if (!flag) {
        this.$message({
          message: "请完善应用详情相关内容",
          type: "warning"
        });
      } else {
        // 提交审核
        if (this.isEdit) {
          this.editVersion();
        } else {
          this.createApp();
        }
      }
    },
    // 编辑版本提交审核
    editVersion() {
      let obj = {
        file: this.ruleForm.file,
        version: this.ruleForm.version,
        update_content: this.ruleForm.update_content,
        version_id: this.ruleForm.version_id,
        app_id: this.ruleForm.id
        // status:this.ruleForm.status,
        // name:this.ruleForm.name
      };
      post("home/app/updateVersion", obj).then(res => {
        if (res.code == 400) {
          this.$message({
            message: res.msg,
            type: "warning"
          });
        } else {
          this.$message({
            message: "提交审核成功",
            type: "success"
          });
          this.$router.push("/personCenter/?activeName=myapps");
        }
      });
    },
    // 提交审核
    async createApp() {
      let obj = JSON.parse(JSON.stringify(this.ruleForm));
      obj.images = this.appIntrofileList;
      obj.images = obj.images.map(img => {
        if (img.response) {
          return img.response.data;
        } else {
          return img;
        }
      });
      obj.cid = this.ruleForm.cid[this.ruleForm.cid.length - 1];
      post("home/app/createVersion", obj).then(res => {
        if (res.code == 400) {
          this.$message({
            message: res.msg,
            type: "warning"
          });
        } else {
          this.$message({
            message: "创建成功",
            type: "success"
          });
          this.$router.push("/personCenter/?activeName=myapps");
        }
      });
    },
    resetForm(formName) {
      this.$confirm("退出当前页面，将清空已输入信息，您确认退出？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$refs[formName].resetFields();
          this.$refs.versionRuleForm.resetFields();
          this.$router.push("/personCenter/?activeName=myapps");
        })
        .catch(() => {});
    },
    // 上传图标
    handleAvatarSuccess(res, file) {
      this.ruleForm.icon = res.data;
      // this.ruleForm.icon = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/png";
      const isLt500k = file.size / 1024 / 1024 < 0.5;
      if (!isJPG) {
        this.$message.error("上传头像图片只能是 PNG 格式!");
      }
      if (!isLt500k) {
        this.$message.error("上传头像图片大小不能超过 500KB!");
      }
      return isJPG && isLt500k;
    },
    //上传文件
    handleFileSuccess(res, file) {
      this.ruleForm.file = res.data;
      // this.ruleForm.file = URL.createObjectURL(file.raw);
    },
    // 删除文件
    handleRemoveFile() {
      this.ruleForm.file = "";
    },
    // 应用介绍
    handleRemove(file) {
      let _this = this;
      this.appIntrofileList.forEach((element, index) => {
        if (element.uid == file.uid) {
          _this.appIntrofileList.splice(index, 1);
        }
      });
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    beforeItrUpload(file) {
      const isJPG = file.type === "image/png" || file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error("上传头像图片只能是 PNG、JPEG、JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2M!");
      }
      return isJPG && isLt2M;
    },
    // handleItrChange(file) {
    //   if (file.status == "ready") {
    //     this.appIntrofileList.push(file);
    //   }
    // }
    handleItrChange(file) {
      if (file) {
        if (file.status == "success") {
          this.appIntrofileList.push(file);
        }
      }
    }
    // handleItrSuccess(res, file) {
    //   this.appIntrofileList.push(res.data);
    // }
  }
};
</script>

<style lang="scss" scoped>
.core-w {
  width: 1100px;
  margin: 0 auto;
  padding: 36px 0;
  display: flex;
  .doc-no-m {
    margin: 0 6px 0 0px;

    display: inline-block;
    width: 6px;
    height: 6px;
    background-color: #f5cf49;
    border-radius: 50%;
  }
}
.app-frame {
  padding: 34px 40px;
  border-radius: 4px;
  border: 1px solid rgba(241, 241, 241, 1);
  margin-bottom: 16px;
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
  .upload-demo {
    flex-direction: row-reverse;
    width: fit-content;
  }
  .size-mb {
    color: #999;
    font-size: 12px;
  }
}
.demo-ruleForm {
  width: 720px;
  margin: 0 auto;
  /deep/ .el-input__inner {
    height: 32px;
  }
  .avator-fix {
    position: absolute;
    left: 160px;
    top: 0;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(153, 153, 153, 1);
    line-height: 20px;
  }
  .corss {
    /deep/ .el-upload--picture-card {
      width: 120px;
      height: 60px;
      line-height: 70px;
    }
    /deep/ .el-upload-list--picture-card .el-upload-list__item {
      width: 120px;
      height: 60px;
      line-height: 70px;
    }
    /deep/ .el-upload-list--picture-card .el-upload-list__item-thumbnail {
      height: 72px;
    }
  }
  .vertical {
    /deep/ .el-upload--picture-card {
      width: 76px;
      height: 108px;
      line-height: 118px;
    }
    /deep/ .el-upload-list--picture-card .el-upload-list__item {
      width: 76px;
      height: 108px;
      line-height: 118px;
    }
    /deep/ .el-upload-list--picture-card .el-upload-list__item-thumbnail {
      height: 120px;
    }
  }
}
.imgs-desc {
  margin-top: 14px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.65);
  line-height: 24px;
}
.icon-question {
  width: 16px;
  height: 16px;
}
.btn-area {
  display: flex;
  justify-content: space-around;
  padding: 10px 342px 0;
  button {
    width: 108px;
  }
}

.hide /deep/.el-upload--picture-card {
  display: none;
}
</style>