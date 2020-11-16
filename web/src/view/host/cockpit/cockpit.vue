<template>
 <div class="big">

            <div class="top">
                <el-divider direction="vertical" class=top-line></el-divider>
                
                <span class="top-text"><b>本机设备状态</b></span>
                
            </div>
        
            <div class="top-content">
                <el-row :gutter="20">
                        <el-col :span="8"><div class="grid-content bg-purple">
                        
                            <el-row :gutter="2">
                                <el-col :span="2"><img src="@/assets/cloud-connect-left.png" class="assets-icon-small"/></el-col>
                                <el-col :span="12">
                                    <el-row>
                                        <span class="text-col">云端链接状态</span><el-row> <img src="@/assets/cloud-link.png" class="assets-icon-big"/>
                                        </el-row></el-row>
                                       
                                </el-col>
                                <el-col :span="8"><span class="status-text bg-text">正常 </span></el-col>

                            </el-row>
                            </div>
                        </el-col>
                        <el-col :span="8"><div class="grid-content bg-purple"><img src="@/assets/cloud-connect-left.png" class="assets-icon-small"/>
                            <span>后台服务 </span></div></el-col>
                        <el-col :span="8"><div class="grid-content bg-purple"><img src="@/assets/cloud-connect-left.png" class="assets-icon-small"/>
                            <span>IOT设备连接数 </span></div></el-col>
                </el-row>
            </div>

            <div class="top-server">
                <el-divider direction="vertical" class=top-line ></el-divider>
                <span class="top-text"><b>服务器详情</b></span>
            </div>
            <div class="mid-top-content">  
        
                <el-row :gutter="10">
                         <el-col :span="6">
                             <el-row :gutter="10">
                                <el-col :span="8">产品类型:</el-col>
                                <el-col :span="8">A1</el-col>
                            </el-row>
                             <el-row :gutter="10">
                                <el-col :span="6">磁盘:</el-col>
                                <el-col :span="6">4G</el-col>
                            </el-row>
                        </el-col>

                        <el-col :span="6">
                             <el-row :gutter="10">
                                <el-col :span="8">操作系统:</el-col>
                                <el-col :span="10">Linux x86_64</el-col>
                            </el-row>
                             <el-row :gutter="10">
                                <el-col :span="8">型号:</el-col>
                                <el-col :span="10">5G边缘网关</el-col>
                            </el-row>
                        </el-col>

                        <el-col :span="6">
                             <el-row :gutter="10">
                                <el-col :span="6">CPU:</el-col>
                                <el-col :span="6">4核</el-col>
                            </el-row>
                             <el-row :gutter="10">
                                <el-col :span="6">IP地址:</el-col>
                                <el-col :span="6">187.187.234.22</el-col>
                            </el-row>
                        </el-col>
                          <el-col :span="6">
                             <el-row :gutter="10">
                                <el-col :span="6">内存:</el-col>
                                <el-col :span="6">4核</el-col>
                            </el-row>
                        </el-col>
                </el-row>
            </div>
            <div class="mid-bottom-content">
                <el-row :gutter="20">
                        <el-col :span="5">
                            <el-progress type="circle"
                            :width="70"
                            :height="70"
                            :percentage="70"
                            :color="colors"
                            ></el-progress>
                            <el-row :gutter="20"><div><span>CPU使用率</span></div><el-row :gutter="20">
                                <div class="bg-radius-small bg-radius-style"><span class="text-style">8核</span></div>
                            </el-row></el-row>
                            
                        </el-col>
                            
                        <el-col :span="5">
                            <el-progress
                            type="circle"
                            :width="70"
                            :height="70"
                            :percentage="10"
                            :color="colors"
                            ></el-progress>
                            <el-row :gutter="20"><div><span>内存使用率</span></div><el-row :gutter="20">
                                <div class="bg-radius-big bg-radius-style"><span class="text-style">857/34777(MB)</span></div>
                            </el-row></el-row>
                        </el-col>
                        <el-col :span="5">
                            <el-progress
                            type="circle"
                            :width="70"
                            :height="70"
                            :percentage="30"
                            :color="colors"
                            ></el-progress>
                            <el-row :gutter="20"><div><span>磁盘使用率</span></div><el-row :gutter="20">
                                <div class="bg-radius-mid bg-radius-style"><span class="text-style">33G/100G</span></div>
                            </el-row></el-row>
                        </el-col>
                            <el-col :span="4"> 
                                <el-row :gutter="20"><div><span class="flow-text">总发送流量</span></div><el-row :gutter="20">
                                <div><span class="flow-text-style">1,250G</span></div>
                            </el-row></el-row>
                                </el-col>
                            <el-col :span="4"> <el-row :gutter="20"><div><span class="flow-text">总接收流量</span></div><el-row :gutter="20">
                                <div><span class="flow-text-style">5,250G</span></div>
                            </el-row></el-row>
                            </el-col>
                </el-row>
            </div>

             <div class="top-server">
                <el-divider direction="vertical" class=top-line ></el-divider>
                <span class="top-text"><b>应用管理</b></span>
            </div>
            <div class="top-bottom-content">  
                <el-col :span="5"> 
                        <el-row :gutter="20"><div><span class="flow-text">已安装应用</span></div><el-row :gutter="20">
                        <div><span class="flow-text">416</span></div>
                    </el-row></el-row>
                        </el-col>
                            <el-divider direction="vertical"></el-divider>
                        <el-col :span="5"> 
                        <el-row :gutter="20"><div><span class="flow-text">系统服务</span></div><el-row :gutter="20">
                        <div><span class="flow-text">12</span></div>
                    </el-row></el-row>
                        </el-col>
                        <el-col :span="5"> 
                        <el-row :gutter="20"><div><span class="flow-text">设备驱动</span></div><el-row :gutter="20">
                        <div><span class="flow-text">368</span></div>
                    </el-row></el-row>
                        </el-col>
                        <el-col :span="4"> 
                        <el-row :gutter="20"><div><span class="flow-text">应用场景</span></div><el-row :gutter="20">
                        <div><span class="flow-text">36</span></div>
                    </el-row></el-row>
                        </el-col>
                        <el-col :span="4"> 
                        <el-row :gutter="20"><div><span class="flow-text">安全风险</span></div><el-row :gutter="20">
                        <div><span class="flow-text">3</span></div>
                    </el-row></el-row>
                </el-col>
            </div>

            <el-row :gutter="15" class="system_state">
              <el-col :span="12">
                <div class="top">
                    <el-divider direction="vertical" class=top-line></el-divider>
                    
                    <span class="top-text"><b>服务器健康状态</b></span>

                </div>
                 <template>
                        <el-table
                            :data="tableData"
                            height="300"
                            style="width: 100%"
                            class="tableClass"
                            :cell-style="cellStyle">
                        <el-table-column
                            prop="date"
                            label="序号"
                            width="250">
                        </el-table-column>
                        <el-table-column
                            prop="name"
                            label="设备名称"
                            width="250">
                        </el-table-column>
                        <el-table-column
                            prop="status"
                            label="运行状态">
                        </el-table-column>
                        </el-table>
                    </template>
             </el-col>
             <el-col :span="12">
              <div class="top">
                <el-divider direction="vertical" class=top-line></el-divider>
                
                <span class="top-text"><b>服务健康状态</b></span>
                
              </div>
              <template>
                        <el-table
                            :data="tableData"
                            height="300"
                            style="width: 100%"
                            class="tableClass"
                            :cell-style="cellStyle">
                        <el-table-column
                            prop="date"
                            label="序号"
                            align="center"
                            width="150">
                        </el-table-column>
                        <el-table-column
                            prop="name"
                            label="服务名称"
                            align="center"
                            width="250">
                        </el-table-column>
                        <el-table-column
                            prop="status"
                            align="center"
                            label="运行状态">
                        </el-table-column>
                        </el-table>
                    </template>
             </el-col>
        </el-row>
 </div>

