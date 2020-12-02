<template>
   <router-view></router-view>
</template>

<script>
export default {
  name: "AppStore",
};
</script>
<style lang="scss" scoped>
.big {
  margin: 100px 0 0 0;
  padding-top: 0;
  background-color: rgb(243, 243, 243);
  padding-top: 15px;
  .top {
    width: 100%;
    height: 59px;
    background: #fff;
    line-height: 59px;
  }
  .top-text {
    width: 96px;
    height: 16px;
    font-size: 16px;
    font-family: PingFangSC, PingFangSC-Medium;
    font-weight: 500;
    text-align: left;
    color: #333333;
    line-height: 16px;
  }
  .top-line {
    width: 3px;
    height: 16px;
    background: #007aff;
  }
  .divider-line {
    width: 1px;
    height: 50px;
    background: #d7dbe0;
    margin-top: 33px;
  }
  .top-content {
    width: 100%;
    height: 140px;
    margin-top: 2px;
    background: #fff;
  }
  .item {
    flex: 0 0 28%;
    height: 80px;
    padding: 20px;
    box-sizing: border-box;
    margin: 20px;
  }
  .mid-top-content {
    width: 100%;
    height: 118px;
    margin-top: 2px;
    background: #fff;
  }
  .mid-bottom-content {
    width: 100%;
    height: 200px;
    margin-top: 5px;
    background: #fff;
  }
  .top-bottom-content {
    width: 100%;
    height: 315px;
    margin-top: 5px;
    background: #fff;
  }
  .top-server {
    width: 100%;
    height: 59px;
    background: #fff;
    line-height: 59px;
    margin-top: 10px;
  }
  .el-row {
    margin-bottom: 10px;
    padding-left: 0px;

    &:last-child {
      margin-bottom: 0;
      padding-right: 20px;
    }
  }
  .el-col {
    border-radius: 2px;
  }
  .el-progress {
    margin-top: 30px;
    margin-left: 70px;
  }
  .margin-text {
    margin-top: 50px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #f0f9ff;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    height: 108px;
    margin-left: 20px;
  }
  .bg-radius-small {
    width: 56px;
    height: 24px;
    margin-left: 20px;
  }

  .bg-radius-mid {
    width: 88px;
    height: 24px;
  }

  .bg-radius-big {
    width: 112px;
    height: 24px;
  }

  .bg-radius-style {
    background: #e1eff5;
    border-radius: 15px;
  }

  .text-style {
    width: 20px;
    height: 22px;
    font-size: 12px;
    text-align: center;
    color: #666666;
    line-height: 22px;
    margin-left: 15px;
  }

  .flow-text-style {
    width: 81px;
    height: 32px;
    font-size: 32px;
    font-family: Helvetica;
    text-align: center;
    color: #111111;
    margin-left: 45px;
    margin-top: 20px;
  }
  .flow-text {
    width: 100px;
    height: 14px;
    font-size: 15px;
    padding-left: 50px;
    color: #333333;
  }
  .flow-application-text {
    width: 100px;
    height: 14px;
    font-size: 15px;
    padding-left: 78px;
    margin-top: 20px;
    margin-bottom: 19px;
    color: #333333;
  }
  .flow-size {
    width: 54px;
    height: 32px;
    font-size: 32px;
    font-family: Helvetica;
    text-align: center;
    color: #111111;
    margin-left: 88px;
    margin-top: 19px;
  }
  .assets-icon-small {
    width: 28px;
    height: 28px;
    border-radius: 10px;
    margin-left: 15px;
    margin-top: 10px;
  }

  .assets-icon-big {
    width: 44px;
    height: 42px;
    margin-left: 24px;
  }
  .text-col {
    margin-left: 15px;
  }
  .status-text {
    width: 100px;
    text-align: center;
    margin-top: 30px;
  }
  .service-text {
    width: 100px;
    text-align: center;
    margin-top: 5px;
  }
  .bg-text {
    font-size: 24px;
    text-align: center;
    color: #1677ff;
  }
  .except-num {
    font-size: 32px;
    color: #ff4d4d;
  }
  .status-text-samll {
    font-size: 14px;
    margin-left: 20px;
  }
  .tableClass {
    padding: 0 !important;
    height: 44px;
    line-height: 44px;
    margin-top: 1px;
  }
  .server-padding-left {
    padding-left: 75px;
  }
}
</style>