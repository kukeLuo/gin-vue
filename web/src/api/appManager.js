import service from '@/utils/request'


// @Tags appmanager
// @Summary 应用设备列表
// @Security 罗
// @accept application/json
// @Produce application/json
// @Param data body modelInterface.PageInfo true "分页获取用户列表"
// @Success 200 {string} json "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /api/v1/systemcenter/applications [get]
// {
//  page     int
//	limit int
// }
export const getAppManagerList = (params) => {
    return service({
        url: "/api/v1/systemcenter/applications",
        method: 'get',
        params
    })
}


// @Tags appmanager
// @Summary 停止应用
// @Security 罗
// @accept application/json
// @Produce application/json
// @Param data body modelInterface.PageInfo true "分页获取用户列表"
// @Success 200 {string} json "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /api/v1/systemcenter/applications [get]
// {
//  page     int
//	limit int
// }
export const stopApp = (data) => {
    console.log("---------------------------"+JSON.stringify(data));
    return service({
        url: "/api/v1/systemcenter/application",
        method: 'put',
        data:data
    })
}

// @Tags appmanager
// @Summary 启动应用
// @Security 罗
// @accept application/json
// @Produce application/json
// @Success 200 {string} json "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /api/v1/systemcenter/applications [get]
// {
//  page     int
//	limit int
// }
export const enableApp = (data) => {
    console.log("---------------------------"+JSON.stringify(data));
    return service({
        url: "/api/v1/systemcenter/application",
        method: 'put',
        data:data
    })
}

// @Tags appmanager
// @Summary 卸载应用
// @Security 罗
// @accept application/json
// @Produce application/json
// @Success 200 {string} json "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /api/v1/systemcenter/applications [get]
// {
//  page     int
//	limit int
// }
export const uninstallApp = (data) => {
    console.log("---------------------------"+JSON.stringify(data));
    return service({
        url: "/api/v1/systemcenter/applications/"+data.skillId,
        method: 'delete',
        data:data
    })
}

// @Tags appmanager
// @Summary 安装应用
// @Security 罗
// @accept application/json
// @Produce application/json
// @Success 200 {string} json "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /api/v1/systemcenter/applications [get]
// {
//  page     int
//	limit int
// }
export const installApp = (data) => {
    console.log("---------------------------"+JSON.stringify(data));
    return service({
        url: "/api/v1/systemcenter/applications/install",
        method: 'post',
        data:data
    })
}


// @Tags appmanager
// @Summary 获取应用下设备的列表
// @Security 罗
// @accept application/json
// @Produce application/json
// @Param data body modelInterface.PageInfo true "分页获取用户列表"
// @Success 200 {string} json "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /api/v1/systemcenter/application/device [get]
// {
//  page     int
//	limit int
// }
export const getAppConfigList = (params) => {
    return service({
        url: "/api/v1/systemcenter/applications/"+params.applicationId+"/devices",
        method: 'get',
        params
    })
}

// @Tags appmanager
// @Summary 获取日志
// @Security 罗
// @accept application/json
// @Produce application/json
// @Param data body modelInterface.PageInfo true "分页获取用户列表"
// @Success 200 {string} json "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /api/v1/systemcenter/application/device [get]
// {
//  page     int
//	limit int
// }
export const getLog = (data) => {

    return service({
        url: "/api/v1/systemcenter/applications/"+data.skillId+"/log?skillName="+data.skillName,
        method: 'get',
        data
    })
}

// @Tags appmanager
// @Summary 查看事件
// @Security 罗
// @accept application/json
// @Produce application/json
// @Param data body modelInterface.PageInfo true "分页获取用户列表"
// @Success 200 {string} json "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /api/v1/systemcenter/application/device [get]
// {
//  page     int
//	limit int
// }
export const getAppDetail = (data) => {
    

    return service({
        url: "/api/v1/devicecenter/events/"+data.skillId+"?page="+data.page+"&limit="+data.limit,
        method: 'get',
        data
    })
}

// @Tags appmanager
// @Summary 获取配置结构
// @Security 罗
// @accept application/json
// @Produce application/json
// @Param data body modelInterface.PageInfo true "分页获取用户列表"
// @Success 200 {string} json "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /api/v1/systemcenter/application/device [get]
// {
//  page     int
//	limit int
// }
export const getDictionaries = (data) => {
    console.log("getDictionaries---------------"+JSON.stringify(data));
    return service({
        url: "/api/v1/systemcenter/dictionaries?page=1&limit=99&applicationId="+data.skillId,
        method: 'get',
        data
    })
}

// @Tags appmanager
// @Summary 提交修改后的配置
// @Security 罗
// @accept application/json
// @Produce application/json
// @Param data body modelInterface.PageInfo true "分页获取用户列表"
// @Success 200 {string} json "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /api/v1/systemcenter/application/device [get]
// {
//  page     int
//	limit int
// }
export const commitConfig = (data) => {
    console.log("修改后的地址==："+JSON.stringify(data.obj))

    return service({
        url: "/api/v1/systemcenter/applications/"+data.skillId,
        method: 'put',
        data:data.obj
    })
}

// @Tags appmanager
// @Summary 】查看安装进度
// @Security 罗
// @accept application/json
// @Produce application/json
// @Param data body modelInterface.PageInfo true "分页获取用户列表"
// @Success 200 {string} json "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /api/v1/systemcenter/application/device [get]
// {
//  page     int
//	limit int
// }
export const getProgressStatus = (data) => {
    return service({
        url: "/api/v1/systemcenter/applications/"+data.skillId+"/install/process?applicationType="+data.applicationType,
        method: 'get',
        donNotShowLoading: true,
        data
        
    })
}