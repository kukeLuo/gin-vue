import service from '@/utils/request'

// @Tags api
// @Summary 获取驾驶舱数据
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body modelInterface.PageInfo true ""
// @Success 200 {string} json "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /api/v1/systemcenter/infos [post]
// {
//  page     int
//	pageSize int
// }
export const getSystemCenterList = (data) => {
    return service({
        url: "/api/v1/systemcenter/infos",
        method: 'get',
        data
    })
}

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
export const getAppManagerList = (data) => {
    return service({
        url: "/api/v1/systemcenter/applications?page=1&limit=999",
        method: 'get',
        data
    })
}



// @Tags appmanager
// @Summary 操作系列
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
export const operationSystem = (data) => {
    return service({
        url: "/api/v1/systemcenter/operate/"+data.operation,
        method: 'post',
        data
    })
}

