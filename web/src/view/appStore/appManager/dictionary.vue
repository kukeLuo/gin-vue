<template>
  <div class="big">
    <el-row class="el-row">
      <el-col :span="20">
        <el-divider direction="vertical" class="top-line"></el-divider
        ><b style="fontSize: 20px">字典列表</b>
      </el-col>

    </el-row>

    <el-dialog
      :visible.sync="addDictionaryDialog"
      custom-class="dictionary-dialog"
      title="添加字典"
    >
      <el-form :rules="rules" ref="DictionaryForm" :model="dictionaryInfo">
        <el-form-item label="字典名称 " label-width="120px" prop="dictName">
          <el-input v-model="dictionaryInfo.dictName"></el-input>
        </el-form-item>
          <el-form-item label="字典键值 " label-width="120px" prop="dictKey">
          <el-input v-model="dictionaryInfo.dictKey"></el-input>
        </el-form-item>
        <el-form-item label="字典值" label-width="120px" prop="dictValue">
          <el-input v-model="dictionaryInfo.dictValue"></el-input>
        </el-form-item>
        <el-form-item label="字典所属应用" label-width="120px" prop="applicationName">
          <el-select v-model="dictionaryInfo.applicationName" placeholder="请选择">
            <el-option
              v-for="item in applications"
              :key="item.application_name"
              :label="item.application_name"
              :value="item.Id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态:" label-width="120px" prop="status">
          <b>是否启用:</b>
          <el-switch
          v-model="dictionaryInfo.status"
          :active-value ="true"
          :inactive-value ="false"
          active-text="是"
          inactive-text="否">
          </el-switch>
        </el-form-item>
           <el-form-item label="应用描述" label-width="120px" prop="description">
          <el-input v-model="dictionaryInfo.description"></el-input>
        </el-form-item>
      </el-form>
      <div class="dialog-footer" slot="footer">
        <el-button @click="closeDictionaryDialog">取 消</el-button>
        <el-button @click="enterDictionaryDialog" type="primary"
          >确 定</el-button
        >
      </div>
    </el-dialog>

   <el-dialog
      :visible.sync="updateDictionaryDialog"
      custom-class="dictionary-dialog"
      title="编辑字典"
    >
     <el-form :rules="rules" ref="DictionaryForm" :model="updateDictionaryInfo">
        <el-form-item label="字典名称 " label-width="120px" prop="dictName">
          <el-input v-model="updateDictionaryInfo.dictName"></el-input>
        </el-form-item>
          <el-form-item label="字典键值 " label-width="120px" prop="dictKey">
          <el-input v-model="updateDictionaryInfo.dictKey"></el-input>
        </el-form-item>
        <el-form-item label="字典值" label-width="120px" prop="dictValue">
          <el-input v-model="updateDictionaryInfo.dictValue"></el-input>
        </el-form-item>
        <el-form-item label="字典所属应用"    label-width="120px" prop="applicationName">
          <el-select  v-model="updateDictionaryInfo.applicationName" placeholder="请选择">
            <el-option
              v-for="item in applications"
              :key="item.application_name"
              :label="item.application_name"
              :value="item.Id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态:" label-width="120px" prop="status">
          <b>是否启用:</b>
          <el-switch
          v-model="updateDictionaryInfo.status"
          :active-value ="true"
          :inactive-value ="false"
          active-text="是"
          inactive-text="否">
          </el-switch>
        </el-form-item>
           <el-form-item label="应用描述" label-width="120px" prop="description">
          <el-input v-model="updateDictionaryInfo.description"></el-input>
        </el-form-item>
      </el-form>
      <div class="dialog-footer" slot="footer">
        <el-button @click="closeUpdateDictionaryDialog">取 消</el-button>
        <el-button @click="enterUpdateDictionaryDialog" type="primary"
          >确 定</el-button
        >
      </div>
    </el-dialog>

    <el-form :model="searchInfo" :inline="true">
      <el-form-item label="字典名：">
        <el-input
          placeholder="请输入搜索名"
          v-model="searchInfo.dictName"
        ></el-input>
      </el-form-item>
      <el-form-item label="状态：">
        <el-select v-model="searchInfo.status" placeholder="请选择">
          <el-option
            placeholder="请输入搜索名"
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button @click="onSubmit" type="primary">查询</el-button>
        <el-button type="primary" @click="addDictionary">添加字典</el-button>
      </el-form-item>
    </el-form>

    <!-- 组件列表 -->
    <el-table :data="tableData" border stripe>
      <el-table-column prop="dictName" label="字典名称" min-width="300">
      </el-table-column>
      <el-table-column prop="createdAt" label="创建日期" min-width="300">
      </el-table-column>
      <el-table-column prop="dictValue" label="字典值" min-width="300">
      </el-table-column>
      <el-table-column prop="applicationName" label="应用名称" min-width="300">
      </el-table-column>
      <el-table-column prop="status" label="状态" min-width="300">
        <template slot-scope="scope">{{
          formatStatus(scope.row.status)
        }}</template>
      </el-table-column>
      <el-table-column prop="operation" label="操作" min-width="300">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="small"
            @click="updateDictionary(scope.row)"
            >编辑</el-button
          >
          <el-popover placement="top" width="160" v-model="scope.row.visible">
            <p>确定要删除此字典吗</p>
            <div style="text-align: right; margin: 0">
              <el-button
                size="mini"
                type="text"
                @click="scope.row.visible = false"
                >取消</el-button
              >
              <el-button
                type="primary"
                size="mini"
                @click="deleteDictionary(scope.row)"
                >确定</el-button
              >
            </div>

            <el-button type="danger" size="small" slot="reference"
              >删除</el-button
            >
          </el-popover>
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


  </div>
