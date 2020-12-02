<template>

<div>
    <div class="top" >
          <div class="button-box clearflex">

          <el-divider direction="vertical" class="top-line"></el-divider>
          
          <span class="top-text" ><b>服务器注册</b></span>

          <el-form :model="formData" width="300px">
            <el-form-item label="云端同步地址" :label-width="formLabelWidth">
            <el-col :span="8">
                <el-input v-model="formData.brcServerUrl"></el-input>
            </el-col>
            </el-form-item>

            <el-form-item label="项目名称" :label-width="formLabelWidth">
            <el-col :span="8">
                <el-input v-model="formData.projectName"></el-input>
            </el-col>
            </el-form-item>

            <el-form-item label="资源收集间隔时间(s)" :label-width="formLabelWidth">
            <el-col :span="8">
                <el-input v-model="formData.metricsCollectCron"></el-input>
            </el-col>
            </el-form-item>
        
        </el-form>

       
    </div>
         <div  style="float: right; margin-right:250px;width:50%">
            <el-button type="primary" @click="saveConfig()" style="">保 存</el-button>

        </div>
 </div>
  </div>
</template>

<script>
import {getConfig,saveConfig} from "@/api/config";
import infoList from "@/mixins/infoList";
export default {
  name: 'Configuration',
  mixins: [infoList],
  data() {
    return {
        formData: {
          brcServerUrl: "",
          projectName: "",
          metricsCollectCron: "",
        },
        formLabelWidth: '150px',
    }
  },
     methods: {
       
        getServeConfig() {
            getConfig({}).then((ele) => {
                
                if(ele.code==200){
                    this.formData=ele.data;
                }
            });
        },
        async saveConfig(){
            const res = await saveConfig(this.formData)
                if (res.code == 200) {
                   //  this.formData=res.data;
                this.$message({
                    type: 'success',
                    message: '保存成功'
                })
              //  this.getServeConfig();
             }
        }
    },
 
    created() {
        this.getServeConfig();
    },
};
</script>
<style lang="scss">
     .top-line{
            width: 3px;
            height: 16px;
            background: #007aff;
    }
     .button-box {
      padding: 10px 20px;
      
      .el-button {
        float: right;
      }
    }
</style>