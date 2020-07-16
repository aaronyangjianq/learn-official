<template>
  <div class="core-w">
    <p class="title" @click="goToList">我的应用<span>-创建应用</span></p>
    <section class="app-frame app-info">
      <h4>应用信息</h4>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="180px" class="demo-ruleForm">
        <el-form-item label="支持设备:" prop="os">
          <el-select v-model="ruleForm.os" placeholder="请选择支持设备">
            <el-option label="眼镜版" :value="0"></el-option>
            <el-option label="手机版" :value="1"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="应用名称:" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <!-- @change="handleTypeChange" -->
        <el-form-item label="应用类型:" prop="cid">
          <el-cascader :show-all-levels="false" v-model="ruleForm.cid" placeholder="请选择应用类型" :options="appTypeArrs"></el-cascader>
        </el-form-item>
        <el-form-item label="应用介绍:" prop="desc">
          <el-input type="textarea" :autosize="{ minRows: 3, maxRows: 6}" v-model="ruleForm.desc"></el-input>
        </el-form-item>

        <el-form-item label="图标:" prop="icon">
          <el-upload class="avatar-uploader my-avatar" :action="action" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
            <div v-if="ruleForm.icon">
              <img :src="ruleForm.icon.url" class="avatar">
              <span class="el-upload-list__item-actions">
                <span class="el-upload-list__item-preview" @click.stop="avatarVisible = true">
                  <i class="el-icon-zoom-in"></i>
                </span>
                <span @click.stop="ruleForm.icon = ''">
                  <i class="el-icon-delete"></i>
                </span>
              </span>
            </div>
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>

          </el-upload>
          <el-dialog :visible.sync="avatarVisible">
            <img width="100%" :src="ruleForm.icon.url">
          </el-dialog>
          <p class="avator-fix">大小：500以内 &emsp;&emsp;&emsp;格式：PNG</p>
        </el-form-item>
        <el-form-item label="应用介绍截图:" prop="direction">
          <el-radio-group v-model="ruleForm.direction">
            <el-radio :label="0">横向截图</el-radio>
            <el-radio :label="1">竖向截图</el-radio>
          </el-radio-group>
          <!-- :class="ruleForm.direction==1?'vertical':'corss'"  -->
          <el-upload :action="action" :limit="5" :file-list.sync="appIntrofileList" :on-change="handleItrChange" :before-upload="beforeItrUpload" :class="{'hide':appIntrofileList.length>4,'vertical':ruleForm.direction==1,'corss':ruleForm.direction==0}" list-type="picture-card" :auto-upload="true">
            <i slot="default" class="el-icon-plus"></i>
            <div slot="file" slot-scope="{file}">
              <img class="el-upload-list__item-thumbnail" :src="file.url" alt="">
              <span class="el-upload-list__item-actions">
                <span class="el-upload-list__item-preview">
                  <i class="el-icon-zoom-in" @click="handlePictureCardPreview(file)"></i>
                </span>
                <span v-if="!disabled" class="el-upload-list__item-delete">
                  <i class="el-icon-delete" @click="handleRemove(file)"></i>
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
          <el-radio-group v-model="ruleForm.is_toll">
            <el-radio :label="0">免费</el-radio>
            <el-radio :label="1">收费</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item v-if="ruleForm.is_toll==1" label="收费说明:" prop="toll_desc">
          <el-input type="textarea" v-model="ruleForm.toll_desc"></el-input>
        </el-form-item>
        <el-form-item label="有无内置广告:" prop="ad">
          <el-radio-group v-model="ruleForm.ad">
            <el-radio :label="1">有</el-radio>
            <el-radio :label="0">无</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="年龄分级标准:" prop="age">
          <el-radio-group v-model="ruleForm.age">
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
          <el-radio-group v-model="ruleForm.need_login">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item v-if="ruleForm.need_login==1" label="测试账号:" prop="test_account">
          <el-input v-model="ruleForm.test_account"></el-input>
        </el-form-item>
        <el-form-item v-if="ruleForm.need_login==1" label="测试密码:" prop="test_pass">
          <el-input v-model="ruleForm.test_pass"></el-input>
        </el-form-item>
      </el-form>
    </section>
    <section class="app-frame app-version">
      <h4>版本信息</h4>
      <el-form :model="ruleForm" :rules="rules" ref="versionRuleForm" label-width="180px" class="demo-ruleForm">
        <el-form-item label="软件安装包:" prop="file">
          <el-upload :limit="1" class="upload-demo" style="display:flex;" :on-success="handleFileSuccess" :on-remove="()=>ruleForm.file=''" :action="appaction">
            <el-button v-if="ruleForm.file==''" style="margin-right:10px;" size="small">点击上传</el-button>
            <span class="size-mb" v-if="ruleForm.file">{{(ruleForm.file.size/1024/1024).toFixed(2)}} MB</span>
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
    <div class="btn-area">
      <el-button @click="resetForm('ruleForm')">取消</el-button>
      <el-button type="primary" @click="submitForm('ruleForm')">提交审核</el-button>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import qs from "qs";

