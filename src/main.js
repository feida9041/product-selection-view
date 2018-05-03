import Vue from 'vue';
import App from './App';
import router from './router';
import axios from 'axios';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import "babel-polyfill";
import {Notification} from 'element-ui';
import createRouter from 'src/service/createRouter';
import * as consts from 'src/config/const';
import {Message} from 'element-ui';

Vue.use(ElementUI);
Vue.prototype.$axios = axios;

if (localStorage.getItem('router_config')) {
    let rougerConfig = createRouter.getRouter();
    router.addRoutes(rougerConfig);
}

router.beforeEach((to, from, next) => {
    // 获取 JWT Token
    let name = to.name;
    if (localStorage.token) {
        if (name === 'login' || name === undefined || name === null) {
            next({name: 'index'});
        } else {
            if (to.meta.title) {
                document.title = to.meta.title;
            } else {
                document.title = consts.BASE_TITLE;
            }
            next();
        }
    } else {
        document.title = consts.BASE_TITLE;
        if (name == 'login') {
            next();
        } else {
            next({name: 'login'});
        }

    }
});

new Vue({
    router,
    render: h => h(App)
}).$mount('#app');

// http response 拦截器
axios.interceptors.request.use(
    config => {
        if (localStorage.token) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
            config.headers.Authorization = localStorage.token;
        }
        return config;
    },
    err => {
        return Promise.reject(err);
    }
);

axios.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        if (error.response) {
            console.log(error.response.status);
            console.log(error.response.data.msg);
            switch (error.response.status) {
                case 401:
                    localStorage.clear();
                    router.replace({
                        path: 'login',
                        query: {redirect: router.currentRoute.fullPath}
                    });
                    Notification.error({
                        message: consts.LOGIN_TIME_OUT,
                        duration: 0
                    })
                    break;
                default :
                    if (error.response.data && typeof error.response.data === 'object') {
                        let msg = '';
                        for (let n in error.response.data) {
                            msg += "<p>" + error.response.data[n] + "<p/>";
                        }
                        Message.error({
                            dangerouslyUseHTMLString: true,
                            message: msg,
                            duration: 5000,
                            showClose: false
                        })
                    } else {
                        Message.error({
                            message: '参数有误',
                            duration: 5000,
                            showClose: false
                        })
                    }
            }
        }
        return Promise.reject(error.response.data);
    }
);

Vue.prototype.$http = axios;
