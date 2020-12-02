// table 纯前端示例
<template>
  <div>
    <div class="top">
        <el-divider direction="vertical" class=top-line></el-divider>
        
        <span class="top-text"><b>系统通知</b></span>
    </div>
     <el-row >
                <el-col :span="10">
                  <el-radio-group v-model="radio" @change="statusChange">
                    <el-radio-button label="-1">全部</el-radio-button>
                    <el-radio-button label="1">已读</el-radio-button>
                    <el-radio-button label="0">未读</el-radio-button>
                   
                  </el-radio-group>
                </el-col>
            </el-row>
        <el-table :data="tableData"  highlight-current-row
    @current-change="handleCurrentChange">
          <el-table-column
            label="序号"
            type="index"
            min-width="50">
          </el-table-column>
          <el-table-column property="messageContent" label="消息内容" min-width="300">
            <template slot-scope="scope">
            <el-row>
                <span >{{scope.row.eventName}}</span>
            </el-row>
            <el-row>
                <span>{{scope.row.description}}</span>
            </el-row>
            </template>
            
          </el-table-column>
          <el-table-column
            label="问题等级"
            min-width="120">
             <template slot-scope="scope">{{scope.row.eventLevel|formatLeavel}}</template>
          </el-table-column>
          <el-table-column
            min-width="100"
            label="时间">

             <template slot-scope="scope">{{scope.row.createdAt|formatData}}</template>
          </el-table-column>

          <el-table-column
           min-width="50"
            label="消息状态">
            <template slot-scope="scope">{{scope.row.readStatus|formatStatus}}</template>
          </el-table-column>
        </el-table>
        <el-pagination
            :current-page="page"
            :page-size="limit"
            :page-sizes="[10, 30, 50, 100]"
            :style="{float:'right',padding:'20px'}"
            :total="total"
            @current-change="handleCurrentChange"
            @size-change="handleSizeChange"
            layout="total, sizes, prev, pager, next, jumper"
            ></el-pagination>

             <el-dialog :visible.sync="dialogFormVisible" title="消息详情" width="440px" >
                <el-form ref="elForm" :model="formData"  size="medium" label-width="110px">
                    <el-form-item label="策略名称:" prop="ruleName">
                         <template slot-scope="scope">{{formData.eventName}}</template>
                    </el-form-item>
                    <el-form-item label="问题等级:" prop="ruleName">
                         <template slot-scope="scope">{{formData.eventLevel |formatLeavel }}</template>
                    </el-form-item>
                    <el-form-item label="时间:" prop="ruleName">
                         <template slot-scope="scope">{{formData.createdAt|formatData}}</template>
                    </el-form-item>
                    <el-form-item label="消息内容:" prop="ruleName">
                         <template slot-scope="scope">{{formData.description}}</template>
                    </el-form-item>
                </el-form>
      
            <div class="dialog-footer" slot="footer">
                <el-button @click="enterDialog" type="primary">确定</el-button>
            </div>
            </el-dialog>
  </div>
</template>

<script>
import {
  getNewsList,
  getDetailNews
} from "@/api/news";
import infoList from "@/mixins/infoList";
export default {
  name: 'SystemNews',
  mixins: [infoList],
  data() {
    return {
        radio: '-1',
      listApi: getNewsList,
      dialogFormVisible:false,
      formData: {
        id: "",
        eventName: "",
        deviceName: "",
        description: "",
        eventLevel: "",
        createdAt: "",
        notificationType: ""
      },
      multipleSelection: []
    }
  },
  filters: {
    formatStatus: function(status) {
      if (status != null) {
        return status==1 ? "已读" :"未读";
      } else {
        return "";
      }
    },
    formatData: function(str) {
      var date = new Date(str).toJSON();

      var newDate=new Date(+new Date(date)+8*3600*1000).toISOString().replace(/T/g,' ').replace(/\.[\d]{3}Z/,'');
       return newDate;

    },
    formatLeavel: function(leavel) {
      if (leavel != null) {
          if(leavel==1){
            return "一般";
          }else if(leavel==2){
            return "提醒";
          }else if(leavel==3){
            return "紧急";
          }else{
                 return "未定义类型";
          }
        
      } else {
        return "";
      }
    }
  },
  methods: {

    statusChange(val){
     
        this.page = 1
        this.limit = 10
        this.searchInfo.readStatus=val
        if(val=='-1'){
           delete this.searchInfo.readStatus;
        }
        this.getTableData();
    },
    setCurrent(row) {
        this.$refs.singleTable.setCurrentRow(row);
      },
     async handleCurrentChange(val) {
        console.log("--------------"+JSON.stringify(val.id));
            if(val.id==undefined){
                return;
            }
            const res = await getDetailNews({
                ID: val.id,
            });
            if (res.code == 200) {
                this.formData=res.data;
                
                this.dialogFormVisible=true;
                this.currentRow = val;
            }


      },
      enterDialog() {
        this.dialogFormVisible = false;
        this.getTableData();
      },
   
  },
  async created() {
    this.limit = 10;
    await this.getTableData();
  }
};
</script>
<style lang="scss">
     .top-line{
            width: 3px;
            height: 16px;
            background: #007aff;
    }
</style>