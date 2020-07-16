<template>
  <div>
    <!-- <el-container style="height: 782px"> -->
    <section class="min-he">
      <div class="container">
        <div class="row center">
          <el-aside>
            <el-menu
              :default-active="activeIndex"
              class="el-menu-vertical-demo"
              style="border: none"
              @open="handleOpen"
              @close="handleClose"
            >
              <div v-for="item in sdkCatetoryData" :key="item.id">
                <el-submenu :index="item.tree" v-if="item.children.length">
                  <template slot="title">
                    <span>{{item.name}}</span>
                  </template>
                  <div v-for="child in item.children" :key="child.id">
                    <el-submenu :index="child.tree" v-if="child.children.length">
                      <template slot="title">
                        <span>{{child.name}}</span>
                      </template>
                      <div v-for="grandchild in child.children" :key="grandchild.id">
                        <el-submenu :index="grandchild.tree" v-if="grandchild.children.length">
                          <template slot="title">
                            <span>{{grandchild.name}}</span>
                          </template>
                          <el-menu-item
                            :index="miniChild.tree"
                            v-for="miniChild in grandchild.children"
                            :key="miniChild.id"
                            @click="showMinichildContent(miniChild.id)"
                          >
                            <template slot="title">
                              <span>{{miniChild.name}}</span>
                            </template>
                          </el-menu-item>
                        </el-submenu>
                        <el-menu-item
                          :index="grandchild.tree"
                          v-else
                          @click="showGrandchildContent(grandchild.id)"
                        >
                          <template slot="title">
                            <span>{{grandchild.name}}</span>
                          </template>
                        </el-menu-item>
                      </div>
                    </el-submenu>
                    <el-menu-item :index="child.tree" v-else @click="showChildContent(child.id)">
                      <template slot="title">
                        <span>{{child.name}}</span>
                      </template>
                    </el-menu-item>
                  </div>
                </el-submenu>
                <el-menu-item :index="item.tree" v-else @click="showContent(item.id)">
                  <template slot="title">
                    <span>{{item.name}}</span>
                  </template>
                </el-menu-item>
              </div>
            </el-menu>
          </el-aside>
          <el-main style="padding: 0 20px 0 20px">
            <div>
              <div class="align-center block height border" v-for="item in sdkList" :key="item.id">
                <div>
                  <el-popover placement="bottom" width="400" trigger="hover" :content="item.title">
                    <div slot="reference" class="f1 fsize">{{item.title}}</div>
                  </el-popover>
                </div>
                <div class="width">
                  <h3>SDK说明</h3>
                  <el-popover placement="bottom" width="400" trigger="hover" :content="item.exp">
                    <p slot="reference" class="ptest">{{item.exp}}</p>
                  </el-popover>
                </div>
                <div class="pf">
                  <a href="javascript:void(0)" class="btn a" @click="toSdkDetail(item.id)">查看详情</a>
                </div>
              </div>
            </div>
          </el-main>
        </div>
      </div>
    </section>
    <!-- </el-container> -->
  </div>
</template>

<script>
import { get, post } from "@/store/request";
export default {
  layout: "navbar",
  data() {
    return {
      defaultProps: {
        children: "children",
        label: "tree"
      },
      docs: [],
      id: null,
      visible: false
    };
  },
  async asyncData({ params, store }) {
    let sdkCatetoryData = [];
    let sdkList = [];
    let activeIndex = '';
    const rawData = await get("home/sdk/list");
    if (rawData.code === 100) {
      sdkCatetoryData = rawData.data.cate;
      sdkList = rawData && rawData.data && rawData.data.list && rawData.data.list.list;
      activeIndex = rawData && rawData.data && rawData.data.list && rawData.data.list.tree;
    } else if (rawData.code === 405 && process.client) {
      localStorage.removeItem("userInfo");
    }

    return { sdkCatetoryData, sdkList, activeIndex };
  },
  methods: {
    handleNodeClick(data) {
      this.docs = data.docs;
    },
    handleOpen(key, keyPath) {},
    handleClose() {},
    async showSubmenuContent(index) {
      const rawData = await get("home/sdk/list", {
        id: index
      });
      this.sdkList =
        rawData && rawData.data && rawData.data.list && rawData.data.list.list;
    },
    async showContent(index) {
      const rawData = await get("home/sdk/list", {
        cid: index
      });

      this.sdkList =
        rawData && rawData.data && rawData.data.list && rawData.data.list.list;
    },
    async showChildContent(index) {
      const rawData = await get("home/sdk/list", {
        cid: index
      });
      this.sdkList =
        rawData && rawData.data && rawData.data.list && rawData.data.list.list;
    },
    async showGrandchildContent(index) {
      const rawData = await get("home/sdk/list", {
        cid: index
      });

      if (rawData.code === 100) {
        this.sdkList =
          rawData &&
          rawData.data &&
          rawData.data.list &&
          rawData.data.list.list;
      } else if (rawData.code === 405) {
        localStorage.removeItem("userInfo");
      }
    },
    async showMinichildContent(index) {
      const rawData = await get(`${this.$store.state.baseUrl}/home/sdk/list`, {
        cid: index
      });
      if (rawData.code === 100) {
        this.sdkList =
          rawData &&
          rawData.data &&
          rawData.data.list &&
          rawData.data.list.list;
      } else if (rawData.code === 405) {
        localStorage.removeItem("userInfo");
      }
    },
    toSdkDetail(id) {
      this.$router.push(`/sdkDetail/?id=${id}`);
    }
  }
};
</script>

<style lang="scss" scoped>
.min-he {
  min-height: calc(100vh - 179px);
  padding-top: 2em;
}
.container {
  width: 1100px;
  margin: 0 auto;
}
.row {
  display: flex;
  flex-wrap: wrap;
}
center {
  display: flex;
  flex-direction: row;
  flex: 1;
  flex-basis: auto;
}
.el-main {
  flex-basis: 0;
  overflow: hidden;
}
.position-relative {
  position: relative !important;
}
h1 {
  font-size: 15px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(0, 0, 0, 1);
  line-height: 20px;
  padding-bottom: 0.75rem;
}
.align-center {
  align-items: center;
}
.text-align {
  text-align: left;
}
.block {
  display: flex;
}
.height {
  width: 100%;
  min-height: 140px;
  padding: 5px;
}
.border {
  margin: 0 0 -1px -1px;
  border: 1px solid rgba(232, 232, 232, 1);
}
.f1 {
  font-size: 15px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(0, 0, 0, 1);
  line-height: 20px;
  width: 79px;
  margin-left: 3rem;
  margin-right: 4.875rem;
}
.fsize {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
h3 {
  font-size: 12px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: rgba(102, 102, 102, 1);
  line-height: 20px;
}
p {
  font-size: 12px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
  line-height: 20px;
}
.width {
  width: 497px;
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
.pf {
  width: 72px;
  margin-left: 145px;
  margin-right: 46px;
}
.ptest {
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-all;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  white-space: pre-wrap;
}
</style>