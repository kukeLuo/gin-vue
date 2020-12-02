<template>
  <div class="big">
    <el-row class="el-row">
      <el-col :span="20">
        <el-divider direction="vertical" class="top-line"></el-divider
        ><b style="fontSize: 20px">系统日志</b>
      </el-col>
    </el-row>

    <el-table :data="tableData" border stripe>
      <el-table-column prop="ID" label="编号" min-width="300">
      </el-table-column>
      <el-table-column prop="user.userName" label="操作人" min-width="300">
      </el-table-column>
      <el-table-column prop="ip" label="请求IP" min-width="300">
      </el-table-column>
      <el-table-column prop="path" label="请求路径" min-width="300">
      </el-table-column>
      <el-table-column prop="error_message" label="错误信息" min-width="300">
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import {
  getOperationRecordList
} from "@/api/sysOperationRecord";
import infoList from "@/mixins/infoList";
export default {
  mixins: [infoList],
  data() {
     return {
        listApi: getOperationRecordList,
     }
  },
  methods: {
  },
  created(){
      this.getTableData();
    }
};
</script>
