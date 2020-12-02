import service from '@/utils/request'



// @Summary 获取消息列表
// @Produce  application/json
// @Param data body {username:"string",password:"string",newPassword:"string"}
// @Router /user/changePassword [post]
export const getNewsList = (params) => {
    console.info("获取消息列表---------"+JSON.stringify(params));
    return service({
        url: "/api/v1/systemcenter/alerts",
        method: 'get',
        params
    })
}


// @Summary 获取详细消息
// @Produce  application/json
// @Param data body
// @Router /api/v1/systemcenter/alerts [post]
export const getDetailNews = (data) => {
    console.info("获取详细消息---------"+JSON.stringify(data));
    return service({
        url: "/api/v1/systemcenter/alerts/"+data.ID,
        method: 'get',
        data
    })
}

// @Summary 根据状态检索消息
// @Produce  application/json
// @Param data body
// @Router /api/v1/systemcenter/alerts [post]
export const getNewsByStatus = (params) => {
    console.info("获取详细消息---------"+JSON.stringify(params));
    return service({
        url: "/api/v1/systemcenter/alerts/",
        method: 'get',
        params
    })
}