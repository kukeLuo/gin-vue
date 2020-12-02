<template>
    <div>
        <div>

          <el-row>
                <el-col :span="2"><label for="">应用搜索</label></el-col>
                <el-col :span="8">
                  <el-input
                      placeholder="请输入内容"
                      v-model="input"
                      clearable>
                  </el-input>
                </el-col>
                <el-col :span="2"><el-button type="primary" icon="el-icon-search"  @click="onSubmit" ></el-button></el-col>
            </el-row>

            <el-row style="margin-top: 20px">
                <el-col :span="2"><label for="">应用分类</label></el-col>
                <el-col :span="10">
                  <el-radio-group v-model="radioType"  @change="statusChange">
                    <el-radio-button label="0">全部</el-radio-button>
                    <el-radio-button label="4">已安装</el-radio-button>
                    <el-radio-button label="1">设备驱动</el-radio-button>
                    <el-radio-button label="2">系统服务</el-radio-button>
                    <el-radio-button label="3">场景应用</el-radio-button>
                  </el-radio-group>
                </el-col>
            </el-row>

        </div>
        <el-table
            :data="tableData.applicationList"
            style="margin-top: 20px">
           
            <el-table-column
            label="应用名称"
            min-width="350"
            prop="application_name">
            </el-table-column>
            
            <el-table-column
            label="状态"
            sortable>
             <template slot-scope="scope">{{scope.row.status|formatStatus}}</template>
            </el-table-column>
            <el-table-column
            label="添加时间"
            sortable
            >
                <template slot-scope="scope">{{scope.row.CreatedAt|formatData}}</template>
            </el-table-column>
        <el-table-column label="操作" min-width="150">
            
                
               

                <template slot-scope="scope" >
                    <div v-if="scope.row.status=='11' || scope.row.status=='1'">
                        <el-button type="text" size="small" @click="installApp(scope.row)">安装</el-button>
                    
                    </div>
                     <div v-else-if="scope.row.status=='0'">
                        <el-progress :percentage="progressNum"></el-progress>
                    
                    </div>
                     <div v-else="">
                        <el-button type="text" size="small" @click="goToSee(scope.row) ">查看</el-button>
                        <el-button type="text" size="small" @click="goToSetup(scope.row)">运行配置</el-button>
                        <el-button type="text" size="small" @click="stopApp(scope.row)" v-if="scope.row.status=='5'" >停用</el-button>
                        <el-button type="text" size="small" @click="enableApp(scope.row)" v-else="" >启用</el-button>
                        <el-button type="text" size="small" @click="uninstallApp(scope.row)">卸载</el-button>
                    </div>
                    
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

            <el-dialog :visible.sync="configDialog" custom-class="config-dialog" title="技能安装" width="440px">
              <el-form  ref="configForm" >
                <el-form-item label="License份数" label-width="120px" prop="originalConfig">
                  <el-input-number v-model="configNum" :min="1" :max="10" label="描述文字"></el-input-number>

                </el-form-item>
              </el-form>

              <div class="dialog-footer" slot="footer">
                  <el-button @click="closeConfigDialog">取 消</el-button>
                  <el-button @click="enterConfigDialog" type="primary">立即安装</el-button>
              </div>
    </el-dialog>
    </div>
        
</template>

<style>
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>

<script>

