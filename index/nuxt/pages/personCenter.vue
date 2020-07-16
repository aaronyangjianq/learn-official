<template>
  <div  style="" >
    <el-tabs  v-model="activeName" class="wrapper cent homePage">
      <el-tab-pane label="账号设置" name="account">
        <div class="jianju">
          <div class="top1 cent">
            <p class="a6 pa-l">账号类型：</p>
          </div>
          <div class="body1 bd11 cent mb a7 pa-l">{{ !!getUserInfoNature ? "公司账号" : "个人账号"}}</div>
          <div class="top1 cent">
            <div class="pr t2">
              <p class="pa a8 pw4">手机号码：</p>
            </div>
            <div class="bdr1"></div>
            <div class="pr t2">
              <p class="pa a8 pw4">电子邮箱：</p>
            </div>
          </div>
          <div class="body1 bd11 cent mb pr">
            <div class="pa n1 ns">
              <p class="a2-2">{{getUserInfoPhone}}</p>
            </div>
            <div class="pa n1 ns1">
              <p class="a2-2">{{getUserInfoEmail}}</p>
              <a
                href="javascript:void(0)"
                class="mgr11"
                @click="emailEdit"
                v-if="!getUserInfoEmail"
              >
                <img alt="Image placeholder" :src="icon_link" />
              </a>
            </div>
          </div>
          <div class="top1 cent">
            <p class="a6 pa-l">密码：</p>
          </div>
          <div class="body1 bd11 cent mb a7 pa-l">
            <a href="javascript:void(0)" class="link" @click="editCode">修改密码</a>
          </div>
          <div class="b-s cent ms pr">
            <div class="pa btf1">
              <p class="ba1">订阅服务</p>
            </div>
            <div class="pa btf2">
              <el-switch v-model="subscribe" active-color="#13ce66" inactive-color="#ff4949" @click="handleSwitch"></el-switch>
            </div>
            <div class="pa btf3">
              <p class="ba2">{{subscribe ? '已开启' : '已关闭'}}</p>
            </div>
            <div class="pa btf4 ba3">追踪全站SDK的更新、添加、修改，针对账号所绑定邮箱下发邮件通知</div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="资质申请" name="aptitute">
        <div class="jianju">
          <!-- 个人 -->
          <div
            :class="[ isShowPerson && hadAptitude === 0 ? '' : 'disimportant']"
          >
            <div class="body2 cent mb2 pr">
              <div class="fo1 pa fs1">
                <p class="ff1">是否转换为公司账号：</p>
                <div>
                  <el-select
                    v-model="chooseAccount"
                    placeholder="请选择"
                    @change="chooseAccountPropety(chooseAccount)"
                  >
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </div>
              </div>
              <div>
                <div class="fo1 pa fs2">
                  <p class="ff1">姓名：</p>
                  <input type="text" class="ff1input" placeholder="请输入姓名" v-model="person.name" />
                </div>
                <div class="fo1 pa fs3">
                  <p class="ff1">手机号：</p>
                  <input type="text" class="ff1input" placeholder="请输入手机号" v-model="person.phone" />
                </div>
                <div class="fo1 pa fs4">
                  <p class="ff1">身份证号：</p>
                  <input type="text" class="ff1input" placeholder="请输入身份证号" v-model="person.id_card" />
                </div>
                <div class="fo1 pa fs5">
                  <p class="ff1">邮箱号：</p>
                  <input type="text" class="ff1input" placeholder="请输入邮箱号" v-model="person.email" />
                </div>
                <div class="pa fs6">
                  <a href="javascript:void(0)" class="btn4" @click="applyPerson">提交</a>
                </div>
              </div>
            </div>
          </div>
          <!-- 公司 -->
          <div
            :class="[ isShowCompany && hadAptitude === 0 ? '' : 'disimportant']"
          >
            <div class="bodyc mb3 cent pr">
              <div class="fo1 pa z1">
                <div>
                  <p class="ttt1">是否转换为公司账号：</p>
                </div>
                <div>
                  <el-select
                    v-model="chooseCompany"
                    placeholder="请选择"
                    @change="chooseCompanyOrPerson(chooseCompany)"
                  >
                    <el-option
                      v-for="item in options1"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </div>
              </div>
              <div class="pa z2">
                <div class="fo1 mb5">
                  <p class="ttt1">公司名称：</p>
                  <input type="text" class="ttt1-input" placeholder="请输入公司名称" v-model="company.company_name" />
                </div>
                <div class="fo1 mb5">
                  <p class="ttt1">公司现址：</p>
                  <input
                    type="text"
                    placeholder="请输入公司现址"
                    class="ip1"
                    v-model="company.company_ads"
                  />
                </div>
                <div class="fo1 mb5">
                  <p class="ttt1">公司电话：</p>
                  <input type="text" class="ttt1-input" placeholder="请输入公司电话" v-model="company.company_phone" />
                </div>
              </div>
              <div class="pa z3">
                <div>
                  <p class="ttt1">营业执照：</p>
                  <p class="ttt1">(最多3张)</p>
                </div>
              </div>
              <div class="pa z4 fo1">
                <div class="mrr">
                  <el-upload
                    ref="uploadOne"
                    :class="{hideOne:hideUploadOne}"
                    :action="action"
                    list-type="picture-card"
                    :file-list.sync="appIntrofileListOne"
                    :on-change="handleChangePictureOne"
                    :on-preview="handlePictureCardOnePreview"
                    :on-success="handlePictureOneSuccess"
                    :on-remove="handleRemoveOne"
                    :limit="1"
                  >
                    <i class="el-icon-plus"></i>
                  </el-upload>
                </div>
                <div class="mrr">
                  <el-upload
                    ref="uploadTwo"
                    :class="{hideTwo:hideUploadTwo}"
                    :action="action"
                    list-type="picture-card"
                    :file-list.sync="appIntrofileListTwo"
                    :on-change="handleChangePictureTwo"
                    :on-preview="handlePictureCardTwoPreview"
                    :on-success="handlePictureTwoSuccess"
                    :on-remove="handleRemoveTwo"
                    :limit="1"
                  >
                    <i class="el-icon-plus"></i>
                  </el-upload>
                </div>
                <div>
                  <el-upload
                    ref="uploadThree"
                    :class="{hideThree:hideUploadThree}"
                    :action="action"
                    list-type="picture-card"
                    :file-list.sync="appIntrofileListThree"
                    :on-change="handleChangePictureThree"
                    :on-preview="handlePictureCardThreePreview"
                    :on-success="handlePictureThreeSuccess"
                    :on-remove="handleRemoveThree"
                    :limit="1"
                  >
                    <i class="el-icon-plus"></i>
                  </el-upload>
                </div>
              </div>
              <div class="pa z5">
                <div class="fo1 mb5">
                  <p class="ttt1">开户行：</p>
                  <input type="text" class="ttt1-input" placeholder="请输入开户行" v-model="company.bank" />
                </div>
              </div>
              <div class="pa z6">
                <div class="fo1 mb5">
                  <p class="ttt1">银行卡号：</p>
                  <input type="text" class="ttt1-input" placeholder="请输入银行卡号" v-model="company.card_num" />
                </div>
              </div>
              <div class="pa z7">
                <div class="fo1 mb5">
                  <p class="ttt1">联系人：</p>
                  <input type="text" class="ttt1-input" placeholder="请输入联系人" v-model="company.name" />
                </div>
              </div>
              <div class="pa z8">
                <div class="fo1 mb5">
                  <p class="ttt1">联系电话：</p>
                  <input type="text" class="ttt1-input" placeholder="请输入联系电话" v-model="company.phone" />
                </div>
              </div>
              <div class="pa z9">
                <a href="javascript:void(0)" class="btn4" @click="applyCompany">提交申请</a>
              </div>
            </div>
          </div>
          <!-- 等待审核 -->
          <div
            :class="[isCheck || hadAptitude === 1 ? '' : 'disimportant']"
          >
            <div class="bodyp pr">
              <div class="pa is1">
                <img :src="icon_pass" alt="Image placeholder" />
              </div>
              <div class="pa is2">
                <p class="ps0">您的资质申请已提交，请耐心等待工作人员审核</p>
              </div>
            </div>
          </div>
          <!-- 审核未通过 -->
          <div
            :class="[hadAptitude === 3 ? '' : 'disimportant']"
          >
            <div class="bodyp pr">
              <div class="pa is1">
                <img :src="icon_pass_no" alt="Image placeholder" />
              </div>
              <div class="pa is2">
                <p class="ps0">您的资质申请审核未通过，请前往重新填写审核</p>
              </div>
              <div class="pa is3">
                <a class="btn5" @click.stop="reWrite">重新填写</a>
              </div>
            </div>
          </div>
          <!-- 审核通过后 -->
          <div
            :class="[hadAptitude === 2 ? '' : 'disimportant']"
          >
            <div class="body2 cent mb2 pr">
              <div class="pa is4">
                <img :src="icon_pass_2" alt="Image placeholder" />
              </div>
              <div class="pa is5">
                <p class="is4-1">您的资质申请审核已通过，可前往下载SDK</p>
              </div>
              <div class="pa is6">
                <div class="fo1 bt">
                  <p class="ttt">公司名称：</p>
                  <p class="bl ttt1">{{aptitudeDetail.company_name}}</p>
                </div>
                <div class="fo1 bt">
                  <p class="ttt">公司现址：</p>
                  <p class="bl ttt1">{{aptitudeDetail.company_ads}}</p>
                </div>
                <div class="fo1 bt">
                  <p class="ttt">公司电话：</p>
                  <p class="bl ttt1">{{aptitudeDetail.company_phone}}</p>
                </div>
                <div class="fo1 bt">
                  <p class="ttt">开户行：</p>
                  <p class="bl ttt1">{{aptitudeDetail.bank}}</p>
                </div>
                <div class="fo1 bt">
                  <p class="ttt">银行卡号：</p>
                  <p class="bl ttt1">{{aptitudeDetail.card_num}}</p>
                </div>
                <div class="fo1 bt">
                  <p class="ttt">联系人：</p>
                  <p class="bl ttt1">{{aptitudeDetail.name}}</p>
                </div>
                <div class="fo1">
                  <p class="ttt">联系电话：</p>
                  <p class="bl ttt1">{{aptitudeDetail.phone}}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="购买记录" name="buyhistory">
        <div class="jianju">
          <div v-if="orderHistoryList.length > 0">
            <div class="top cent mb">
              <div class="box1 a">SDK信息</div>
              <div class="box2 a">价格</div>
              <div class="box3 a">订单状态</div>
              <div class="box4 a">操作</div>
            </div>
            <div v-for="o in orderHistoryList" :key="o.id">
              <div class="top cent">
                <div class="a plr">订单编号：{{o.oid}}</div>
                <div class="a">下单时间：{{o.add_time}}</div>
              </div>
              <div class="body cent mb">
                <div class="box1 bd pr">
                  <p
                    class="pa pw a1"
                  >{{o.sdk_data && o.sdk_data.title}}{{o.sdk_data && o.sdk_data.version}}</p>
                  <p class="pa pw-1 a1">{{o.sdk_data && o.sdk_data.size}}</p>
                </div>
                <div class="box2 bd a2">¥{{o.price}}</div>
                <div class="box3 bd a3">{{checkOrderStatus(o.status)}}</div>
                <div class="box4 bd pr">
                  <a
                    href="javascript:void(0);"
                    class="btn pa aw"
                    @click="order(o)"
                  >{{checkOrderStatusBtn(o.status)}}</a>
                </div>
              </div>
            </div>
          </div>
          <div class="imgcenter" v-else>
            <img :src="img_blank" />
            <p>暂无任何数据</p>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="SDK使用申请记录" name="sdkUseHistory">
        <div class="jianju">
          <div v-if="aptitudeHistoryList.length > 0">
            <div class="top cent mb">
              <div class="bo1 a">应用信息</div>
              <div class="bo2 a">联系人</div>
              <div class="bo3 a">联系方式</div>
              <div class="bo4 a">审核情况</div>
              <div class="bo5 a">APP_ID</div>
              <div class="bo6 a">APP_SECRET</div>
            </div>
            <div v-for="apt in aptitudeHistoryList" :key="apt.id">
              <div class="top cent">
                <div class="a plr">申请时间：{{apt.add_time}}</div>
              </div>
              <div class="body cent mb">
                <div class="bo1 bd pr">
                  <p class="a1 pa pw1">{{apt.type_name}}</p>
                  <p class="a1 pa pw2">{{apt.scale_name}}</p>
                  <p class="a1 pa pw3">{{apt.sdk_data.title}}{{apt.sdk_data.version}}</p>
                </div>
                <div class="bo2 bd a2">{{apt.name}}</div>
                <div class="bo3 bd a2">{{apt.phone}}</div>
                <div class="bo4 bd a2">{{checkaptitudeStatus(apt.status)}}</div>
                <div class="bo5 bd a4">{{apt.app_id}}</div>
                <div class="bo6 bd a4">{{apt.app_secret}}</div>
              </div>
            </div>
          </div>
          <div class="imgcenter" v-else>
            <img :src="img_blank" />
            <p>暂无任何数据</p>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="我的应用" name="myapps">
        <Myapps />
      </el-tab-pane>
    </el-tabs>

    <!-- 绑定邮箱/弹窗 -->
    <el-dialog :visible.sync="first" :before-close="handleClose" class="email">
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
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="bindPhoneOrEmail">确定</el-button>
      </span>
    </el-dialog>

    <!-- 找回密码/弹窗 -->
    <el-dialog :visible.sync="iseditCode" width="460px" :before-close="handleClose" class="login">
      <div>
        <div class="input-border">
          <p class="input-title input-t1">旧密码</p>
          <el-input type="text" placeholder="请输入旧密码" v-model="codeData.old_password"></el-input>
        </div>
        <div class="input-border input-border-16">
          <p class="input-title input-t1">新密码</p>
          <el-input type="text" placeholder="请输入新密码" v-model="codeData.password"></el-input>
        </div>
        <div class="input-border input-border-16">
          <p class="input-title input-t1">再次输入</p>
          <el-input type="text" placeholder="请再次输入新密码" v-model="codeData.confirm_password"></el-input>
        </div>
        <!-- <p class="wrong">密码不符合规则，请重试</p> -->
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="resetCode">重置密码</el-button>
      </span>
    </el-dialog>

    <!-- 图片预览/弹窗 -->
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" />
    </el-dialog>
  </div>
