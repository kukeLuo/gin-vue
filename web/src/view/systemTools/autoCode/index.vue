<template>
  <div class="big">
    <el-row class="el-row">
      <el-col :span="20">
        <el-divider direction="vertical" class="top-line"></el-divider
        ><b style="fontsize: 20px">设备列表</b>
      </el-col>
      <el-button type="primary" @click="addDevice">添加设备</el-button>
      <el-button @click="onSubmit">刷新</el-button>
    </el-row>

    <el-dialog
      :visible.sync="addDeviceDialog"
      custom-class="Device-dialog"
      title="添加设备"
    >
      <el-form :rules="rules" ref="addDeviceForm" :model="deviceInfo">
        <el-form-item label="摄像头名称" label-width="120px" prop="deviceName">
          <el-input v-model="deviceInfo.deviceName"></el-input>
        </el-form-item>
        <el-form-item label="用户名" label-width="120px" prop="username">
          <el-input v-model="deviceInfo.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="120px" prop="password">
          <el-input show-password v-model="deviceInfo.password"></el-input>
        </el-form-item>
        <el-form-item label="协议类型" label-width="120px" prop="protocolType">
          <el-select v-model="deviceInfo.protocolType" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="请求地址" label-width="120px" prop="url">
          <el-input v-model="deviceInfo.url"></el-input>
        </el-form-item>
      </el-form>
      <div class="dialog-footer" slot="footer">
        <el-button @click="closeAddDeviceDialog">取 消</el-button>
        <el-button @click="enterAddDeviceDialog" type="primary"
          >确 定</el-button
        >
      </div>
    </el-dialog>
    <el-dialog
      :visible.sync="updateDeviceDialog"
      custom-class="Device-dialog"
      title="编辑设备"
    >
      <el-form :rules="rules" ref="deviceForm" :model="updateDeviceInfo">
        <el-form-item label="摄像头名称" label-width="120px" prop="deviceName">
          <el-input
            v-model="updateDeviceInfo.deviceName"
            :disabled="true"
          ></el-input>
        </el-form-item>
        <el-form-item label="用户名" label-width="120px" prop="username">
          <el-input v-model="updateDeviceInfo.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="120px" prop="password">
          <el-input
            show-password
            v-model="updateDeviceInfo.password"
          ></el-input>
        </el-form-item>
        <el-form-item label="协议类型" label-width="120px" prop="protocolType" >
          <el-select v-model="updateDeviceInfo.protocolType" placeholder="请选择" @change="selectChanged">

            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="请求地址" label-width="120px" prop="url">
          <el-input v-model="updateDeviceInfo.url"></el-input>
        </el-form-item>
      </el-form>
      <div class="dialog-footer" slot="footer">
        <el-button @click="closeUpdateDeviceDialog">取 消</el-button>
        <el-button @click="enterUpdateDeviceDialog" type="primary"
          >确 定</el-button
        >
      </div>
    </el-dialog>

    <el-form :model="searchInfo" :inline="true">
      <el-form-item label="设备搜索：">
        <el-input
          placeholder="请输入设备名称"
          v-model="searchInfo.deviceName"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="onSubmit" type="primary">查询</el-button>
      </el-form-item>
    </el-form>

    <el-row class="el-row">
      设备状态：
      <el-button-group>
        <el-button
          v-for="item in buttons"
          :key="item.id"
          :value="item.value"
          @click="onClickBtn(item.value)"
          v-text="item.name"
        ></el-button>
      </el-button-group>
    </el-row>

    <!-- 组件列表 -->
    <el-table :data="tableData" border stripe>
      <el-table-column prop="deviceName" label="设备名称" min-width="300">
      </el-table-column>
      <el-table-column prop="id" label="设备ID" min-width="300">
      </el-table-column>
      <el-table-column prop="status" label="设备状态" min-width="300">
        <template slot-scope="scope">{{
          formatStatus(scope.row.status)
        }}</template>
      </el-table-column>
      <el-table-column prop="operation" label="操作" min-width="300">
        <template slot-scope="scope">
          <el-button type="warning" size="small" @click="getEvents(scope.row)"
            >查看事件</el-button
          >
          <el-button
            type="primary"
            size="small"
            @click="updateDevice(scope.row)"
            >编辑</el-button
          >
          <el-popover placement="top" width="160" v-model="scope.row.visible">
            <p>确定要删除此设备吗</p>
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
                @click="deleteDevice(scope.row)"
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
      :style="{ float: 'right', padding: '20px' }"
      :total="total"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
      layout="total, sizes, prev, pager, next, jumper"
    ></el-pagination>
  </div>