import infoList from "@/mixins/infoList";
import {getAppManagerList,stopApp,enableApp,uninstallApp,installApp,getProgressStatus} from "@/api/appManager";
  export default {
      name:'AppManager',
      mixins: [infoList],
       methods: {
        goToSee(row){
            //带参数跳转
            this.$router.push({
              name:"appDetail",
              params:{
                id:row.Id,
                skillId:row.skill_id,
                name:row.application_name
              }
            })
        },
        goToSetup(row){
            this.$router.push({
              name:"appConfig",
              params:{
                id:row.Id,
                skillId:row.skill_id,
                name:row.application_name
              }
            })
        },
        async stopApp(row){
          const res = await stopApp({
                skillId: row.skill_id,
                type:8
            });
            if (res.code == 200) {
                this.getTableData();
                this.$message({ type: "success", message: "成功" });
            }else{
                this.$message({ type: "fail", message: "失败" });
            }

        },
        async enableApp(row){
          const res = await enableApp({
                skillId: row.skill_id,
                type:5
            });
            if (res.code == 200) {
                this.getTableData();
                this.$message({ type: "success", message: "成功" });
            }else{
                this.$message({ type: "fail", message: "失败" });
            }

        },
         async uninstallApp(row){
          const res = await uninstallApp({
                skillId: row.skill_id,
                applicationType:row.application_type
            });
            if (res.code == 200) {
                this.getTableData();
                this.$message({ type: "success", message: "成功" });
            }else{
                this.$message({ type: "fail", message: "失败" });
            }

        },
        async installApp(row){
          if(row.application_type=='3'){
             this.installId=row.Id,
             this.installSkillId=row.skill_id,
               this.installType=row.application_type,
               this.configDialog = true
              
          }else{
            const res = await installApp({
                skillId: row.Id,
                applicationType:row.application_type

            });
            if (res.code == 200) {
                this.getTableData();
            }
          }
          
        },
        async getProgressStatus(){
           const res = await getProgressStatus({
                skillId: this.installSkillId,
                applicationType:this.installType
            });
            if (res.code == 200) {
                //如果成功的话就结束，否则就再次查询
                if(res.data.status=='0'){
                    this.getProgress();
                }else if(res.data.status=='2'){
                    this.endProgress();
                }else if(res.data.status=='1'){
                   clearInterval(this.queryTimer);
                   this.$message({ type: "fail", message: "安装失败" });
                   this.progressNum=0;
                   this.getTableData();
                }
                
            }
        },
        async enterConfigDialog(){
          this.configDialog=false;
          const res = await installApp({
                skillId: this.installId,
                applicationType:this.installType,
                channelNum:this.configNum,

            });
            if (res.code == 200) {
                this.getTableData();
                this.startProgress();
            }
        },
        closeConfigDialog(){
          this.configDialog=false;
          this.$refs.configForm.resetFields();
        },
         statusChange(val){
            this.page = 1
            this.limit = 10
            
            delete this.searchInfo.applicationName;
            if(val==1||val==2||val==3){
              this.searchInfo.applicationType=val
            }else if(val==4){
              this.searchInfo.status=2
            }else if(val==0){
              delete this.searchInfo.status;
              delete this.searchInfo.applicationType;
            
            }
            this.getTableData();
          },
           //条件搜索
          onSubmit() {
            this.page = 1
            this.limit = 10
            delete this.searchInfo.status;
            delete this.searchInfo.applicationType;
            this.searchInfo.applicationName=this.input;
            this.getTableData()
          },
          startProgress () {

                this.startTimer = setInterval(() => {
                    this.progressNum ++
                    if (this.progressNum > 90) {
                        clearInterval(this.startTimer)
                        this.getProgressStatus();

                    }
                }, 300); 
            },
            endProgress () {
                clearInterval(this.startTimer)
                clearInterval(this.queryTimer)
                this.endTimer = setInterval(() => {
                    this.progressNum ++
                    if (this.progressNum > 99) {
                        clearInterval(this.endTimer)
                        this.finishProgress()
                        this.progressNum=0;
                        this.getTableData();
                    }
                }, 10);
            },
            getProgress () {
                console.log("安装中没到100-----------");
                 clearInterval(this.queryTimer)
                this.queryTimer = setInterval(() => {
                        this.getProgressStatus();
                }, 10000); 
            },
            finishProgress () {
                this.$emit('finishProgress', false)
            }
       },
       async created() {
        this.limit = 10;
        await this.getTableData();
      },
      props: {
            progressStatus: {
                type: Boolean,
                default() {
                    return false
                }
            }
        },
        watch: {
            progressStatus (val) {
                if (val) {
                    this.endProgress()
                }
            }
        },
         mounted() {
           // this.startProgress()
        },
      filters: {
        formatStatus: function(status) {
          if (status != null) {
            if(status==0){
                return "安装中";
            }else if(status==11){
              return "未安装";
            }
            else if(status==1){
              return "安装失败";
            }else if(status==2){
              return "安装成功";
            }else if(status==3){
              return "启动中";
            }else if(status==4){
              return "启动失败";
            }else if(status==5){
              return "启动成功";
            }else if(status==6){
              return "停止中";
            }else if(status==7){
              return "停止失败";
            }else if(status==8){
              return "停止成功";
            }else if(status==9){
              return "卸载中";
            }else if(status==10){
              return "卸载失败";
            }else{
                return "未定义状态";
            }
          } else {
            return "未定义类型";
          }
        },
        formatData: function(str) {
          var date = new Date(str).toJSON();

          var newDate=new Date(+new Date(date)+8*3600*1000).toISOString().replace(/T/g,' ').replace(/\.[\d]{3}Z/,'');
          return newDate;

        }
      },
    data() {
      return {
        radioType: '0',
        input: '',
        listApi: getAppManagerList,
        configNum:1,
        configDialog:false,
        installId:'',
        installSkillId:'',
        installType:'',
        progressNum:0,
        startTimer: '',
        endTimer: '',
        queryTimer:''

      }
    }
  }
</script>

<style lang="scss">
     .el-button--goon {
        color: #FF9500;
     }
</style>