</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Dashboard',
  data() {
    return {
        colors: [
        { color: "#00CED1", percentage: 20 },
        { color: "#1E90FF", percentage: 40 },
        { color: "#FF8C00", percentage: 80 },
        ],
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          status: '运行异常',
        }, {
          date: '2016-05-04',
          name: '王小虎',
          status: '未启动'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          status: '运行正常',
        }, {
          date: '2016-05-03',
          name: '王小虎',
          status: '运行正常'
        },{
          date: '2016-05-08',
          name: '王小虎',
          status: '运行异常'
        }, {
          date: '2016-05-06',
          name: '王小虎',
          status: '未启动'
        }, {
          date: '2016-05-07',
          name: '王小虎',
          status: '未启动'
        }, {
          date: '2016-05-06',
          name: '王小虎',
          status: '运行异常'
        }, {
          date: '2016-05-07',
          name: '王小虎',
          status: '运行正常'
        }]
    }
  },
   computed: {
    ...mapGetters('user', ['userInfo'])
  },
    
    methods:{
      toTarget(name){
          this.$router.push({name})
      },
      cellStyle(row,column,rowIndex,columnIndex){

        if(row.column.label==="运行状态"&& row.row.status==="运行异常"){
          return "color:#FF3B30"
        }else if(row.column.label==="运行状态"&& row.row.status==="运行正常" ){
          return 'color:#52CCA3'
        }else if(row.column.label==="运行状态"&& row.row.status==="未启动"){
            return 'color:#333333'
        }
    }
    },
 
}
</script>

