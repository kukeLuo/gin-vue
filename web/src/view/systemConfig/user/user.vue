<template>
  <div>
      <div class="search-term">
      <el-form :inline="true" :model="searchInfo" class="demo-form-inline">
        <el-form-item label="账户/姓名">
          <el-input placeholder="请输入账户/姓名" v-model="searchInfo.username"></el-input>
        </el-form-item>
     
        <el-form-item label="角色">
          <el-select  placeholder="全部" v-model="searchInfo.authorityId">
            <el-option
                    key=""
                    label="全部"
                    value="">
                </el-option>
                <el-option
                    key="1"
                    label="应用管理员"
                    value="1">
                </el-option>
                <el-option
                    key="2"
                    label="运维管理员"
                    value="2">
                </el-option>
          </el-select>
        </el-form-item>


        <el-form-item label="是否启用">
          <el-select  placeholder="全部" v-model="searchInfo.status">
               <el-option
                    key=""

                    label="全部"
                    value="">
                </el-option>
                <el-option
                    key="true"
                    label="是"
                    value="true">
                </el-option>
                <el-option
                    key="false"
                    label="否"
                    value="false">
                </el-option>

          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button @click="onSubmit" type="primary">查 询</el-button>
        </el-form-item>
        <div  style="float: right; margin-right:20px">

          <el-form-item>
            <el-button @click="addUser" type="primary">新 增</el-button>
      
          </el-form-item>
        </div>

      </el-form>
    </div>
    <el-table :data="tableData" :cell-style="cellStyle" border stripe >
  
      <el-table-column label="序号" type="index" width="50">
          </el-table-column>
      <el-table-column label="账户" min-width="100" prop="userName"></el-table-column>
      <el-table-column label="姓名" min-width="80" prop="realName"></el-table-column>
      <el-table-column label="用户角色" min-width="100" prop="authorityId">
          <template slot-scope="scope">{{scope.row.authorityId|formatAuthority}}</template>
      </el-table-column>
         

      <el-table-column label="手机号" min-width="100" prop="phone"></el-table-column>
      <el-table-column label="邮箱" min-width="120" prop="email"></el-table-column>
      <el-table-column label="是否启用" prop="switch" width="80">
        <template slot-scope="scope">
          <el-switch  
          v-model="scope.row.status"
          :active-value="true"
          :inactive-value="false"
          @change="changeSwitch( $event,scope.row,scope.$index)">
          
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="150" >
     
        <template slot-scope="scope">
        <el-button type="text" size="small" @click="updateUser(scope.row)">
            <div style="color: #1677FF">编辑</div>
        </el-button>
        <el-button type="text" size="small" @click="updatePassword(scope.row)">
            <div style="color: #1677FF">修改密码</div>
        </el-button>
        <el-button type="text" size="small" @click="deleteUser(scope.row.ID)" >
            <div style="color: #FF3B30">删除</div>
        </el-button>
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



    <el-dialog :visible.sync="updatePasswordDialog" custom-class="password-dialog" title="修改密码" width="440px">
      <el-form :rules="rules" ref="passwordForm" :model="passwordInfo">
        <el-form-item label="请输入原密码" label-width="120px" prop="originalPassword">
          <el-input v-model="passwordInfo.originalPassword"></el-input>
        </el-form-item>
        <el-form-item label="请输入新密码" label-width="120px" prop="newPassword">
          <el-input v-model="passwordInfo.newPassword"></el-input>
        </el-form-item>
        <el-form-item label="再次确认新密码" label-width="120px" prop="confirmNewPW">  
          <el-input v-model="passwordInfo.confirmNewPW"></el-input>
        </el-form-item>
      </el-form>

      <div class="dialog-footer" slot="footer">
          <el-button @click="closePasswordDialog">取 消</el-button>
          <el-button @click="enterPasswordDialog" type="primary">确 定</el-button>
      </div>
    </el-dialog>




    <el-dialog :visible.sync="addUserDialog" custom-class="user-dialog" title="新建账号" width="540px">
      <el-form :rules="rules" ref="userForm" :model="userInfo">
        <el-form-item label="账户" label-width="120px" prop="userName">
          <el-input v-model="userInfo.userName"></el-input>
        </el-form-item>
        <el-form-item label="请输入密码" label-width="120px" prop="password">
          <el-input v-model="userInfo.password" show-password></el-input>
        </el-form-item>
        <el-form-item label="再次确认密码" label-width="120px" prop="confirmPassword">  
          <el-input v-model="userInfo.confirmPassword" show-password></el-input>
        </el-form-item>
       <!-- <el-form-item label="头像" label-width="100px">
          <div style="display:inline-block" @click="openHeaderChange">
            <img class="header-img-box" v-if="userInfo.headerImg" :src="userInfo.headerImg" />
            <div v-else class="header-img-box">从媒体库选择</div>
          </div>
        </el-form-item>-->
        <el-form-item label="用户角色" label-width="120px" prop="authorityId">
     
          <el-cascader
            @change="changeAuthority(scope.row)"
            v-model="userInfo.authorityId"
            :options="authOptions"
            :show-all-levels="false"
            :props="{ checkStrictly: true,label:'authorityName',value:'authorityId',disabled:'disabled',emitPath:false}"
            filterable
          ></el-cascader>
        </el-form-item>
           <el-form-item label="姓名" label-width="120px" prop="realName">
          <el-input v-model="userInfo.realName"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" label-width="120px" prop="email">
          <el-input v-model="userInfo.email"></el-input>
        </el-form-item>
        <el-form-item label="手机号" label-width="120px" prop="phone">
          <el-input v-model="userInfo.phone"></el-input>
        </el-form-item>
      </el-form>
      <div class="dialog-footer" slot="footer">
        <el-button @click="closeAddUserDialog">取 消</el-button>
        <el-button @click="enterAddUserDialog" type="primary">确 定</el-button>
      </div>
    </el-dialog>
     <el-dialog :visible.sync="updateUserDialog" custom-class="user-dialog" title="编辑用户" width="540px">
      <el-form :rules="rules" ref="updateForm" :model="formInfo">
        <el-form-item label="账户" label-width="120px" prop="userName">
          <el-input v-model="formInfo.userName"></el-input>
        </el-form-item>
        <el-form-item label="用户角色" label-width="120px" prop="authorityId">
     
          <el-cascader
            @change="changeAuthority(scope.row)"
            v-model="formInfo.authorityId"
            :options="authOptions"
            :show-all-levels="false"
            :props="{ checkStrictly: true,label:'authorityName',value:'authorityId',disabled:'disabled',emitPath:false}"
            filterable
          ></el-cascader>
        </el-form-item>
           <el-form-item label="姓名" label-width="120px" prop="realName">
          <el-input v-model="formInfo.realName"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" label-width="120px" prop="email">
          <el-input v-model="formInfo.email"></el-input>
        </el-form-item>
        <el-form-item label="手机号" label-width="120px" prop="phone">
          <el-input v-model="formInfo.phone"></el-input>
        </el-form-item>
      </el-form>
      <div class="dialog-footer" slot="footer">
        <el-button @click="closeUpdateDialog">取 消</el-button>
        <el-button @click="enterUpdateDialog" type="primary">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>


