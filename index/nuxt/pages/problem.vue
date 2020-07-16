<template>
  <div>
    <div class="top">
      <section>
        <div class="container pb">
            <div class="text-center">
              <div>
                <h1 class="h1">疑难解答 / FAQ</h1>
              </div>
              <div class="mmt">
                <input type="text" v-model="title" placeholder="请输入您的问题关键词"  @keyup="keyCode"/>
                <a href="javascript:void(0)" class="btn a" @click="toSearch">搜索</a>
              </div>
            </div>
        </div>
      </section>
    </div>
    <section class="min-he">
        <div class="container tanxing">
          <el-aside v-if="search">
            <el-menu
              class="el-menu-vertical-demo"
              style="border: none"
              @open="handleOpen"
              @close="handleClose"
            >
              <div v-for="item in cateList" :key="item.id">
                <el-submenu :index="item.tree">
                  <template slot="title">
                    <span>{{item.name}}</span>
                  </template>
                  <el-menu-item 
                    v-for="child in item.questions" 
                    :key="child.id" 
                    :index="item.tree + child.id"
                     @click="handleSelect(child.id)"
                  >
                    <template slot="title">
                      <span>{{child.title}}</span>
                    </template>
                  </el-menu-item>
                </el-submenu>
              </div>
            </el-menu>
          </el-aside>
          <el-aside v-if="!search" style="margin-top: 30px;">
            <ul v-for="cate in problemCate" :key="cate.id" class="liststyle">
              <li @click="showContent(cate.id)">{{ cate.name }}</li>
            </ul>
          </el-aside>
          <el-main v-if="!search" style="margin-top 16px;">
            <ul
              v-for="item in questionTitleList"
              :key="item.id"
              class="ulstyle"
            >
              <li>
                <span @click="toProblemDetail(item.id)">{{item.title}}</span>
              </li>
            </ul>
          </el-main>
          <el-main v-if="search">
            <div v-if="searchList.length">
              <h2 class="searchTitle">搜到 "{{title}}"结果 , 共{{count}}条</h2>
              <div v-for="item in searchList" :key="item.id">
                <div class="searchContentTitle">
                  <span>{{item.title}}</span>
                </div>
                <div class="searchContentTitle" v-html="item.exp"></div>
                <div class="levelstyle" @click="toSearchProblemDetail(item.id)">
                   <div>{{item.cate_name}}</div>><div>{{item.title}}</div>
                </div>
              </div>
            </div>
            <div class="actmid" v-else>
              <p>抱歉！没有搜到"{{title}}"相关结果</P>
            </div>
          </el-main>
        </div>
    </section>
  </div>
</template>

<script>
import { get, post } from "@/store/request";
export default {
  layout: "default",
  data() {
    return {
      search: false,
      title: "",
      cateList: [
        {
          id: null,
          name: "",
          pid: null,
          level: null,
          name: "",
          questions: [],
          tree: ""
        }
      ],
      count: null,
      searchList: [
        {
          id: null,
          cid: null,
          title: "",
          exp: ""
        }
      ],
      searchId: null,
      problemData: [],
      treeId: null,
      tree: '',
    };
  },
  async asyncData({ params, store }) {
    let problemCate = [];
    let questionTitleList = [];
    const rawData = await get('home/question/list');
      if(rawData.code === 100) {
        problemCate = rawData.data.cate;
        questionTitleList = rawData.data.list;
      } else if (rawData.code === 405) {
         localStorage.removeItem("userInfo");
      }

    return { problemCate, questionTitleList };
  },
  watch: {
   '$store.state.userInfo':function(Nval,Oval){
     if(Nval.id) {
       this.$store.state.userInfo = Nval
       this.$store.state.userInfo && localStorage.setItem("userInfo", JSON.stringify(this.$store.state.userInfo))
     }
    }
  },
  mounted() {
    this.$store.dispatch("getUserInfo");
  },
  methods: {
    keyCode(event) {
     const varkeyCode =window.event? event.keyCode:event.which;
     if (varkeyCode === 13 && this.title !== '') {
        this.toSearch();
     } else if (varkeyCode === 8 && this.title==='') {
       this.$router.go(0);
     }
    },
    handleNodeClick(data) {
      this.docs = data.docs;
    },
    handleOpen() {},
    handleClose() {},
    handleSelect(id) {
      this.$router.push(`/problemDetail/?id=${id}`);
    },
    async toSearch() {
      if(this.title) {
        this.search = true;
        const rawData = await get('home/question/search', {
              title: this.title,
              page: 1,
              limit: 10
          })
          if(rawData.code === 100) {
            this.cateList = rawData.data.cate;
            this.searchList = rawData.data.list;
            this.count = rawData.data.count;
          }
      }
    },
    async showContent(id) {
      
      const rawData = await get('home/question/list', {
            cid: id
        })
       this.questionTitleList = rawData.data.list;
    },
    toProblemDetail(id) {
      this.$router.push(`/problemDetail/?id=${id}`);
    },
    searchProblem(event) {
      if(event.keycode === 13) {
        this.toSearch()
      }
    },
    toSearchProblemDetail(id) {
      this.$router.push(`/problemDetail/?id=${id}`)
    }
  }
};
</script>

