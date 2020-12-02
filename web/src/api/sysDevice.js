import service from '@/utils/request'

// @Summary 新添摄像头
// @Produce  application/json
export const addDevice = (data) => {
        return service({
            url: "/api/v1/devicecenter/devices",
            method: 'post',
            data: data
        })
    }

// @Summary 编辑摄像头摄像头
// @Produce  application/json
export const updateDevice = (data) => {
    return service({
        url: "/api/v1/devicecenter/devices/"+data.ID,
        method: 'put',
        data: data
    })
}    


 // @Summary 获取摄像头列表
// @Produce  application/json
export const getDeviceList = (params) => {
        return service({
            url: "/api/v1/devicecenter/devices",
            method: 'get',
            params
        })
    }   


    
 // @Summary 删除摄像头
// @Produce  application/json
export const deleteDevice = (params) => {
    return service({
        url: "/api/v1/devicecenter/devices/"+params,
        method: 'delete',
        params
    })
} 
    
 // @Summary 删除摄像头
// @Produce  application/json
export const getEventList = (params) => {
    console.info("------params"+params)
    return service({
        url: "/api/v1/devicecenter/events",
        method: 'get',
        params
    })
} 
   
    