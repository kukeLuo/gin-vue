<template>
  <div>
    <el-table :data="tableData" border stripe>
      <el-table-column label="事件图片" min-width="100">
        <template slot-scope="scope">
          <div :style="{'textAlign':'center'}">
            <CustomPic :picSrc="scope.row.image" />
          </div>
        </template>
      </el-table-column>
      <el-table-column label="视频ID" min-width="250" prop="deviceId"></el-table-column>
      <el-table-column label="事件内容" min-width="150" prop="eventName"></el-table-column>
      <el-table-column label="置信度" min-width="150" prop="confidence"></el-table-column>
      <el-table-column label="图片坐标" min-width="150" prop="imagePoint"></el-table-column>
      <el-table-column label="设备名称" min-width="150" prop="deviceName"></el-table-column>
      <el-table-column label="事件等级" min-width="150" prop="eventLevel"></el-table-column>
      <el-table-column label="事件定位" min-width="150" prop="eventLocation"></el-table-column>
      <el-table-column label="最后上线时间" min-width="150" prop="createdAt"></el-table-column>
    </el-table>
    <el-pagination
      :current-page="page"
      :page-size="pageSize"
      :page-sizes="[10, 30, 50, 100]"
      :style="{float:'right',padding:'20px'}"
      :total="total"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
      layout="total, sizes, prev, pager, next, jumper"
    ></el-pagination>
  </div>
</template>

<script>
// 获取列表内容封装在mixins内部  getTableData方法 初始化已封装完成
const path = process.env.VUE_APP_BASE_API;
import {
  getEventList
} from "@/api/sysDevice";
import infoList from "@/mixins/infoList";
import { mapGetters } from "vuex";

export default {
  name: "deviceEvents",
  mixins: [infoList],
  data() {
    return {
      listApi: getEventList,
      path: path,
      deviceId:"",
      tableData: [{
          image:'',
          deviceId: '',
          eventName: '',
          confidence:'',
          imagePoint: '',
          deviceName:'',
          eventLevel:'',
          createdAt: '',
        }
      ],
    };
  },
  computed: {
    ...mapGetters("user", ["token"])
  },
  methods: {
  getParmas(){
     
  },},
  mounted() {
    this.searchInfo.deviceId = this.$router.history.current.params.id
    this.getTableData();
  },
};
</script>
<style lang="scss">

    .button-box {
        padding: 10px 20px;
        .el-button {
            float: right;
        }
    }
    .top{
        width: 100%;
        height: 59px;
        background: #fff;
        line-height:59px;
    }
    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
     .top-line{
            width: 3px;
            height: 16px;
            background: #007aff;
    }
    .top-text{
        width: 96px;
        height: 16px;
        font-size: 16px;
        font-family: PingFangSC, PingFangSC-Medium;
        font-weight: 500;
        text-align: left;
        color: #333333;
        line-height: 16px;
    }
</style>