<style lang="scss" scoped>
.el-menu-item
{
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.el-main
{
  flex-basis: 0;
  overflow: hidden;
}
.el-aside
{
  overflow: hidden;
  display: block;
  margin: 0;
  padding: 0
}
.min-he
{
  min-height: calc(100vh - 179px);
}
.tanxing
{
  display: flex;
}
.actmid
{
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.liststyle
{
  cursor: pointer;
}
.liststyle > li
{
  height:48px;
  font-size:16px;
  font-family:PingFangSC-Semibold,PingFang SC;
  font-weight:600;
  color:rgba(51,51,51,1);
  line-height:48px;
}
.liststyle > li:active
{
  color:rgba(2,182,255,1);
}
.ulstyle
{
  cursor: pointer;
  border-bottom: 1px solid rgba(240,240,240,1);
  width: 600px;
  height: 50px;
}
.ulstyle > li
{ 
  color: rgba(246,246,246,1);
}
.ulstyle > li > span
{
  display: block;
  height: 50px;
  font-size:14px;
  font-family:PingFangSC-Regular,PingFang SC;
  font-weight:400;
  color:rgba(102,102,102,1);
  line-height: 50px;
  width: 558px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.ulstyle > li > span:active
{
  color: #409EFF;
}
.top {
  background-image: url(.././static/images/home_one.png);
  height: 100%;
  width: 100%;
  min-width: 1100px;
  background-size: cover;
  background-position: center 0 !important;
}
.padding {
  padding-top: 3rem;
  padding-bottom: 3rem;
}
.container {
  width: 1100px;
  margin: 0 auto;
}
.pb {
  padding-top: 151px;
  padding-bottom: 60px;
}
.row {
  display: flex;
  margin-left: -15px;
  margin-right: -15px;
  flex-wrap: wrap;
  justify-content: center;
}
.text-center {
  text-align: center !important;
}
.h1 {
  font-size: 28px;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  color: rgba(255, 255, 255, 1);
  line-height: 18px;
}
.mmt {
  margin-top: 47px;
}
input[type="text"] {
  width: 500px;
  height: 44px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 2px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
  line-height: 24px;
  background-color: white;
  background-image: url("https://static.runoob.com/images/mix/searchicon.png");
  background-position: 10px 10px;
  background-repeat: no-repeat;
  padding: 12px 20px 12px 40px;
}
.btn {
  position: relative;
  transition: all 0.2s ease;
  border-radius: 2px;
  border-color: #02b6ff;
  background-color: #02b6ff;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.15);
  font-size: 16px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  line-height: 44px;
  display: inline-block;
  text-align: center;
  vertical-align: top;
  border: 1px solid transparent;
  width: 88px;
  height: 44px;
  margin-left: 12px;
}
.a {
  text-decoration: none;
}
.searchTitle {
  font-size: 24px;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  color: rgba(51, 51, 51, 1);
  line-height: 24px;
  padding-bottom: 14px;
  padding-top: 29px;
}
.searchContentTitle {
  /deep/ p
  {
    font-size:13px;
    font-family:PingFangSC-Regular,PingFang SC;
    font-weight:400;
    color:rgba(102,102,102,1);
    line-height:26px;
    padding-top: 14px;
    padding-bottom: 4px;
  }
  /deep/ span
  {
    font-size:16px;
    font-family:PingFangSC-Semibold,PingFang SC;
    font-weight:600;
    color:rgba(51,51,51,1);
    line-height:16px;
    border-left: 3px solid rgba(2,182,255,1);
    padding-left: 10px;
  }
}
.levelstyle
{
  cursor: pointer;
  display: flex;
  font-size:13px;
  font-family:PingFangSC-Regular,PingFang SC;
  font-weight:400;
  color:rgba(51,51,51,1);
  line-height:26px;
  padding-bottom: 28px;
}
</style>