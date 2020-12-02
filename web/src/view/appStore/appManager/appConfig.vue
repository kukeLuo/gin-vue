<template>
  <div>
    <div class="top">
        <el-divider direction="vertical" class=top-line></el-divider>
        
        <span class="top-text" id="title">{{this.skillName}}</span>
                
    </div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="列表" name="first">
        
        <el-table :data="tableData" >
  
      <el-table-column label="视频源名称" min-width="60" prop="deviceName"  align="center"></el-table-column>
      <el-table-column label="视频源ID" min-width="100" prop="id"  align="center"></el-table-column>
      <el-table-column label="视频源状态" min-width="80"   align="center">
        <template slot-scope="scope">{{scope.row.status|formatStatus}}</template>
      </el-table-column>
 
      
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
        </el-tab-pane>
        <el-tab-pane label="运行时配置" name="second">

          <el-row style="margin-left: 40px" :gutter="20">
                    <template v-for="(item, index) in dictionaries">
                        <el-col :span="6" :key="index" class="el-col-margin-top">
                            <span >{{item.dict_key}}</span>
                        </el-col>
                        <el-col :span="15" :key="index" class="el-col-margin-top" v-if="item.dict_key=='camera_names'">
                        
                                <el-select v-model="cameraName" placeholder="请选择">
                                     
                                     <el-option
                                         v-for="(item2, index2) in item.dict_value"
                                          :key="item2.flag"
                                          :label="item2.cameraName"
                                          :value="item2.cameraName">
                                    </el-option>
                              </el-select>
                          </el-col>
                           <el-col :span="15" :key="index" class="el-col-margin-top" v-else>
                               <el-input v-model="item.dict_value" class="input-value" ></el-input>
                          </el-col>
                            
                        
                    </template>
                </el-row>
        <el-button type="primary" @click="commitConfig()">提 交</el-button>
        </el-tab-pane>
        <el-tab-pane label="日志" name="third">
         <div  class="flow-text-style" v-text="`${this.logData}`"></div>
        
        </el-tab-pane>
    </el-tabs>

    <el-dialog title="运行配置" :visible.sync="dialogFormVisible" width="560px">
        <el-form :model="form">
            <el-form-item label="IPC_address:" :label-width="formLabelWidth">
            <el-input v-model="form.address"></el-input>
            </el-form-item>
            <el-form-item label="camera_name" :label-width="formLabelWidth">
            <el-select v-model="form.camera" placeholder="请选择照相机"></el-select>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="dialogFormVisible = false">提 交</el-button>
            <el-button @click="dialogFormVisible = false">取 消</el-button>

        </div>
    </el-dialog>
  </div>
</template>


<script>
// 获取列表内容封装在mixins内部  getTableData方法 初始化已封装完成
const path = process.env.VUE_APP_BASE_API;

import infoList from "@/mixins/infoList";
import {getAppConfigList,getLog,getDictionaries,commitConfig} from "@/api/appManager";
import { mapGetters } from "vuex";
export default {
  name: "Api",
  mixins: [infoList],
  data() {
    return {
      dialogFormVisible:false,
      listApi: getAppConfigList,
      path: path,
      routerParams:"",
      logData:"",
      skillName:"",
      skillId:"",
      cameraName:"",
      activeName: 'first',
      dictionaries: [{
        dict_value:"",
        dict_key:""
      }],
      dictValue: [{
        cameraName:"",
        flag:""
      }],

      modifyTableData:[{
           videoName:'旷世01',
           videoId:'20192029190920',
           videoStatus:'离线'
      }],
      logTableData:[{
            operContent:'绑定设备',
            results:'成功',
            operTime:'2020-11-11 20:00:00',
            operPeople:'luo',
      }],
      form: {
          address: '',
          camera: '',
      },

       formLabelWidth: '120px',
      
    };
  },
  computed: {
    ...mapGetters("user", ["token"])
  },
  async created() {
        this.getParams();
        this.searchInfo.applicationId=this.routerParams;
 
        this.limit = 10;
        await this.getTableData();
        this.getDictionaries();
        this.getLog();
  },
  filters: {
        formatStatus: function(status) {
          if (status != null) {
            if(status==0){
                return "初始化";
            }else if(status==1){
              return "在线";
            }else if(status==3){
              return "离线";
            }else if(status==8){
              return "异常";
            }else{
              return "未知状态";
            }
           
          } else {
            return "未知状态类型";
          }
        },
        formatValue:function(value){
            if(value==1){

            }
        }
      },
  methods: {
     async commitConfig() {
       let obj = {};
        this.dictionaries.forEach(item => {
            let key = item.dict_key;

          if(key!='camera_names'){
            obj[key] = item.dict_value;
          }
          if(this.cameraName!=""){
            let key = 'cameraName';
            obj[key] = this.cameraName;
          }
        })
          const res = await commitConfig({
            obj : obj,
             skillId: this.skillId,
          });
        if (res.code == 200) {
           this.$message({
              type: "success",
              message: "修改成功!"
            });
        }
      },
 
      async getLog(){
        const res = await getLog  ({
                skillId: this.skillId,
                skillName:this.skillName,
            });
            if (res.code == 200) {
                this.logData=res.data;
                       
            }
      },
      async getDictionaries(){
        const res = await getDictionaries  ({skillId:this.skillId});
            if (res.code == 200) {
              this.dictionaries=res.data.data;
               


              res.data.data.forEach((element) => {
              
                if(Array.isArray(element.dict_value)){
                  this.dictValue=element.dict_value;
                }
              });
              this.dictValue.forEach((element) => {
                  console.log("----------2------------"+element.flag);
                  if(element.flag=='1'){
                      this.cameraName=element.cameraName;
                  }
              });
              
            }
      },
      getParams(){
        // 取到路由带过来的参数
         this.routerParams = this.$route.params.id,
         this.skillName = this.$route.params.name,
         this.skillId = this.$route.params.skillId
      },
      handleClick(tab, event) {
        console.log("------------------------"+tab+JSON.stringify(event));
      },
      editConfig(row){
        this.dialogFormVisible = true;
      },
     // 删除菜单
      deleteConfig(ID) {
        this.$confirm("此操作将永久删除该配置, 是否继续?", "提示", {
            cancelButtonText: "取消",
            confirmButtonText: "确定",
            type: "warning"
        })
        .then(async () => {
          const res = await deleteBaseMenu({ ID });
          if (res.code == 200) {
            this.$message({
              type: "success",
              message: "删除成功!"
            });
            this.getTableData();
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
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
    .el-col-margin-top{
          margin-top:5px;
      }
    .input-value {
        float: left;
        line-height: 65px !important;
        margin-left: 10px;
        color: darkblue;
        line-height: 100px;
        font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
            "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
    }
</style>