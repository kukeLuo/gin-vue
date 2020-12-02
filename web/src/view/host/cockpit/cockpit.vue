<template>
 <div class="big">

            <div class="top">
                 <img src="@/assets/running_time.png" class="assets-icon-time"/>
                <span class="top-text">运行时间</span>
                <span class="top-text" style=" margin-left: 10px">{{this.os.startTime | formatData}}</span>
                
                <div class="top-right" style="float: right; margin-right:20px">
                    <span class="top-text" style=" margin-left: 2px">{{this.os.version}}</span>
                    <el-button type="primary" style="margin-left:15px" round size="small" @click="updateVersion">更新</el-button>
                    <el-button round size="small" @click="reboot">重启</el-button>
                </div>
            </div>
            <div class="top" style=" margin-top: 2px">
                <el-divider direction="vertical" class=top-line></el-divider>
                
                <span class="top-text"><b>本机设备状态</b></span>
                
                
            </div>
        
            <div class="top-content">

                <el-row :gutter="20">
                        <el-col :span="8"><div class="grid-content bg-purple">
                        
                            <el-row :gutter="2">
                                <el-col :span="3">
                                <div class="main-top-img">
                                    <img src="@/assets/cloud-connect-left.png" class="assets-icon-small"/>
                                </div>
                               
                                </el-col>
                                <el-col :span="6">
                                  

                                       <div class="main-top">
                                            <span class="text-col">云端链接状态</span>
                                        </div>
                                        <div class="main-text">
                                            <img src="@/assets/cloud-link.png" class="assets-icon-big"/>
                                        </div>
                                       
                                </el-col>
                                <el-col :span="15">
                                    <div class="main-text-items" style="font-size:32px">
                                             <span >{{this.checkIsAlive | formatStatus}}</span>
                                        </div>
                                   
                                </el-col>

                            </el-row>
                            </div>
                        </el-col>
                        <el-col :span="8">
                            <div class="grid-content bg-purple">
                                <el-row :gutter="2">

                                    <el-col :span="3">
                                    
                                        <div class="main-top-img">
                                                <img src="@/assets/backstage.png" class="assets-icon-small"/>
                                        </div>
                                    </el-col>
                                    <el-col :span="6">

                                        <div class="main-top">
                                            <span class="text-col">后台服务</span>
                                        </div>
                                        <div class="main-text">
                                            <img src="@/assets/service-status.png" class="assets-icon-big"/>
                                        </div>
                                        
                                    </el-col>
                                    <el-col :span="10" class="service-text">
                                        
                                    <div style="font-size:32px" class="main-top">{{this.servers.length}}</div>
                                        <div  class="bg-text main-text"><span>正常</span></div>
                                    </el-col>
                                    <el-col :span="10" class="service-text" >

                                    
                                        <div class="main">
                                            <span class="except-num">0</span>
                                        </div>
                                        <div class="main-text">
                                            <span class="bg-text">异常</span>
                                        </div>
                                    
                                    </el-col>

                                </el-row>
                            </div>
                        </el-col>

                        <el-col :span="8"><div class="grid-content bg-purple">
                                <el-row :gutter="2">
                                    <el-col :span="3">
                                        <div class="main-top-img">
                                                <img src="@/assets/backstage.png" class="assets-icon-small"/>
                                        </div>
                                    </el-col>
                                    <el-col :span="6">

                                          <div class="main-top">
                                            <span>IOT设备连接数</span>
                                        </div>
                                        <div class="main-text">
                                            <img src="@/assets/iot-link.png" class="assets-icon-big"/>
                                        </div>

                                        
                                    </el-col>
                                    <el-col :span="10" class="service-text">
                                        
                                       <div style="font-size:32px" class="main-top">{{this.deviceConnNum.normalCount}}</div>
                                        <div  class="bg-text main-text"><span>正常</span></div>
                                    </el-col>
                                    <el-col :span="10" class="service-text">

                                        <div class="main">
                                            <span class="except-num">{{this.deviceConnNum.ExceptionCount}}</span>
                                        </div>
                                        <div class="main-text">
                                            <span class="bg-text">异常</span>
                                        </div>


                                     


                                    </el-col>

                                </el-row>
                            </div>
                        </el-col>
                </el-row>
            </div>

            <div class="top-server">
                <el-divider direction="vertical" class=top-line ></el-divider>
                <span class="top-text"><b>服务器详情</b></span>
            </div>
            <div class="mid-top-content">  
        
                <el-row :gutter="10">
                         <el-col :span="6">
                             <el-row :gutter="10" class="server-padding-left">
                                <el-col :span="8">产品类型:</el-col>
                                <el-col :span="8">A1</el-col>
                            </el-row>
                             <el-row :gutter="10" class="server-padding-left">
                                <el-col :span="6">磁盘:</el-col>
                                <el-col :span="6" v-text="`${disk.totalGb}G`"></el-col>
                            </el-row>
                        </el-col>

                        <el-col :span="6">
                             <el-row :gutter="10">
                                <el-col :span="8">操作系统:</el-col>
                                <el-col :span="10" v-text="os.os"></el-col>
                            </el-row>
                             <el-row :gutter="10">
                                <el-col :span="8">型号:</el-col>
                                <el-col :span="10">5G边缘网关</el-col>
                            </el-row>
                        </el-col>

                        <el-col :span="6">
                             <el-row :gutter="10">
                                <el-col :span="6">CPU:</el-col>
                                <el-col :span="6" v-text="`${os.numCpu}核`"></el-col>
                            </el-row>
                             <el-row :gutter="10">
                                <el-col :span="6">IP地址:</el-col>
                                <el-col :span="6" v-text="os.ipAddress"></el-col>
                            </el-row>
                        </el-col>
                          <el-col :span="6">
                             <el-row :gutter="10">
                                <el-col :span="6">内存:</el-col>
                                <el-col :span="6" v-text="`${ram.totalMb}M`"></el-col>
                            </el-row>
                        </el-col>
                </el-row>
            </div>
            <div class="mid-bottom-content">
                <el-row :gutter="20">
                        <el-col :span="5" >
                            <el-progress type="circle"
                            :width="65"
                            :height="65"
                            :percentage="cpu.cpuPercents"
                            :stroke-width=8
                            :color="colors"
                           
                            ></el-progress>
                            <el-row :gutter="20" class="server-padding-left"  ><div><span>CPU使用率</span></div><el-row :gutter="20">
                                <div class="bg-radius-small bg-radius-style"><span class="text-style"  v-text="`${os.numCpu}核`"></span></div>
                            </el-row></el-row>
                            
                        </el-col>
                            
                        <el-col :span="5">
                            <el-progress
                            type="circle"
                            :width="65"
                            :height="65"
                            :percentage="ram.usedPercent"
                            :stroke-width=8
                            :color="colors"
                            ></el-progress>
                            <el-row :gutter="20" class="server-padding-left"><div><span>内存使用率</span></div><el-row :gutter="20">
                                <div class="bg-radius-big bg-radius-style"><span class="text-style" v-text="`${ram.usedMb}/${ram.totalMb}(MB)`"></span></div>
                            </el-row></el-row>
                        </el-col>
                        <el-col :span="4">
                            <el-progress
                            type="circle"
                            :width="65"
                            :height="65"
                            :percentage="disk.usedPercent"
                            :stroke-width=8
                            :color="colors"
                            ></el-progress>
                            <el-row :gutter="20" class="server-padding-left "><div><span>磁盘使用率</span></div><el-row :gutter="20">
                                <div class="bg-radius-mid bg-radius-style"><span class="text-style" v-text="`${disk.usedGb}/${disk.totalGb}(G)`"></span></div>
                            </el-row></el-row>
                        </el-col>
                           <el-col :span="1"> 
                                  <el-divider direction="vertical" class="divider-line-align"></el-divider>
                                   </el-col>
                            <el-col :span="4"> 
                                <div class="flow-text margin-text">
                                    <span >总发送流量</span>
                                </div>
                                <div  class="flow-text-style" v-text="`${netInfo.sentGb}G`"></div>
                              
                                </el-col>
                            <el-col :span="4"> 
                                <div class="flow-text margin-text">
                                    <span >总接收流量</span>
                                </div>
                                <div  class="flow-text-style" v-text="`${netInfo.recvGb}G`"></div>
                            
                            </el-col>
                </el-row>
            </div>

             <div class="top-server">
                <el-divider direction="vertical" class=top-line ></el-divider>
                <span class="top-text"><b>应用管理</b></span>
            </div>
            <div class="top-bottom-content">  
                <el-col :span="5"> 

                    <div class="flow-application-text">
                        <span>已安装应用</span>
                    </div>
                    <div class="manager-text">
                        <span class="flow-size">{{appStatistics.installCount}}</span>
                    </div>
    
                </el-col>
                <el-col :span="1"> 
                        <el-divider direction="vertical" class="divider-line" ></el-divider>
                    </el-col>
                <el-col :span="6"> 
                    <div class="flow-application-text">
                        <span>系统服务</span>
                    </div>
                    <div class="manager-text">
                        <span class="flow-size">{{appStatistics.systemCount}}</span>
                    </div>
                </el-col>
                <el-col :span="6"> 
                    <div class="flow-application-text">
                        <span>设备驱动</span>
                    </div>
                    <div class="manager-text">
                        <span class="flow-size">{{appStatistics.deviceCount}}</span>
                    </div>
                </el-col>
                <el-col :span="5"> 
                    <div class="flow-application-text">
                        <span>应用场景</span>
                    </div>
                    <div class="manager-text">
                        <span class="flow-size">{{appStatistics.sceneCount}}</span>
                    </div>
                
                </el-col>
                        
                </el-col>

                <el-row  :gutter="20">
                    <template v-for="(item, index) in appStatistics.applicationList" >
                        <el-col :span="4" :key="index" v-if="index<17" class="el-col-margin-top" @click.native="goToDetail(item)">
                         
                            
                            <div class="main-img">
                               <img class="avatar-img" :src="item.application_icon" />
                                
                            </div>
                            <div class="main-text">
                                <a class="author-name" style="">{{ item.application_name }}</a>
                            </div>
                        </el-col>
                        <el-col :span="4" :key="index" v-if="index==18" class="el-col-margin-top"  @click.native="goToAll()">

                        <div class="main-img">
                              <img class="avatar-img" src="@/assets/all.png" />
                                
                            </div>
                            <div class="main-text">
                                 <a class="author-name" style="">查看全部</a>
                            </div>
                            
                           
                        </el-col>
                    </template>
                </el-row>
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
                            type="index"
                            label="序号"
                            align="center"
                            width="250">
                        </el-table-column>
                        <el-table-column
                            prop="metric_name"
                            label="设备名称"
                            align="center"
                            width="250">
                        </el-table-column>
                        <el-table-column
                            prop="usage_rate"
                            align="center"
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
                            :data="servers"
                            height="300"
                            style="width: 100%"
                            class="tableClass"
                            :cell-style="cellStyle">
                        <el-table-column
                            type="index"
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
import { mapGetters } from 'vuex';
import { getSystemCenterList,getAppManagerList,operationSystem} from "@/api/cockpit";
export default {
  name: 'Cockpit',
  data() {
    return {
        
        appStatistics: {
            "applicationList": [],
			"installCount": "",
			"systemCount": "",
            "deviceCount": "",
            "sceneCount": "",
		},
        deviceConnNum: {
			normalCount: "",
			ExceptionCount: ""
		},
        netInfo: {
			"sentGb": "",
			"recvGb": "",
		},
        os: {
			"hostn_name": "",
			"ip_address": "",
			"startTime": "",
			"os": "",
			"platform": "",
			"kernel_arch": "",
			"numCpu":"" ,
			"numGoroutine": "",
			"version": "",
		},
        cpu: {
			"cpus": "",
			"cores": "",
			"cpu_percents": "",
			"model_name": "",
			"mhz": "",
			"load_avg_stat": ""
		},
        ram: {
			"usedMb": "",
			"totalMb": "",
			"available": "",
			"free": "",
			"usedPercent": ""
		},
        disk: {
			"usedMb": "",
			"usedGb": "",
			"totalMb": "",
			"totalGb": "",
			"freeMb": "",
			"freeGb": "",
			"usedPercent": ""
		},
        colors: [
            { color: "#00CED1", percentage: 20 },
            { color: "#1E90FF", percentage: 50 },
            { color: "#FF8C00", percentage: 80 },
        ],
        servers:[],
        tableData: [],
        checkIsAlive:""

        
    }
  },
   computed: {
    ...mapGetters('user', ['userInfo'])
  },
  created() {
    this.systemCenterList();
    this.getAppManagers();
  },
   filters: {
        formatStatus: function(status) {
          if (status != null) {
           return status==true?"正常":"异常";
          } else {
            return "未定义类型";
          }
        },
        formatData: function(str) {
          var date = new Date(str).toJSON();

          var newDate=new Date(+new Date(date)+8*3600*1000).toISOString().replace(/T/g,' ').replace(/\.[\d]{3}Z/,'');
         // var curDate = new Date().Format("yyyy-MM-dd hh:mm:ss"); 
          var timestamp = new Date();
            var y = timestamp.getFullYear();
            var m = timestamp.getMonth()+1;
            var d = timestamp.getDate();
            var h = timestamp.getHours();
            var mm = timestamp.getMinutes();
            var s = timestamp.getSeconds();
             var curDate=   y+'-'+m+'-'+d+' '+h+':'+mm+':'+s;
             console.log("-------------------------------"+curDate);
          var stamp = new Date(curDate).getTime() - new Date(newDate).getTime();
            var time = (stamp / 1000);
        
            if(null != time && "" != time) {
                if(time > 60 && time < 60 * 60) {
                    time = parseInt(time / 60.0) + "分钟";
                } else if(time >= 60 * 60 && time < 60 * 60 * 24) {
                    time = parseInt(time / 3600.0) + "小时" + parseInt((parseFloat(time / 3600.0) -
                        parseInt(time / 3600.0)) * 60) + "分钟";
                } else if(time >= 60 * 60 * 24) {
                    time = parseInt(time / 3600.0 / 24) + "天" + parseInt((parseFloat(time / 3600.0 / 24) -
                        parseInt(time / 3600.0 / 24)) * 24) + "小时" + parseInt((parseFloat(time / 3600.0) -
                        parseInt(time / 3600.0)) * 60) + "分钟";
                } else {
                    time = parseInt(time) + "秒";
                }
            }
	        return time;
         // return newDate;

        }
    
      },
    methods:{
        cpuDetail(){
           this.$router.push({  name:"cpuDetail",})
        },
        goToAll(){
            
             this.$router.push({  name:"appManager"})
        },
        goToDetail(row){
            console.log("----------------------------dddd-----------"+row);
            this.$router.push({
              name:"appDetail",
              params:{
                id:row.Id,
                skillId:row.skill_id,
                name:row.application_name
              }
            })
        },
        toTarget(name){
            this.$router.push({name})
        },
        updateVersion(){
            this.$confirm("此操作为版本更新, 是否继续?", "提示", {
                cancelButtonText: "取消",
                confirmButtonText: "确定",
                type: "warning"
            })
            .then(async () => {
            const res = await operationSystem({ operation:'upgrade' });
            if (res.code == 200) {
               // prompt();
            }
            })
            .catch(() => {
            this.$message({
                type: "info",
                message: "已取消更新"
            });
            });
        },
        reboot(){
            this.$confirm("此操作为重启, 是否继续?", "提示", {
            cancelButtonText: "取消",
            confirmButtonText: "确定",
            type: "warning"
        })
        .then(async () => {
          const res = await operationSystem({ operation:'restart' });
          if (res.code == 200) {
              prompt();
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
        },
       prompt(){
            this.$confirm("请在20秒后刷新页面?", "提示", {
                cancelButtonText: "取消",
                confirmButtonText: "知道了",
                type: "warning"
            })
            .then(async () => {
            const res = await operationSystem({ operation:'upgrade' });
            if (res.code == 200) {
            }
            })
            .catch(() => {
            this.$message({
                type: "info",
                message: "已取消更新"
            });
            });
        },
        
        cellStyle(row,column,rowIndex,columnIndex){

            if(row.column.label==="运行状态"&& row.row.status>80){

                return "color:#FF3B30"
            }else if(row.column.label==="运行状态"&& 0<row.row.status<80 ){

                return 'color:#52CCA3'
            }else if(row.column.label==="运行状态"&& row.row.status===0){

                return 'color:#333333'
            }
        },
        getAppManagers() {
            getAppManagerList({}).then((ele) => {
                this.appStatistics=ele.data.data;
            });
        },
        systemCenterList() {
            getSystemCenterList({}).then((ele) => {
                this.netInfo.sentGb=ele.data.netInfo.sentGb;
                this.netInfo.recvGb=ele.data.netInfo.recvGb;
                this.os=ele.data.os;
                this.cpu=ele.data.cpu;
                this.ram=ele.data.ram;
                this.disk=ele.data.disk;
                this.checkIsAlive=ele.data.checkIsAlive;
                this.tableData=ele.data.metricList;
                this.deviceConnNum=ele.data.deviceConnNum;
                for(var i=0;i<ele.data.servers.length;i++){
                    var aaa = new Object();
                    aaa.name=ele.data.servers[i];
                    aaa.status="运行正常";
                    this.servers.push(aaa);
                }
            });
        },
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
        .top-right{

        }
        .main-text{
            display:flex;
            justify-content:center;
            align-items:center;
            margin-top:10px;
        }
        .main-text-items{
             width: 100%;
            height: 68px;
            display:flex;
            justify-content:center;
            align-items:center;
            margin-top:10px;
            color:#1677FF;
        }
        
         .main-img {
            display:flex;
            justify-content:center;
            align-items:center;
         }
         .main{
            display:flex;
            justify-content:center;
            align-items:center;
         }
         .main-top{
              display:flex;
            justify-content:center;
            align-items:center;
            margin-top:10px;
         }
         .main-top-img{
             display:flex;
            justify-content:center;
            align-items:center;
            margin-top:5px;
            margin-left:15px;
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
        .divider-line{
            width: 1px;
            height: 50px;
            background: #d7dbe0;
            margin-top:33px;
        }
        .divider-line-align{
            width: 1px;
            height: 50px;
            background: #d7dbe0;
             display:flex;
            justify-content:center;
            align-items:center;
             margin-top:43px;
        }
        .top-content{
            width: 100%;
            height: 140px;
            margin-top: 2px;
            background: #fff;
        
        }
        .avatar-img {
            float: left;
            height: 40px;
            width: 40px;
            border-radius: 50%;
            -webkit-border-radius: 50%;
            -moz-border-radius: 50%;
        }
        .author-name {
            float: left;
            line-height: 15px !important;
            margin-left: 10px;
            color: darkblue;
            font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
                "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
        }
        .item{
            flex: 0 0 28%;
            height: 80px;
            padding:20px;
            box-sizing: border-box;
            margin:20px;
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
            height: 415px;
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
                padding-right:20px;

            }
        }
        .el-col {
            border-radius: 2px;
        }
        .el-col-margin-top{
            margin-top:30px;
        }
        .el-progress{
            margin-top:30px;
            margin-left:70px;
        }
        .margin-text{
            margin-top:50px;
        }
        .bg-purple-dark {
            background: #99a9bf;
        }
        .bg-purple {
            background: #f0f9ff;
        }
        .bg-purple-light {
            background: #e5e9f2;
        }
        .grid-content {
            
            border-radius: 4px;
            height: 108px;
            margin-left:20px;

        }
        .bg-radius-small{
            width: 56px;
            height: 24px;
            margin-left:20px;
        }

        .bg-radius-mid{
            width: 88px;
            height: 24px;
          
        }

        .bg-radius-big{
            width: 112px;
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
            height: 32px;
            font-size: 32px;
            font-family: Helvetica;
            text-align: center;
            color: #111111;
            margin-left:45px;
            margin-top:20px;
              display:flex;
            justify-content:center;
            align-items:center;
        }
        .flow-text{
            height: 14px;
            font-size: 15px;
            padding-left:50px;
            color: #333333;
             display:flex;
            justify-content:center;
            align-items:center;
            
        }
        .flow-application-text{
             display:flex;
            justify-content:center;
            align-items:center;
            height: 14px;
            font-size: 15px;
            margin-top:20px;
            margin-bottom:19px;
            color: #333333;
        }
        .flow-size{
            font-size: 32px;
            color: #111111;
            margin-top:19px;
            display:flex;
            justify-content:center;
            align-items:center;
        }
        .assets-icon-small {
            width: 28px;
            height: 28px;
            border-radius: 10px;
        }

        .assets-icon-time {
            width: 15px;
            height: 15px;
            border-radius: 10px;
            margin-left:10px;
            margin-right:10px;

        }

        .assets-icon-big {
            width: 44px;
            height: 42px;
        }
        .text-col{
            margin-left:15px;
        }
        .status-text{
            width:100px;
            text-align:center;
            margin-top:30px;
        }
        .service-text{
            width:100px;
            text-align:center;
            margin-top:5px;
            white-space:nowrap;
        }
        .bg-text{
            font-size: 14px;
            text-align: center;
            color: #000;
        }
        .except-num{
            font-size:32px;
            color: #FF4D4D;
            margin-top:10px;

        }
        .status-text-samll{
            font-size: 14px;
            margin-left:20px;
        }
        .tableClass{
            padding: 0!important;
            height: 44px;
            line-height: 44px;
            margin-top:1px;
        }
        .server-padding-left{
            padding-left: 75px; 
        }
    }
</style>