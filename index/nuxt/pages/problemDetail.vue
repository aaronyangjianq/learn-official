<template>
  <div>
    <div class="top">
      <div class="container pb">
        <div class="text-center">
          <div>
            <h1 class="h1">疑难解答 / FAQ</h1>
          </div>
          <div class="mmt">
            <input type="text" v-model="title" placeholder="请输入您的问题关键词" @keyup="keyCode"/>
            <a href="javascript:void(0)" class="btn a" @click="toSearch">搜索</a>
          </div>
        </div>
      </div>
    </div>
    <!-- <el-container style="height: 568px"> -->
    <section class="min-he">
      <div class="container tanxing">
        <el-aside v-if="!isSearch">
          <el-menu
            :default-active="tree + treeId"
            class="el-menu-vertical-demo"
            style="border: none"
            @open="handleOpen"
            @close="handleClose"
          >
            <div v-for="item in problemData" :key="item.id">
              <el-submenu :index="item.tree">
                <template slot="title">
                  <span class="problemDetailTitle">{{item.name}}</span>
                </template>
                <el-menu-item
                  v-for="child in item.questions"
                  :key="child.id"
                  :index="item.tree + child.id"
                  @click="showContent(child.id)"
                >
                  <template slot="title">
                    <span>{{child.title}}</span>
                  </template>
                </el-menu-item>
              </el-submenu>
            </div>
          </el-menu>
        </el-aside>
        <el-aside v-if="isSearch">
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
        <el-main v-if="!isSearch">
          <h1 class="title">{{detailData.title}}</h1>
          <div class="content" v-html="detailData.exp"></div>
        </el-main>
        <el-main v-if="isSearch">
            <div v-if="searchList && searchList.length">
              <h2 class="searchTitle">搜到 "{{title}}"结果 , 共{{count}}条</h2>
              <div v-for="item in searchList" :key="item.id">
                <div class="searchContentTitle">
                  <span>{{item.title}}</span>
                </div>
                <div class="searchContentTitle" v-html="item.exp"></div>
                <div class="levelstyle" @click="toSearchProblemDetail(item.id)">
                   <div>{{item.cate_name}}</div>>> <div>{{item.title}}</div>
                </div>
              </div>
            </div>
            <div class="actmid" v-else>
              <p>抱歉！没有搜到"{{title}}"相关结果</P>
              </div>
          </el-main>
      </div>
    </section>
    <!-- </el-container> -->
  </div>
</template>

<script>
import { get, post } from "@/store/request";
export default {
  layout: "other",
  data() {
    return {
      title: "",
      detailData: {
        id: null,
        title: "",
        exp: ""
      },
      isSearch: false,
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
      tree: ''
    };
  },
  created() {
    this.getProblemData();
  },
  methods: {
    handleOpen() {},
    handleClose() {},
    keyCode(event) {
     const varkeyCode = window.event? event.keyCode:event.which;
     if (varkeyCode === 13 && this.title !== '' ) {
        this.toSearch();
     } else if (varkeyCode === 8 && this.title ==='') {
       this.$router.replace('/problem/');
     }
    },
    async toSearch() {
      if(this.title) {
        this.isSearch = true;
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
    handleSelect(id) {
      this.isSearch = false;
      this.title = "";
      this.showContent(id);
    },
    async getProblemData() {
      const id = this.$route.query.id;
      const rawData = await get('home/question/qs', {
          id: id
      })
      let cid = null;
      let treedata = {};

      this.problemData = rawData.data.cate;
      this.detailData = rawData.data.question;
      this.treeId  = rawData.data && rawData.data.question && rawData.data.question.id;
      cid = rawData.data && rawData.data.question && rawData.data.question.cid;
      treedata = rawData.data && rawData.data.cate.filter(item => item.id === cid);
      this.tree = treedata[0] && treedata[0].tree;
    },
    async showContent(id) {  
      const rawData = await get('home/question/qs', {      
            id: id
        })
       this.detailData = rawData.data.question;
    },
    toSearchProblemDetail(searchId) {
      window.location.href =`/problemDetail?id=${searchId}`
    }
  }
};
</script>

<style lang="scss" scoped>
.min-he {
  min-height: calc(100vh - 179px);
}
.el-main {
  flex-basis: 0;
  overflow: hidden;
}
.tanxing {
  display: flex;
}
.top {
  background-image: url(.././static/images/home_one.png);
  height: 228px;
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
  margin-right: auto;
  margin-left: auto;
}
.pb {
  padding-top: 59px;
  padding-bottom: 60px;
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
  width: 40%;
  box-sizing: border-box;
  border: 2px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  background-color: white;
  background-image: url("https://static.runoob.com/images/mix/searchicon.png");
  background-position: 10px 10px;
  background-repeat: no-repeat;
  padding: 12px 20px 12px 40px;
  margin-left: 5rem;
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
.title {
  font-size: 24px;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  color: rgba(51, 51, 51, 1);
  line-height: 24px;
  padding-bottom: 14px;
  padding-top: 29px;
}
.content {
  /deep/ p {
    font-size: 13px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(102, 102, 102, 1);
    line-height: 26px;
    padding-top: 14px;
    padding-bottom: 14px;
  }
  /deep/ p > span {
    font-size: 13px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    line-height: 26px;
  }

  /deep/ h2 {
    font-size: 16px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: rgba(51, 51, 51, 1);
    line-height: 16px;
    border-left: 3px solid rgba(2, 182, 255, 1);
    padding-left: 10px;
  }
}
.problemDetailTitle {
  font-size: 16px;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  color: rgba(51, 51, 51, 1);
}
.el-menu-item {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
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
