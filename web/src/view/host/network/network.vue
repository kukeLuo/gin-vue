<template>
  <div class="app-container">
    <div class="filter-container" >
      <el-button class="filter-item" type="success"  >全部处理</el-button>
    </div>
    <el-table :data="tableData" tooltip-effect="dark"  @selection-change="handleSelectionChange"  :cell-style="cellStyle" fit highlight-current-row>
      <el-table-column  type="selection" width="55" :selectable="isDisabled"></el-table-column>
      <el-table-column label="确认" align="center" width="80">
        <template slot-scope="scope">
          <el-button  type="success" size="mini" :disabled="scope.row.confirm" @click="confirmHandle(scope.row.pointId)"> {{scope.row.confirm?'已确认':'确认'}}</el-button>
        </template>
      </el-table-column>
      <el-table-column label="详情" align="center" width="80">
        <template slot-scope="scope">
          <el-button  type="primary" size="mini" >详情</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="alarmLevel" label="告警级别" align="center" show-overflow-tooltip></el-table-column>
      <el-table-column prop="area" label="区域" align="center"></el-table-column>
      <el-table-column prop="equip" label="设备" align="center" show-overflow-tooltip></el-table-column>
      <el-table-column prop="pointName" label="测点" align="center" show-overflow-tooltip></el-table-column>
      <el-table-column prop="limit" label="限值" align="center" show-overflow-tooltip></el-table-column>
      <el-table-column prop="alarmValue" label="报警值" align="center" show-overflow-tooltip></el-table-column>
      <el-table-column prop="alarmTime" label="报警时间" align="center" show-overflow-tooltip></el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Dashboard',
  data() {
    return {
        tableData: [{
          confirm:true,
          alarmLevel:"紧急告警",
          area:"北京市昌平区",
          equip:"昌平气象采集",
          pointId:1,
          pointName:"温度",
          limit:"35",
          alarmValue:"41",
          alarmTime:"2019-6-1 12:00:00",
        },{
          confirm:false,
          alarmLevel:"一般告警",
          area:"北京市朝阳区",
          equip:"昌平光感采集",
          pointId:2,
          pointName:"紫外线",
          limit:"60",
          alarmValue:"61",
          alarmTime:"2019-6-1 12:00:00",
        },
          {
            confirm:false,
            alarmLevel:"紧急告警",
            area:"北京市朝阳区",
            equip:"昌平光感采集",
            pointId:3,
            pointName:"紫外线",
            limit:"60",
            alarmValue:"61",
            alarmTime:"2019-6-1 12:00:00",
          }],
        multipleSelection: []
    }
  },
   computed: {
    ...mapGetters('user', ['userInfo'])
  },
    
    methods:{
      toTarget(name){
          this.$router.push({name})
      },
      cellStyle(row,column,rowIndex,columnIndex){//根据报警级别显示颜色
        // console.log(row);
        // console.log(row.column);
        if(row.column.label==="告警级别"&& row.row.alarmLevel==="紧急告警"){
          return 'color:red'
        }else if(row.column.label==="告警级别"&& row.row.alarmLevel==="一般告警" ){
          return 'color:yellow'
        }
      }
    },
}
</script>

<style lang="scss" scoped>
    .big{
        margin:100px 0 0 0;
        padding-top: 0;
        background-color: rgb(243,243,243);
        padding-top: 15px;
        .top{
            width: 100%;
            height: 360px;
            margin-top: 20px;
            overflow: hidden;
            .chart-container{
                position: relative;
                width: 100%;
                height: 100%;
                padding: 20px;
                background-color: #fff;
            }
        }
        .mid{
            width: 100%;
            height: 380px;
            .chart-wrapper {
                height: 340px;
                background: #fff;
                padding: 16px 16px 0;
                margin-bottom: 32px;
            }
        }
        .bottom{
            width: 100%;
            height: 300px;
            // margin: 20px 0;
            .el-row{
                margin-right: 4px !important;
            }
            .chart-player{
                width: 100%;
                height: 270px;
                padding: 10px;
                background-color: #fff;
            }
        }
    }
</style>