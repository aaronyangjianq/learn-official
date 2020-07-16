<template>
  <div>
    <!-- <el-container style="height: 782px"> -->
    <section class="min-he">
      <div class="container">
        <div class="row center">
          <el-aside>
            <el-menu
              class="el-menu-vertical-demo"
              style="border: none"
              :default-active="activetree + docId"
              @open="handleOpen"
              @close="handleClose"
            >
              <div v-for="item in documentCatetoryData" :key="item.id">
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
                          <div v-for="grandMaxchild in grandchild.children" :key="grandMaxchild.id"></div>
                          <div v-if="grandchild.docs.length">
                            <el-menu-item
                              v-for="grandchilddoc in grandchild.docs"
                              :key="grandchilddoc.id"
                              :index="grandchild.tree + grandchilddoc.id"
                              @click="handleGrandMaxChildMenu(grandchilddoc.id)"
                            >
                              <template slot="title">
                                <span>{{grandchilddoc.title}}</span>
                              </template>
                            </el-menu-item>
                          </div>
                        </el-submenu>
                        <el-submenu :index="grandchild.tree" v-else-if="grandchild.docs.length">
                          <template slot="title">
                            <span>{{grandchild.name}}</span>
                          </template>
                          <el-menu-item
                            v-for="grandchildDoc in grandchild.docs"
                            :key="grandchildDoc.id"
                            :index="grandchild.tree + grandchildDoc.id"
                            @click="showSubmenugrandchildContent(grandchildDoc.id)"
                          >
                            <template slot="title">
                              <span>{{grandchildDoc.title}}</span>
                            </template>
                          </el-menu-item>
                        </el-submenu>
                        <el-menu-item :index="grandchild.tree" v-else>
                          <template slot="title">
                            <span>{{grandchild.name}}</span>
                          </template>
                        </el-menu-item>
                      </div>
                      <div v-if="child.docs.length">
                        <el-menu-item
                          v-for="childdoc in child.docs"
                          :key="childdoc.id"
                          :index="child.tree + childdoc.id"
                          @click="handleGrandChildMenu(childdoc.id)"
                        >
                          <template slot="title">
                            <span>{{childdoc.title}}</span>
                          </template>
                        </el-menu-item>
                      </div>
                    </el-submenu>
                    <el-submenu :index="child.tree" v-else-if="child.docs.length">
                      <template slot="title">
                        <span>{{child.name}}</span>
                      </template>
                      <el-menu-item
                        v-for="childdoc in child.docs"
                        :key="childdoc.id"
                        :index="child.tree + childdoc.id"
                        @click="showSubmenuChildContent(childdoc.id)"
                      >
                        <template slot="title">
                          <span>{{childdoc.title}}</span>
                        </template>
                      </el-menu-item>
                    </el-submenu>
                    <el-menu-item :index="child.tree" v-else>
                      <template slot="title">
                        <span>{{child.name}}</span>
                      </template>
                    </el-menu-item>
                  </div>
                  <div v-if="item.docs.length">
                    <el-menu-item
                      v-for="doc in item.docs"
                      :key="doc.id"
                      :index="item.tree + doc.id"
                      @click="handleChildMenu(doc.id)"
                    >
                      <template slot="title">
                        <span>{{doc.title}}</span>
                      </template>
                    </el-menu-item>
                  </div>
                </el-submenu>
                <el-submenu :index="item.tree" v-else-if="item.docs.length">
                  <template slot="title">
                    <span>{{item.name}}</span>
                  </template>
                  <el-menu-item
                    v-for="doc in item.docs"
                    :key="doc.id"
                    :index="item.tree + doc.id"
                    @click="showSubmenuContent(doc.id)"
                  >
                    <template slot="title">
                      <span>{{doc.title}}</span>
                    </template>
                  </el-menu-item>
                </el-submenu>
                <el-menu-item :index="item.tree" v-else>
                  <template slot="title">
                    <span>{{item.name}}</span>
                  </template>
                </el-menu-item>
              </div>
            </el-menu>
          </el-aside>
          <el-main>
            <div>
              <h1 class="pt pb">{{title}}</h1>
              <div class="text-style" v-html="documentData"></div>
            </div>
          </el-main>
        </div>
      </div>
    </section>
    <!-- </el-container> -->
  </div>
</template>

<script>
import navigation from "~/components/menu/navigation.vue";
import { get, post } from "@/store/request";

