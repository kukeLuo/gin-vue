import service from '@/utils/request'

// @Summary 获取推送规则
// @Produce  application/json
// @Param data body {username:"string",password:"string",newPassword:"string"}
// @Router /user/changePassword [post]
export const getRulesList = (params) => {
    console.info("获取推送规则---------"+JSON.stringify(params));
    return service({
        url: "/api/v1/rulecenter/rules",
        method: 'get',
        params
    })
}


// @Summary 通过id获取更详细变更规则
// @Produce  application/json
// @Param data body {username:"string",password:"string",newPassword:"string"}
// @Router /api/v1/rulecenter/rules/"+data.ID
export const getRulesDetail = (data) => {
    console.info("获取推送详细规则---------"+JSON.stringify(data));
    return service({
        url: "/api/v1/rulecenter/rules/"+data.id,
        method: 'GET',
        data:data
    })
}


// @Summary 点击是否启用更改状态
// @Produce  application/json
// @Param data body {username:"string",password:"string",newPassword:"string"}
// @Router /user/changePassword [post]
export const updateRulesStatus = (data) => {
    console.info("更改规则状态---------"+JSON.stringify(data));
    return service({
        url: "/api/v1/rulecenter/rules/"+data.id,
        method: 'put',
        data:data.row
    })
}
// @Summary 变更规则
// @Produce  application/json
// @Param data body {username:"string",password:"string",newPassword:"string"}
// @Router /api/v1/rulecenter/rules/
export const updateRules = (data) => {
    console.info("获取推送详细规则---------"+JSON.stringify(data));
    return service({
        url: "/api/v1/rulecenter/rules/"+data.id,
        method: 'GET',
        data:data
    })
}

// @Summary 提交变更规则
// @Produce  application/json
// @Param data body {username:"string",password:"string",newPassword:"string"}
// @Router /api/v1/rulecenter/rules/
export const commitRules = (data) => {
    console.info("提交编辑规则---------"+JSON.stringify(data));
    return service({
        url: "/api/v1/rulecenter/rules/"+data.id,
        method: 'PUT',
        data:data
    })
}