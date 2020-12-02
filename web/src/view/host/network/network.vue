
<template>
    <div class="container">

            <el-divider direction="vertical" class="top-line"></el-divider>
            
            <span class="top-text"><b>网络状态</b></span>
            <el-row class="box" >
                <el-col :span="3" class="el-col-left">
                    <div class="main">
                        <img src="@/assets/wan.png" class="assets-icon-big"/>
                    </div>
                    <div class="main-text">
                        <span>5G移动网络/有线WAN</span>
                    </div>
                </el-col>
                <el-col :span="5">
                        
                    <el-row class="main-text">
                        <span class="direction-text">{{this.checkIsAlive| formatStatus}}</span>
                    </el-row>
                    <el-divider direction="horizontal">
                         <div :class="{'horizontal-line-red':isRed,'horizontal-line-green':isGreen}">
                            
                        </div>
                    </el-divider>
                </el-col>
                <el-col :span="3">
                <div class="main">
                        <img src="@/assets/bie-service.png" class="assets-icon-big"/>
                    </div>
                    <div class="main-text">
                        <span class="direction-text">BIE服务器</span>
                    </div>
                 
                </el-col>
                <el-col :span="5">       
                    <el-row class="main-text">
                        <span >5G移动网络/有线WAN</span>
                    </el-row>
                    <el-divider direction="horizontal" >
                        <div :class="{'horizontal-line-red':isRed,'horizontal-line-green':isGreen}">
                            
                        </div>
                    </el-divider>       
                    
                </el-col>
                <el-col :span="2">

                <div class="main">
                        <img src="@/assets/camera.png" class="assets-icon-big"/>
                    </div>
                    <div class="main-text">
                        <span class="direction-text">终端管理</span>
                    </div>
                
                </el-col>
            </el-row>
                    
      
            <div class="top" >
                        <el-divider direction="vertical" class="top-line"></el-divider>
                        
                        <span class="top-text"><b>网络配置</b></span>
            </div>
            <div class = "top-content" style=" margin-top: 2px">
            
                    <iframe id="content" src="http://192.168.2.1/wizard.asp"  width="100%" height="100%" ></iframe>
            </div> 
                        
           
        
    </div>
</template>


<script>
// 获取列表内容封装在mixins内部  getTableData方法 初始化已封装完成

import {getSystemCenterList,getAppManagerList} from "@/api/cockpit";
import infoList from "@/mixins/infoList";
import { mapGetters } from "vuex";
export default {
  name: "Network",
  mixins: [infoList],
  data() {
    return {
          appStatistics: {
            "applicationList": [],
			"installCount": "",
			"systemCount": "",
            "deviceCount": "",
            "sceneCount": "",
		  },
           exceptionCount:"",
          checkIsAlive:"",
          isGreen:false,
          isRed:true,
          isWanGreen:false,
          isWanRed:true,
        };
  },
    created() {
        //this.reSetSize();
        this.systemCenterList();
       // this.getAppManagers();
  },
  methods: {
       reSetSize() {
            var windowsHeight = window.innerHeight;
            document.getElementById("content").style.height = (windowsHeight-框架顶部高度) + "px";
        },
         systemCenterList() {
            getSystemCenterList({}).then((ele) => {
            
                this.checkIsAlive=ele.data.checkIsAlive;
                if(this.checkIsAlive){
                    this.isWanGreen=true,
                    this.isWanRed=false
                }else{
                    this.isWanGreen=false,
                    this.isWanRed=true
                }
                this.exceptionCount=ele.data.deviceConnNum.ExceptionCount;
                if(this.exceptionCount=='0'){
                    this.isGreen=true,
                    this.isRed=false
                }else{
                    this.isGreen=false,
                    this.isRed=true
                }
               
            });
        },
        getAppManagers() {
            getAppManagerList({}).then((ele) => {
                this.appStatistics=ele.data.data;
            });
        },
  },
   
  filters: {
        formatStatus: function(status) {
          if (status != null) {
           return status==true?"网络正常":"网络异常";
          } else {
            return "未定义类型";
          }
        },    
      },

};
</script>

 <style>
        *{
            margin: 0;
            padding: 0;
        }
 
        html,body{
            width: 100%;
            height: 100%;
        }
 
        .container{
            width: 100%;
            height: 100%;
              position: relative;
        }
 
        .top-content{
            width: 100%;
            height: 600px;
            margin-top: 2px;
            background: #fff;
        
        }  
         .main {
            display:flex;
            justify-content:center;
            align-items:center;
         }
         .top-content-status{
            width: 100%;
            height: 200px;
            margin-top: 2px;
            background: #fff;
        
        } 
        .top-line{
            width: 3px;
            height: 16px;
            background: #007aff;
        }
        .main-text{
            display:flex;
            justify-content:center;
            align-items:center;
            margin-top:31px;
        }
        .direction-row{
            width: 100%;
            height: 56px;
        }
        .horizontal-line-red{
            width: 267px;
            border-top: 2px dashed red;
        }
         .horizontal-line-green{
            width: 267px;
            border-top: 2px dashed green;
        }
        /* el-divider 修改高度&虚线效果 */
        .el-divider--horizontal{
            margin: 4px 20px 0 0;
            background: 0 0;
        } 
        .assets-icon-big {
            width: 64px;
            height: 64px;
        }
         .assets-icon-small {
            width: 44px;
            height: 44px;
            margin-left:24px;
        }
        .el-col-left{
            margin-left:84px;
        }
    </style>
