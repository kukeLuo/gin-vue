<template>
   <div>

        <el-table :data="tableData" border stripe>
       <el-table-column label="是否启用" prop="switch" width="80">
        <template slot-scope="scope">
          <el-switch  v-model="scope.row.status"
          :active-value="1"
          :inactive-value="0"
          @change="changeSwitch( $event,scope.row,scope.$index)"
          >
          
          
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="告警名称" min-width="60" prop="ruleName"></el-table-column>
      <el-table-column label="规则描述" min-width="150" prop="description"></el-table-column>
   

      <el-table-column label="告警等级" prop="alertLevel" width="100">

          <template slot-scope="scope">{{scope.row.alertLevel|formatBoolean}}</template>
      </el-table-column>

      <el-table-column label="推送方式" min-width="100" prop="notificationType">
         <template slot-scope="scope">{{scope.row.notificationType|formatString}}</template>
      </el-table-column>
      
      <el-table-column label="操作" min-width="50">
      
      
        <template slot-scope="scope">
        <el-button type="text" size="small" @click="updateRules(scope.row)">编辑</el-button>
        
        </template>
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
        <el-dialog :before-close="closeDialog" :visible.sync="dialogFormVisible" title="编辑基础监控" width="540px" >
      <el-form ref="elForm" :model="formData"  size="medium" label-width="110px">
      <el-form-item label="策略名称" prop="ruleName">
        <el-input v-model="formData.ruleName" :disabled="true"
        placeholder="" clearable :style="{width: '90%'}" size="small"></el-input>
      </el-form-item>
      <el-form-item label="告警规则:" prop="type">
            

              <el-col  :span="10">
                  <div>
                      <label>CPU持续</label>
                      <el-input v-model.number="formData.duration" :style="{width: '40%'}" onkeyup="value=value.replace(/[^\d]/g,'')" size="mini"></el-input>
                      <label>s</label>
                  </div>  
              </el-col>
               <el-col  :span="10">  
                  <div>
                      <label>占用率超过</label>
                      <el-input v-model.number="formData.usageRate" :style="{width: '40%'}" onkeyup="value=value.replace(/[^\d]/g,'')" size="mini"></el-input>
                      <label>%</label>
                  </div> 
              </el-col>
        
      </el-form-item>
      <el-form-item label="告警等级" prop="status" required>
        <template>
            <el-radio-group v-model="formData.alertLevel">
              <el-radio :label="1">一般</el-radio>
              <el-radio :label="2">提醒</el-radio>
              <el-radio :label="3">紧急</el-radio>
            </el-radio-group>
        </template>
      </el-form-item>
      <el-form-item label="通知方式:" prop="desc">
          <template>
              <el-checkbox-group v-model="checkList">
                <el-checkbox label="2">短信</el-checkbox>
                <el-checkbox label="3">大屏</el-checkbox>
                <el-checkbox label="1">邮箱</el-checkbox>
              </el-checkbox-group>
          </template>
      </el-form-item>
    </el-form>
      
      <div class="dialog-footer" slot="footer">
        <el-button @click="closeDialog">取 消</el-button>
        <el-button @click="commitDialog" type="primary">提 交</el-button>
      </div>
    </el-dialog>
   </div>
</template>

<script>
// 获取列表内容封装在mixins内部  getTableData方法 初始化已封装完成

import {
  getRulesList,
  getRulesDetail,

  updateRulesStatus,
  commitRules
} from "@/api/push";
import infoList from "@/mixins/infoList";
export default {
  name: "Push",
  mixins: [infoList],
  data() {
    return {
      checkFlag: false,
      listApi: getRulesList,
      dialogFormVisible: false,
      dialogTitle: "新增菜单",
      alertLevel: '',
      checkList: [],
      formData: {
        id: "",
        status: "",
        ruleName: "",
        ruleType: "",
        description: "",
        duration: "",
        usageRate: "",
        alertLevel: "",
        notificationType: ""
      },
      menuOption: [
        {
          id: "0",
          title: "根菜单"
        }
      ],
      form: {
        id: 0,
        path: "",
        name: "",
        hidden: "",
        parentId: "",
        component: "",
        meta: {
          title: "",
          icon: "",
          defaultMenu: false,
          keepAlive: false
        },
        parameters: []
      },
      
    };
  },

  filters: {

    formatBoolean: function(bool) {
      if (bool != null) {
        if(bool===1){
          return "一般";
        }else if (bool===2){
             return "提醒";
        }else if(bool===3){
          return "紧急";
        }else{
          return "未定义类型";
        }
      } else {
        return "";
      }
    },
    formatString: function(string) {
      var pushMode="";
      if(string.indexOf(",") != -1){
        var stringSplit=string.split(",");
        for(var i=0;i<stringSplit.length;i++){
          
          if (stringSplit[i] != null) {
            console.log("--------------------"+stringSplit[i]);

            if(stringSplit[i] ==1){
              if(pushMode===""){

                    pushMode="邮件通知";
                  }else{

                    pushMode=pushMode+"、"+"邮件通知";
                  }
             
            }else if (stringSplit[i] ==2){

                  if(pushMode===""){

                      pushMode="钉钉通知";
                  }else{

                    pushMode=pushMode+"、"+"钉钉通知";
                  }
            }else if(stringSplit[i] ==3){
              if(pushMode===""){
                      pushMode="大屏通知";
                  }else{
                    pushMode=pushMode+"、"+"大屏通知";
                  }
            }else{
              return "未定义类型";
            }
          } else {
            return "";
          }
        }
      }else{
          if(string==3){
            pushMode="大屏通知";
          }else if(string==2){
              pushMode="钉钉通知";
          }else if(string==1){
             pushMode="邮件通知";
          }else{
              pushMode="未定义类型";
          }
      }


      return pushMode;
    }
  },
  methods: {
    async updateRules(row) {

      const res = await getRulesDetail({ id: row.id });
      this.checkList=new Array();
      if (res.code == 200) {
        this.formData = res.data;
        this.dialogFormVisible = true;
        var type=res.data.notificationType;
        if(type.indexOf(",") != -1){
           var stringSplit=type.split(",");
             for(var i=0;i<stringSplit.length;i++){
               this.checkList.push(stringSplit[i]);
             }
        }else{
          this.checkList.push(type);
        }
      }
    },
    async changeSwitch(data,row,index) {
      console.log("----------2----------------------"+JSON.stringify(data)+"---3--"+JSON.stringify(row));
      const res = await updateRulesStatus({
        id: row.id,
        row: row
      });
      if (res.code == 200) {
        let newData=row;
        newData.status=newData.status==0?0:1;
        this.tableData[index]=newData;
        this.$message({ type: "success", message: "状态修改成功" });
      }else{
        let newData=row;
        newData.status=newData.status==1?0:1;
        this.tableData[index]=newData;
         this.$message({ type: "fail", message: "状态修改失败" });
      }
    },
     
    handleClose(done) {
      done();
    },
    // 关闭弹窗
    closeDialog() {
      this.$refs.elForm.resetFields();
      this.dialogFormVisible = false;
    },
    async commitDialog(){
       this.formData.notificationType=this.checkList.join(',');
       const res = await commitRules(this.formData);
      if (res.code == 200) {
        this.getTableData();
      }
      this.closeDialog();

    }
    
  },
  async created() {
    this.limit = 10;
    await this.getTableData();
  }
};
</script>
<style scoped lang="scss">
.button-box {
  padding: 10px 20px;
  .el-button {
    float: right;
  }
}
.warning {
  color: #dc143c;
}
</style>
