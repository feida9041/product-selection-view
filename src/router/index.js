import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

let router = new Router({
    routes: [
        {
            path: '/',
            redirect: '/login'
        },
        {
            path: '/login',
            name: 'login',
            component: resolve => {
                require(['src/components/page/Login.vue'], resolve)
            }
        }
    ]
})

export default router;
