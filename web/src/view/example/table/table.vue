// table 纯前端示例
<template>
  <div>
    <div class="top">
        <el-divider direction="vertical" class=top-line></el-divider>
        
        <span class="top-text"><b>系统通知</b></span>
    </div>

        <el-table :data="tableData" >
          <el-table-column
            label="序号"
            type="index"
            min-width="50">
          </el-table-column>
          <el-table-column property="messageContent" label="消息内容" min-width="300">

            <el-row>
                <el-col  :span="10"><label for="">技能ID:</label></el-col>
            </el-row>
            <el-row>
                <el-col  :span="40"><label for="">89289jkjskhjd很大哈扩所扩多卡或军军军军或d89289jkjskhjd很大哈扩所扩多卡或军军军军或dk</label></el-col>
            </el-row>
          </el-table-column>
          <el-table-column
            property="leavel"
            label="问题等级"
            min-width="120">
          </el-table-column>
          <el-table-column
            property="time"
            min-width="100"
            label="时间">
          </el-table-column>

          <el-table-column
           min-width="50"
            property="messageStatus"
            label="消息状态">
          </el-table-column>
        </el-table>
  </div>
</template>

<script>
export default {
  name: 'Table',
  data() {
    return {
      tableData: [
        {
          time: '2016-05-03',
          messageContent: '王小虎',
          messageStatus: '已读',
          address: '上海市普陀区金沙江路 1518 弄',
          leavel:'故障'
        },
        {
          time: '2016-05-03',
          messageContent: '王小虎',
          messageStatus: '已读',
          address: '上海市普陀区金沙江路 1518 弄',
          leavel:'故障'
        },
        {
          time: '2016-05-03',
          messageContent: '王小虎',
          messageStatus: '已读',
          address: '上海市普陀区金沙江路 1518 弄',
          leavel:'故障'
        },
        {
          time: '2016-05-03',
          messageContent: '王小虎',
          messageStatus: '已读',
          address: '上海市普陀区金沙江路 1518 弄',
          leavel:'故障'
        },
        {
          time: '2016-05-03',
          messageContent: '王小虎',
          messageStatus: '已读',
          address: '上海市普陀区金沙江路 1518 弄',
          leavel:'故障'
        },
        {
          time: '2016-05-03',
          messageContent: '王小虎',
          messageStatus: '已读',
          address: '上海市普陀区金沙江路 1518 弄',
          leavel:'故障'
        },
        {
          time: '2016-05-03',
          messageContent: '王小虎',
          messageStatus: '已读',
          address: '上海市普陀区金沙江路 1518 弄',
          leavel:'故障'
        }
      ],
      multipleSelection: []
    }
  },

  methods: {
    
   
  },
  async created() {
    this.limit = 10;
    await this.getTableData();
  }
}
</script>
<style lang="scss">
     .top-line{
            width: 3px;
            height: 16px;
            background: #007aff;
    }
</style>