</template>    
<script>
import { get, post } from "@/store/request";
import Myapps from "../components/Myapps";
import icon_link from "@/static/images/icon_link.png";
import icon_pass from "@/static/images/icon_pass.png";
import icon_pass_no from "@/static/images/icon_pass_no.png";
import icon_pass_2 from "@/static/images/icon_pass_2.png";
import img_blank from "@/static/images/img_blank.png";
export default {
  layout: "other",
  components: {
    Myapps
  },
  data() {
    return {
      icon_link: icon_link,
      icon_pass: icon_pass,
      icon_pass_no: icon_pass_no,
      icon_pass_2: icon_pass_2,
      img_blank: img_blank,
      activeName: this.$route.query.activeName,
      subscribe: true,
      options: [
        {
          value: "是",
          label: "是"
        },
        {
          value: "否",
          label: "否"
        }
      ],
      options1: [
        {
          value: "是",
          label: "是"
        },
        {
          value: "否",
          label: "否"
        }
      ],
      isShow: true,
      isShowPerson: true,
      isShowCompany: false,
      chooseAccount: "否",
      chooseCompany: "是",
      dialogImageUrl: "",
      dialogVisible: false,
      orderStauts: "",
      aptitudeStatus: "",
      person: {
        name: "",
        phone: null,
        email: "",
        id_card: null
      },
      company: {
        company_name: "",
        company_ads: "",
        company_phone: null,
        bank: "",
        card_num: null,
        name: "",
        phone: null
      },
      action: '',
      images: [],
      imageOne: {},
      imageTwo: {},
      imageThree: {},
      isCheck: false,
      aptitudeStatus: null,
      first: false,
      second: false,
      phoneData: {
        phone: null,
        code: null
      },
      emailData: {
        email: "",
        code: null
      },
      choosePhoneorEmail: false,
      ischoosePhone: true,
      iseditCode: false,
      codeData: {
        old_password: null,
        password: null,
        confirm_password: null
      },
      isphoneButton: true,
      isEmailButton: true,
      content: "发送验证码", // 按钮里显示的内容
      totalTime: 60, //记录具体倒计时时间,
      getUserInfoNature: null,
      getUserInfoPhone: null,
      getUserInfoEmail: null,
      phonefirst: false,
      phoneSecond: false,
      isBindPhoneEmailButton: true,
      isBindPhonePhoneButton: true,
      personCenterInfo: {
        aptitude: null,
        email: "",
        id: null,
        name: "",
        nature: null,
        phone: null,
        subscription: "",
        had_aptitude: null
      },
      ruleWrong: false,
      wrongMessage: "",
      hideUploadOne: false,
      hideUploadTwo: false,
      hideUploadThree: false,
      limitCount: 1,
      aptitudeDetail: {},
      orderHistoryList: [],
      aptitudeHistoryList: [],
      hadAptitude: 0,
      appIntrofileListOne: [],
      appIntrofileListTwo: [],
      appIntrofileListThree: []
    };
  },
  // async asyncData(params) {
  //   // 资质详情
  //   let aptitudeDetail = {};
  //   const rawData = await get('/home/aptitude/detail');
  //   if (rawData.code === 100) {
  //     aptitudeDetail = rawData.data;
  //   } else if (rawData.code === 405 && process.client) {
  //     localStorage.removeItem('userInfo');
  //   }
  //   // 购买记录
  //   let orderHistoryList = [];
  //   const rawDataTwo = await get('/home/order/history', {
  //     page: 1,
  //     limit: 10
  //   });
  //   if (rawDataTwo.code === 100) {
  //     orderHistoryList = rawDataTwo.data && rawDataTwo.data.list;
  //   } else if (rawDataTwo.code === 405 && process.client) {
  //     localStorage.removeItem('userInfo');
  //   }
  //   // SDK使用记录
  //   let aptitudeHistoryList = [];
  //   const rawDataThree = await get('/home/aptitude/history', {
  //     page: 1,
  //     limit: 10
  //   });
  //   if (rawDataThree.code === 100) {
  //     aptitudeHistoryList = rawDataThree.data && rawDataThree.data.list;
  //   } else if (rawDataThree.code === 405 && process.client) {
  //     localStorage.removeItem('userInfo');
  //   }
  //   return {
  //     aptitudeDetail,
  //     orderHistoryList,
  //     aptitudeHistoryList,
  //   };
  // },
  watch: {
    $route: function(nval, oval) {
      this.activeName = nval.query.activeName;
    },
    "$store.state.userInfo": function(Nval, Oval) {
      if (Nval.id) {
        this.$store.state.userInfo = Nval;
        this.$store.state.userInfo &&
          localStorage.setItem(
            "userInfo",
            JSON.stringify(this.$store.state.userInfo)
          );
      }
    }
  },
  async created() {
    // 检测用户登录信息
    const rawData = await get("/home/user/checkLogin");
    this.action = `${this.$store.state.baseUrl}/home/aptitude/upload`;
    if (rawData.code === 100) {
      // 获取用户信息
      this.personCenterInfo = rawData.data;
      this.hadAptitude = rawData.data && rawData.data.had_aptitude;
    } else if (rawData.code === 405 && process.client) {
      localStorage.removeItem("userInfo");
    }
    const detailData = await get("/home/aptitude/detail");
    if (detailData.code === 100) {
      this.aptitudeDetail = detailData.data;
    } else if (detailData.code === 405 && process.client) {
      localStorage.removeItem("userInfo");
    }
    const orderList = await get("/home/order/history", {
      page: 1,
      limit: 10
    });
    if (orderList.code === 100) {
      this.orderHistoryList = orderList.data && orderList.data.list;
    } else if (orderList.code === 405 && process.client) {
      localStorage.removeItem("userInfo");
    }
    const atitudeList = await get("/home/aptitude/history", {
      page: 1,
      limit: 10
    });
    if (atitudeList.code === 100) {
      this.aptitudeHistoryList = atitudeList.data && atitudeList.data.list;
    } else if (atitudeList.code === 405 && process.client) {
      localStorage.removeItem("userInfo");
    }
  },
  mounted() {
    // 当前用户账号类型、手机号码、邮箱
    this.getUserInfoNature =
      JSON.parse(localStorage.getItem("userInfo")) &&
      JSON.parse(localStorage.getItem("userInfo")).nature;
    this.getUserInfoPhone =
      JSON.parse(localStorage.getItem("userInfo")) &&
      JSON.parse(localStorage.getItem("userInfo")).phone;
    this.getUserInfoEmail =
      JSON.parse(localStorage.getItem("userInfo")) &&
      JSON.parse(localStorage.getItem("userInfo")).email;
  },
  methods: {
    handleRemoveOne(file, fileList) {
      this.hideUploadOne = fileList.length >= this.limitCount;
    },
    handleRemoveTwo(file, fileList) {
      this.hideUploadTwo = fileList.length >= this.limitCount;
    },
    handleRemoveThree(file, fileList) {
      this.hideUploadThree = fileList.length >= this.limitCount;
    },
    handleChangePictureOne(file, fileList) {
      this.hideUploadOne = fileList.length >= this.limitCount;
    },
    handleChangePictureTwo(file, fileList) {
      this.hideUploadTwo = fileList.length >= this.limitCount;
    },
    handleChangePictureThree(file, fileList) {
      this.hideUploadThree = fileList.length >= this.limitCount;
    },
    handlePictureCardOnePreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handlePictureCardTwoPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handlePictureCardThreePreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    checkOrderStatus(status) {
      if (status === 0) {
        return "待付款";
      } else if (status === 1) {
        return "已付款";
      } else if (status === 2) {
        return "已取消";
      } else if (status === 3) {
        return "已退款";
      }
    },
    checkOrderStatusBtn(status) {
      if (status === 0) {
        return "去支付";
      } else if (status === 1) {
        return "下载发票";
      } else if (status === 2) {
        return "订单已关闭";
      } else if (status === 3) {
        return "订单已退款";
      }
    },
    async order(data) {
      if (data.status === 0) {
        if (data.pay_type === 0) {
          this.$router.push(`/personCenterBuy/?orderId=${data.id}`);
        } else {
          const rawData = get("/home/payment/pay", {
            id: data.id,
            pay_type: data.pay_type
          });

          if (rawData.code === 405) {
            localStorage.removeItem("userInfo");
          }
        }
      } else if (data.status === 2 && data.invoice) {
        window.open(data.invoice.url);
      }
    },
    checkaptitudeStatus(status) {
      if (status === 0) {
        return "待审核";
      } else if (status === 1) {
        return "通过";
      } else if (status === 2) {
        return "未通过";
      }
    },
    chooseAccountPropety(item) {
      if (item === "是") {
        this.isShowPerson = false;
        this.isShowCompany = true;
        this.chooseAccount = "否";
      }
    },
    chooseCompanyOrPerson(value) {
      if (value === "否") {
        this.isShowPerson = true;
        this.isShowCompany = false;
        this.chooseCompany = "是";
      }
    },
    async applyCompany() {
      if (this.company.company_name === "") {
       return this.$message("请填写公司名称");
      } else if (this.company.company_ads === "") {
       return this.$message("请填写公司地址");
      } else if (this.company.company_phone === null) {
       return this.$message("请填写公司电话");
      } else if (this.company.bank === "") {
       return  this.$message("请填写开户银行");
      } else if (this.company.card_num === null) {
       return  this.$message("请填写银行卡号");
      } else if (this.company.name === "") {
       return  this.$message("请填写联系人姓名");
      } else if (this.company.phone === null) {
       return  this.$message("请填写联系电话");
      } else if (this.imageOne === {}) {
       return  this.$message("请上传营业执照");
      } else {
        this.imageOne && this.images.push(this.imageOne);
        this.imageTwo && this.images.push(this.imageTwo);
        this.imageThree && this.images.push(this.imageThree);

        await post("/home/aptitude/Apply", {
          nature: 1,
          company_name: this.company.company_name,
          company_ads: this.company.company_ads,
          company_phone: this.company.company_phone,
          bank: this.company.bank,
          card_num: this.company.card_num,
          name: this.company.name,
          phone: this.company.phone,
          images: this.images
        }).then(res => {
          if (res.code === 100) {
            this.company = {};
            this.isShowCompany = false;
            this.isCheck = true;
          } else if (res.code === 405) {
            localStorage.removeItem("userInfo");
          } else if (res.code === 400) {
            this.images = [];
            this.$message(res.msg);
          }
        });

      }
    },
    async applyPerson() {
      const rawData = await post("/home/aptitude/Apply", {
        nature: 0,
        name: this.person.name,
        phone: this.person.phone,
        email: this.person.email,
        id_card: this.person.id_card
      });
      if (rawData.code === 100) {
        this.nature = null;
        this.isShowPerson = false;
        this.isCheck = true;
        this.person = {};
        this.$message(rawData.msg);
      } else if (rawData.code === 405) {
        localStorage.removeItem("userInfo");
      } else if (rawData.code === 400) {
        this.$message(rawData.msg);
      }
    },
    handlePictureOneSuccess(res) {
      this.imageOne = res.data;
    },
    handlePictureTwoSuccess(res) {
      this.imageTwo = res.data;
    },
    handlePictureThreeSuccess(res) {
      this.imageThree = res.data;
    },
    emailEdit() {
      if (!this.getUserInfoEmail) {
        this.first = true;
      }
    },
    editCode() {
      this.iseditCode = true;
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
        const rawData = await post("/home/user/send", {
          username: this.emailData.email
        });
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
        const rawData = await post("/home/user/bindEmail", {
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
    handleClose() {
      this.first = false;
      this.second = false;
      this.phonefirst = false;
      this.phoneSecond = false;
      this.iseditCode = false;
      this.emailData = {};
      this.phoneData = {};
      this.codeData = {};
    },
    nextSetcode() {
      this.choosePhoneorEmail = false;
    },
    choosePhone() {
      this.ischoosePhone = true;
    },
    chooseEmail() {
      this.ischoosePhone = false;
    },
    async resetCode() {
      if (this.codeData.old_password === null) {
        this.$message("请填写旧密码");
      } else if (this.codeData.password === null) {
        this.$message("请填写新密码");
      } else if (this.codeData.password && this.codeData.password.toString().length < 6) {
        this.$message("新密码位数不能少于6位");
      } else if (this.codeData.confirm_password === null) {
        this.$message("请填写确认密码");
      } else if (this.codeData.password !== this.codeData.confirm_password) {
        this.$message("新密码与确认密码不一致");
      } else {
        const rawData = await post("/home/user/changePass", {
          old_password: this.codeData.old_password,
          password: this.codeData.password,
          confirm_password: this.codeData.confirm_password
        });
        if (rawData.code === 100) {
          this.codeData = {};
          this.iseditCode = false;
          this.$message(rawData.msg);
        } else if (rawData.code === 405) {
          localStorage.removeItem("userInfo");
        }
      }
    },
    getUserInfoData() {
      this.$store.dispatch("getUserInfo");
    },
    reWrite() {
      this.hadAptitude = 0;
    },
    handleSwitch() {
      this.subscribe = !this.subscribe;
    }
  }
};
</script>

<style lang="scss" scoped>
/* 间距 */
.jianju {
  min-height: calc(100vh - 179px);
}
/* 头部导航条 */
.wrapper {
  width: 1100px;
  min-height: calc(100vh - 179px);
}
.cent {
  margin-left: auto;
  margin-right: auto;
}
/* 账号设置 */
.top1 {
  width: 1100px;
  height: 64px;
  display: flex;
  background: rgba(250, 250, 250, 1);
  border-radius: 4px;
  border: 1px solid rgba(232, 232, 232, 1);
}
.body1 {
  width: 1100px;
  height: 110px;
  display: flex;
}
.bd11 {
  border: 1px solid rgba(241, 241, 241, 1);
}
.a6 {
  font-size: 16px;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
  line-height: 64px;
}
.pa-l {
  padding-left: 1rem;
}
.a7 {
  font-size: 16px;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  line-height: 110px;
}
.t2 {
  width: 550px;
}
.a8 {
  font-size: 16px;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
  line-height: 12px;
}
.pw4 {
  top: 26px;
  left: 16px;
}
.bdr1 {
  border-right: 1px solid #e0e0e0;
  height: 40px;
  margin-top: 12px;
}
.link {
  text-decoration: none;
  color: rgba(2, 182, 255, 1);
}
.b-s {
  width: 1100px;
  height: 107px;
  border: 1px solid #e0e0e0;
}
.ms {
  margin-top: 8px;
  margin-bottom: 128px;
}
.btf1 {
  top: 30px;
  left: 36px;
}
.btf2 {
  top: 30px;
  left: 124px;
}
.btf3 {
  top: 32px;
  left: 174px;
}
.btf4 {
  top: 65px;
  left: 34px;
}
.ba1 {
  font-size: 16px;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
  line-height: 18px;
}
.ba2 {
  font-size: 14px;
  font-weight: 400;
  color: rgba(2, 182, 255, 1);
  line-height: 18px;
}
.ba3 {
  font-size: 14px;
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
  line-height: 18px;
}
.n1 {
  font-size: 16px;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  line-height: 22px;
}
.ns {
  display: flex;
  top: 38px;
  left: 16px;
}
.ns1 {
  display: flex;
  top: 38px;
  left: 567px;
}
.a2-2 {
  font-size: 14px;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  line-height: 24px;
}
.mgr11 {
  margin-left: 20px;
}
/* 购买记录 */
.top {
  width: 1100px;
  height: 54px;
  display: flex;
  background: rgba(250, 250, 250, 1);
  border-radius: 4px;
  border: 1px solid rgba(232, 232, 232, 1);
}
.mb {
  margin-bottom: 1rem;
}
.box1 {
  width: 200px;
}
.box2 {
  width: 280px;
}
.box3 {
  width: 501px;
}
.box4 {
  width: 120px;
}
.a {
  font-size: 14px;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.85);
  line-height: 54px;
  text-align: center;
}
.plr {
  padding-left: 1rem;
  padding-right: 1rem;
}
.body {
  width: 1100px;
  height: 180px;
  display: flex;
}
.bd {
  border: 1px solid rgba(232, 232, 232, 1);
}
.pr {
  position: relative;
}
.pa {
  position: absolute;
}
.pw {
  width: 95px;
  text-align: center;
  top: 60px;
  left: 53px;
}
.pw-1 {
  width: 95px;
  text-align: center;
  top: 98px;
  left: 53px;
}
.a1 {
  font-size: 13px;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.65);
  line-height: 22px;
}
.a2 {
  font-size: 13px;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.65);
  line-height: 180px;
  text-align: center;
}
.a3 {
  font-size: 13px;
  font-weight: 500;
  color: rgba(204, 0, 0, 1);
  line-height: 180px;
  text-align: center;
}
.btn {
  position: relative;
  transition: all 0.2s ease;
  background: rgba(255, 255, 255, 1);
  border-radius: 4px;
  border: 1px solid rgba(217, 217, 217, 1);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.15);
  font-size: 13px;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.65);
  line-height: 26px;
  display: inline-block;
  text-align: center;
  vertical-align: middle;
  width: 72px;
  height: 28px;
  text-decoration: none;
}
.aw {
  left: 24px;
  top: 76px;
}
/* SDK使用申请记录 */
.bo1 {
  width: 180px;
}
.bo2 {
  width: 130px;
}
.bo3 {
  width: 187px;
}
.bo4 {
  width: 277px;
}
.bo5 {
  width: 137px;
}
.bo6 {
  width: 187px;
}
.pw1 {
  top: 45px;
  left: 42px;
  width: 95px;
  text-align: center;
}
.pw2 {
  top: 79px;
  left: 42px;
  width: 95px;
  text-align: center;
}
.pw3 {
  top: 113px;
  left: 42px;
  width: 95px;
  text-align: center;
}
.a4 {
  font-size: 14px;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  line-height: 180px;
  text-align: center;
}
.a5 {
  font-size: 14px;
  font-weight: 400;
  color: rgba(204, 0, 0, 1);
  line-height: 180px;
  text-align: center;
}
.imgcenter {
  width: 200px;
  margin: 230px auto 0;
}
.imgcenter > p {
  margin-top: 36px;
  text-align: center;
  font-size: 18px;
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
  line-height: 18px;
}
/* 资质申请-个人 */
.body2 {
  width: 1100px;
  height: 362px;
  background: rgba(255, 255, 255, 1);
  border-radius: 4px;
  border: 1px solid rgba(241, 241, 241, 1);
}
.fo1 {
  display: flex;
  align-items: center;
}
.mb2 {
  margin-bottom: 457px;
}
select {
  width: 240px;
  height: 32px;
  background: rgba(255, 255, 255, 1);
  border-radius: 2px;
  border: 1px solid rgba(0, 0, 0, 0.15);
  margin-left: 8px;
}
.fs1 {
  top: 30px;
  left: 36px;
}
input {
  width: 240px;
  height: 32px;
  background: rgba(255, 255, 255, 1);
  border-radius: 4px;
  border: 1px solid rgba(217, 217, 217, 1);
  margin-left: 8px;
  padding: 0 15px;
}
input:focus {
  border-color: #409eff;
  outline: 0;
}
.fs2 {
  top: 80px;
  left: 134px;
}
.fs3 {
  top: 130px;
  left: 120px;
}
.fs4 {
  top: 180px;
  left: 106px;
}
.fs5 {
  top: 230px;
  left: 120px;
}
.ff1 {
  font-size: 14px;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  line-height: 20px;
}
.ff1input {
  line-height: 20px;
}
input::-webkit-input-placeholder {
  font-size: 14px;
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
  line-height: 22px;
}
.btn4 {
  transition: all 0.2s ease;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.15);
  font-size: 14px;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  line-height: 40px;
  display: inline-block;
  text-align: center;
  width: 108px;
  height: 40px;
  background: rgba(2, 182, 255, 1);
  border-radius: 4px;
  text-decoration: none;
}
.fs6 {
  top: 298px;
  left: 218px;
}
/* 等待审核 */
.bodyp {
  width: 100%;
  height: 829px;
}
.ps0 {
  font-size: 18px;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
  line-height: 18px;
}
.is1 {
  top: 279px;
  left: 516px;
}
.is2 {
  top: 383px;
  left: 361px;
}
.btn5 {
  transition: all 0.2s ease;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.15);
  font-size: 14px;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.65);
  line-height: 44px;
  display: inline-block;
  text-align: center;
  width: 168px;
  height: 44px;
  background: rgba(255, 255, 255, 1);
  border-radius: 4px;
  border: 1px solid rgba(217, 217, 217, 1);
  text-decoration: none;
}
.is3 {
  top: 469px;
  left: 469px;
}
/* 审核通过 */
.is4 {
  top: 30px;
  left: 100px;
}
.is4-1 {
  font-size: 16px;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
  line-height: 18px;
}
.is5 {
  top: 33px;
  left: 134px;
}
.is6 {
  top: 78px;
  left: 100px;
}
.bt {
  margin-bottom: 14px;
}
.bl {
  margin-left: 1rem;
}
.ttt {
  font-size: 14px;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
  line-height: 12px;
}
.ttt1 {
  font-size: 14px;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  line-height: 20px;
}
.ttt1-input {
  line-height: 20px;
}
/* 公司 */
.bodyc {
  width: 1100px;
  height: 540px;
  background: rgba(255, 255, 255, 1);
  border-radius: 4px;
  border: 1px solid rgba(241, 241, 241, 1);
}
.mb3 {
  margin-bottom: 279px;
}
.z1 {
  top: 30px;
  left: 36px;
}
.z2 {
  top: 98px;
  left: 106px;
}
.ip1 {
  width: 240px;
  height: 82px;
  background: rgba(255, 255, 255, 1);
  border-radius: 4px;
  border: 1px solid rgba(217, 217, 217, 1);
  line-height: 20px;
}
.mb5 {
  margin-bottom: 18px;
}
.z3 {
  top: 314px;
  left: 116px;
}
.z4 {
  top: 314px;
  left: 204px;
}
.z5 {
  top: 98px;
  right: 178px;
}
.z6 {
  top: 148px;
  right: 178px;
}
.z7 {
  top: 198px;
  right: 178px;
}
.z8 {
  top: 248px;
  right: 178px;
}
.mrr {
  margin-right: 8px;
}
.z9 {
  top: 476px;
  left: 496px;
}
/* dispay */
.disimportant {
  display: none;
}
</style>
<style lang="scss" scoped>
.homePage /deep/ .el-tabs__item {
  padding: 0;
  height: 48px;
  width: 220px;
  font-size: 14px;
  font-weight: 400;
  line-height: 48px;
  text-align: center;
}
.tab /deep/ .el-input__inner {
  width: 240px;
  height: 32px;
  background: rgba(255, 255, 255, 1);
  border-radius: 4px;
  border: 1px solid rgba(217, 217, 217, 1);
  margin-left: 8px;
}
.tab /deep/ .el-upload--picture-card {
  width: 120px;
  height: 120px;
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
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  line-height: 21px;
  margin-left: 30px;
  margin-right: 30px;
}
.email /deep/ .el-dialog__footer {
  padding: 42px 20px 20px;
}
/* 注册 */
.login /deep/ .el-dialog {
  height: 342px;
}
.login /deep/ .el-dialog__header {
  padding: 0;
}
.login /deep/ .el-dialog__body {
  height: 274px;
}
.login /deep/ .el-input__inner {
  border: none;
  height: 21px;
  padding: 0px 0px 0px 16px;
  border-left: 1px solid rgba(240, 240, 240, 1);
  border-radius: 0;
}
.login /deep/ .el-button {
  width: 360px;
  height: 48px;
  background: rgba(2, 182, 255, 1);
  border-radius: 4px;
  font-size: 15px;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  line-height: 21px;
  margin-left: 30px;
  margin-right: 30px;
}
.login /deep/ .el-dialog__footer {
  padding: 0px 20px 20px;
}
.bingpai {
  display: flex;
  margin-left: 94px;
}
.bingpai1 {
  display: flex;
  margin-left: 17px;
}
.icon-pos1 {
  top: 37px;
  left: 60px;
}
.icon-pos2 {
  top: 37px;
  right: 60px;
}
.fonts1 {
  font-size: 13px;
  font-weight: 400;
  color: rgba(89, 89, 89, 1);
  line-height: 18px;
}
.icon-font {
  margin-bottom: 8px;
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
.input-border-16 {
  margin-top: 16px;
}
.wrong {
  font-size: 12px;
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
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
  line-height: 14px;
  margin-left: 12px;
  margin-right: 16px;
}
.ip11 {
  width: 63px;
}
.input-t1 {
  width: 74px;
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
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  line-height: 21px;
  width: 135px;
  height: 48px;
  margin-left: 10px;
}
/deep/ .hideOne .el-upload--picture-card {
  display: none;
}
/deep/ .hideTwo .el-upload--picture-card {
  display: none;
}
/deep/ .hideThree .el-upload--picture-card {
  display: none;
}
</style>