</template>
<script>
import {
  getAppManagerList,
} from "@/api/appManager";
import {
  getSysDictionaryList,
  createSysDictionary,
  deleteSysDictionary,
  updateSysDictionary,
} from "@/api/sysDictionary";
import infoList from "@/mixins/infoList";
export default {
  name: "autoCode",
  mixins: [infoList],
  data() {
    return {
      value:false,
      listApi: getSysDictionaryList,
      options: [
        {
          value: "true",
          label: "是",
        },
        {
          value: "false",
          label: "否",
        },
      ],
      applications:[],
      buttonsValue: "",
    request:{
      label:"",
      id:""
    },
      addDictionaryDialog: false,
      updateDictionaryDialog: false,
      dictionaryInfo: {
        applicationName: "",
        description: "",
        dictKey: "",
        dictName: "",
        dictType: "",
        dictValue:"",
        status:true,
      },
      updateDictionaryInfo: {
        id: "",
        applicationName: "",
        description: "",
        dictKey: "",
        dictName: "",
        dictType: "",
        dictValue:"",
        status:"",
      },
      rules: {
        dictName: [
          { required: true, message: "请输入字典名称", trigger: "blur" },
        ],
        dictKey: [{ required: true,message: "请输入字典键值",trigger: "blur" }],
        dictValue: [{ required: true,message: "请输入字典值",trigger: "blur" }],
        applicationName: [{ required: true,message: "请选择字典所属应用",trigger: "blur" }],
      },
    };
  },
  components: {},
  methods: {
    dictionaryFunction(e){
     for (let i = 0; i < this.applications.length; i++) {  
     if(this.applications[i].Id==e){  
     this.request.label=this.applications[i].application_name,
     this.request.id=e
    }    
 }
    },
    addDictionary() {
      this.addDictionaryDialog = true;
      //获取所有应用
      let page = 1;
      let limit = 99;
      this.getApplicationList(page,limit)
    },
    closeDictionaryDialog() {
      this.$refs.DictionaryForm.resetFields();
      this.addDictionaryDialog = false;
    },

    closeUpdateDictionaryDialog() {
      this.updateDictionaryDialog = false;
    },

    //获取所有应用
    async getApplicationList(page ,limit){
    const res= await getAppManagerList({ page, limit})
    this.applications=res.data.data.applicationList
    },
    //添加字典
    async enterDictionaryDialog() {
      this.$refs.DictionaryForm.validate(async (valid) => {
        if (valid) {
          const res = await createSysDictionary(this.dictionaryInfo);
          console.log("添加字典:"+JSON.stringify(res.data));
          if (res.code == 200) {
            this.$message({ type: "success", message: "创建成功" });
          } else {
            this.$message({ type: "error", message: res.data.message });
          }
          await this.getTableData();
          this.closeDictionaryDialog();
        }
      });
    },
    //编辑字典
    async updateDictionary(row) {
    
      this.updateDictionaryDialog = true;
      let page = 1;
      let limit = 99;
      this.getApplicationList(page,limit)

      this.updateDictionaryInfo.applicationName = row.applicationName;
      this.updateDictionaryInfo.dictKey = row.dictKey;
      this.updateDictionaryInfo.dictName = row.dictName;
      this.updateDictionaryInfo.dictType = row.dictType;
      this.updateDictionaryInfo.dictValue = row.dictValue;
      this.updateDictionaryInfo.status = row.status;
      this.updateDictionaryInfo.id = row.id;
      this.updateDictionaryInfo.description = row.description;
    },

    async enterUpdateDictionaryDialog() {
      this.$refs.DictionaryForm.validate(async (valid) => {
        if (valid) {
          const res = await updateSysDictionary(this.updateDictionaryInfo);
          if (res.code == 200) {
            this.$message({ type: "success", message: "修改成功！" });
          } else {
            this.$message({ type: "error", message: res.data.message });
          }
          await this.getTableData();
          this.closeUpdateDictionaryDialog();
        }
      });
    },

    async deleteDictionary(row) {
      const res = await deleteSysDictionary(row.id);
      if (res.code == 0) {
        this.getTableData();
        row.visible = false;
      }
      await this.getTableData();
    },
    formatStatus: function (status) {
      switch (status) {
        case true:
          return "是";
        case false:
          return "否";
      }
    },

    //条件搜索
    onSubmit() {
      this.page = 1;
      this.limit = 10;
      this.getTableData();
    },
  },
  created() {
    this.getTableData();
  },
};
</script>
<style lang="scss" scoped>
.dictionary-dialog {
  .header-img-box {
    width: 80px;
    height: 200px;
    border: 1px dashed #ccc;
    border-radius: 20px;
    text-align: center;
    line-height: 200px;
    cursor: pointer;
  }
}
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
.top-line {
  width: 3px;
  height: 16px;
  background: #007aff;
}
</style>
