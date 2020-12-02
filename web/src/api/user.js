import service from '@/utils/request'

// @Summary 用户登录
// @Produce  application/json
// @Param data body {username:"string",password:"string"}
// @Router /base/login [post]
export const login = (data) => {
    console.info(data.username+'-'+data.password);
    return service({
        url: "/api/v1/systemcenter/users/login",
        method: 'post',
        data: data
    })
    
}

// @Summary 获取验证码
// @Produce  application/json
// @Param data body {username:"string",password:"string"}
// @Router /base/captcha [post]
export const captcha = (data) => {
    return service({
        url: "/base/captcha",
        method: 'post',
        data: data
    })
}

// @Summary 用户注册
// @Produce  application/json
// @Param data body {username:"string",password:"string"}
// @Router /base/resige [post]
export const register = (data) => {
console.log("请求用户注册表单:"+JSON.stringify(data));
    return service({
        url: "/api/v1/systemcenter/users/register",
        method: 'post',
        data: data
    })
}
// @Summary 修改密码
// @Produce  application/json
// @Param data body {username:"string",password:"string",newPassword:"string"}
// @Router /user/changePassword [post]
export const changePassword = (data) => {
    console.log("修改用户密码:"+JSON.stringify(data));
    return service({
        url: "/api/v1/systemcenter/users/changePassword",
        method: 'put',
        data: data
    })
}
    // @Tags User
    // @Summary 分页获取用户列表
    // @Security ApiKeyAuth
    // @accept application/json
    // @Produce application/json
    // @Param data body modelInterface.PageInfo true "分页获取用户列表"
    // @Success 200 {string} json "{"success":true,"data":{},"msg":"获取成功"}"
    // @Router /user/getUserList [post]
    //url: "/api/v1/systemcenter/users?page="+data.page+"&limit="+data.limit,
export const getUserList = (params) => {
    console.log("获取用户列表:"+JSON.stringify(params));
    return service({
        url: "/api/v1/systemcenter/users",
        method: 'get',
        params
    })
}


// @Tags User
// @Summary 设置用户权限
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body api.SetUserAuth true "设置用户权限"
// @Success 200 {string} json "{"success":true,"data":{},"msg":"修改成功"}"
// @Router /user/setUserAuthority [post]
export const setUserAuthority = (data) => {
    return service({
        url: "/user/setUserAuthority",
        method: 'post',
        data: data
    })
}


// @Tags SysUser
// @Summary 删除用户
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body request.SetUserAuth true "删除用户"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"修改成功"}"
// @Router /user/deleteUser [delete]
export const deleteUser = (data) => {
    console.log("删除用户:"+JSON.stringify(data));
    return service({
        url: "/api/v1/systemcenter/users/"+data.ID,
        method: 'delete',
        data: data
    })
}



// @Tags updateUser
// @Summary 修改用户状态
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body request.SetUserAuth true "更改用户"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"修改成功"}"
// @Router /user/updateUser [delete]
export const updateUserStatus = (data) => {

    console.log("更改用户:"+JSON.stringify(data));

    return service({
        url: "/api/v1/systemcenter/users/"+data.ID,
        method: 'put',
        data: data.row
    })
}

// @Tags SysUser
// @Summary 设置用户信息
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.SysUser true "设置用户信息"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"修改成功"}"
// @Router /user/setUserInfo [put]
export const setUserInfo = (data) => {
    return service({
        url: "/user/setUserInfo",
        method: 'put',
        data: data
    })
}

// @Tags SysUser
// @Summary 根据id 获取用户详细信息
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.SysUser true "获取用户详细信息"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"修改成功"}"
// @Router /user/setUserInfo [put]
export const getUserInfoById = (data) => {
    return service({
        url: "/api/v1/systemcenter/users/"+data.ID,
        method: 'get',
        data: data
    })
}

// @Tags SysUser
// @Summary 修改用户详细信息
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.SysUser true "修改用户详细信息"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"修改成功"}"
// @Router /api/v1/systemcenter/users
export const updateUserInfo = (data) => {
    return service({
        url: "/api/v1/systemcenter/users/"+data.ID,
        method: 'put',
        data: data
    })
}