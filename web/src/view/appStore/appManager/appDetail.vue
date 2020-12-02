<template>
  <div>
    <div class="top">
        <el-divider direction="vertical" class=top-line></el-divider>
        
        <span class="top-text"><b>{{this.skillName}}</b></span>
                
    </div>
   <div class="search-term">
      <el-form :inline="true" :model="searchInfo" class="demo-form-inline">
        <el-form-item label="视频源检索:">
          <el-input placeholder="请输入视频源名称" v-model="searchInfo.eventName"></el-input>
        </el-form-item>
     
        <el-form-item label="事件等级:">
          <el-select  placeholder="全部" v-model="searchInfo.eventLevel">
            <el-option
              :key="item.value"
              :label="`${item.label}(${item.value})`"
              :value="item.value"
              v-for="item in methodOptions"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="上报时间:">
           <el-date-picker
                v-model="searchInfo.customTime"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
            </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button @click="lately" type="primary">最近7天</el-button>
        </el-form-item>
        <el-form-item>
          <el-button @click="query" type="primary">查询</el-button>
        </el-form-item>
         <el-form-item>
          <el-button @click="reset" type="primary">重置</el-button>
        </el-form-item>
         </el-form>
    </div>
    <el-table :data="tableData" border stripe>
      <el-table-column label="事件图片" min-width="100">
        <template slot-scope="scope">
          <div :style="{'textAlign':'center'}">
            <CustomPic :picSrc="scope.row.image" />
          </div>
        </template>
      </el-table-column>
      <el-table-column label="视频ID" min-width="250" prop="deviceId"></el-table-column>
      <el-table-column label="事件内容" min-width="150" prop="eventName"></el-table-column>
      <el-table-column label="置信度" min-width="150" prop="confidence"></el-table-column>
      <el-table-column label="图片坐标" min-width="150" prop="imagePoint"></el-table-column>
      <el-table-column label="设备名称" min-width="150" prop="deviceName"></el-table-column>
      <el-table-column label="事件等级" min-width="150" >
              <template slot-scope="scope">{{scope.row.eventLevel|formatLevel}}</template>
      </el-table-column>
      <el-table-column label="事件定位" min-width="150" prop="eventLocation"></el-table-column>
      <el-table-column label="最后上线时间" min-width="150">
              <template slot-scope="scope">{{scope.row.createdAt|formatData}}</template>
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

  </div>
</template>


<script>
// 获取列表内容封装在mixins内部  getTableData方法 初始化已封装完成
const path = process.env.VUE_APP_BASE_API;
import {getAppDetail} from "@/api/appManager";
import infoList from "@/mixins/infoList";
import { mapGetters } from "vuex";
import CustomPic from '@/components/customPic'
export default {
  name: "AppDetail",
  mixins: [infoList],
   components: {
    CustomPic  
  },
  data() {
    return {
      listApi: getAppDetail,
      path: path,
      routerParams:"",
      authOptions: [],
      skillName:"",
      skillId:"",
      addUserDialog: false,
      tableData: [{
          videoId:'20192029190920',
          eventContent: '未戴口罩',
          confidence: '88',
          pictureCoord: '(22,21)',
          deviceName:'旷视001',
          eventLevel:'提醒',
          eventLocation:'一单元一栋',
          onlineTime: '2020-11-18 17:22:00',
          
        }
      ],
       customTime: '',
    };
  },
  computed: {
    ...mapGetters("user", ["token"])
  },
  async created() {
        this.getParams();

        this.limit = 10;
        this.searchInfo.skillId=this.skillId;
        console.log("--------------------3----",this.skillId);
        await this.getTableData();
  },
        filters: {
  
          formatData: function(str) {
            var date = new Date(str).toJSON();

            var newDate=new Date(+new Date(date)+8*3600*1000).toISOString().replace(/T/g,' ').replace(/\.[\d]{3}Z/,'');
            return newDate;

          },
          formatLevel:function(level){
              if(level!=null){
                  if(level==0){
                      return "一般";
                  }else if(level==1){
                      return "一般般";
                  }else if(level==2){
                      return "紧急";
                  }
              }else{
                return "未定义类型";
              }
          }
      },
  methods: {
      getParams(){
        // 取到路由带过来的参数
        this.routerParams = this.$route.params.id,
         this.skillName = this.$route.params.name,
         this.skillId = this.$route.params.skillId
      },
      lately() {
              this.page = 1
              this.limit = 10
              this.getTableData()
      },
      query() {
              this.page = 1
              this.limit = 10
              
              if(this.searchInfo.eventName==''){
                delete this.searchInfo.eventName;

              }else if(this.searchInfo.eventLevel==''){
                delete this.searchInfo.eventLevel;

              }else if(this.searchInfo.customTime==''){
                delete this.searchInfo.customTime;
              }
              console.log("--------------------1----",this.searchInfo.eventName);
              this.getTableData()
      },
      reset() {
              this.page = 1
              this.limit = 10
              delete this.searchInfo.status;
              delete this.searchInfo.applicationType;
              this.searchInfo.applicationName=this.input;
              this.getTableData()
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
    
    handleAvatarSuccess(res) {
      this.userInfo.headerImg = res.data.file.url;
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
</style>