<style lang="scss" scoped>
    .big{
        margin:100px 0 0 0;
        padding-top: 0;
        background-color: rgb(243,243,243);
        padding-top: 15px;
        .top{
            width: 100%;
            height: 59px;
            background: #fff;
            line-height:59px;
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
        .top-line{
            width: 3px;
            height: 16px;
            background: #007aff;
        }
        .top-content{
            width: 100%;
            height: 140px;
            margin-top: 2px;
            background: #fff;
        }
        .mid-top-content{
            width: 100%;
            height: 118px;
            margin-top: 2px;
            background: #fff;
        }
         .mid-bottom-content{
            width: 100%;
            height: 200px;
            margin-top: 5px;
            background: #fff;
        }
        .top-bottom-content{
            width: 100%;
            height: 315px;
            margin-top: 5px;
            background: #fff; 
        }
        .top-server{
             width: 100%;
            height: 59px;
            background: #fff;
            line-height:59px;
            margin-top:10px;
        }
        .el-row {
            margin-bottom: 10px;
            padding-left:0px;
            
            &:last-child {
                margin-bottom: 0;
                padding-right:0px;

            }
        }
        .el-col {
            border-radius: 2px;
        }
        .bg-purple-dark {
            background: #99a9bf;
        }
        .bg-purple {
            background: #f0f9ff;
        }
        .bg-white {
            background: #f0f9ff;
        }
        .bg-purple-light {
            background: #e5e9f2;
        }
        .grid-content {
            border-radius: 4px;
            min-height: 108px;
        }
        .bg-radius-small{
            width: 56px;
            height: 24px;
        }

        .bg-radius-mid{
            width: 88px;
            height: 24px;
          
        }

        .bg-radius-big{
            width: 132px;
            height: 24px;
        }

        .bg-radius-style{
            background: #e1eff5;
            border-radius: 15px;
        }

         .text-style{
            width: 20px;
            height: 22px;
             font-size: 12px;
            text-align: center;
            color: #666666;
            line-height: 22px;
            margin-left:15px;
        }
   
        .flow-text-style{
            width: 81px;
            height: 32px;
            font-size: 32px;
            font-family: Helvetica;
            text-align: center;
            color: #111111;
            line-height: 32px;
        }
        .flow-text{
            width: 70px;
            height: 14px;
            font-size: 14px;
            font-family: PingFangSC, PingFangSC-Regular;
            font-weight: 400;
            text-align: center;
            color: #333333;
            line-height: 14px;
        }
        .assets-icon-small {
            width: 20px;
            min-width: 20px;
            height: 20px;
            border-radius: 10px;
            margin-left:2px;
        }

        .assets-icon-big {
            width: 59px;
            height: 59px;
        }
        .text-col{
            margin-left:5px;
        }
        .status-text{
            padding-top:20px;
        }
        .tableClass{
            padding: 0!important;
            height: 44px;
            line-height: 44px;
            margin-top:1px;
        }
    }
</style>