<script>
// 获取列表内容封装在mixins内部  getTableData方法 初始化已封装完成
const path = process.env.VUE_APP_BASE_API;
import {
  getUserList,
  setUserAuthority,
  register,
  deleteUser,
  updateUserStatus,
  updateUser,
  changePassword,
  getUserInfoById,
  updateUserInfo
} from "@/api/user";
import infoList from "@/mixins/infoList";
import { mapGetters } from "vuex";
import {validatePhone,validateEMail} from "@/utils/validate";
export default {
  name: "Api",
  mixins: [infoList],
  data() {
    return {
      listApi: getUserList,
      path: path,
      authOptions: [],
      addUserDialog: false,
      updateUserDialog:false,
      userInfo: {
        userName: "",
        password: "",
        confirmPassword: "",
        headerImg: "",
        authorityId: "",
        realName:"",
        email:"",
        phone:""
      },
      formInfo: {
        userName: "",
        authorityId: "",
        realName:"",
        email:"",
        phone:""
      },
      rules: {
        userName: [
          { required: true, message: "请输入账户名", trigger: "blur" },
          { min: 5, message: "最低5位字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, message: "最低6位字符", trigger: "blur" },
        

        ],
        confirmPassword: [
          { required: true, message: "请再次确认密码", trigger: "blur" },
           { min: 6, message: "最低6位字符", trigger: "blur" },
          {
            validator: (rule, value, callback) => {
              if (value !== this.userInfo.password) {
                callback(new Error('两次密码不一致'))
              } else {
                callback()
              }
            },
            trigger: 'blur'
          }

        ],
        authorityId: [
          { required: true, message: "请选择用户角色", trigger: "blur" }
        ],
        realName: [
          { required: true, message: "请输入姓名", trigger: "blur" }
        ],
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          { validator:validateEMail, trigger: "blur"}

        ],
        phone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { validator:validatePhone, trigger: "blur"}
        ],
        originalPassword:[
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, message: "最低6位字符", trigger: "blur" },
        ],
        newPassword: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, message: "最低6位字符", trigger: "blur" },
        ],
        confirmNewPW:[
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, message: "最低6位字符", trigger: "blur" },
          {
            validator: (rule, value, callback) => {
              if (value !== this.passwordInfo.newPassword) {
                callback(new Error('两次密码不一致'))
              } else {
                callback()
              }
            },
            trigger: 'blur'
          }
        ]
      },
      updatePasswordDialog:false,
      passwordInfo: {
        originalPassword: "",
        newPassword: "",
        confirmNewPW: "",
      },
      userName:"",
      id:"",
    };
  },
  computed: {
    ...mapGetters("user", ["token"])
  },
  filters: {
    formatBoolean: function(bool) {
      if (bool != null) {
        return bool ? "正常" :"不正常";
      } else {
        return "";
      }
    },
    formatAuthority:function(authority){
      if (authority != null) {
        return authority=='1' ? "应用管理员" :"运维管理员";
      } else {
        return "";
      }
    }
  },
  methods: {
    
    async changeSwitch(data,row,index) {
     
      const res = await updateUserStatus({
        ID: row.ID,
        row: row
      });
      if (res.code == 200) {
        let newData=row;
        newData.status=newData.status==true?true:false;
        this.tableData[index]=newData;
        this.$message({ type: "success", message: "状态修改成功" });
      }else{
        let newData=row;
        newData.status=newData.status==true?false:true;
        this.tableData[index]=newData;
         this.$message({ type: "fail", message: "状态修改失败" });
      }
    },
    async updateUser(row){
        const res = await getUserInfoById({ ID: row.ID });
        if (res.code ==200) {
          this.formInfo = res.data;
          this.updateUserDialog = true;
        }
    },
    openHeaderChange(){
      this.$refs.chooseImg.open()
    },
    setOptions(authData) {
      this.authOptions = [];
      this.setAuthorityOptions(authData, this.authOptions);
    },
    setAuthorityOptions(AuthorityData, optionsData) {
      AuthorityData &&
        AuthorityData.map(item => {
          if (item.children && item.children.length) {
            const option = {
              authorityId: item.authorityId,
              authorityName: item.authorityName,
              children: []
            };
            this.setAuthorityOptions(item.children, option.children);
            optionsData.push(option);
          } else {
            const option = {
              authorityId: item.authorityId,
              authorityName: item.authorityName
            };
            optionsData.push(option);
          }
        });
    },
    //删除用户
     deleteUser(ID) {
        this.$confirm("删除该用户可能带来无法预测的后果，您确定删除该用户吗？?", "确认要删除这条信息吗？", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
        })
        .then(async () => {
          const res = await deleteUser({ ID });
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
    //添加用户
    async enterAddUserDialog() {
  
      this.$refs.userForm.validate(async valid => {
        if (valid) {
          const res = await register(this.userInfo);
          if (res.code == 200) {
            this.$message({ type: "success", message: "创建成功" });
          }
          await this.getTableData();
          this.closeAddUserDialog();
        }
      });
    },
    closeAddUserDialog() {
      this.$refs.userForm.resetFields();
      this.addUserDialog = false;
    },
    closeUpdateDialog(){
      this.updateUserDialog = false;
    },
    enterUpdateDialog(){
      this.$refs.updateForm.validate(async valid => {
        if (valid) {
          const res = await updateUserInfo(this.formInfo);
          if (res.code == 200) {
            this.$message({ type: "success", message: "编辑成功" });
          }
          await this.getTableData();
          this.closeUpdateDialog();
        }
      });
    },
    handleAvatarSuccess(res) {
      this.userInfo.headerImg = res.data.file.url;
    },
    addUser() {
      this.addUserDialog = true;
    },
    updatePassword(row) {
      this.userName = row.userName;
      this.updatePasswordDialog = true;
    },
    //修改密码
    async enterPasswordDialog(row){
      this.$refs.passwordForm.validate(async valid => {
        if (valid) {
          const res = await changePassword({
            username: this.userName,
            Password: this.passwordInfo.originalPassword,
            NewPassword: this.passwordInfo.newPassword
            });
          if (res.code == 200) {
            this.$message({ type: "success", message: "修改成功" });
          }
          await this.getTableData();
          this.closePasswordDialog();
        }
      });
    },
    closePasswordDialog(){
      this.updatePasswordDialog=false;
      this.$refs.passwordForm.resetFields();
    },
    async changeAuthority(row) {
      const res = await setUserAuthority({
        uuid: row.uuid,
        authorityId: row.authority.authorityId
      });
      if (res.code == 200) {
        this.$message({ type: "success", message: "角色设置成功" });
      }
    },
     //条件搜索
    onSubmit() {
      this.page = 1
      this.limit = 10
      if(this.searchInfo.status==''){
          delete this.searchInfo.status;
      }else if(this.searchInfo.authorityId==''){
          delete this.searchInfo.authorityId;
      }
      this.getTableData()
    }
  },
  //获取角色
  async created() {
    this.getTableData();
    //const res = await getAuthorityList({ page: 1, limit: 999 });
    const res={
	"code": 0,
	"data": {
		"data": [{
			"CreatedAt": "2020-10-26T11:55:37+08:00",
			"UpdatedAt": "2020-10-26T11:55:37+08:00",
			"DeletedAt": null,
			"authorityId": "1",
			"authorityName": "应用管理员",
			"parentId": "0",
			"dataAuthorityId": [{
				"CreatedAt": "2020-10-26T11:55:37+08:00",
				"UpdatedAt": "2020-10-26T11:55:37+08:00",
				"DeletedAt": null,
				"authorityId": "1",
				"authorityName": "应用管理员",
				"parentId": "0",
				"dataAuthorityId": null,
				"children": null,
				"menus": null
			}, {
				"CreatedAt": "2020-10-26T11:55:37+08:00",
				"UpdatedAt": "2020-10-26T11:55:37+08:00",
				"DeletedAt": null,
				"authorityId": "2",
				"authorityName": "运维管理员",
				"parentId": "0",
				"dataAuthorityId": null,
				"children": null,
				"menus": null
			}],
			
			"menus": null
		}, {
			"CreatedAt": "2020-10-26T11:55:37+08:00",
			"UpdatedAt": "2020-10-26T11:55:37+08:00",
			"DeletedAt": null,
			"authorityId": "2",
			"authorityName": "运维管理员",
			"parentId": "0",
			"dataAuthorityId": [ {
				"CreatedAt": "2020-10-26T11:55:37+08:00",
				"UpdatedAt": "2020-10-26T11:55:37+08:00",
				"DeletedAt": null,
				"authorityId": "2",
				"authorityName": "运维管理员",
				"parentId": "0",
				"dataAuthorityId": null,
				"children": null,
				"menus": null
			}],
			"children": [],
			"menus": null
		}],
		"total": 0,
		"page": 1,
		"pageSize": 999
	},
	"msg": "获取成功"
}
    this.setOptions(res.data.data);
    
  }
};
</script>
<style lang="scss">

.button-box {
  padding: 10px 20px;
  .el-button {
    float: right;
  }
}

.user-dialog {
  .header-img-box {
    width: 80px;
    height: 200px;
    border: 1px dashed #ccc;
    border-radius: 20px;
    text-align: center;
    line-height: 200px;
    cursor: pointer;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    border: 1px dashed #d9d9d9 !important;
    border-radius: 6px;
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
}

.password-dialog{
  .header-img-box {
    width: 80px;
    height: 200px;
    border: 1px dashed #ccc;
    border-radius: 20px;
    text-align: center;
    line-height: 200px;
    cursor: pointer;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    border: 1px dashed #d9d9d9 !important;
    border-radius: 6px;
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
}
</style>