<template>
  <div>
    <div class="top" >
          <div class="button-box clearflex">

          <el-divider direction="vertical" class="top-line"></el-divider>
          
          <span class="top-text" ><b>服务器注册</b></span>
           <el-button  >批量删除</el-button>

            <el-button type="primary" icon="el-icon-plus" @click="addConfig()">新增</el-button>

          </div>
        <el-table
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange">
          <el-table-column
              type="selection"
              width="55">
          </el-table-column>
          <el-table-column label="云端同步地址" min-width="60" prop="brcServerUrl"  align="center"></el-table-column>
          <el-table-column label="项目名称" min-width="100" prop="projectName"  align="center"></el-table-column>
          <el-table-column label="资源收集间隔时间(s)" min-width="80" prop="metricsCollectCron"  align="center"></el-table-column>
    
          <el-table-column label="操作" min-width="50" align="center">
            <template slot-scope="scope">
            <el-button type="text" size="small" @click="editConfig(scope.row)">编辑</el-button>
            <el-divider direction="vertical"></el-divider>
            <el-button type="text" size="small" @click="deleteConfig(scope.row.ID)">删除</el-button>         
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
            layout="total, sizes, prev, pager, next, jumper">
        </el-pagination>
        <el-dialog title="新增服务器" :visible.sync="addConfigDialog" width="490px">
          <el-form :model="dialogData">
            <el-form-item label="云端同步地址" :label-width="formLabelWidth">
            <el-input v-model="dialogData.address"></el-input>
            </el-form-item>

            <el-form-item label="项目名称" :label-width="formLabelWidth">
            <el-input v-model="dialogData.name"></el-input>
            </el-form-item>

            <el-form-item label="资源收集间隔时间(s)" :label-width="formLabelWidth">
            <el-input v-model="dialogData.time"></el-input>
            </el-form-item>
        
        </el-form>
            <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="commitConfig()">提 交</el-button>
            <el-button @click="cancelConfig()">取 消</el-button>

        </div>
        </el-dialog>
    </div>

  </div>
</template>

<script>
import {getConfigList,addConfig} from "@/api/config";
import infoList from "@/mixins/infoList";
export default {
  name: 'Configuration',
  mixins: [infoList],
  data() {
    return {
      radio: '0',
      listApi: getConfigList,
      addConfigDialog:false,
      dialogData: {
          address: "",
          name: "",
          time: "",
        },
     
      multipleSelection: [],
      formLabelWidth: '150px',
    }
  },
  
  methods: {

    
      async commitConfig() {
        this.addConfigDialog = false;
          const res = await addConfig();
        if (res.code == 200) {
          this.getTableData();
        }
      },
       handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      addConfig(){
        this.addConfigDialog = true;
      },
      cancelConfig(){
        console.log("-----------------222");
        this.addConfigDialog = false;
      },
      async deleteConfig(ID){
        const res = await deleteConfig({ ID: ID })
        if (res.code == 200) {
          this.$message({
            type: 'success',
            message: '删除成功'
          })
          this.getTableData()
        }
      },
      async editConfig(row){
        const res = await deleteConfig({ ID: ID })
        if (res.code == 200) {
          this.$message({
            type: 'success',
            message: '删除成功'
          })
          this.getTableData()
        }
      }
   
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
     .button-box {
      padding: 10px 20px;
      
      .el-button {
        float: right;
      }
    }
</style>