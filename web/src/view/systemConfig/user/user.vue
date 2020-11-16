<template>
  <div>
      <div class="search-term">
      <el-form :inline="true" :model="searchInfo" class="demo-form-inline">
        <el-form-item label="账户/姓名">
          <el-input placeholder="请输入账户/姓名" v-model="searchInfo.username"></el-input>
        </el-form-item>
     
        <el-form-item label="角色">
          <el-select clearable placeholder="全部" v-model="searchInfo.method">
            <el-option
              :key="item.value"
              :label="`${item.label}(${item.value})`"
              :value="item.value"
              v-for="item in methodOptions"
            ></el-option>
          </el-select>
        </el-form-item>

        </el-form-item>    
            <el-form-item label="状态" prop="status">
            <el-select v-model="searchInfo.status" clear placeholder="全部">
                <el-option
                    key="true"
                    label="全部"
                    value="">
                </el-option>
                <el-option
                    key="true"
                    label="正常"
                    value="true">
                </el-option>
                <el-option
                    key="false"
                    label="不正常"
                    value="false">
                </el-option>
            </el-select>
            </el-form-item>

        <el-form-item label="是否启用">
          <el-select clearable placeholder="全部" v-model="searchInfo.method">
            <el-option
              :key="item.value"
              :label="`${item.label}(${item.value})`"
              :value="item.value"
              v-for="item in methodOptions"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button @click="onSubmit" type="primary">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button @click="addUser" type="primary">新增</el-button>
        </el-form-item>
      </el-form>
    </div>
   <!-- <div class="button-box clearflex">
      <el-button @click="addUser" type="primary">新增</el-button>
    </div>  -->
    <el-table :data="tableData" border stripe>
  
      <el-table-column label="序号" min-width="60" prop="ID"></el-table-column>
      <el-table-column label="账户" min-width="100" prop="userName"></el-table-column>
      <el-table-column label="姓名" min-width="80" prop="realName"></el-table-column>
      <el-table-column label="用户角色" min-width="100" prop="authorityId"></el-table-column>
         <el-table-column label="状态" prop="status" width="80">
         <template slot-scope="scope">{{scope.row.status|formatBoolean}}</template>
    </el-table-column>
      <el-table-column label="手机号" min-width="100" prop="phone"></el-table-column>
      <el-table-column label="邮箱" min-width="120" prop="email"></el-table-column>
      <el-table-column label="是否启用" prop="switch" width="80">
        <template slot-scope="scope">
          <el-switch  v-model="scope.row.switch"></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="150">
      
        
        <template slot-scope="scope">
        <el-button type="text" size="small" @click="updateUser(scope.row)">编辑</el-button>
        <el-button type="text" size="small" @click="updatePassword(scope.row)">修改密码</el-button>
          <el-popover placement="top" width="160" v-model="scope.row.visible">
            <p>确定要删除此用户吗</p>
            <div style="text-align: right; margin: 0">
              <el-button size="mini" type="text" @click="scope.row.visible = false">取消</el-button>
              <el-button type="primary" size="mini" @click="deleteUser(scope.row)">确定</el-button>
            </div>
           
            <el-button type="text"  size="small" slot="reference">删除</el-button>

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



    <el-dialog :visible.sync="updatePasswordDialog" custom-class="password-dialog" title="修改密码">
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




    <el-dialog :visible.sync="addUserDialog" custom-class="user-dialog" title="新建账号">
      <el-form :rules="rules" ref="userForm" :model="userInfo">
        <el-form-item label="账户" label-width="120px" prop="username">
          <el-input v-model="userInfo.username"></el-input>
        </el-form-item>
        <el-form-item label="请输入密码" label-width="120px" prop="password">
          <el-input v-model="userInfo.password"></el-input>
        </el-form-item>
        <el-form-item label="再次确认密码" label-width="120px" prop="confirmPassword">  
          <el-input v-model="userInfo.confirmPassword"></el-input>
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
    <ChooseImg ref="chooseImg" :target="userInfo" :targetKey="`headerImg`"/>
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
  changePassword
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
      userInfo: {
        username: "",
        password: "",
        confirmPassword: "",
        headerImg: "",
        authorityId: "",
        realName:"",
        email:"",
        phone:""
      },
      rules: {
        username: [
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
    }
  },
  methods: {
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
    async deleteUser(row) {
      const res = await deleteUser({ id: row.ID });
      if (res.code == 200) {
        this.getTableData();
        row.visible = false;
      }
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
			"authorityId": "888",
			"authorityName": "普通用户",
			"parentId": "0",
			"dataAuthorityId": [{
				"CreatedAt": "2020-10-26T11:55:37+08:00",
				"UpdatedAt": "2020-10-26T11:55:37+08:00",
				"DeletedAt": null,
				"authorityId": "888",
				"authorityName": "普通用户",
				"parentId": "0",
				"dataAuthorityId": null,
				"children": null,
				"menus": null
			}, {
				"CreatedAt": "2020-10-26T11:55:37+08:00",
				"UpdatedAt": "2020-10-26T11:55:37+08:00",
				"DeletedAt": null,
				"authorityId": "8881",
				"authorityName": "普通用户子角色",
				"parentId": "888",
				"dataAuthorityId": null,
				"children": null,
				"menus": null
			}, {
				"CreatedAt": "2020-10-26T11:55:37+08:00",
				"UpdatedAt": "2020-10-26T11:55:37+08:00",
				"DeletedAt": null,
				"authorityId": "9528",
				"authorityName": "测试角色",
				"parentId": "0",
				"dataAuthorityId": null,
				"children": null,
				"menus": null
			}],
			"children": [{
				"CreatedAt": "2020-10-26T11:55:37+08:00",
				"UpdatedAt": "2020-10-26T11:55:37+08:00",
				"DeletedAt": null,
				"authorityId": "8881",
				"authorityName": "普通用户子角色",
				"parentId": "888",
				"dataAuthorityId": [],
				"children": [],
				"menus": null
			}],
			"menus": null
		}, {
			"CreatedAt": "2020-10-26T11:55:37+08:00",
			"UpdatedAt": "2020-10-26T11:55:37+08:00",
			"DeletedAt": null,
			"authorityId": "9528",
			"authorityName": "测试角色",
			"parentId": "0",
			"dataAuthorityId": [{
				"CreatedAt": "2020-10-26T11:55:37+08:00",
				"UpdatedAt": "2020-10-26T11:55:37+08:00",
				"DeletedAt": null,
				"authorityId": "8881",
				"authorityName": "普通用户子角色",
				"parentId": "888",
				"dataAuthorityId": null,
				"children": null,
				"menus": null
			}, {
				"CreatedAt": "2020-10-26T11:55:37+08:00",
				"UpdatedAt": "2020-10-26T11:55:37+08:00",
				"DeletedAt": null,
				"authorityId": "9528",
				"authorityName": "测试角色",
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