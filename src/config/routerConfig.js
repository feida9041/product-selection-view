const powerRouter = {
    index: {
        router: {
            index: {
                path: '/readme',
                name: 'index',
                component: resolve => require(['src/components/page/Readme.vue'], resolve),
            }
        },
        sidebar: {
            icon: "el-icon-setting",
            title: "自述",
            name: "index",
        }
    },
    depot: {
        router: {
            list: {
                path: '/depot',
                name: 'depotlist',
                meta: {
                    breadcrumb: {
                        parent: '仓库管理',
                        child: '仓库列表'
                    },
                    title: '仓库列表'
                },
                component: resolve => require(['src/components/page/depot/depot.vue'], resolve),
            },
            add: {
                path: '/depot/add',
                name: 'depot_create',
                meta: {
                    breadcrumb: {
                        parent: '仓库管理',
                        child: '添加仓库'
                    },
                    title: '添加仓库',
                    action: 'add'
                },
                component: resolve => require(['src/components/page/depot/info.vue'], resolve)
            },
            edit: {
                path: '/depot/edit/:id',
                name: 'depot_edit',
                meta: {
                    breadcrumb: {
                        parent: '仓库管理',
                        child: '修改仓库'
                    },
                    title: '修改仓库',
                    action: 'edit'
                },
                component: resolve => require(['src/components/page/depot/info.vue'], resolve)
            }
        },
        sidebar: {
            icon: "el-icon-view",
            title: "仓库管理",
            child: {
                list: {
                    "index": "/depot",
                    "title": "仓库列表",
                    "name": "depotlist",
                },
                add: {
                    "index": "/depot/add",
                    "title": "添加仓库",
                    "name": "depotinfo"
                }
            }
        }
    },
    manager: {
        router: {
            list: {
                path: '/manager',
                name: 'managerlist',
                meta: {
                    breadcrumb: {
                        parent: '账号管理',
                        child: '管理员列表'
                    },
                    title: '管理员列表'
                },
                component: resolve => require(['src/components/page/manager/manager.vue'], resolve),
            },
            add: {
                path: '/manager/add',
                name: 'manager_create',
                meta: {
                    breadcrumb: {
                        parent: '账号管理',
                        child: '添加管理员'
                    },
                    title: '添加管理员',
                    action: 'add'
                },
                component: resolve => require(['src/components/page/manager/info.vue'], resolve)
            },
            edit: {
                path: '/manager/edit/:id',
                name: 'manager_edit',
                meta: {
                    breadcrumb: {
                        parent: '账号管理',
                        child: '修改管理员'
                    },
                    title: '修改管理员',
                    action: 'edit'
                },
                component: resolve => require(['src/components/page/manager/info.vue'], resolve)
            },
        },
        sidebar: {
            icon: "el-icon-menu",
            title: "账号管理",
            child: {
                list: {
                    "index": "/manager",
                    "title": "管理员列表",
                    "name": "managerlist",
                },
                add: {
                    "index": "/manager/add",
                    "title": "添加管理员",
                    "name": "managerinfo"
                }
            }
        }
    },
    user: {
        router: {
            list: {
                path: '/user',
                name: 'userlist',
                meta: {
                    breadcrumb: {
                        parent: '用户管理',
                        child: '用户列表'
                    },
                    title: '用户列表'
                },
                component: resolve => require(['src/components/page/user/user.vue'], resolve),
            },
            querylist: {
                path: '/query',
                name: 'querylist',
                meta: {
                    breadcrumb: {
                        parent: '用户管理',
                        child: '用户查询列表'
                    },
                    title: '用户查询列表'
                },
                component: resolve => require(['src/components/page/user/query.vue'], resolve),
            },
            comment: {
                path: '/comment',
                name: 'usercomment',
                meta: {
                    breadcrumb: {
                        parent: '用户管理',
                        child: '用户评论'
                    },
                    title: '用户评论',
                    action: 'comment'
                },
                component: resolve => require(['src/components/page/user/comment.vue'], resolve)
            },
        },
        sidebar: {
            icon: "el-icon-mobile-phone",
            title: "用户管理",
            child: {
                list: {
                    "index": "/user",
                    "title": "用户列表",
                    "name": "userlist",
                },
                querylist: {
                    "index": "/query",
                    "title": "用户查询列表",
                    "name": "querylist",
                },
                comment: {
                    "index": "/comment",
                    "title": "用户评论",
                    "name": "usercomment"
                }
            }
        }
    },
    apply: {
        router: {
            list: {
                path: '/apply',
                name: 'applylist',
                meta: {
                    breadcrumb: {
                        parent: '申请管理',
                        child: '申请列表'
                    },
                    title: '申请列表'
                },
                component: resolve => require(['src/components/page/apply/apply.vue'], resolve),
            }
        },
        sidebar: {
            icon: "el-icon-document",
            title: "申请管理",
            child: {
                list: {
                    "index": "/apply",
                    "title": "申请列表",
                    "name": "applylist",
                }
            }
        }
    },
    basetable: {
        router: {
            basetable: {
                path: '/basetable',
                name: 'basetable',
                component: resolve => require(['src/components/page/BaseTable.vue'], resolve)
            }
        },
        sidebar: {
            icon: "el-icon-menu",
            title: "表格",
            child: {
                basetable: {
                    "index": "/basetable",
                    "title": "基础表格"
                }
            }
        }
    },
    baseform: {
        router: {
            baseform: {
                path: '/baseform',
                name: 'baseform',
                component: resolve => require(['src/components/page/BaseForm.vue'], resolve)
            }
        },
        sidebar: {
            icon: "el-icon-date",
            title: "表单",
            child: {
                baseform: {
                    "index": "/baseform",
                    "title": "基本表单"
                }
            }
        }
    }
};

export default powerRouter