</template>
<script>
import {
  addDevice,
  getDeviceList,
  updateDevice,
  deleteDevice,
} from "@/api/sysDevice";
import infoList from "@/mixins/infoList";
export default {
  name: "autoCode",
  mixins: [infoList],
  data() {
    return {
      listApi: getDeviceList,
      options: [
        {
          value: "rtsp",
          label: "rtsp",
        },
        {
          value: "ip",
          label: "ip",
        },
      ],
      value: "",
      buttonsValue: "",
      addDeviceDialog: false,
      updateDeviceDialog: false,
      ipAddress:"",
      isSelectIpAddress:false,
      url:"",
      deviceInfo: {
        ID: "",
        deviceName: "",
        username: "",
        password: "",
        protocolType: "",
        url: "",
      },
      updateDeviceInfo: {
        ID: "",
        deviceName: "",
        username: "",
        password: "",
        protocolType: "",
        url: "",
        ip:"",
      },
      buttons: [
        {
          id: 0,
          name: "全部",
          value: -1,
        },
        {
          id: 1,
          name: "初始化",
          value: 0,
        },
        {
          id: 2,
          name: "在线",
          value: 1,
        },
        {
          id: 3,
          name: "离线",
          value: 3,
        },
        {
          id: 4,
          name: "异常",
          value: 8,
        },
      ],

      rules: {
        deviceName: [
          { required: true, message: "请输入设备名称", trigger: "blur" },
        ],
        protocolType: [{ required: true, trigger: "blur" }],
        url: [{ required: true, message: "请输入请求地地址", trigger: "blur" }],
      },
    };
  },
  components: {},
  methods: {
    onClickBtn(v) {
      if (v != -1) {
        this.searchInfo.status = v;
      } else {
        delete this.searchInfo.status;
      }
      this.onSubmit();
    },
    addDevice() {
      this.addDeviceDialog = true;
    },
    closeAddDeviceDialog() {
      this.$refs.addDeviceForm.resetFields();
      this.addDeviceDialog = false;
    },
    selectChanged(value) {
	    console.log("--------------------选中---",value)
      if(value=='ip'){
          this.isSelectIpAddress=true;
          this.updateDeviceInfo.url=this.ipAddress;
      }else if(value=='rtsp'){
        this.isSelectIpAddress=false;
        this.updateDeviceInfo.url=this.url;
      }
    },
    closeUpdateDeviceDialog() {
      this.updateDeviceDialog = false;
    },
    //页面跳转到事件列表页面
   async getEvents(row) {
      //带参数跳转
      this.$router.push({
        name: "deviceEvents",
        params: {
          id: row.id,
        },
      });
    },

    //添加摄像头
    async enterAddDeviceDialog() {
      this.$refs.addDeviceForm.validate(async (valid) => {
        if (valid) {
          const res = await addDevice(this.deviceInfo);
          if (res.data.code == 200) {
            this.$message({ type: "success", message: "创建成功" });
          } else {
            this.$message({ type: "error", message: res.data.message });
          }
          await this.getTableData();
          this.closeAddDeviceDialog();
        }
      });
    },
    //编辑摄像头
    async updateDevice(row) {
      this.updateDeviceDialog = true;
      this.updateDeviceInfo.deviceName = row.deviceName;
      this.updateDeviceInfo.username = row.userName;
      this.updateDeviceInfo.password = row.password;
      this.updateDeviceInfo.protocolType = row.protocolType;
      if(this.updateDeviceInfo.protocolType=='ip'){
         this.updateDeviceInfo.url = row.ip;
        this.isSelectIpAddress=true;
      }else{
         this.updateDeviceInfo.url = row.url;
        this.isSelectIpAddress=false;
      }
      this.updateDeviceInfo.ID = row.id;
      this.ipAddress=row.ip;
      this.url=row.url;
    },

    async enterUpdateDeviceDialog() {
      this.$refs.deviceForm.validate(async (valid) => {
        if (valid) {

          if(this.isSelectIpAddress){
            delete this.updateDeviceInfo.url;
            this.updateDeviceInfo.ip=this.ipAddress;
            this.isSelectIpAddress=false;
          }
          const res = await updateDevice(this.updateDeviceInfo);
          if (res.code == 200) {
            this.$message({ type: "success", message: "修改成功！" });
          } else {
            this.$message({ type: "error", message: res.data.message });
          }
          await this.getTableData();
          this.closeUpdateDeviceDialog();
        }
      });
    },

    async deleteDevice(row) {
      const res = await deleteDevice(row.id);
      if (res.code == 0) {
        this.getTableData();
        row.visible = false;
      }
      await this.getTableData();
    },
    formatStatus: function (status) {
      switch (status) {
        case 0:
          return "初始化";
        case 1:
          return "在线";
        case 3:
          return "离线";
        case 8:
          return "异常";
      }
    },

    //条件搜索
    onSubmit() {
      this.page = 1;
      this.limit = 20;
      this.getTableData();
    },
  },
  created() {
    this.getTableData();
  },
};
</script>
<style lang="scss" scoped>
.Device-dialog {
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
