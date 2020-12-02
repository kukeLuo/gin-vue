import { asyncRouterHandle } from '@/utils/asyncRouter';

import { asyncMenu } from '@/api/menu'

const routerList = []
const formatRouter = (routes) => {
    routes && routes.map(item => {
        if ((!item.children || item.children.every(ch => ch.hidden)) && item.name != '404') {
            routerList.push({ label: item.meta.title, value: item.name })
        }
        item.meta.hidden = item.hidden
        if (item.children && item.children.length > 0) {
            formatRouter(item.children)
        }
    })
}

export const router = {
    namespaced: true,
    state: {
        asyncRouters: [],
        routerList: routerList,
    },
    mutations: {
        setRouterList(state, routerList) {
            state.routerList = routerList
        },
        // 设置动态路由
        setAsyncRouter(state, asyncRouters) {
            state.asyncRouters = asyncRouters
        }
    },
    actions: {
        // 从后台获取动态路由
        
        async SetAsyncRouter({ commit }) {
            const baseRouter = [{
                path: '/layout',
                name: 'layout',
                component: "view/layout/index.vue",
                meta: {
                    title: "底层layout"
                },
                children: []
            }]

            // const asyncRouterRes = await asyncMenu()
            // const asyncRouter = asyncRouterRes.data.menus
            const asyncRouter = [ {
                "ID": 1,
                "CreatedAt": "2020-10-26T11:55:37+08:00",
                "UpdatedAt": "2020-10-26T11:55:37+08:00",
                "parentId": "0",
                "path": "admin",
                "name": "superAdmin",
                "hidden": false,
                "component": "view/superAdmin/index.vue",
                "sort": 1,
                "meta": {
                    "keepAlive": false,
                    "defaultMenu": false,
                    "title": "主机管理",
                    "icon": "user-solid"
                },
                "authoritys": null,
                "menuId": "1",
                "children": [{
                    "ID": 4,
                    "CreatedAt": "2020-10-26T11:55:37+08:00",
                    "UpdatedAt": "2020-10-26T11:55:37+08:00",
                    "parentId": "1",
                    "path": "cockpit",
                    "name": "cockpit",
                    "hidden": false,
                    "component": "view/host/cockpit/cockpit.vue",
                    "sort": 1,
                    "meta": {
                        "keepAlive": false,
                        "defaultMenu": false,
                        "title": "驾驶舱",
                        "icon": "s-custom"
                    },
                    "authoritys": null,
                    "menuId": "4",
                    "children": null,
                    "parameters": []
                }, {
                    "ID": 23,
                    "CreatedAt": "2020-10-26T11:55:37+08:00",
                    "UpdatedAt": "2020-10-26T11:55:37+08:00",
                    "parentId": "1",
                    "path": "network",
                    "name": "network",
                    "hidden": false,
                    "component": "view/host/network/network.vue",
                    "sort": 2,
                    "meta": {
                        "keepAlive": false,
                        "defaultMenu": false,
                        "title": "网络管理",
                        "icon": "s-order"
                    },
                    "authoritys": null,
                    "menuId": "23",
                    "children": null,
                    "parameters": []
                }],
                "parameters": []
            }, {
				"ID": 35,
				"CreatedAt": "2020-10-26T11:55:37+08:00",
				"UpdatedAt": "2020-10-26T11:55:37+08:00",
				"parentId": "3",
				"path": "cpuDetail",
				"name": "cpuDetail",
				"hidden": true,
				"component": "view/host/cpu/cpuDetail.vue",
				"sort": 1,
				"meta": {
					"keepAlive": false,
					"defaultMenu": false,
					"title": "CPU性能",
					"icon": "s-order"
				},
				"authoritys": null,
				"menuId": "35",
				"children": null,
				"parameters": []
			},{
				"ID": 33,
				"CreatedAt": "2020-10-26T11:55:37+08:00",
				"UpdatedAt": "2020-10-26T11:55:37+08:00",
				"parentId": "3",
				"path": "appDetail/:id/:name/:skillId",
				"name": "appDetail",
				"hidden": true,
				"component": "view/appStore/appManager/appDetail.vue",
				"sort": 1,
				"meta": {
					"keepAlive": false,
					"defaultMenu": false,
					"title": "应用事件",
					"icon": "s-order"
				},
				"authoritys": null,
				"menuId": "33",
				"children": null,
				"parameters": []
            }, 
            {
				"ID": 1001,
				"CreatedAt": "2020-10-26T11:55:37+08:00",
				"UpdatedAt": "2020-10-26T11:55:37+08:00",
				"parentId": "3",
				"path": "deviceEvents/:id",
				"name": "deviceEvents",
				"hidden": true,
				"component": "view/systemTools/autoCode/deviceEvents.vue",
				"sort": 1,
				"meta": {
					"keepAlive": false,
					"defaultMenu": false,
					"title": "设备事件",
					"icon": "s-order"
				},
				"authoritys": null,
				"menuId": "33",
				"children": null,
				"parameters": []
			},{
				"ID": 34,
				"CreatedAt": "2020-10-26T11:55:37+08:00",
				"UpdatedAt": "2020-10-26T11:55:37+08:00",
				"parentId": "3",
				"path": "appConfig/:id/:name/:skillId",
				"name": "appConfig",
				"hidden": true,
				"component": "view/appStore/appManager/appConfig.vue",
				"sort": 1,
				"meta": {
					"keepAlive": false,
					"defaultMenu": false,
					"title": "应用配置",
					"icon": "s-order"
				},
				"authoritys": null,
				"menuId": "34",
				"children": null,
				"parameters": []
			}, {
                "ID": 4,
                "CreatedAt": "2020-10-26T11:55:37+08:00",
                "UpdatedAt": "2020-10-26T11:55:37+08:00",
                "parentId": "0",
                "path": "appStore",
                "name": "appStore",
                "hidden": false,
                "component": "view/appStore/index.vue",
                "sort": 4,
                "meta": {
                    "keepAlive": false,
                    "defaultMenu": false,
                    "title": "应用商店",
                    "icon": "s-cooperation"
                },
                "authoritys": null,
                "menuId": "4",
                "children": [{
                    "ID": 30,
                    "CreatedAt": "2020-10-26T11:55:37+08:00",
                    "UpdatedAt": "2020-10-26T11:55:37+08:00",
                    "parentId": "4",
                    "path": "appManager",
                    "name": "appManager",
                    "hidden": false,
                    "component": "view/appStore/appManager/appManager.vue",
                    "sort": 0,
                    "meta": {
                        "keepAlive": true,
                        "defaultMenu": false,
                        "title": "应用管理",
                        "icon": "cpu"
                    },
                    "authoritys": null,
                    "menuId": "30",
                    "children": null,
                    "parameters": []
                },{
                    "ID": 31,
                    "CreatedAt": "2020-10-26T11:55:37+08:00",
                    "UpdatedAt": "2020-10-26T11:55:37+08:00",
                    "parentId": "4",
                    "path": "dictionary",
                    "name": "dictionary",
                    "hidden": false,
                    "component": "view/appStore/appManager/dictionary.vue",
                    "sort": 1,
                    "meta": {
                        "keepAlive": true,
                        "defaultMenu": false,
                        "title": "字典管理",
                        "icon": "s-order"
                    },
                    "authoritys": null,
                    "menuId": "31",
                    "children": null,
                    "parameters": []
                }
            ],
                "parameters": []
            }, {
                "ID": 8,
                "CreatedAt": "2020-10-26T11:55:37+08:00",
                "UpdatedAt": "2020-10-26T11:55:37+08:00",
                "parentId": "0",
                "path": "person",
                "name": "person",
                "hidden": true,
                "component": "view/person/person.vue",
                "sort": 4,
                "meta": {
                    "keepAlive": false,
                    "defaultMenu": false,
                    "title": "个人信息",
                    "icon": "message-solid"
                },
                "authoritys": null,
                "menuId": "8",
                "children": null,
                "parameters": []
            }, {
                "ID": 17,
                "CreatedAt": "2020-10-26T11:55:37+08:00",
                "UpdatedAt": "2020-10-26T11:55:37+08:00",
                "parentId": "0",
                "path": "systemTools",
                "name": "systemTools",
                "hidden": false,
                "component": "view/systemTools/index.vue",
                "sort": 5,
                "meta": {
                    "keepAlive": false,
                    "defaultMenu": false,
                    "title": "设备管理",
                    "icon": "s-cooperation"
                },
                "authoritys": null,
                "menuId": "17",
                "children": [{
                    "ID": 18,
                    "CreatedAt": "2020-10-26T11:55:37+08:00",
                    "UpdatedAt": "2020-10-26T11:55:37+08:00",
                    "parentId": "17",
                    "path": "autoCode",
                    "name": "autoCode",
                    "hidden": false,
                    "component": "view/systemTools/autoCode/index.vue",
                    "sort": 1,
                    "meta": {
                        "keepAlive": true,
                        "defaultMenu": false,
                        "title": "设备列表",
                        "icon": "cpu"
                    },
                    "authoritys": null,
                    "menuId": "18",
                    "children": null,
                    "parameters": []
                }],
                "parameters": []
            }, {
                "ID": 9,
                "CreatedAt": "2020-10-26T11:55:37+08:00",
                "UpdatedAt": "2020-10-26T11:55:37+08:00",
                "parentId": "0",
                "path": "news",
                "name": "news",
                "hidden": false,
                "component": "view/news/index.vue",
                "sort": 6,
                "meta": {
                    "keepAlive": false,
                    "defaultMenu": false,
                    "title": "消息中心",
                    "icon": "s-management"
                },
                "authoritys": null,
                "menuId": "9",
                "children": [{
                    "ID": 10,
                    "CreatedAt": "2020-10-26T11:55:37+08:00",
                    "UpdatedAt": "2020-10-26T11:55:37+08:00",
                    "parentId": "9",
                    "path": "systemNews",
                    "name": "systemNews",
                    "hidden": false,
                    "component": "view/news/systemNews/systemNews.vue",
                    "sort": 1,
                    "meta": {
                        "keepAlive": false,
                        "defaultMenu": false,
                        "title": "系统消息",
                        "icon": "s-order"
                    },
                    "authoritys": null,
                    "menuId": "10",
                    "children": null,
                    "parameters": []
                }, {
                    "ID": 11,
                    "CreatedAt": "2020-10-26T11:55:37+08:00",
                    "UpdatedAt": "2020-10-26T11:55:37+08:00",
                    "parentId": "9",
                    "path": "form",
                    "name": "form",
                    "hidden": false,
                    "component": "view/example/form/form.vue",
                    "sort": 2,
                    "meta": {
                        "keepAlive": false,
                        "defaultMenu": false,
                        "title": "系统日志",
                        "icon": "document"
                    },
                    "authoritys": null,
                    "menuId": "11",
                    "children": null,
                    "parameters": []
                }],
                "parameters": []
            }, {
                "ID": 26,
                "CreatedAt": "2020-10-26T11:55:37+08:00",
                "UpdatedAt": "2020-10-26T11:55:37+08:00",
                "parentId": "0",
                "path": "state",
                "name": "state",
                "hidden": false,
                "component": "view/systemConfig/index.vue",
                "sort": 26,
                "meta": {
                    "keepAlive": false,
                    "defaultMenu": false,
                    "title": "系统配置",
                    "icon": "cloudy"
                },
                "authoritys": null,
                "menuId": "26",
                "children": [{
                    "ID": 39,
                    "CreatedAt": "2020-10-26T11:55:37+08:00",
                    "UpdatedAt": "2020-10-26T11:55:37+08:00",
                    "parentId": "26",
                    "path": "operation",
                    "name": "operation",
                    "hidden": false,
                    "component": "view/systemConfig/parameter/parameter.vue",
                    "sort": 1,
                    "meta": {
                        "keepAlive": false,
                        "defaultMenu": false,
                        "title": "参数配置",
                        "icon": "cpu"
                    },
                    "authoritys": null,
                    "menuId": "39",
                    "children": null,
                    "parameters": []
                },{
                    "ID": 38,
                    "CreatedAt": "2020-10-26T11:55:37+08:00",
                    "UpdatedAt": "2020-10-26T11:55:37+08:00",
                    "parentId": "26",
                    "path": "push",
                    "name": "push",
                    "hidden": false,
                    "component": "view/systemConfig/push/push.vue",
                    "sort": 2,
                    "meta": {
                        "keepAlive": false,
                        "defaultMenu": false,
                        "title": "推送机制",
                        "icon": "s-order"
                    },
                    "authoritys": null,
                    "menuId": "38",
                    "children": null,
                    "parameters": []
                },{
                    "ID": 32,
                    "CreatedAt": "2020-10-26T11:55:37+08:00",
                    "UpdatedAt": "2020-10-26T11:55:37+08:00",
                    "parentId": "26",
                    "path": "user",
                    "name": "user",
                    "hidden": false,
                    "component": "view/systemConfig/user/user.vue",
                    "sort": 3,
                    "meta": {
                        "keepAlive": false,
                        "defaultMenu": false,
                        "title": "用户管理",
                        "icon": "coordinate"
                    },
                    "authoritys": null,
                    "menuId": "32",
                    "children": null,
                    "parameters": []
                }],
                "parameters": []
            }]
            asyncRouter.push({
                path: "404",
                name: "404",
                hidden: true,
                meta: {
                    title: "迷路了*。*",
                },
                component: 'view/error/index.vue'
            })
            formatRouter(asyncRouter)
            baseRouter[0].children = asyncRouter
            baseRouter.push({
                path: '*',
                redirect: '/layout/404'

            })
            asyncRouterHandle(baseRouter)
            commit('setAsyncRouter', baseRouter)
            commit('setRouterList', routerList)
            return true
        }
    },
    getters: {
        // 获取动态路由
        asyncRouters(state) {
            return state.asyncRouters
        },
        routerList(state) {
            return state.routerList
        }
    }
}