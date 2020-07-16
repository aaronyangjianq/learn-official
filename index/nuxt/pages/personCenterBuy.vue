<template>
  <div>
    <div class="h">
      <section class="p-r padding-top padding-bottom bg-color">
        <div class="container">
          <div class="row align-center">
            <div class="align-center block height border pt-pb">
              <div class="pf pr">
                <p>SDK名称：&nbsp;{{orderDetail.sdk_data && orderDetail.sdk_data.title}}{{orderDetail.sdk_data && orderDetail.sdk_data.version}}</p>
                <p>最近更新日期：&nbsp;{{orderDetail.add_time}}</p>
              </div>
              <div class="pb">
                <p class="p1">订单金额：</p>
              </div>
              <div class="pb">
                <p class="p2">¥{{orderDetail.price}}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="p-r bg-color">
        <div class="container">
          <div class="row align-center">
            <div class="align-center height1 border pt-pb">
              <div class="ml mb">
                <h5 class="p4">选择支付方式</h5>
              </div>
              <div class="block">
                <div
                  v-for="(item, index) in imgList"
                  :key="item"
                  :class="[num === index ? 'box border p-r align-center block iconpl iconpr active' : 'box border p-r align-center block iconpl iconpr']"
                  @click="choosePay(item.id)"
                >
                  <img :src="item.url" alt="Image placeholder" class="icon" />
                  <p class="p3">{{item.name}}</p>
                  <img
                    src="@/static/images/icon_selected.png"
                    alt="Image placeholder"
                    class="dispalay rb p-a"
                  />
                </div>
                <!-- <div class="box border p-r align-center block iconpl iconpr active">
                  <img src="@/static/images/icon_zhifubao.png" alt="Image placeholder" class="icon" />
                  <p class="p3">支付宝支付</p>
                  <img
                    src="@/static/images/icon_selected.png"
                    alt="Image placeholder"
                    class="dispalay rb p-a"
                  />
                </div>
                <div class="box border p-r align-center block iconpr">
                  <img src="@/static/images/icon_weixin.png" alt="Image placeholder" class="icon" />
                  <p class="p3">微信支付</p>
                  <img
                    src="@/static/images/icon_selected.png"
                    alt="Image placeholder"
                    class="dispalay rb p-a"
                  />
                </div>
                <div class="box border p-r align-center block iconpr">
                  <img src="@/static/images/icon_paypal.png" alt="Image placeholder" class="icon" />
                  <p class="p3">Paypal支付</p>
                  <img
                    src="@/static/images/icon_selected.png"
                    alt="Image placeholder"
                    class="dispalay rb p-a"
                  />
                </div>-->
              </div>
              <div class="block align-center paymt iconpl">
                <div class="align-center">
                  <a href="javascript:void(0)" class="btn-pay a" @click="toPay">去支付</a>
                </div>
                <div>
                  <p>（支付金额:¥{{orderDetail.price}}）</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import { get } from "@/store/request";
export default {
  layout: "other",
  data() {
    return {
      imgList: [
        { id: 0, url: "/images/icon_weixin.png", name: "微信支付" },
        { id: 1, url: "/images/icon_zhifubao.png", name: "支付宝支付" },
        { id: 2, url: "/images/icon_paypal.png", name: "Paypal支付" }
      ],
      num: 0,
      orderDetail: {}
    };
  },
  // async asyncData(params) {
  //   const baseUrl = params.store.state.baseUrl;
  //   const id = params.route.query.orderId;
  //   let orderDetail = [];
  //   const rawData = await get('/home/order/detail', {
  //     id: id
  //   });
  //   // console.log("order--------detail", res.data.data);
  //   orderDetail = rawData.data;
  //   return { orderDetail };
  // },
  async created() {
    const id = this.$route.query.orderId;
    const rawData = await get('/home/order/detail', {
      id: id
    });
    // console.log("order--------detail", res.data.data);
    this.orderDetail = rawData.data;
  },
  components: {},
  methods: {
    async toPay() {
      // console.log("toPay");
      const id = this.$router.currentRoute.query.orderId;
      // console.log("personCenter---id", id);
      const paytype = this.num + 1;
      // console.log("personCenter---paytype", paytype);
      if (paytype === 1) {
        const rawData = await get("home/payment/pay", {
          id: id,
          pay_type: paytype
        });
        // console.log("rawData", rawData)
        // .then(res => {
        //   // console.log("toPay---1", res);
        // });
      } else {
        window.location.href = `${this.$store.state.baseUrl}/home/payment/pay?id=${id}&pay_type=${paytype}`;
      }
    },
    choosePay(id) {
      this.num = id;
    }
  }
};
</script>

<style lang="scss" scoped>
.h {
  min-height: calc(100vh - 179px);
}
.p-r {
  position: relative !important;
}
.p-a {
  position: absolute;
}
.padding-top {
  padding-top: 1.5rem;
}
.padding-bottom {
  padding-bottom: 1rem;
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
.block {
  display: flex;
}
.height {
  height: 100px;
  width: 100%;
}
.border {
  border: 1px solid rgba(232, 232, 232, 1);
}
p {
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
  line-height: 12px;
  padding-bottom: 0.625rem;
  padding-top: 0.625rem;
}
.pf {
  padding-left: 1rem;
}
.pr {
  padding-right: 47rem;
}
.p1 {
  font-size: 15px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
  line-height: 12px;
}
.p2 {
  font-size: 20px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: rgba(204, 0, 0, 1);
  line-height: 28px;
}
.pb {
  padding-bottom: 3rem;
}
.height1 {
  height: 252px;
  width: 100%;
}
.pt-pb {
  padding-top: 1.75rem;
  padding-bottom: 1.5rem;
}
.p4 {
  font-size: 16px;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  color: rgba(51, 51, 51, 1);
  line-height: 16px;
  padding-left: 7px;
}
.ml {
  margin-left: 27px;
  border-left: 3px solid #02b6ff;
}
.mb {
  margin-bottom: 2.25rem;
}
.box {
  width: 180px;
  height: 72px;
}
.icon {
  margin: 18px 0 18px 20px;
}
.p3 {
  font-size: 16px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  line-height: 22px;
  margin-left: 1rem;
}
.iconpl {
  margin-left: 31px;
}
.iconpr {
  margin-right: 12px;
}
.btn-pay {
  position: relative;
  transition: all 0.2s ease;
  background: #02b6ff;
  border-radius: 4px;
  border: 1px solid #02b6ff;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.15);
  font-size: 14px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  line-height: 36px;
  display: inline-block;
  text-align: center;
  vertical-align: middle;
  width: 108px;
  height: 40px;
}
.a {
  text-decoration: none;
}
.paymt {
  margin-top: 2.25rem;
}
.border {
  border: 1px solid rgba(232, 232, 232, 1);
}
.rb {
  right: 0;
  bottom: 0;
  display: none;
}
.active {
  border: 1px solid #02b6ff;
}
.active > .rb {
  display: block;
}
</style>