export default {
  layout: "other",
  data() {
    return {
      ruleForm: {
        os: "",
        name: "",
        desc: "",
        cid: [],
        icon: "",
        direction: 0,
        images: [],
        is_toll: 0,
        toll_desc: "",
        ad: 0,
        age: 0,
        need_login: 0,
        test_account: "",
        test_pass: "",
        file: "",
        version: "",
        update_content: ""
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
      isUpload: true,
      avatarVisible: false
    };
  },
  async asyncData({ params, store }) {
    let appTypeArrs = [];
    await axios
      .get(`${store.state.baseUrl}/home/index/getCate`, {
        params: {
          type: 4
        }
      })
      .then(res => {
        res.data.data.forEach(item => {
          item.value = item.id;
          item.label = item.name;
          if (item.children.length > 0) {
            item.children.forEach(vv => {
              vv.value = vv.id;
              vv.label = vv.name;
              if (vv.children.length > 0) {
                vv.children.forEach(vvv => {
                  vvv.value = vvv.id;
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
        appTypeArrs = res.data.data;
      })
      .catch(err => {});

    return {
      appTypeArrs,
      baseUrl: store.state.baseUrl,
      action: `${store.state.baseUrl}/home/aptitude/upload`,
      appaction: `${store.state.baseUrl}/home/app/upload`
    };
  },
  methods: {
    goToList() {
      this.$router.replace("/personCenter?activeName=myapps");
    },
    submitForm(formName) {
      let flag = true;
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
      if (!flag) {
        this.$message({
          message: "请完善应用详情相关内容",
          type: "warning"
        });
      } else {
        // 提交审核
        this.createApp();
      }
    },
    // 提交审核
    async createApp() {
      let obj = JSON.parse(JSON.stringify(this.ruleForm));

      obj.images = this.appIntrofileList;
      obj.images = obj.images.map(img => {
        return img.response.data;
      });
      obj.cid = this.ruleForm.cid[this.ruleForm.cid.length - 1];
      await axios
        .post(`${this.baseUrl}/home/app/createApp`, qs.stringify(obj))
        .then(res => {
          if (res.data.code == 100) {
            this.$message({
              message: "创建成功",
              type: "success"
            });
            this.$router.push("/personCenter/?activeName=myapps");
          } else {
            this.$message({
              message: res.message,
              type: "warning"
            });
          }
        })
        .catch(err => {
          this.$message({
            message: err.message,
            type: "warning"
          });
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

    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },

    beforeItrUpload(file) {
      const isJPG = file.type === "image/png" || file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        // this.isUpload = false;
        this.$message.error("上传头像图片只能是 PNG、JPEG、JPG 格式!");
      }
      if (!isLt2M) {
        // this.isUpload = false;
        this.$message.error("上传头像图片大小不能超过 2M!");
      }
      return isJPG && isLt2M;
    },
    // handleItrSuccess(res, file) {
    //   if (res.code == 100) {
    //     this.appIntrofileList.push(res.data);
    //   }
    //   // this.ruleForm.icon = URL.createObjectURL(file.raw);
    // },
    handleItrChange(file) {
      if (file) {
        if (file.status === "success") {
          this.appIntrofileList.push(file);
        }
      }
    },
    // 图片删除
    handleRemove(file) {
      let _this = this;
      this.appIntrofileList.forEach((element, index) => {
        if (element.uid === file.uid) {
          _this.appIntrofileList.splice(index, 1);
        }
      });
    }

    // 类型改变
    // handleTypeChange(value) {
    //   console.log(value);
    //   console.log(this.ruleForm.cid, 222);
    // }
  }
};
</script>

<style lang="scss" scoped>
.core-w {
  width: 1100px;
  margin: 0 auto;
  padding: 36px 0;
}
.core-w {
  .title {
    cursor: pointer;
    font-size: 15px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(102, 102, 102, 1);
    line-height: 20px;
    margin-bottom: 8px;
    span {
      color: #000000;
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
  // .app-info {
  // }
  .upload-demo {
    flex-direction: row-reverse;
    width: fit-content;
  }
  .size-mb {
    color: #999;
    font-size: 12px;
  }
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

.my-avatar {
  .el-upload-list__item-actions {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    cursor: default;
    text-align: center;
    color: #fff;
    opacity: 0;
    font-size: 20px;
    background-color: rgba(0, 0, 0, 0.5);
    transition: opacity 0.3s;
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 0 19px;

    &:hover {
      opacity: 1;
    }
    span {
      cursor: pointer;
    }
    // .el-upload-list__item-delete{
    //   display: inline-block;
    // }
  }
}
</style>