import service from '@/utils/request'

// @Summary 获取参数配置
// @Produce  application/json
// @Param data body
// @Router /api/v1/systemcenter/config [get]
export const getConfig = (params) => {
    return service({
        url: "/api/v1/systemcenter/config",
        method: 'get',
        params
    })
}

// @Summary 编辑服务器配置
// @Produce  application/json
// @Param data body
// @Router /api/v1/systemcenter/config [get]
export const saveConfig = (data) => {
    console.log("-----------------"+JSON.stringify(data));
    return service({
        url: "/api/v1/systemcenter/config/"+data.id,
        method: 'put',
        data:data
    })
}

// @Summary 删除服务器配置
// @Produce  application/json
// @Param data body
// @Router /api/v1/systemcenter/config [get]
export const deleteConfig = (data) => {
    return service({
        url: "/api/v1/systemcenter/config/"+data.ID,
        method: 'delete',
        data
    })
}