export default {
  layout: "navbar",
  components: { navigation },
  data() {
    return {
      defaultProps: {
        children: "children",
        label: "tree"
      }
    };
  },
  async asyncData({ params, store }) {
    let documentCatetoryData = [];
    let docId = null;
    let activetree = "";
    let title = "";
    let documentData = "";
    const rawData = await get("home/index/getCate", {
      type: 1
    });
    if (rawData.code === 100) {
      documentCatetoryData = rawData.data && rawData.data.list;
      docId = rawData.data && rawData.data.doc && rawData.data.doc.id;
      activetree = rawData.data && rawData.data.doc && rawData.data.doc.tree;
    } else if (rawData.code === 405 && process.client) {
      localStorage.removeItem("userInfo");
    }
    const docData = docId && await get("home/sdk/doc", {
      id: docId
    });
    if (rawData.code === 400) {
      documentData = docData.msg;
    } else {
      title = docData.data.title;
      documentData = docData.data.exp;
    }
    return { documentCatetoryData, docId, activetree, title, documentData };
  },
  methods: {
    handleNodeClick(data) {
    },
    handleOpen() {},
    handleClose() {},
    async showSubmenuContent(index) {

      const rawData = await get("/home/sdk/doc", {
        id: index
      });
      if (rawData.code === 400) {
        this.documentData = rawData.msg;
      } else {
        this.title = rawData.data.title;
        this.documentData = rawData.data.exp;
      }
    },
    async showContent(index) {
      const rawData = await get("/home/sdk/doc", {
        id: index
      });
      if (rawData.code === 400) {
        this.documentData = rawData.msg;
      } else {
        this.title = rawData.data.title;
        this.documentData = rawData.data.exp;
      }
    },
    async showSubmenuChildContent(index) {
      const rawData = await get("/home/sdk/doc", {
        id: index
      });

      if (rawData.code === 400) {
        this.documentData = rawData.msg;
      } else {
        this.title = rawData.data.title;
        this.documentData = rawData.data.exp;
      }
    },
    async showChildContent(index) {
      const rawData = await get("/home/sdk/doc", {
        id: index
      });

      if (rawData.code === 400) {
        this.documentData = rawData.msg;
      } else {
        this.title = rawData.data.title;
        this.documentData = rawData.data.exp;
      }
    },
    async showSubmenuGrandchildContent(index) {
      const rawData = await get("/home/sdk/doc", {
        id: index
      });

      if (rawData.code === 400) {
        this.documentData = rawData.msg;
      } else {
        this.title = rawData.data.title;
        this.documentData = rawData.data.exp;
      }
    },
    async showGrandchildContent(index) {
      const rawData = get("/home/sdk/doc", {
        id: index
      });

      if (rawData.code === 400) {
        this.documentData = rawData.msg;
      } else {
        this.title = rawData.data.title;
        this.documentData = rawData.data.exp;
      }
    },
    async handleChildMenu(index) {
      const rawData = await get("/home/sdk/doc", {
        id: index
      });

      if (rawData.code === 400) {
        this.documentData = rawData.msg;
      } else {
        this.title = rawData.data.title;
        this.documentData = rawData.data.exp;
      }
    },
    async handleGrandChildMenu(index) {
      const rawData = await get("/home/sdk/doc", {
        id: index
      });

      if (rawData.code === 400) {
        this.documentData = rawData.msg;
      } else {
        this.title = rawData.data.title;
        this.documentData = rawData.data.exp;
      }
    },
    async handleGrandMaxChildMenu(index) {

      const rawData = await get("/home/sdk/doc", {
        id: index
      });

      if (rawData.code === 400) {
        this.documentData = rawData.msg;
      } else {
        this.title = rawData.data.title;
        this.documentData = rawData.data.exp;
      }
    },
    async showMinichildContent(index) {

      const rawData = await get("/home/sdk/doc", {
        id: index
      });

      if (rawData.code === 400) {
        this.documentData = rawData.msg;
      } else {
        this.title = rawData.data.title;
        this.documentData = rawData.data.exp;
      }
    },
    async showSubmenugrandchildContent(index) {

      const rawData = await get("/home/sdk/doc", {
        id: index
      });

      if (rawData.code === 400) {
        this.documentData = rawData.msg;
      } else {
        this.title = rawData.data.title;
        this.documentData = rawData.data.exp;
      }
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
.link-top {
  width: 960px;
  height: 1px;
  border-top: solid #acc0d8 2px;
}
.pt {
  padding-top: 13px;
}
.pb {
  padding-bottom: 10px;
}
h1 {
  font-size: 24px;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  color: rgba(51, 51, 51, 1);
  line-height: 24px;
}
.text-style {
  /deep/ p {
    font-size: 13px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(102, 102, 102, 1);
    line-height: 26px;
    padding-bottom: 14px;
    padding-top: 14px;
  }
}
.text-style {
  /deep/ h2 {
    text-align: center;
    width: 75px;
    height: 16px;
    font-size: 16px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: rgba(51, 51, 51, 1);
    line-height: 16px;
    border-left: 3px solid rgba(2, 182, 255, 1);
  }
}
.text-style {
  /deep/ a {
    text-decoration: none;
    font-size: 13px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: rgba(2, 182, 255, 1);
    line-height: 26px;
    padding-bottom: 28px;
  }
}
</style>