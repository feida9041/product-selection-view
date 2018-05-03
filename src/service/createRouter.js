import routerConfig from 'src/config/routerConfig';
import clientStorage from 'src/service/storage';

const createRouter = {
    getRouter() {
        let routerArray = [];
        const config = clientStorage.getItem('router_config');
        for (let n in config) {
            let [module, name] = (config[n].split('.'));
            routerArray.push(routerConfig[module]['router'][name]);
            //console.log(module, name);
        }
        return [
            {
                path: '/',
                component: resolve => require(['src/components/common/Home.vue'], resolve),
                children: routerArray
            }
        ];
    },
    getSidebar() {
        const sidebarArray = [];
        const config = clientStorage.getItem('sidebar_config');
        let index = 0;
        for (let n in config) {
            let [module, name] = (config[n].split('.'));
            let menu = routerConfig[module]['sidebar'];
            menu['index'] = index.toString();
            if (typeof name !== 'undefined') {
                menu['subs'] = [];
                name.split(',').forEach((v, k) => {
                    if (menu.child.hasOwnProperty(v)) {
                        menu['subs'].push(menu.child[v]);
                    }
                })
            }
            sidebarArray.push(menu);
            index++;
        }
        return sidebarArray;
    }
};

export default createRouter
